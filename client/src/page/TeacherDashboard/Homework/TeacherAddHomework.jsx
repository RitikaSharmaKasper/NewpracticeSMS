import React, { useEffect, useState } from "react";
import {
  addHomeworkForm,
  homeworkList,
} from "../../../data/homeworkData";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { Calendar, Upload, Save } from "lucide-react";
import api from "../../../config/axiosInstance";

const TeacherAddHomework = () => {
  const navigate = useNavigate();

  const [classOptions, setClassOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);

  const [formData, setFormData] = useState(addHomeworkForm);

  const today = new Date().toLocaleDateString("en-GB");

  const [dragActive, setDragActive] = useState(false);

  // ================= FETCH CLASSES =================
  const fetchClasses = async () => {
    try {
      const response = await api.get("/classes");

      setClassOptions(response.data?.data || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= FETCH SUBJECTS =================
  const fetchSubjects = async () => {
    try {
      const response = await api.get("/subjects/AllSubjects");

      setSubjectOptions(response.data?.data || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
  }, []);

  // ================= FILTER SUBJECTS =================
  const filteredSubjects = subjectOptions.filter((subject) =>
    subject.applicableClasses?.some(
      (cls) =>
        cls.className === formData.class &&
        cls.section === formData.section
    )
  );

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    // Capitalize title first letter
    if (name === "title" && value.length > 0) {
      updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }

    // Handle class change
    if (name === "class") {
      const selectedClass = classOptions.find(
        (cls) => cls.className === value
      );

      if (selectedClass) {
        setSectionOptions([selectedClass.section]);

        setFormData((prev) => ({
          ...prev,
          class: value,
          section: selectedClass.section,
          subject: "",
        }));

        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  // ================= FILE HANDLER =================
  const handleFileChange = (file) => {
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      attachment: file,
    }));
  };


  // ================= FILE DROP =================
  const handleFileDrop = (e) => {
    e.preventDefault();

    setDragActive(false);

    const file = e.dataTransfer.files[0];

    handleFileChange(file);
  };


  // ================= SUBMIT =================
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const attachmentData = formData.attachment
  //     ? {
  //         name: formData.attachment.name,
  //         size: (
  //           formData.attachment.size /
  //           (1024 * 1024)
  //         ).toFixed(2),
  //         type: formData.attachment.type,
  //         url: URL.createObjectURL(formData.attachment),
  //       }
  //     : null;

  //   const newEntry = {
  //     ...formData,
  //     id: Date.now(),
  //     publishDate: new Date().toISOString().split("T")[0],
  //     attachment: attachmentData,
  //     status: "Active",
  //     submittedCount: "0/40",
  //     pendingCount: "40 students",
  //     checkedCount: "0/40",
  //     progress: 0,
  //   };

  //   const storedData =
  //     JSON.parse(localStorage.getItem("homeworkList")) ||
  //     homeworkList;

  //   const updatedData = [newEntry, ...storedData];

  //   localStorage.setItem(
  //     "homeworkList",
  //     JSON.stringify(updatedData)
  //   );

  //   toast.success("Homework Added Successfully!");

  //   navigate("/homework-list");
  // };
  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();

      // Append normal fields
      formPayload.append("className", formData.class);
      formPayload.append("section", formData.section);
      formPayload.append("subject", formData.subject);
      formPayload.append("title", formData.title);
      formPayload.append("description", formData.description);
      formPayload.append("dueDate", formData.dueDate);

      // Optional extra fields
      formPayload.append(
        "publishDate",
        new Date().toISOString().split("T")[0]
      );

      // Append file
      if (formData.attachment) {
        formPayload.append(
          "attachment",
          formData.attachment
        );
      }

      // API call
      const response = await api.post(
        "/homework/create",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(formPayload)

      toast.success(
        response.data?.message ||
        "Homework Added Successfully!"
      );

      navigate("/homework-list");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#FAFAFA]">
      <div
        className="p-6 bg-[#FFF] font-['Segoe_UI'] mx-auto flex flex-col items-start rounded-2xl w-full"
        style={{
          gap: "36px",
          boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* HEADER */}
        <div className="w-full">
          <h1 className="text-[18px] font-semibold text-[#1C1C1C]">
            Homework Management
          </h1>

          <p className="font-normal text-[14px] text-[#9C9C9C] ">
            Create, assign, and evaluate homework assignments.
          </p>
        </div>

        <div className="w-full flex flex-col gap-6">
          <h2 className="text-[16px] font-semibold text-[#1C1C1C]">
            Add Homework
          </h2>

          {/* CLASS / SECTION / SUBJECT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {/* CLASS */}
            <div className="flex flex-col gap-1.5">
              <label className="font-normal text-[14px] text-[#0A0A0A]">
                Class <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <select
                  name="class"
                  required
                  className="w-full h-12 rounded-lg border border-[#E6E6E6] bg-[#FFFFFF] px-4 outline-none appearance-none text-gray-500 text-[14px] cursor-pointer"
                  onChange={handleChange}
                  value={formData.class}
                >
                  <option value="">Select class</option>

                  {classOptions.map((cls) => (
                    <option
                      key={cls._id}
                      value={cls.className}
                    >
                      {cls.className}
                    </option>
                  ))}
                </select>

                <MdArrowDropDown
                  className="absolute right-3 top-1/2 -translate-y-1/4 text-gray-400 pointer-events-none"
                  size={18}
                />
              </div>
            </div>

            {/* SECTION */}
            <div className="flex flex-col gap-1.5">
              <label className="font-normal text-[14px] text-[#0A0A0A]">
                Section <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <select
                  name="section"
                  required
                  className="w-full h-12 rounded-lg border border-[#E6E6E6] bg-[#FFFFFF] px-4 outline-none appearance-none text-gray-500 text-[14px] cursor-pointer"
                  onChange={handleChange}
                  value={formData.section}
                >
                  <option value="">Select section</option>

                  {sectionOptions.map((sec, index) => (
                    <option key={index} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>

                <MdArrowDropDown
                  className="absolute right-3 top-1/2 -translate-y-1/4 text-gray-400 pointer-events-none"
                  size={18}
                />
              </div>
            </div>

            {/* SUBJECT */}
            <div className="flex flex-col gap-1.5">
              <label className="font-normal text-[14px] text-[#0A0A0A]">
                Subject <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <select
                  name="subject"
                  required
                  className="w-full h-12 rounded-lg border border-[#E6E6E6] bg-[#FFFFFF] px-4 outline-none appearance-none text-gray-500 text-[14px] cursor-pointer"
                  onChange={handleChange}
                  value={formData.subject}
                >
                  <option value="">Select subject</option>

                  {filteredSubjects.map((sub) => (
                    <option
                      key={sub._id}
                      value={sub.subjectName}
                    >
                      {sub.subjectName}
                    </option>
                  ))}
                </select>

                <MdArrowDropDown
                  className="absolute right-3 top-1/2 -translate-y-1/4 text-gray-400 pointer-events-none"
                  size={18}
                />
              </div>
            </div>
          </div>

          {/* DATES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {/* PUBLISH DATE */}
            <div className="flex flex-col gap-1.5">
              <label className="bg-white font-normal text-[14px] text-[#0A0A0A]">
                Publish Date{" "}
                <span className="TEXT-[14px] text-[#9C9C9C]">
                  (automatic fetch today date)
                </span>
              </label>

              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={today}
                  className="w-full h-12 rounded-lg border border-[#E6E6E6] px-4 text-gray-500 text-[14px] outline-none"
                />

                <Calendar
                  className="absolute right-3 top-1/2 -translate-y-1/4 text-[#9C9C9C]"
                  size={18}
                />
              </div>
            </div>

            {/* SUBMISSION DATE */}
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="font-normal text-[14px] text-[#0A0A0A]">
                Submission Date{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  type="date"
                  name="dueDate"
                  required
                  onChange={handleChange}
                  value={formData.dueDate}
                  className="w-full h-12 rounded-lg border border-[#E6E6E6] px-4 bg-white text-[#0A0A0A] text-[14px] outline-none 
                  [&::-webkit-calendar-picker-indicator]:opacity-0 
                  [&::-webkit-calendar-picker-indicator]:absolute 
                  [&::-webkit-calendar-picker-indicator]:w-full 
                  [&::-webkit-calendar-picker-indicator]:h-full 
                  [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />

                <Calendar
                  className="absolute right-4 top-1/2 -translate-y-1/4 text-[#9C9C9C] pointer-events-none"
                  size={18}
                />
              </div>
            </div>
          </div>

          {/* TITLE */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-normal text-[#1C1C1C]">
              Title <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="title"
              placeholder="Type Here"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full h-12 rounded-xl border border-[#E6E6E6] px-6 text-[14px] outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-normal text-[#1C1C1C]">
              Description <span className="text-red-500">*</span>
            </label>

            <textarea
              name="description"
              rows="4"
              placeholder="Type Here"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#E6E6E6] p-6 text-[14px] outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* FILE UPLOAD */}
          <div className="flex flex-col gap-4">
            <label className="text-[14px] font-normal text-[#1C1C1C]">
              Attach File
            </label>

            <label
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleFileDrop}
              className={`relative flex flex-col items-center justify-center text-center transition-all cursor-pointer w-full max-w-183 min-h-31 rounded-xl border border-dashed ${dragActive
                  ? "bg-[#F0F9FF] border-blue-500"
                  : "bg-white border-[#118AB2]"
                }`}
              style={{ borderDasharray: "4,4" }}
            >
              <input
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                // onChange={(e) =>
                //   setFormData({
                //     ...formData,
                //     attachment: e.target.files[0],
                //   })
                // }
                onChange={(e) =>
                  handleFileChange(e.target.files[0])
                }
              />

              <Upload className="w-9 h-9 text-[#118AB2] mb-2" />

              <p className="text-[#1C1C1C] text-[16px]">
                Drag & Drop or{" "}
                <span className="text-blue-500 underline">
                  Browse
                </span>
              </p>

              {formData.attachment ? (
                <p className="text-green-600 mt-2 text-[14px]">
                  Selected: {formData.attachment.name}
                </p>
              ) : (
                <p className="text-[#696969] text-[14px] font-normal">
                  Only JPG & PDF files are allowed.
                </p>
              )}
            </label>

            {/* SUBMIT */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-[#0b3344] text-white px-8 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-md"
              >
                <Save size={18} /> Save Homework
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TeacherAddHomework;