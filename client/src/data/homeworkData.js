import basic from "../../public/basic-text.pdf";

/**
 * Initial State for the Add Homework Form
 * This ensures the component has a single source of truth for its structure.
 */
export const addHomeworkForm = {
  title: "",
  class: "",
  section: "",
  subject: "",
  teacher: "",
  dueDate: "",
  description: "",
  attachment: null,
  availableFor: "students",
};

/**
 * Initial Dummy Data for the Homework List
 * When the app loads, you can merge this with localStorage data.
 */
export const homeworkList = [
  {
    id: 1,
    title: "Chapter 5: Cell Biology - Diagrams and Questions",
    description: "Complete all diagrams from Chapter 5 and answer questions 1-10 regarding cell structures.",
    subject: "Biology",
    class: "Class 10",
    section: "A",
    teacher: "Dr. Paul Sharma",
    status: "Active",
    publishDate: "10 Jan, 2026",
    dueDate: "15 Jan, 2026",
    createdAt: "2026-01-10",
    submittedCount: "32/40",
    pendingCount: "8 students",
    checkedCount: "28/40",
    progress: 80,
    attachment: {
      name: "basic-text.pdf",
      size: "1.5",
      url: basic,
    },
  },
  {
    id: 2,
    title: "Basic Impact of Climate Change",
    description: "Write a 500-word essay on the direct impact of global warming on coastal regions.",
    subject: "Environmental Science",
    class: "Class 9",
    section: "B",
    teacher: "Mrs. Anjali Roy",
    status: "Completed",
    publishDate: "12 Jan, 2026",
    dueDate: "18 Jan, 2026",
    createdAt: "2026-01-12",
    submittedCount: "38/38",
    pendingCount: "0 students",
    checkedCount: "35/38",
    progress: 100,
    attachment: {
      name: "climate-study.png",
      size: "2.1",
      url: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?q=80&w=400",
    },
  },
  {
    id: 3,
    title: "Quadratic Equations - Problem Set 4",
    description: "Solve problems from Exercise 4.1 and 4.2. Show all steps for calculation.",
    subject: "Mathematics",
    class: "Class 10",
    section: "A",
    teacher: "Mr. David Miller",
    status: "Overdue",
    publishDate: "14 Jan, 2026",
    dueDate: "20 Jan, 2026",
    createdAt: "2026-01-14",
    submittedCount: "42/42",
    pendingCount: "0 students",
    checkedCount: "42/42",
    progress: 100,
    attachment: {
      name: "math-problems.pdf",
      size: "3.4",
      url: "",
    },
  },
  {
    id: 4,
    title: "The Great Revolt of 1857 - Summary",
    description: "Summarize the key causes and consequences of the 1857 revolt in bullet points.",
    subject: "History",
    class: "Class 8",
    section: "C",
    teacher: "Pooja Singh",
    status: "Active",
    publishDate: "15 Jan, 2026",
    dueDate: "22 Jan, 2026",
    createdAt: "2026-01-15",
    submittedCount: "20/35",
    pendingCount: "15 students",
    checkedCount: "10/35",
    progress: 57,
    attachment: {
      name: "history-revolt.pdf",
      size: "1.8",
      url: "",
    },
  },
  {
    id: 5,
    title: "Organic Chemistry: Functional Groups",
    description: "Identify and draw the structures of 10 different functional groups discussed in class.",
    subject: "Chemistry",
    class: "Class 11",
    section: "A",
    teacher: "Rohit Verma",
    status: "Active",
    publishDate: "18 Jan, 2026",
    dueDate: "25 Jan, 2026",
    createdAt: "2026-01-18",
    submittedCount: "15/30",
    pendingCount: "15 students",
    checkedCount: "5/30",
    progress: 50,
    attachment: {
      name: "chem-structures.pdf",
      size: "1.2",
      url: "",
    },
  },
  {
    id: 6,
    title: "Introduction to Python - Basic Syntax",
    description: "Write basic Python scripts to demonstrate input/output and simple loops.",
    subject: "Computer",
    class: "Class 11",
    section: "B",
    teacher: "Amit Kumar",
    status: "Pending",
    publishDate: "16 Jan, 2026",
    dueDate: "25 Jan, 2026",
    createdAt: "2026-01-16",
    submittedCount: "28/30",
    pendingCount: "2 students",
    checkedCount: "15/30",
    progress: 93,
    attachment: {
      name: "python-basics.zip",
      size: "5.2",
      url: "",
    },
  },
];

