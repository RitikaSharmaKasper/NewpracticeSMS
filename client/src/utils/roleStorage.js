import roleMenuData from "../data/roleMenuPermissions.json";
import roleListData from "../data/role.json";
import staffsRolesData from "../data/staffsroles.json";

export const SYSTEM_ROLES = ["Administrator", "Teacher", "Student"];
export const ROLE_STORAGE_KEY = "sms-management-roles";
export const ROLE_PERMISSION_STORAGE_KEY = "sms-management-role-permissions";
export const USER_ROLE_USERS_KEY = "sms-management-user-role-users";

export const readStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export const writeStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const baseRoles = roleListData.map((role, index) => ({
  id: index + 1,
  roleName: role.roleName,
  members: role.members || 0,
  permissions: role.permissions || "Limited",
  status: role.status || roleMenuData.roleDetails[role.roleName]?.status || "Active",
  remarks: roleMenuData.roleDetails[role.roleName]?.remarks || "",
  isSystemRole: SYSTEM_ROLES.includes(role.roleName),
}));

export const baseUsers = staffsRolesData;

export const getStoredRoles = () => readStorage(ROLE_STORAGE_KEY, baseRoles);
export const getStoredRolePermissions = () => readStorage(ROLE_PERMISSION_STORAGE_KEY, {});
export const getStoredUsers = () => readStorage(USER_ROLE_USERS_KEY, baseUsers);

export const permissionSummaryForRole = (roleName, permissionsMap = getStoredRolePermissions()) => {
  if (roleName === "Administrator") return "Full";

  const rolePermissions = permissionsMap[roleName] || roleMenuData.defaultPermissions[roleName];
  if (!rolePermissions) return "Limited";

  const enabledMenus = Object.values(rolePermissions).filter(Boolean);
  if (enabledMenus.length === 0) return "Limited";

  const allEnabled = enabledMenus.every((menuPermissions) =>
    Object.values(menuPermissions).every((value) => {
      if (value && typeof value === "object") {
        return Object.values(value).every(Boolean);
      }
      return Boolean(value);
    })
  );

  return allEnabled ? "Full" : "Limited";
};
