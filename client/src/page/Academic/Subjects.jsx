import React, { useEffect, useRef, useState } from "react";
import "../../CSS/Style.css";
{
  /* <----------------------------------------------- GIF ----------------------------------------------------> */
}
import studetgif from "../../assets/images/studentGif.gif";
import classroomlesson from "../../assets/images/classroom-lesson.gif";
import books from "../../assets/images/books.gif";
import calender from "../../assets/images/calender.gif";

{
  /* <---------------------------------------------- icon -----------------------------------------------------> */
}

import { FiEdit, FiPlus, FiUpload } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { MdVerified } from "react-icons/md";

import { HiSearch, HiOutlineExclamationCircle } from 'react-icons/hi';
/* <----------------------------------------------- img -------------------------------------------------------> */
import everdeen from "../../assets/images/katnis.jpg";
import meave from "../../assets/images/meave.jpg";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { TbFileImport } from "react-icons/tb";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../config/axiosInstance";
import { toast } from "react-toastify";
import viewMessage from "../../assets/images/viewmessage.png";
import nodata_foundIcon from "../../assets/images/absence.png";
import deleteIcon from "../../assets/images/delete-2.png";
const cardData = [
  {
    des: "Total Students",
    number: "200",
    text: "active members",
    left: "195",
    gif: studetgif,
  },

  {
    des: "Total Classes",
    number: "50",
    text: "Student enrolled",
    left: "145",
    gif: classroomlesson,
  },
  {
    des: "Total Subjects",
    number: "30",
    text: "Active curriculum",
    // left : "+2.1%",
    gif: books,
  },
  {
    des: "Upcoming Exams",
    number: "",
    text: "No exams scheduled",
    gif: calender,
  },
];

/* <--------------------------------------------------- student Dummy Data --------------------------------------------> */

const subjectData = [
  {
    subject: "Physics",
    subjectcode: "PHY101",
    studentcout: "256",
    teacher: "4",
    teachername: "Raju Kumar",
    category: "Elective",
  },
  {
    subject: "Physics",
    subjectcode: "PHY101",
    studentcout: "256",
    teacher: "4",
    teachername: "Raju Kumar",
    category: "Core",
  },
  {
    subject: "Physics",
    subjectcode: "PHY101",
    studentcout: "256",
    teacher: "4",
    teachername: "Raju Kumar",
    category: "None",
  },
  {
    subject: "Physics",
    subjectcode: "PHY101",
    studentcout: "256",
    teacher: "4",
    teachername: "Raju Kumar",
    category: "Elective",
  },
  {
    subject: "Physics",
    subjectcode: "PHY101",
    studentcout: "256",
    teacher: "4",
    teachername: "Raju Kumar",
    category: "Elective",
  },
  {
    subject: "Physics",
    subjectcode: "PHY101",
    studentcout: "256",
    teacher: "4",
    teachername: "Raju Kumar",
    category: "Elective",
  },
  {
    subject: "Physics",
    subjectcode: "PHY101",
    studentcout: "256",
    teacher: "4",
    teachername: "Raju Kumar",
    category: "Elective",
  },
  {
    subject: "Physics",
    subjectcode: "PHY101",
    studentcout: "256",
    teacher: "4",
    teachername: "Raju Kumar",
    category: "Elective",
  },
  {
    subject: "Physics",
    subjectcode: "PHY101",
    studentcout: "256",
    teacher: "4",
    teachername: "Raju Kumar",
    category: "Elective",
  },
  {
    subject: "Physics",
    subjectcode: "PHY101",
    studentcout: "256",
    teacher: "4",
    teachername: "Raju Kumar",
    category: "Elective",
  },
];

const teacherData = [
  {
    name: "Raju Kumar",
    role: "Class Teacher",
    isverified: true,
    img: meave,
  },
  {
    name: "Priya Kumari",
    role: "Math Teacher",
    isverified: false,
    img: everdeen,
  },
  {
    name: "Amit Patel",
    role: "English Teacher",
    isverified: false,
    img: meave,
  },
  {
    name: "Deepa Sharma",
    role: "Social Studies Teacher",
    isverified: false,
    img: meave,
  },
  {
    name: "Raju Kumar",
    role: "Class Teacher",
    isverified: false,
    img: meave,
  },
  {
    name: "Priya Kumari",
    role: "Math Teacher",
    isverified: false,
    img: meave,
  },
];

