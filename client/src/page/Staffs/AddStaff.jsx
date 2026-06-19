import React, { useRef, useState } from "react";
import { MdClass, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BsUpload } from "react-icons/bs";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { RiFileList3Fill } from "react-icons/ri";
import { CiViewList } from "react-icons/ci";
import styled from "styled-components";
import StaffDetails from "./StaffDetails";
import staff_pro from "../../assets/images/staff-profile.png";

import deleteIcon from "../../assets/images/delete-2.png";

import { toast } from "react-toastify";
import { Country, State, City } from "country-state-city";
import { useMutation } from "@tanstack/react-query";
import api from "../../config/axiosInstance";
import { useEffect } from "react";
import ReactSelect from "react-select";
import CreatableSelect from "react-select/creatable";

const Select = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  }
 
`;

const steps = [
  { title: "Personal Information", icon: <LuUser size={24} /> },
  {
    title: "Qualification & Experience",
    icon: <HiOutlineDocumentText size={24} />,
  },
  {
    title: "Job/ Employment Detail",
    icon: <HiOutlineDocumentText size={24} />,
  },
  { title: "Upload Documents", icon: <HiOutlineDocumentText size={24} /> },
  { title: "Review & Submit", icon: <CiViewList size={24} /> },
];

/* =======================
   Main Component
======================= */
const AddStaff = () => {
  // Dropdown visibility states
  const [showQualificationDropdown, setShowQualificationDropdown] =
    useState(false);
  const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);

  const profileInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [preview, setPreview] = useState(null);
  const [step, setStep] = useState(1);
  const [rows, setRows] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [showInput, setShowInput] = useState(false);

  const [showBloodGroupDropdown, setShowBloodGroupDropdown] = useState(false);
  const [showMaritalStatusDropdown, setShowMaritalStatusDropdown] =
    useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const countries = Country.getAllCountries();
  const [form, setForm] = useState({
    degree: "",
    institution: "",
    year: "",
    percentage: "",
  });
  // Add these state declarations with your other useState hooks
  const [showEmployeeTypeDropdown, setShowEmployeeTypeDropdown] =
    useState(false);
  const [showWorkShiftDropdown, setShowWorkShiftDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showStaffCategoryDropdown, setShowStaffCategoryDropdown] =
    useState(false);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [showPermanentCountryDropdown, setShowPermanentCountryDropdown] =
    useState(false);
  const [showPermanentStateDropdown, setShowPermanentStateDropdown] =
    useState(false);
  const [searchPermanentCountry, setSearchPermanentCountry] = useState("");
  const [searchPermanentState, setSearchPermanentState] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  const [searchState, setSearchState] = useState("");
  const [showNationalityDropdown, setShowNationalityDropdown] = useState(false);
  const [isDOBCalendarOpen, setIsDOBCalendarOpen] = useState(false);
  const [currentDOBCalendarDate, setCurrentDOBCalendarDate] = useState(
    new Date(),
  );
  const dobCalendarRef = useRef(null);
  const [showChildrenDropdown, setShowChildrenDropdown] = useState(false);
  const [showOccupationDropdown, setShowOccupationDropdown] = useState(false);
  const [searchNationality, setSearchNationality] = useState("");
  const [showReligionDropdown, setShowReligionDropdown] = useState(false);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    profilePhoto: null,
    staffName: "",
    dob: "",
    gender: "",
    aadhaarNumber: "",
    panNumber: "",
    nationality: "",
    category: "",
    religion: "",
    bloodGroup: "",
    languageKnown: [],
    maritalStatus: "",
    spouseName: "",
    spouseOccupation: "",
    spousePhone: "",
    numberOfChildren: "",
    fatherName: "",
    motherName: "",

    mobileNumber: "",
    alternateMobile: "",
    email: "",
    emergencyPhone: "",
    emergencyName: "",
    emergencyRelation: "",

    currentAddressLine: "",
    currentCountry: "",
    currentState: "",
    currentCity: "",
    currentPinCode: "",

    sameAsCurrent: false,

    permanentAddressLine: "",
    permanentCountry: "",
    permanentState: "",
    permanentCity: "",
    permanentPinCode: "",

    highestQualification: "",
    specialization: "",
    totalExperience: "",

    role: "",
    roleName: "",
    staffCategory: "",
    department: "",
    employeeId: "",
    dateOfJoining: "",
    employeeType: "",
    workShift: "",
    drivingLicenseNumber: "",

    bankName: "",
    accountNumber: "",
    ifscCode: "",
    uanNumber: "",

    documentTitle: "",
    documentFile: null,
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handleDOBPrevMonth = () => {
    setCurrentDOBCalendarDate(
      new Date(
        currentDOBCalendarDate.getFullYear(),
        currentDOBCalendarDate.getMonth() - 1,
        1,
      ),
    );
  };

  const handleDOBNextMonth = () => {
    setCurrentDOBCalendarDate(
      new Date(
        currentDOBCalendarDate.getFullYear(),
        currentDOBCalendarDate.getMonth() + 1,
        1,
      ),
    );
  };

  const renderDOBCalendarDays = () => {
    const year = currentDOBCalendarDate.getFullYear();
    const month = currentDOBCalendarDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const startDayOfWeek = firstDayOfMonth.getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];

    // Empty cells for days before month starts
    for (let i = 0; i < startDayOfWeek; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    // Get today's date in local timezone
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      // Format date as YYYY-MM-DD using local timezone
      const formattedMonth = String(month + 1).padStart(2, "0");
      const formattedDay = String(day).padStart(2, "0");
      const dateString = `${year}-${formattedMonth}-${formattedDay}`;
      const isSelected = formData.dob === dateString;
      // Add these state declarations with your other useState hooks

      // Check if this date is today using local timezone comparison
      const isToday =
        year === todayYear && month === todayMonth && day === todayDate;

      calendarDays.push(
        <button
          key={day}
          type="button"
          onClick={() => {
            const event = { target: { name: "dob", value: dateString } };
            handleFormChange(event);
            setIsDOBCalendarOpen(false);
          }}
          className={`h-8 w-8 rounded-full text-sm transition-colors cursor-pointer flex items-center justify-center
          ${isSelected ? "bg-[#0B3142] text-white" : "hover:bg-[#F5F7F7] text-[#1C1C1C]"}
          ${isToday && !isSelected ? "border border-[#0B3142] font-semibold" : ""}
        `}
        >
          {day}
        </button>,
      );
    }

    return calendarDays;
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dobCalendarRef.current &&
        !dobCalendarRef.current.contains(e.target)
      ) {
        setIsDOBCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleAdd = () => {
    if (
      !form.degree.trim() ||
      !form.institution.trim() ||
      !form.year.trim() ||
      !form.percentage.trim()
    ) {
      toast.error("Please fill all fields  Educational Qualifications");
      return;
    }

    setRows([...rows, form]);
    setForm({
      degree: "",
      institution: "",
      year: "",
      percentage: "",
    });
    setShowInput(false);
  };

  const handleDelete = (index) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
  };

  const handleMultipleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);

    setUploadedDocuments((prev) => [...prev, ...files]);
  };

  const handleProfileClick = () => {
    profileInputRef.current.click();
  };

  const handleDocumentClick = () => {
    documentInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    const imageURL = URL.createObjectURL(file);

    setPreview(imageURL);

    setFormData({
      ...formData,
      profilePhoto: file,
    });
  };

  const handleDocumentFileChange = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter(
      (file) =>
        file.type === "application/pdf" || file.type.startsWith("image/"),
    );

    if (validFiles.length !== files.length) {
      toast.error("Only PDF and Image files are allowed");
    }

    const formattedFiles = validFiles.map((file) => ({
      file,
      title: "",
    }));

    setUploadedDocuments((prev) => [...prev, ...formattedFiles]);

    e.target.value = "";
  };

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // add arry of objects to form data in qualification and experience
  const qualificationOptions = [
    "Select qualification",
    "Primary School",
    "Middle School",
    "High School",
    "Secondary School",
    "Higher Secondary / Senior Secondary",
    "Certificate",
    "Diploma",
    "Associate Degree",
    "Bachelor's Degree",
    "Postgraduate Diploma",
    "Master's Degree",
    "Doctorate (PhD)",
    "Professional Degree",
    "Vocational Training",
    "Other",
  ];
  // Job / Employment Detail
  // const roleOptions = [
  //   "Select Role",
  //   "Teacher",
  //   "Principal",
  //   "Vice Principal",
  //   "Coordinator",
  //   "Accountant",
  //   "HR",
  //   "Librarian",
  //   "Counselor",
  //   "Lab Assistant",
  //   "Receptionist",
  //   "Transport Manager",
  //   "Admin",
  // ];

  const staffCategoryOptions = [
    "Select Category",
    "Teaching",
    "Non-Teaching",
    "Administration",
    "Support",
    "Management",
  ];

  const departmentOptions = [
    "Select department",
    "Mathematics",
    "Science",
    "English",
    "Social Studies",
    "Computer",
    "Accounts",
    "HR",
    "Administration",
    "Library",
    "Sports",
    "Transport",
  ];

  const employeeTypeOptions = [
    "Select employeeType",
    "Full Time",
    "Part Time",
    "Contract",
    "Temporary",
    "Permanent",
  ];
  const experienceOptions = [...Array(31)].map((_, index) => ({
    value: index,
    label: `${index} ${index === 1 ? "Year" : "Years"}`,
  }));

  const workShiftOptions = [
    " Select Workshift",
    "Morning",
    "Afternoon",
    "Evening",
    "Night",
    "General",
  ];

  // add the Next button is still moving without checking validation for each step before allowing the user to proceed to the next step.

  const validateStep = () => {
    if (step === 1) {
      if (!formData.staffName.trim()) {
        toast.error("Staff name is required");
        return false;
      }
      if (!formData.dob) {
        toast.error("Date of birth is required");
        return false;
      }
      if (!formData.gender) {
        toast.error("Gender is required");
        return false;
      }
      if (!/^\d{12}$/.test(formData.aadhaarNumber)) {
        toast.error("Aadhaar must be 12 digits");
        return false;
      }
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
        toast.error("Enter valid PAN number");
        return false;
      }
      if (!formData.nationality) {
        toast.error("Nationality is required");
        return false;
      }
      if (!formData.maritalStatus) {
        toast.error("Marital status is required");
        return false;
      }
      if (!formData.fatherName.trim()) {
        toast.error("Father name is required");
        return false;
      }
      if (!formData.motherName.trim()) {
        toast.error("Mother name is required");
        return false;
      }
      if (!/^\d{10}$/.test(formData.mobileNumber)) {
        toast.error("Mobile number must be 10 digits");
        return false;
      }
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        toast.error("Enter valid email");
        return false;
      }
      if (!/^\d{10}$/.test(formData.emergencyPhone)) {
        toast.error("Emergency phone must be 10 digits");
        return false;
      }
    }

    if (step === 2) {
      if (
        !formData.highestQualification ||
        formData.highestQualification === "Select qualification"
      ) {
        toast.error("Highest qualification is required");
        return false;
      }

      if (!formData.totalExperience && formData.totalExperience !== 0) {
        toast.error("Total experience is required");
        return false;
      }

      if (rows.length === 0) {
        toast.error("Add at least one educational qualification");
        return false;
      }
    }

    if (step === 3) {
      if (!formData.role || formData.role === "Select Role") {
        toast.error("Role is required");
        return false;
      }
      if (
        !formData.staffCategory ||
        formData.staffCategory === "Select Category"
      ) {
        toast.error("Staff category is required");
        return false;
      }
      if (!formData.department || formData.department === "Select department") {
        toast.error("Department is required");
        return false;
      }
      if (!formData.dateOfJoining) {
        toast.error("Date of joining is required");
        return false;
      }
      if (
        !formData.employeeType ||
        formData.employeeType === "Select employeeType"
      ) {
        toast.error("Employee type is required");
        return false;
      }
      if (
        !formData.workShift ||
        formData.workShift.trim() === "Select Workshift"
      ) {
        toast.error("Work shift is required");
        return false;
      }
    }

    if (step === 4) {
      if (uploadedDocuments.length === 0) {
        toast.error("Please upload at least one document");
        return false;
      }

      if (uploadedDocuments.some((doc) => !doc.title?.trim())) {
        toast.error("Please enter title for every document");
        return false;
      }
    }

    return true;
  };

  // post rote for create staff in backend
  const createStaffMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/staff/create-staff", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    },

    onSuccess: () => {
      toast.success("Staff created successfully");
      navigate("/all-staffs");
    },

    onError: (error) => {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Failed to create staff");
    },
  });

  const handleSubmit = () => {
    const payload = new FormData();

    payload.append("personalInfo[staffName]", formData.staffName);
    payload.append("personalInfo[dob]", formData.dob);
    payload.append("personalInfo[gender]", formData.gender);
    payload.append("personalInfo[aadhaarNumber]", formData.aadhaarNumber);
    payload.append("personalInfo[panNumber]", formData.panNumber);
    payload.append("personalInfo[nationality]", formData.nationality);
    payload.append("personalInfo[category]", formData.category);
    payload.append("personalInfo[religion]", formData.religion);
    payload.append("personalInfo[bloodGroup]", formData.bloodGroup);
    payload.append(
      "personalInfo[languageKnown]",
      JSON.stringify(formData.languageKnown),
    );
    payload.append("personalInfo[maritalStatus]", formData.maritalStatus);
    payload.append("personalInfo[spouseName]", formData.spouseName);
    payload.append("personalInfo[spouseOccupation]", formData.spouseOccupation);
    payload.append("personalInfo[spousePhone]", formData.spousePhone);
    payload.append("personalInfo[numberOfChildren]", formData.numberOfChildren);
    payload.append("personalInfo[fatherName]", formData.fatherName);
    payload.append("personalInfo[motherName]", formData.motherName);

    payload.append("contactInfo[mobileNumber]", formData.mobileNumber);
    payload.append("contactInfo[alternateMobile]", formData.alternateMobile);
    payload.append("contactInfo[email]", formData.email);
    payload.append("contactInfo[emergencyPhone]", formData.emergencyPhone);
    payload.append("contactInfo[emergencyName]", formData.emergencyName);
    payload.append(
      "contactInfo[emergencyRelation]",
      formData.emergencyRelation,
    );

    payload.append("currentAddress[addressLine]", formData.currentAddressLine);
    payload.append("currentAddress[country]", formData.currentCountry);
    payload.append("currentAddress[state]", formData.currentState);
    payload.append("currentAddress[city]", formData.currentCity);
    payload.append("currentAddress[pinCode]", formData.currentPinCode);

    payload.append(
      "permanentAddress[addressLine]",
      formData.permanentAddressLine,
    );
    payload.append("permanentAddress[country]", formData.permanentCountry);
    payload.append("permanentAddress[state]", formData.permanentState);
    payload.append("permanentAddress[city]", formData.permanentCity);
    payload.append("permanentAddress[pinCode]", formData.permanentPinCode);

    payload.append(
      "qualificationInfo[highestQualification]",
      formData.highestQualification,
    );
    payload.append(
      "qualificationInfo[specialization]",
      formData.specialization,
    );
    payload.append(
      "qualificationInfo[totalExperience]",
      formData.totalExperience,
    );
    payload.append("qualificationInfo[qualifications]", JSON.stringify(rows));

    payload.append("employmentInfo[role]", formData.role);
    payload.append("employmentInfo[staffCategory]", formData.staffCategory);
    payload.append("employmentInfo[department]", formData.department);
    payload.append("employmentInfo[employeeId]", formData.employeeId);
    payload.append("employmentInfo[dateOfJoining]", formData.dateOfJoining);
    payload.append("employmentInfo[employeeType]", formData.employeeType);
    payload.append("employmentInfo[workShift]", formData.workShift);
    payload.append(
      "employmentInfo[drivingLicenseNumber]",
      formData.drivingLicenseNumber,
    );

    payload.append("bankInfo[bankName]", formData.bankName);
    payload.append("bankInfo[accountNumber]", formData.accountNumber);
    payload.append("bankInfo[ifscCode]", formData.ifscCode);
    payload.append("bankInfo[uanNumber]", formData.uanNumber);


    if (formData.profilePhoto) {
      payload.append("profilePhoto", formData.profilePhoto);
    }

    uploadedDocuments.forEach((doc) => {
      payload.append("documents", doc.file);
      payload.append("documentTitles", doc.title);
    });

    createStaffMutation.mutate(payload);
  };

  const languageOptions = [
    { value: "Hindi", label: "Hindi" },
    { value: "English", label: "English" },
    { value: "Punjabi", label: "Punjabi" },
    { value: "Urdu", label: "Urdu" },
    { value: "Malayalam", label: "Malayalam" },
    { value: "Bengali", label: "Bengali" },
    { value: "Bhojpuri", label: "Bhojpuri" },
    { value: "Gujarati", label: "Gujarati" },
    { value: "Marathi", label: "Marathi" },
    { value: "Tamil", label: "Tamil" },
    { value: "Telugu", label: "Telugu" },
    { value: "Kannada", label: "Kannada" },
    { value: "Other", label: "Other" },
  ];

  // role fetch data
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get("/role/getRole");
        setRoles(res.data.data || []);
      } catch (error) {
        toast.error("Failed to fetch roles");
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className="space-y-6" style={{ fontFamily: "Segoe Ui" }}>
      {/* ===== Breadcrumb ===== */}
      <div className="flex gap-1 items-center text-[#696969]">
        <span
          className="text-2xl font-semibold cursor-pointer hover:text-black"
          onClick={() => navigate("/all-staffs")}
        >
          All Staff
        </span>
        <MdOutlineKeyboardArrowRight className="text-2xl mt-1" />
        <span className="text-2xl font-semibold text-black">Add Staff</span>
      </div>

      {/* ===== Container ===== */}
      <div className="bg-white box-shadow rounded-xl p-6  flex flex-col gap-[48px]">
        {/* ===== Header ===== */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label
            className="text-[14px] md:text-[16px] lg:text-[18px]"
            style={{ color: "#1C1C1C", fontWeight: "600" }}
          >
            Add New Staff Member
          </label>
          <label
            className="text-[12px] md:text-[14px] lg:text-[16px]"
            style={{ color: "#9C9C9C", fontWeight: "400", fontSize: "14px" }}
          >
            Enter staff member information to add to the system.
          </label>
        </div>

        {/* <------------------------------------ Stepper -----------------------> */}
        <div className="px-10 sm:px-30 md:px-50 mt-8 pb-24">
          <div className="relative h-2 bg-[#eeeeee] rounded-full">
            {/* Active progress line */}
            <div
              className="absolute top-0 left-0 h-2 bg-[#E9C05A] rounded-full transition-all duration-500"
              style={{
                width: `${((step - 1) / (steps.length - 1.1)) * 100}%`,
              }}
            />

            <div className="absolute -top-6 left-0 w-full flex justify-between">
              {steps.map((item, index) => {
                const currentStep = index + 1;
                const isActive = step === currentStep;
                const isCompleted = step > currentStep;

                return (
                  <div
                    key={index}
                    onClick={() => setStep(currentStep)}
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-full shadow-sm transition
              ${
                isActive || isCompleted
                  ? "bg-[#E9C05A] text-[#0B3142]"
                  : "bg-[#EEEEEE] text-[#9C9C9C]"
              }`}
                    >
                      {item.icon}
                    </div>

                    <span
                      className={`w-30 mt-5 text-[14px] md:text-[16px] lg:text-[18px] font-semibold leading-tight text-center
              ${isActive || isCompleted ? "text-[#0B3142]" : "text-[#1c1c1c]"}`}
                    >
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* ==============Personal Information Container===================================================== */}
        {step === 1 && (
          <>
            {/* =======================
            1. Employee Information
        ======================= */}

            <section className="space-y-4 ">
              <h2 className="text-lg font-semibold border-l-[3px] border-[#00C950] pl-2">
                1. Employee Information
              </h2>
              <span className="text-[#696969] font-normal  ">
                Profile Photo
              </span>

              <div className="flex items-center gap-4 mt-2">
                {/* Avatar */}
                <div
                  onClick={handleProfileClick}
                  className="w-24 h-24 rounded-full border-2 border-[#D1D5DC] flex items-center justify-center bg-[#F3F4F6] cursor-pointer overflow-hidden"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BsUpload className="text-3xl text-[#9C9C9C]" />
                  )}
                </div>

                {/* Upload Button */}
                <div>
                  <button
                    type="button"
                    onClick={handleProfileClick}
                    className="text-sm text-[#007AFF] font-normal  bg-[#EFF6FF] px-4 py-1.5 rounded-lg hover:bg-[#007AFF] hover:text-[#EFF6FF] transition"
                  >
                    Upload Photo
                  </button>
                  {/* <p className="text-[11px] text-[#9A9A9A] mt-1">
                JPG, PNG • Max 2MB
              </p> */}
                </div>

                {/* Hidden Input */}
                <input
                  ref={profileInputRef}
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Staff Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    onKeyDown={(e) => {
                      if (/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    required
                    name="staffName"
                    value={formData.staffName}
                    onChange={handleFormChange}
                    placeholder="Enter staff name"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Date of Birth
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative" ref={dobCalendarRef}>
                    <button
                      type="button"
                      onClick={() => setIsDOBCalendarOpen(!isDOBCalendarOpen)}
                      className="w-full px-4 py-3 text-sm bg-white border border-[#9C9C9C] rounded-sm text-left outline-none transition flex justify-between items-center"
                    >
                      <span
                        className={
                          formData.dob ? "text-[#1C1C1C]" : "text-[#696969]"
                        }
                      >
                        {formData.dob ? formData.dob : "Select date of birth"}
                      </span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        className="w-4 h-4 text-[#9C9C9C]"
                      >
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h40v-40h80v40h320v-40h80v40h40q33 0 56.5 23.5T840-760v560q0-33-23.5 33.5T760-120H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
                      </svg>
                    </button>

                    {/* Floating Calendar Container */}
                    {isDOBCalendarOpen && (
                      <div className="absolute left-0 z-50 mt-1 bg-white border border-[#E6E6E6] rounded-[16px] shadow-xl p-4 w-[280px]">
                        {/* Month Controls Header */}
                        <div className="flex justify-between items-center mb-3">
                          <button
                            type="button"
                            onClick={handleDOBPrevMonth}
                            className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-slate-700 font-bold text-sm"
                          >
                            &lt;
                          </button>
                          <span className="text-sm font-semibold text-[#1C1C1C]">
                            {months[currentDOBCalendarDate.getMonth()]}{" "}
                            {currentDOBCalendarDate.getFullYear()}
                          </span>
                          <button
                            type="button"
                            onClick={handleDOBNextMonth}
                            className="p-1 hover:bg-slate-100 rounded-full cursor-pointer text-slate-700 font-bold text-sm"
                          >
                            &gt;
                          </button>
                        </div>

                        {/* Day Headers */}
                        <div className="grid grid-cols-7 gap-1 text-center mb-1">
                          {daysOfWeek.map((day) => (
                            <span
                              key={day}
                              className="text-[11px] font-semibold text-[#9C9C9C] uppercase"
                            >
                              {day}
                            </span>
                          ))}
                        </div>

                        {/* Numeric Days Grid */}
                        <div className="grid grid-cols-7 gap-1 text-center">
                          {renderDOBCalendarDays()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Gender <span className="text-red-500">*</span>
                  </label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() => setShowGenderDropdown(!showGenderDropdown)}
                      className="w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between  transition-colors "
                      style={{
                        outline: "none",
                      }}
                    >
                      <span
                        className={`text-sm ${formData.gender ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.gender || "Select Gender"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${showGenderDropdown ? "" : ""}`}
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

                    {showGenderDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg max-h-60 overflow-y-auto">
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: { name: "gender", value: "Male" },
                            };
                            handleFormChange(event);
                            setShowGenderDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.gender === "Male"
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          Male
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: { name: "gender", value: "Female" },
                            };
                            handleFormChange(event);
                            setShowGenderDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.gender === "Female"
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          Female
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: { name: "gender", value: "Transgender" },
                            };
                            handleFormChange(event);
                            setShowGenderDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.gender === "Transgender"
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          Transgender
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: {
                                name: "gender",
                                value: "Prefer Not to Say",
                              },
                            };
                            handleFormChange(event);
                            setShowGenderDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.gender === "Prefer Not to Say"
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          Prefer Not to Say
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: { name: "gender", value: "Other" },
                            };
                            handleFormChange(event);
                            setShowGenderDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.gender === "Other"
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          Other
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Aadhaar Number
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    required
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");

                      // max 12 digits
                      if (value.length > 12) {
                        value = value.slice(0, 12);
                      }

                      setFormData((prev) => ({
                        ...prev,
                        aadhaarNumber: value,
                      }));
                    }}
                    placeholder="Enter Aadhaar number"
                    maxLength={12}
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />

                  {formData.aadhaarNumber &&
                    formData.aadhaarNumber.length !== 12 && (
                      <span className="text-red-500 text-xs">
                        Aadhaar number must be 12 digits
                      </span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    PAN Number
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    required
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={(e) => {
                      let value = e.target.value.toUpperCase();

                      // allow only A-Z and 0-9
                      value = value.replace(/[^A-Z0-9]/g, "");

                      // max 10 chars
                      if (value.length > 10) {
                        value = value.slice(0, 10);
                      }

                      setFormData((prev) => ({
                        ...prev,
                        panNumber: value,
                      }));
                    }}
                    placeholder="Enter PAN number"
                    maxLength={10}
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />

                  {formData.panNumber &&
                    !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber) && (
                      <span className="text-red-500 text-xs">
                        Enter valid PAN number
                      </span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Nationality <span className="text-red-500">*</span>
                  </label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() =>
                        setShowNationalityDropdown(!showNationalityDropdown)
                      }
                      className="w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors "
                      style={{ outline: "none" }}
                    >
                      <span
                        className={`text-sm ${formData.nationality ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.nationality || "Select Nationality"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${showNationalityDropdown ? "rotate-180" : ""}`}
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

                    {showNationalityDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg max-h-60 overflow-y-auto">
                        {/* Search input inside dropdown */}
                        <div className="sticky top-0 bg-white p-2 border-b border-[#E6E6E6]">
                          <input
                            type="text"
                            placeholder="Search country..."
                            value={searchNationality}
                            onChange={(e) =>
                              setSearchNationality(e.target.value)
                            }
                            className="w-full px-3 py-2 text-sm border border-[#E6E6E6] rounded-md outline-none "
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>

                        <div className="max-h-48 overflow-y-auto">
                          {countries
                            .filter((country) =>
                              country.name
                                .toLowerCase()
                                .includes(searchNationality.toLowerCase()),
                            )
                            .map((country) => (
                              <button
                                key={country.isoCode}
                                type="button"
                                onClick={() => {
                                  const event = {
                                    target: {
                                      name: "nationality",
                                      value: country.name,
                                    },
                                  };
                                  handleFormChange(event);
                                  setShowNationalityDropdown(false);
                                  setSearchNationality("");
                                }}
                                className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                                  formData.nationality === country.name
                                    ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                                    : "text-[#1C1C1C]"
                                }`}
                              >
                                {country.name}
                              </button>
                            ))}

                          {countries.filter((country) =>
                            country.name
                              .toLowerCase()
                              .includes(searchNationality.toLowerCase()),
                          ).length === 0 && (
                            <div className="px-3 py-3 text-sm text-[#696969] text-center">
                              No country found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">Category</label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() =>
                        setShowCategoryDropdown(!showCategoryDropdown)
                      }
                      className="w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors "
                      style={{ outline: "none" }}
                    >
                      <span
                        className={`text-sm ${formData.category ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.category || "Select category"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${showCategoryDropdown ? "" : ""}`}
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
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg max-h-60 overflow-y-auto">
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: { name: "category", value: "General" },
                            };
                            handleFormChange(event);
                            setShowCategoryDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.category === "General"
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          General
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: { name: "category", value: "OBC" },
                            };
                            handleFormChange(event);
                            setShowCategoryDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.category === "OBC"
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          OBC
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: { name: "category", value: "EWS" },
                            };
                            handleFormChange(event);
                            setShowCategoryDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.category === "EWS"
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          EWS
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: { name: "category", value: "SC" },
                            };
                            handleFormChange(event);
                            setShowCategoryDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.category === "SC"
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          SC
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: { name: "category", value: "ST" },
                            };
                            handleFormChange(event);
                            setShowCategoryDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.category === "ST"
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          ST
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">Religion</label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() =>
                        setShowReligionDropdown(!showReligionDropdown)
                      }
                      className="w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors "
                      style={{ outline: "none" }}
                    >
                      <span
                        className={`text-sm ${formData.religion ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.religion || "Select religion"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${showReligionDropdown ? "rotate-180" : ""}`}
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

                    {showReligionDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg max-h-60 overflow-y-auto">
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: { name: "religion", value: "Hindu" },
                            };
                            handleFormChange(event);
                            setShowReligionDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.religion === "Hindu"
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          Hindu
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: { name: "religion", value: "Muslim" },
                            };
                            handleFormChange(event);
                            setShowReligionDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.religion === "Muslim"
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          Muslim
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: { name: "religion", value: "Christian" },
                            };
                            handleFormChange(event);
                            setShowReligionDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.religion === "Christian"
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          Christian
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: { name: "religion", value: "Sikh" },
                            };
                            handleFormChange(event);
                            setShowReligionDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.religion === "Sikh"
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          Sikh
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: { name: "religion", value: "Buddhist" },
                            };
                            handleFormChange(event);
                            setShowReligionDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.religion === "Buddhist"
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          Buddhist
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: { name: "religion", value: "Jain" },
                            };
                            handleFormChange(event);
                            setShowReligionDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.religion === "Jain"
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          Jain
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: { name: "religion", value: "Parsi" },
                            };
                            handleFormChange(event);
                            setShowReligionDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.religion === "Parsi"
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          Parsi
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: { name: "religion", value: "Other" },
                            };
                            handleFormChange(event);
                            setShowReligionDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.religion === "Other"
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          Other
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">Blood Group</label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() =>
                        setShowBloodGroupDropdown(!showBloodGroupDropdown)
                      }
                      className="w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors "
                      style={{ outline: "none" }}
                    >
                      <span
                        className={`text-sm ${formData.bloodGroup ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.bloodGroup || "Select blood group"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${showBloodGroupDropdown ? "rotate-180" : ""}`}
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

                    {showBloodGroupDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg max-h-60 overflow-y-auto">
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                          (bloodGroup) => (
                            <button
                              key={bloodGroup}
                              type="button"
                              onClick={() => {
                                const event = {
                                  target: {
                                    name: "bloodGroup",
                                    value: bloodGroup,
                                  },
                                };
                                handleFormChange(event);
                                setShowBloodGroupDropdown(false);
                              }}
                              className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                                formData.bloodGroup === bloodGroup
                                  ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                                  : "text-[#1C1C1C]"
                              }`}
                            >
                              {bloodGroup === "A+" && "A Positive (A+)"}
                              {bloodGroup === "A-" && "A Negative (A-)"}
                              {bloodGroup === "B+" && "B Positive (B+)"}
                              {bloodGroup === "B-" && "B Negative (B-)"}
                              {bloodGroup === "AB+" && "AB Positive (AB+)"}
                              {bloodGroup === "AB-" && "AB Negative (AB-)"}
                              {bloodGroup === "O+" && "O Positive (O+)"}
                              {bloodGroup === "O-" && "O Negative (O-)"}
                            </button>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Language Known
                  </label>

                  <CreatableSelect
                    isMulti
                    name="languageKnown"
                    options={languageOptions}
                    value={languageOptions
                      .concat(
                        formData.languageKnown
                          .filter(
                            (lang) =>
                              !languageOptions.some(
                                (option) => option.value === lang,
                              ),
                          )
                          .map((lang) => ({
                            value: lang,
                            label: lang,
                          })),
                      )
                      .filter((option) =>
                        formData.languageKnown.includes(option.value),
                      )}
                    onChange={(selectedOptions) => {
                      setFormData((prev) => ({
                        ...prev,
                        languageKnown: selectedOptions
                          ? selectedOptions.map((item) => item.value)
                          : [],
                      }));
                    }}
                    placeholder="Select or type language"
                    className="text-sm"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderColor: state.isFocused ? "#696969" : "#9C9C9C",
                        borderRadius: "4px",
                        minHeight: "46px",
                        boxShadow: state.isFocused
                          ? "0 0 0 2px rgba(105, 105, 105, 0.2)"
                          : "none",
                        "&:hover": {
                          borderColor: "#0B3142",
                        },
                      }),
                      menu: (base) => ({
                        ...base,
                        borderRadius: "4px",
                        overflow: "hidden",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? "#F5F7F7" : "white",
                        color: state.isSelected ? "#0B3142" : "#1C1C1C",
                        fontWeight: state.isSelected ? "500" : "400",
                        "&:hover": {
                          backgroundColor: "#F5F7F7",
                        },
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: "#EFF2F2",
                        borderRadius: "4px",
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: "#1C1C1C",
                        fontSize: "12px",
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        "&:hover": {
                          backgroundColor: "#DC2626",
                          color: "white",
                        },
                      }),
                    }}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Marital Status <span className="text-red-500">*</span>
                  </label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() =>
                        setShowMaritalStatusDropdown(!showMaritalStatusDropdown)
                      }
                      className="w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors "
                      style={{ outline: "none" }}
                    >
                      <span
                        className={`text-sm ${formData.maritalStatus ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.maritalStatus || "Select Marital Status"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${showMaritalStatusDropdown ? "rotate-180" : ""}`}
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

                    {showMaritalStatusDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg overflow-hidden">
                        {[
                          { value: "Single", label: "Single" },
                          { value: "Married", label: "Married" },
                          { value: "divorce", label: "Divorce" },
                          { value: "widowed", label: "Widowed" },
                          { value: "seperated", label: "Separated" },
                        ].map((status) => (
                          <button
                            key={status.value}
                            type="button"
                            onClick={() => {
                              const event = {
                                target: {
                                  name: "maritalStatus",
                                  value: status.value,
                                },
                              };
                              handleFormChange(event);
                              setShowMaritalStatusDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                              formData.maritalStatus === status.value
                                ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                                : "text-[#1C1C1C]"
                            }`}
                          >
                            {status.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Spouse Name
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <input
                    name="spouseName"
                    value={formData.spouseName}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Enter spouse name"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Spouse Occupation
                    {/* <span className="text-red-500">*</span> */}
                  </label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() =>
                        setShowOccupationDropdown(!showOccupationDropdown)
                      }
                      className="w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors "
                      style={{ outline: "none" }}
                    >
                      <span
                        className={`text-sm ${formData.spouseOccupation ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.spouseOccupation || "Select Occupation"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${showOccupationDropdown ? "rotate-180" : ""}`}
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

                    {showOccupationDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg max-h-60 overflow-y-auto">
                        {[
                          "Salaried",
                          "Self-Employed",
                          "Business Owner",
                          "Private Employee",
                          "Government Employee",
                          "Teacher",
                          "Professor",
                          "Doctor",
                          "Engineer",
                          "Lawyer",
                          "Chartered Accountant",
                          "Bank Employee",
                          "IT Professional",
                          "Police Officer",
                          "Defence Personnel",
                          "Nurse",
                          "Pharmacist",
                          "Architect",
                          "Consultant",
                          "Sales Executive",
                          "Marketing Professional",
                          "Entrepreneur",
                          "Farmer",
                          "Shopkeeper",
                          "Freelancer",
                          "Driver",
                          "Electrician",
                          "Technician",
                          "Plumber",
                          "Mechanic",
                          "Contractor",
                          "Homemaker",
                          "Retired",
                          "Student",
                          "Unemployed",
                          "Other",
                        ].map((occupation) => (
                          <button
                            key={occupation}
                            type="button"
                            onClick={() => {
                              const event = {
                                target: {
                                  name: "spouseOccupation",
                                  value: occupation,
                                },
                              };
                              handleFormChange(event);
                              setShowOccupationDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                              formData.spouseOccupation === occupation
                                ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                                : "text-[#1C1C1C]"
                            }`}
                          >
                            {occupation}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Spouse Phone
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <input
                    name="spousePhone"
                    value={formData.spousePhone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");

                      if (value.length <= 10) {
                        setFormData((prev) => ({
                          ...prev,
                          spousePhone: value,
                        }));
                      }
                    }}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="Enter 10 digit number"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Number of Children
                    {/* <span className="text-red-500">*</span> */}
                  </label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() =>
                        setShowChildrenDropdown(!showChildrenDropdown)
                      }
                      className="w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors"
                      style={{ outline: "none" }}
                    >
                      <span
                        className={`text-sm ${formData.numberOfChildren ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.numberOfChildren || "Select"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${showChildrenDropdown ? "rotate-180" : ""}`}
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

                    {showChildrenDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg overflow-hidden">
                        {["0", "1", "2", "3+"].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              const event = {
                                target: {
                                  name: "numberOfChildren",
                                  value: option,
                                },
                              };
                              handleFormChange(event);
                              setShowChildrenDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                              formData.numberOfChildren === option
                                ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                                : "text-[#1C1C1C]"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Father Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    onKeyDown={(e) => {
                      if (/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    required
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleFormChange}
                    placeholder="Enter father name"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Mother Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    onKeyDown={(e) => {
                      if (/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Enter mother name"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />
                </div>
              </div>
            </section>

            {/* =======================
            3. Contact Information
        ======================= */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold border-l-[3px] border-[#FF6900] pl-2">
                3. Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Mobile Number
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="tel"
                    inputMode="numeric"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);

                      setFormData({
                        ...formData,
                        mobileNumber: value,
                      });
                    }}
                    placeholder="Enter mobile number"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Alternate Mobile
                  </label>
                  <input
                    tyep="tel"
                    inputMode="numeric"
                    required
                    name="alternateMobile"
                    value={formData.alternateMobile}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);

                      setFormData({
                        ...formData,
                        alternateMobile: value,
                      });
                    }}
                    type="number"
                    placeholder="Enter alternate number"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Email Address
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    type="email"
                    placeholder="Enter email address"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Emergency Contact Phone
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    required
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      setFormData({
                        ...formData,
                        emergencyPhone: value,
                      });
                    }}
                    placeholder="Enter emergency contact number"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Emergency Contact Name
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <input
                    name="emergencyName"
                    value={formData.emergencyName}
                    // onChange={handleFormChange}
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value.replace(/[0-9]/g, "");
                      setFormData((prev) => ({
                        ...prev,
                        emergencyName: value,
                      }));
                    }}
                    placeholder="Enter Emergency contact name"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Emergency Contact Relation
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <input
                    name="emergencyRelation"
                    value={formData.emergencyRelation}
                    // onChange={handleFormChange}
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value.replace(/[0-9]/g, "");
                      setFormData((prev) => ({
                        ...prev,
                        emergencyRelation: value,
                      }));
                    }}
                    placeholder="Enter Emergency Relation"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold border-b-2 w-92 border-[#12516E] pl-2">
                Current Address
              </h2>

              <div className="grid mt-9 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Address Line
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <input
                    name="currentAddressLine"
                    value={formData.currentAddressLine}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Enter address line"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Country
                    {/* <span className="text-red-500">*</span> */}
                  </label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() =>
                        setShowCountryDropdown(!showCountryDropdown)
                      }
                      className="w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors "
                      style={{ outline: "none" }}
                    >
                      <span
                        className={`text-sm ${formData.currentCountry ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.currentCountry
                          ? Country.getAllCountries().find(
                              (c) => c.isoCode === formData.currentCountry,
                            )?.name || "Select Country"
                          : "Select Country"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${showCountryDropdown ? "rotate-180" : ""}`}
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

                    {showCountryDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg max-h-60 overflow-y-auto">
                        {/* Search input inside dropdown */}
                        <div className="sticky top-0 bg-white p-2 border-b border-[#E6E6E6]">
                          <input
                            type="text"
                            placeholder="Search country..."
                            value={searchCountry}
                            onChange={(e) => setSearchCountry(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-[#E6E6E6] rounded-md outline-none "
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>

                        <div className="max-h-48 overflow-y-auto">
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                currentCountry: "",
                                currentState: "",
                                currentCity: "",
                              });
                              setShowCountryDropdown(false);
                              setSearchCountry("");
                            }}
                            className="w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors text-[#696969]"
                          >
                            Select Country
                          </button>
                          {Country.getAllCountries()
                            .filter((country) =>
                              country.name
                                .toLowerCase()
                                .includes(searchCountry.toLowerCase()),
                            )
                            .map((country) => (
                              <button
                                key={country.isoCode}
                                type="button"
                                onClick={() => {
                                  setFormData({
                                    ...formData,
                                    currentCountry: country.isoCode,
                                    currentState: "",
                                    currentCity: "",
                                  });
                                  setShowCountryDropdown(false);
                                  setSearchCountry("");
                                }}
                                className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                                  formData.currentCountry === country.isoCode
                                    ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                                    : "text-[#1C1C1C]"
                                }`}
                              >
                                {country.name}
                              </button>
                            ))}

                          {Country.getAllCountries().filter((country) =>
                            country.name
                              .toLowerCase()
                              .includes(searchCountry.toLowerCase()),
                          ).length === 0 && (
                            <div className="px-3 py-3 text-sm text-[#696969] text-center">
                              No country found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* state */}
                {/* State */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">State</label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.currentCountry) {
                          toast.error("Please select a country first");
                          return;
                        }
                        setShowStateDropdown(!showStateDropdown);
                      }}
                      className={`w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors  ${
                        !formData.currentCountry
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      style={{ outline: "none" }}
                      disabled={!formData.currentCountry}
                    >
                      <span
                        className={`text-sm ${formData.currentState ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.currentState
                          ? State.getStatesOfCountry(
                              formData.currentCountry,
                            ).find((s) => s.isoCode === formData.currentState)
                              ?.name || "Select State"
                          : "Select State"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${showStateDropdown ? "" : ""}`}
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

                    {showStateDropdown && formData.currentCountry && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg max-h-60 overflow-y-auto">
                        {/* Search input inside dropdown */}
                        <div className="sticky top-0 bg-white p-2 border-b border-[#E6E6E6]">
                          <input
                            type="text"
                            placeholder="Search state..."
                            value={searchState}
                            onChange={(e) => setSearchState(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-[#E6E6E6] rounded-md outline-none"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>

                        <div className="max-h-48 overflow-y-auto">
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                currentState: "",
                                currentCity: "",
                              }));
                              setShowStateDropdown(false);
                              setSearchState("");
                            }}
                            className="w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors text-[#696969]"
                          >
                            Select State
                          </button>
                          {State.getStatesOfCountry(formData.currentCountry)
                            .filter((state) =>
                              state.name
                                .toLowerCase()
                                .includes(searchState.toLowerCase()),
                            )
                            .map((state) => (
                              <button
                                key={state.isoCode}
                                type="button"
                                onClick={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    currentState: state.isoCode,
                                    currentCity: "",
                                  }));
                                  setShowStateDropdown(false);
                                  setSearchState("");
                                }}
                                className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                                  formData.currentState === state.isoCode
                                    ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                                    : "text-[#1C1C1C]"
                                }`}
                              >
                                {state.name}
                              </button>
                            ))}

                          {State.getStatesOfCountry(
                            formData.currentCountry,
                          ).filter((state) =>
                            state.name
                              .toLowerCase()
                              .includes(searchState.toLowerCase()),
                          ).length === 0 && (
                            <div className="px-3 py-3 text-sm text-[#696969] text-center">
                              No state found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    City
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <input
                    name="currentCity"
                    value={formData.currentCity}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Enter city"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Pin code
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <input
                    name="currentPinCode"
                    value={formData.currentPinCode}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 7);
                      setFormData({
                        ...formData,
                        currentPinCode: value,
                      });
                    }}
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter pin code"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />
                </div>
              </div>
            </section>
            <h2 className="text-lg font-semibold  w-120 border-[#12516E] pl-2 flex items-center gap-3">
              <GoArrowRight size={25} className="text-[#118AB2] " />
              Is Current & Permanent Address Same?{" "}
              <input
                type="checkbox"
                name="sameAsCurrent"
                checked={formData.sameAsCurrent}
                onChange={(e) => {
                  const checked = e.target.checked;

                  setFormData((prev) => ({
                    ...prev,
                    sameAsCurrent: checked,

                    permanentAddressLine: checked
                      ? prev.currentAddressLine
                      : "",
                    permanentCountry: checked ? prev.currentCountry : "",
                    permanentState: checked ? prev.currentState : "",
                    permanentCity: checked ? prev.currentCity : "",
                    permanentPinCode: checked ? prev.currentPinCode : "",
                  }));
                }}
              />
            </h2>
            <section className="space-y-4">
              <h2 className="text-lg font-semibold border-b-2 w-92 border-[#12516E] pl-2">
                Permanent Address
              </h2>

              <div className="grid mt-9 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Address Line
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <input
                    type="text"
                    name="permanentAddressLine"
                    value={formData.permanentAddressLine}
                    onChange={handleFormChange}
                    placeholder="Enter address line"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Country
                    {/* <span className="text-red-500">*</span> */}
                  </label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() =>
                        setShowPermanentCountryDropdown(
                          !showPermanentCountryDropdown,
                        )
                      }
                      className="w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors "
                      style={{ outline: "none" }}
                    >
                      <span
                        className={`text-sm ${formData.permanentCountry ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.permanentCountry
                          ? Country.getAllCountries().find(
                              (c) => c.isoCode === formData.permanentCountry,
                            )?.name || "Select Country"
                          : "Select Country"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${showPermanentCountryDropdown ? "rotate-180" : ""}`}
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

                    {showPermanentCountryDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg max-h-60 overflow-y-auto">
                        {/* Search input inside dropdown */}
                        <div className="sticky top-0 bg-white p-2 border-b border-[#E6E6E6]">
                          <input
                            type="text"
                            placeholder="Search country..."
                            value={searchPermanentCountry}
                            onChange={(e) =>
                              setSearchPermanentCountry(e.target.value)
                            }
                            className="w-full px-3 py-2 text-sm border border-[#E6E6E6] rounded-md outline-none "
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>

                        <div className="max-h-48 overflow-y-auto">
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                permanentCountry: "",
                                permanentState: "",
                                permanentCity: "",
                              });
                              setShowPermanentCountryDropdown(false);
                              setSearchPermanentCountry("");
                            }}
                            className="w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors text-[#696969]"
                          >
                            Select Country
                          </button>
                          {Country.getAllCountries()
                            .filter((country) =>
                              country.name
                                .toLowerCase()
                                .includes(searchPermanentCountry.toLowerCase()),
                            )
                            .map((country) => (
                              <button
                                key={country.isoCode}
                                type="button"
                                onClick={() => {
                                  setFormData({
                                    ...formData,
                                    permanentCountry: country.isoCode,
                                    permanentState: "",
                                    permanentCity: "",
                                  });
                                  setShowPermanentCountryDropdown(false);
                                  setSearchPermanentCountry("");
                                }}
                                className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                                  formData.permanentCountry === country.isoCode
                                    ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                                    : "text-[#1C1C1C]"
                                }`}
                              >
                                {country.name}
                              </button>
                            ))}

                          {Country.getAllCountries().filter((country) =>
                            country.name
                              .toLowerCase()
                              .includes(searchPermanentCountry.toLowerCase()),
                          ).length === 0 && (
                            <div className="px-3 py-3 text-sm text-[#696969] text-center">
                              No country found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    State
                    {/* <span className="text-red-500">*</span> */}
                  </label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.permanentCountry) {
                          toast.error("Please select a country first");
                          return;
                        }
                        setShowPermanentStateDropdown(
                          !showPermanentStateDropdown,
                        );
                      }}
                      className={`w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between transition-colors  ${
                        !formData.permanentCountry
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      style={{ outline: "none" }}
                    >
                      <span
                        className={`text-sm ${formData.permanentState ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.permanentState
                          ? State.getStatesOfCountry(
                              formData.permanentCountry,
                            ).find((s) => s.isoCode === formData.permanentState)
                              ?.name || "Select State"
                          : "Select State"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${showPermanentStateDropdown ? "rotate-180" : ""}`}
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

                    {showPermanentStateDropdown &&
                      formData.permanentCountry && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg max-h-60 overflow-y-auto">
                          {/* Search input inside dropdown */}
                          <div className="sticky top-0 bg-white p-2 border-b border-[#E6E6E6]">
                            <input
                              type="text"
                              placeholder="Search state..."
                              value={searchPermanentState}
                              onChange={(e) =>
                                setSearchPermanentState(e.target.value)
                              }
                              className="w-full px-3 py-2 text-sm border border-[#E6E6E6] rounded-md outline-none "
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>

                          <div className="max-h-48 overflow-y-auto">
                            <button
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  permanentState: "",
                                  permanentCity: "",
                                }));
                                setShowPermanentStateDropdown(false);
                                setSearchPermanentState("");
                              }}
                              className="w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors text-[#696969]"
                            >
                              Select State
                            </button>
                            {State.getStatesOfCountry(formData.permanentCountry)
                              .filter((state) =>
                                state.name
                                  .toLowerCase()
                                  .includes(searchPermanentState.toLowerCase()),
                              )
                              .map((state) => (
                                <button
                                  key={state.isoCode}
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      permanentState: state.isoCode,
                                      permanentCity: "",
                                    }));
                                    setShowPermanentStateDropdown(false);
                                    setSearchPermanentState("");
                                  }}
                                  className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                                    formData.permanentState === state.isoCode
                                      ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                                      : "text-[#1C1C1C]"
                                  }`}
                                >
                                  {state.name}
                                </button>
                              ))}

                            {State.getStatesOfCountry(
                              formData.permanentCountry,
                            ).filter((state) =>
                              state.name
                                .toLowerCase()
                                .includes(searchPermanentState.toLowerCase()),
                            ).length === 0 && (
                              <div className="px-3 py-3 text-sm text-[#696969] text-center">
                                No state found
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    City
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <input
                    name="permanentCity"
                    value={formData.permanentCity}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Enter city"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Pin code
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    name="permanentPinCode"
                    value={formData.permanentPinCode}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 7);
                      setFormData({
                        ...formData,
                        permanentPinCode: value,
                      });
                    }}
                    placeholder="Enter pin code"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />
                </div>
              </div>
            </section>
          </>
        )}

        {/* ===========================Qualification & Experience Container=========================================== */}
        {step === 2 && (
          <>
            <section className="space-y-4">
              <h2 className="text-lg font-semibold border-l-[3px] border-[#BB4D00] pl-2">
                1. Qualification & Experience
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Highest Qualification
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() =>
                        setShowQualificationDropdown(!showQualificationDropdown)
                      }
                      className="w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between transition-colors hover:border-[#0B3142] focus:border-[#0B3142]"
                      style={{ outline: "none" }}
                    >
                      <span
                        className={`text-sm ${formData.highestQualification ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.highestQualification ||
                          "Select Qualification"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 text-[#696969] transition-transform duration-200 ${showQualificationDropdown ? "rotate-180" : ""}`}
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

                    {showQualificationDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg max-h-60 overflow-y-auto">
                        {qualificationOptions.map((item, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              const event = {
                                target: {
                                  name: "highestQualification",
                                  value: item,
                                },
                              };
                              handleFormChange(event);
                              setShowQualificationDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                              formData.highestQualification === item
                                ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                                : "text-[#1C1C1C]"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Specialization
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <input
                    type="text"
                    onKeyDown={(e) => {
                      if (/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleFormChange}
                    placeholder="e.g., Mathematics, Computer Science"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Total Experience (Years)
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() =>
                        setShowExperienceDropdown(!showExperienceDropdown)
                      }
                      className="w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between transition-colors hover:border-[#0B3142] focus:border-[#0B3142]"
                      style={{ outline: "none" }}
                    >
                      <span
                        className={`text-sm ${formData.totalExperience !== "" ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.totalExperience !== ""
                          ? `${formData.totalExperience} ${formData.totalExperience === 1 ? "Year" : "Years"}`
                          : "Select Experience"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 text-[#696969] transition-transform duration-200 ${showExperienceDropdown ? "rotate-180" : ""}`}
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

                    {showExperienceDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg max-h-60 overflow-y-auto">
                        <button
                          type="button"
                          onClick={() => {
                            const event = {
                              target: { name: "totalExperience", value: "" },
                            };
                            handleFormChange(event);
                            setShowExperienceDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                            formData.totalExperience === ""
                              ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                              : "text-[#1C1C1C]"
                          }`}
                        >
                          Select Experience
                        </button>
                        {experienceOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              const event = {
                                target: {
                                  name: "totalExperience",
                                  value: option.value,
                                },
                              };
                              handleFormChange(event);
                              setShowExperienceDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                              formData.totalExperience === option.value
                                ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                                : "text-[#1C1C1C]"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* <UploadBox title="Upload Resume" /> */}
            </section>
            <section className="space-y-4">
              <h2 className="text-lg font-semibold border-l-[3px] border-[#BB4D00] pl-2">
                Details of Educational Qualifications:
              </h2>
              {/* Table */}
              <div
                style={{
                  border: "1px solid #EEEEEE",
                  borderRadius: "8px",
                  width: "100%",
                  overflow: "auto",
                }}
              >
                <table style={{ width: "100%" }}>
                  <thead
                    className="text-[10px] md:text-[12px] lg:text-[14px]"
                    style={{ borderBottom: "1px solid #EEEEEE" }}
                  >
                    <tr style={{ textAlign: "left" }}>
                      <th
                        style={{
                          padding: "10px 15px",
                          color: "#1C1C1C",

                          fontWeight: "600",
                        }}
                      >
                        Degree
                      </th>
                      <th
                        style={{
                          padding: "10px 15px",
                          color: "#1C1C1C",
                          fontWeight: "600",
                        }}
                      >
                        Institution
                      </th>
                      <th
                        style={{
                          padding: "10px 15px",
                          color: "#1C1C1C",
                          fontWeight: "600",
                        }}
                      >
                        Year
                      </th>
                      <th
                        style={{
                          padding: "10px 15px",
                          color: "#1C1C1C",
                          fontWeight: "600",
                        }}
                      >
                        Percentage
                      </th>
                      <th
                        style={{
                          padding: "10px 15px",
                          color: "#1C1C1C",
                          fontWeight: "600",
                        }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ padding: "10px 10px" }}>
                    {/* Existing Data */}
                    {rows.map((row, index) => (
                      <tr
                        key={index}
                        className="group text-[10px] md:text-[12px] lg:text-[14px]"
                        style={{ padding: "10px", textAlign: "left" }}
                      >
                        <td style={{ padding: "10px 15px" }}>
                          {" "}
                          <span>{row.degree}</span>
                        </td>
                        <td style={{ padding: "10px 15px" }}>
                          {" "}
                          <span>{row.institution}</span>
                        </td>
                        <td style={{ padding: "10px 15px" }}>
                          {" "}
                          <span>{row.year}</span>
                        </td>
                        <td style={{ padding: "10px 15px" }}>
                          {" "}
                          <span>{row.percentage}</span>
                        </td>

                        {/* Delete Icon (hover only) */}
                        <td style={{ padding: "10px 15px" }}>
                          <img
                            src={deleteIcon}
                            alt="delete"
                            onClick={() => handleDelete(index)}
                            className="h-5.5 w-5.5 cursor-pointer [image-rendering:-webkit-optimize-contrast]"
                          />
                        </td>
                      </tr>
                    ))}

                    {/* Input Row */}
                    {showInput && (
                      <tr className="text-[10px] md:text-[12px] lg:text-[14px]">
                        <td style={{ padding: "10px 15px" }}>
                          <input
                            placeholder="Type Degree"
                            name="degree"
                            value={form.degree}
                            onChange={handleChange}
                            className="w-full px-2 py-2 border border-[#97A3D0] bg-[#FAFBFF] rounded-lg outline-none"
                          />
                        </td>

                        <td style={{ padding: "10px 15px" }}>
                          <input
                            placeholder="Type Institution"
                            name="institution"
                            value={form.institution}
                            onChange={handleChange}
                            className="w-full px-2 py-2 border border-[#97A3D0] bg-[#FAFBFF] rounded-lg outline-none"
                          />
                        </td>

                        <td style={{ padding: "10px 15px" }}>
                          <input
                            placeholder="Type Year"
                            name="year"
                            onKeyDown={(e) => {
                              if (
                                !/[0-9]/.test(e.key) &&
                                ![
                                  "Backspace",
                                  "Delete",
                                  "ArrowLeft",
                                  "ArrowRight",
                                  "Tab",
                                ].includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                            }}
                            value={form.year}
                            onChange={handleChange}
                            className="w-full px-2 py-2 border border-[#97A3D0] bg-[#FAFBFF] rounded-lg outline-none"
                          />
                        </td>

                        <td style={{ padding: "10px 15px" }}>
                          <input
                            onKeyDown={(e) => {
                              if (
                                !/[0-9]/.test(e.key) &&
                                ![
                                  "Backspace",
                                  "Delete",
                                  "ArrowLeft",
                                  "ArrowRight",
                                  "Tab",
                                ].includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                            }}
                            placeholder="Type Percentage"
                            name="percentage"
                            value={form.percentage}
                            onChange={handleChange}
                            className="w-full px-2 py-2 border border-[#97A3D0] bg-[#FAFBFF] rounded-lg outline-none"
                          />
                        </td>

                        <td style={{ padding: "10px 15px" }}>
                          <button
                            type="button"
                            onClick={handleAdd}
                            className="bg-[#118AB2] text-white px-3 py-2 rounded-md"
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => setShowInput(true)}
                style={{
                  backgroundColor: "#118AB2",
                  borderRadius: "8px",
                  padding: "8px 24px",
                  color: "white",
                }}
              >
                {" "}
                + Add
              </button>
            </section>
          </>
        )}

        {/* ===============Job Employement Details Container=====================*/}
        {step === 3 && (
          <>
            {/* =======================
            4. Job / Employment Detail
        ======================= */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold border-l-[3px] border-[#00C950] pl-2">
                1. Job / Employment Detail
              </h2>

              <div className="grid mt-9 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Role Dropdown - REDESIGNED */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Role <span className="text-red-500">*</span>
                  </label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                      className="w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between"
                    >
                      <span
                        className={`text-sm ${formData.role ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.roleName || "Select Role"}
                      </span>

                      <svg
                        className={`w-3.5 h-3.5 ${showRoleDropdown ? "rotate-180" : ""}`}
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

                    {showRoleDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg max-h-60 overflow-y-auto">
                        {roles.map((item) => (
                          <button
                            key={item._id}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                role: item._id,
                                roleName: item.roleName,
                              }));
                              setShowRoleDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] ${
                              formData.role === item._id
                                ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                                : "text-[#1C1C1C]"
                            }`}
                          >
                            {item.roleName}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Staff Category Dropdown - REDESIGNED */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Staff Category
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() =>
                        setShowStaffCategoryDropdown(!showStaffCategoryDropdown)
                      }
                      className="w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between transition-colors hover:border-[#0B3142] focus:border-[#0B3142]"
                      style={{ outline: "none" }}
                    >
                      <span
                        className={`text-sm ${formData.staffCategory ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.staffCategory || "Select Staff Category"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 text-[#696969] transition-transform duration-200 ${showStaffCategoryDropdown ? "rotate-180" : ""}`}
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

                    {showStaffCategoryDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg max-h-60 overflow-y-auto">
                        {staffCategoryOptions.map((item, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              const event = {
                                target: { name: "staffCategory", value: item },
                              };
                              handleFormChange(event);
                              setShowStaffCategoryDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                              formData.staffCategory === item
                                ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                                : "text-[#1C1C1C]"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Department Dropdown - REDESIGNED */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Department
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() =>
                        setShowDepartmentDropdown(!showDepartmentDropdown)
                      }
                      className="w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between transition-colors hover:border-[#0B3142] focus:border-[#0B3142]"
                      style={{ outline: "none" }}
                    >
                      <span
                        className={`text-sm ${formData.department ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.department || "Select Department"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 text-[#696969] transition-transform duration-200 ${showDepartmentDropdown ? "rotate-180" : ""}`}
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

                    {showDepartmentDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg max-h-60 overflow-y-auto">
                        {departmentOptions.map((item, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              const event = {
                                target: { name: "department", value: item },
                              };
                              handleFormChange(event);
                              setShowDepartmentDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                              formData.department === item
                                ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                                : "text-[#1C1C1C]"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Employee ID (Auto Generated)
                  </label>

                  <input
                    name="employeeId"
                    value={formData.employeeId || "Auto generated after submit"}
                    type="text"
                    readOnly
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Date of Joining
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="dateOfJoining"
                    value={formData.dateOfJoining}
                    onChange={handleFormChange}
                    type="date"
                    placeholder="Enter date of joining"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />
                </div>

                {/* Employee Type Dropdown - REDESIGNED */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Employee Type
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() =>
                        setShowEmployeeTypeDropdown(!showEmployeeTypeDropdown)
                      }
                      className="w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between transition-colors hover:border-[#0B3142] focus:border-[#0B3142]"
                      style={{ outline: "none" }}
                    >
                      <span
                        className={`text-sm ${formData.employeeType ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.employeeType || "Select Employee Type"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 text-[#696969] transition-transform duration-200 ${showEmployeeTypeDropdown ? "rotate-180" : ""}`}
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

                    {showEmployeeTypeDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg max-h-60 overflow-y-auto">
                        {employeeTypeOptions.map((item, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              const event = {
                                target: { name: "employeeType", value: item },
                              };
                              handleFormChange(event);
                              setShowEmployeeTypeDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                              formData.employeeType === item
                                ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                                : "text-[#1C1C1C]"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Work Shift Dropdown - REDESIGNED */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Work Shift
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() =>
                        setShowWorkShiftDropdown(!showWorkShiftDropdown)
                      }
                      className="w-full bg-white border border-[#9C9C9C] rounded-sm px-3 py-3 text-left flex items-center justify-between transition-colors hover:border-[#0B3142] focus:border-[#0B3142]"
                      style={{ outline: "none" }}
                    >
                      <span
                        className={`text-sm ${formData.workShift ? "text-[#1C1C1C]" : "text-[#696969]"}`}
                      >
                        {formData.workShift || "Select Work Shift"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 text-[#696969] transition-transform duration-200 ${showWorkShiftDropdown ? "rotate-180" : ""}`}
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

                    {showWorkShiftDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-sm shadow-lg max-h-60 overflow-y-auto">
                        {workShiftOptions.map((item, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              const event = {
                                target: { name: "workShift", value: item },
                              };
                              handleFormChange(event);
                              setShowWorkShiftDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-3 text-sm hover:bg-[#F5F7F7] transition-colors ${
                              formData.workShift === item
                                ? "bg-[#F5F7F7] font-medium text-[#0B3142]"
                                : "text-[#1C1C1C]"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Driving License Number{" "}
                    <span className="text-[#DC2626] text-xs">
                      (only for driver role)
                    </span>
                  </label>

                  <input
                    name="drivingLicenseNumber"
                    value={formData.drivingLicenseNumber}
                    onChange={(e) => {
                      let value = e.target.value.toUpperCase();

                      // Only letters and numbers
                      value = value.replace(/[^A-Z0-9]/g, "");

                      // Max 15 characters
                      value = value.slice(0, 15);

                      setFormData((prev) => ({
                        ...prev,
                        drivingLicenseNumber: value,
                      }));
                    }}
                    placeholder="DL0420110149646"
                    maxLength={15}
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C] "
                  />

                  {formData.drivingLicenseNumber &&
                    !/^[A-Z]{2}[0-9]{13}$/.test(
                      formData.drivingLicenseNumber,
                    ) && (
                      <span className="text-red-500 text-xs">
                        Enter valid DL number, example: DL0420110149646
                      </span>
                    )}
                </div>
              </div>
            </section>
            <section className="space-y-4">
              <h2 className="text-lg font-semibold border-l-[3px] border-[#BB4D00] pl-2">
                2. Bank Detail
              </h2>

              <div className="grid mt-9 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Bank Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">Bank Name</label>
                  <input
                    name="bankName"
                    value={formData.bankName}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");

                      setFormData((prev) => ({
                        ...prev,
                        bankName: value,
                      }));
                    }}
                    type="text"
                    placeholder="Enter Bank Name"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C]"
                  />
                </div>

                {/* Account Number */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">
                    Bank Account Number
                  </label>
                  <input
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 18);

                      setFormData((prev) => ({
                        ...prev,
                        accountNumber: value,
                      }));
                    }}
                    type="text"
                    placeholder="Enter Account Number"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C]"
                  />
                </div>

                {/* IFSC */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">IFSC Code</label>
                  <input
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={(e) => {
                      const value = e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z0-9]/g, "")
                        .slice(0, 11);

                      setFormData((prev) => ({
                        ...prev,
                        ifscCode: value,
                      }));
                    }}
                    placeholder="SBIN0001234"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C]"
                  />
                </div>

                {/* UAN */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-[#696969]">UAN Number</label>
                  <input
                    name="uanNumber"
                    value={formData.uanNumber}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 12);

                      setFormData((prev) => ({
                        ...prev,
                        uanNumber: value,
                      }));
                    }}
                    placeholder="Enter UAN Number"
                    className="border rounded-sm px-3 py-3 text-sm outline-none border-[#9C9C9C]"
                  />
                </div>
              </div>
            </section>
          </>
        )}

        {/* ===============Upload Documents Container===========================*/}
        {step === 4 && (
          <>
            <section className="space-y-4">
              <h2 className="text-lg font-semibold border-l-[3px] border-[#FF6900] pl-2">
                6. Document Upload
              </h2>

              {/* <div className="flex flex-col gap-1">
                <label className="text-sm text-[#696969]">
                  Document Title *
                </label>
                <input
                  name="documentTitle"
                  value={formData.documentTitle}
                  onChange={handleFormChange}
                  type="text"
                  placeholder="Enter Document Title"
                  className="border rounded-md px-3 py-3 text-sm outline-none border-[#9C9C9C] focus:ring-2 focus:ring-[#696969]"
                />
              </div> */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {uploadedDocuments.map((doc, index) => {
                  const fileUrl = URL.createObjectURL(doc.file);
                  const isImage = doc.file.type.startsWith("image/");
                  const isPdf = doc.file.type === "application/pdf";

                  return (
                    <div className="flex flex-col space-y-3">
                      <input
                        type="text"
                        placeholder="Enter document title"
                        value={doc.title}
                        onChange={(e) => {
                          const value = e.target.value;

                          setUploadedDocuments((prev) =>
                            prev.map((item, i) =>
                              i === index ? { ...item, title: value } : item,
                            ),
                          );
                        }}
                        className="border rounded-md px-3 py-2 text-sm w-full mt-2 outline-none"
                      />
                      <div
                        key={index}
                        className="border border-dashed border-[#118AB2] rounded-lg px-4 py-3 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="w-16 h-16 rounded overflow-hidden bg-gray-100">
                            {isImage ? (
                              <img
                                src={fileUrl}
                                alt={doc.file.name}
                                className="w-full h-full object-cover"
                              />
                            ) : isPdf ? (
                              <iframe
                                src={fileUrl}
                                title={doc.file.name}
                                className="w-full h-full"
                              />
                            ) : null}
                          </div>

                          <div className="flex-1">
                            <p className="text-sm text-[#1C1C1C] truncate max-w-[200px]">
                              {doc.file.name}
                            </p>

                            <p className="text-xs text-[#696969]">
                              {(doc.file.size / 1024 / 1024).toFixed(1)} MB
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setUploadedDocuments((prev) =>
                              prev.filter((_, i) => i !== index),
                            )
                          }
                          className="text-red-500"
                        >
                          {/* <RiDeleteBin6Line /> */}
                          <img
                            src={deleteIcon}
                            alt="delete"
                            className="h-5.5 w-5.5 cursor-pointer [image-rendering:-webkit-optimize-contrast]"
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div
                  onClick={handleDocumentClick}
                  className="cursor-pointer border border-dashed border-[#118AB2] rounded-lg px-4 py-7 flex flex-col items-center justify-center gap-2 hover:bg-[#F5FBFF] transition"
                >
                  <BsUpload size={28} className="text-[#118AB2]" />

                  <p className="text-sm text-[#1C1C1C]">
                    Drag & Drop to upload or{" "}
                    <span className="text-[#118AB2] font-normal ">Browse</span>
                  </p>

                  <p className="text-xs text-[#9A9A9A]">
                    PDF, JPG, PNG files are allowed.
                  </p>
                </div>

                <input
                  ref={documentInputRef}
                  type="file"
                  multiple
                  accept="application/pdf,image/*"
                  onChange={handleDocumentFileChange}
                  className="hidden"
                />
              </div>
            </section>
          </>
        )}

        {/* reviwes section  */}
        {step === 5 && (
          <>
            <div className="mt-6 flex flex-col gap-9 ">
              <div className="w-full bg-[#12516E] text-white px-6 py-3 rounded text-[20px] font-semibold">
                <span>Review Your Detail:</span>
              </div>

              {/* Employee Information */}
              <div className="rounded-xl w-full border border-[#118AB240] bg-[#118AB205] p-6">
                <div className="flex gap-4 items-center mb-4">
                  <div className="p-0.5 rounded-full h-8 bg-[#00C950]"></div>
                  <div className="text-[#1c1c1c] font-medium  text-[18px] leading-tight flex gap-2 items-center">
                    <span>1. Employee Information</span>
                  </div>
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-3 gap-x-10 gap-y-3">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal text-[15px]">
                        Staff Name
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.staffName || "Not provided"}
                        {/* Ahana Singh */}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Aadhar Number
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.aadhaarNumber || "Not provided"}
                        {/* 78741234452 */}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Category
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.category || "Not provided"}
                        {/* General */}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Language Known
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.languageKnown || "Not provided"}
                        {/* English, Hindi */}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Spouse Occupation
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.spouseOccupation || "Not provided"}
                        {/* English, Hindi */}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Father Name
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.fatherName || "Not provided"}
                        {/* English, Hindi */}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Date of Birth
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.dob || "Not provided"}
                        {/* 17-OCT-2009 */}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        PAN Number
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.panNumber || "Not provided"}
                        {/* 78741234452 */}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Religion
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.religion || "Not provided"}
                        {/* Hindu */}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Marital Status
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.maritalStatus || "Not provided"}
                        {/* English, Hindi */}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Spouse Phone
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.spousePhone || "Not provided"}
                        {/* English, Hindi */}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Mother Name
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.motherName || "Not provided"}
                        {/* English, Hindi */}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Gender
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.gender || "Not provided"}
                        {/* Female */}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Nationality
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.nationality || "Not provided"}
                        {/* Indian */}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Blood Group
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.bloodGroup || "Not provided"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Spouse Name
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.spouseName || "Not provided"}
                        {/* English, Hindi */}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Number of Children
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.numberOfChildren || "Not provided"}
                        {/* English, Hindi */}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center items-start">
                    <div className="h-50 w-40 overflow-hidden rounded">
                      <img
                        src={
                          formData.profilePhoto
                            ? URL.createObjectURL(formData.profilePhoto)
                            : staff_pro
                        }
                        alt="staff"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="rounded-xl w-full border border-[#118AB240] bg-[#118AB205] p-6">
                <div className="flex gap-4 items-center mb-4">
                  <div className="p-0.5 rounded-full h-8 bg-[#2B7FFF]"></div>
                  <div className="text-[#1c1c1c] font-medium  text-[18px] leading-tight flex gap-2 items-center">
                    <span>2. Contact Information</span>
                  </div>
                </div>
                <div className="grid lg:grid-cols-3 mb-4 space-y-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[#696969] font-normal  text-[15px]">
                      Mobile No.
                    </label>
                    <span className="text-[15px] text-[#1C1C1C] font-semibold">
                      {formData.mobileNumber || "Not provided"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[#696969] font-normal  text-[15px]">
                      Alternate Mobile Number
                    </label>
                    <span className="text-[15px] text-[#1C1C1C] font-semibold">
                      {formData.mobileNumber || "Not provided"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[#696969] font-normal  text-[15px]">
                      Email ID
                    </label>
                    <span className="text-[15px] text-[#1C1C1C] font-semibold">
                      {formData.email || "Not provided"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[#696969] font-normal  text-[15px]">
                      Emergency Contact Phone
                    </label>
                    <span className="text-[15px] text-[#1C1C1C] font-semibold">
                      {formData.mobileNumber || "Not provided"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[#696969] font-normal  text-[15px]">
                      Emergency Contact Name
                    </label>
                    <span className="text-[15px] text-[#1C1C1C] font-semibold">
                      {formData.mobileNumber || "Not provided"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[#696969] font-normal  text-[15px]">
                      Emergency Contact Relation
                    </label>
                    <span className="text-[15px] text-[#1C1C1C] font-semibold">
                      {formData.mobileNumber || "Not provided"}
                    </span>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 mt-3">
                  <div className="border-b-2 border-[#12516E] p-2 text-[16px] font-semibold text-[#1c1c1c]">
                    <span>Current Address</span>
                  </div>
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3 gap-x-10 gap-y-3">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Address
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.currentAddressLine || "Not provided"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        City
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.currentCity || "Not provided"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Country
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.currentCountry || "Not provided"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Pin Code
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.currentPinCode || "Not provided"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        State
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.currentState || "Not provided"}
                      </span>
                    </div>
                  </div>
                </div>
                <>
                  <div className="grid lg:grid-cols-3 mt-3">
                    <div className="border-b-2 border-[#12516E] p-2 text-[16px] font-semibold text-[#1c1c1c]">
                      <span>Permanent Address</span>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3 gap-x-10 gap-y-3">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[#696969] font-normal  text-[15px]">
                          Address
                        </label>
                        <span className="text-[15px] text-[#1C1C1C] font-semibold">
                          {formData.permanentAddressLine || "Not provided"}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[#696969] font-normal  text-[15px]">
                          City
                        </label>
                        <span className="text-[15px] text-[#1C1C1C] font-semibold">
                          {formData.permanentCity || "Not provided"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[#696969] font-normal  text-[15px]">
                          Country
                        </label>
                        <span className="text-[15px] text-[#1C1C1C] font-semibold">
                          {formData.permanentCountry || "Not provided"}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[#696969] font-normal  text-[15px]">
                          Pin Code
                        </label>
                        <span className="text-[15px] text-[#1C1C1C] font-semibold">
                          {formData.permanentPinCode || "Not provided"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[#696969] font-normal  text-[15px]">
                          State
                        </label>
                        <span className="text-[15px] text-[#1C1C1C] font-semibold">
                          {formData.permanentState || "Not provided"}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              </div>

              {/* Parent/Guardian/Sibling Details */}
              <div className="rounded w-full border border-[#118AB240]  p-6">
                <div className="flex gap-4 items-center">
                  <div className="p-1 rounded-full h-10 bg-[#FF6900]"></div>
                  <div className="text-[#1c1c1c] font-medium  text-[18px] leading-tight flex gap-2 items-center">
                    <span>3. Qualification & Experience</span>
                  </div>
                </div>

                {/* Father Details */}
                <div className="grid lg:grid-cols-3 mt-3"></div>

                <div className="flex justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[#696969] font-normal  text-[15px]">
                      Highest Qualification
                    </label>
                    <span className="text-[15px] text-[#1C1C1C] font-semibold">
                      {formData.highestQualification || "Not provided"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[#696969] font-normal  text-[15px]">
                      Specialization
                    </label>
                    <span className="text-[15px] text-[#1C1C1C] font-semibold">
                      {formData.specialization || "Not provided"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[#696969] font-normal  text-[15px]">
                      Total Experience
                    </label>
                    <span className="text-[15px] text-[#1C1C1C] font-semibold">
                      {formData.totalExperience || "Not provided"}
                    </span>
                  </div>
                </div>

                {/* Mother Details */}
                <div className="mt-5">
                  <h2 className="text-xl font-semibold text-[#1C1C1C] mb-3">
                    Details of Educational Qualifications:
                  </h2>

                  <table className="w-full border border-[#E1E1E1] rounded-xl overflow-hidden">
                    <thead className="border-b border-[#E1E1E1]">
                      <tr>
                        <th className="p-4 text-left">Degree</th>
                        <th className="p-4 text-left">Institution</th>
                        <th className="p-4 text-left">Year</th>
                        <th className="p-4 text-left">Percentage</th>
                      </tr>
                    </thead>

                    <tbody>
                      {rows.map((item, index) => (
                        <tr key={index} className="border-t border-[#E1E1E1]">
                          <td className="p-4">{item.degree}</td>
                          <td className="p-4">{item.institution}</td>
                          <td className="p-4">{item.year}</td>
                          <td className="p-4">{item.percentage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Academic Details */}
              <div className="rounded w-full border border-[#118AB240] p-6">
                <div className="flex gap-4 items-center">
                  <div className="p-1 rounded-full h-10 bg-[#FF6900]"></div>
                  <div className="text-[#1c1c1c] font-medium  text-[18px] leading-tight flex gap-2 items-center">
                    <span>4. Job/ Employment Detail</span>
                  </div>
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3 gap-x-10 gap-y-3">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Role
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.roleName || "Not provided"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Employee ID
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.employeeId || "Not provided"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Work Shift
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.workShift || "Not provided"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Staff Category
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.staffCategory || "Not provided"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Date of Joining
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.dateOfJoining || "Not provided"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Driving License Number (only for driver role)
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.drivingLicenseNumber || "Not provided"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Department
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.department || "Not provided"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-normal  text-[15px]">
                        Employee Type
                      </label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">
                        {formData.employeeType || "Not provided"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded border border-[#118AB240] p-6">
                <h2 className="text-[18px] font-semibold border-l-[3px] border-[#FF6900] pl-2 mb-3">
                  7. Uploaded Documents
                </h2>

                <div className="flex gap-4 overflow-x-auto pb-2">
                  {uploadedDocuments.map((doc, index) => {
                    const fileUrl = URL.createObjectURL(doc.file);
                    const isImage = doc.file.type.startsWith("image/");
                    const isPdf = doc.file.type === "application/pdf";

                    return (
                      <div
                        key={index}
                        onClick={() =>
                          setPreviewFile({
                            url: fileUrl,
                            name: doc.file.name,
                            type: doc.file.type,
                          })
                        }
                        className="min-w-28.75 max-w-36 h-44 bg-[#E5E5E5] rounded-md overflow-hidden"
                      >
                        {isImage ? (
                          <img
                            src={fileUrl}
                            alt={doc.file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : isPdf ? (
                          <iframe
                            src={fileUrl}
                            title={doc.file.name}
                            className="w-full h-full"
                          />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
              {previewFile && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg w-full max-w-5xl h-[90vh] relative overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                      <h2 className="font-semibold text-sm truncate">
                        {previewFile.name}
                      </h2>

                      <button
                        onClick={() => setPreviewFile(null)}
                        className="text-red-500 text-xl font-bold"
                      >
                        ×
                      </button>
                    </div>

                    <div className="w-full h-[calc(90vh-55px)] bg-gray-100">
                      {previewFile.type.startsWith("image/") ? (
                        <img
                          src={previewFile.url}
                          alt={previewFile.name}
                          className="w-full h-full object-contain"
                        />
                      ) : previewFile.type === "application/pdf" ? (
                        <iframe
                          src={previewFile.url}
                          title={previewFile.name}
                          className="w-full h-full"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ===== Buttons ===== */}
        <div className="flex justify-end gap-4 pt-6 border-t border-t-[#E6E6E6]">
          {step > 1 && (
            <button
              onClick={() => setStep((prev) => prev - 1)}
              className="border px-6 py-2 rounded-lg text-[#696969]"
            >
              Previous
            </button>
          )}
          {step < steps.length ? (
            <button
              onClick={() => {
                const isValid = validateStep();

                if (isValid === true) {
                  setStep((prev) => prev + 1);
                }
              }}
              className="bg-[#0B2B2E] text-white px-6 py-2 rounded-lg cursor-pointer"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => {
                const isValid = validateStep();

                if (isValid === true) {
                  handleSubmit();
                }
              }}
              disabled={createStaffMutation.isPending}
              className="bg-[#0B3142] text-white px-6 py-2 rounded-lg cursor-pointer disabled:opacity-50"
            >
              {createStaffMutation.isPending ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
