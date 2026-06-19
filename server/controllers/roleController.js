import Role from "../models/rolemodel.js";
import Students from "../models/studentsmodel.js";
import mongoose from "mongoose";
import User from "../models/UserSchema.js";

const actionsFull = {
  add: true,
  view: true,
  edit: true,
  delete: true,
};

const actionsViewOnly = {
  add: false,
  view: true,
  edit: false,
  delete: false,
};

const actionsTeacher = {
  add: true,
  view: true,
  edit: true,
  delete: false,
};


const getSystemRolePermissions = (roleName) => {
  if (roleName === "Admin") {
    return {
      Dashboard: {
        create: true,
        read: true,
        update: true,
        delete: true,
        export: true,
        import: true,
        all: true,
        subPermissions: {
          KPI: true,
          TotalStudents: true,
          TotalStaff: true,
          TotalTeachers: true,
          MonthlyRevenue: true,
          PendingFees: true,
          AttendanceRate: true,
          PresentStaffs: true,
          UpcomingExams: true,
          Class: true,
          Room: true,
          NewAdmission: true,
          PresentStudent: true,
          Login: true,
          LeaveBoard: true,
          AttendanceOverview: true,
          StaffMemberAttendance: true,
          QuickActions: true,
          AddStudent: true,
          AddStaff: true,
          CollectFee: true,
          StudentAttendance: true,
          UploadStudyMaterial: true,
          CreateHomework: true,
          CreateNotice: true,
          ViewClassPerformance: true,
        },
      },

      Students: {
        create: true,
        read: true,
        update: true,
        delete: true,
        export: true,
        import: true,
        all: true,
        subPermissions: {
          AllStudents: actionsFull,
          DailyAttendance: actionsFull,
          PeriodWiseAttendance: actionsFull,
          Performance: actionsFull,
          LeaveRequest: actionsFull,
          IDCard: actionsFull,
          ManageLogin: actionsFull,
          PromoteStudent: actionsFull,
          StudentProfile: actionsFull,
          AdmissionLetter: actionsFull,
        },
      },

      Teachers: {
        create: true,
        read: true,
        update: true,
        delete: true,
        export: true,
        import: true,
        all: true,
        subPermissions: {
          AllTeachers: actionsFull,
          AddTeacher: actionsFull,
          TeacherAttendance: actionsFull,
          TeacherPerformance: actionsFull,
          TeacherProfile: actionsFull,
        },
      },

      Staff: {
        create: true,
        read: true,
        update: true,
        delete: true,
        export: true,
        import: true,
        all: true,
        subPermissions: {
          AllStaff: actionsFull,
          AddStaff: actionsFull,
          StaffAttendance: actionsFull,
          StaffLeave: actionsFull,
          StaffProfile: actionsFull,
          StaffIDCard: actionsFull,
        },
      },

      Roles: {
        create: true,
        read: true,
        update: true,
        delete: true,
        export: false,
        import: false,
        all: true,
        subPermissions: {
          RoleList: actionsFull,
          CreateRole: actionsFull,
          EditRole: actionsFull,
          DeleteRole: actionsFull,
          AssignPermissions: actionsFull,
        },
      },
    };
  }

  if (roleName === "Teacher") {
    return {
      Dashboard: {
        create: false,
        read: true,
        update: false,
        delete: false,
        export: false,
        import: false,
        all: false,
        subPermissions: {
          KPI: true,
          TotalStudents: false,
          TotalStaff: false,
          TotalTeachers: false,
          MonthlyRevenue: false,
          PendingFees: false,
          AttendanceRate: true,
          PresentStaffs: false,
          UpcomingExams: true,
          Class: true,
          Room: false,
          NewAdmission: false,
          PresentStudent: true,
          Login: false,
          LeaveBoard: true,
          AttendanceOverview: true,
          StaffMemberAttendance: false,
          QuickActions: true,
          AddStudent: false,
          AddStaff: false,
          CollectFee: false,
          StudentAttendance: true,
          UploadStudyMaterial: true,
          CreateHomework: true,
          CreateNotice: false,
          ViewClassPerformance: true,
        },
      },

      Students: {
        create: false,
        read: true,
        update: false,
        delete: false,
        export: false,
        import: false,
        all: false,
        subPermissions: {
          AllStudents: actionsViewOnly,
          DailyAttendance: actionsTeacher,
          PeriodWiseAttendance: actionsTeacher,
          Performance: {
            add: false,
            view: true,
            edit: true,
            delete: false,
          },
          LeaveRequest: {
            add: false,
            view: true,
            edit: true,
            delete: false,
          },
          IDCard: actionsViewOnly,
          ManageLogin: {
            add: false,
            view: false,
            edit: false,
            delete: false,
          },
          PromoteStudent: {
            add: false,
            view: false,
            edit: false,
            delete: false,
          },
          StudentProfile: actionsViewOnly,
          AdmissionLetter: actionsViewOnly,
        },
      },

      Attendance: {
        create: true,
        read: true,
        update: true,
        delete: false,
        export: true,
        import: false,
        all: false,
        subPermissions: {
          MarkAttendance: actionsTeacher,
          ViewAttendance: actionsViewOnly,
          AttendanceReport: {
            add: false,
            view: true,
            edit: false,
            delete: false,
          },
        },
      },

      Exams: {
        create: false,
        read: true,
        update: true,
        delete: false,
        export: true,
        import: false,
        all: false,
        subPermissions: {
          ExamList: actionsViewOnly,
          MarksEntry: {
            add: true,
            view: true,
            edit: true,
            delete: false,
          },
          Results: actionsViewOnly,
        },
      },
    };
  }

  if (roleName === "Student") {
    return {
      Dashboard: {
        create: false,
        read: true,
        update: false,
        delete: false,
        export: false,
        import: false,
        all: false,
        subPermissions: {
          KPI: false,
          MyAttendance: true,
          MyHomework: true,
          MyResult: true,
          MyFees: true,
          Notices: true,
          UpcomingExams: true,
        },
      },

      Profile: {
        create: false,
        read: true,
        update: true,
        delete: false,
        export: false,
        import: false,
        all: false,
        subPermissions: {
          PersonalInfo: {
            add: false,
            view: true,
            edit: true,
            delete: false,
          },
          AcademicInfo: actionsViewOnly,
          ParentInfo: actionsViewOnly,
          Documents: actionsViewOnly,
        },
      },

      Attendance: {
        create: false,
        read: true,
        update: false,
        delete: false,
        export: false,
        import: false,
        all: false,
        subPermissions: {
          MyAttendance: actionsViewOnly,
          AttendanceReport: actionsViewOnly,
        },
      },

      Exams: {
        create: false,
        read: true,
        update: false,
        delete: false,
        export: false,
        import: false,
        all: false,
        subPermissions: {
          ExamSchedule: actionsViewOnly,
          AdmitCard: actionsViewOnly,
        },
      },

      Results: {
        create: false,
        read: true,
        update: false,
        delete: false,
        export: false,
        import: false,
        all: false,
        subPermissions: {
          MyResult: actionsViewOnly,
          ReportCard: actionsViewOnly,
        },
      },

      Fees: {
        create: false,
        read: true,
        update: false,
        delete: false,
        export: false,
        import: false,
        all: false,
        subPermissions: {
          FeeDetails: actionsViewOnly,
          FeeReceipt: actionsViewOnly,
          PaymentHistory: actionsViewOnly,
        },
      },
    };
  }

  return {};
};

