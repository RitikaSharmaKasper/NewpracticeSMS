import React, { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineArrowDropDown } from "react-icons/md";

const CustomSelect = ({ options, value, onChange, placeholder, className = "" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative w-full">
      <div
        onClick={() => setOpen(!open)}
        className={`rounded-xl px-3 py-[10px] flex items-center gap-2 cursor-pointer w-full ${className}`}
      >
        <span className={`flex-1 text-[14px] font-['Segoe_UI'] ${value ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}`}>
          {value || placeholder || "Select"}
        </span>
        <MdOutlineArrowDropDown
          size={18}
          className={`text-[#696969] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && (
        <div className="absolute top-full mt-1 w-full bg-white border border-[#D1D5DB] rounded-xl shadow-md z-50 overflow-hidden">
          <div
            onClick={() => { onChange(""); setOpen(false); }}
            className={`px-4 py-[10px] cursor-pointer text-[14px] font-['Segoe_UI'] hover:bg-gray-50 ${value === "" ? "bg-blue-50 text-blue-600" : "text-[#9C9C9C]"}`}
          >
            {placeholder || "Select"}
          </div>
          {options.map((item) => (
            <div
              key={item}
              onClick={() => { onChange(item); setOpen(false); }}
              className={`px-4 py-[10px] cursor-pointer text-[14px] font-['Segoe_UI'] hover:bg-gray-50 ${value === item ? "bg-blue-50 text-blue-600" : "text-[#1C1C1C]"}`}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CLASS_OPTIONS = [
  "Class 1", "Class 2", "Class 3", "Class 4",
  "Class 5", "Class 6", "Class 7", "Class 8",
  "Class 9", "Class 10", "Class 11", "Class 12",
];

const FREQUENCY_OPTIONS = ["Monthly", "Quarterly", "Annually", "Half Yearly"];
const STATUS_OPTIONS = ["Active", "Inactive"];

function FeeParticulars() {
  const [showModal, setShowModal] = useState(false);
  const [feeList, setFeeList] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [formData, setFormData] = useState({
    feeName: "",
    description: "",
    applicableClass: "",
    frequency: "",
    status: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateFee = () => {
    if (!formData.feeName) return;
    setFeeList((prev) => [...prev, formData]);
    setFormData({ feeName: "", description: "", applicableClass: "", frequency: "", status: "" });
    setShowModal(false);
  };

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-lg font-['Segoe_UI']">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
        <div>
          <p className="flex flex-col">
            <span className="text-[16px] md:text-[18px] text-[#1c1c1c] font-semibold font-['Segoe_UI']">Fee Particular</span>
            <span className="text-sm text-[#696969] font-['Segoe_UI']">Manage different type of fee categories</span>
          </p>
        </div>
        <div className="flex gap-3" onClick={() => setShowModal(true)}>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#0B3142] text-white font-semibold text-[16px] border border-[#0B3142] rounded-lg font-['Segoe_UI']">
            <IoMdAdd className="text-white" />
            Add Fee Particular
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="mt-6 flex items-center gap-6">
        <div className="flex-1">
          <input
            type="search"
            placeholder="🔎︎ Search Student by name or admission Number..."
            className="w-full bg-[#EEEEEE] rounded-lg px-4 py-2 font-['Segoe_UI'] text-[14px] outline-none border border-transparent focus:border-[#D1D5DB]"
          />
        </div>
        <div className="flex items-center gap-2">
          {/* Status filter — kept with bg since it's outside the modal */}
          <div className="border border-[#D1D5DB] rounded-xl">
            <CustomSelect
              options={STATUS_OPTIONS}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Status"
              className="bg-white min-w-[110px]"
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6 relative font-['Segoe_UI']"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <span className="text-[18px] text-[#1c1c1c] font-semibold font-['Segoe_UI']">Add New Fee Particular</span>
                <span className="text-[#696969] font-normal text-[14px] font-['Segoe_UI']">Define a new fee category for the school</span>
              </div>
              <button onClick={() => setShowModal(false)} className="text-xl">
                <IoClose size={28} />
              </button>
            </div>

            {/* Fee Name */}
            <div className="mt-6 flex flex-col gap-1">
              <label htmlFor="feeName" className="text-[14px] font-semibold text-[#1C1C1C] font-['Segoe_UI']">Fee</label>
              <div className="w-full border border-[#D1D5DB] rounded-xl px-3 py-[14px] focus-within:border-[#0B3142] transition-colors">
                <input
                  type="text"
                  placeholder="Particular Fees (e.g : tution fee)"
                  id="feeName"
                  value={formData.feeName}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none border-none text-[14px] font-['Segoe_UI'] text-[#1C1C1C] placeholder:text-[#9C9C9C]"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-3 flex flex-col gap-1">
              <label htmlFor="description" className="text-[14px] font-semibold text-[#1C1C1C] font-['Segoe_UI']">Description</label>
              <div className="w-full border border-[#D1D5DB] rounded-xl px-3 py-[14px] focus-within:border-[#0B3142] transition-colors">
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide a brief description of the fee..."
                  className="w-full resize-none outline-none border-none text-[14px] font-['Segoe_UI'] text-[#1C1C1C] placeholder:text-[#9C9C9C]"
                />
              </div>
            </div>

            {/* Applicable Class, Frequency, Status */}
            <div className="mt-3 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 items-start">

              {/* Applicable Class */}
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-semibold text-[#1C1C1C] font-['Segoe_UI']">Applicable Class</label>
                <div className="rounded-xl border border-[#D1D5DB]">
                  <CustomSelect
                    options={CLASS_OPTIONS}
                    className="bg-white w-full"
                    value={formData.applicableClass}
                    onChange={handleSelectChange("applicableClass")}
                    placeholder="Select Class"
                  />
                </div>
              </div>

              {/* Frequency */}
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-semibold text-[#1C1C1C] font-['Segoe_UI']">Frequency</label>
                <div className="rounded-xl border border-[#D1D5DB]">
                  <CustomSelect
                    options={FREQUENCY_OPTIONS}
                    className="bg-white w-full"
                    value={formData.frequency}
                    onChange={handleSelectChange("frequency")}
                    placeholder="Select Frequency"
                  />
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-semibold text-[#1C1C1C] font-['Segoe_UI']">Status</label>
                <div className="rounded-xl border border-[#D1D5DB]">
                  <CustomSelect
                    options={STATUS_OPTIONS}
                    className="bg-white w-full"
                    value={formData.status}
                    onChange={handleSelectChange("status")}
                    placeholder="Select Status"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6 justify-end">
              <button
                className="flex items-center gap-2 px-6 py-3 text-[#696969] font-semibold text-[14px] border border-[#9C9C9C] rounded-lg font-['Segoe_UI'] hover:bg-gray-50 transition-colors"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 bg-[#0B3142] text-white font-semibold text-[14px] border border-[#0B3142] rounded-lg font-['Segoe_UI'] hover:bg-[#0d3d52] transition-colors"
                onClick={handleCreateFee}
              >
                Create Fee Head
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fee Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        {feeList.map((fee, index) => (
          <div key={index} className="p-4 rounded-xl border border-[#D1D5DB]">
            <div className="flex justify-between">
              <span className="text-[18px] text-[#1C1C1C] font-normal font-['Segoe_UI']">{fee.feeName}</span>
              <span className={`${fee.status === "Active" ? "bg-[#D4EDDA] text-[#009638]" : "text-[#DC2626] bg-[#F8D7DA]"} rounded`}>
                <span className="px-2 py-1 text-[13px] font-['Segoe_UI'] font-medium">{fee.status}</span>
              </span>
            </div>
            <div className="mt-6">
              <div className="flex flex-col gap-2">
                <span className="text-[14px] font-normal text-[#696969] font-['Segoe_UI']">{fee.description}</span>
                <span className="px-2 py-1 border border-[#D1D5DB] w-fit text-[13px] font-normal text-[#1c1c1c] rounded font-['Segoe_UI']">
                  {fee.frequency}
                </span>
              </div>
            </div>
            <div className="flex justify-between gap-2 mt-6">
              <button className="flex gap-2 w-[75%] items-center px-3 py-2 rounded-lg border border-[#E6E6E6] bg-[#0B3142] text-white text-[14px] font-semibold font-['Segoe_UI']">
                <FiEdit size={16} />
                Edit
              </button>
              <button className="flex gap-2 w-[25%] items-center px-3 py-2 rounded-lg border border-[#D1D5DB] text-[#DC2626] text-[14px] font-semibold font-['Segoe_UI']">
                <RiDeleteBinLine size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeeParticulars;