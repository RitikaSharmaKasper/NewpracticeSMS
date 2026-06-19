// sms/frontend/src/components/Role/RoleTable.jsx
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeleteICONImg from "../../assets/images/delete.png";
import EditICONImg from "../../assets/images/edit.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { hasPermission } from "../utils/permission/hasPermission";
import { useAuth } from "../../context/AuthContext";

const RoleTable = ({
  roles = [],
  loading = false,
  openMenuIndex,
  setOpenMenuIndex,
  menuRef,
  onDelete,
  onRowClick,
  selectedRolesForExport = [],
  handleCheckboxChange,
  selectAllForExport,
  handleSelectAllForExport
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0 });
  const [openUpwards, setOpenUpwards] = useState(false);

  const getPermissionsSummary = (role) => {
    if (!role.modulePermissions || Object.keys(role.modulePermissions).length === 0) return "Limited";

    const allFull = Object.values(role.modulePermissions).every(modulePerms => {
      return modulePerms.create && modulePerms.read && modulePerms.update && modulePerms.delete;
    });

    return allFull ? "Full" : "Limited";
  };

  const handleMenuAction = (action, role) => {
    setOpenMenuIndex(null);
    switch (action) {
      case "edit":
        navigate(`/edit-role/${role._id}`);
        break;
      case "delete":
        onDelete?.(role);
        break;
      default:
        break;
    }
  };

  const handleCheckboxClick = (e, roleId) => {
    e.stopPropagation();
    handleCheckboxChange?.(roleId);
  };

  const handleSelectAllClick = (e) => {
    e.stopPropagation();
    handleSelectAllForExport?.();
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        Loading roles...
      </div>
    );
  }

  if (roles.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        No roles found
      </div>
    );
  }

  return (
    <table
      style={{
        width: "100%",
        borderSpacing: "0 0px",
        fontFamily: "Inter",
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              backgroundColor: "#F3F8FB",
              fontWeight: 400,
              fontSize: 14,
              color: "#727681",
              padding: "12px 16px",
              position: "sticky",
              top: 0,
              zIndex: 10,
              width: "50px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="checkbox"
                checked={selectAllForExport}
                onChange={handleSelectAllClick}
                style={{
                  width: "16px",
                  height: "16px",
                  cursor: "pointer",
                  accentColor: "#1F7FFF",
                }}
              />
            </div>
          </th>
          {["Roles", "Members", "Permissions", "Actions"].map((h, i) => (
            <th
              key={i}
              style={{
                backgroundColor: "#F3F8FB",
                fontWeight: 400,
                fontSize: 14,
                color: "#727681",
                padding: "12px 16px",
                position: "sticky",
                top: 0,
                zIndex: 10,
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {roles.map((role, index) => (
          <tr key={role._id} 
            style={{ verticalAlign: "middle", cursor: "pointer", borderBottom: "1px solid #EAEAEA" }} 
            onClick={() => onRowClick?.(role)}
          >
            <td
              style={{
                padding: "4px 16px",
                width: "50px"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <input
                  type="checkbox"
                  checked={selectedRolesForExport.includes(role._id)}
                  onChange={(e) => handleCheckboxClick(e, role._id)}
                  style={{
                    width: "16px",
                    height: "16px",
                    cursor: "pointer",
                    accentColor: "#1F7FFF",
                  }}
                />
              </div>
            </td>
            <td style={{ padding: "4px 16px" }}>
              <div style={{ fontSize: 14, color: "#0E101A" }}>
                {role.roleName}
              </div>
            </td>
            <td style={{ padding: "4px 16px" }}>
              <div className="d-flex align-items-center" style={{ gap: 8 }}>
                <span style={{ color: "#0E101A", fontSize: 14 }}>
                  {role.memberCount || 0}
                </span>
                <FaUser style={{ color: "#6C748C", fontSize: 14 }} />
              </div>
            </td>
            <td style={{ padding: "4px 16px" }}>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  backgroundColor: getPermissionsSummary(role) === "Full" ? "#D4F7C7" : "#F7C7C9",
                  color: getPermissionsSummary(role) === "Full" ? "#01774B" : "#A80205",
                }}
              >
                {getPermissionsSummary(role)}
              </span>
            </td>
            <td style={{ padding: "4px 16px", textAlign: "center", position: "relative" }} onClick={(e) => e.stopPropagation()}>
              <button
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setOpenMenuIndex(openMenuIndex === index ? null : index)

                  const dropdownHeight = 260;
                  const spaceBelow = window.innerHeight - rect.bottom;
                  const spaceAbove = rect.top;

                  if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
                    setOpenUpwards(true);
                    setDropdownPos({
                      x: rect.left,
                      y: rect.top - 6,
                    });
                  } else {
                    setOpenUpwards(false);
                    setDropdownPos({
                      x: rect.left,
                      y: rect.bottom + 6,
                    });
                  }
                }}
                className="btn"
                style={{
                  border: "none",
                  background: "transparent",
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <HiOutlineDotsHorizontal size={28} color="grey" />
              </button>

              {openMenuIndex === index && (
                <div
                  style={{
                    position: "fixed",
                    top: openUpwards ? dropdownPos.y - 100 : dropdownPos.y,
                    left: dropdownPos.x - 80,
                    zIndex: 999999,
                  }}
                >
                  <div
                    ref={menuRef}
                    style={{
                      background: "white",
                      padding: 8,
                      borderRadius: 12,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      minWidth: 180,
                      height: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <ul
                      style={{
                        listStyle: "none",
                        marginBottom: "0",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "10px",
                        cursor: 'pointer'
                      }}
                    >
                      {hasPermission(user, "Roles", "update") && (
                        <li
                          onClick={() => handleMenuAction("edit", role)}
                          style={{
                            color: "#0E101A",
                            fontFamily: "Inter",
                            fontSize: "16px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "5px 10px",
                            borderRadius: "8px",
                            cursor: "pointer"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F3F4F6"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                        >
                          <img src={EditICONImg} alt="edit" style={{ width: 20, height: 20 }} />
                          <label style={{ color: "#0E101A", fontFamily: "Inter", fontSize: "16px", cursor: "pointer" }}>
                            Edit
                          </label>
                        </li>
                      )}
                      {hasPermission(user, "Roles", "delete") && (
                        <li
                          onClick={() => handleMenuAction("delete", role)}
                          style={{
                            color: "#0E101A",
                            fontFamily: "Inter",
                            fontSize: "16px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "5px 10px",
                            borderRadius: "8px",
                            cursor: "pointer"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#FEE2E2"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                        >
                          <img src={DeleteICONImg} alt="delete" style={{ width: 20, height: 20 }} />
                          <label style={{ color: "#DC2626", fontFamily: "Inter", fontSize: "16px", cursor: "pointer" }}>
                            Delete
                          </label>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoleTable;