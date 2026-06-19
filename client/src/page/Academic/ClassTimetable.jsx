import { Download, Printer, Search } from "lucide-react";
import {
  useQueries,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import React, { useState, useRef } from "react";
import api from "../../config/axiosInstance";
// import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaChalkboardTeacher } from "react-icons/fa";
import { LuDoorOpen } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import html2pdf from "html2pdf.js";
import { useReactToPrint } from "react-to-print";
import { GitMerge } from "lucide-react";

const ClassTimetable = () => {
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
const [showTeacherDropdown, setShowTeacherDropdown] = useState(false);
  const queryClient = useQueryClient();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [openAddModel, setopenAddModel] = useState(false);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [editingScheduleId, setEditingScheduleId] = useState(null);
  const timetableRef = useRef(null);
const [showClassDropdown, setShowClassDropdown] = useState(false);
const [showSectionDropdown, setShowSectionDropdown] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    subject: "",
    teacher: "",
    teacherId: "",
    teacherStaffId: "",
    teacherDepartment: "",
    room: "",
    otherDay: "",
    mergeClass: false,
    mergeClassId: "",
  });
const [showRoomDropdown, setShowRoomDropdown] = useState(false);
const [showOtherDayDropdown, setShowOtherDayDropdown] = useState(false);


  // get class api
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await api.get("/classes");
      return res.data.data;
    },
    onError: () => {
      toast.error("Failed to fetch classes");
    },
  });

  // ✅ Unique class names
  const uniqueClasses = [...new Set(classes.map((item) => item.className))];

  // ✅ Filter sections based on selected class
  const filteredSections = classes
    .filter((item) => item.className === selectedClass)
    .map((item) => item.section);

  // ✅ Remove duplicate sections
  const uniqueSections = [...new Set(filteredSections)];

  const handleSearch = () => {
    if (!selectedClass) {
      toast.error("Please select class");
      return;
    }

    if (!selectedSection) {
      toast.error("Please select section");
      return;
    }

    setShowTimeSlots(true);
  };

  // get timetable settings
  const { data: timetableData } = useQuery({
    queryKey: ["timetable-settings"],
    queryFn: async () => {
      const res = await api.get("/timetable/get-TimeTableSettings");
      return res.data.data;
    },
  });

  const { data: savedSchedules = [] } = useQuery({
    queryKey: ["class-schedule", selectedClass, selectedSection],

    queryFn: async () => {
      const res = await api.get("/timetable/class-schedule", {
        params: {
          className: selectedClass,
          section: selectedSection,
        },
      });

      return res.data.data;
    },

    enabled: !!selectedClass && !!selectedSection && showTimeSlots,
  });
  console.log(savedSchedules);

  //   post class schedule
  const createScheduleMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/timetable/class-schedule", payload);
      return res.data;
    },

    onSuccess: (data) => {
      if (data?.success === false) {
        toast.error(data?.message || "Failed to create schedule");
        return;
      }

      toast.success(data?.message || "Schedule created successfully");

      setopenAddModel(false);

      setScheduleForm({
        subject: "",
        teacher: "",
        room: "",
        otherDay: "",
        mergeClass: false,
        mergeClassId: "",
      });

      queryClient.invalidateQueries({
        queryKey: ["class-schedule", selectedClass, selectedSection],
      });
    },

    onError: (error) => {
      console.log("Schedule API Error:", error?.response?.data);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to create schedule",
      );
    },
  });

  const handleCreateSchedule = () => {
    if (!scheduleForm.subject || !scheduleForm.teacher || !scheduleForm.room) {
      toast.error("Please fill all required fields");
      return;
    }

    const selectedMergeClass = classes.find(
      (cls) => cls._id === scheduleForm.mergeClassId,
    );

    const payload = {
      className: selectedClass,
      section: selectedSection,
      day: selectedSlot.day,
      period: selectedSlot.period,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      subject: scheduleForm.subject,
      teacher: scheduleForm.teacher,
      teacherId: scheduleForm.teacherId,
      teacherStaffId: scheduleForm.teacherStaffId,
      teacherDepartment: scheduleForm.teacherDepartment,
      room: scheduleForm.room,

      otherDay: scheduleForm.otherDay,
      mergeClass: scheduleForm.mergeClass,
      mergeClassId: scheduleForm.mergeClassId,
      mergeClassName: selectedMergeClass?.className || "",
      mergeSection: selectedMergeClass?.section || "",
    };

    if (editingScheduleId) {
      updateScheduleMutation.mutate(payload);
    } else {
      createScheduleMutation.mutate(payload);
    }
  };

  const periods = timetableData?.periods || [];
  const breakPeriods = timetableData?.breakPeriods || [];

  // Fetch subjects
  const { data: subjectRes } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const res = await api.get("/subjects/AllSubjects");
      return res.data;
    },
  });

  const subjects = subjectRes?.data || [];

  // rooms api
  const { data: rooms = [], isLoading: roomsLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const res = await api.get("/rooms");
      return res.data.data;
    },
  });

  const updateScheduleMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.put(
        `/timetable/class-schedule/${editingScheduleId}`,
        payload,
      );

      return res.data;
    },

    onSuccess: (data) => {
      toast.success(data?.message || "Schedule updated successfully");

      setopenAddModel(false);

      queryClient.invalidateQueries({
        queryKey: ["class-schedule", selectedClass, selectedSection],
      });

      setEditingScheduleId(null);
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update schedule",
      );
    },
  });

  // in this pdf and print functionality will be added
  const handleDownloadPDF = () => {
    const element = timetableRef.current;

    if (!element) return;

    html2pdf()
      .set({
        margin: 0.3,
        filename: `Timetable-${selectedClass}-${selectedSection}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "landscape",
        },
      })
      .from(element)
      .save();
  };

  const handlePrint = useReactToPrint({
    contentRef: timetableRef,
    documentTitle: `Timetable-${selectedClass}-${selectedSection}`,
  });

  // ////////////////////////

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getSchedule = (day, periodName) => {
    return savedSchedules.find(
      (item) => item.day === day && item.period === periodName,
    );
  };

  // get teachers data in api
  const { data: staffRes, isLoading: teacherLoading } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const res = await api.get("/staff/all-staff");
      return res.data;
    },
  });

  const staffList = staffRes?.data || [];

  const teachers = staffList
    .filter(
      (staff) =>
        staff?.employmentInfo?.role?.trim().toLowerCase() === "teacher",
    )
    .map((staff) => ({
      id: staff._id,
      name: staff?.personalInfo?.staffName,
      staffId: staff?.staffId,
      department: staff?.employmentInfo?.department,
    }));

  return (
    <div className="border border-[#E6E6E6] rounded-xl p-4 space-y-5">
      <div>
        <p className="text-[#1C1C1C] text-lg font-semibold">Class Timetable</p>
        <span className="text-md text-[#9C9C9C]">
          View ,edit, or add schedule timetable for each day
        </span>
      </div>

      <div className="flex items-center justify-between gap-6">
        {/* <div className="flex flex-col w-full">
          <label className="mb-2 text-sm font-medium">Class</label>

          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setSelectedSection("");
              setShowTimeSlots(false);
            }}
            className="h-12 border border-[#E6E6E6] outline-none rounded-xl px-4"
          >
            <option value="">Select Class</option>

            {uniqueClasses.map((className, index) => (
              <option key={index} value={className}>
                {className}
              </option>
            ))}
          </select>


        </div>




        <div className="flex flex-col w-full">
          <label className="mb-2 text-sm font-medium">Section</label>

          <select
            value={selectedSection}
            onChange={(e) => {
              setSelectedSection(e.target.value);
              setShowTimeSlots(false);
            }}
            className="h-12 border border-[#E6E6E6] outline-none rounded-xl px-4"
          >
            <option value="">Select Section</option>

            {uniqueSections.map((section, index) => (
              <option key={index} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div> */}



{/* CLASS DROPDOWN */}
<div className="flex flex-col w-full relative">
  <label className="mb-2 text-sm font-medium">Class</label>
  
  <div
    onClick={() => setShowClassDropdown(!showClassDropdown)}
    className="h-12 px-4 py-3 rounded-xl border border-[#E6E6E6] cursor-pointer bg-white flex items-center justify-between"
  >
    <span className={`text-sm ${selectedClass ? "text-[#1C1C1C]" : "text-[#696969]"}`}>
      {selectedClass ? selectedClass : "Select Class"}
    </span>
    <span className="text-[0.5rem]">▼</span>
  </div>

  {/* DROPDOWN */}
  {showClassDropdown && (
    <div className="absolute z-50 w-full mt-[83px] bg-white border border-[#E6E6E6] rounded-xl shadow-lg max-h-60 overflow-y-auto">
      {uniqueClasses.map((className) => (
        <label
          key={className}
          className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F7F7] cursor-pointer"
        >
          <input
            type="radio"
            name="class"
            checked={selectedClass === className}
            onChange={() => {
              setSelectedClass(className);
              setSelectedSection("");
              setShowTimeSlots(false);
              setShowClassDropdown(false);
            }}
            className="w-4 h-4"
          />
          <span>{className}</span>
        </label>
      ))}
    </div>
  )}
</div>

{/* SECTION DROPDOWN */}
<div className="flex flex-col w-full relative">
  <label className="mb-2 text-sm font-medium">Section</label>
  
  <div
    onClick={() => setShowSectionDropdown(!showSectionDropdown)}
    className="h-12 px-4 py-3 rounded-xl border border-[#E6E6E6] cursor-pointer bg-white flex items-center justify-between"
  >
    <span className={`text-sm ${selectedSection ? "text-[#1C1C1C]" : "text-[#696969]"}`}>
      {selectedSection ? selectedSection : "Select Section"}
    </span>
    <span className="text-[0.5rem]">▼</span>
  </div>

  {/* DROPDOWN */}
  {showSectionDropdown && (
    <div className="absolute z-50 w-full mt-[83px] bg-white border border-[#E6E6E6] rounded-xl shadow-lg max-h-60 overflow-y-auto">
      {uniqueSections.map((section) => (
        <label
          key={section}
          className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F7F7] cursor-pointer"
        >
          <input
            type="radio"
            name="section"
            checked={selectedSection === section}
            onChange={() => {
              setSelectedSection(section);
              setShowTimeSlots(false);
              setShowSectionDropdown(false);
            }}
            className="w-4 h-4"
          />
          <span>{section}</span>
        </label>
      ))}
    </div>
  )}
</div>







      </div>

      <div className="mt-6">
        <button
          onClick={handleSearch}
          className="flex items-center gap-2 bg-[#0B3142] text-white px-5 py-2 rounded-md hover:bg-[#12465c] transition"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>

      {/* time table in print */}
      {showTimeSlots && (
        <div className="border border-[#E6E6E6] rounded-xl p-4 space-y-5">
          <div>
            <p className="text-[#1C1C1C] text-lg font-semibold">
              Weekly Timetable {selectedClass} {selectedSection}
            </p>
            <span className="text-md text-[#9C9C9C]">
              Add, edit, or remove periods for each day
            </span>
          </div>
          {/* /print table */}
          <div className="hidden">
            <div ref={timetableRef} className="bg-white p-6">
              <h2 className="text-xl font-bold text-center mb-2">
                Weekly Timetable
              </h2>

              <p className="text-center mb-4">
                {selectedClass} - {selectedSection}
              </p>

              <table className="w-full border-collapse border border-gray-400 text-sm">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2">Time Slot</th>

                    {days.map((day) => (
                      <th key={day} className="border border-gray-400 p-2">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {periods.map((period) => (
                    <React.Fragment key={period.period}>
                      <tr>
                        <td className="border border-gray-400 p-2 font-semibold">
                          {period.period}
                          <br />
                          {period.startTime} - {period.endTime}
                        </td>

                        {days.map((day) => {
                          const schedule = getSchedule(day, period.period);

                          return (
                            <td
                              key={day}
                              className="border border-gray-400 p-2 align-top"
                            >
                              {schedule ? (
                                <>
                                  <p className="font-bold">
                                    {schedule.subject}
                                  </p>
                                  <p>Teacher: {schedule.teacher}</p>
                                  <p>Room: {schedule.room}</p>

                                  {schedule.mergeClass && (
                                    <p>
                                      Merge: {schedule.mergeClassName} -{" "}
                                      {schedule.mergeSection}
                                    </p>
                                  )}
                                </>
                              ) : (
                                "-"
                              )}
                            </td>
                          );
                        })}
                      </tr>

                      {breakPeriods.map(
                        (breakItem, breakIndex) =>
                          breakItem.afterPeriod === period.period && (
                            <tr key={`print-break-${breakIndex}`}>
                              <td className="border border-gray-400 p-2 font-semibold text-orange-600">
                                Lunch Break
                                <br />
                                {breakItem.startTime} - {breakItem.endTime}
                              </td>

                              <td
                                colSpan={days.length}
                                className="border border-gray-400 p-2 text-center font-semibold text-orange-600"
                              >
                                🍴 Lunch Break - {breakItem.duration} Minutes
                              </td>
                            </tr>
                          ),
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center justify-center gap-2 w-full bg-[#12516E] text-white h-10 rounded-md"
            >
              <Download />
              Download PDFs
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 w-full bg-[#FFFFFF] border border-[#9C9C9C] text-[#696969] h-10 rounded-md"
            >
              <Printer />
              Print
            </button>
          </div>

          {/* <div ref={timetableRef} className="overflow-x-auto"> */}
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-2">
              <thead>
                <tr>
                  <th className="text-left text-sm font-semibold">Time Slot</th>

                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].map((day) => (
                    <th key={day} className="text-center text-sm font-semibold">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {periods.map((period, index) => (
                  <React.Fragment key={index}>
                    {/* PERIOD ROW */}
                    <tr>
                      <td className="flex items-center gap-2">
                        <div className="flex flex-col">
                          <div className="text-sm font-semibold">
                            {period.startTime}
                          </div>

                          <div className="text-xs text-[#9C9C9C]">
                            {period.endTime}
                          </div>
                        </div>

                        <div className="text-xs border w-16 border-[#E6E6E6] text-[#9C9C9C] font-semibold px-2 py-1 rounded">
                          {period.period}
                        </div>
                      </td>

                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ].map((day) => {
                        const existingSchedule = savedSchedules.find(
                          (item) =>
                            item.day === day && item.period === period.period,
                        );

                        return (
                          <td key={day}>
                            {existingSchedule ? (
                              <div className="relative min-h-16.75 min-w-55 w-full rounded-xl border-2 border-[#7CC5E7] bg-[#EDF9FF] px-3 py-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingScheduleId(existingSchedule._id);

                                    setSelectedSlot({
                                      day,
                                      period: period.period,
                                      startTime: period.startTime,
                                      endTime: period.endTime,
                                    });

                                    setScheduleForm({
                                      subject: existingSchedule.subject,
                                      teacher: existingSchedule.teacher,
                                      room: existingSchedule.room,
                                      otherDay: existingSchedule.otherDay || "",
                                      mergeClass:
                                        existingSchedule.mergeClass || false,
                                      mergeClassId:
                                        existingSchedule.mergeClassId || "",
                                    });

                                    setopenAddModel(true);
                                  }}
                                  className="absolute top-2 right-2 text-[#0077B6]"
                                >
                                  <FaRegEdit />
                                </button>

                                <p className="font-semibold text-[#0077B6] text-[16px] leading-tight">
                                  {existingSchedule.subject}
                                </p>

                                {existingSchedule.mergeClass && (
                                  <div className="absolute bottom-10 right-8 group">
                                    <GitMerge className="w-4 h-4 text-[#0077B6] cursor-pointer" />

                                    <div className="hidden group-hover:block absolute right-0 bottom-6 w-52 bg-white border border-[#D9D9D9] rounded-lg shadow-lg p-3 z-50">
                                      <p className="text-xs font-semibold text-[#1C1C1C]">
                                        Merged Class
                                      </p>

                                      <p className="text-xs text-[#696969] mt-1">
                                        {existingSchedule.mergeClassName ||
                                          "Class"}{" "}
                                        - {existingSchedule.mergeSection || ""}
                                      </p>
                                    </div>
                                  </div>
                                )}

                                <div className="flex items-center justify-between gap-4 mt-2 text-[#0077B6]">
                                  <p className="text-[12px] font-semibold flex items-center gap-1">
                                    <FaChalkboardTeacher className="w-4 h-4" />{" "}
                                    {existingSchedule.teacher}
                                  </p>

                                  <p className="text-[12px] font-semibold flex items-center gap-1">
                                    <LuDoorOpen className="w-4 h-4" />{" "}
                                    {existingSchedule.room}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div
                                onClick={() => {
                                  setSelectedSlot({
                                    day,
                                    period: period.period,
                                    startTime: period.startTime,
                                    endTime: period.endTime,
                                  });

                                  setScheduleForm({
                                    subject: "",
                                    teacher: "",
                                    room: "",
                                    otherDay: "",
                                    mergeClass: false,
                                    mergeClassId: "",
                                  });

                                  setopenAddModel(true);
                                }}
                                className="border border-dashed border-[#D9D9D9] rounded-xl min-h-23.75 min-w-55 w-full flex flex-col items-center justify-center text-[#9C9C9C] cursor-pointer hover:bg-[#FAFAFA]"
                              >
                                <span className="text-2xl">+</span>
                                <span className="text-xs">Create</span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>

                    {/* BREAK ROW */}
                    {breakPeriods.map(
                      (breakItem, breakIndex) =>
                        breakItem.afterPeriod === period.period && (
                          <tr key={`break-${breakIndex}`}>
                            <td className="py-3 flex items-center gap-2">
                              <div>
                                <div className="text-sm font-semibold">
                                  {breakItem.startTime}
                                </div>

                                <div className="text-xs text-[#9C9C9C]">
                                  {breakItem.endTime}
                                </div>
                              </div>

                              <div className="bg-[#F97316] text-white text-xs px-2 py-1 rounded inline-block mt-1">
                                Lunch
                              </div>
                            </td>

                            <td colSpan={6}>
                              <div className="text-center text-[#F97316] font-semibold">
                                <p className="text-[#F97316]">
                                  {" "}
                                  🍴 Lunch Break - {breakItem.duration} Minutes
                                </p>
                              </div>
                            </td>
                          </tr>
                        ),
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            {/* open model */}
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
                        Add Schedule
                      </h2>
                      <p className="text-sm text-[#9C9C9C] mt-1">
                        Add a new period to the timetable
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
                    <div className="grid md:grid-cols-2 gap-6">
                    <div>
  <label className="text-sm font-semibold">Subject</label>
  
  <div className="relative w-full mt-2">
    <button
      type="button"
      onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
      className="w-full bg-white border border-[#E6E6E6] rounded-xl px-4 py-3 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors "
      style={{ outline: "none" }}
    >
      <span className={`text-sm ${scheduleForm.subject ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}`}>
        {scheduleForm.subject || "Select Subject"}
      </span>
      <svg
        className={`w-3.5 h-3.5 transition-transform duration-200 ${showSubjectDropdown ? "rotate-180" : ""}`}
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

    {showSubjectDropdown && (
      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-xl shadow-lg max-h-60 overflow-y-auto">
        <button
          type="button"
          onClick={() => {
            setScheduleForm({
              ...scheduleForm,
              subject: "",
            });
            setShowSubjectDropdown(false);
          }}
          className="w-full text-left px-4 py-3 text-sm hover:bg-[#F5F7F7] transition-colors text-[#9C9C9C]"
        >
          Select Subject
        </button>
        {subjects.map((item) => (
          <button
            key={item._id}
            type="button"
            onClick={() => {
              setScheduleForm({
                ...scheduleForm,
                subject: item.subjectName,
              });
              setShowSubjectDropdown(false);
            }}
            className={`w-full text-left px-4 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
              scheduleForm.subject === item.subjectName ? "bg-[#F5F7F7] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
            }`}
          >
            {item.subjectName} ({item.subjectCode})
          </button>
        ))}
      </div>
    )}
  </div>
</div>

               <div>
  <label className="text-sm font-semibold">Teacher</label>
  
  <div className="relative w-full mt-2">
    <button
      type="button"
      onClick={() => setShowTeacherDropdown(!showTeacherDropdown)}
      className="w-full bg-white border border-[#E6E6E6] rounded-xl px-4 py-3 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors "
      style={{ outline: "none" }}
    >
      <span className={`text-sm ${scheduleForm.teacher ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}`}>
        {scheduleForm.teacher || (teacherLoading ? "Loading teachers..." : "Select Teacher")}
      </span>
      <svg
        className={`w-3.5 h-3.5 transition-transform duration-200 ${showTeacherDropdown ? "rotate-180" : ""}`}
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

    {showTeacherDropdown && (
      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-xl shadow-lg max-h-60 overflow-y-auto">
        <button
          type="button"
          onClick={() => {
            setScheduleForm({
              ...scheduleForm,
              teacher: "",
              teacherId: "",
              teacherStaffId: "",
              teacherDepartment: "",
            });
            setShowTeacherDropdown(false);
          }}
          className="w-full text-left px-4 py-3 text-sm hover:bg-[#F5F7F7] transition-colors text-[#9C9C9C]"
        >
          Select Teacher
        </button>
        {teachers.map((teacher) => (
          <button
            key={teacher.id}
            type="button"
            onClick={() => {
              setScheduleForm({
                ...scheduleForm,
                teacher: teacher.name,
                teacherId: teacher.id,
                teacherStaffId: teacher.staffId,
                teacherDepartment: teacher.department,
              });
              setShowTeacherDropdown(false);
            }}
            className={`w-full text-left px-4 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
              scheduleForm.teacher === teacher.name ? "bg-[#F5F7F7] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
            }`}
          >
            {teacher.name} ({teacher.staffId})
          </button>
        ))}
      </div>
    )}
  </div>
</div>

                    </div>

                    {/* SUBJECT CODE + CATEGORY */}
                    <div className="grid md:grid-cols-2 gap-6">
                    <div>
  <label className="text-sm font-semibold">Room</label>
  
  <div className="relative w-full mt-2">
    <button
      type="button"
      onClick={() => setShowRoomDropdown(!showRoomDropdown)}
      className="w-full bg-white border border-[#E6E6E6] rounded-xl px-4 py-3 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors "
      style={{ outline: "none" }}
    >
      <span className={`text-sm ${scheduleForm.room ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}`}>
        {scheduleForm.room || "Select Room"}
      </span>
      <svg
        className={`w-3.5 h-3.5 transition-transform duration-200 ${showRoomDropdown ? "rotate-180" : ""}`}
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

    {showRoomDropdown && (
      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-xl shadow-lg max-h-60 overflow-y-auto">
        <button
          type="button"
          onClick={() => {
            setScheduleForm({
              ...scheduleForm,
              room: "",
            });
            setShowRoomDropdown(false);
          }}
          className="w-full text-left px-4 py-3 text-sm hover:bg-[#F5F7F7] transition-colors text-[#9C9C9C]"
        >
          Select Room
        </button>
        {rooms.map((room) => (
          <button
            key={room._id}
            type="button"
            onClick={() => {
              setScheduleForm({
                ...scheduleForm,
                room: room.roomName || room.name || room.roomNumber,
              });
              setShowRoomDropdown(false);
            }}
            className={`w-full text-left px-4 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
              scheduleForm.room === (room.roomName || room.name || room.roomNumber) 
                ? "bg-[#F5F7F7] font-medium text-[#0B3142]" 
                : "text-[#1C1C1C]"
            }`}
          >
            {room.roomName || room.name || room.roomNumber}
          </button>
        ))}
      </div>
    )}
  </div>
</div>

                    <div>
  <label className="text-sm font-semibold">Other Day</label>
  
  <div className="relative w-full mt-2">
    <button
      type="button"
      onClick={() => setShowOtherDayDropdown(!showOtherDayDropdown)}
      className="w-full bg-white border border-[#E6E6E6] rounded-xl px-4 py-3 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors 
      "
      style={{ outline: "none" }}
    >
      <span className={`text-sm ${scheduleForm.otherDay ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}`}>
        {scheduleForm.otherDay || "Select multiple days"}
      </span>
      <svg
        className={`w-3.5 h-3.5 transition-transform duration-200 ${showOtherDayDropdown ? "rotate-180" : ""}`}
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

    {showOtherDayDropdown && (
      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-xl shadow-lg overflow-hidden">
        <button
          type="button"
          onClick={() => {
            setScheduleForm({
              ...scheduleForm,
              otherDay: "",
            });
            setShowOtherDayDropdown(false);
          }}
          className="w-full text-left px-4 py-3 text-sm hover:bg-[#F5F7F7] transition-colors text-[#9C9C9C]"
        >
          Select multiple days
        </button>
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => {
              setScheduleForm({
                ...scheduleForm,
                otherDay: day,
              });
              setShowOtherDayDropdown(false);
            }}
            className={`w-full text-left px-4 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
              scheduleForm.otherDay === day ? "bg-[#F5F7F7] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    )}
  </div>