const Subjects = () => {
  const [openAddModel, setopenAddModel] = useState(false);
  const [openEditModel, setopenEditModel] = useState(false);
  const [openRoomDetails, setopenRoomDetails] = useState(false);
  const [openAdd, setopenAdd] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();
  const addRef = useRef(null);
  const queryClient = useQueryClient();
  const [showTeacherDropdown, setShowTeacherDropdown] = useState(false);
const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
    const [search, setSearch] = useState("");

const [showEditCategoryDropdown, setShowEditCategoryDropdown] = useState(false);
const [showEditTeacherDropdown, setShowEditTeacherDropdown] = useState(false);
  const [formData, setFormData] = useState({
    subjectName: "",
    subjectCode: "",
    category: "",
    assignedTeachers: "",
    applicableClasses: [],
  });
 const handleclickBulkImport = () => {
    navigate("/bulk-import-room");
  };

  const initialFormData = {
    subjectName: "",
    subjectCode: "",
    category: "",
    assignedTeachers: "",
    applicableClasses: [],
  };

  const handleClassSelect = (classId) => {
    setFormData((prev) => {
      const alreadySelected = prev.applicableClasses.includes(classId);

      return {
        ...prev,
        applicableClasses: alreadySelected
          ? prev.applicableClasses.filter((id) => id !== classId)
          : [...prev.applicableClasses, classId],
      };
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { data: classes = [], isLoading: classesLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await api.get("/classes");
      return res.data.data;
    },
    onError: () => {
      toast.error("Failed to fetch classes");
    },
  });

  const handleSubmit = () => {
    if (!formData.subjectName.trim()) {
      return toast.error("Subject name is required");
    }

    if (!formData.subjectCode.trim()) {
      return toast.error("Subject code is required");
    }

    if (!formData.category) {
      return toast.error("Please select category");
    }

    if (formData.applicableClasses.length === 0) {
      return toast.error("Please select class");
    }

    createSubjectMutation.mutate(formData);
  };

  const handleReservedSubject = () => {
    setFormData(initialFormData);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (addRef.current && !addRef.current.contains(e.target)) {
        setopenAdd(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // post subject
  const createSubjectMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/subjects/create-subject", payload);

      return res.data.data;
    },

    onSuccess: () => {
      toast.success("Subject created successfully");

      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });

      setopenAddModel(false);

      setFormData({
        subjectName: "",
        subjectCode: "",
        category: "",
        assignedTeachers: "",
        applicableClasses: [],
      });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create subject");
    },
  });

  // Fetch subjects
  const {
    data: subjectRes,
    isLoading: subjectsLoading,
    isError,
  } = useQuery({
    queryKey: ["subjects", page, limit, categoryFilter, debouncedSearch],

    queryFn: async () => {
      const res = await api.get("/subjects/AllSubjects", {
        params: {
          page,
          limit,
          category: categoryFilter,
          search: debouncedSearch,
        },
      });

      console.log(res);

      return res.data;
    },
  });

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const subject = subjectRes?.data || [];
  const pagination = subjectRes?.pagination || {};

  // subject details by id
  const { data: singleSubject, isLoading: singleSubjectLoading } = useQuery({
    queryKey: ["SingleSubject", selectedSubjectId],

    queryFn: async () => {
      const res = await api.get(`/subjects/${selectedSubjectId}`);

      return res.data.data;
    },

    enabled: !!selectedSubjectId,
  });

  // edit form data
  const [editFormData, setEditFormData] = useState({
    subjectName: "",
    subjectCode: "",
    category: "",
    assignedTeachers: "",
    applicableClasses: [],
  });

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClassSelect = (classId) => {
    setEditFormData((prev) => {
      const alreadySelected = prev.applicableClasses.includes(classId);

      return {
        ...prev,
        applicableClasses: alreadySelected
          ? prev.applicableClasses.filter((id) => id !== classId)
          : [...prev.applicableClasses, classId],
      };
    });
  };

  // update subject
  const updateSubject = useMutation({
    mutationFn: async (payload) => {
      const res = await api.put(
        `/subjects/update-subject/${selectedSubjectId}`,
        payload,
      );
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Subject updated successfully");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      setopenEditModel(false);
    },
  });

  // delete subject
  const deleteSubjectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/subjects/delete-subject/${id}`);
      return res.data.data;
    },

    onSuccess: () => {
      toast.success("Subject deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete subject");
    },
  });

  // staff

  const { data } = useQuery({
    queryKey: ["all-staff"],

    queryFn: async () => {
      const res = await api.get("/staff/all-staff", {});

      return res.data;
    },
  });

  const staffList = data?.data || [];

  const teachers = staffList.filter(
    (staff) => staff?.employmentInfo?.role?.toLowerCase() === "teacher",
  );

  if (classesLoading || subjectsLoading) {
    return <p>Loading subjects...</p>;
  }

  return (
    <div>
      {/* <--------------------------------------- Card -----------------------------------> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-3">
        {cardData.map((item, index) => (
          <div key={index} className="box-shadow bg-white rounded-xl p-4">
            <div className="flex items-center justify-between ">
              {/* LEFT CONTENT */}
              <div className="flex flex-col justify-center">
                <p className="font-normal text-[16px] text-[#1C1C1C]">
                  {item.des}
                </p>

                <span className="font-bold text-[28px] text-[#1c1c1c] mt-5 leading-none">
                  {item.number ? `${item.number}` : `-`}
                </span>

                <p className="mt-3 flex items-center gap-2 text-[14px] font-semibold ">
                  <span className="text-[#009638]">{item.left}</span>{" "}
                  <span className="text-[#696969]">{item.text}</span>
                </p>
              </div>

              {/* RIGHT ICON / GIF */}
              <div className="flex items-center justify-center w-16 h-16">
                <img
                  src={item.gif}
                  alt="student"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="box-shadow mt-6 bg-white rounded-2xl">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 p-4 items-center">
          {/* LEFT CONTENT */}
          <div>
            <p className="flex flex-col">
              <span className="text-[16px] md:text-[18px] text-[#1c1c1c] font-semibold">
                Subject Mangaement
              </span>
              <span className="text-sm text-[#696969]">
                Manage subjects, curriculum, and teacher assignments
              </span>
            </p>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="inline-flex items-center gap-2 px-6 py-3 border border-[#9C9C9C] font-semibold rounded-lg text-[#9C9C9C] "
                     onClick={handleclickBulkImport}
              
              >
                <TbFileImport className="text-[#9C9C9C]" />
                Bulk Import
              </button>

              <button
                onClick={() => setopenAddModel(true)}
                className="inline-flex items-center gap-2 px-6 py-2 cursor-pointer bg-[#0B3142] text-white border border-[#0B3142] rounded-lg"
              >
                <AiOutlinePlus className="text-white" />
                Add Subjects
              </button>
            </div>
          </div>
        </div>

        {/* <-------------------------------------- search & filter ------------------------------> */}
    



     <div className="flex flex-col md:flex-row gap-4 mb-6 px-4">   
              
                <div className="relative flex-1">
                        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#696969] text-[18px]" />
                        <input
                          type="text"
                          placeholder="Search Subjects..."
                           value={search}
                              onChange={(e) => {
                  setSearch(e.target.value);
                  // setPage(1);
                }}
                          className="w-full pl-10 pr-4 py-2 bg-[#EEEEEE] border border-[#E8E8E8] rounded-[9px] text-[14px] focus:outline-none"
                        />
                      </div>
          
          
          
          {/* FILTER BUTTONS */}
<div className="inline-flex items-center text-sm gap-4">
  {/* CATEGORY DROPDOWN */}
  <div className="relative inline-block">
    <button
      onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
      className="bg-[#EFF2F2] rounded-[9px] px-6 py-2.5 text-[12px] text-[#1C1C1C] cursor-pointer flex items-center justify-between gap-2"
    >
      <span>{categoryFilter || "All Category"}</span>
      <svg
        className={`w-4 h-4 transition-transform duration-200 ${showCategoryDropdown ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    {showCategoryDropdown && (
      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E8E8E8] rounded-[9px] shadow-lg overflow-hidden min-w-[140px]">
        <button
          onClick={() => {
            setCategoryFilter("");
            setShowCategoryDropdown(false);
            setPage(1);
          }}
          className="w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6] cursor-pointer whitespace-nowrap"
        >
          All Category
        </button>
        <button
          onClick={() => {
            setCategoryFilter("Core");
            setShowCategoryDropdown(false);
            setPage(1);
          }}
          className="w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6] cursor-pointer whitespace-nowrap"
        >
          Core
        </button>
        <button
          onClick={() => {
            setCategoryFilter("Elective");
            setShowCategoryDropdown(false);
            setPage(1);
          }}
          className="w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6] cursor-pointer whitespace-nowrap"
        >
          Elective
        </button>
        <button
          onClick={() => {
            setCategoryFilter("None");
            setShowCategoryDropdown(false);
            setPage(1);
          }}
          className="w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6] cursor-pointer whitespace-nowrap"
        >
          None
        </button>
      </div>
    )}
  </div>