// helper
export const createSchoolFixedRoles = async (schoolId, adminId) => {
  const roles = ["Admin", "Teacher", "Student"];

  for (const roleName of roles) {
    const existingRole = await Role.findOne({
      roleName,
      schoolId,
      isSystemRole: true,
    });

    if (!existingRole) {
      await Role.create({
        roleName,
        schoolId,
        createdBy: adminId,
        isSystemRole: true,
        status: "Active",
        modulePermissions: getSystemRolePermissions(roleName),
      });
    }
  }
};

// Create role with only modulePermissions
export const createRole = async (req, res, next) => {
  try {
    const { roleName, status, remarks, modulePermissions = {} } = req.body;

    // Validate required fields
    if (!roleName) {
      return res.status(400).json({ message: "Role name is required" });
    }

    const systemRoles = ["Super Admin", "Admin", "Teacher", "Student"];

    if (systemRoles.includes(roleName)) {
      return res.status(400).json({
        message: `${roleName} is a system role. You cannot create it manually.`,
      });
    }

    // Check for existing role
    const existingRole = await Role.findOne({
      roleName,
      schoolId: req.user.schoolId,
    });
    if (existingRole) {
      return res
        .status(400)
        .json({ message: "Role already exists in this school" });
    }

    // Ensure modulePermissions have the correct structure with 'all' field
    const enhancedPermissions = {};
    Object.keys(modulePermissions).forEach((module) => {
      const perms = modulePermissions[module];

      enhancedPermissions[module] = {
        create: perms.create || false,
        read: perms.read || false,
        update: perms.update || false,
        delete: perms.delete || false,
        export: perms.export || false,
        import: perms.import || false,
        all:
          perms.all ||
          (perms.create &&
            perms.read &&
            perms.update &&
            perms.delete &&
            perms.export &&
            perms.import) ||
          false,
        subPermissions: perms.subPermissions || {},
      };
    });

    const newRole = await Role.create({
      roleName,
      status: status || "Active",
      remarks,
      modulePermissions: enhancedPermissions,

      // important for SaaS
      schoolId: req.user.schoolId,
      createdBy: req.user._id,
      isSystemRole: false,
    });

    // await newRole.save();

    res.status(201).json({
      message: "Custom role created successfully",
      role: newRole,
    });
  } catch (error) {
    next(error);
    console.error("Create role error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all roles with member count
export const getAllRoles = async (req, res, next) => {
  try {
    const filter = {};
    if (req.user.userType !== "Super Admin") {
      filter.schoolId = req.user.schoolId;
      // filter.$or = [{ schoolId: req.user.schoolId }, { isSystemRole: true }];
    }

    const roles = await Role.find(filter).sort({ createdAt: -1 });

    // Manually calculate member count for each role
    const formattedRoles = await Promise.all(
      roles.map(async (role) => {
        const memberCount = await User.countDocuments({
          schoolId: req.user.schoolId,
          "account.role": role._id,
        });

        return {
          _id: role._id,
          roleName: role.roleName,
          status: role.status,
          isSystemRole: role.isSystemRole,
          modulePermissions: role.modulePermissions,
          memberCount,
          createdAt: role.createdAt,
          updatedAt: role.updatedAt,
        };
      }),
    );

    res.status(200).json(formattedRoles);
  } catch (error) {
    next(error);
    console.error("Get all roles error:", error);
    res.status(500).json({
      message: "Error fetching roles",
      error: error.message,
    });
  }
};

// Get role by ID with member count
export const getRoleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Add validation for invalid IDs
    if (!id || id === "undefined" || id === "null") {
      return res.status(400).json({
        message: "Invalid role ID provided",
      });
    }

    // Optional: Add MongoDB ObjectId validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid role ID format",
      });
    }

    const role = await Role.findById(id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    const memberCount = await Students.countDocuments({
      "account.role": role._id,
    });

    const formattedRole = {
      _id: role._id,
      roleName: role.roleName,
      status: role.status,
      modulePermissions: role.modulePermissions,
      memberCount: memberCount || 0,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    };

    res.status(200).json(formattedRole);
  } catch (error) {
    next(error);
    console.error("Error fetching role by ID:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get only active roles (for dropdowns)
export const getActiveRoles = async (req, res, next) => {
  try {
    const activeRoles = await Role.find({
      status: "Active",
      $or: [{ schoolId: req.user.schoolId }, { isSystemRole: true }],
    });

    // Format for react-select with member counts
    const formattedRoles = await Promise.all(
      activeRoles.map(async (role) => {
        const memberCount = await Students.countDocuments({
          "account.role": role._id,
        });

        return {
          label: role.roleName,
          value: role._id,
          memberCount: memberCount || 0,
          permissions: role.modulePermissions,
        };
      }),
    );

    res.status(200).json(formattedRoles);
  } catch (error) {
    next(error);
    console.error("Get active roles error:", error);
    res.status(500).json({
      message: "Error fetching active roles",
      error: error.message,
    });
  }
};

// Update role
// export const updateRole = async (req, res, next) => {
//   try {
//     const { roleName, status, remarks, modulePermissions } = req.body;

//     const role = await Role.findById(req.params.id);

//     if (!role) {
//       return res.status(404).json({
//         message: "Role not found",
//       });
//     }

//     // Scalar fields: only overwrite when explicitly provided
//     if (roleName !== undefined) role.roleName = roleName;
//     if (status !== undefined) role.status = status;
//     if (remarks !== undefined) role.remarks = remarks;

//     // Permissions: deep-merge instead of replacing the whole map,
//     // so modules/fields/subPermissions not present in the request are preserved
//     if (modulePermissions && typeof modulePermissions === "object") {
//       // Plain-object snapshot of current permissions (subPermissions become plain objects too)
//       const existing = role.toObject().modulePermissions || {};

//       Object.keys(modulePermissions).forEach((module) => {
//         const incoming = modulePermissions[module] || {};
//         const current = existing[module] || {};

//         const merged = {
//           create: incoming.create ?? current.create ?? false,
//           read: incoming.read ?? current.read ?? false,
//           update: incoming.update ?? current.update ?? false,
//           delete: incoming.delete ?? current.delete ?? false,
//           export: incoming.export ?? current.export ?? false,
//           import: incoming.import ?? current.import ?? false,
//           // Merge sub-permissions key-by-key so existing keys are preserved
//           subPermissions: {
//             ...(current.subPermissions || {}),
//             ...(incoming.subPermissions || {}),
//           },
//         };

//         // "all" is derived unless the caller sets it explicitly
//         const allDerived =
//           merged.create &&
//           merged.read &&
//           merged.update &&
//           merged.delete &&
//           merged.export &&
//           merged.import;
//         merged.all = incoming.all ?? allDerived ?? false;

//         existing[module] = merged;
//       });

//       role.modulePermissions = existing;
//       role.markModified("modulePermissions");
//     }

//     await role.save();

//     res.status(200).json({
//       message: "Role updated successfully",
//       role,
//     });
//   } catch (error) {
//     console.error("Update role error:", error);
//     next(error);
//   }
// };




// Update role (PATCH-style partial update)
export const updateRole = async (req, res, next) => {
  try {
    const { roleName, status, remarks, modulePermissions } = req.body;

    const updateData = {};

    // Scalar fields: only set when explicitly provided
    if (roleName !== undefined) updateData.roleName = roleName;
    if (status !== undefined) updateData.status = status;
    if (remarks !== undefined) updateData.remarks = remarks;

    // Permissions: build dot-notation paths so only sent keys change
    if (modulePermissions && typeof modulePermissions === "object") {
      Object.keys(modulePermissions).forEach((module) => {
        const perms = modulePermissions[module] || {};

        Object.keys(perms).forEach((field) => {
          if (field === "subPermissions" && perms.subPermissions) {
            // set each sub-key individually -> preserves existing sub-keys
            Object.keys(perms.subPermissions).forEach((sub) => {
              updateData[`modulePermissions.${module}.subPermissions.${sub}`] =
                perms.subPermissions[sub];
            });
          } else {
            updateData[`modulePermissions.${module}.${field}`] = perms[field];
          }
        });
      });
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({
      message: "Role updated successfully",
      role,
    });
  } catch (error) {
    console.error("Update role error:", error);
    next(error);
  }
};



// Delete role (with check for assigned users)
export const deleteRole = async (req, res, next) => {
  try {
    const roleId = req.params.id;

    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    if (role.isSystemRole) {
      return res.status(400).json({
        message: "System role cannot be deleted",
      });
    }

    // Check if any users are assigned to this role
    const userCount = await Students.countDocuments({ "account.role": roleId });

    if (userCount > 0) {
      return res.status(400).json({
        message: `Cannot delete role. ${userCount} user(s) are assigned to this role.`,
      });
    }

    await Role.findByIdAndDelete(roleId);

    res.status(200).json({
      message: "Role deleted successfully",
      deletedRole: role,
    });
  } catch (error) {
    next(error);
    console.error("Delete role error:", error);
    res.status(500).json({
      message: "Error deleting role",
      error: error.message,
    });
  }
};

// Get role member count
export const getRoleMemberCount = async (req, res, next) => {
  try {
    const roleId = req.params.id;
    const count = await User.countDocuments({
      schoolId: req.user.schoolId,
      "account.role": roleId,
    });

    res.status(200).json({ count });
  } catch (error) {
    next(error);
    console.error("Get role member count error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Update role status
export const updateRoleStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({
      message: "Role status updated successfully",
      role,
    });
  } catch (error) {
    next(error);
    console.error("Update role status error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Duplicate role
export const duplicateRole = async (req, res, next) => {
  try {
    const roleId = req.params.id;
    const { newRoleName } = req.body;

    if (!newRoleName) {
      return res.status(400).json({ message: "New role name is required" });
    }

    // Check if new role name already exists
    const existingRole = await Role.findOne({ roleName: newRoleName });
    if (existingRole) {
      return res.status(400).json({ message: "Role name already exists" });
    }

    // Get original role
    const originalRole = await Role.findById(roleId);
    if (!originalRole) {
      return res.status(404).json({ message: "Original role not found" });
    }

    // Create duplicate with new name
    const duplicateRole = new Role({
      roleName: newRoleName,
      status: originalRole.status,
      modulePermissions: originalRole.modulePermissions,
    });

    await duplicateRole.save();

    res.status(201).json({
      message: "Role duplicated successfully",
      role: duplicateRole,
    });
  } catch (error) {
    next(error);
    console.error("Duplicate role error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// POST /api/roles/assign-permissions
export const assignPermissions = async (req, res, next) => {
  const { roleId, permissions } = req.body;
  try {
    const role = await Role.findById(roleId);
    if (!role) return res.status(404).json({ message: "Role not found" });

    // Ensure permissions have the correct structure with 'all' field
    const enhancedPermissions = {};
    Object.keys(permissions).forEach((module) => {
      const perms = permissions[module];
      enhancedPermissions[module] = {
        create: perms.create || false,
        read: perms.read || false,
        update: perms.update || false,
        delete: perms.delete || false,
        export: perms.export || false,
        import: perms.import || false,
        all:
          (perms.create &&
            perms.read &&
            perms.update &&
            perms.delete &&
            perms.export &&
            perms.import) ||
          perms.all ||
          false,
        subPermissions: perms.subPermissions || {},
      };
    });

    role.modulePermissions = enhancedPermissions;
    await role.save();

    res.status(200).json({
      message: "Permissions updated successfully",
      role,
    });
  } catch (err) {
    next(err);
    console.error("Assign permissions error:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};
