import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import User from "../models/UserSchema.js";
import School from "../models/SchoolModel.js";
import RefreshToken from "../models/RefreshToken.js";
import sendEmail from "../utils/sendEmail.js";
import Role from "../models/roleModel.js";
import TempOtp from "../models/TempOtp.js";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.JWT_EXPIRES_IN || "15m";
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_JWT_EXPIRES_IN || "7d";

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  console.error("❌ ERROR: JWT secrets are not defined in .env file!");
  process.exit(1);
}

const isProduction = process.env.NODE_ENV === "production";

const getCookieOptions = (rememberMe = false) => ({
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  path: "/",
  maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
});

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const getMaxAgeFromExpiry = (expiryString) => {
  const value = parseInt(expiryString);
  const unit = expiryString.replace(/[0-9]/g, "");
  switch (unit) {
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    case "d":
      return value * 24 * 60 * 60 * 1000;
    default:
      return 7 * 24 * 60 * 60 * 1000;
  }
};

// ── Token generators ───────────────────────────────────────────────────────────

/** Token for a User document (existing students / teachers / admins) */
const generateUserTokens = (user, sessionId) => {
  const payload = {
    id: user._id,
    email: user.account.email,
    username: user.account.username,
    userType: user.userType,
    sessionId,
  };
  return {
    accessToken: jwt.sign(payload, ACCESS_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }),
    refreshToken: jwt.sign({ id: user._id, sessionId }, REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }),
  };
};

/** Token for a School admin (embedded admin sub-document) */
const generateSchoolAdminTokens = (school, sessionId) => {
  const payload = {
    id: school._id, // school document _id doubles as the identity
    schoolId: school._id,
    email: school.admin.email,
    fullName: school.admin.fullName,
    sessionId,
  };
  return {
    accessToken: jwt.sign(payload, ACCESS_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }),
    refreshToken: jwt.sign({ id: school._id, sessionId }, REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }),
  };
};

// ── Helpers ────────────────────────────────────────────────────────────────────

const SYSTEM_ROLES = ["Super Admin"];

const createDefaultRoles = async () => {
  for (const roleName of SYSTEM_ROLES) {
    const existingRole = await Role.findOne({
      roleName,
      schoolId: null,
      isSystemRole: true,
    });

    if (!existingRole) {
      await Role.create({
        roleName,
        schoolId: null,
        status: "Active",
        isSystemRole: true,
        modulePermissions: getSystemRolePermissions(roleName),
      });
    }
  }
};

const getSystemRolePermissions = (roleName) => {
  const full = {
    create: true,
    read: true,
    update: true,
    delete: true,
    export: true,
    import: true,
    all: true,
  };
  const readOnly = {
    create: false,
    read: true,
    update: false,
    delete: false,
    export: false,
    import: false,
    all: false,
  };

  if (roleName === "Super Admin")
    return { Dashboard: full, Schools: full, Admins: full, Settings: full };
  if (roleName === "Admin")
    return {
      Dashboard: full,
      Students: full,
      Teachers: full,
      Staff: full,
      Roles: { ...full, export: false, import: false },
    };
  if (roleName === "Teacher")
    return {
      Dashboard: readOnly,
      Students: readOnly,
      Attendance: { ...full, delete: false, import: false, all: false },
      Exams: {
        create: false,
        read: true,
        update: true,
        delete: false,
        export: true,
        import: false,
        all: false,
      },
    };
  if (roleName === "Student")
    return {
      Dashboard: readOnly,
      Profile: { ...readOnly, update: true },
      Attendance: readOnly,
      Exams: readOnly,
      Results: readOnly,
      Fees: readOnly,
    };
  return {};
};

// ── registerFirstAdmin (unchanged) ────────────────────────────────────────────

// export const registerFirstAdmin = async (req, res) => {
//   try {
//     const existingSuperAdmin = await User.findOne({
//       userType: "Super Admin",
//     });

//     if (existingSuperAdmin) {
//       return res.status(400).json({
//         message: "Super Admin already exists",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     const superAdmin = new User({
//       schoolId: null,
//       userType: "Super Admin",
//       account: {
//         username: req.body.username,
//         email: req.body.email,
//         phone: req.body.phone,
//         password: hashedPassword,
//         role: null,
//         status: "Active",
//       },
//       // studentInfo: {
//       //   personalInfo: {
//       //     fullName: req.body.fullName,
//       //     gender: req.body.gender,
//       //   },
//       //   contactInfo: {
//       //     primaryMobile: req.body.phone,
//       //     email: req.body.email,
//       //   },
//       // },
//       metadata: {
//         registrationIP: req.ip,
//       },
//     });