</div>
            </div>







        {/* <------------------------------------------ Table ---------------------------------------> */}
        <div className="p-4">
          <div className="w-full overflow-x-auto border border-[#E6E6E6] rounded-xl">
            <table className="w-full text-sm">
              {/* TABLE HEADER */}
              <thead className="bg-[#F5F7F7] text-[#1C1C1C]">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Subject</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Assigned Class
                  </th>
                  {/* <th className="px-6 py-4 text-left font-semibold">
                    Students
                  </th> */}
                  <th className="px-6 py-4 text-left font-semibold">
                    Teachers
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Category
                  </th>
                  <th className="px-6 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {subject.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-[#E6E6E6] hover:bg-[#FAFAFA] transition"
                  >
                    {/* SUBJECT COLUMN */}
                    <td
                      // onClick={() => setopenRoomDetails(true)}
                      className="px-6 py-4"
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#12516E]">
                          {item.subjectName}
                        </span>
                        <span className="text-xs text-[#9C9C9C]">
                          {item.subjectCode}
                        </span>
                      </div>
                    </td>
                    {/* Assigned Class */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#12516E]">
                          {item?.applicableClasses?.length || 0}
                        </span>
                      </div>
                    </td>

                    {/* TEACHERS */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#12516E]">
                          {item.assignedTeachers?.[0]?.personalInfo
                            ?.staffName || "Not Assigned"}
                        </span>

                        <span className="text-xs text-[#9C9C9C] truncate max-w-[45]">
                          {item.assignedTeachers?.[0]?.staffId || "-"}
                        </span>
                      </div>
                    </td>

                    {/* CATEGORY BADGE */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-1 rounded-md text-xs font-semibold
                ${
                  item.category === "Elective"
                    ? "bg-[#E3F2FD] text-[#1565C0]"
                    : item.category === "Core"
                      ? "bg-[#D4EDDA] text-[#009638]"
                      : "bg-[#EEEEEE] text-[#696969]"
                }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full
                  ${
                    item.category === "Elective"
                      ? "bg-[#1565C0]"
                      : item.category === "Core"
                        ? "bg-[#009638]"
                        : "bg-[#696969]"
                  }`}
                        />
                        {item.category}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end items-center gap-4">
                        <FiEye
                          onClick={() => {
                            setSelectedSubjectId(item._id);
                            setopenRoomDetails(true);
                          }}
                          className="w-4 h-4 text-[#9C9C9C] cursor-pointer "
                        />
                     

          <button 
                    onClick={() => {
                            setSelectedSubjectId(item._id);

                            setEditFormData({
                              subjectName: item.subjectName || "",
                              subjectCode: item.subjectCode || "",
                              category: item.category || "",
                              assignedTeachers:
                                item.assignedTeachers?.[0] || "",
                              applicableClasses:
                                item.applicableClasses?.map(
                                  (cls) => cls._id || cls,
                                ) || [],
                            });

                            setopenEditModel(true);
                          }}
                      className="transition cursor-pointer text-[#9C9C9C] hover:text-[#1C1C1C]"
                      title="View Notice"
                    >
                      
                       <img
                          src={viewMessage}
                          alt="viewmessage"
                         
                          className="h-6 w-6 cursor-pointer [image-rendering:-webkit-optimize-contrast]"
                        />
                      {/* <FiExternalLink size={20} strokeWidth={2.5} /> */}
                    </button>


     <button 
                    onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this subject?",
                              )
                            ) {
                              deleteSubjectMutation.mutate(item._id);
                            }
                          }}
                      className="transition cursor-pointer"
                      title="Delete Notice"
                    >
                 
                       <img
                          src={deleteIcon}
                          alt="delete"
                         
                          className="h-5.5 w-5.5 cursor-pointer [image-rendering:-webkit-optimize-contrast]"
                        />
                    </button>


                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* <------------------------------------------- pagination ---------------------------------> */}
        <Pagination
          currentPage={page}
          total={pagination?.total || 0}
          itemsPerPage={limit}
          onPageChange={setPage}
          onItemsPerPageChange={(value) => {
            setLimit(value);
            setPage(1);
          }}
        />
      </div>
      {/* add module */}
      {openAddModel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setopenAddModel(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-206 max-h-1900 bg-white rounded-2xl shadow-xl flex flex-col"
          >
            {/* HEADER */}
            <div className="flex justify-between items-start p-6">
              <div>
                <h2 className="text-[20px] font-semibold text-[#1C1C1C]">
                  Add New Subject
                </h2>
                <p className="text-sm text-[#9C9C9C] mt-1">
                  Create a new subject with curriculum details
                </p>
              </div>

              <button
                onClick={() => setopenAddModel(false)}
                className="text-xl text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="px-6 pb-6 space-y-2.5 overflow-y-auto">
              {/* SUBJECT NAME */}
              <div>
                <label className="text-sm font-semibold">Subject Name</label>
                <input
                  type="text"
                  name="subjectName"
                  value={formData.subjectName}
                  onChange={handleChange}
                  placeholder="eg., Advance math"
                  className="w-full mt-2 px-4 py-3 rounded-xl border border-[#E6E6E6] outline-none focus:ring-2 focus:ring-[#0B3142]"
                />
              </div>

              {/* SUBJECT CODE + CATEGORY */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold">Subject Code</label>
                  <input
                    type="text"
                    name="subjectCode"
                    value={formData.subjectCode}
                    onChange={handleChange}
                    placeholder="eg., MATH501"
                    className="w-full mt-2 px-4 py-3 rounded-xl border border-[#E6E6E6] outline-none focus:ring-2 focus:ring-[#0B3142]"
                  />
                </div>

                {/* <div>
                  <label className="text-sm font-semibold">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-3 rounded-xl border border-[#E6E6E6] text-[#9C9C9C] outline-none focus:ring-2 focus:ring-[#0B3142]"
                  >
                    <option value="">Select category</option>
                    <option value="Core">Core</option>
                    <option value="Elective">Elective</option>
                    <option value="None">None</option>
                  </select>
                </div> */}
                {/* CATEGORY - Same design as Assign Teacher and Applicable Classes */}
<div className="relative">
  <label className="text-sm font-semibold">Category</label>

  {/* SELECT BOX */}
  <div
    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
    className="w-full mt-2 px-4 py-3 rounded-xl border border-[#E6E6E6] cursor-pointer bg-white flex items-center justify-between"
  >
    <span className={`text-sm ${formData.category ? "text-[#1C1C1C]" : "text-[#696969]"}`}>
      {formData.category ? formData.category : "Select category"}
    </span>
    <span  className="text-[0.5rem]">▼</span>
  </div>

  {/* DROPDOWN */}
  {showCategoryDropdown && (
    <div className="absolute z-50 mt-2 w-full bg-white border border-[#E6E6E6] rounded-xl shadow-lg overflow-y-auto">
      {["Core", "Elective", "None"].map((category) => (
        <label
          key={category}
          className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F7F7] cursor-pointer"
        >
          <input
            type="radio"
            name="category"
            checked={formData.category === category}
            onChange={() => {
              setFormData({ ...formData, category: category });
              setShowCategoryDropdown(false);
            }}
            className="w-4 h-4"
          />
          <span>{category}</span>
        </label>
      ))}
    </div>
  )}
</div>
              </div>

              {/* ASSIGN TEACHER */}
              {/* <div>
                <label className="text-sm font-semibold">Assign Teacher</label>
                <select
                  name="assignedTeachers"
                  value={formData.assignedTeachers}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-3 rounded-xl border border-[#E6E6E6] text-[#9C9C9C] outline-none focus:ring-2 focus:ring-[#0B3142]"
                >
                  <option value="">Select teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.personalInfo?.staffName} ({teacher.staffId})
                    </option>
                  ))}
                </select>
              </div> */}
{/* ASSIGN TEACHER */}
            {/* ASSIGN TEACHER - Same design as Applicable Classes */}
              <div className="relative">
                <label className="text-sm font-semibold">Assign Teacher</label>

                {/* SELECT BOX */}
                <div
                  onClick={() => setShowTeacherDropdown(!showTeacherDropdown)}
                  className="w-full mt-2 px-4 py-3 rounded-xl border border-[#E6E6E6] cursor-pointer bg-white flex items-center justify-between"
                >
                  <span className="text-sm text-[#696969]">
                    {formData.assignedTeachers
                      ? teachers.find((t) => t._id === formData.assignedTeachers)
                          ?.personalInfo?.staffName || "Selected"
                      : "Select teacher"}
                  </span>
                  <span  className="text-[0.5rem]">▼</span>
                </div>

                {/* DROPDOWN */}
                {showTeacherDropdown && (
                  <div className="absolute z-50 mt-2 w-full bg-white border border-[#E6E6E6] rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {teachers.map((teacher) => (
                      <label
                        key={teacher._id}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F7F7] cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="assignedTeachers"
                          checked={formData.assignedTeachers === teacher._id}
                          onChange={() => {
                            setFormData({ ...formData, assignedTeachers: teacher._id });
                            setShowTeacherDropdown(false);
                          }}
                          className="w-4 h-4"
                        />
                        <span>
                          {teacher.personalInfo?.staffName} ({teacher.staffId})
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {/* APPLICABLE CLASS */}
              <div className="relative">
                <label className="text-sm font-semibold">
                  Applicable Classes
                </label>

                {/* SELECT BOX */}
                <div
                  onClick={() => setShowClassDropdown(!showClassDropdown)}
                  className="w-full mt-2 px-4 py-3 rounded-xl border border-[#E6E6E6] cursor-pointer bg-white flex items-center justify-between"
                >
                  <span className="text-sm text-[#696969]">
                    {formData.applicableClasses.length > 0
                      ? `${formData.applicableClasses.length} classes selected`
                      : "Select classes"}
                  </span>

                  <span  className="text-[0.5rem]">▼</span>
                </div>

                {/* DROPDOWN */}
                {showClassDropdown && (
                  <div className="absolute z-50 mt-2 w-full bg-white border border-[#E6E6E6] rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {classes?.map((item) => (
                      <label
                        key={item._id}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F7F7] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.applicableClasses.includes(
                            item._id,
                          )}
                          onChange={() => handleClassSelect(item._id)}
                          className="w-4 h-4"
                        />

                        <span>{item.className}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-4 px-6 py-6  border-[#E6E6E6]">
              <button
                onClick={() => {
                  handleReservedSubject();
                  setopenAddModel(false);
                }}
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={createSubjectMutation.isPending}
                className="px-6 py-2 bg-[#0B3142] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {createSubjectMutation.isPending
                  ? "Creating..."
                  : "Create Subject"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* edit module */}
      {openEditModel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setopenEditModel(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-206 max-h-1900 bg-white rounded-2xl shadow-xl flex flex-col"
          >
            {/* HEADER */}
            <div className="flex justify-between items-start p-6">
              <div>
                <h2 className="text-[20px] font-semibold text-[#1C1C1C]">
                  Edit Subject
                </h2>
                <p className="text-sm text-[#9C9C9C] mt-1">
                  Create a new subject with curriculum details
                </p>
              </div>

              <button
                onClick={() => setopenEditModel(false)}
                className="text-xl text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="px-6 pb-6 space-y-2.5 overflow-y-auto">
              {/* SUBJECT NAME */}
              <div>
                <label className="text-sm font-semibold">Subject Name</label>
                <input
                  type="text"
                  name="subjectName"
                  value={editFormData.subjectName}
                  onChange={handleEditChange}
                  placeholder="eg., Advance math"
                  className="w-full mt-2 px-4 py-3 rounded-xl border border-[#E6E6E6] outline-none focus:ring-2 focus:ring-[#0B3142]"
                />
              </div>

              {/* SUBJECT CODE + CATEGORY */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold">Subject Code</label>
                  <input
                    type="text"
                    name="subjectCode"
                    value={editFormData.subjectCode}
                    readOnly
                    className="w-full mt-2 px-4 py-3 rounded-xl border border-[#E6E6E6] bg-[#F5F7F7] text-[#696969] cursor-not-allowed outline-none"
                  />
                </div>
 {/* CATEGORY - Custom dropdown */}
    <div className="relative">
      <label className="text-sm font-semibold">Category</label>

      <div
        onClick={() => setShowEditCategoryDropdown(!showEditCategoryDropdown)}
        className="w-full mt-2 px-4 py-3 rounded-xl border border-[#E6E6E6] cursor-pointer bg-white flex items-center justify-between"
      >
        <span className={`text-sm ${editFormData.category ? "text-[#1C1C1C]" : "text-[#696969]"}`}>
          {editFormData.category ? editFormData.category : "Select category"}
        </span>
        <span className="text-[0.5rem]">▼</span>
      </div>

      {showEditCategoryDropdown && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-[#E6E6E6] rounded-xl shadow-lg overflow-y-auto">
          {["Core", "Elective", "None"].map((category) => (
            <label
              key={category}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F7F7] cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                checked={editFormData.category === category}
                onChange={() => {
                  setEditFormData({ ...editFormData, category: category });
                  setShowEditCategoryDropdown(false);
                }}
                className="w-4 h-4"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      )}
    </div>
 

            
              </div>

              {/* ASSIGN TEACHER */}
              {/* <div>
                <label className="text-sm font-semibold">Assign Teacher</label>
                <select
                  className="w-full mt-2 px-4 py-3 rounded-xl border border-[#E6E6E6] text-[#9C9C9C] outline-none focus:ring-2 focus:ring-[#0B3142]"
                  name="assignedTeachers"
                  value={editFormData.assignedTeachers}
                  onChange={handleEditChange}
                >
                  <option value="">Select teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.personalInfo?.staffName} ({teacher.staffId})
                    </option>
                  ))}
                </select>
              </div> */}



  {/* ASSIGN TEACHER - Custom dropdown */}
  <div className="relative">
    <label className="text-sm font-semibold">Assign Teacher</label>

    <div
      onClick={() => setShowEditTeacherDropdown(!showEditTeacherDropdown)}
      className="w-full mt-2 px-4 py-3 rounded-xl border border-[#E6E6E6] cursor-pointer bg-white flex items-center justify-between"
    >
      <span className="text-sm text-[#696969]">
        {editFormData.assignedTeachers
          ? teachers.find((t) => t._id === editFormData.assignedTeachers)
              ?.personalInfo?.staffName || "Selected"
          : "Select teacher"}
      </span>
      <span className="text-[0.5rem]">▼</span>
    </div>

    {showEditTeacherDropdown && (
      <div className="absolute z-50 mt-2 w-full bg-white border border-[#E6E6E6] rounded-xl shadow-lg max-h-60 overflow-y-auto">
        {teachers.map((teacher) => (
          <label
            key={teacher._id}
            className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F7F7] cursor-pointer"
          >
            <input
              type="radio"
              name="assignedTeachers"
              checked={editFormData.assignedTeachers === teacher._id}
              onChange={() => {
                setEditFormData({ ...editFormData, assignedTeachers: teacher._id });
                setShowEditTeacherDropdown(false);
              }}
              className="w-4 h-4"
            />
            <span>
              {teacher.personalInfo?.staffName} ({teacher.staffId})
            </span>
          </label>
        ))}
      </div>
    )}
  </div>


              {/* APPLICABLE CLASS */}
              <div className="relative">
                <label className="text-sm font-semibold">
                  Applicable Classes
                </label>

                {/* SELECT BOX */}
                <div
                  onClick={() => setShowClassDropdown(!showClassDropdown)}
                  className="w-full mt-2 px-4 py-3 rounded-xl border border-[#E6E6E6] cursor-pointer bg-white flex items-center justify-between"
                >
                  <span className="text-sm text-[#696969]">
                    {editFormData.applicableClasses.length > 0
                      ? `${editFormData.applicableClasses.length} classes selected`
                      : "Select classes"}
                  </span>

                  <span className="text-[0.5rem]">▼</span>
                </div>

                {/* DROPDOWN */}
                {showClassDropdown && (
                  <div className="absolute z-50 mt-2 w-full bg-white border border-[#E6E6E6] rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {classes?.map((item) => (
                      <label
                        key={item._id}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F7F7] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={item._id}
                          name="applicableClasses"
                          checked={editFormData.applicableClasses.includes(
                            item._id,
                          )}
                          onChange={() => handleEditClassSelect(item._id)}
                          className="w-4 h-4"
                        />

                        <span>{item.className}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-4 px-6 py-6 border-t border-[#E6E6E6]">
              <button
                onClick={() => setopenEditModel(false)}
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => updateSubject.mutate(editFormData)}
                disabled={updateSubject.isPending}
                className="px-6 py-2 bg-[#0B3142] text-white rounded-lg hover:opacity-90"
              >
                {updateSubject.isPending ? "Updating..." : "Update Subject"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* show subject details */}
      {openRoomDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setopenRoomDetails(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-209 h-auto bg-white rounded-2xl shadow-xl flex flex-col"
          >
            {/* ================= HEADER ================= */}
            <div className="mx-6 mt-6 p-6 rounded-xl border border-[#5CC3FF] bg-linear-to-r from-[#C79AE6] to-[#7FA9E6] flex justify-between items-center shadow-sm">
              {singleSubjectLoading ? (
                <p className="text-white font-medium">Loading...</p>
              ) : (
                <h2 className="text-white text-[20px] font-semibold">
                  {singleSubject?.subjectName || "Subject Details"}
                </h2>
              )}

              <button
                onClick={() => setopenRoomDetails(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"
              >
                <IoClose className="text-white" size={18} />
              </button>
            </div>

            {/* ================= BODY ================= */}
            <div className="px-6 mt-4 flex flex-col gap-4 flex-1">
              {/* SUBJECT INFORMATION */}
              <div className="font-semibold text-[16px]">
                Subject Information
              </div>
              <div className=" rounded-xl p-3 flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Subject Code</p>
                  <p className="font-semibold text-sm">
                    {" "}
                    {singleSubject?.subjectCode}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Category</p>
                  <span className="inline-flex items-center gap-2 mt-1 px-3 py-1 rounded-md text-xs font-semibold bg-[#E3F2FD] text-[#1565C0]">
                    <span className="w-2 h-2 rounded-full bg-[#1565C0]" />
                    {singleSubject?.category}
                  </span>
                </div>
              </div>

              {/* ================= TEACHERS ================= */}
              <div className=" rounded-xl p-3 flex flex-col gap-4">
                <div>
                  <h3 className="font-semibold text-sm">Teacher</h3>
                  <p className="text-xs text-gray-500">
                    Instructors assigned to this subject
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {singleSubject?.assignedTeachers?.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl p-2 border border-[#E6E6E6] flex items-center gap-3"
                    >
                      <img
                        src={item?.profilePhoto?.url}
                        alt={item?.personalInfo?.staffName}
                        className="w-10 h-10 rounded-full object-cover"
                      />

                      <div>
                        <div className="flex items-center gap-1">
                          <p className="font-semibold text-sm">
                            {item?.personalInfo?.staffName}
                          </p>
                        </div>

                        <p className="text-xs text-gray-500">
                          {item?.employmentInfo?.department}
                        </p>

                        <p className="text-xs text-gray-400">{item?.staffId}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ================= CLASS ================= */}
              <div className="rounded-xl p-3 flex flex-col gap-4">
                <div>
                  <h3 className="font-semibold text-sm">Class</h3>
                  <p className="text-xs text-gray-500">
                    Subject assigned to this classes
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {singleSubject?.applicableClasses?.map((item) => (
                    <div
                      key={item._id}
                      className="rounded-xl p-3 flex flex-col gap-3"
                      style={{
                        backgroundColor: "#EAF4FF",
                        borderTop: "4px solid #00A6F4",
                      }}
                    >
                      <p className="font-semibold text-sm">
                        {item.className}-{item.section}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ================= FOOTER ================= */}
            <div className="flex justify-end gap-4 px-6 py-6">
              <button
                onClick={() => setopenRoomDetails(false)}
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setopenEditModel(true);
                  setopenRoomDetails(false);
                }}
                className="px-6 py-2 bg-[#0B3142] text-white rounded-lg"
              >
                Edit Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subjects;
