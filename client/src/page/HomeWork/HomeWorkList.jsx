import { useEffect, useState } from "react";
import { homeworkList, classOptions as classes } from "../../data/homeworkData";
import { useNavigate } from "react-router-dom";

import {
  MdSearch,
  MdCalendarToday,
  MdVisibility,
  MdEdit,
  MdDelete,
  MdArrowDropDown,
} from "react-icons/md";

import { toast } from "react-toastify";
import contact from "../../assets/images/contact.png";
import api from "../../config/axiosInstance";
import DeleteHomework from "./deleteHomework";

const HomeWorkList = () => {
  const navigate = useNavigate();

  // Filters
  const [classOptions, setClassOptions] = useState([])
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [dateFilter, setDateFilter] = useState("All");
  const [filter, setFilter] = useState({
    className: '',
    status: '',
    search: ''
  })

  // Data
  const [displayData, setDisplayData] = useState([]);


  const fetchClasses = async () => {
    try {
      const response = await api.get("/classes");

      setClassOptions(response.data?.data || classes);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch Homeworks
  const fetchHomeworks = async () => {
    try {
      const response = await api.get("/homework", {
        params: {
          search: filter.search,
          className: filter.className,
          status: filter.status,
        },
      });
      setDisplayData(response.data?.data || homeworkList);
    } catch (error) {
      setDisplayData(homeworkList);
      toast.error("Failed to fetch homeworks");
    }
  };

  useEffect(() => {
    fetchHomeworks();
    fetchClasses()
  }, [filter]);

  const handleFilter = (e) => {
    const { name, value } = e.target;

    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Delete Homework
  // const handleDelete = async (id) => {
  //   if (!window.confirm("Are you sure you want to delete this?")) return;

  //   try {
  //     await api.delete(`/homework/delete/${id}`);

  //     // setDisplayData((prev) =>
  //     //   prev.filter((item) => item._id !== id)
  //     // );
  //     fetchHomeworks()

  //     toast.success("Homework deleted successfully");
  //   } catch (error) {
  //     toast.error("Failed to delete homework");
  //   }
  // };
  const handleDelete = async () => {
    try {
      await api.delete(
        `/homework/delete/${selectedHomework._id}`
      );

      fetchHomeworks();
      setDeleteOpen(false);
      setSelectedHomework(null);

      toast.success("Homework deleted successfully");
    } catch (error) {
      toast.error("Failed to delete homework");
    }
  };

  // Date Filter
  const isWithinDateRange = (dateStr, range) => {
    if (range === "All") return true;

    const itemDate = new Date(dateStr);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const startOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    const itemTime = itemDate.setHours(0, 0, 0, 0);

    if (range === "Today") return itemTime === today.getTime();
    if (range === "Yesterday") return itemTime === yesterday.getTime();
    if (range === "This Week") return itemDate >= startOfWeek;
    if (range === "This Month") return itemDate >= startOfMonth;

    return true;
  };

  // Filter Data
  const filteredData = displayData.filter((item) => {
    // const sTerm = searchTerm.toLowerCase();

    // const matchesSearch =
    //   item.title?.toLowerCase().includes(sTerm) ||
    //   item.subject?.toLowerCase().includes(sTerm);

    // const matchesStatus =
    //   statusFilter === "All Status" ||
    //   item.status === statusFilter;

    // const matchesClass =
    //   classFilter === "Class" ||
    //   item.className === classFilter;

    const matchesDate = isWithinDateRange(
      item.createdAt || item.publishDate,
      dateFilter
    );

    return (
      // matchesSearch &&
      // matchesStatus &&
      // matchesClass &&
      matchesDate
    );
  });

  const getStatusBadge = (status) => {
    const styles = {
      Active: "bg-[#D4EDDA] text-[#009638]",
      Completed: "bg-[#E3F2FD] text-[#1565C0]",
      Overdue: "bg-[#FFEBEE] text-[#C92131]",
      Pending: "bg-[#F8D7DA] text-[#EF6C00]",
    };

    return styles[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="bg-[#FAFAFA]">
      <div
        className="p-6 bg-[#FFF]  mx-auto flex flex-col items-start rounded-2xl w-full"
        style={{
          gap: "36px",
          boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div className="w-full">
          <h1 className="text-[18px] font-semibold text-[#1C1C1C]">
            All Homework Assignments
          </h1>

          <p className="font-normal text-[14px] text-[#9C9C9C] ">
            View and manage all homework assignments
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center h-9 gap-28 mt-2 w-full">
          {/* Search */}
          <div className="relative w-full">
            <input
              type="text"
              name="search"
              value={filter.search}
              placeholder="Search homework by title or subject..."
              className="w-full pl-10 pr-4 py-2 border text-[#9C9C9C] rounded-lg outline-none focus:ring-1 bg-[#EEEEEE] focus:ring-blue-500 text-[14px]"
              onChange={handleFilter}
            />

            {!filter.search && (
              <MdSearch
                className="absolute left-3 top-1/2 -translate-y-1/4 text-[#696969]"
                size={18}
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Status */}
            <div className="relative flex items-center">
              <select
                name="status"
                className="bg-[#EFF2F2] h-7 pl-3 pr-8 rounded-lg text-[14px] text-[#1C1C1C] outline-none appearance-none cursor-pointer"
                value={filter.status}
                onChange={handleFilter}
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Overdue">Overdue</option>
                <option value="Pending">Pending</option>
              </select>

              <MdArrowDropDown
                className="absolute right-2 top-1/2 -translate-y-1/4 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>

            {/* Class */}
            <div className="relative flex items-center h-7">
              <select
                className="bg-[#EFF2F2] h-7 pl-3 pr-8 rounded-lg text-[14px] text-[#1C1C1C] outline-none appearance-none cursor-pointer"
                name="className"
                value={filter.className}
                onChange={handleFilter}
              >
                <option value="">All Classes</option>

                {classOptions.map((opt) => (
                  <option key={opt._id} value={opt.className}>
                    {opt.className}
                  </option>
                ))}
              </select>

              <MdArrowDropDown
                className="absolute right-2 top-1/2 -translate-y-1/4 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>

            {/* Date */}
            <div className="relative flex items-center h-7">
              <select
                className="bg-[#EFF2F2] h-full pl-3 pr-8 rounded-lg text-[14px] text-[#1C1C1C] outline-none appearance-none cursor-pointer"
                value={dateFilter}
                onChange={(e) =>
                  setDateFilter(e.target.value)
                }
              >
                <option value="All">All Time</option>
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
              </select>

              <MdArrowDropDown
                className="absolute right-2 top-1/2 -translate-y-1/4 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Homework List */}
        <div className="flex flex-col gap-4 w-full mt-6">
          {filteredData.length > 0 ? (
            filteredData.map((hw) => (
              <div
                key={hw._id}
                className="w-full min-h-58 p-5 bg-[#FFFFFF] border border-[#E6E6E6] rounded-xl shadow-sm flex flex-col justify-between hover:border-blue-200 transition-all"
              >
                <div className="flex justify-between items-start w-full">
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-[18px] font-semibold text-[#1C1C1C]">
                        {hw.title}
                      </h3>

                      <p className="text-[16px] font-normal text-[#9C9C9C] ">
                        {hw.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-[16px] text-[#696969] font-normal">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 flex items-center justify-center">
                          <img
                            src={contact}
                            alt="class icon"
                            className="w-full h-full object-contain"
                          />
                        </span>

                        <span>
                          {hw.className} {hw.section}
                        </span>
                      </div>

                      <div className="w-1.5 h-1.5 rounded-full bg-[#696969] opacity-20 mx-1"></div>

                      <span>{hw.subject}</span>

                      <div className="w-1.5 h-1.5 rounded-full bg-[#696969] opacity-20 mx-1"></div>

                      <span>{hw.teacher}</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="ml-4">
                    <span
                      className={`inline-flex items-center justify-center h-5 w-20 text-[12px] font-semibold py-1 px-3 ${getStatusBadge(
                        hw.status
                      )}`}
                    >
                      {hw.status}
                    </span>
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="flex flex-row justify-between md:flex-row mt-4 w-full gap-4">
                  <div className="flex flex-row w-full pr-40 justify-between md:flex gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="text-[14px] text-[#696969]">
                        Publish Date
                      </span>

                      <div className="flex items-center gap-1 text-[16px] font-semibold text-[#1C1C1C]">
                        <MdCalendarToday size={16} />
                        {hw.publishDate}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] text-[#696969]">
                        Due Date
                      </span>

                      <div className="flex items-center gap-1 text-[16px] font-semibold text-[#1C1C1C]">
                        <MdCalendarToday size={16} />
                        {hw.dueDate}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] text-[#696969]">
                        Submitted
                      </span>

                      <div className="flex flex-col gap-1">
                        <span className="text-[16px] font-semibold text-[#00A63E]">
                          {hw.submittedCount}
                        </span>

                        <div className="w-32 h-1.5 bg-[#EFF2F2] rounded-full overflow-hidden">
                          <div
                            className="h-1.25 rounded-SM transition-all duration-500"
                            style={{
                              width: `${(hw.progress / hw.total) * 100}%`,
                              background:
                                "linear-gradient(90deg, #0B3142 0%, #1C7DA8 100%)",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] text-[#696969]">
                        Pending
                      </span>

                      <span className="text-[16px] font-semibold text-[#DC2626]">
                        {hw.pendingCount}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] text-[#696969]">
                        Checked
                      </span>

                      <span className="text-[14px] font-semibold text-[#007AFF]">
                        {hw.checkedCount}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[#F1F1F1] mt-4 w-full"></div>

                {/* Actions */}
                <div className="flex flex-col md:flex-row mt-4 justify-end items-end md:items-center gap-4 w-full">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        navigate(`/homework-submission/${hw._id}`)
                      }
                      className="flex items-center gap-2 px-4 h-9 rounded-md border border-[#9C9C9C] text-[13px] text-[#696969] hover:bg-gray-50"
                    >
                      <MdVisibility size={18} />
                      View Submission
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/edit-homework/${hw._id}`)
                      }
                      className="flex items-center gap-2 px-4 h-9 rounded-md border border-[#9C9C9C] text-[13px] text-[#696969] hover:bg-gray-50"
                    >
                      <MdEdit size={18} />
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedHomework(hw);
                        setDeleteOpen(true);
                      }}
                      className="flex items-center gap-2 px-4 h-9 rounded-md border border-[#9C9C9C] text-[13px] text-[#DC2626] hover:bg-red-50"
                    >
                      <MdDelete size={18} />
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="w-full py-20 text-center bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 font-medium">
                No results found matching your filters.
              </p>
            </div>
          )}
        </div>
      </div>
      {deleteOpen && (
        <DeleteHomework
          title="Delete Homework"
          nameKey="title"
          data={selectedHomework}
          Cancel={() => {
            setDeleteOpen(false);
            setSelectedHomework(null);
          }}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default HomeWorkList;
