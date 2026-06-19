import React, { useEffect, useState } from "react";
import PaginationAll from "../../components/PaginationAll";
import { Link } from "react-router-dom";
import api from "../../config/axiosInstance";

/* icons */
import { FileInput, UserPlus, Calendar, Eye, Edit, Trash2 } from "lucide-react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoMdPeople } from "react-icons/io";

/* ================= CUSTOM DROPDOWN ================= */
const CustomDropdown = ({
  options,
  value,
  onChange,
  selectedBg = "bg-blue-500",
  selectedText = "text-white",
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative w-full sm:w-40">
      {/* BUTTON */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="px-4 py-2 bg-[#EFF2F2] rounded-lg text-sm text-[#696969] cursor-pointer flex justify-between items-center"
      >
        <span className="truncate">{value}</span>
        <MdOutlineArrowDropDown size={22} />
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow z-50">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer ${
                value === opt
                  ? `${selectedBg} ${selectedText}`
                  : "hover:bg-gray-100"
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */

function TestPaper() {
  const [selectedClass, setSelectedClass] = React.useState("All Classes");
  const [selectedSubject, setSelectedSubject] = React.useState("All Subjects");
  const [selectedStatus, setSelectedStatus] = React.useState("Status");

  const classes = ["All Classes", "Class 1", "Class 2", "Class 3"];
  const subjects = ["All Subjects", "Math", "Science", "English"];
  const statuses = ["Active", "Inactive"];
  const [testList, setTestList] = useState([]);
  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await api.get("/tests");

      const data = response.data;

      console.log("TESTS:", data);

      if (data.success) {
        setTestList(data.data);
      }
    } catch (error) {
      console.log("Fetch Test Error:", error);
    }
  };

  // const testList = [
  //   {
  //     id: 1,
  //     name: "Mathematics Paper Test",
  //     class: "Class 10 A",
  //     subject: "Mathematics",
  //     totalQuestions: 20,
  //     totalMarks: 100,
  //     testDate: "Jan 10, 2023",
  //     duration: "2 hours",
  //     status: "Publish",
  //     createdBy: "Mr. John Doe",
  //     createdAt: "12 Jan, 2026",
  //   },
  //   {
  //     id: 2,
  //     name: "Science Paper Test",
  //     class: "Class 10 B",
  //     subject: "Science",
  //     totalQuestions: 25,
  //     totalMarks: 125,
  //     testDate: "Jan 15, 2023",
  //     duration: "2 hours",
  //     status: "Draft",
  //     createdBy: "Ms. Jane Smith",
  //     createdAt: "15 Jan, 2026",
  //   },
  //   // More test objects...
  // ];

  const STATUS_CONFIG = {
    Publish: {
      label: "Publish",
      className: "bg-emerald-100 text-emerald-700",
    },
    Draft: {
      label: "Draft",
      className: "bg-amber-100 text-amber-700",
    },
  };

  const handleDeleteTest = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this test?",
      );

      if (!confirmDelete) {
        return;
      }

      const response = await api.delete(`/tests/${id}`);

      const data = response.data;

      if (data.success) {
        setTestList((prev) => prev.filter((test) => test._id !== id));

        alert("Test deleted successfully");
      }
    } catch (error) {
      console.log("Delete Test Error:", error);

      alert("Failed to delete test");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md overflow-visible">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#1C1C1C] font-semibold text-lg">
            Test Paper
          </span>
          <p className="text-[#9C9C9C] text-sm">Schedule and Manage Test</p>
        </div>

        <div className="sm:justify-between flex flex-wrap gap-2">
          <Link to="/question-bank">
            <button className="border border-[#9C9C9C] bg-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
              <FileInput size={16} />
              Question Banks
            </button>
          </Link>

          <Link to="/create-test">
            <button className="bg-[#0B3142] px-4 py-2 rounded-lg flex items-center gap-2 text-white text-sm">
              <UserPlus size={16} />
              Create Tests
            </button>
          </Link>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center gap-4">
        {/* SEARCH */}
        <div className="w-full md:flex-1">
          <input
            type="text"
            placeholder="Search Test Paper"
            className="rounded-lg px-4 py-2 w-full bg-[#EEEEEE] outline-none text-[#696969]"
          />
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <CustomDropdown
            options={classes}
            value={selectedClass}
            onChange={setSelectedClass}
            selectedBg="bg-blue-500"
          />

          <CustomDropdown
            options={subjects}
            value={selectedSubject}
            onChange={setSelectedSubject}
            selectedBg="bg-green-500"
          />

          <CustomDropdown
            options={statuses}
            value={selectedStatus}
            onChange={setSelectedStatus}
            selectedBg="bg-purple-500"
          />
        </div>
      </div>

      {/* <============-------- TEST PAPER LIST --------============> */}
      <div className="mt-6 ">
        {testList.map((test) => (
          <div
            key={test._id}
            className="border border-[#E6E6E6] p-4 rounded-xl flex flex-col gap-4 mt-4"
          >
            {/* TOP */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex gap-3 items-center">
                <div className="bg-[#EFF6FF] rounded-lg p-2 text-[#155DFC]">
                  <Calendar size={22} />
                </div>

                <div>
                  <p className="font-semibold text-[#1C1C1C]">
                    {test.testName}
                  </p>

                  <div className="flex gap-2 text-sm text-[#9C9C9C]">
                    <span>• {test.className}</span>
                    <span>• {test.subject}</span>
                  </div>
                </div>
              </div>

              {/* STATUS */}
              <div
                className={`px-3 py-1 rounded-full w-fit ${
                  test.status === "published" ? "bg-[#DCFCE7]" : "bg-[#FEF3C7]"
                }`}
              >
                <span
                  className={`text-xs font-semibold capitalize ${
                    test.status === "published"
                      ? "text-[#166534]"
                      : "text-[#92400E]"
                  }`}
                >
                  {test.status}
                </span>
              </div>
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm border-b pb-2">
              <div>
                <span className="font-semibold">{test.questions?.length}</span>
                <p>Total Questions</p>
              </div>

              <div>
                <span className="font-semibold">
                  {test.questions?.reduce(
                    (total, q) => total + Number(q.marks || 0),
                    0,
                  )}
                </span>
                <p>Total Marks</p>
              </div>

              <div>
                <span className="font-semibold">
                  {new Date(test.testDate).toLocaleDateString()}
                </span>
                <p>Test Date</p>
              </div>

              <div>
                <span className="font-semibold">{test.duration} Minutes</span>
                <p>Duration</p>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center">
              <div className="flex gap-3 text-sm text-[#696969]">
                <span>👥 Admin</span>
                <span>• {new Date(test.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="flex gap-2">
                <button className="border px-3 py-1 rounded">View</button>
                <Link to={`/create-test/${test._id}`}>
                  <button className="border px-3 py-1 rounded">Edit</button>
                </Link>
                <button
                  className="border px-3 py-1 rounded text-red-500"
                  onClick={() => handleDeleteTest(test._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PaginationAll />
    </div>
  );
}

export default TestPaper;
