// sms/frontend/src/page/Role/RoleList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/axiosInstance";
import RoleTable from "../../components/Role/RoleTable";
import { hasPermission } from "../../components/utils/permission/hasPermission";
import { useAuth } from "../../context/AuthContext";

const RoleList = () => {
  const { user } = useAuth();
  console.log('useredate', user)
  const [accessDenied, setAccessDenied] = useState(false);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const menuRef = React.useRef(null);

  useEffect(() => {
    console.log('RoleList - User object:', user);
    console.log('RoleList - User role:', user?.account?.role?.roleName);
    console.log('RoleList - ModulePermissions:', user?.account?.role?.modulePermissions);
    console.log('RoleList - Has Roles permission:', hasPermission(user, 'Roles', 'read'));
    if(!hasPermission(user, 'Roles', 'read')) {
      setAccessDenied(true);
    }
  },[user]);

  useEffect(() => {
    fetchRoles();
    
    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await api.get("/api/role/getRole");
      setRoles(response.data);
    } catch (error) {
      toast.error("Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (role) => {
    if (window.confirm(`Are you sure you want to delete ${role.roleName}?`)) {
      try {
        await api.delete(`/api/role/delete/${role._id}`);
        toast.success("Role deleted successfully");
        fetchRoles();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete role");
      }
    }
  };

  const handleRowClick = (role) => {
    // Navigate to edit or view permissions
  };

  if (!hasPermission(user, "Roles", "read")) {
    return <div className="p-4">Access Denied</div>;
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Role Management</h3>
        {hasPermission(user, "Roles", "create") && (
          <Link to="/create-role" className="btn btn-primary">
            + Create New Role
          </Link>
        )}
      </div>

      <div className="bg-white rounded shadow">
        <RoleTable
          roles={roles}
          loading={loading}
          openMenuIndex={openMenuIndex}
          setOpenMenuIndex={setOpenMenuIndex}
          menuRef={menuRef}
          onDelete={handleDelete}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};

export default RoleList;