// sms/frontend/src/components/Role/CreateRole.jsx
import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdKeyboardArrowLeft, MdKeyboardArrowDown } from "react-icons/md";
import api from "../../config/axiosInstance";
import roleMenuData from "../../data/roleMenuPermissions.json";
import {
  DEFAULT_PERMISSIONS,
  PERMISSION_ACTIONS,
  labelToKey,
} from "../../components/utils/roleDefaults";

const CreateRole = () => {
  const navigate = useNavigate();

  // Canonical module list + their sub-items, sourced from roleMenuPermissions.json
  // so module names and sub-permission names match the backend / menu structure.
  const MODULES = useMemo(() => {
    return Object.entries(roleMenuData.menus || {}).map(([module, items]) => ({
      module,
      // drop empty / blank sub-items (some modules have [""] or [])
      subItems: (items || []).filter((item) => item && String(item).trim()),
    }));
  }, []);

  const [roleName, setRoleName] = useState("");
  const [status, setStatus] = useState("Active");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState({});

  // Module-level CRUD flags: { [module]: { create, read, ..., all } }
  const [modulePermissions, setModulePermissions] = useState(() => {
    const init = {};
    Object.keys(roleMenuData.menus || {}).forEach((module) => {
      init[module] = { ...DEFAULT_PERMISSIONS };
    });
    return init;
  });

  // Sub-permission flags keyed by PascalCase: { [module]: { [SubKey]: bool } }
  const [subPermissions, setSubPermissions] = useState(() => {
    const init = {};
    Object.entries(roleMenuData.menus || {}).forEach(([module, items]) => {
      const map = {};
      (items || [])
        .filter((item) => item && String(item).trim())
        .forEach((item) => {
          map[labelToKey(item)] = false;
        });
      init[module] = map;
    });
    return init;
  });

  const toggleExpand = (module) => {
    setExpanded((prev) => ({ ...prev, [module]: !prev[module] }));
  };

  const recomputeAll = (perms) =>
    PERMISSION_ACTIONS.every((action) => perms[action]);

  // Toggle a single CRUD action on a module
  const togglePermission = (module, action) => {
    setModulePermissions((prev) => {
      const current = prev[module] || { ...DEFAULT_PERMISSIONS };
      const updated = { ...current, [action]: !current[action] };
      updated.all = recomputeAll(updated);
      return { ...prev, [module]: updated };
    });
  };

  // Toggle "All" for a module -> set every CRUD flag and every sub-permission
  const toggleModuleAll = (module) => {
    setModulePermissions((prev) => {
      const current = prev[module] || { ...DEFAULT_PERMISSIONS };
      const newAll = !current.all;
      const next = {};
      PERMISSION_ACTIONS.forEach((action) => {
        next[action] = newAll;
      });
      next.all = newAll;
      return { ...prev, [module]: next };
    });

    setSubPermissions((prev) => {
      const willEnable = !(modulePermissions[module]?.all);
      const map = { ...(prev[module] || {}) };
      Object.keys(map).forEach((key) => {
        map[key] = willEnable;
      });
      return { ...prev, [module]: map };
    });
  };

  // Toggle a single sub-permission (PascalCase key)
  const toggleSub = (module, label) => {
    const key = labelToKey(label);
    setSubPermissions((prev) => ({
      ...prev,
      [module]: { ...(prev[module] || {}), [key]: !prev[module]?.[key] },
    }));
  };

  const isSubChecked = (module, label) =>
    Boolean(subPermissions[module]?.[labelToKey(label)]);

  // Select everything across all modules
  const selectAllPermissions = () => {
    setModulePermissions((prev) => {
      const next = {};
      Object.keys(prev).forEach((module) => {
        next[module] = {
          create: true,
          read: true,
          update: true,
          delete: true,
          export: true,
          import: true,
          all: true,
        };
      });
      return next;
    });
    setSubPermissions((prev) => {
      const next = {};
      Object.entries(prev).forEach(([module, map]) => {
        const filled = {};
        Object.keys(map).forEach((key) => {
          filled[key] = true;
        });
        next[module] = filled;
      });
      return next;
    });
  };

  // Reset everything to false
  const resetPermissions = () => {
    setModulePermissions((prev) => {
      const next = {};
      Object.keys(prev).forEach((module) => {
        next[module] = { ...DEFAULT_PERMISSIONS };
      });
      return next;
    });
    setSubPermissions((prev) => {
      const next = {};
      Object.entries(prev).forEach(([module, map]) => {
        const cleared = {};
        Object.keys(map).forEach((key) => {
          cleared[key] = false;
        });
        next[module] = cleared;
      });
      return next;
    });
  };

  // Build the API payload: only include modules that have something turned on.
  const buildModulePermissions = () => {
    const payload = {};
    MODULES.forEach(({ module }) => {
      const crud = modulePermissions[module] || {};
      const subs = subPermissions[module] || {};
      const anyCrud = PERMISSION_ACTIONS.some((action) => crud[action]);
      const anySub = Object.values(subs).some(Boolean);
      if (!anyCrud && !anySub) return;

      payload[module] = {
        create: !!crud.create,
        read: !!crud.read,
        update: !!crud.update,
        delete: !!crud.delete,
        export: !!crud.export,
        import: !!crud.import,
        all: !!crud.all,
        subPermissions: subs,
      };
    });
    return payload;
  };

  const handleSave = async () => {
    if (!roleName.trim()) {
      toast.error("Please enter a role name");
      return;
    }

    setLoading(true);
    try {
      const roleData = {
        roleName: roleName.trim(),
        status,
        remarks,
        modulePermissions: buildModulePermissions(),
      };

      await api.post("/api/role/create", roleData);
      toast.success("Role created successfully!");
      navigate("/roles");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create role";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Small reusable toggle switch
  const Toggle = ({ checked, onChange }) => (
    <label style={{ cursor: loading ? "not-allowed" : "pointer" }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ display: "none" }}
        disabled={loading}
      />
      <div
        style={{
          width: "36px",
          height: "20px",
          backgroundColor: checked ? "#1F7FFF" : "#A2A8B8",
          borderRadius: "20px",
          position: "relative",
          transition: "background-color 0.2s",
        }}
      >
        <div
          style={{
            width: "16px",
            height: "16px",
            backgroundColor: "white",
            borderRadius: "50%",
            position: "absolute",
            top: "2px",
            left: checked ? "18px" : "2px",
            transition: "left 0.2s",
          }}
        />
      </div>
    </label>
  );

  return (
    <div className="p-4 min-h-screen bg-gray-50" style={{ height: "100vh" }}>
      {/* Header */}
      <div
        className="d-flex align-items-center gap-2"
        style={{ marginBottom: "20px" }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            background: "#fff",
            borderRadius: 50,
            border: "1px solid #EAEAEA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to="/roles">
            <MdKeyboardArrowLeft style={{ color: "#6C748C", fontSize: "25px" }} />
          </Link>
        </div>
        <h3
          style={{
            fontSize: "22px",
            color: "#0E101A",
            fontFamily: '"Inter", sans-serif',
            fontWeight: 500,
            lineHeight: "120%",
            marginBottom: "0",
          }}
        >
          Create Role
        </h3>
      </div>

      <div
        style={{
          margin: "0 auto",
          background: "white",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          overflow: "auto",
          maxHeight: "calc(100vh - 220px)",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontFamily: "Inter",
            fontSize: "20px",
            fontWeight: "600",
            color: "#0E101A",
            marginBottom: "24px",
          }}
        >
          Create New Role
        </h1>

        {/* Role Name */}
        <div style={{ marginBottom: "16px", maxWidth: "400px" }}>
          <label style={{ display: "block", marginBottom: "6px" }}>
            <span
              style={{ color: "#727681", fontSize: "12px", fontFamily: "Inter" }}
            >
              Role Name
            </span>
            <span style={{ color: "#D00003", marginLeft: "4px" }}>*</span>
          </label>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Enter Role Name"
            style={{
              width: "100%",
              height: "40px",
              padding: "0 12px",
              borderRadius: "8px",
              border: "1px solid #EAEAEA",
              fontSize: "14px",
              fontFamily: "Inter",
              color: "#0E101A",
              outline: "none",
            }}
            disabled={loading}
          />
        </div>

        {/* Status */}
        <div style={{ marginBottom: "16px", maxWidth: "400px" }}>
          <label style={{ display: "block", marginBottom: "6px" }}>
            <span
              style={{ color: "#727681", fontSize: "12px", fontFamily: "Inter" }}
            >
              Status
            </span>
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              width: "100%",
              height: "40px",
              padding: "0 12px",
              borderRadius: "8px",
              border: "1px solid #EAEAEA",
              fontSize: "14px",
              fontFamily: "Inter",
              color: "#0E101A",
              outline: "none",
              background: "white",
            }}
            disabled={loading}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Remarks */}
        <div style={{ marginBottom: "24px", maxWidth: "400px" }}>
          <label style={{ display: "block", marginBottom: "6px" }}>
            <span
              style={{ color: "#727681", fontSize: "12px", fontFamily: "Inter" }}
            >
              Remarks (Optional)
            </span>
          </label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Any special notes"
            rows={3}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid #EAEAEA",
              fontSize: "14px",
              fontFamily: "Inter",
              color: "#0E101A",
              outline: "none",
              resize: "none",
            }}
            disabled={loading}
          />
        </div>

        {/* Permission Actions */}
        <div style={{ marginBottom: "20px", display: "flex", gap: "12px" }}>
          <button
            onClick={selectAllPermissions}
            style={{
              padding: "8px 16px",
              backgroundColor: "#1F7FFF",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
            }}
            disabled={loading}
          >
            Select All Permissions
          </button>
          <button
            onClick={resetPermissions}
            style={{
              padding: "8px 16px",
              backgroundColor: "#F3F4F6",
              color: "#374151",
              border: "1px solid #D1D5DB",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
            }}
            disabled={loading}
          >
            Reset All
          </button>
        </div>

        <h2
          style={{
            fontFamily: "Inter",
            fontSize: "16px",
            fontWeight: "500",
            color: "#0E101A",
            marginBottom: "12px",
          }}
        >
          Permissions
        </h2>

        {/* Module cards */}
        {MODULES.map(({ module, subItems }) => {
          const perms = modulePermissions[module] || { ...DEFAULT_PERMISSIONS };
          const isOpen = expanded[module];
          const hasSubs = subItems.length > 0;

          return (
            <div
              key={module}
              style={{
                border: "1px solid #E6E6E6",
                borderRadius: "10px",
                overflow: "hidden",
                marginBottom: "12px",
                fontFamily: "Inter",
              }}
            >
              {/* Module header row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  backgroundColor: "#F3F8FB",
                }}
              >
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#0E101A",
                    flex: 1,
                  }}
                >
                  {module}
                </span>

                {/* CRUD toggles */}
                {PERMISSION_ACTIONS.map((action) => (
                  <div
                    key={action}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      minWidth: "54px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#727681",
                        textTransform: "capitalize",
                      }}
                    >
                      {action}
                    </span>
                    <Toggle
                      checked={!!perms[action]}
                      onChange={() => togglePermission(module, action)}
                    />
                  </div>
                ))}

                {/* All toggle */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    minWidth: "54px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#727681" }}>All</span>
                  <Toggle
                    checked={!!perms.all}
                    onChange={() => toggleModuleAll(module)}
                  />
                </div>

                {/* Expand chevron */}
                <div style={{ width: "24px", textAlign: "center" }}>
                  {hasSubs && (
                    <MdKeyboardArrowDown
                      onClick={() => toggleExpand(module)}
                      style={{
                        fontSize: "22px",
                        color: "#6C748C",
                        cursor: "pointer",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Sub-permissions */}
              {hasSubs && isOpen && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "8px 16px",
                    padding: "16px",
                    borderTop: "1px solid #EEEEEE",
                  }}
                >
                  {subItems.map((item) => (
                    <label
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: loading ? "not-allowed" : "pointer",
                        fontSize: "14px",
                        color: "#1C1C1C",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSubChecked(module, item)}
                        onChange={() => toggleSub(module, item)}
                        disabled={loading}
                        style={{
                          width: "16px",
                          height: "16px",
                          accentColor: "#1F7FFF",
                        }}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
        }}
      >
        <button
          onClick={() => navigate("/roles")}
          style={{
            padding: "10px 24px",
            backgroundColor: "#F3F4F6",
            color: "#374151",
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            fontFamily: "Inter",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={loading || !roleName.trim()}
          style={{
            padding: "10px 32px",
            backgroundColor: loading ? "#93C5FD" : "#1F7FFF",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            fontFamily: "Inter",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Creating..." : "Save Role"}
        </button>
      </div>
    </div>
  );
};

export default CreateRole;
