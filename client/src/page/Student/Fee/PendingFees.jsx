import { useState, useEffect, useRef } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";

// icons
import { LuSend } from "react-icons/lu";

// -------- Pagination --------
import Pagination from "../../../components/Pagination";
import { useNavigate, useParams } from "react-router-dom";

// ─── Custom Select ────────────────────────────────────────────────────────────
const CustomSelect = ({ options, value, onChange, placeholder, className = "" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="bg-[#EFF2F2] rounded px-3 py-2 flex items-center gap-2 cursor-pointer min-w-[100px]"
      >
        <span className={`text-sm flex-1 ${value ? "text-[#1C1C1C]" : "text-[#1C1C1C]"}`}>
          {value || placeholder}
        </span>
        <MdOutlineArrowDropDown
          size={18}
          className={`text-[#1C1C1C] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && (
        <div className="absolute mt-1 w-full bg-white border border-[#E6E6E6] rounded-lg shadow-lg z-50 max-h-52 overflow-y-auto">
          <div
            onClick={() => { onChange(""); setOpen(false); }}
            className={`px-4 py-2 font-[Segoe UI] cursor-pointer ${!value ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-[#696969]"}`}
          >
            {placeholder}
          </div>
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`px-4 py-2 font-[Segoe UI] cursor-pointer ${value === opt ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-[#1C1C1C]"} ${className}`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
function PendingFees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const receipts = [
    {
      id: 1,
      dueDate: "01 Aug 2026",
      receiptNo: "RCPT1001",
      student: "Rahul Sharma",
      class: "10",
      section: "A",
      amountPaid: "₹5,000",
      feeMonth: "August",
      totalDue: "₹5,000",
      status: "Pending"
    },
    {
      id: 2,
      dueDate: "02 Aug 2026",
      receiptNo: "RCPT1002",
      student: "Priya Verma",
      class: "9",
      section: "B",
      amountPaid: "₹4,500",
      feeMonth: "August",
      totalDue: "₹4,500",
      status: "Pending"
    },
    {
      id: 3,
      dueDate: "03 Aug 2026",
      receiptNo: "RCPT1003",
      student: "Amit Kumar",
      class: "8",
      section: "C",
      amountPaid: "₹6,000",
      feeMonth: "July",
      totalDue: "₹6,000",
      status: "Pending"
    },
    {
      id: 4,
      dueDate: "04 Aug 2026",
      receiptNo: "RCPT1004",
      student: "Sneha Singh",
      class: "7",
      section: "A",
      amountPaid: "₹5,500",
      feeMonth: "July",
      totalDue: "₹5,500",
      status: "Pending"
    },
    {
      id: 5,
      dueDate: "05 Aug 2026",
      receiptNo: "RCPT1005",
      student: "Arjun Patel",
      class: "6",
      section: "B",
      amountPaid: "₹4,800",
      feeMonth: "June",
      totalDue: "₹4,800",
      status: "Pending"
    },
  ];

  const uniqueClasses = [...new Set(receipts.map((r) => r.class))];
  const uniqueSections = [...new Set(receipts.map((r) => r.section))];
  const uniqueMonths = [...new Set(receipts.map((r) => r.feeMonth))];
  const uniquePaymentModes = [...new Set(receipts.map((r) => r.totalDue))];

  const filteredReceipts = receipts.filter((r) => {
    const matchesSearch =
      r.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.receiptNo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass = selectedClass ? r.class === selectedClass : true;
    const matchesSection = selectedSection ? r.section === selectedSection : true;
    const matchesMonth = selectedMonth ? r.feeMonth === selectedMonth : true;
    const matchesPayment = selectedPaymentMode ? r.totalDue === selectedPaymentMode : true;

    return matchesSearch && matchesClass && matchesSection && matchesMonth && matchesPayment;
  });

  const actualItemsPerPage =
    itemsPerPage === "All" ? filteredReceipts.length : Number(itemsPerPage);

  const indexOfLastItem = currentPage * actualItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - actualItemsPerPage;

  const paginatedReceipts =
    itemsPerPage === "All"
      ? filteredReceipts
      : filteredReceipts.slice(indexOfFirstItem, indexOfLastItem);

  const navigate = useNavigate();

  const params = useParams();

  const receiptId = params.id;

  return (
    <div className="box-shadow mt-3 bg-white rounded-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 p-4 items-center">
        <p className="flex flex-col">
          <span className="text-[16px] md:text-[18px] text-[#1c1c1c] font-semibold font-[ 'Segoe UI']">
            Pending Fees Collection
          </span>
          <span className=" text-[14px] font-semibold font-[ 'Segoe UI'] text-[#9C9C9C]">Manage & trace outstanding student Fee payments</span>
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mt-3 p-4 flex flex-wrap items-center gap-5">
        {/* Search */}
        <div className="flex-1 min-w-[220px]">
          <input
            type="search"
            placeholder="🔎 Search Student..."
            className="w-full bg-[#EEEEEE] rounded-lg px-4 py-2 outline-none text-sm"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>

        <div className="flex gap-2 items-center">

          {/* Class Filter */}
          <CustomSelect
            options={uniqueClasses}
            value={selectedClass}
            onChange={(v) => { setSelectedClass(v); setCurrentPage(1); }}
            placeholder="Classes"
          />

          {/* Section Filter */}
          <CustomSelect
            options={uniqueSections.map((s) => s)}
            value={selectedSection}
            onChange={(v) => { setSelectedSection(v); setCurrentPage(1); }}
            placeholder="Sections"
            className="font-[Segoe UI]"
          />

          {/* Month Filter */}
          <CustomSelect
            options={uniqueMonths}
            value={selectedMonth}
            onChange={(v) => { setSelectedMonth(v); setCurrentPage(1); }}
            placeholder="Month"
            className="font-[Segoe UI]"
          />
        </div>
          {/* Payment Mode Filter */}
          <CustomSelect
            options={uniquePaymentModes}
            value={selectedPaymentMode}
            onChange={(v) => { setSelectedPaymentMode(v); setCurrentPage(1); }}
            placeholder="Payment Mode"
            className="font-[Segoe UI]"
          />
        </div>

      {/* Table */}
      <div className="p-4">
        <div className="w-full overflow-x-auto border border-[#E6E6E6] rounded-lg">
          <table className="w-full">
            <thead className="bg-[#F5F7F7]">
              <tr>
                {["Student", "Class", "Fee Month", "Total Due", "Due Date", "Status", "Action"].map(
                  (h) => (
                    <th key={h} className="px-4 py-3 text-left text-[#1C1C1C] text-[16px] font-semibold font-[ 'Segoe UI'] whitespace-nowrap">
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedReceipts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-gray-500">
                    No Fee Receipts Found
                  </td>
                </tr>
              ) : (
                paginatedReceipts.map((receipt) => (
                  <tr key={receipt.id} className="border-b border-[#E6E6E6] text-[#1C1C1C] text-[16px] font-[ 'Segoe UI']">


                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                          {receipt.profileImage ? (
                            <img
                              src={receipt.profileImage}
                              alt={receipt.student}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-sm">
                              {receipt.student?.charAt(0) || "S"}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col leading-tight">
                          <span className="text-[#12516E] font-semibold text-[14px]">
                            {receipt.student || "N/A"}
                          </span>
                          <span className="text-sm text-[#9C9C9C] font-semibold">
                            {receipt.receiptNo || "ID N/A"}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-[#1C1C1C] text-[14px] font-medium font-[ 'Segoe UI']">{receipt.class} {receipt.section}</td>
                    <td className="px-4 py-3 text-[#1C1C1C] text-[14px] font-medium font-[ 'Segoe UI']">{receipt.feeMonth}</td>
                    <td className="px-4 py-3 text-[#DC2626] text-[14px] font-medium font-[ 'Segoe UI'] whitespace-nowrap']">{receipt.totalDue}</td>

                    <td className="px-4 py-3 font-semibold text-[#1C1C1C]  text-[14px] font-medium font-[ 'Segoe UI']">
                      {receipt.dueDate}
                    </td>

                    <td className="px-4 py-3 text-[#1C1C1C] text-[14px] font-medium font-[ 'Segoe UI']">
                      <span className="px-3 py-1 rounded bg-[#F8D7DA] text-[#C92131] text-[14px] font-medium">
                        {receipt.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-[#9C9C9C] text-[14px] font-medium font-[ 'Segoe UI']">
                      <button>
                        <LuSend size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredReceipts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            total={filteredReceipts.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
            onItemsPerPageChange={(newPerPage) => {
              setItemsPerPage(newPerPage);
              setCurrentPage(1);
            }}
            itemsPerPageOptions={[10, 20, 50, 100, "All"]}
          />
        )}
      </div>

    </div>
  )
}

export default PendingFees