//     await superAdmin.save();

//     return res.status(201).json({
//       success: true,
//       message: "Super Admin created successfully",
//       data: {
//         email: superAdmin.account.email,
//         userType: superAdmin.userType,
//         role: null,
//       },
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

export const registerFirstAdmin = async (req, res) => {
  try {
    const existingSuperAdmin = await User.findOne({
      userType: "Super Admin",
    });

    if (existingSuperAdmin) {
      return res.status(400).json({
        message: "Super Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const superAdmin = new User({
      schoolId: null,
      userType: "Super Admin",
      account: {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
        role: null,
        status: "Active",
      },
      profileRef: null,
      profileModel: null,
      metadata: {
        registrationIP: req.ip,
      },
    });

    await superAdmin.save();

    return res.status(201).json({
      success: true,
      message: "Super Admin created successfully",
      data: {
        email: superAdmin.account.email,
        userType: superAdmin.userType,
        role: null,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ── LOGIN ──────────────────────────────────────────────────────────────────────

export const loginUser = async (req, res) => {
  const {
    username,
    password,
    deviceId,
    deviceInfo,
    rememberMe = false,
  } = req.body;

  try {
    // ── 1. Try matching a User (student / teacher / platform admin) ────────────
    const user = await User.findOne({
      $or: [
        { "account.username": username },
        { "account.email": username.toLowerCase() },
        { "studentInfo.studentId": username },
        { "studentInfo.admissionNumber": username },
      ],
    }).populate("account.role");

    if (user) {
      // ── Validate user account ────────────────────────────────────────────────
      if ((user.account.status || "Active") === "Inactive") {
        return res
          .status(403)
          .json({ message: "Your account is inactive. Please contact admin." });
      }

      const match = await bcrypt.compare(password, user.account.password);
      if (!match)
        return res.status(401).json({ message: "Invalid credentials" });

      user.account.lastLogin = new Date();
      if (!user.account.status) user.account.status = "Active";
      await user.save();

      // ── 2FA check ────────────────────────────────────────────────────────────
      const isTrustedDevice = user.account.trustedDevices?.some(
        (d) => d.deviceId === deviceId,
      );

      const roleData = user.account.role
        ? {
          roleName: user.account.role.roleName,
          modulePermissions: user.account.role.modulePermissions,
        }
        : null;

      const studentData =
        user.userType === "Student"
          ? {
            studentId: user.studentInfo?.studentId,
            admissionNumber: user.studentInfo?.admissionNumber,
            fullName: user.studentInfo?.personalInfo?.fullName,
            currentClass: user.studentInfo?.academicInfo?.currentClass,
            section: user.studentInfo?.academicInfo?.section,
            rollNumber: user.studentInfo?.rollNumber,
          }
          : null;

      if (!user.account.twoFactorEnabled || isTrustedDevice) {
        const sessionId = crypto.randomUUID();
        const { accessToken, refreshToken } = generateUserTokens(
          user,
          sessionId,
        );

        await RefreshToken.create({
          token: hashToken(refreshToken),
          user: user._id,
          sessionId,
          deviceId,
          deviceInfo: deviceInfo || "Unknown",
          expiresAt: new Date(
            Date.now() + getMaxAgeFromExpiry(REFRESH_TOKEN_EXPIRY),
          ),
        });

        const cookieOptions = getCookieOptions(rememberMe);
        res.cookie("token", accessToken, {
          ...cookieOptions,
          maxAge: getMaxAgeFromExpiry(ACCESS_TOKEN_EXPIRY),
        });
        res.cookie("refreshToken", refreshToken, cookieOptions);

        return res.status(200).json({
          message: "Login successful",
          user: {
            id: user._id,
            schoolId: user.schoolId,
            userType: user.userType,
            username: user.account.username,
            email: user.account.email,
            phone: user.account.phone,
            profileImage: user.account.profileImage,
            status: user.account.status || "Active",
            role: roleData,
            ...studentData,
          },
        });
      }

      // Send OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
      user.account.otp = String(otp);
      user.account.otpExpires = Date.now() + 5 * 60 * 1000;
      await user.save();
      await sendEmail(
        user.account.email,
        "Your Login OTP",
        `Your OTP code is: ${otp}`,
      );

      res.cookie("otpPending", "true", {
        httpOnly: false,
        secure: isProduction,
        sameSite: "lax",
        maxAge: 5 * 60 * 1000,
        path: "/",
      });
      res.cookie("otpEmail", user.account.email, {
        httpOnly: false,
        secure: isProduction,
        sameSite: "lax",
        maxAge: 5 * 60 * 1000,
        path: "/",
      });

      return res.status(200).json({
        message: "OTP sent to your email",
        twoFactor: true,
        email: user.account.email,
        userId: user._id.toString(),
        otp: !isProduction ? otp : undefined,
      });
    }

    // ── 2. No User found — try School admin email ──────────────────────────────
    const school = await School.findOne({
      "admin.email": username.toLowerCase(),
      approvalStatus: "Approved", // only let approved schools log in
      status: "Active",
    });

    if (school) {
      const match = await bcrypt.compare(password, school.admin.password);
      if (!match)
        return res.status(401).json({ message: "Invalid credentials" });

      const sessionId = crypto.randomUUID();
      const { accessToken, refreshToken } = generateSchoolAdminTokens(
        school,
        sessionId,
      );

      // Re-use the same RefreshToken collection; store schoolId in the user field
      await RefreshToken.create({
        token: hashToken(refreshToken),
        user: school._id, // school _id as the identity reference
        sessionId,
        deviceId,
        deviceInfo: deviceInfo || "Unknown",
        expiresAt: new Date(
          Date.now() + getMaxAgeFromExpiry(REFRESH_TOKEN_EXPIRY),
        ),
      });

      const cookieOptions = getCookieOptions(rememberMe);
      res.cookie("token", accessToken, {
        ...cookieOptions,
        maxAge: getMaxAgeFromExpiry(ACCESS_TOKEN_EXPIRY),
      });
      res.cookie("refreshToken", refreshToken, cookieOptions);

      return res.status(200).json({
        message: "Login successful",
        user: {
          id: school._id,
          schoolId: school._id,
          schoolName: school.schoolName,
          schoolCode: school.schoolCode,
          email: school.admin.email,
          fullName: school.admin.fullName,
          phone: school.admin.phone,
          plan: school.plan,
          status: school.status,
        },
      });
    }

    // ── 3. Nothing matched ─────────────────────────────────────────────────────
    return res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// ── REFRESH TOKEN ──────────────────────────────────────────────────────────────

export const refreshToken = async (req, res) => {
  try {
    const oldRefreshToken = req.cookies?.refreshToken;
    if (!oldRefreshToken)
      return res.status(401).json({ message: "No refresh token" });

    let decoded;
    try {
      decoded = jwt.verify(oldRefreshToken, REFRESH_SECRET);
    } catch {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const hashedToken = hashToken(oldRefreshToken);
    const storedToken = await RefreshToken.findOne({
      token: hashedToken,
      user: decoded.id,
      sessionId: decoded.sessionId,
      revoked: false,
      expiresAt: { $gt: new Date() },
    });
    if (!storedToken)
      return res.status(401).json({ message: "Session expired" });

    await RefreshToken.updateOne({ _id: storedToken._id }, { revoked: true });

    // Determine if identity is a User or a School admin
    const user = await User.findById(decoded.id);
    const school = !user ? await School.findById(decoded.id) : null;

    if (!user && !school)
      return res.status(401).json({ message: "Identity not found" });

    const newSessionId = crypto.randomUUID();
    const { accessToken, refreshToken: newRefreshToken } = user
      ? generateUserTokens(user, newSessionId)
      : generateSchoolAdminTokens(school, newSessionId);

    await RefreshToken.create({
      token: hashToken(newRefreshToken),
      user: decoded.id,
      sessionId: newSessionId,
      deviceId: storedToken.deviceId,
      deviceInfo: storedToken.deviceInfo,
      expiresAt: new Date(
        Date.now() + getMaxAgeFromExpiry(REFRESH_TOKEN_EXPIRY),
      ),
    });

    const cookieOptions = getCookieOptions(false);
    res.cookie("token", accessToken, {
      ...cookieOptions,
      maxAge: getMaxAgeFromExpiry(ACCESS_TOKEN_EXPIRY),
    });
    res.cookie("refreshToken", newRefreshToken, cookieOptions);

    return res
      .status(200)
      .json({ message: "Token refreshed successfully", success: true });
  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ── SEND REGISTRATION OTP ──────────────────────────────────────

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email and phone are required",
      });
    }

    // Check if email already registered
    const existingUser = await User.findOne({
      "account.email": email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save OTP in DB (upsert — update if exists, create if not)
    await TempOtp.findOneAndUpdate(
      { email: email.toLowerCase() },
      { otp: String(otp), expiresAt: new Date(Date.now() + 15 * 60 * 1000) },
      { upsert: true, new: true }
    );

    await sendEmail(
      email,
      "Registration OTP - School Management System",
      `Your OTP for registration is: ${otp}. It expires in 15 minutes.`
    );

    return res.status(200).json({
      success: true,
      message: "OTP generated successfully",
      otp: otp,
      email: email.toLowerCase(),
      otp: !isProduction ? otp : undefined, // visible only in dev
    });
  } catch (error) {
    console.error("Send Registration OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// new create VERIFY OTP ────────────────────
export const verifyRegistrationOtp  = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const stored = await TempOtp.findOne({ email: email.toLowerCase() });

    if (!stored) {
      return res.status(400).json({ success: false, message: "No OTP found. Request a new one." });
    }

    if (new Date() > stored.expiresAt) {
      await TempOtp.deleteOne({ _id: stored._id });
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    if (String(otp).trim() !== stored.otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    await TempOtp.deleteOne({ _id: stored._id });

    return res.status(200).json({
      success: true,
      message: "OTP verified. Proceed with registration.",
      verified: true,
      email: email.toLowerCase(),
    });
  } catch (error) {
    console.error("Verify Registration OTP error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── RESEND REGISTRATION OTP ────────────────────────────────────────────────────

export const resendRegistrationOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // Check if email already registered
    const existingUser = await User.findOne({ "account.email": email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    // Rate limit: check if OTP was sent less than 60 seconds ago
    const existing = await TempOtp.findOne({ email: email.toLowerCase() });
    if (existing) {
      const timeSinceLastSent = Date.now() - existing.updatedAt.getTime();
      if (timeSinceLastSent < 120 * 1000) {
        return res.status(429).json({
          success: false,
          message: "Please wait 2 minute before requesting a new OTP",
        });
      }
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save/update in DB
    await TempOtp.findOneAndUpdate(
      { email: email.toLowerCase() },
      { otp: String(otp), expiresAt: new Date(Date.now() + 15 * 60 * 1000) },
      { upsert: true, new: true }
    );

    // Send email
    await sendEmail(email, "Registration OTP", `Your OTP is: ${otp}. Expires in 15 minutes.`);

    return res.status(200).json({
      success: true,
      message: "OTP resent successfully",
      email: email.toLowerCase(),
      otp: !isProduction ? otp : undefined,
    });
  } catch (error) {
    console.error("Resend Registration OTP error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



// ── VERIFY OTP (unchanged — only applies to User accounts) ────────────────────

export const verifyotp = async (req, res) => {
  try {
    const { email, otp, deviceId, deviceInfo, rememberMe = false } = req.body;

    const user = await User.findOne({
      "account.email": email.toLowerCase(),
    }).populate("account.role");
    if (!user) return res.status(404).json({ message: "User not found" });

    const isOtpValid = String(otp).trim() === String(user.account.otp).trim();
    const isNotExpired = Date.now() <= user.account.otpExpires;
    if (!isOtpValid || !isNotExpired)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    user.account.otp = null;
    user.account.otpExpires = null;

    if (
      deviceId &&
      !user.account.trustedDevices?.some((d) => d.deviceId === deviceId)
    ) {
      (user.account.trustedDevices ??= []).push({
        deviceId,
        deviceInfo: deviceInfo || "Unknown",
        addedAt: new Date(),
      });
    }
    await user.save();

    const sessionId = crypto.randomUUID();
    const { accessToken, refreshToken } = generateUserTokens(user, sessionId);

    await RefreshToken.create({
      token: hashToken(refreshToken),
      user: user._id,
      sessionId,
      deviceId,
      deviceInfo: deviceInfo || "Unknown",
      expiresAt: new Date(
        Date.now() + getMaxAgeFromExpiry(REFRESH_TOKEN_EXPIRY),
      ),
    });

    const cookieOptions = getCookieOptions(rememberMe);
    res.cookie("token", accessToken, {
      ...cookieOptions,
      maxAge: getMaxAgeFromExpiry(ACCESS_TOKEN_EXPIRY),
    });
    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.clearCookie("otpPending", { path: "/" });
    res.clearCookie("otpEmail", { path: "/" });

    return res
      .status(200)
      .json({ message: "OTP verified successfully", success: true });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({
      message: "Server error during OTP verification",
      error: error.message,
    });
  }
};

// ── LOGOUT ─────────────────────────────────────────────────────────────────────

export const logoutUser = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      try {
        const decoded = jwt.verify(token, REFRESH_SECRET);
        await RefreshToken.updateMany(
          { sessionId: decoded.sessionId },
          { revoked: true },
        );
      } catch {
        /* ignore */
      }
    }

    const cookieOptions = getCookieOptions(false);
    [
      "token",
      "refreshToken",
      "userId",
      "userData",
      "otpPending",
      "otpEmail",
    ].forEach((name) => res.clearCookie(name, cookieOptions));

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ── GET ME ─────────────────────────────────────────────────────────────────────

export const getMe = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    let decoded;
    try {
      decoded = jwt.verify(token, ACCESS_SECRET);
    } catch {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // SchoolAdmin identity
    if (decoded.userType === "SchoolAdmin") {
      const school = await School.findById(decoded.schoolId).select(
        "-admin.password",
      );
      if (!school) return res.status(401).json({ logout: true });
      return res.status(200).json({
        user: {
          id: school._id,
          schoolId: school._id,
          schoolName: school.schoolName,
          schoolCode: school.schoolCode,
          email: school.admin.email,
          fullName: school.admin.fullName,
          phone: school.admin.phone,
          plan: school.plan,
          status: school.status,
        },
      });
    }

    // Regular User identity
    const user = await User.findById(decoded.id)
      .populate("account.role")
      .select(
        "-account.password -account.plainPassword -account.refreshTokens",
      );

    if (!user) {
      res.clearCookie("token");
      res.clearCookie("refreshToken");
      res.clearCookie("userId");
      return res.status(401).json({ logout: true });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ── RESEND OTP ─────────────────────────────────────────────────────────────────

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ "account.email": email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.account.otp = String(otp);
    user.account.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();
    await sendEmail(email, "Your Login OTP", `Your OTP code is: ${otp}`);

    res.status(200).json({
      message: "OTP resent successfully",
      otp: !isProduction ? otp : undefined,
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Failed to resend OTP" });
  }
};

// ── TOGGLE 2FA ─────────────────────────────────────────────────────────────────

export const toggleTwoFactor = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.account.twoFactorEnabled = !user.account.twoFactorEnabled;
    await user.save();

    return res.status(200).json({
      message: `Two-factor authentication ${user.account.twoFactorEnabled ? "enabled" : "disabled"} successfully`,
      twoFactorEnabled: user.account.twoFactorEnabled,
    });
  } catch (error) {
    console.error("Toggle 2FA error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ── LOG DEVICE ─────────────────────────────────────────────────────────────────

export const logDevice = async (req, res) => {
  try {
    const { userId, latitude, longitude } = req.body;
    let ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "")
      .split(",")[0]
      .trim();
    const userAgent = req.headers["user-agent"];

    let device = "Unknown";
    try {
      const browserName = userAgent.split("/")[0];
      const osMatch = userAgent.match(/\(([^)]+)\)/);
      const os = osMatch ? osMatch[1].split(";")[0].trim() : "Unknown";
      device = `${browserName} ${os.split(" ")[0]}`;
    } catch {
      /* ignore */
    }

    let location = "Unknown";
    if (ip === "::1" || ip === "::ffff:127.0.0.1") {
      ip = "127.0.0.1";
      location = "Localhost / Dev";
    } else {
      try {
        const { default: axios } = await import("axios");
        const { data } = await axios.get(`https://ipapi.co/${ip}/json/`);
        location = `${data.city}, ${data.region}, ${data.country_name}`;
      } catch {
        /* ignore */
      }
    }

    console.log("Device logged:", { userId, ip, location, device });
    res.status(200).json({ message: "Device logged" });
  } catch (error) {
    console.error("Log Device Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
