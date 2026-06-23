import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineShield } from "react-icons/md";
import profilePlaceholder from "../../assets/images/nul-profile.svg";
import userrole from "../../assets/images/userrole.png";
import deleteIcon from "../../assets/images/delete-2.png";
import DeleteRoleModal from "./DeleteRoleModal";
import nodata_foundIcon from "../../assets/images/absence.png";
import {
  ROLE_PERMISSION_STORAGE_KEY,
  ROLE_STORAGE_KEY,
  USER_ROLE_USERS_KEY,
  SYSTEM_ROLES,
  getStoredRolePermissions,
  getStoredRoles,
  getStoredUsers,
  permissionSummaryForRole,
  writeStorage,
} from "../../utils/roleStorage";





const ROLE_SHIELD_STYLES = {
  Administrator: { color: "#F94144" },
  Teacher: { color: "#F3722C" },
  Student: { color: "#F8961E" },
  Accountant: { color: "#43AA8B" },
  Driver: { color: "#43AA8B" },
  Librarian: { color: "#43AA8B" },
};

const formatLastLogin = (dateStr) => {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;

  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  if (diffDays < 7) return `${diffDays} day ago`;
  return date.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
};

const UserRole = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [rolesList, setRolesList] = useState(() => getStoredRoles());
  const [usersList, setUsersList] = useState(() => getStoredUsers());
  const [rolePermissions, setRolePermissions] = useState(() => getStoredRolePermissions());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState("");
  {/* -------------------- */ }
  const roleRows = useMemo(() => {
    return rolesList.map((role, index) => ({
      id: role.id || index + 1,
      roleName: role.roleName,
      members: usersList.filter((user) => user.role === role.roleName).length || role.members || 0,
      permissions: permissionSummaryForRole(role.roleName, rolePermissions),
      status: role.status || "Active",
      isSystemRole: role.isSystemRole ?? SYSTEM_ROLES.includes(role.roleName),
    }));
  }, [rolePermissions, rolesList, usersList]);

  const filteredUsers = usersList.filter((item) => {
    const query = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(query) ||
      item.empId?.toLowerCase().includes(query) ||
      item.role?.toLowerCase().includes(query)
    );
  });

  const filteredRoles = roleRows.filter((item) =>
    item.roleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredData = activeTab === "users" ? filteredUsers : filteredRoles;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusStyle = (itemStatus) => {
    if (itemStatus === "Active") {
      return { background: "#D4EDDA", color: "#009638" };
    }
    return { background: "#DEDEDE", color: "#696969" };
  };

  const getShieldStyle = (roleName) =>
    ROLE_SHIELD_STYLES[roleName] || { color: "#43AA8B" };

  {/* --- CHANGED LOGIC BLOCK --- */ }
  const triggerDeleteModal = (roleName) => {
    const role = rolesList.find((item) => item.roleName === roleName);
    if (!role || role.isSystemRole) return;

    // Set tracking states and open modal instead of window.confirm
    setRoleToDelete(roleName);
    setIsModalOpen(true);
  };

  const confirmDeleteRole = () => {
    // Your exact unfiltered state logic runs here upon confirmation
    const nextRoles = rolesList.filter((item) => item.roleName !== roleToDelete);
    const nextPermissions = { ...rolePermissions };
    delete nextPermissions[roleToDelete];
    const nextUsers = usersList.map((user) =>
      user.role === roleToDelete ? { ...user, role: "Unassigned", permissions: "Limited" } : user
    );

    setRolesList(nextRoles);
    setRolePermissions(nextPermissions);
    setUsersList(nextUsers);
    writeStorage(ROLE_STORAGE_KEY, nextRoles);
    writeStorage(ROLE_PERMISSION_STORAGE_KEY, nextPermissions);
    writeStorage(USER_ROLE_USERS_KEY, nextUsers);

    // Close and reset states
    setIsModalOpen(false);
    setRoleToDelete("");
  };
  {/* ---------------------------- */ }
  return (
    <div className="box-shadow bg-white rounded-2xl p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-7 px-2">
        <div className="text-left">
          <h1 className="text-[18px] font-semibold text-[#1C1C1C]">User & Roles</h1>
          <p className="text-[14px] sm:text-[16px] text-[#9C9C9C]">
            Manage user, roles and permissions here
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate(`/management_unit/user&role/edit/new`)}
          className="w-full sm:w-auto bg-[#0B3142] text-white px-5 py-3 h-10 rounded-[8px] text-[14px] font-semibold flex items-center justify-center gap-3 transition-all hover:bg-[#15465c]"
        >
          <span className="text-[20px] -mt-[3px]">+</span> Add Role
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-8 px-1">
        <div className="relative flex-1 ">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#696969] text-[18px] " />
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 bg-[#EEEEEE] max-w-[400px] sm:max-w-[540px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1300px] border border-[#E8E8E8] rounded-[9px] text-[14px] "
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex bg-[linear-gradient(to_right,#F5F2ED,#F4F5F0,#EDF5F3)] rounded-[20px] py-1 px-2 w-full sm:w-auto md:w-auto">
            <button
              type="button"
              onClick={() => {
                setActiveTab("users");
                setCurrentPage(1);
              }}
              className={`flex-1 md:flex-none pl-3 pr-2 rounded-[14px] text-[14px] font-medium transition-all whitespace-nowrap ${activeTab === "users"
                  ? "bg-[#F5F7F7] border border-[#FFFFFF] shadow-md text-[#0B3142]"
                  : "text-[#6B7280]"
                }`}
            >
              Users
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("role");
                setCurrentPage(1);
              }}
              className={`flex-1 md:flex-none pl-3 pr-2 rounded-[14px] text-[14px] font-medium transition-all whitespace-nowrap ${activeTab === "role"
                  ? "bg-[#F5F7F7] border border-[#FFFFFF] shadow-md text-[#0B3142]"
                  : "text-[#6B7280]"
                }`}
            >
              Role
            </button>
          </div>
        </div>
      </div>

      <div className="border border-[#E6E6E6] rounded-[12px] w-full overflow-auto pt-4 pb-4 pl-4 pr-4 md:px-2 mx-0 md:mt-2 ml-0 mr-3 mb-2 ">
        <table className="w-full">
          <thead
            className="text-[12px] md:text-[14px]"
            style={{ borderBottom: "1px solid #EEEEEE" }}
          >
            <tr className="text-left">
              {activeTab === "users" ? (
                <>
                  <th className="px-4  py-3 text-[#1C1C1C] font-semibold text-[14px] w-[33%]">Role Name</th>
                  <th className="px-4 py-3 text-[#1C1C1C] font-semibold text-[14px] w-[16%]">Role</th>
                  <th className="px-4 py-3 text-[#1C1C1C] font-semibold text-[14px] w-[15%]">Last Login</th>
                  <th className="px-4 py-3 text-[#1C1C1C] font-semibold text-[14px] w-[16%]">Permissions</th>
                  <th className="px-4 py-3 text-[#1C1C1C] font-semibold text-[14px]">Status</th>
                  <th className="px-4 py-3 text-[#1C1C1C] font-semibold text-[14px] ">Action</th>
                </>

              ) : (
                <>
                  {/* Expanded to take up nice space on the left */}
                  <th className="px-4 py-3 text-[#1C1C1C] font-semibold text-[14px] w-[22%]">Role Name</th>
                  {/* Moved right next to Role Name with explicit width */}
                  <th className="px-2 py-3 text-[#1C1C1C] font-semibold text-[14px] text-center w-[19%]">Members</th>
                  <th className="px-7 pl-40 py-3 text-[#1C1C1C] font-semibold text-[14px] w-[36%]">Permissions</th>
                  <th className="px-4 py-3 text-[#1C1C1C] font-semibold text-[14px] w-[15%]" >Status</th>
                  <th className="px-4 py-3 text-[#1C1C1C] font-semibold text-[14px] w-[19%] ">Action</th>
                </>
              )}


            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={activeTab === "users" ? 6 : 5}
                  className="text-center py-5 text-[14px] text-[#9C9C9C]"
                >
                  <div className="py-16 text-center flex flex-col items-center">
                    <img src={nodata_foundIcon} className="w-12 mb-3" />
                    <p className="text-gray-400 text-sm">No user found</p>
                  </div>
                </td>
              </tr>
            ) : activeTab === "users" ? (
              currentData.map((item, key) => {
                const statusStyle = getStatusStyle(item.status);
                return (
                  <tr
                    key={item.id}
                    onMouseEnter={() => setHoverIndex(key)}
                    onMouseLeave={() => setHoverIndex(null)}
                    className="text-left text-[14px] border-b border-[#EEEEEE]"
                  // style={{
                  //   backgroundColor: hoverIndex === key ? "#F5F7F9" : "transparent",
                  // }}
                  >
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <span className="h-10 w-10 rounded-[18px] bg-[#f6f9fb] flex items-center justify-center overflow-hidden shrink-0">
                          <img
                            src={profilePlaceholder}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-[#12516E] font-semibold text-[14px]">{item.name}</span>
                          <span className="text-[#9C9C9C] text-[14px] font-normal">{item.empId}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-[#1C1C1C] font-normal text-[14px]">{item.role}</td>
                    <td className="px-4 py-2 text-[#1C1C1C] font-normal text-[14px]">
                      {formatLastLogin(item.lastLogin)}
                    </td>
                    <td className="px-4 py-2 text-[#1C1C1C] font-normal text-[14px]">
                      {item.permissions}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className="text-[12px] px-5 py-0.25 w-[80px] h-[20px] rounded-[4px] text-center inline-block font-semibold"
                        style={{
                          color: statusStyle.color,
                          backgroundColor: statusStyle.background,
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-5 py-2">

                      <span
                        role="button"
                        tabIndex={0}
                        onClick={() => navigate(`/management_unit/user&role/user-edit/${item.id}`)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") navigate(`/management_unit/user&role/user-edit/${item.id}`);
                        }}
                        className="material-symbols-outlined text-[#9C9C9C]  font-[300] text-[21px] cursor-pointer inline-flex items-center justify-center  rounded-full  transition-all"
                      >
                        edit
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              currentData.map((item, key) => {
                const statusStyle = getStatusStyle(item.status);
                const shield = getShieldStyle(item.roleName);
                return (
                  <tr
                    key={item.id}
                    onMouseEnter={() => setHoverIndex(key)}
                    onMouseLeave={() => setHoverIndex(null)}
                    className="text-left text-[14px] border-b border-[#EEEEEE]"
                  // style={{
                  //   backgroundColor: hoverIndex === key ? "#F5F7F9" : "transparent",
                  // }}
                  >
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-1">
                        <span
                          className="h-9 w-9 rounded-full flex items-center justify-center shrink-0"

                        >
                          <MdOutlineShield
                            className="text-[22px]"
                            style={{ color: shield.color }}
                          />
                        </span>
                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="text-[#1C1C1C] font-semibold text-[14px]">
                            {item.roleName}
                          </span>
                          {item.isSystemRole && (
                            <span className="text-[11px] font-normal font-[400] text-[#0043DB] bg-[#0043DB26] border border-[#0043DB40] px-2 py-0.25 rounded-[8px]">
                              System Role
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-2 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-4 text-[#1C1C1C] font-normal text-[14px]">
                        <span>{item.members}</span>
                        <img src={userrole} alt="userrole" className="h-3 w-3 object-contain shrink-0" />
                      </div>
                    </td>
                    <td className="px-7 py-2 pl-40 text-[#1C1C1C] font-normal text-[14px]">
                      {item.permissions}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className="text-[12px] px-5 py-0.5 min-w-[80px] h-[20px] rounded-[4px] text-center inline-block font-semibold"
                        style={{
                          color: statusStyle.color,
                          backgroundColor: statusStyle.background,
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={() =>
                            navigate(`/management_unit/user&role/edit/${encodeURIComponent(item.roleName)}`)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              navigate(`/management_unit/user&role/edit/${encodeURIComponent(item.roleName)}`);
                            }
                          }}
                          className="material-symbols-outlined text-[#9C9C9C] text-[21px] font-[300] cursor-pointer inline-flex items-center justify-center rounded-full  transition-all"
                        >
                          edit
                        </span>
                        {/* --- CHANGED CLICK BINDING --- */}
                        {!item.isSystemRole && (
                          <img
                            src={deleteIcon}
                            alt="delete"
                            onClick={() => triggerDeleteModal(item.roleName)}
                            className="h-5.5 w-5.5 cursor-pointer [image-rendering:-webkit-optimize-contrast]"
                          />
                        )}
                        {/* ------------------------------ */}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="text-[10px] md:text-[12px] lg:text-[14px] paginationAll-sms"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          color: "#6B7280",
          fontFamily: "Segoe UI",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              onClick={() => setIsItemsPerPageOpen(!isItemsPerPageOpen)}
              style={{
                width: "80px",
                padding: "4px 8px",
                borderRadius: "4px",

                background: "#F9F9F9",
                appearance: "none",        // ✅ hide default arrow
                WebkitAppearance: "none",  // ✅ Safari/Chrome
                MozAppearance: "none",     // ✅ Firefox
                boxShadow:
                  "-2px 0px 1px rgba(0,0,0,0.05) inset, 2px 0px 1px rgba(0,0,0,0.05) inset, 0px -2px 1px rgba(0,0,0,0.05) inset, 0px 2px 1px rgba(0,0,0,0.05) inset",
                cursor: "pointer",
                outline: "none"
              }}
            >
              <span className="text-[#1C1C1C] font-bold text-[14px]">{itemsPerPage}</span>

              <span style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none", // so click works on select
                fontSize: "8px",
                color: "#555",
              }}>  ▼
              </span>




            </div>

            {isItemsPerPageOpen && (
              <div className="absolute bottom-full mb-2 left-0 w-20 bg-white border border-[#696969] rounded-[8px] shadow-xl z-50 overflow-hidden">
                {[5, 10, 20, 50].map((val) => (
                  <div
                    key={val}
                    onClick={() => {
                      setItemsPerPage(val);
                      setIsItemsPerPageOpen(false);
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2 text-[12px] text-[#696969] hover:bg-[#F3F4F6] cursor-pointer text-center font-normal"
                  >
                    {val}
                  </div>
                ))}
              </div>
            )}
          </div>
          <span className="text-[14px] text-[#696969]">
            Showing <span style={{ color: "#1C1C1C" }}>{totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span>-
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div
            onClick={() => handlePageChange(currentPage - 1)}
            className={`cursor-pointer ${currentPage === 1 ? "opacity-30" : ""}`}
          >
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#9CA3AF",
                display: "flex",
                alignItems: "center",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.5 : 1
              }}
            >
              <MdKeyboardArrowLeft size={25} /> Previous
            </button>

          </div>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <span
                key={p}
                onClick={() => handlePageChange(p)}
                className={`w-7 h-7 flex items-center justify-center rounded-[8px] cursor-pointer ${currentPage === p ? "bg-[#002B36] text-white" : ""
                  }`}
              >
                {p}
              </span>
            ))}
          </div>
          <div
            onClick={() => handlePageChange(currentPage + 1)}
            className={`cursor-pointer ${currentPage === totalPages ? "opacity-30" : ""}`}
          >
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#9CA3AF",
                display: "flex",
                alignItems: "center",
                cursor: "not-allowed",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.5 : 1
              }}
            >
              Next <MdKeyboardArrowRight size={25} />
            </button>
          </div>
        </div>
      </div>





      {/* --- ADDED COMPONENT MARKUP --- */}
      <DeleteRoleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setRoleToDelete("");
        }}
        onConfirm={confirmDeleteRole}
        eventName={roleToDelete}
      />
      {/* ------------------------------ */}


    </div>
  );
};

export default UserRole;
