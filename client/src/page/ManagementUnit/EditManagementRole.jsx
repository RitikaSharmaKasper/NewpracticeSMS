import React, { useEffect, useState ,useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { MdOutlineShield } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";
import roleMenuData from "../../data/roleMenuPermissions.json";
import dropdownDesignData from "../../data/rolePermissionDropdownDesigns.json";
import { GoPlus } from "react-icons/go";
import { IoMdArrowBack } from "react-icons/io"; 
import systemrole_icon from "../../assets/images/systemrole-icon.png"
import dropdown  from "../../assets/images/dropdown.png";
import {
  ROLE_PERMISSION_STORAGE_KEY,
  ROLE_STORAGE_KEY,
  SYSTEM_ROLES,
  baseRoles,
  readStorage,
} from "../../utils/roleStorage";

import { toast } from "react-toastify";
import api from "../../config/axiosInstance";

const ROLE_SHIELD_COLORS = {
  Admin: "#F94144",
  Administrator: "#F94144",
  Teacher: "#F3722C",
  Student: "#F8961E",
  Accountant: "#43AA8B",
  Driver: "#43AA8B",
  Librarian: "#43AA8B",
};

const ACTION_COLUMNS = dropdownDesignData.actionColumns || ["Add", "View", "Edit", "Delete"];
const ALL_ROLE_MENUS = Object.keys(roleMenuData.menus);
const MENU_ACCESS_KEY = "__menuAccess";
const MENU_NAME_ALIASES = {
  HomeWork: "Homework",
  "Events & Calendar": "Events and Calendar",
  Messages: "Messages",
};
const MENU_DESIGN_ALIASES = {
  Message: "Messages",
};

// const getMenuDesign = (menu) => {
//   const designKey = MENU_DESIGN_ALIASES[menu] || menu;
//   return dropdownDesignData.menuDesigns?.[designKey] || { type: dropdownDesignData.defaultDesign || "grid" };
// };
const getMenuDesign = (menu, roleName = "") => {
  const roleOverride = dropdownDesignData.roleOverrides?.[roleName]?.[menu];
  if (roleOverride) return roleOverride;
  const designKey = MENU_DESIGN_ALIASES[menu] || menu;
  return dropdownDesignData.menuDesigns?.[designKey] || { type: dropdownDesignData.defaultDesign || "grid" };
};
// const getMenuItems = (menu, roleName = "") => {
//   const design = getMenuDesign(menu, roleName);
//   if (!design.type || design.type === "") return [];
//   const roleSpecificItems = roleMenuData.roleMenuItems?.[roleName]?.[menu];
//   return roleSpecificItems ?? roleMenuData.menus[menu] ?? [];
// };
const getMenuItems = (menu, roleName = "") => {
  const design = getMenuDesign(menu, roleName);
  if (!design.type || design.type === "") return [];
  const roleSpecificItems = roleMenuData.roleMenuItems?.[roleName]?.[menu];
  return roleSpecificItems ?? roleMenuData.menus[menu] ?? [];
};

const resolveRoleMenus = (roleName, rolesList) => {
  const configuredMenus = roleMenuData.roleMenus[roleName];
  const roleExists = rolesList.some((role) => role.roleName === roleName);
  const sourceMenus = configuredMenus || (roleExists ? ALL_ROLE_MENUS : roleMenuData.roleMenus.Administrator);
  return (sourceMenus || [])
    .map((menu) => MENU_NAME_ALIASES[menu] || menu)
    .filter((menu) => Object.prototype.hasOwnProperty.call(roleMenuData.menus, menu));
};

// const buildInitialPermissions = (roleName) => {
//   const defaults = roleMenuData.defaultPermissions[roleName] || {};
//   const selected = {};
//   Object.entries(roleMenuData.menus).forEach(([menu, items]) => {
//     const design = getMenuDesign(menu);
//     const menuItems = getMenuItems(menu);
// AFTER:
const buildInitialPermissions = (roleName) => {
  const defaults = roleMenuData.defaultPermissions[roleName] || {};
  const selected = {};
  Object.entries(roleMenuData.menus).forEach(([menu, items]) => {
    const design = getMenuDesign(menu, roleName);
    const menuItems = getMenuItems(menu, roleName);
    selected[menu] = {};
    if (menuItems.length === 0) {
      selected[menu][MENU_ACCESS_KEY] = false;
      return;
    }
    menuItems.forEach((item) => {
      const isAllowed = (defaults[menu] || []).includes(item);
      selected[menu][item] =
        design.type === "action-table"
          ? ACTION_COLUMNS.reduce((acc, action) => ({ ...acc, [action]: isAllowed }), {})
          : isAllowed;
    });
  });
  return selected;
};

// Normalize keys so UI labels ("Total Students") match backend keys ("TotalStudents")
const normalizeKey = (value) =>
  String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");

// Build an index of an object keyed by the normalized form of each key
const indexByNormalizedKey = (obj = {}) => {
  const index = {};
  Object.keys(obj || {}).forEach((key) => {
    index[normalizeKey(key)] = obj[key];
  });
  return index;
};

// Convert backend modulePermissions -> the UI `permissions` shape the renderer expects.
// Handles both subPermission shapes:
//   - flat boolean   (Dashboard: { KPI: true })           -> simple checkbox
//   - action object  (Students: { AllStudents: {add,...}}) -> Add/View/Edit/Delete table
const buildPermissionsFromBackend = (roleName, modulePermissions = {}, rolesList = []) => {
  const menus = resolveRoleMenus(roleName, rolesList);

  // index backend modules by normalized name (+ singular form to bridge Exam/Exams, Fee/Fees)
  const moduleIndex = {};
  Object.keys(modulePermissions || {}).forEach((mod) => {
    const norm = normalizeKey(mod);
    moduleIndex[norm] = modulePermissions[mod];
    if (norm.endsWith("s")) moduleIndex[norm.slice(0, -1)] = modulePermissions[mod];
  });

  const result = {};

  menus.forEach((menu) => {
    const items = getMenuItems(menu, roleName);
    const design = getMenuDesign(menu, roleName);

    const menuNorm = normalizeKey(menu);
    const backendModule =
      moduleIndex[menuNorm] || moduleIndex[menuNorm.replace(/s$/, "")] || null;
    const subIndex = indexByNormalizedKey(backendModule?.subPermissions || {});

    result[menu] = {};

    // menus without sub-items use a single access flag
    if (items.length === 0) {
      result[menu][MENU_ACCESS_KEY] = Boolean(backendModule?.read || backendModule?.all);
      return;
    }

    items.forEach((item) => {
      const value = subIndex[normalizeKey(item)];

      if (design.type === "action-table") {
        if (value && typeof value === "object") {
          result[menu][item] = ACTION_COLUMNS.reduce(
            (acc, action) => ({ ...acc, [action]: Boolean(value[action.toLowerCase()]) }),
            {}
          );
        } else {
          const flag = Boolean(value);
          result[menu][item] = ACTION_COLUMNS.reduce(
            (acc, action) => ({ ...acc, [action]: flag }),
            {}
          );
        }
      } else if (value && typeof value === "object") {
        // backend stored an action object but UI shows a simple checkbox -> any true = checked
        result[menu][item] = Boolean(value.view || value.add || value.edit || value.delete);
      } else {
        result[menu][item] = Boolean(value);
      }
    });
  });

  return result;
};

const EditManagementRole = () => {
  const navigate = useNavigate();
  const { roleName: roleNameParam } = useParams();
  const decodedRoleName = decodeURIComponent(roleNameParam || "Administrator");
  const shouldCreateRole = decodedRoleName === "new";
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const dropdownRef = useRef(null);
  const [selectedRole, setSelectedRole] = useState(shouldCreateRole ? "" : decodedRoleName);
  const [activeTab, setActiveTab] = useState("display");
  const [roleSearch, setRoleSearch] = useState("");
const [expandedMenus, setExpandedMenus] = useState({});
  // const [rolesList, setRolesList] = useState(() => readStorage(ROLE_STORAGE_KEY, baseRoles));


  const [rolesList, setRolesList] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(true);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        setRolesLoading(true);
        const response = await api.get("/role/getRole");
  
        const mappedRoles = (response.data || []).map((role) => ({
          id: role._id,
          _id: role._id,
          roleName: role.roleName,
          members: role.memberCount ?? 0,
          status: role.status || "Active",
          remarks: role.remarks || "",
          isSystemRole: role.isSystemRole ?? false,
          modulePermissions: role.modulePermissions || {},
        }));
  
        setRolesList(mappedRoles);
      } catch (error) {
        toast.error("Failed to fetch roles");
        console.error(error);
      } finally {
        setRolesLoading(false);
      }
    };
  
    loadRoles();
  }, []);


  const [savedPermissions, setSavedPermissions] = useState(() =>
    readStorage(ROLE_PERMISSION_STORAGE_KEY, {})
  );
  const [isCreatingRole, setIsCreatingRole] = useState(shouldCreateRole);
  // const [permissions, setPermissions] = useState(() => {
  //   const storedPermissions = readStorage(ROLE_PERMISSION_STORAGE_KEY, {});
  //   return storedPermissions[decodedRoleName] || buildInitialPermissions(decodedRoleName);
  // });
  const [permissions, setPermissions] = useState(() => {
  const storedPermissions = readStorage(ROLE_PERMISSION_STORAGE_KEY, {});
  const stored = storedPermissions[decodedRoleName];
  if (!stored) return buildInitialPermissions(decodedRoleName);

  const cleaned = { ...stored };
  Object.keys(cleaned).forEach((menu) => {
    const validMenuItems = getMenuItems(menu, decodedRoleName);
    if (validMenuItems.length === 0) {
      const hasAccess = cleaned[menu]?.[MENU_ACCESS_KEY];
      cleaned[menu] = { [MENU_ACCESS_KEY]: hasAccess ?? false };
    } else {
      const validSet = new Set(validMenuItems);
      const cleanedMenu = {};
      Object.keys(cleaned[menu] || {}).forEach((item) => {
        if (validSet.has(item) || item === MENU_ACCESS_KEY) {
          cleanedMenu[item] = cleaned[menu][item];
        }
      });
      cleaned[menu] = cleanedMenu;
    }
  });
  return cleaned;
});

  const roleDetails = rolesList.find((role) => role.roleName === selectedRole) || {
    roleName: selectedRole,
    status: "Active",
    remarks: "",
    members: 0,
    isSystemRole: false,
  };

  const [form, setForm] = useState({
    roleName: roleDetails.roleName,
    status: roleDetails.status,
    remarks: roleDetails.remarks,
  });

  // const filteredRoles = rolesList.filter((r) =>
  //   r.roleName.toLowerCase().includes(roleSearch.toLowerCase())
  // );

  // Priority order: Admin first, then Teacher, then everyone else
  const ROLE_ORDER = ["Admin", "Teacher","Student"];

  const getRoleRank = (roleName) => {
    const index = ROLE_ORDER.indexOf(roleName);
    return index === -1 ? ROLE_ORDER.length : index;
  };

  const filteredRoles = rolesList
    .filter((r) => r.roleName.toLowerCase().includes(roleSearch.toLowerCase()))
    .sort((a, b) => {
      const rankA = getRoleRank(a.roleName);
      const rankB = getRoleRank(b.roleName);
      if (rankA !== rankB) return rankA - rankB;
      // same rank (both "others") → keep alphabetical, change if you prefer original order
      return a.roleName.localeCompare(b.roleName);
    });

  const menusForRole = resolveRoleMenus(selectedRole, rolesList);
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
  // useEffect(() => {
  //   if (isCreatingRole) return;

  //   const details = rolesList.find((role) => role.roleName === selectedRole) || {
  //     roleName: selectedRole,
  //     status: "Active",
  //     remarks: "",
  //   };
  //   setForm({
  //     roleName: details.roleName,
  //     status: details.status,
  //     remarks: details.remarks,
  //   });
  //   setPermissions(savedPermissions[selectedRole] || buildInitialPermissions(selectedRole));
  //  setExpandedMenus({});
  // }, [selectedRole, rolesList, isCreatingRole]);
