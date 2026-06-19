import React, { useState } from "react";

const RoleForm = () => {
  const [roleName, setRoleName] = useState("");
  const [roleType, setRoleType] = useState("Teaching");
  const [status, setStatus] = useState("Active");
  const [remarks, setRemarks] = useState("");
  const [activeTab, setActiveTab] = useState("display");

  const roleTypes = ["Teaching", "Managing", "Student", "Other Staff"];

  const handleSubmit = () => {
    const payload = { roleName, roleType, status, remarks };
    console.log(payload);
  };

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-md">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-semibold">New Role</h2>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setActiveTab("display")}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              activeTab === "display"
                ? "bg-white shadow text-[#0B3142]"
                : "text-gray-400"
            }`}
          >
            Display
          </button>
          <button
            onClick={() => setActiveTab("permissions")}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              activeTab === "permissions"
                ? "bg-white shadow text-[#0B3142]"
                : "text-gray-400"
            }`}
          >
            Permissions
          </button>
        </div>
      </div>

      {/* FORM */}
      {activeTab === "display" && (
        <div className="space-y-6">
          
          {/* Role Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Role Name
            </label>
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="New Role"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B3142]"
            />
          </div>

          {/* Role Type */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Role Type
            </label>

            <div className="flex gap-6 flex-wrap">
              {roleTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="roleType"
                    value={type}
                    checked={roleType === type}
                    onChange={() => setRoleType(type)}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Remarks (Optional)
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Any special notes"
              className="w-full border rounded-xl px-4 py-3 h-24 resize-none"
            />
          </div>
        </div>
      )}

      {/* PERMISSIONS TAB (empty for now) */}
      {activeTab === "permissions" && (
        <div className="text-gray-500 text-sm">
          Permissions UI will go here...
        </div>
      )}

      {/* FOOTER BUTTONS */}
      <div className="flex justify-end gap-3 mt-8">
        <button className="border px-6 py-2 rounded-lg text-gray-600">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-[#0B3142] text-white px-6 py-2 rounded-lg"
        >
          Create Role
        </button>
      </div>
    </div>
  );
};

export default RoleForm;