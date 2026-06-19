import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { homeworkList, studentSubmissionsData } from "../../data/homeworkData";
import { MdArrowBackIos } from "react-icons/md";
import { FileText, Search } from "lucide-react";
import contact from "../../assets/images/contact.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiArrowUpDownFill } from "react-icons/ri";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../config/axiosInstance";
import {toast} from 'react-toastify'

// Dummy students data
const demoStudents = [
  {
    _id: "s1",
    name: "Rahul Sharma",
    className: "10",
    section: "A",
  },
  {
    _id: "s2",
    name: "Priya Verma",
    className: "10",
    section: "A",
  },
  {
    _id: "s3",
    name: "Aman Khan",
    className: "10",
    section: "A",
  },
  {
    _id: "s4",
    name: "Sneha Patel",
    className: "10",
    section: "A",
  },
  {
    _id: "69dc7d299059d563bb148f6d",
    name: "kasim",
    className: "10",
    section: "A",
  }
];

const HomeworkSubmission = () => {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // ✅ State to hold the specific student list for this assignment
  const [students, setStudents] = useState([]);
  const [filter,setFilter] = useState({
    search:"",
    studentId:"",
    status:""
  })

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

// ====================demi wala
  // const id = 1
  // useEffect(() => {
  //   // 1. Load Assignment Details
  //   const storedHw = localStorage.getItem("homeworkList");
  //   const currentList = storedHw ? JSON.parse(storedHw) : homeworkList;
  //   const existingHw = currentList.find((item) => item.id === Number(id));
  //   if (existingHw) setAssignment(existingHw);

  //   // 2. Load Submissions (Check localStorage first)
  //   const storedSubmissions = localStorage.getItem("studentSubmissionsData");

  //   // If localStorage is empty, use the static object from homeworkData.js
  //   const allData = storedSubmissions ? JSON.parse(storedSubmissions) : studentSubmissionsData;

  //   // Extract the specific array for this assignment ID
  //   const hwStudents = allData[Number(id)] || allData[id] || [];
  //   setStudents(Array.isArray(hwStudents) ? hwStudents : []);
  // }, [id]);

  // ============================ api wala
  const fetchHomework = async () => {
    try {
      const response = await api.get(`/homework/${id}`)
      setAssignment(response.data?.data)
    } catch (error) {
      toast.error(error.message)
    }
  }
  const fetchStudents = async () => {
  try {
    // const response = await api.get("/students");
    // const studentData = response.data?.data || demoStudents;
    const studentData = demoStudents;

    return studentData;
  } catch (error) {
    toast.error(error?.message || "students not found");
    return demoStudents;
  }
};

const fetchSubmissions = async (studentList) => {
  try {
    const response = await api.get(
      `/homeworksubmission/?search=${filter.search}&homeworkId=${id}&studentId=${filter.studentId}&status=${filter.status}`
    );

    const submissions = response.data?.data || [];
    // console.log(submissions)
    const mergedStudents = studentList.map((student) => {
      const matchedSubmission = submissions.find(
        (submission) =>
          submission.studentId === student._id ||
          submission.studentId?._id === student._id
      );

      console.log(matchedSubmission)
      if (matchedSubmission) {
        return {
          ...student,
          ...matchedSubmission,
        };
      }

      return {
        ...student,
        status: "Pending",
        files: 0,
        remark: "-",
        date: "-",
      };
    });

    setStudents(mergedStudents);
  } catch (error) {
    toast.error(error.message);
  }
};
  useEffect(() => {
  const loadData = async () => {
    fetchHomework();

    const studentList = await fetchStudents();

    await fetchSubmissions(studentList);
  };

  loadData();
}, [id]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Submitted":
        return "bg-[#E3F2FD] text-[#1565C0]";
      case "Checked":
        return "bg-[#D4EDDA] text-[#009638]";
      case "Pending":
        return "bg-[#FFEBEE] text-[#C92131]";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  // ✅ Search against the local 'students' state instead of the raw import
  const filteredStudents = students.filter(
    (student) =>
      (student.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.id || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // PAGINATION LOGIC
  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / rowsPerPage),
  );
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  if (!assignment)
    return (
      <div className="p-10 text-center font-semibold">Assignment Not Found</div>
    );

  return (
    <div className="min-h-screen font-['Segoe_UI']">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 hover:opacity-70 transition-all"
      >
        <MdArrowBackIos size={18} />
        <span className="font-semibold text-[24px]">Back</span>
      </button>

      {/* MAIN CONTAINER */}
      <div
        className="p-6 bg-[#FFF] mx-auto flex flex-col items-start rounded-2xl w-full"
        style={{
          gap: "36px",
          boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div>
          <h1 className="text-[18px] text-[#1C1C1C] font-semibold">
            View Submissions
          </h1>
          <p className="text-[16px] font-normal text-[#9C9C9C]">
            Review all submissions for this homework assignment
          </p>
        </div>

        {/* ASSIGNMENT CARD */}
        <div className="w-full border border-[#E6E6E6] rounded-xl p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-[18px] font-semibold text-[#1C1C1C]">
                {assignment.title}
              </h2>
              <p className="text-[16px] text-[#9C9C9C]">
                {assignment.description}
              </p>
              <div className="flex items-center gap-4 mt-1 text-[16px] text-[#696969]">
                <div className="flex items-center gap-1.5">
                  <img
                    src={contact}
                    className="w-3.2 h-2.2 opacity-70"
                    alt="class"
                  />
                  <span>{`${assignment.className} ${assignment.section} - ${assignment.subject}`}</span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-[#696969] opacity-20"></span>
                <span>{assignment.teacher}</span>
              </div>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-sm text-[12px] font-semibold ${assignment.status === "Active"
                  ? "bg-[#D4EDDA] text-[#009638]"
                  : "bg-blue-50 text-blue-600"
                }`}
            >
              {assignment.status}
            </span>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-4 border-t border-[#F1F1F1] pt-6 mt-4">
            <div>
              <p className="text-[14px] text-[#9C9C9C]">Total Students</p>
              <p className="text-[16px] font-semibold">40</p>
            </div>
            <div>
              <p className="text-[14px] text-[#9C9C9C]">Submitted</p>
              <p className="text-[16px] font-semibold text-[#009638]">
                {assignment.submittedCount?.split("/")[0] || 0}
              </p>
            </div>
            <div>
              <p className="text-[14px] text-[#9C9C9C]">Pending</p>
              <p className="text-[16px] font-semibold text-[#DC2626]">
                {assignment.pendingCount}
              </p>
            </div>
            <div>
              <p className="text-[14px] text-[#9C9C9C]">Checked</p>
              <p className="text-[16px] font-semibold text-[#007AFF]">
                {assignment.checkedCount}
              </p>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="flex w-full items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C9C9C]"
              size={16}
            />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 py-2 bg-[#EEEEEE] rounded-lg text-[14px] outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#EEEEEE] rounded-lg text-[14px] h-9">
            All <IoMdArrowDropdown size={16} />
          </button>
        </div>

        {/* TABLE */}
        <div className="w-full border border-[#E6E6E6] rounded-xl overflow-hidden bg-white">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[14px]">
              <tr>
                <th className="p-4 font-semibold border-b border-[#F1F1F1]">
                  <div className="flex items-center gap-3">
                    <RiArrowUpDownFill size={14} /> Student
                  </div>
                </th>
                <th className="p-4 font-semibold border-b border-[#F1F1F1]">
                  Submitted
                </th>
                <th className="p-4 font-semibold border-b border-[#F1F1F1]">
                  Attachments
                </th>
                <th className="p-4 font-semibold border-b border-[#F1F1F1]">
                  Status
                </th>
                <th className="p-4 font-semibold border-b border-[#F1F1F1]">
                  Remark
                </th>
                <th className="p-4 text-right pr-6 border-b border-[#F1F1F1]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F1F1]">
              {students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50 text-[14px]">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${student.name}&background=random`}
                        className="w-9 h-9 rounded-full"
                        alt=""
                      />
                      <div>
                        <p className="font-semibold text-[#12516E]">
                          {student.name}
                        </p>
                        <p className="text-[12px] text-[#9C9C9C]">
                          {student.studentId || student._id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {student.status === "Pending"
                      ? "Not submitted"
                      : student.date}
                  </td>
                  <td className="p-4 ">
                    <div className="flex items-center">
                      <FileText size={16} className="text-[#9C9C9C]" />{" "}
                    {student.status === "Pending"
                      ? "No files"
                      : `${student.files} file`}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-0.5 rounded text-[12px] font-semibold ${getStatusStyle(student.status)}`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4">{student.remark || "—"}</td>
                  <td className="p-4 text-right pr-6">
                    {student.status === "Submitted" ? (
                      <button
                        onClick={() =>
                          navigate(`/homework-report/${student._id}`, {
                            state: { student },
                          })
                        }
                        className="bg-[#0B3142] text-white px-4 py-1.5 rounded-md text-[14px] font-medium"
                      >
                        Check Now
                      </button>
                    ) : student.status === "Pending" ? (
                      <button className="border border-[#9C9C9C] text-[#696969] px-4 py-1.5 rounded-md text-[13px]">
                        Remind
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#F1F1F1]">
            <div className="flex items-center gap-3">
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="border rounded px-2 py-1 text-[13px]"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>
              <p className="text-[13px] text-[#696969]">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredStudents.length)} of{" "}
                {filteredStudents.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="text-[13px] px-2 py-1 flex items-center gap-1"
              >
                <ChevronLeft size={14} /> Prev
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="text-[13px] px-2 py-1 flex items-center gap-1"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkSubmission;
