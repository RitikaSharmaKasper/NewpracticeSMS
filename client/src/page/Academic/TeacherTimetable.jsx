import { Download, Printer, Search } from "lucide-react";
import {
  useQueries,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from "react";
import api from "../../config/axiosInstance";
import { toast } from "react-toastify";
import { FaChalkboardTeacher } from "react-icons/fa";
import { LuDoorOpen } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import html2pdf from "html2pdf.js";
import { useReactToPrint } from "react-to-print";
import { GitMerge } from "lucide-react";


const TeacherTimetable = () => {
  const queryClient = useQueryClient();
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teacherSearch, setTeacherSearch] = useState("");
  const [showTeacherDropdown, setShowTeacherDropdown] = useState(false);
  const [showTeacherTimetable, setShowTeacherTimetable] = useState(false);
  const teacherDropdownRef = useRef(null);

  // timetable settings api
  const { data: timetableRes } = useQuery({
    queryKey: ["timetable-settings"],
    queryFn: async () => {
      const res = await api.get("/timetable/get-TimeTableSettings");
      return res.data;
    },
  });

  const timetableData = timetableRes?.data;
  const periods = timetableData?.periods || [];
  const breakPeriods = timetableData?.breakPeriods || [];

  // class schedules api
  const { data: scheduleRes } = useQuery({
    queryKey: ["all-class-schedules"],
    queryFn: async () => {
      const res = await api.get("/timetable/all-class-schedules");
      return res.data?.data || [];
    },
  });

  const allSchedules = Array.isArray(scheduleRes) ? scheduleRes : [];

  const teacherSchedules = allSchedules.filter(
    (item) =>
      item.teacher?.trim()?.toLowerCase() ===
      selectedTeacher?.name?.trim()?.toLowerCase(),
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        teacherDropdownRef.current &&
        !teacherDropdownRef.current.contains(e.target)
      ) {
        setShowTeacherDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // all staf data api

  const { data, isLoading } = useQuery({
    queryKey: ["all-staff"],

    queryFn: async () => {
      const res = await api.get("/staff/all-staff", {});

      return res.data;
    },
  });

  const staffList = data?.data || data?.staff || data || [];

  const teachers = staffList
    ?.filter(
      (staff) =>
        staff?.employmentInfo?.role?.trim().toLowerCase() === "teacher",
    )
    ?.map((staff) => ({
      id: staff?._id,
      employeeId: staff?.staffId,
      name: staff?.personalInfo?.staffName,
    }));

  const filteredTeachers = teachers.filter((teacher) => {
    const search = teacherSearch.toLowerCase();

    return (
      teacher?.name?.toLowerCase().includes(search) ||
      teacher?.employeeId?.toLowerCase().includes(search)
    );
  });

  const getTeacherSchedule = (day, periodName) => {
    return teacherSchedules.find(
      (item) => item.day === day && item.period === periodName,
    );
  };

  return (
    <div className="border border-[#E6E6E6] rounded-xl p-4 space-y-5">
      <div>
        <p className="text-[#1C1C1C] text-lg font-semibold">Class Timetable</p>
        <span className="text-md text-[#9C9C9C]">
          View ,edit, or add schedule timetable for each day
        </span>
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className="flex flex-col w-full">
          <label className="mb-2 text-sm font-medium">Teacher</label>

          <div ref={teacherDropdownRef} className="relative">
            <input
              type="text"
              value={teacherSearch}
              placeholder="Search teacher..."
              onChange={(e) => {
                setTeacherSearch(e.target.value);
                setShowTeacherDropdown(true);
                setSelectedTeacher("");
              }}
              onFocus={() => setShowTeacherDropdown(true)}
              className="h-12 w-full border border-[#E6E6E6] outline-none rounded-xl px-4"
            />

            {showTeacherDropdown && (
              <div className="absolute top-14 left-0 w-full bg-white border border-[#E6E6E6] rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                {isLoading ? (
                  <div className="px-4 py-3 text-sm text-gray-400">
                    Loading teachers...
                  </div>
                ) : filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher) => (
                    <div
                      key={teacher.id}
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setTeacherSearch(
                          `${teacher.employeeId}: ${teacher.name}`,
                        );
                        setShowTeacherDropdown(false);
                      }}
                      className="px-4 py-3 hover:bg-[#F5F9FC] cursor-pointer text-sm"
                    >
                      {teacher.employeeId}: {teacher.name}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-400">
                    No teacher found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => {
            if (!selectedTeacher) {
              toast.error("Please select teacher");
              return;
            }

            setShowTeacherTimetable(true);
          }}
          className="flex items-center gap-2 bg-[#0B3142] text-white px-5 py-2 rounded-md hover:bg-[#12465c] transition"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>

      {/* time table in print */}
      {showTeacherTimetable && (
        <div className="border border-[#E6E6E6] rounded-xl p-4 space-y-5">
          <div>
            <p className="text-[#1C1C1C] text-lg font-semibold">
              Teacher Timetable {selectedTeacher?.name} - Schedule
            </p>
            <span className="text-md text-[#9C9C9C]">
              Add, edit, or remove periods for each day
            </span>
          </div>
          {/* /print table */}
          <div className="hidden">
            <div className="bg-white p-6">
              <h2 className="text-xl font-bold text-center mb-2">
                Weekly Timetable
              </h2>
            </div>
          </div>

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
                        const existingSchedule = getTeacherSchedule(
                          day,
                          period.period,
                        );

                        return (
                          <td key={day}>
                            {existingSchedule ? (
                              <div className="relative min-h-16.75 min-w-55 w-full rounded-xl border-2 border-[#B2C6D0] bg-[#E8EEF1] px-3 py-2">
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
                                  className="absolute top-2 right-2 text-[#12516E]"
                                ></button>

                                <p className="font-semibold text-[#12516E] text-md leading-tight">
                                  {existingSchedule.subject}
                                </p>

                                {existingSchedule.mergeClass && (
                                  <div className="absolute bottom-10 right-3 group">
                                    <GitMerge className="w-4 h-4 text-[#12516E] cursor-pointer" />

                                    <div className="hidden group-hover:block absolute right-0 bottom-6 w-52 bg-white border border-[#D9D9D9] rounded-lg shadow-lg p-3 z-50">
                                      <p className="text-xs font-semibold text-[#1C1C1C]">
                                        Merged Class
                                      </p>

                                      <p className="text-[16px] text-[#696969] mt-1">
                                        {existingSchedule.mergeClassName ||
                                          "Class"}{" "}
                                        - {existingSchedule.mergeSection || ""}
                                      </p>
                                    </div>
                                  </div>
                                )}

                                <div className="flex items-center justify-between gap-4 mt-2 text-[#12516E]">
                                  <p className="text-xs font-semibold flex items-center gap-1">
                                    <FaChalkboardTeacher className="w-4 h-4" />{" "}
                                    {existingSchedule.className} -{" "}
                                    {existingSchedule.section}
                                  </p>

                                  <p className="text-xs font-semibold flex items-center gap-1">
                                    <LuDoorOpen className="w-4 h-4" />{" "}
                                    {existingSchedule.room}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div
                                // onClick={() => {
                                //   setSelectedSlot({
                                //     day,
                                //     period: period.period,
                                //     startTime: period.startTime,
                                //     endTime: period.endTime,
                                //   });

                                //   setScheduleForm({
                                //     subject: "",
                                //     teacher: "",
                                //     room: "",
                                //     otherDay: "",
                                //     mergeClass: false,
                                //     mergeClassId: "",
                                //   });

                                //   setopenAddModel(true);
                                // }}
                                className="border border-dashed border-[#D9D9D9] rounded-xl min-h-16.75 min-w-55 w-full flex flex-col items-center justify-center text-[#9C9C9C] cursor-pointer hover:bg-[#FAFAFA]"
                              >
                                <div className="bg-[#B5FFD1] text-[#009638] text-xs font-semibold px-2 py-1 rounded-md">
                                  Free Period
                                </div>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherTimetable;
