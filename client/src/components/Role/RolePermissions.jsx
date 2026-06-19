import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const roles = [
  { name: "Super Administrator", members: 2, permission: "All", color: "#F94144" },
  { name: "Teacher", members: 180, permission: "Limited", color: "#F3722C" },
  { name: "Student", members: 500, permission: "Limited", color: "#F8961E" },
  { name: "Accountant", members: 2, permission: "All", color: "#F9C74F" },
  { name: "Driver", members: 2, permission: "All", color: "#90BE6D" },
  { name: "Librarian", members: 2, permission: "All", color: "#43AA8B" },
];

const RolePermissions = () => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Role & Permissions
          </h2>
          <p className="text-sm text-gray-500">
            Manage user roles, permissions, and access control
          </p>
        </div>

        <button className="bg-[#0B3142] text-white px-6 py-2 rounded-lg flex items-center gap-2">
          + Add
        </button>
      </div>

      {/* Table */}
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full">
          
          {/* Table Head */}
          <thead className="bg-gray-50 text-left">
            <tr className="text-sm text-gray-700">
              <th className="p-4">Role Name</th>
              <th className="p-4">Members</th>
              <th className="p-4">Permissions</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {roles.map((role, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Role Name */}
                <td className="p-4 flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded"
                    style={{ background: role.color }}
                  />
                  <span className="font-medium">{role.name}</span>
                </td>

                {/* Members */}
                <td className="p-4 text-gray-700">
                  {role.members}
                </td>

                {/* Permissions */}
                <td className="p-4 text-gray-700">
                  {role.permission}
                </td>

                {/* Status */}
                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 text-xs rounded">
                    Active
                  </span>
                </td>

                {/* Actions */}
                <td className="p-4 flex gap-3">
                  <FaEdit className="text-gray-500 cursor-pointer" />
                  <FaTrash className="text-red-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        
        <div className="flex items-center gap-2 text-gray-500">
          <select className="border rounded px-2 py-1">
            <option>10</option>
            <option>20</option>
          </select>
          <span>
            Showing <span className="text-black">1-10</span> of 500 results
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="text-gray-400">Previous</button>

          <button className="bg-[#12516E] text-white px-2 py-1 rounded">
            1
          </button>
          <button className="px-2 py-1">2</button>
          <button className="px-2 py-1">3</button>
          <button className="px-2 py-1">4</button>
          <button className="px-2 py-1">...</button>
          <button className="px-2 py-1">10</button>

          <button className="text-black">Next</button>
        </div>
      </div>
    </div>
  );
};

export default RolePermissions;