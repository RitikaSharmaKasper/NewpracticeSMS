// sms/frontend/src/utils/roleDefaults.js
export const ALL_MODULES = {
  // Dashboard
  "Dashboard": "Dashboard",
  
  // Student Management
  "Students": "Students",
  "Student Details": "Student Details",
  "Student Attendance": "Student Attendance",
  "Student Performance": "Student Performance",
  "Student Promotion": "Student Promotion",
  "Student ID Card": "Student ID Card",
  
  // Staff Management
  "Staff": "Staff",
  "Staff Attendance": "Staff Attendance",
  "Staff Leave": "Staff Leave",
  "Staff ID Card": "Staff ID Card",
  
  // Academic
  "Classes": "Classes",
  "Sections": "Sections",
  "Subjects": "Subjects",
  "Timetable": "Timetable",
  "Exams": "Exams",
  "Results": "Results",
  "Rooms": "Rooms",
  
  // Finance
  "Fee Management": "Fee Management",
  "Payroll": "Payroll",
  "Expenses": "Expenses",
  "Certificate": "Certificate",
  "Receipt": "Receipt",
  
  // Resources
  "Library": "Library",
  "Transport": "Transport",
  "Facilities": "Facilities",
  
  // Communication
  "Notice": "Notice",
  "Messages": "Messages",
  "Events": "Events",
  "Calendar": "Calendar",
  
  // Online Test
  "Online Test": "Online Test",
  "Question Bank": "Question Bank",
  
  // Homework
  "Homework": "Homework",
  
  // Reports
  "Reports": "Reports",
  
  // System
  "Settings": "Settings",
  "Users": "Users"  // Keep as Users for role management
};

export const DEFAULT_PERMISSIONS = {
  export: false,
  import: false,
  create: false,
  read: false,
  update: false,
  delete: false,
  all: false
};

// CRUD action keys sent to the backend for every module.
export const PERMISSION_ACTIONS = [
  "create",
  "read",
  "update",
  "delete",
  "export",
  "import",
];

// Convert a human-readable UI label into the PascalCase key the API/DB uses.
// "Total Students" -> "TotalStudents", "Attendance Rate" -> "AttendanceRate",
// "Class & Section" -> "ClassAndSection", "KPI" -> "KPI"
export const labelToKey = (label) =>
  String(label || "")
    .replace(/&/g, " And ")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) =>
      word === word.toUpperCase()
        ? word // keep acronyms like KPI, ID, NCNS as-is
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join("");

// Reverse mapping for displaying a stored key back in the UI.
// "TotalStudents" -> "Total Students"
export const keyToLabel = (key) =>
  String(key || "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\bAnd\b/g, "&");