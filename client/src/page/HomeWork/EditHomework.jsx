// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   classOptions,
//   sectionOptions,
//   subjectOptions,
//   homeworkList,
// } from "../../data/homeworkData";

// import { MdArrowDropDown, MdArrowBackIos } from "react-icons/md";
// import { Calendar, Trash2, Check } from "lucide-react";

// const EditHomework = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const today = new Date().toISOString().split("T")[0];

//   const [formData, setFormData] = useState({
//     class: "",
//     section: "",
//     subject: "",
//     title: "",
//     description: "",
//     publishDate: today,
//     dueDate: "",
//     attachment: null,
//   });

//   // FETCH EXISTING DATA
//   useEffect(() => {
//     // Always check localStorage first
//     const storedHomework =
//       JSON.parse(localStorage.getItem("homeworkList")) || homeworkList;

//     // Find by ID (ensure types match)
//     const existingHw = storedHomework.find(
//       (item) => String(item.id) === String(id),
//     );

//     if (existingHw) {
//       setFormData({
//         ...existingHw,

//         publishDate: existingHw.publishDate || today,
//         dueDate: existingHw.dueDate || "",
//       });
//     } else {
//       console.error("Homework not found with ID:", id);
//     }
//   }, [id]);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Remove File Attachment
//   const handleRemoveFile = () => {
//     setFormData((prev) => ({
//       ...prev,
//       attachment: null,
//     }));
//   };

//   // UPDATE HOMEWORK
//   const handleUpdate = () => {
//     const storedHomework =
//       JSON.parse(localStorage.getItem("homeworkList")) || homeworkList;

//     const updatedHomework = storedHomework.map((item) =>
//       item.id === parseInt(id)
//         ? {
//             ...item,
//             ...formData,
//             publishDate: today, // Ensures update saves with current date
//           }
//         : item,
//     );

//     localStorage.setItem("homeworkList", JSON.stringify(updatedHomework));
//     alert("Homework Updated Successfully");
//     navigate(-1);
//   };

//   return (
//     <div className="min-h-screen  font-['Segoe_UI'] ">
//       {/* BACK BUTTON */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-[#696969] mb-6 hover:text-black transition-colors"
//       >
//         <MdArrowBackIos size={12} />
//         <span className="font-semibold text-[24px]">Back</span>
//       </button>

//       <div
//         className="p-6 bg-[#FFF] fonst-['Segoe_UI'] mx-auto flex flex-col items-start rounded-2xl w-full"
//         style={{
//           gap: "36px",
//           boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
//         }}
//       >
//         <h1 className="text-[18px] font-semibold text-[#1C1C1C]">
//           Edit Homework
//         </h1>

//         <div className="w-full flex flex-col gap-6">
//           {/* ROW 1: Class, Section, Subject */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
//             {/* Class Select */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-[14px]">
//                 Class <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <select
//                   name="class"
//                   value={formData.class}
//                   onChange={handleChange}
//                   className="w-full h-12 rounded-lg border border-[#E6E6E6] px-4 appearance-none text-[14px]"
//                 >
//                   {classOptions.map((cls) => (
//                     <option key={cls} value={cls}>
//                       {cls}
//                     </option>
//                   ))}
//                 </select>
//                 <MdArrowDropDown
//                   className="absolute right-3 top-1/2 -translate-y-1/4 text-gray-400 pointer-events-none"
//                   size={20}
//                 />
//               </div>
//             </div>

//             {/* Section Select */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-[14px]">
//                 Section <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <select
//                   name="section"
//                   value={formData.section}
//                   onChange={handleChange}
//                   className="w-full h-12 rounded-lg border border-[#E6E6E6] px-4 appearance-none text-[14px]"
//                 >
//                   {sectionOptions.map((sec) => (
//                     <option key={sec} value={sec}>
//                       {sec}
//                     </option>
//                   ))}
//                 </select>
//                 <MdArrowDropDown
//                   className="absolute right-3 top-1/2 -translate-y-1/4 text-gray-400 pointer-events-none"
//                   size={20}
//                 />
//               </div>
//             </div>

