import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import dropdown from "../../assets/images/dropdown.png";
import roleMenuData from "../../data/roleMenuPermissions.json";
import dropdownDesignData from "../../data/rolePermissionDropdownDesigns.json";
import Back from  "../../assets/images/Back.png";
import {
  ROLE_PERMISSION_STORAGE_KEY,
  USER_ROLE_USERS_KEY,
  getStoredRolePermissions,
  getStoredRoles,
  getStoredUsers,
  readStorage,
  writeStorage,
} from "../../utils/roleStorage";

const ACTION_COLUMNS = dropdownDesignData.actionColumns || ["Add", "View", "Edit", "Delete"];
const ALL_ROLE_MENUS = Object.keys(roleMenuData.menus);
const MENU_ACCESS_KEY = "__menuAccess";
const MENU_NAME_ALIASES = {
  HomeWork: "Homework",
  "Events & Calendar": "Events and Calendar",
  Messages: "Message",
};
const MENU_DESIGN_ALIASES = {
  Message: "Messages",
};

// const getMenuDesign = (menu) => {
//   const designKey = MENU_DESIGN_ALIASES[menu] || menu;
//   return dropdownDesignData.menuDesigns?.[designKey] || { type: dropdownDesignData.defaultDesign || "grid" };
// };
// AFTER:
const getMenuDesign = (menu, roleName = "") => {
  const roleOverride = dropdownDesignData.roleOverrides?.[roleName]?.[menu];
  if (roleOverride) return roleOverride;
  const designKey = MENU_DESIGN_ALIASES[menu] || menu;
  return dropdownDesignData.menuDesigns?.[designKey] || { type: dropdownDesignData.defaultDesign || "grid" };
};

// const getMenuItems = (menu) => {
//   const items = roleMenuData.menus[menu] || [];
//   const design = getMenuDesign(menu);
//   if (!design.type || design.type === "") {
//     return [];
//   }
//   return items;
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