useEffect(() => {
    if (isCreatingRole) return;

    const details = rolesList.find((role) => role.roleName === selectedRole) || {
      roleName: selectedRole,
      status: "Active",
      remarks: "",
    };
    setForm({
      roleName: details.roleName,
      status: details.status,
      remarks: details.remarks,
    });

    const backendPerms = details.modulePermissions;

    if (backendPerms && Object.keys(backendPerms).length > 0) {
      // Source of truth: permissions returned by /role/getRole
      setPermissions(buildPermissionsFromBackend(selectedRole, backendPerms, rolesList));
    } else {
      const stored = savedPermissions[selectedRole];
      if (stored) {
        const cleaned = { ...stored };
        Object.keys(cleaned).forEach((menu) => {
          const validMenuItems = getMenuItems(menu, selectedRole);
          if (validMenuItems.length === 0) {
            const hasAccess = cleaned[menu]?.[MENU_ACCESS_KEY];
            cleaned[menu] = { [MENU_ACCESS_KEY]: hasAccess ?? false };
          } else {
            const validSet = new Set(validMenuItems);
            const cleanedMenu = {};
            Object.keys(cleaned[menu] || {}).forEach((item) => {
              if (validSet.has(item) || item === MENU_ACCESS_KEY) {
                cleanedMenu[item] = cleaned[menu][item];
              }
            });
            cleaned[menu] = cleanedMenu;
          }
        });
        setPermissions(cleaned);
      } else {
        setPermissions(buildInitialPermissions(selectedRole));
      }
    }

    setExpandedMenus({});
  }, [selectedRole, rolesList, isCreatingRole]);



  // useEffect(() => {
  //   localStorage.setItem(ROLE_STORAGE_KEY, JSON.stringify(rolesList));
  // }, [rolesList]);

  useEffect(() => {
    localStorage.setItem(ROLE_PERMISSION_STORAGE_KEY, JSON.stringify(savedPermissions));
  }, [savedPermissions]);

  useEffect(() => {
    if (isCreatingRole || !rolesList.some((role) => role.roleName === selectedRole)) return;

    setSavedPermissions((prev) => {
      const current = JSON.stringify(prev[selectedRole] || {});
      const next = JSON.stringify(permissions || {});
      if (current === next) return prev;
      return { ...prev, [selectedRole]: permissions };
    });
  }, [permissions, selectedRole, rolesList, isCreatingRole]);

  const isSystemRole = roleDetails.isSystemRole;

  const startCreateRole = () => {
    setIsCreatingRole(true);
    setActiveTab("display");
    setSelectedRole("");
    setForm({ roleName: "", status: "Active", remarks: "" });
    setPermissions(buildInitialPermissions(""));
    setExpandedMenus({ Dashboard: true });
  };

  const saveRoleDetails = () => {
    const nextName = form.roleName.trim();
    if (!nextName) return;
    const duplicateRole = rolesList.some(
      (role) => role.roleName.toLowerCase() === nextName.toLowerCase() && role.roleName !== selectedRole
    );
    if (duplicateRole) return;

    if (isCreatingRole) {
      const newRole = {
        id: Date.now(),
        roleName: nextName,
        members: 0,
        status: form.status,
        remarks: form.remarks,
        isSystemRole: false,
      };
      setRolesList((prev) => [...prev, newRole]);
      setSavedPermissions((prev) => ({ ...prev, [nextName]: permissions }));
      setSelectedRole(nextName);
      setIsCreatingRole(false);
      return;
    }

    const oldName = selectedRole;
    setRolesList((prev) =>
      prev.map((role) =>
        role.roleName === oldName
          ? { ...role, roleName: nextName, status: form.status, remarks: form.remarks }
          : role
      )
    );
    setSavedPermissions((prev) => {
      const next = { ...prev };
      next[nextName] = permissions;
      if (nextName !== oldName) delete next[oldName];
      return next;
    });
    setSelectedRole(nextName);
  };

  const cancelRoleEdit = () => {
    if (isCreatingRole) {
      const fallbackRole = rolesList[0]?.roleName || "Administrator";
      setIsCreatingRole(false);
      setSelectedRole(fallbackRole);
      return;
    }
    navigate("/user-role");
  };

  const toggleMenuExpand = (menu) => {
    setExpandedMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };
  // const toggleMenuAll = (menu, checked) => {
  //   const items = getMenuItems(menu);
  //   const design = getMenuDesign(menu);
  const toggleMenuAll = (menu, checked) => {
  const items = getMenuItems(menu, selectedRole);
  const design = getMenuDesign(menu, selectedRole);
    setPermissions((prev) => ({
      ...prev,
      [menu]:
        items.length === 0
          ? { [MENU_ACCESS_KEY]: checked }
          : items.reduce(
              (acc, item) => ({
                ...acc,
                [item]:
                  design.type === "action-table"
                    ? ACTION_COLUMNS.reduce((actions, action) => ({ ...actions, [action]: checked }), {})
                    : checked,
              }),
              {}
            ),
    }));
  };

  const toggleSubPermission = (menu, item) => {
    setPermissions((prev) => ({
      ...prev,
      [menu]: {
        ...prev[menu],
        [item]:
          typeof prev[menu]?.[item] === "object"
            ? ACTION_COLUMNS.reduce((acc, action) => {
                const current = prev[menu]?.[item]?.[action] || false;
                return { ...acc, [action]: !current };
              }, {})
            : !prev[menu]?.[item],
      },
    }));
  };

  const toggleActionPermission = (menu, item, action) => {
    setPermissions((prev) => ({
      ...prev,
      [menu]: {
        ...prev[menu],
        [item]: {
          ...prev[menu]?.[item],
          [action]: !prev[menu]?.[item]?.[action],
        },
      },
    }));
  };

  const isItemChecked = (menu, item) => {
    const value = permissions[menu]?.[item];
    if (value && typeof value === "object") {
      return ACTION_COLUMNS.every((action) => value[action]);
    }
    return !!value;
  };

  // const isMenuAllChecked = (menu) => {
  //   const items = getMenuItems(menu);
  const isMenuAllChecked = (menu) => {
  const items = getMenuItems(menu, selectedRole);
    if (items.length === 0) return Boolean(permissions[menu]?.[MENU_ACCESS_KEY]);
    return items.every((item) => isItemChecked(menu, item));
  };

  // const isMenuPartialChecked = (menu) => {
  //   const items = getMenuItems(menu);
  const isMenuPartialChecked = (menu) => {
  const items = getMenuItems(menu, selectedRole);
    if (items.length === 0) return false;
    const checked = items.filter((item) => isItemChecked(menu, item)).length;
    return checked > 0 && checked < items.length;
  };

 const renderPermissionCheckbox = (menu, item, extraClass = "") => {
  // Check if a custom font weight was passed in extraClass, otherwise default to font-normal
  const hasFontWeight = extraClass.includes("font-");
  const fontWeightClass = hasFontWeight ? "" : "font-normal";

  return (
    <label
      key={item}
      className={`flex items-center gap-9 cursor-pointer px-4 py-4  ${extraClass}`}
    >
      <input
        type="checkbox"
        checked={isItemChecked(menu, item)}
        onChange={() => toggleSubPermission(menu, item)}
        className="h-4 w-4 rounded-[4px] border-[#E1E1E1] accent-[#0B3142] shrink-0"
      />
      {/* We removed the hardcoded font-normal from here and put it in our condition above 
      */}
      <span className={`text-[14px] font-semibold  font-[600] text-[#1C1C1C] ${fontWeightClass}`}>{item}</span>
    </label>
  );
};

  const renderRowsGrid = (menu, items, columns = 4) =>
    Array.from({ length: Math.ceil(items.length / columns) }).map((_, rowIdx) => {
      const rowItems = items.slice(rowIdx * columns, rowIdx * columns + columns);
      return (
        <div key={`${menu}-grid-${rowIdx}`}>
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {rowItems.map((item) => renderPermissionCheckbox(menu, item))}
          </div>
          {rowIdx < Math.ceil(items.length / columns) - 1 && <div className="h-px bg-[#EEEEEE]" />}
        </div>
      );
    });

  const renderDashboardGroups = (menu, design) => {
    const configuredItems = new Set();
    const groups = design.groups || [];
    groups.forEach((group) => {
      group.items?.forEach((item) => configuredItems.add(item));
      if (group.title) configuredItems.add(group.title);

    });
    const remainingItems = (roleMenuData.menus[menu] || []).filter((item) => !configuredItems.has(item));

    return (
      <>
        {groups.map((group, groupIdx) => {
          const groupItems = Array.isArray(group.items) ? group.items : [];
          const hasItems = groupItems.length > 0;
          const previousItems = Array.isArray(groups[groupIdx - 1]?.items)
            ? groups[groupIdx - 1].items
            : [];
          const previousHasItems = previousItems.length > 0;
          const showSectionSpace = groupIdx > 0 && (hasItems || previousHasItems);

          return (
            <div key={`${menu}-${group.title || groupIdx}`}>
              {showSectionSpace && (
                <div className="h-14 bg-white border-t  border-[#E1E1E1]" />
              )}
              <div className={groupIdx > 0 ? "border-t border-[#E1E1E1]  bg-white " : ""}>
                {group.title && (
                  <div className={hasItems ? "border-b border-[#E1E1E1]  bg-white " : ""}>
                    {renderPermissionCheckbox(menu, group.title, "w-full h-[58px] font-bold font-[700] text-[#1C1C1C]")}
                  </div>
                )}
                {hasItems && renderRowsGrid(menu, groupItems)}
              </div>
            </div>
          );
        })}
        {remainingItems.length > 0 && (
          <>
            <div className="h-px bg-[#EEEEEE]" />
            {renderRowsGrid(menu, remainingItems)}
          </>
        )}
      </>
    );
  };

  const renderActionSwitch = (menu, item, action) => {
    const checked = !!permissions[menu]?.[item]?.[action];
    return (
      <button
        key={action}
        type="button"
        onClick={() => toggleActionPermission(menu, item, action)}
        className={`relative h-[24px] w-[48px] rounded-full pt-1   transition-colors ${
          checked ? "bg-[#0B3142]" : "bg-[#E9E9E9]"
        }`}
        aria-label={`${item} ${action}`}
      >
        <span
          className={`absolute top-[2px]   h-5 w-5 rounded-full transition-all ${
            checked ? "left-[25px] bg-white" : "left-[4px] bg-[#9C9C9C]"
          }`}
        />
      </button>
    );
  };

  const renderActionTable = (menu, items) => (
    <div>
      <div className="grid grid-cols-[46px_1.2fr_repeat(4,1fr)] border-b border-[#EEEEEE]">
        <div />
        <div />
        {ACTION_COLUMNS.map((action) => (
          <div key={action} className="px-4 py-4 text-[14px] text-[#1C1C1C] font-[600]  font-semibold ,">
            {action}
          </div>
        ))}
      </div>
      {items.map((item) => (
        <div key={item} className="grid grid-cols-[46px_1.2fr_repeat(4,1fr)] border-b border-[#EEEEEE] last:border-b-0">
          <label className="flex items-center justify-center py-3.5 cursor-pointer hover:bg-[#FAFAFA]">
            <input
              type="checkbox"
              checked={isItemChecked(menu, item)}
              onChange={() => toggleSubPermission(menu, item)}
              className="h-4 w-4 rounded border-[#E5E7EB] accent-[#0B3142] shrink-0"
            />
          </label>
          <div className="flex items-center px-4 py-3.5 text-[14[px] text-[#1C1C1C] font-[600] font-semiboldd">
            {item || ""}
          </div>
          {ACTION_COLUMNS.map((action) => (
            <div key={action} className="flex items-center px-4 py-3.5">
              {renderActionSwitch(menu, item, action)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderSimpleList = (menu, items) =>
    items.map((item) => (
      <div key={item} className="border-b border-[#EEEEEE] last:border-b-0">
        {renderPermissionCheckbox(menu, item, "w-full")}
      </div>
    ));

// const renderMenuDropdown = (menu, items) => {
//   const design = getMenuDesign(menu);
const renderMenuDropdown = (menu, items, roleName = "") => {
  const design = getMenuDesign(menu, roleName);
  const menuItems = items;
  if (menuItems.length === 0) return null;
  
  // If no design type, just render simple checkboxes
  if (!design.type || design.type === "") {
    return renderSimpleList(menu, menuItems);
  }
  
  // Handle different design types
  if (design.type === "dashboard-groups") return renderDashboardGroups(menu, design);
  if (design.type === "action-table") return renderActionTable(menu, menuItems);
  if (design.type === "simple-list") return renderSimpleList(menu, menuItems);
  
  return renderRowsGrid(menu, menuItems);
};  

  return (
    <div className="flex flex-col xl:flex-row gap-5 min-h-[calc(120vh-120px)]">
      {/* Left – Role list */}
      <div className="box-shadow bg-white rounded-[16px] p-2 w-full xl:w-[390px] shrink-0 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => navigate("/user-role")}
            className="flex items-center gap-2 text-[14px] text-[#1C1C1C] font-semibold  pt-5 pl-2 pb-3 pr-1"
          >
         
            <IoMdArrowBack  className="h-5 w-5 pt-1"/>
            Back
          </button>
          <button
            type="button"
            onClick={startCreateRole}
            className="h-8 w-8 flex items-center justify-center   text-[#1C1C1C] "
          >
            <GoPlus className="text-[29px] pt-2 pr-2 font-extrabold text-[#1F1F1F]" />
          </button>
        </div>

        <div className="relative mb-6 pl-1 pr-2">
          <HiSearch className="absolute left-3 top-3/4 -translate-y-1/2 text-[#696969] text-[18px] font-normal font-[400] " />
          <input
            type="text"
            placeholder="Search roles..."
            value={roleSearch}
            onChange={(e) => setRoleSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#EEEEEE]  rounded-[12px]  font-normal font-[400]  text-[18px] focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(500vh-220px)] pr-2 pb-6 pl-2">

{/* New role placeholder in sidebar */}




          {filteredRoles.map((role) => {
            const isSelected = selectedRole === role.roleName;
            const shieldColor = ROLE_SHIELD_COLORS[role.roleName] || "#43AA8B";
            return (
              <button
                key={role.roleName}
                type="button"
                onClick={() => { setSelectedRole(role.roleName); setIsCreatingRole(false); }}
                className={`w-full text-left rounded-[12px] border p-3 transition-all ${
                  isSelected
                    ? "border-[#007AFF] bg-[#FFFFFF] "
                    : "border-[#E6E6E6] bg-[#FFFFFF] "
                }`}
              >
                <div className="flex items-start gap-1">
                  <span className="h-17 w-9 rounded-full bg-[#FFFFFF] flex items-center justify-center shrink-0">
                    <MdOutlineShield className="text-[22px] " style={{ color: shieldColor }} />
                  </span>
                  <div className="flex flex-col gap-0 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap ">
                      <span className="text-[15px] font-semibold font-[600]  text-[#1C1C1C] pt-3">{role.roleName}</span>
                      <span
                        className={`text-[12px] font-normal font-[400] px-2 py-0.125 rounded-[8px] mt-3 ${
                          role.isSystemRole
                            ? "bg-[#8200DB26] text-[#8200DB] border border-[#8200DB40]"
                            : "text-[#696969] bg-[#EEEEEE] border border-[#E8E8E8]"
                        }`}
                      >
                        {role.isSystemRole ? "System Role" : "Custom Role"}
                      </span>
                    </div>
                    <span className="text-[14px] font-normal font-[400] text-[#9C9C9C]">{role.members} users</span>
                  </div>
                </div>
              </button>
            );
          })}
          {isCreatingRole && (
  <div className="w-full text-left rounded-[12px] border p-3 border-[#007AFF] bg-[#FFFFFF]">
    <div className="flex items-start gap-1">
      <span className="h-17 w-9 rounded-full bg-[#FFFFFF] flex items-center justify-center shrink-0">
        <MdOutlineShield className="text-[22px]" style={{ color: "#43AA8B" }} />
      </span>
      <div className="flex flex-col gap-0 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[15px] font-semibold font-[600] text-[#1C1C1C] pt-3">
            {form.roleName || "New Role"}
          </span>
          <span className="text-[12px] font-normal px-2 rounded-[8px] mt-3 text-[#696969] bg-[#EEEEEE] border border-[#E8E8E8]">
            Custom Role
          </span>
        </div>
        <span className="text-[14px] font-normal text-[#9C9C9C]">0 users</span>
      </div>
    </div>
  </div>
)}

        </div>
      </div>

      {/* Right – Edit / Permissions */}
      <div className="box-shadow bg-white rounded-2xl pt-4 pl-5 pr-4 flex-1 flex flex-col min-h-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-11">
          <h2 className="text-[18px] font-semibold text-[#1C1C1C]">
            {activeTab === "display" ? (isCreatingRole ? "New Role" : "Edit Role") : "Permissions"}
          </h2>
          <div className="flex bg-[linear-gradient(to_right,#F5F2ED,#F4F5F0,#EDF5F3)] rounded-[20px] h-[40px] px-3 w-full sm:w-auto md:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab("display")}
              className={`px-5 h-[30px]  mt-1 rounded-[14px] text-[14px] font-medium transition-all ${
                activeTab === "display"
                ? "bg-[#F5F7F7] border border-[#FFFFFF] shadow-md text-[#0B3142]"
                  : "text-[#6B7280]"
              }`}
            >
              Display
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("permissions")}
              className={`px-4 h-[30px]  mt-1 rounded-[14px] text-[14px] font-medium transition-all ${
                activeTab === "permissions"
                    ? "bg-[#F5F7F7] border border-[#FFFFFF] shadow-md text-[#0B3142]"
                  : "text-[#6B7280]"
              }`}
            >
              Permissions
            </button>
          </div>
        </div>

        {activeTab === "display" ? (
          <div className="flex flex-col flex-1">
            {isSystemRole && (
              <div className="flex items-start gap-3 bg-[#FFFBEB] border border-[#FEE685] rounded-[9px] pl-3 pr-6 pt-3 pb-3 mb-3">

   <img
                    src={systemrole_icon}
                  
                    className="text-[#E17100] text-[20px] shrink-0 mt-3 "
                  />

<p className="text-[13px]  font-semibold text-[#7B3306] leading-relaxed flex flex-col">
  <span className="font-semibold text-[13px]  font-[600] ">System Role</span>
  <span className="font-normal font-[400]  text-[13px] mt-0 text-[#BB4D00]">
    This is a built-in role. You can modify permissions, but the role cannot be deleted.
  </span>
</p>
             
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-4">
              <div className="flex flex-col gap-0.5">
                <label className="text-[14px] font-semibold   text-[#1C1C1C]">Role Name</label>
                <input
                  type="text"
                  value={form.roleName}
                  placeholder="Enter role name"
                  onChange={(e) => setForm((prev) => ({ ...prev, roleName: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-[#E6E6E6] rounded-[12px] text-[14px] text-[#9C9C9C] focus:outline-none "
                />
              </div>
              {/* <div className="flex flex-col gap-0.5">
                <label className="text-[14px] font-medium text-[#1C1C1C]">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-[#E6E6E6] rounded-[12px] text-[14px] text-[#9C9C9C] bg-white focus:outline-none focus:border-[#0B3142] appearance-none"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div> */}

<div className="flex flex-col gap-0.5 relative" ref={dropdownRef}>
  <label className="text-[14px] font-semibold text-[#1C1C1C]">Status</label>
  
  {/* Trigger Button */}
  <div
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    className="w-full px-4 py-2.5 border border-[#E6E6E6] rounded-[12px] text-[14px] text-[#1C1C1C] bg-white  flex items-center justify-between cursor-pointer transition-all duration-200"
    style={{ borderColor: isDropdownOpen ? "#0B3142" : "#E6E6E6" }}
  >
    <span className={form.status ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}>
      {form.status || "Select Status"}
    </span>
    <svg 
      className={`h-4 w-4 text-[#9C9C9C] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>

  {/* Floating Options Panel */}
  {isDropdownOpen && (
    <div className="absolute left-0 right-0 top-[calc(100%+4px)] bg-white border border-[#F2F4F7] rounded-[12px] shadow-lg py-1 z-50 overflow-hidden">
      <div
        onClick={() => {
          setForm((prev) => ({ ...prev, status: "Active" }));
          setIsDropdownOpen(false);
        }}
        className={`px-4 py-3 text-[14px] cursor-pointer transition-colors duration-150 text-[#1C1C1C] ${
          form.status === "Active" ? "bg-[#F9FAFB] font-medium" : "hover:bg-[#F9FAFB]"
        }`}
      >
        Active
      </div>
      <div
        onClick={() => {
          setForm((prev) => ({ ...prev, status: "Inactive" }));
          setIsDropdownOpen(false);
        }}
        className={`px-4 py-3 text-[14px] cursor-pointer transition-colors duration-150 text-[#1C1C1C] ${
          form.status === "Inactive" ? "bg-[#F9FAFB] font-medium" : "hover:bg-[#F9FAFB]"
        }`}
      >
        Inactive
      </div>
    </div>
  )}
</div>

              
            </div>

            <div className="flex flex-col gap-0.5 mb-4">
              <label className="text-[14px] font-semibold text-[#1C1C1C]">Remarks (Optional)</label>
              <textarea
                rows={3}
                value={form.remarks}
                onChange={(e) => setForm((prev) => ({ ...prev, remarks: e.target.value }))}
                placeholder="Any special notes"
                className="w-full px-4 py-3 border border-[#E6E6E6] rounded-[12px] text-[14px] text-[#9C9C9C] resize-none focus:outline-none "
              />
            </div>

            <div className="flex justify-end gap-3 mt-5 pt-1 ">
              <button
                type="button"
                onClick={cancelRoleEdit}
                className=" w-[96px] h-[40px] border border-[#9C9C9C] rounded-[8px] text-[14px] font-semibold text-[#1C1C1C] "
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveRoleDetails}
                className="  w-[148px] h-[40px] bg-[#0B3142] text-[#FFFFFF] rounded-[8px] text-[14px] font-semibold "
              >
                {isCreatingRole ? "New Role" : "Update Detail"}
              </button>
            </div>
          </div>
      ) : (
  <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(900vh-240px)] pr-1 pb-6">
    {menusForRole.map((menu) => {
      // const subItems = getMenuItems(menu);

      // AFTER:
const subItems = getMenuItems(menu, selectedRole);
const design = getMenuDesign(menu, selectedRole);
      const isOpen = expandedMenus[menu];
      // const design = getMenuDesign(menu);
      const hasDropdownDesign = Boolean(design.type);
      const hasBody = subItems.length > 0;
       const shouldShowBody = hasBody && isOpen;
      const allChecked = isMenuAllChecked(menu);
      const partial = isMenuPartialChecked(menu);

      return (
        <div
          key={menu}
          className="border border-[#E5E7EB] rounded-[10px] overflow-hidden bg-white"
        >
          {/* Header */}
          {/* <div
            className="flex items-center justify-between px-4 py-7 cursor-pointer "
            onClick={() => toggleMenuExpand(menu)}
          > */}  <div
    className="flex items-center justify-between px-4 py-7 cursor-pointer "
    onClick={() => {
      if (hasDropdownDesign) {
        toggleMenuExpand(menu);
      }
    }}
  >

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={allChecked}
                ref={(el) => { if (el) el.indeterminate = partial; }}
                onChange={(e) => { e.stopPropagation(); toggleMenuAll(menu, e.target.checked); }}
                onClick={(e) => e.stopPropagation()}
                className="h-4 w-4 rounded border-[#9C9C9C] accent-[#0B3142] cursor-pointer"
              />
              <span className="text-[16px] font-semibold font-[600] text-[#101828]">{menu}</span>
            </div>
            {/* <img
              src={dropdown}
              alt="toggle"
              className="h-5 w-5 transition-transform duration-500 ease-in-out"
              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            /> */}
              {hasBody && hasDropdownDesign && (
    <img
      src={dropdown}
      alt="toggle"
      className="h-5 w-5 transition-transform duration-700 ease-in-out"
      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
    />
  )}
          </div>

          {/* Animated Body */}
          {hasBody && (
            <div
              className={`grid transition-[grid-template-rows,opacity] ${design.type === "dashboard-groups" ? "duration-1000 ease-in-out  " : "duration-500 ease-in-out "}  ${
                shouldShowBody ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden pb-px">
                <div className="border-t border-[#EEEEEE]">
                  {/* {renderMenuDropdown(menu, subItems)} */}
                  
{renderMenuDropdown(menu, subItems, selectedRole)}

                </div>
              </div>
            </div>
          )}
        </div>
      );
    })}
  </div>
)}
      </div>
    </div>
  );
};

export default EditManagementRole;