//             {/* Subject Select */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-[14px]">
//                 Subject <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <select
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   className="w-full h-12 rounded-lg border border-[#E6E6E6] px-4 appearance-none text-[14px]"
//                 >
//                   {subjectOptions.map((sub) => (
//                     <option key={sub} value={sub}>
//                       {sub}
//                     </option>
//                   ))}
//                 </select>
//                 <MdArrowDropDown
//                   className="absolute right-3 top-1/2 -translate-y-1/4 text-gray-400 pointer-events-none"
//                   size={20}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* ROW 2: Publish Date & Submission Date */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
//             {/* Publish Date: Design consistent with Figma */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-[14px] text-[#0A0A0A] font-normal">
//                 Publish Date{" "}
//                 <span className="text-gray-400 text-[12px]">(Today)</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   readOnly
//                   value={today}
//                   className="w-full h-12 rounded-lg border border-[#E6E6E6] px-4 text-gray-400  text-[14px] outline-none"
//                 />
//                 <Calendar
//                   className="absolute right-3 top-1/2 -translate-y-1/4 text-[#9C9C9C] pointer-events-none"
//                   size={18}
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col gap-1.5 flex-1">
//               <label className="text-[14px] font-normal text-[#0A0A0A]">
//                 Submission Date <span className="text-red-500">*</span>
//               </label>
//               <div className="relative h-12">
//                 <input
//                   type="date"
//                   name="dueDate"
//                   value={formData.dueDate || ""}
//                   onChange={handleChange}
//                   onClick={(e) => e.target.showPicker && e.target.showPicker()}
//                   className="w-full h-full rounded-lg border border-[#E6E6E6] px-4 text-[14px] outline-none cursor-pointer bg-white
//                  /* Browser icons ko hide karne ka standard tarika */
//                  [&::-webkit-calendar-picker-indicator]:opacity-0
//                  [&::-webkit-calendar-picker-indicator]:absolute
//                  [&::-webkit-calendar-picker-indicator]:right-3
//                  [&::-webkit-calendar-picker-indicator]:w-6
//                  [&::-webkit-calendar-picker-indicator]:h-6
//                  [&::-webkit-calendar-picker-indicator]:cursor-pointer"
//                 />

//                 <div className="absolute right-3 top-1/2 -translate-y-1/4 pointer-events-none">
//                   <Calendar className="text-[#9C9C9C]" size={18} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Title */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-[14px]">
//               Title <span className="text-red-500">*</span>
//             </label>
//             <input
//               name="title"
//               type="text"
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full h-12 rounded-lg border border-[#E6E6E6] px-4 text-[14px] outline-none"
//             />
//           </div>

//           {/* Description */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-[14px]">
//               Description <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               name="description"
//               rows="4"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-[#E6E6E6] p-4 text-[14px] outline-none"
//             />
//           </div>

//           {/* File Section */}

//           <div className="flex flex-col gap-2">
//             <label className="text-[14px] text-[#0A0A0A]">
//               Attach File <span className="text-red-500">*</span>
//             </label>

//             <div
//               className="

//                 w-full

//                 max-w-183

//                 h-31

//                 bg-white

//                 rounded-xl

//                 border

//                 border-dashed

//                 border-[#118AB2]

//                 opacity-100

//                 flex

//                 items-center

//                 gap-2.5

//                 pt-3

//                 pr-6

//                 pb-3

//                 pl-3

//               "
//               style={{ borderDasharray: "4 4" }}
//             >
//               <div className="flex items-center justify-between w-full">
//                 <div className="flex items-center gap-3">
//                   {/* FILE PREVIEW */}

//                   <div className="w-16 h-16 bg-[#2B2244] rounded-lg overflow-hidden flex items-center justify-center relative">
//                     {formData.attachment?.url &&
//                     formData.attachment?.name?.match(
//                       /\.(jpg|jpeg|png|webp)$/i,
//                     ) ? (
//                       <img
//                         src={formData.attachment.url}
//                         alt="preview"
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="text-white text-[30px]">
//                         {formData.attachment?.name?.includes(".pdf")
//                           ? "📕"
//                           : formData.attachment?.name?.includes(".zip")
//                             ? "🗂️"
//                             : formData.attachment?.name?.includes(".doc")
//                               ? "📘"
//                               : "📄"}
//                       </div>
//                     )}
//                   </div>

//                   {/* FILE DETAILS */}

//                   <div>
//                     <p className="text-[14px] font-medium text-[#1C1C1C]">
//                       {formData.attachment?.name || "No file attached"}
//                     </p>

//                     <p className="text-[12px] text-[#9C9C9C]">
//                       {formData.attachment?.size
//                         ? `${formData.attachment.size} MB`
//                         : "0 MB"}
//                     </p>
//                   </div>
//                 </div>

//                 {/* DELETE */}

//                 <button
//                   onClick={handleRemoveFile}
//                   className="p-2 hover:bg-red-50 rounded-full group transition-colors"
//                 >
//                   <Trash2
//                     size={20}
//                     className="text-red-400 group-hover:text-red-600"
//                   />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* UPDATE BUTTON */}
//           <div className="flex justify-end pt-3">
//             <button
//               onClick={handleUpdate}
//               className="bg-[#0B3142] text-white px-10 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#15465c] transition-all"
//             >
//               <Check size={20} />
//               Update Homework
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditHomework;




import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdArrowDropDown, MdArrowBackIos } from "react-icons/md";
import { Calendar, Trash2, Check } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../config/axiosInstance";

