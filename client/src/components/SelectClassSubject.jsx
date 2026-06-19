import React, { useState, useEffect, useRef } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { toast } from "react-toastify";
import api from "../config/axiosInstance";


// ================= CUSTOM SELECT =================
const CustomSelect = ({ options = [], value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {/* SELECT BOX */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="w-full bg-white border border-[#E6E6E6] rounded-xl px-4 py-3 flex justify-between items-center cursor-pointer"
      >
        <span className={value ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}>
          {value || placeholder}
        </span>

        <MdOutlineArrowDropDown
          size={20}
          className={`text-[#9C9C9C] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border rounded-xl shadow z-50 max-h-60 overflow-y-auto">
          {options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`px-4 py-3 cursor-pointer ${
                value === opt
                  ? "bg-blue-100 text-blue-600"
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

// ================= MAIN COMPONENT =================
const SelectClassSubject = ({ formData, setFormData }) => {
  const [classOptions, setClassOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);

  

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
        cls.className === formData.className &&
        cls.section === formData.section
    )
  );

  // ================= HANDLE CHANGE =================
  const handleChange = (name, value) => {
  if (name === "className") {
    const matchedClasses = classOptions.filter(
      (cls) => cls.className === value
    );

    const sections = [
      ...new Set(matchedClasses.map((c) => c.section)),
    ];

    setSectionOptions(sections);

    setFormData((prev) => ({
      ...prev,
      className: value,
      section: "",
      subject: "",
    }));

    return;
  }

  if (name === "section") {
    setFormData((prev) => ({
      ...prev,
      section: value,
      subject: "",
    }));

    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      {/* CLASS */}
      <div>
        <label className="text-sm text-gray-600">Class</label>
        <CustomSelect
          options={[...new Set(classOptions.map((c) => c.className))]}
          value={formData.className}
          onChange={(val) => handleChange("className", val)}
          placeholder="Select Class"
        />
      </div>

      {/* SECTION */}
      <div>
        <label className="text-sm text-gray-600">Section</label>
        <CustomSelect
          options={sectionOptions}
          value={formData.section}
          onChange={(val) => handleChange("section", val)}
          placeholder="Select Section"
        />
      </div>

      {/* SUBJECT */}
      <div>
        <label className="text-sm text-gray-600">Subject</label>
        <CustomSelect
          options={filteredSubjects.map((s) => s.subjectName)}
          value={formData.subject}
          onChange={(val) => handleChange("subject", val)}
          placeholder="Select Subject"
        />
      </div>
    </div>
  );
};

export default SelectClassSubject;