const buildInitialPermissions = (roleName) => {
  const defaults = roleMenuData.defaultPermissions[roleName] || {};
  const selected = {};
  // Object.entries(roleMenuData.menus).forEach(([menu, items]) => {
  //   const design = getMenuDesign(menu);
  //   const menuItems = getMenuItems(menu);
  // AFTER:
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

const UserRolePermissions = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [rolesList] = useState(() => getStoredRoles());
  const [usersList, setUsersList] = useState(() => getStoredUsers());
  const [savedPermissions, setSavedPermissions] = useState(() => getStoredRolePermissions());
  const currentUser = usersList.find((user) => String(user.id) === String(userId)) || usersList[0];
  const fallbackRole = rolesList[0]?.roleName || "Administrator";
  const initialRole = rolesList.some((role) => role.roleName === currentUser?.role)
    ? currentUser.role
    : fallbackRole;
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [expandedMenus, setExpandedMenus] = useState({ Dashboard: true });
  const [permissions, setPermissions] = useState(() => {
    const permissionsMap = readStorage(ROLE_PERMISSION_STORAGE_KEY, {});
    return permissionsMap[initialRole] || buildInitialPermissions(initialRole);
  });

  const menusForRole = resolveRoleMenus(selectedRole, rolesList);

  useEffect(() => {
    setPermissions(savedPermissions[selectedRole] || buildInitialPermissions(selectedRole));
    setExpandedMenus({ Dashboard: false });
  }, [savedPermissions, selectedRole]);

  const toggleMenuExpand = (menu) => {
    setExpandedMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  // const toggleMenuAll = (menu, checked) => {
  //   const items = getMenuItems(menu);
  //   const design = getMenuDesign(menu);

  // AFTER:
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
            ? ACTION_COLUMNS.reduce((acc, action) => ({ ...acc, [action]: !prev[menu]?.[item]?.[action] }), {})
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
    if (value && typeof value === "object") return ACTION_COLUMNS.every((action) => value[action]);
    return Boolean(value);
  };

  // const isMenuAllChecked = (menu) => {
  //   const items = getMenuItems(menu);

// AFTER:
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

  const saveUserRole = () => {
    const nextPermissions = { ...savedPermissions, [selectedRole]: permissions };
    const nextUsers = usersList.map((user) =>
      String(user.id) === String(userId) ? { ...user, role: selectedRole, permissions: selectedRole === "Administrator" ? "All" : "Limited" } : user
    );
    setUsersList(nextUsers);
    setSavedPermissions(nextPermissions);
    writeStorage(USER_ROLE_USERS_KEY, nextUsers);
    writeStorage(ROLE_PERMISSION_STORAGE_KEY, nextPermissions);
    navigate("/user-role");
  };

  const renderPermissionCheckbox = (menu, item, extraClass = "") => {
    const hasFontWeight = extraClass.includes("font-");
    const fontWeightClass = hasFontWeight ? "" : "font-normal";

    return (
      <label
        key={item}
        className={`flex items-center gap-9 cursor-pointer px-4 py-4 ${extraClass}`}
      >
        <input
          type="checkbox"
          checked={isItemChecked(menu, item)}
          onChange={() => toggleSubPermission(menu, item)}
          className="h-4 w-4 rounded-[4px] border-[#E1E1E1] accent-[#0B3142] shrink-0"
        />
        <span className={`text-[14px] font-semibold font-[600] text-[#1C1C1C] ${fontWeightClass}`}>{item || ""}</span>
      </label>
    );
  };

  const renderActionSwitch = (menu, item, action) => {
    const checked = Boolean(permissions[menu]?.[item]?.[action]);
    return (
      <button
        key={action}
        type="button"
        onClick={() => toggleActionPermission(menu, item, action)}
        className={`relative h-[24px] w-[48px] rounded-full transition-colors ${checked ? "bg-[#0B3142]" : "bg-[#E9E9E9]"}`}
        aria-label={`${item} ${action}`}
      >
        <span
          className={`absolute top-[3px] h-4 w-4 rounded-full transition-all ${checked ? "left-[26px] bg-white" : "left-[4px] bg-[#9C9C9C]"}`}
        />
      </button>
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
                <div className="h-14 bg-white border-t border-[#E1E1E1]" />
              )}
              <div className={groupIdx > 0 ? "border-t border-[#E1E1E1] bg-white" : ""}>
                {group.title && (
                  <div className={hasItems ? "border-b border-[#E1E1E1] bg-white" : ""}>
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

  const renderSimpleList = (menu, items) =>
    items.map((item) => (
      <div key={item} className="border-b border-[#EEEEEE] last:border-b-0">
        {renderPermissionCheckbox(menu, item, "w-full")}
      </div>
    ));

  const renderActionTable = (menu, items) => (
    <div>
      <div className="grid grid-cols-[46px_1.2fr_repeat(4,1fr)] border-b border-[#EEEEEE]">
        <div />
        <div />
        {ACTION_COLUMNS.map((action) => (
          <div key={action} className="px-4 py-4 text-[14px] text-[#1C1C1C] font-[600] font-semibold">
            {action}
          </div>
        ))}
      </div>
      {items.map((item) => (
        <div key={item} className="grid grid-cols-[46px_1.2fr_repeat(4,1fr)] border-b border-[#EEEEEE] last:border-b-0">
          <label className="flex items-center justify-center py-3.5 cursor-pointer">
            <input
              type="checkbox"
              checked={isItemChecked(menu, item)}
              onChange={() => toggleSubPermission(menu, item)}
              className="h-4 w-4 rounded border-[#9C9C9C] accent-[#0B3142] shrink-0"
            />
          </label>
          <div className="flex items-center px-4 py-3.5 text-[14px] text-[#1C1C1C] font-[600] font-semibold">
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

  // const renderMenuDropdown = (menu, items) => {
  //   const design = getMenuDesign(menu);
  // AFTER:
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
    <div className="flex flex-col gap-8 min-h-[calc(100vh-120px)]">
    <button 
           onClick={() => navigate(-1)} 
           className="flex items-center text-[#696969] hover:text-[##696969] text-[24px]  mr-5 font-semibold mb-2 transition-colors"
         >
          <span className="mr-3 mx-3 mt-0 mb-0">  <img 
                        src={Back} 
                        alt="Info" 
                        className="h-3 w-3 object-contain" 
                      /></span> Back
         </button>
   

      <div className=" bg-white  shadow-[0_5px_10px_rgb(0,0,0,0.15)] rounded-xl overflow-visible px-5 py-5 -mt-[10px]">
   <div className="flex flex-col gap-1 mb-10 relative">
  <label className="text-[14px] font-semibold font-[600] text-[#1C1C1C]">Change Role</label>
  
  {/* Trigger Box */}
  <div
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    className="w-full h-12 px-5 border border-[#E6E6E6] rounded-[12px] text-[14px] text-[#696969] bg-white flex items-center justify-between cursor-pointer select-none"
  >
    <span>{selectedRole}</span>
    <img
      src={dropdown}
      alt="toggle"
      className="h-5 w-5 transition-transform duration-300 ease-in-out"
      style={{ transform: isDropdownOpen ? "" : "" }}
    />
  </div>

  {/* Simulated Options List Panel */}
  {isDropdownOpen && (
    <div className="absolute top-[78px] left-0 w-full bg-white border border-[#E1E1E1] rounded-[12px] shadow-lg z-50 overflow-hidden py-2">
      {rolesList.map((role) => (
        <div
          key={role.roleName}
          onClick={() => {
            setSelectedRole(role.roleName);
            setIsDropdownOpen(false);
          }}
          className={`px-5 py-3 text-[14px] cursor-pointer transition-colors duration-150 ease-in-out ${
            selectedRole === role.roleName
              ? "bg-[#F5F5F5] text-[#1C1C1C] font-semibold"
              : "text-[#696969] hover:bg-[#F9F9F9] hover:text-[#1C1C1C]"
          }`}
        >
          {role.roleName}
        </div>
      ))}
    </div>
  )}
</div>

        <h2 className="text-[18px] font-semibold text-[#1C1C1C] mb-10 font-[600]">
          Permissions
        </h2>

        <div className="flex flex-col gap-4">
          {menusForRole.map((menu) => {
            // const subItems = getMenuItems(menu);
            // const design = getMenuDesign(menu);
              const subItems = getMenuItems(menu, selectedRole);
            const design = getMenuDesign(menu, selectedRole);
            const hasDropdownDesign = Boolean(design.type);
            const isOpen = expandedMenus[menu];
            const hasBody = subItems.length > 0;
            const shouldShowBody = hasBody && (!hasDropdownDesign || isOpen);
            const partial = isMenuPartialChecked(menu);

            return (
              <div key={menu} className="border border-[#E6E6E6] rounded-[10px] overflow-hidden bg-white">
                <div
                  className="flex items-center justify-between px-4 py-7 cursor-pointer"
                  onClick={() => {
                    if (hasBody && hasDropdownDesign) toggleMenuExpand(menu);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isMenuAllChecked(menu)}
                      ref={(el) => {
                        if (el) el.indeterminate = partial;
                      }}
                      onChange={(event) => {
                        event.stopPropagation();
                        toggleMenuAll(menu, event.target.checked);
                      }}
                      onClick={(event) => event.stopPropagation()}
                      className="h-4 w-4 rounded border-[#9C9C9C] accent-[#0B3142] cursor-pointer"
                    />
                    <span className="text-[16px] font-semibold text-[#101828]">{menu}</span>
                  </div>
                  {hasBody && hasDropdownDesign && (
                    <img
                      src={dropdown}
                      alt="toggle"
                      className="h-5 w-5 transition-transform duration-500 ease-in-out"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  )}
                </div>
                {hasBody && (
                  <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${shouldShowBody ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden pb-px">
                      <div className="border-t border-[#EEEEEE]">{renderMenuDropdown(menu, subItems)}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={() => navigate("/user-role")}
            className="w-[90px] h-[40px] border border-[#9C9C9C] rounded-[8px] text-[14px] font-semibold text-[#1C1C1C] "
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={saveUserRole}
            className="w-[100px] h-[40px] bg-[#0B3142] text-[#FFFFFF] rounded-[8px] text-[14px] font-semibold "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRolePermissions;