</div>





                    </div>



                    {/* merage class */}
                    <div>
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          checked={scheduleForm.mergeClass}
                          onChange={(e) =>
                            setScheduleForm({
                              ...scheduleForm,
                              mergeClass: e.target.checked,
                              mergeClassId: "",
                            })
                          }
                        />
                        <span className="text-sm text-[#1C1C1C]">
                          Merge Class ?
                        </span>
                      </div>

                      {scheduleForm.mergeClass && (
                        <>
                          <label className="text-sm font-semibold">Class</label>

                          <select
                            name="mergeClassId"
                            value={scheduleForm.mergeClassId}
                            onChange={(e) =>
                              setScheduleForm({
                                ...scheduleForm,
                                mergeClassId: e.target.value,
                              })
                            }
                            className="w-full mt-2 px-4 py-3 rounded-xl border border-[#E6E6E6] text-[#9C9C9C] outline-none"
                          >
                            <option value="">Select class</option>

                            {classes.map((cls) => (
                              <option key={cls._id} value={cls._id}>
                                {cls.className} - {cls.section}
                              </option>
                            ))}
                          </select>
                        </>
                      )}
                    </div>

                  </div>

                  {/* FOOTER */}
                  <div className="flex justify-end gap-4 px-6 py-6  border-[#E6E6E6]">
                    <button
                      onClick={() => {
                        setopenAddModel(false);
                      }}
                      className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleCreateSchedule}
                      disabled={createScheduleMutation.isPending}
                      className="px-6 py-2 bg-[#0B3142] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
                    >
                      {createScheduleMutation.isPending ||
                      updateScheduleMutation.isPending
                        ? "Saving..."
                        : editingScheduleId
                          ? "Update Schedule"
                          : "Schedule"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassTimetable;
