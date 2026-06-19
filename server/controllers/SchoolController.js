import bcrypt from "bcryptjs";
import School from "../models/SchoolModel.js";
import Role from "../models/roleModel.js";
// import User from "../models/studentsmodel.js";
import User from "../models/UserSchema.js";
import { createSchoolFixedRoles } from "./roleController.js";


// Generate School Code
const generateSchoolCode = (schoolName) => {
  const initials = schoolName
    .split(" ")
    .map((word) => word[0]?.toUpperCase() || "")
    .join("");

  return `${initials}-${Date.now()}`;
};
// ===============================
// Register School
// ===============================
export const registerSchool = async (req, res) => {
  try {
    const {
      schoolName,
      schoolDomain,
      country,
      state,
      city,
      schoolType,
      numberOfStudents,

      fullName,
      phone,
      email,
      password,
      confirmPassword,

      plan,
    } = req.body;

    if (
      !schoolName ||
      !schoolDomain ||
      !country ||
      !state ||
      !city ||
      !schoolType ||
      !numberOfStudents
    ) {
      return res.status(400).json({
        success: false,
        message: "All school details are required.",
      });
    }

    if (!fullName || !phone || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All admin details are required.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    const existingSchool = await School.findOne({
      "admin.email": email,
    });

    if (existingSchool) {
      return res.status(409).json({
        success: false,
        message: "School already exists with this email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const schoolCode = generateSchoolCode(schoolName);

    const school = await School.create({
      schoolName,
      schoolCode,
      schoolDomain,
      country,
      state,
      city,
      schoolType,
      numberOfStudents,
      plan,

      admin: {
        fullName,
        phone,
        email,
        password: hashedPassword,
      },
    });

    const schoolData = school.toObject();
    delete schoolData.admin.password;

    return res.status(201).json({
      success: true,
      message: "School registered successfully",
      data: schoolData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get All Schools
// ===============================
export const getAllSchools = async (req, res) => {
  try {
    const schools = await School.find().select("-admin.password");

    return res.status(200).json({
      success: true,
      count: schools.length,
      data: schools,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get School By Id
// ===============================
export const getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id).select(
      "-admin.password",
    );

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: school,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update School
// ===============================
export const updateSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    Object.assign(school, req.body);

    await school.save();

    return res.status(200).json({
      success: true,
      message: "School updated successfully",
      data: school,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete School
// ===============================
export const deleteSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    await School.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "School deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Approve School
// ===============================
export const approveSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    if (school.approvalStatus === "Approved") {
      return res.status(400).json({
        success: false,
        message: "School already approved",
      });
    }

    const existingAdmin = await User.findOne({
      "account.email": school.admin.email,
    });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin user already exists with this email",
      });
    }

    const adminUser = await User.create({
      schoolId: school._id,
      userType: "Admin",
      account: {
        username: school.admin.email,
        email: school.admin.email,
        phone: school.admin.phone,
        password: school.admin.password,
        status: "Active",
      },
      studentInfo: {
        personalInfo: {
          fullName: school.admin.fullName,
        },
        contactInfo: {
          primaryMobile: school.admin.phone,
          email: school.admin.email,
        },
      },
      metadata: {
        createdBy: req.user?._id,
      },
    });

    await createSchoolFixedRoles(school._id, adminUser._id);

    const adminRole = await Role.findOne({
      roleName: "Admin",
      schoolId: school._id,
      isSystemRole: true,
    });

    if (!adminRole) {
      return res.status(500).json({
        success: false,
        message: "Admin role was not created",
      });
    }

    adminUser.account.role = adminRole._id;
    await adminUser.save();

    school.approvalStatus = "Approved";
    school.status = "Active";
    school.admin.userId = adminUser._id;
    await school.save();

    const safeSchool = school.toObject();
    delete safeSchool.admin.password;

    return res.status(200).json({
      success: true,
      message: "School approved. Admin user and fixed roles created.",
      data: {
        school: safeSchool,
        admin: {
          id: adminUser._id,
          email: adminUser.account.email,
          username: adminUser.account.username,
          role: "Admin",
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Reject School
// ===============================
export const rejectSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    school.approvalStatus = "Rejected";
    school.status = "Inactive";

    await school.save();

    return res.status(200).json({
      success: true,
      message: "School rejected successfully",
      data: school,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// School Dashboard
// ===============================
export const getSchoolDashboard = async (req, res) => {
  try {
    const school = await School.findById(req.params.id).select(
      "-admin.password",
    );

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        schoolId: school._id,
        schoolName: school.schoolName,
        schoolCode: school.schoolCode,
        plan: school.plan,
        status: school.status,
        approvalStatus: school.approvalStatus,
        numberOfStudents: school.numberOfStudents,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