const EditHomework = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  // API STATES
  const [classOptions, setClassOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);

  const [formData, setFormData] = useState({
    class: "",
    section: "",
    subject: "",
    title: "",
    description: "",
    publishDate: "",
    dueDate: "",
    attachment: null,
    existingAttachment: null,
  });

  // ================= FETCH CLASSES =================
  const fetchClasses = async () => {
    try {
      const res = await api.get("/classes");
      setClassOptions(res.data?.data || []);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ================= FETCH SUBJECTS =================
  const fetchSubjects = async () => {
    try {
      const res = await api.get("/subjects/AllSubjects");
      setSubjectOptions(res.data?.data || []);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ================= FETCH HOMEWORK =================
  const fetchHomework = async () => {
    try {
      const res = await api.get(`/homework/${id}`);
      const hw = res.data?.data;
      if (!hw) return;

      const selectedClass = classOptions.find(
        (cls) => cls.className === hw.className
      );

      if (selectedClass) {
        setSectionOptions([selectedClass.section]);
      }

      setFormData({
        class: hw.className || "",
        section: hw.section || "",
        subject: hw.subject || "",
        title: hw.title || "",
        description: hw.description || "",
        publishDate: hw.publishDate || "",
        dueDate: hw.dueDate ? hw.dueDate.split("T")[0] : "",
        attachment: null,
        existingAttachment: hw.attachment || null,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (classOptions.length > 0) {
      fetchHomework();
    }
  }, [classOptions]);

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

    // Capitalize title
    if (name === "title" && value.length > 0) {
      updatedValue =
        value.charAt(0).toUpperCase() + value.slice(1);
    }

    // CLASS CHANGE LOGIC
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

  // ================= FILE CHANGE =================
  const handleFileChange = (file) => {
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      attachment: file,
      existingAttachment: null,
    }));
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({
      ...prev,
      attachment: null,
      existingAttachment: null,
    }));
  };

  // ================= UPDATE HOMEWORK =================
  const handleUpdate = async () => {
    try {
      const formPayload = new FormData();

      formPayload.append("className", formData.class);
      formPayload.append("section", formData.section);
      formPayload.append("subject", formData.subject);
      formPayload.append("title", formData.title);
      formPayload.append("description", formData.description);
      formPayload.append("dueDate", formData.dueDate);

      if (formData.attachment) {
        formPayload.append("attachment", formData.attachment);
      }

      await api.put(`/homework/update/${id}`, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Homework Updated Successfully!");
      navigate(-1);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen font-['Segoe_UI'] ">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#696969] mb-6 hover:text-black transition-colors"
      >
        <MdArrowBackIos size={12} />
        <span className="font-semibold text-[24px]">Back</span>
      </button>

      <div
        className="p-6 bg-[#FFF] fonst-['Segoe_UI'] mx-auto flex flex-col items-start rounded-2xl w-full"
        style={{
          gap: "36px",
          boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
        }}
      >
        <h1 className="text-[18px] font-semibold text-[#1C1C1C]">
          Edit Homework
        </h1>

        <div className="w-full flex flex-col gap-6">
          {/* ROW 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {/* CLASS */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px]">
                Class <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full h-12 rounded-lg border border-[#E6E6E6] px-4 appearance-none text-[14px]"
                >
                  <option value="">Select class</option>
                  {classOptions.map((cls) => (
                    <option key={cls._id} value={cls.className}>
                      {cls.className}
                    </option>
                  ))}
                </select>

                <MdArrowDropDown
                  className="absolute right-3 top-1/2 -translate-y-1/4 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            {/* SECTION */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px]">
                Section <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className="w-full h-12 rounded-lg border border-[#E6E6E6] px-4 appearance-none text-[14px]"
                >
                  <option value="">Select section</option>
                  {sectionOptions.map((sec, i) => (
                    <option key={i} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>

                <MdArrowDropDown
                  className="absolute right-3 top-1/2 -translate-y-1/4 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            {/* SUBJECT */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px]">
                Subject <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full h-12 rounded-lg border border-[#E6E6E6] px-4 appearance-none text-[14px]"
                >
                  <option value="">Select subject</option>
                  {filteredSubjects.map((sub) => (
                    <option key={sub._id} value={sub.subjectName}>
                      {sub.subjectName}
                    </option>
                  ))}
                </select>

                <MdArrowDropDown
                  className="absolute right-3 top-1/2 -translate-y-1/4 text-gray-400"
                  size={20}
                />
              </div>
            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {/* Publish Date: Design consistent with Figma */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] text-[#0A0A0A] font-normal">
                Publish Date{" "}
                <span className="text-gray-400 text-[12px]">(Today)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={
                    formData.publishDate
                      ? new Date(formData.publishDate)
                        .toISOString()
                        .split("T")[0]
                      : ""
                  }
                  className="w-full h-12 rounded-lg border border-[#E6E6E6] px-4 text-gray-400 text-[14px] outline-none"
                />
                <Calendar
                  className="absolute right-3 top-1/2 -translate-y-1/4 text-[#9C9C9C] pointer-events-none"
                  size={18}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[14px] font-normal text-[#0A0A0A]">
                Submission Date <span className="text-red-500">*</span>
              </label>
              <div className="relative h-12">
                <input
                  type="date"
                  name="dueDate"
                  value={
                    formData.dueDate
                      ? new Date(formData.dueDate)
                        .toISOString()
                        .split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                  onClick={(e) => e.target.showPicker && e.target.showPicker()}
                  className="w-full h-full rounded-lg border border-[#E6E6E6] px-4 text-[14px] outline-none cursor-pointer bg-white
                  /* Browser icons ko hide karne ka standard tarika */
                  [&::-webkit-calendar-picker-indicator]:opacity-0
                  [&::-webkit-calendar-picker-indicator]:absolute
                  [&::-webkit-calendar-picker-indicator]:right-3
                  [&::-webkit-calendar-picker-indicator]:w-6
                  [&::-webkit-calendar-picker-indicator]:h-6
                  [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/4 pointer-events-none">
                  <Calendar className="text-[#9C9C9C]" size={18} />
                </div>
              </div>
            </div>
          </div>



          {/* TITLE */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px]">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full h-12 rounded-lg border border-[#E6E6E6] px-4 text-[14px]"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px]">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#E6E6E6] p-4 text-[14px]"
            />
          </div>

          {/* FILE UI (UNCHANGED) */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-[#0A0A0A]">
              Attach File <span className="text-red-500">*</span>
            </label>

            <div
              className=" w-full max-w-183 h-31 bg-white rounded-xl border border-dashed border-[#118AB2] opacity-100 flex
                items-center gap-2.5 pt-3 pr-6 pb-3 pl-3
              "
              // style={{ borderDasharray: "4 4" }}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-[#2B2244] rounded-lg overflow-hidden flex items-center justify-center">
                    {formData.attachment?.name ? "📄" : "📁"}
                  </div>

                  <div>
                    <p className="text-[14px] font-medium">
                      {formData.attachment?.name ||
                        formData.existingAttachment?.name ||
                        "No file attached"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleRemoveFile}
                  className="p-2 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={20} className="text-red-400" />
                </button>
              </div>
            </div>
          </div>

          {/* UPDATE BUTTON */}
          <div className="flex justify-end pt-3">
            <button
              onClick={handleUpdate}
              className="bg-[#0B3142] text-white px-10 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#15465c]"
            >
              <Check size={20} />
              Update Homework
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHomework;