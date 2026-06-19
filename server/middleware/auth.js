import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";
import School from "../models/SchoolModel.js";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;

export const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, ACCESS_SECRET);

    // ── School Admin token ─────────────────────────────────────────────────────
    if (decoded.userType === "SchoolAdmin") {
      const school = await School.findById(decoded.schoolId).select(
        "_id schoolName schoolCode admin.email admin.fullName admin.phone plan status approvalStatus",
      );

      if (!school) {
        return res.status(401).json({ message: "School not found" });
      }

      if (school.status !== "Active" || school.approvalStatus !== "Approved") {
        return res
          .status(403)
          .json({ message: "School account is not active or approved" });
      }

      // Attach a unified req.user shape so downstream controllers work consistently
      req.user = {
        _id: school._id,
        userType: "SchoolAdmin",
        schoolId: school._id,
        schoolName: school.schoolName,
        schoolCode: school.schoolCode,
        account: {
          email: school.admin.email,
          fullName: school.admin.fullName,
          phone: school.admin.phone,
          role: null, // no Role document for embedded admin
        },
      };

      return next();
    }

    // ── Regular User token (Student / Teacher / Admin / Super Admin) ───────────
    const user = await User.findById(decoded.id)
      .select(
        "_id schoolId account.email account.username account.role userType account.status",
      )
      .populate("account.role");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if ((user.account.status || "Active") === "Inactive") {
      return res.status(403).json({ message: "Account is inactive" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ── Optional role-guard helper ─────────────────────────────────────────────────
// Usage: router.get("/admin-only", authMiddleware, requireRole("Admin", "Super Admin"), handler)
export const requireRole =
  (...allowedRoles) =>
  (req, res, next) => {
    const userType = req.user?.userType;
    const roleName = req.user?.account?.role?.roleName;

    if (allowedRoles.includes(userType) || allowedRoles.includes(roleName)) {
      return next();
    }
    return res
      .status(403)
      .json({ message: "Access denied: insufficient permissions" });
  };
