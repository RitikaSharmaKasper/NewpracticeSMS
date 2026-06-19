// ===============================
// HomeworkReport.jsx
// ===============================

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// import { homeworkList, studentSubmissionsData } from "../../data/homeworkData";

import { MdArrowBackIos } from "react-icons/md";

import { Download, Eye } from "lucide-react";
import api from "../../config/axiosInstance";
import { toast } from "react-toastify";

const HomeworkReport = () => {
  const { id } = useParams();
  // const id = 3

  const navigate = useNavigate();

  const location = useLocation();

  const [student, setStudent] = useState({})

  const [assignment, setAssignment] = useState(null);

  const [formData, setFormData] = useState({
  status: "",
  remark: ""
});

  const fetchStudentSubmission = async () => {
    try {
      const response = await api.get(`/homeworksubmission/${id}`);
      const data = response.data?.data;

      setStudent(data);
      setAssignment(data?.homeworkId);
    } catch (error) {
      toast.error(error.message || "student submission not found");
    }
  };

  // useEffect(() => {
  //   const storedData = localStorage.getItem("homeworkList");

  //   const currentList = storedData ? JSON.parse(storedData) : homeworkList;

  //   const existingHw = currentList.find((item) => item.id === Number(id));

  //   if (existingHw) {
  //     setAssignment(existingHw);
  //   }
  // }, [id]);

  useEffect(() => {
    fetchStudentSubmission()
  }, [id,])

  useEffect(() => {
  if (student) {
    setFormData({
      status: student.status || "",
      remark: student.remark || ""
    });
  }
}, [student]);
  // const handleSave = () => {
  //   // 1. Get the current master object
  //   const storedData = localStorage.getItem("studentSubmissionsData");
  //   const allSubmissions = storedData
  //     ? JSON.parse(storedData)
  //     : studentSubmissionsData;

  //   // 2. Get the array for this specific assignment
  //   const currentAssignmentStudents = allSubmissions[id] || [];

  //   // 3. Map through the array to update the specific student
  //   const updatedStudentsArray = currentAssignmentStudents.map((item) => {
  //     if (item.id === student.id) {
  //       return {
  //         ...item,
  //         status: status, // State from your dropdown
  //         remark: remark, // State from your textarea
  //       };
  //     }
  //     return item;
  //   });

  //   // 4. Update the master object with the new array
  //   const finalDataObject = {
  //     ...allSubmissions,
  //     [id]: updatedStudentsArray,
  //   };

  //   // 5. Save and Navigate back
  //   localStorage.setItem(
  //     "studentSubmissionsData",
  //     JSON.stringify(finalDataObject),
  //   );
  //   navigate(-1);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }


  const handleSave = async (e) => {
    e.preventDefault()
    try {
      // const formData = new FormData();
      // formData.append("status", status);
      // formData.append("remark", remark);
      // console.log(formData)

      // const response = await api.put(
      //   `/homeworksubmission/${id}`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

      const payload = {
        remark: formData.remark,
        status: formData.status
      }
      console.log(payload)
      const response = await api.put(
        `/homeworksubmission/${id}`,
        payload,
      );
      toast.success(response.data?.message || "Data updated successfully");
      navigate(`/homework-submission/${assignment._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Submission update failed");
    }
  };



  if (!assignment || !student) {
    return <div className="p-10 text-center font-semibold">Data Not Found</div>;
  }

  return (
    <div className="min-h-screen font-['Segoe_UI']">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#696969] mb-6 hover:opacity-70 transition-all"
      >
        <MdArrowBackIos size={14} />

        <span className="font-semibold text-[#696969] text-[24px]">Back</span>
      </button>

      {/* MAIN CONTAINER */}
      <div
        className="bg-white rounded-2xl p-6"
        style={{
          boxShadow: "0px 0px 8px rgba(0,0,0,0.15)",
        }}
      >
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-[20px] font-semibold text-[#1C1C1C]">
            Evaluate Homework
          </h1>

          <p className="text-[#9C9C9C] text-[14px]">
            Review and grade student submission
          </p>
        </div>

        {/* STUDENT CARD */}
        <div className="flex items-center gap-2.5 w-full h-26.5 p-4 mb-6 rounded-xl border border-[#E6E6E6] bg-[linear-gradient(to_right,#E0EAFC,#CFDEF3)]">
          <div>
            <h2 className="text-[18px] font-semibold text-[#1C1C1C]">
              {student.name}
            </h2>

            <p className="text-[16px] font-normal text-[#696969]">
              {student.id}
            </p>

            <p className="text-[16px] font-normal text-[#696969] mt-1">
              Submitted on : {student.date}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-12 gap-5">
          {/* LEFT SIDE */}
          <div className="col-span-8">
            {/* SUBMITTED FILE */}
            <div className="mb-5">
              <p className="text-[14px] font-normal mb-2">Submitted File</p>

              <div
                className="rounded-xl border border-dashed border-[#118AB2] p-[12px] pr-[24px] flex items-center justify-between"
              // style={{
              //   width: "734px",
              //   height: "124px",
              //   gap: "10px",
              //   borderWidth: "1px",
              //   borderStyle: "dashed",
              //   borderColor: "#118AB2",
              // }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-[#EEE8FF] flex items-center justify-center">
                    <span className="text-[22px]">📄</span>
                  </div>

                  <div>
                    <p className="text-[14px] font-medium text-[#1C1C1C]">
                      {student?.submissionFile?.name || "No File"}
                    </p>

                    <p className="text-[12px] text-[#9C9C9C]">
                      {student?.submissionFile?.size || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[#696969]">
                  <Eye
                    size={18}
                    className={`${student?.submissionFile?.url
                      ? "cursor-pointer"
                      : "opacity-40 cursor-not-allowed"
                      }`}
                    onClick={() => {
                      if (student?.submissionFile?.url) {
                        window.open(student.submissionFile.url, "_blank");
                      }
                    }}
                  />

                  <Download
                    size={18}
                    className={`${student?.submissionFile?.url
                      ? "cursor-pointer"
                      : "opacity-40 cursor-not-allowed"
                      }`}
                    onClick={() => {
                      if (student?.submissionFile?.url) {
                        const link = document.createElement("a");

                        link.href = student.submissionFile.url;

                        link.download = student.submissionFile.name;

                        link.click();
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* STATUS */}
            <div className="mb-5">
              <label className="text-[14px] text-[#1C1C1C] font-normal block mb-2">
                Homework Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-[#E6E6E6] rounded-lg px-3 py-2 outline-none text-[14px]"
              >
                <option value="Checked">Checked</option>

                <option value="Submitted">Submitted</option>

                <option value="Pending">Pending</option>
              </select>
            </div>

            {/* REMARK */}
            <div className="mb-5">
              <label className="text-[14px] font-normal text-[#1C1C1C] block mb-2">
                Remark
              </label>

              <textarea
                name="remark"
                value={formData.remark}
                onChange={handleChange}
                rows={5}
                placeholder="Brief remarks about homework"
                className="w-full border border-[#E6E6E6] rounded-lg p-3 outline-none resize-none text-[14px]"
              />
            </div>

            {/* BUTTON */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-[#0B3142] text-white px-6 py-2 rounded-lg text-[16px] font-semibold hover:bg-[#12516E] transition-all"
              >
                Done
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-4">
            <div className="border border-[#E6E6E6] rounded-xl overflow-hidden">
              <div className="p-4 border-b border-[#F1F1F1]">
                <h3 className="text-[15px] font-semibold">Homework Summary</h3>
              </div>

              <div className="divide-y divide-[#F1F1F1]">
                <div className="p-4 flex justify-between text-[13px]">
                  <span className="text-[#696969]">Homework Date</span>

                  <span>{assignment.publishDate || "12 January, 2025"}</span>
                </div>

                <div className="p-4 flex justify-between text-[13px]">
                  <span className="text-[#696969]">Submission Date</span>

                  <span>{assignment.dueDate}</span>
                </div>

                <div className="p-4 flex justify-between text-[13px]">
                  <span className="text-[#696969]">Subject</span>

                  <span>{assignment.subject}</span>
                </div>

                <div className="p-4 flex justify-between text-[13px]">
                  <span className="text-[#696969]">Checked By</span>

                  <span>{assignment.teacher}</span>
                </div>

                <div className="p-4">
                  <p className="text-[#696969] text-[13px] mb-2">Topic</p>

                  <p className="text-[13px] text-[#1C1C1C] leading-5">
                    {assignment.title}
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-[#696969] text-[13px] mb-2">Description</p>

                  <p className="text-[13px] text-[#1C1C1C] leading-5">
                    {assignment.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-5"></div>
    </div>
  );
};

export default HomeworkReport;