// ---------------------------------
// 3. Dropdown Options
// ---------------------------------
export const classOptions = [
  "Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", 
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12",
];

export const sectionOptions = ["A", "B", "C", "D"];

export const subjectOptions = [
  "Mathematics", "Science", "English", "Hindi", "Computer", "Social Science", 
  "Physics", "Chemistry", "Biology", "Environmental Science", "History",
];

export const teacherOptions = [
  "Anjali Sharma", "Rohit Verma", "Sneha Gupta", "Pooja Singh", "Amit Kumar", 
  "Neha Mishra", "Dr. Paul Sharma", "Mrs. Anjali Roy", "Mr. David Miller",
];

// ---------------------------------
// 4. Student Submissions Data
// ---------------------------------
export const studentSubmissionsData = {
  1: [
    {
      id: "STUD-001",
      name: "Anushka Sharma",
      date: "14 Jan, 2026",
      files: "1 file",
      status: "Submitted",
      remark: "-",

      submissionFile: {
        name: "biology-homework.pdf",
        size: "1.5 MB",
        url: basic,
        type: "pdf",
      },
    },

    {
      id: "STUD-002",
      name: "Ranveer Singh",
      date: "14 Jan, 2026",
      files: "2 files",
      status: "Checked",
      remark: "Excellent work with detailed diagrams",

      submissionFile: {
        name: "science-assignment.pdf",
        size: "2.1 MB",
        url: basic,
        type: "pdf",
      },
    },

    {
      id: "STUD-003",
      name: "Kareena Kapoor",
      date: "Not submitted",
      files: "No files",
      status: "Pending",
      remark: "-",
      submissionFile: null,
    },
  ],

  2: [
    {
      id: "STUD-004",
      name: "Virat Kohli",
      date: "15 Jan, 2026",
      files: "1 file",
      status: "Checked",
      remark: "Well written",

      submissionFile: {
        name: "climate-report.pdf",
        size: "1.2 MB",
        url: basic,
        type: "pdf",
      },
    },

    {
      id: "STUD-005",
      name: "Alia Bhatt",
      date: "14 Jan, 2026",
      files: "1 file",
      status: "Submitted",
      remark: "-",

      submissionFile: {
        name: "essay-work.pdf",
        size: "1.4 MB",
        url: basic,
        type: "pdf",
      },
    },
  ],

  3: [
    {
      id: "STUD-006",
      name: "Hrithik Roshan",
      date: "14 Jan, 2026",
      files: "1 file",
      status: "Checked",
      remark: "Excellent calculations",

      submissionFile: {
        name: "math-homework.pdf",
        size: "2.5 MB",
        url: basic,
        type: "pdf",
      },
    },

    {
      id: "STUD-007",
      name: "Pooja Hegde",
      date: "Not submitted",
      files: "No files",
      status: "Pending",
      remark: "-",
      submissionFile: null,
    },
  ],

  4: [
    {
      id: "STUD-008",
      name: "Salman Khan",
      date: "15 Jan, 2026",
      files: "1 file",
      status: "Submitted",
      remark: "-",

      submissionFile: {
        name: "history-summary.pdf",
        size: "1.7 MB",
        url: basic,
        type: "pdf",
      },
    },
  ],

  5: [
    {
      id: "STUD-009",
      name: "Deepika Padukone",
      date: "14 Jan, 2026",
      files: "1 file",
      status: "Checked",
      remark: "Good structures",

      submissionFile: {
        name: "chemistry-work.pdf",
        size: "2.0 MB",
        url: basic,
        type: "pdf",
      },
    },
  ],

  6: [
    {
      id: "STUD-010",
      name: "Shraddha Kapoor",
      date: "15 Jan, 2026",
      files: "1 file",
      status: "Submitted",
      remark: "-",

      submissionFile: {
        name: "python-task.zip",
        size: "3.2 MB",
        url: basic,
        type: "zip",
      },
    },
  ],
};

// ---------------------------------
// 5. Statistics & Filter State
// ---------------------------------
export const homeworkStats = [
  { title: "Total Homework", count: 154 },
  { title: "Active Homework", count: 92 },
  { title: "Completed", count: 45 },
  { title: "Pending Review", count: 17 },
];

export const filters = {
  search: "",
  class: "All",
  section: "All",
  subject: "All",
  status: "All",
  dateRange: "Today",
};