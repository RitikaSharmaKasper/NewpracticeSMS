// sms/frontend/src/components/Role/PermissionPanel.jsx
import React, { useState } from 'react';
import api from '../../config/axiosInstance';
import { toast } from 'react-toastify';

const PermissionPanel = ({ role, onUpdate }) => {
  const [openGroups, setOpenGroups] = useState({
    'Dashboard': true,
    'Students': true,
    'Staff': false,
    'Academic': false,
    'Timetable': false,
    'Exam': false,
    'Fee': false,
    'Result': false,
    'Homework': false,
    'Online Class': false,
    'Event & Calendar': false,
    'Front Desk': false,
    'Online Test': false,
    'Payroll': false,
    'Account': false,
    'Transport': false,
    'Study Material': false,
    'Reports': false,
    'Notice': false,
    'Certificate': false,
    'Messages': false,
    'Settings': false
  });
  const [saving, setSaving] = useState(false);

  // Grouped modules based on Figma structure
  const groupedModules = {
    'Dashboard': ['Dashboard'],
    
    'Students': [
      'All student',
      'Daily Attendance',
      'Period-Wise Attendance',
      'Performance',
      'Leave Request',
      'ID Card',
      'Manage Login',
      'Promote Student',
      'Student Profile',
      'Admission Letter'
    ],
    
    'Staff': [
      'All Staff',
      'View Attendance',
      'Attendance Register',
      'Update Attendance',
      'Shift Management',
      'Leave Request',
      'ID Card',
      'Manage Login',
      'Staff Profile',
      'Job Letter'
    ],
    
    'Academic': [
      'Room',
      'Class & Section',
      'Subjects',
      'Performance'
    ],
    
    'Timetable': [
      'Class Timetable',
      'Teacher Timetable',
      'Substitution',
      'Settings'
    ],
    
    'Exam': [
      'Create Exam',
      'Exam List',
      'Schedule Exam',
      'Admit card',
      'Invigilators',
      'Instruction'
    ],
    
    'Fee': [
      'Fee Deposit',
      'Fee Receipt',
      'Pending Fee',
      'Fee Particulars',
      'Fee Structure',
      'Concessions'
    ],
    
    'Result': [
      'Mark Entry',
      'Report Card',
      'View Result'
    ],
    
    'Homework': [
      'Add Homework',
      'Homework List',
      'Homework Report'
    ],
    
    'Online Class': [
      'Dashboard',
      'Scheduled Class',
      'Past Class'
    ],
    
    'Event & Calendar': [
      'Calendar',
      'Events',
      'Upcoming Events'
    ],
    
    'Front Desk': [
      'Visitor Register',
      'Admission Enquiries',
      'Gate Pass'
    ],
    
    'Online Test': [
      'Question Bank',
      'Test Paper',
      'Test Schedule',
      'Result'
    ],
    
    'Payroll': [
      'Generate Payroll',
      'Salary Structure',
      'Pay slips',
      'Deduction & Advances'
    ],
    
    'Account': [
      'Expenses',
      'Revenue',
      'Account Statement',
      'Bank Account'
    ],
    
    'Transport': [
      'Vehicles',
      'Routes',
      'Bus Stops',
      'Drivers & Staff',
      'Transport Allocation',
      'Transport Attendance',
      'Live Bus Status'
    ],
    
    'Study Material': ['Study Material'],
    'Reports': ['Reports'],
    'Notice': ['Notice'],
    'Certificate': ['Certificate'],
    'Messages': ['Messages'],
    'Settings': ['Settings']
  };

  const toggleGroup = (groupName) => {
    setOpenGroups(prev => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  const getPermissionValue = (moduleName, action) => {
    return role?.modulePermissions?.[moduleName]?.[action] || false;
  };

  const updatePermission = async (moduleName, action, value) => {
    setSaving(true);
    try {
      const updatedPermissions = {
        ...role.modulePermissions,
        [moduleName]: {
          ...(role.modulePermissions?.[moduleName] || {}),
          [action]: value
        }
      };

      // If all actions are true, set all to true
      if (action !== 'all') {
        const actions = ['create', 'read', 'update', 'delete', 'export', 'import'];
        const allTrue = actions.every(a => updatedPermissions[moduleName][a]);
        if (allTrue) {
          updatedPermissions[moduleName].all = true;
        }
      }

      await api.put(`/api/role/update/${role._id}`, {
        modulePermissions: updatedPermissions
      });

      toast.success('Permission updated successfully');
      onUpdate?.();
    } catch (error) {
      toast.error('Failed to update permission');
    } finally {
      setSaving(false);
    }
  };

  // Toggle Switch Component
  const ToggleSwitch = ({ checked, onChange, disabled, label }) => (
    <button
      onClick={() => onChange(!checked)}
      disabled={disabled || saving}
      style={{
        width: '48px',
        height: '24px',
        borderRadius: '259px',
        background: checked ? '#1F7FFF' : '#E9E9E9',
        border: 'none',
        cursor: (disabled || saving) ? 'not-allowed' : 'pointer',
        position: 'relative',
        padding: '2px',
        opacity: disabled ? 0.5 : 1
      }}
    >
      <div style={{
        width: '20px',
        height: '20px',
        background: 'white',
        borderRadius: '50%',
        position: 'absolute',
        left: checked ? '26px' : '2px',
        top: '2px',
        transition: 'left 0.2s'
      }} />
    </button>
  );

  // Get the current permissions for a module
  const getModulePermissions = (moduleName) => {
    return role?.modulePermissions?.[moduleName] || {
      create: false,
      read: false,
      update: false,
      delete: false,
      export: false,
      import: false,
      all: false
    };
  };

  return (
    <div>
      {Object.entries(groupedModules).map(([category, modules]) => (
        <div key={category} style={{ marginBottom: '16px', border: '1px solid #E6E6E6', borderRadius: '10px', overflow: 'hidden' }}>
          
          {/* Category Header - Collapsible */}
          <div
            onClick={() => toggleGroup(category)}
            style={{
              padding: '20px',
              background: 'white',
              borderBottom: openGroups[category] ? '1px solid #E5E7EB' : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '4px',
                border: '1px solid #9C9C9C',
                background: modules.every(m => getModulePermissions(m).all) ? '#1F7FFF' : 'white',
                position: 'relative'
              }}>
                {modules.every(m => getModulePermissions(m).all) && (
                  <svg style={{ position: 'absolute', top: '-1px', left: '-1px' }} width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4.5 9L7.5 12L13.5 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <span style={{ fontWeight: 600, fontSize: '16px', color: '#101828' }}>{category}</span>
            </div>
            <span style={{ fontSize: '16px', color: '#1C1C1C' }}>{openGroups[category] ? '▲' : '▼'}</span>
          </div>

          {/* Module Permissions Table */}
          {openGroups[category] && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC' }}>
                    <th style={{ padding: '12px 20px', textAlign: 'left', width: '300px', fontSize: '14px', fontWeight: 600, color: '#1C1C1C' }}>
                      Module
                    </th>
                    <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '14px', fontWeight: 600, color: '#1C1C1C' }}>Add</th>
                    <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '14px', fontWeight: 600, color: '#1C1C1C' }}>View</th>
                    <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '14px', fontWeight: 600, color: '#1C1C1C' }}>Edit</th>
                    <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '14px', fontWeight: 600, color: '#1C1C1C' }}>Delete</th>
                    <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '14px', fontWeight: 600, color: '#1C1C1C' }}>Export</th>
                    <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '14px', fontWeight: 600, color: '#1C1C1C' }}>Import</th>
                    <th style={{ padding: '12px 20px', textAlign: 'center', fontSize: '14px', fontWeight: 600, color: '#1C1C1C' }}>All</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map(module => {
                    const perms = getModulePermissions(module);
                    return (
                      <tr key={module} style={{ borderTop: '1px solid #E5E7EB' }}>
                        <td style={{ padding: '12px 20px', fontWeight: 500, fontSize: '14px', color: '#1C1C1C' }}>
                          {module}
                        </td>
                        <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                          <ToggleSwitch
                            checked={perms.create}
                            onChange={(val) => updatePermission(module, 'create', val)}
                            disabled={role?.roleName === 'Super Admin'}
                          />
                        </td>
                        <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                          <ToggleSwitch
                            checked={perms.read}
                            onChange={(val) => updatePermission(module, 'read', val)}
                            disabled={role?.roleName === 'Super Admin'}
                          />
                        </td>
                        <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                          <ToggleSwitch
                            checked={perms.update}
                            onChange={(val) => updatePermission(module, 'update', val)}
                            disabled={role?.roleName === 'Super Admin'}
                          />
                        </td>
                        <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                          <ToggleSwitch
                            checked={perms.delete}
                            onChange={(val) => updatePermission(module, 'delete', val)}
                            disabled={role?.roleName === 'Super Admin'}
                          />
                        </td>
                        <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                          <ToggleSwitch
                            checked={perms.export}
                            onChange={(val) => updatePermission(module, 'export', val)}
                            disabled={role?.roleName === 'Super Admin'}
                          />
                        </td>
                        <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                          <ToggleSwitch
                            checked={perms.import}
                            onChange={(val) => updatePermission(module, 'import', val)}
                            disabled={role?.roleName === 'Super Admin'}
                          />
                        </td>
                        <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                          <ToggleSwitch
                            checked={perms.all}
                            onChange={(val) => {
                              // Toggle all permissions
                              const actions = ['create', 'read', 'update', 'delete', 'export', 'import'];
                              actions.forEach(action => {
                                updatePermission(module, action, val);
                              });
                            }}
                            disabled={role?.roleName === 'Super Admin'}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PermissionPanel;