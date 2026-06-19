import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdArrowDropDown } from "react-icons/md";
import api from "../../config/axiosInstance";
import registerBg from "../../assets/images/register-bg1.png";

// Custom Dropdown matching project style (same as StudyMaterial FilterDropdown)
const SelectDropdown = ({
  label,
  name,
  value,
  onChange,
  options,
  required,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || "Select";

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[12px] font-semibold text-[#475569]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div ref={dropdownRef} className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full h-12 border border-[#E6E6E6] rounded-xl px-4 bg-white cursor-pointer"
        >
          <span
            className={`text-[14px] leading-[100%] ${value ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}`}
          >
            {selectedLabel}
          </span>
          <MdArrowDropDown className="text-gray-500" size={20} />
        </div>

        {open && (
          <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-[200px] overflow-y-auto">
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange({ target: { name, value: opt.value } });
                  setOpen(false);
                }}
                className={`px-4 py-2.5 cursor-pointer text-[14px] transition-colors
                  ${opt.value === value ? "bg-[#055BDA] text-white" : "text-[#1C1C1C] hover:bg-gray-100"}`}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <span className="text-red-500 text-[12px]">{error}</span>}
    </div>
  );
};

function Register() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);

  const [formData, setFormData] = useState({
    schoolName: "",
    schoolDomain: "",
    country: "",
    state: "",
    city: "",
    schoolType: "",
    numberOfStudents: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    selectedPlan: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "schoolName") {
      const firstWord = value.trim().split(/\s+/)[0]?.toLowerCase() || "";
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        schoolDomain: firstWord,
      }));
    } else if (name === "phoneNumber") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
    } else if (name === "country") {
      setFormData((prev) => ({ ...prev, country: value, state: "", city: "" }));
    } else if (name === "state") {
      setFormData((prev) => ({ ...prev, state: value, city: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.schoolName.trim())
      newErrors.schoolName = "School name is required";
    if (!formData.schoolDomain.trim())
      newErrors.schoolDomain = "School domain is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.schoolType) newErrors.schoolType = "School type is required";
    if (!formData.numberOfStudents)
      newErrors.numberOfStudents = "Student count is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid Indian mobile number";
    }
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 8) newErrors.password = "Min 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) setCurrentStep(2);
    else if (currentStep === 2 && validateStep2() && otpVerified)
      setCurrentStep(3);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSendOtp = async () => {
    if (!formData.email.trim()) {
      setErrors((p) => ({ ...p, email: "Email required" }));
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrors((p) => ({ ...p, email: "Enter a valid email address" }));
      return;
    }
    setLoading(true);
    try {
      const endpoint = otpSent
        ? "/auth/resend-registration-otp"
        : "/auth/otpsend";
      await api.post(endpoint, { email: formData.email });
      setOtpSent(true);
      toast.success(
        otpSent ? "OTP resent to your email" : "OTP sent to your email",
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      otpRefs.current[index - 1]?.focus();
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Enter 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/verify-registration-otp", {
        email: formData.email,
        otp: otpCode,
      });
      setOtpVerified(true);
      toast.success("Email verified");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.selectedPlan) {
      toast.error("Please select a plan");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/school/register", {
        schoolName: formData.schoolName,
        schoolDomain: formData.schoolDomain,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        schoolType: formData.schoolType,
        numberOfStudents: formData.numberOfStudents,
        fullName: formData.fullName,
        phone: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        plan: formData.selectedPlan,
      });

      if (response.data.success) {
        toast.success("School registered successfully!");
        navigate("/payment");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }

    // const selectedPlanData = plans.find((p) => p.id === formData.selectedPlan);
    // navigate("/payment", { state: { plan: selectedPlanData, formData } });
  };

  const plans = [
    {
      id: "Basic",
      name: "Basic Plan",
      price: "₹200",
      period: "monthly",
      features: [
        "Feature 1",
        "Feature 1",
        "Feature 1",
        "Feature 1",
        "Feature 1",
      ],
    },
    {
      id: "Premium",
      name: "Premium Plan",
      price: "₹1,200",
      period: "quarterly",
      features: [
        "Feature 1",
        "Feature 1",
        "Feature 1",
        "Feature 1",
        "Feature 1",
        "Feature 1",
        "Feature 1",
      ],
      popular: true,
    },
    {
      id: "Advanced",
      name: "Advanced Plan",
      price: "₹2,400",
      period: "yearly",
      features: [
        "Feature 1",
        "Feature 1",
        "Feature 1",
        "Feature 1",
        "Feature 1",
        "Feature 1",
        "Feature 1",
      ],
    },
  ];

  // Input style matching project convention
  const inputBaseStyle =
    "w-full border border-[#E6E6E6] rounded-xl px-4 py-3 text-[14px] font-normal text-[#1A1A1A] outline-none focus:border-gray-400 transition-colors placeholder:text-[#9C9C9C]";

  // Dropdown options
  const countryOptions = [
    { value: "", label: "Select" },
    { value: "India", label: "India" },
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
  ];

  const statesByCountry = {
    India: [
      { value: "Maharashtra", label: "Maharashtra" },
      { value: "Karnataka", label: "Karnataka" },
      { value: "Tamil Nadu", label: "Tamil Nadu" },
      { value: "Delhi", label: "Delhi" },
      { value: "Uttar Pradesh", label: "Uttar Pradesh" },
      { value: "Gujarat", label: "Gujarat" },
      { value: "Rajasthan", label: "Rajasthan" },
    ],
    USA: [
      { value: "California", label: "California" },
      { value: "Texas", label: "Texas" },
      { value: "New York", label: "New York" },
    ],
    UK: [
      { value: "England", label: "England" },
      { value: "Scotland", label: "Scotland" },
      { value: "Wales", label: "Wales" },
    ],
  };

  const citiesByState = {
    Maharashtra: [
      { value: "Mumbai", label: "Mumbai" },
      { value: "Pune", label: "Pune" },
      { value: "Nagpur", label: "Nagpur" },
    ],
    Karnataka: [
      { value: "Bangalore", label: "Bangalore" },
      { value: "Mysore", label: "Mysore" },
      { value: "Hubli", label: "Hubli" },
    ],
    "Tamil Nadu": [
      { value: "Chennai", label: "Chennai" },
      { value: "Coimbatore", label: "Coimbatore" },
      { value: "Madurai", label: "Madurai" },
    ],
    Delhi: [
      { value: "New Delhi", label: "New Delhi" },
      { value: "Dwarka", label: "Dwarka" },
      { value: "Rohini", label: "Rohini" },
    ],
    "Uttar Pradesh": [
      { value: "Lucknow", label: "Lucknow" },
      { value: "Noida", label: "Noida" },
      { value: "Varanasi", label: "Varanasi" },
    ],
    Gujarat: [
      { value: "Ahmedabad", label: "Ahmedabad" },
      { value: "Surat", label: "Surat" },
      { value: "Vadodara", label: "Vadodara" },
    ],
    Rajasthan: [
      { value: "Jaipur", label: "Jaipur" },
      { value: "Udaipur", label: "Udaipur" },
      { value: "Jodhpur", label: "Jodhpur" },
    ],
    California: [
      { value: "Los Angeles", label: "Los Angeles" },
      { value: "San Francisco", label: "San Francisco" },
    ],
    Texas: [
      { value: "Houston", label: "Houston" },
      { value: "Dallas", label: "Dallas" },
    ],
    "New York": [
      { value: "New York City", label: "New York City" },
      { value: "Buffalo", label: "Buffalo" },
    ],
    England: [
      { value: "London", label: "London" },
      { value: "Manchester", label: "Manchester" },
    ],
    Scotland: [
      { value: "Edinburgh", label: "Edinburgh" },
      { value: "Glasgow", label: "Glasgow" },
    ],
    Wales: [{ value: "Cardiff", label: "Cardiff" }],
  };

  const stateOptions = [
    { value: "", label: "Select" },
    ...(statesByCountry[formData.country] || []),
  ];
  const cityOptions = [
    { value: "", label: "Select" },
    ...(citiesByState[formData.state] || []),
  ];

  const schoolTypeOptions = [
    { value: "", label: "Select" },
    { value: "Public", label: "Public" },
    { value: "Private", label: "Private" },
    { value: "International", label: "International" },
  ];
  const studentCountOptions = [
    { value: "", label: "Select" },
    { value: "1-100", label: "1-100" },
    { value: "101-500", label: "101-500" },
    { value: "501-1000", label: "501-1000" },
    { value: "1000+", label: "1000+" },
  ];

  return (
    <div className="bg-white h-screen w-full flex overflow-hidden">
      {/* ========== LEFT PANEL - Fixed height, no expand ========== */}
      <div className="hidden xl:block w-[49%]">
        <div className="h-screen relative overflow-hidden">
          <img src={registerBg} alt="School children" className="h-full" />
          <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-20">
            <div className="flex flex-col gap-6">
              <h2 className="text-white font-bold text-5xl leading-[100%] max-w-[490px]">
                Manage Your School Smarter
              </h2>
              <p className="text-white text-xl">
                All-in-one platform for students, teachers & administration
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="bg-white text-[#055BDA] text-base font-semibold px-5 h-12 flex items-center rounded-xl hover:bg-blue-50 transition-colors"
              >
                Already have an account? Sign in
              </Link>
              <Link
                to="/track-registration"
                className="border border-white text-white text-sm font-semibold px-5 h-12 flex items-center rounded-[10px] hover:bg-white/10 transition-colors"
              >
                Track Registration Status
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========== RIGHT PANEL - Scrollable, hidden scrollbar ========== */}
      <div className="w-full xl:w-[65%] xl:pl-12 h-screen overflow-y-auto px-6 sm:px-10 lg:p-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
        <div className=" w-full py-10 flex flex-col gap-10">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <h1 className="text-[#0F172A] font-bold text-[32px] leading-[120%]">
              Create Your School Account
            </h1>
            <p className="text-[#64748B] text-[18px]">
              Setup your workspace in 3 easy steps
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-start gap-4">
            {/* Step 1 */}
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-[18px] font-semibold shrink-0 ${currentStep > 1 ? "bg-green-500 text-white" : currentStep === 1 ? "bg-[#055BDA] text-white" : "bg-[#F1F5F9] text-[#1E293B]"}`}
                >
                  {currentStep > 1 ? "✓" : "1"}
                </div>
                <div className="w-50 h-0.5 bg-[#E2E8F0] relative overflow-hidden rounded">
                  <div
                    className={`absolute left-0 top-0 h-full transition-all ${currentStep > 1 ? "w-full bg-green-500" : currentStep === 1 ? "w-[80%] bg-[#055BDA]" : "w-0"}`}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[13px] text-[#64748B]">Step 1</span>
                <span className="text-[14px] font-semibold text-[#0F172A]">
                  School Detail
                </span>
                <span
                  className={`text-[11px] font-semibold px-3 py-0.5 rounded-full ${currentStep > 1 ? "bg-green-100 text-green-600" : currentStep === 1 ? "bg-[#DBEAFE] text-[#3B82F6]" : "bg-[#F1F5F9] text-[#64748B]"}`}
                >
                  {currentStep > 1
                    ? "Completed"
                    : currentStep === 1
                      ? "In Progress"
                      : "Pending"}
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-[18px] font-semibold shrink-0 ${currentStep > 2 ? "bg-green-500 text-white" : currentStep === 2 ? "bg-[#055BDA] text-white" : "bg-[#F1F5F9] text-[#1E293B]"}`}
                >
                  {currentStep > 2 ? "✓" : "2"}
                </div>
                <div className="w-[200px] h-[2px] bg-[#E2E8F0] relative overflow-hidden rounded">
                  <div
                    className={`absolute left-0 top-0 h-full transition-all ${currentStep > 2 ? "w-full bg-green-500" : currentStep === 2 ? "w-[80%] bg-[#055BDA]" : "w-0"}`}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[13px] text-[#64748B]">Step 2</span>
                <span className="text-[14px] font-semibold text-[#0F172A]">
                  Admin Setup
                </span>
                <span
                  className={`text-[11px] font-semibold px-3 py-0.5 rounded-full ${currentStep > 2 ? "bg-green-100 text-green-600" : currentStep === 2 ? "bg-[#DBEAFE] text-[#3B82F6]" : "bg-[#F1F5F9] text-[#64748B]"}`}
                >
                  {currentStep > 2
                    ? "Completed"
                    : currentStep === 2
                      ? "In Progress"
                      : "Pending"}
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-[18px] font-semibold shrink-0 ${currentStep === 3 ? "bg-[#055BDA] text-white" : "bg-[#F1F5F9] text-[#1E293B]"}`}
              >
                3
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[13px] text-[#64748B]">Step 3</span>
                <span className="text-[14px] font-semibold text-[#0F172A]">
                  Choose Plan
                </span>
                <span
                  className={`text-[11px] font-semibold px-3 py-0.5 rounded-full ${currentStep === 3 ? "bg-[#DBEAFE] text-[#3B82F6]" : "bg-[#F1F5F9] text-[#64748B]"}`}
                >
                  {currentStep === 3 ? "In Progress" : "Pending"}
                </span>
              </div>
            </div>
          </div>

          {/* ===== STEP 1 ===== */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <h2 className="text-[#0F172A] font-semibold text-[20px]">
                  Set Up Your School
                </h2>
                <p className="text-[#64748B] text-[16px]">
                  Add your school details to get started with your management
                  system.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                {/* School Name + Domain */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#475569]">
                      School Name <span className="text-red-500">*</span>
                    </label>
                    <div className="w-full border border-[#E6E6E6] rounded-xl px-4 py-3 text-[14px] font-normal text-[#1A1A1A] outline-none focus:border-gray-400 transition-colors placeholder:text-[#9C9C9C]">
                      <input
                        type="text"
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleChange}
                        placeholder="e.g., Samarth Public School"
                        // className={inputBaseStyle}
                        className="w-full border-none outline-none"
                      />
                    </div>
                    {errors.schoolName && (
                      <span className="text-red-500 text-[12px]">
                        {errors.schoolName}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#475569]">
                      School Domain <span className="text-red-500">*</span>
                    </label>
                    <div className="w-full border border-[#E6E6E6] rounded-xl px-4 py-3 text-[14px] font-normal text-[#1A1A1A] outline-none focus:border-gray-400 transition-colors placeholder:text-[#9C9C9C]">
                      <input
                        type="text"
                        name="schoolDomain"
                        value={formData.schoolDomain}
                        onChange={handleChange}
                        placeholder="xyz"
                        className="w-full border-none outline-none"
                      />
                    </div>
                    {errors.schoolDomain && (
                      <span className="text-red-500 text-[12px]">
                        {errors.schoolDomain}
                      </span>
                    )}
                  </div>
                </div>

                {/* Country, State, City */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <SelectDropdown
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    options={countryOptions}
                    required
                    error={errors.country}
                  />
                  <SelectDropdown
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    options={stateOptions}
                    required
                    error={errors.state}
                  />
                  <SelectDropdown
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    options={cityOptions}
                    required
                    error={errors.city}
                  />
                </div>

                {/* School Type + Students */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <SelectDropdown
                    label="School Type"
                    name="schoolType"
                    value={formData.schoolType}
                    onChange={handleChange}
                    options={schoolTypeOptions}
                    required
                    error={errors.schoolType}
                  />
                  <SelectDropdown
                    label="Approx. Number of Students"
                    name="numberOfStudents"
                    value={formData.numberOfStudents}
                    onChange={handleChange}
                    options={studentCountOptions}
                    required
                    error={errors.numberOfStudents}
                  />
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-[#055BDA] text-white font-semibold text-[16px] px-6 h-12 rounded-xl hover:bg-[#044a9e] transition-colors"
                >
                  Next <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* ===== STEP 2 ===== */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <h2 className="text-[#0F172A] font-semibold text-[20px]">
                  Admin Account Setup
                </h2>
                <p className="text-[#64748B] text-[16px]">
                  Create your admin credentials to securely access and manage
                  your school.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-semibold text-[#475569]">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Peter Parker"
                    className={inputBaseStyle}
                  />
                  {errors.fullName && (
                    <span className="text-red-500 text-[12px]">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#475569]">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="91XXXXXXXX"
                      className={inputBaseStyle}
                    />
                    {errors.phoneNumber && (
                      <span className="text-red-500 text-[12px]">
                        {errors.phoneNumber}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#475569]">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={otpSent || otpVerified}
                      placeholder="abc@gmail.com"
                      className={`${inputBaseStyle} ${otpSent || otpVerified ? "bg-gray-100 text-[#64748B] cursor-not-allowed" : ""}`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-[12px]">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#475569]">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create password"
                      className={inputBaseStyle}
                    />
                    {errors.password && (
                      <span className="text-red-500 text-[12px]">
                        {errors.password}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-semibold text-[#475569]">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className={inputBaseStyle}
                    />
                    {errors.confirmPassword && (
                      <span className="text-red-500 text-[12px]">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-[12px] text-[#64748B]">
                  Use at least 8 characters with a mix of letters and numbers.
                </p>

                {/* Info banner */}
                <div className="bg-[#EDE9FE] border border-[#C4B5FD] rounded-lg px-4 py-3 flex items-center gap-2">
                  <span className="text-[#6D28D9]">ⓘ</span>
                  <span className="text-[14px] text-[#6D28D9]">
                    This account will have full administrative control over your
                    organization settings, billing, and user access.
                  </span>
                </div>

                {/* Email Verification */}
                <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-6">
                  <h3 className="text-center text-[#055BDA] font-semibold text-[18px] mb-3">
                    Email Verification
                  </h3>
                  {!otpSent && !otpVerified && (
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={loading}
                        className="bg-[#055BDA] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-[#044a9e] disabled:opacity-50"
                      >
                        {loading ? "Sending..." : "Send OTP"}
                      </button>
                    </div>
                  )}
                  {otpSent && !otpVerified && (
                    <div className="flex flex-col items-center gap-4">
                      <p className="text-[14px] text-[#475569] text-center">
                        We've sent a 6-digit code to{" "}
                        <strong>{formData.email}</strong>
                        <br />
                        enter it below to continue.
                      </p>
                      <div className="flex gap-3">
                        {otp.map((digit, i) => (
                          <input
                            key={i}
                            ref={(el) => (otpRefs.current[i] = el)}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                            className="w-12 h-14 text-center border border-[#E6E6E6] rounded-xl text-lg font-semibold outline-none focus:border-[#055BDA] bg-white"
                          />
                        ))}
                      </div>
                      <p className="text-[12px] text-red-500 font-medium">
                        The otp will be valid only for 15 minutes
                      </p>
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={loading}
                        className="bg-green-500 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-green-600 disabled:opacity-50"
                      >
                        {loading ? "Verifying..." : "Verify OTP"}
                      </button>
                      <p className="text-[14px] text-[#475569]">
                        Didn't receive OTP?{" "}
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="text-[#055BDA] font-medium hover:underline"
                        >
                          Resend OTP
                        </button>
                      </p>
                    </div>
                  )}
                  {otpSent && !otpVerified && (
                    <p className="text-center text-[12px] text-[#64748B] mt-3">
                      Email is locked until OTP verification is complete.
                    </p>
                  )}
                  {otpVerified && (
                    <div className="flex justify-center">
                      <div className="bg-green-500 text-white font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2">
                        ✓ Verified
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex items-center gap-2 border border-[#E6E6E6] font-semibold text-[#475569] px-5 h-12 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!otpVerified}
                  className={`flex items-center gap-2 font-semibold text-[16px] px-6 h-12 rounded-xl transition-colors ${otpVerified ? "bg-[#055BDA] text-white hover:bg-[#044a9e]" : "bg-gray-300 text-white cursor-not-allowed"}`}
                >
                  Next <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* ===== STEP 3 ===== */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <h2 className="text-[#0F172A] font-semibold text-[20px]">
                  Choose Your Plan
                </h2>
                <p className="text-[#64748B] text-[16px]">
                  Select a plan that fits your school's needs. You can upgrade
                  anytime.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        selectedPlan: plan.id,
                      }))
                    }
                    className={`relative border-2 rounded-xl p-5 cursor-pointer transition-all ${plan.popular ? "bg-gradient-to-b from-purple-500 to-purple-700 text-white" : ""} ${formData.selectedPlan === plan.id ? "border-[#055BDA]" : plan.popular ? "border-purple-500" : "border-[#E6E6E6] hover:border-[#055BDA]"} ${formData.selectedPlan !== plan.id && !plan.popular ? "bg-white" : ""}`}
                  >
                    {formData.selectedPlan === plan.id && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#055BDA] text-white text-[11px] font-semibold px-4 py-1 rounded-full z-10">
                        Selected
                      </span>
                    )}
                    {plan.popular && formData.selectedPlan !== plan.id && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                    <h3
                      className={`font-bold text-[15px] ${plan.popular ? "text-white" : "text-[#0F172A]"}`}
                    >
                      {plan.name}
                    </h3>
                    <div className="mt-2">
                      <span
                        className={`text-[22px] font-bold ${plan.popular ? "text-white" : "text-[#055BDA]"}`}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={`text-[13px] ${plan.popular ? "text-purple-200" : "text-[#64748B]"}`}
                      >
                        {" "}
                        {plan.period}
                      </span>
                    </div>
                    <ul className="mt-4 flex flex-col gap-2">
                      {plan.features.map((f, i) => (
                        <li
                          key={i}
                          className={`flex items-center gap-2 text-[13px] ${plan.popular ? "text-purple-100" : "text-[#475569]"}`}
                        >
                          <span
                            className={
                              plan.popular ? "text-green-300" : "text-green-500"
                            }
                          >
                            ✓
                          </span>{" "}
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex items-center gap-2 border border-[#E6E6E6] font-semibold text-[#475569] px-5 h-12 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center gap-2 bg-[#055BDA] text-white font-semibold text-[16px] px-6 h-12 rounded-xl hover:bg-[#044a9e] disabled:opacity-50 transition-colors"
                >
                  {loading ? "Submitting..." : "Submit ✓"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile links */}
        <div className="flex flex-wrap gap-3 pb-6 lg:hidden">
          <Link
            to="/login"
            className="text-[#055BDA] text-sm font-semibold hover:underline"
          >
            Already have an account? Sign in
          </Link>
          <Link
            to="/track-registration"
            className="text-[#0F172A] text-sm font-semibold hover:underline"
          >
            Track Registration Status
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
