import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../config/axiosInstance";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { useValidation } from "../../../components/hooks/useValidation";
import dropdown from "@dropdowns/nationalities";
import { 
  classOptions, sectionOptions, streamOptions, houseOptions,
  religionOptions, bloodGroupOptions, categoryOptions,
  motherTongueOptions, languageOptions, occupationOptions,
  qualificationOptions, relationOptions
} from "../../../components/constants/options";

{/* <--------------------------------------- icons ------------------------------------> */}
import { FiUpload } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { LuUser } from "react-icons/lu";
import { HiDocumentText } from "react-icons/hi";
import { MdClass } from "react-icons/md";
import { RiFileList3Fill } from "react-icons/ri";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { IoAdd } from "react-icons/io5";

function EditMyStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [uploadingDocs, setUploadingDocs] = useState(false);
  const { errors, validateField, validateForm, setErrors, touched, handleBlur: onBlur } = useValidation();

  const pages = ["student", "documents", "academic", "review"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transportOpted, setTransportOpted] = useState("No");
  const [showGuardian, setShowGuardian] = useState(false);
  const [showSibling, setShowSibling] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedPermanentCountry, setSelectedPermanentCountry] = useState(null);
  const [selectedPermanentState, setSelectedPermanentState] = useState(null);
  const [selectedPermanentCity, setSelectedPermanentCity] = useState(null);
  
  // Document states
  const [studentDocuments, setStudentDocuments] = useState({});
  const [parentDocuments, setParentDocuments] = useState({});
  const [otherDocuments, setOtherDocuments] = useState({});
  const [documentPreviews, setDocumentPreviews] = useState({});
  const [existingDocuments, setExistingDocuments] = useState({
    studentDocuments: [],
    parentDocuments: [],
    otherDocuments: []
  });

  // Siblings
  const [siblings, setSiblings] = useState([]);
  
  // Marks rows
  const [rows, setRows] = useState([{ subject: "", maxMarks: "", obtained: "" }]);

  const countryOptions = Country.getAllCountries().map((c) => ({
    value: c.isoCode,
    label: c.name,
  }));
  
  const stateOptions = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map((s) => ({
        value: s.isoCode,
        label: s.name,
      }))
    : [];
  
  const cityOptions = selectedState
    ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map((c) => ({
        value: c.name,
        label: c.name,
      }))
    : [];
  
  // Form Data State
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    academicYear: "",
    currentClass: "",
    section: "",
    stream: "",
    house: "",
    nationality: "",
    religion: "",
    category: "",
    bloodGroup: "",
    placeOfBirth: "",
    motherTongue: "",
    languagesKnown: "",
    aadhaarNumber: "",
    previousSchoolName: "",
    previousBoard: "",
    yearOfPassing: "",
    percentage: "",
    schoolCode: "",
    transferCertificateNo: "",
    transferReason: "",
    alternatePhone: "",
    currentAddressLine1: "",
    currentAddressLine2: "",
    currentCity: "",
    currentState: "",
    currentCountry: "India",
    currentPincode: "",
    permanentAddressLine1: "",
    permanentAddressLine2: "",
    permanentCity: "",
    permanentState: "",
    permanentCountry: "India",
    permanentPincode: "",
    sameAsCurrent: false,
    fatherName: "",
    fatherMobile: "",
    fatherEmail: "",
    fatherOccupation: "",
    fatherQualification: "",
    fatherDesignation: "",
    fatherOrganization: "",
    fatherOrganizationAddress: "",
    fatherAnnualIncome: "",
    motherName: "",
    motherMobile: "",
    motherEmail: "",
    motherOccupation: "",
    motherQualification: "",
    motherDesignation: "",
    motherOrganization: "",
    motherOrganizationAddress: "",
    motherAnnualIncome: "",
    guardianName: "",
    guardianMobile: "",
    guardianEmail: "",
    guardianRelation: "",
    allergies: "",
    chronicIllness: "",
    dietaryRestrictions: "",
    physicalDisability: "No",
    medication: "",
    doctorName: "",
    doctorContact: "",
    medicalNotes: "",
    route: "",
    busStop: "",
    busNumber: "",
    driverName: "",
    feeCategory: "",
    concessionType: "",
    concessionAmount: "",
    totalFee: "",
    remarks: "",
    specialInstructions: "",
    studentStatus: "Active",
  });

  const steps = [
    { title: "Student and Parents Details", icon: <LuUser size={24} /> },
    { title: "Upload Documents", icon: <HiDocumentText size={24} /> },
    { title: "Assign Class", icon: <MdClass size={24} /> },
    { title: "Review & Submit", icon: <RiFileList3Fill size={24} /> },
  ];

  const requiredDocs = ["Student Photo", "Aadhaar Card", "Birth Certificate", "Father Photo", "Mother Photo"];

  const uploadDocs = [
    { label: "Student Photo" },
    { label: "Aadhaar Card" },
    { label: "PassPort" },
    { label: "Birth Certificate" },
    { label: "Pan Card" },
    { label: "Previous School Marksheet" },
    { label: "Transfer Certificate" },
    { label: "Migration Certificate" },
  ];

  const guardianDocs = [
    { label: "Father Photo" },
    { label: "Mother Photo" },
    { label: "Parent ID Proof" },
    { label: "Guardian Photo" },
    { label: "Guardian Address Proof" },
    { label: "Authorization Letter" },
  ];

  const nationalityOptions = dropdown.getAllNationalities().map((n) => ({
    value: n.name,
    label: n.name,
  }));

  const generateYearOptions = (startYear, endYear) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(`${year}-${year + 1}`);
    }
    return years;
  };

  // Current address handlers
  const handleCountryChange = (option) => {
    setSelectedCountry(option);
    setSelectedState(null);
    setSelectedCity(null);
    handleInputChange('currentCountry', option ? option.label : "");
    handleInputChange('currentState', "");
    handleInputChange('currentCity', "");
  };

  const handleStateChange = (option) => {
    setSelectedState(option);
    setSelectedCity(null);
    handleInputChange('currentState', option ? option.label : "");
    handleInputChange('currentCity', "");
  };

  const handleCityChange = (option) => {
    setSelectedCity(option);
    handleInputChange('currentCity', option ? option.value : "");
  };

  const handlePermanentCountryChange = (option) => {
    setSelectedPermanentCountry(option);
    setSelectedPermanentState(null);
    setSelectedPermanentCity(null);
    handleInputChange('permanentCountry', option ? option.label : "");
    handleInputChange('permanentState', "");
    handleInputChange('permanentCity', "");
  };

  const handlePermanentStateChange = (option) => {
    setSelectedPermanentState(option);
    setSelectedPermanentCity(null);
    handleInputChange('permanentState', option ? option.label : "");
    handleInputChange('permanentCity', "");
  };

  const handlePermanentCityChange = (option) => {
    setSelectedPermanentCity(option);
    handleInputChange('permanentCity', option ? option.value : "");
  };

  const handleSameAsCurrentChange = (checked) => {
    handleInputChange('sameAsCurrent', checked);
    if (checked) {
      handleInputChange('permanentAddressLine1', formData.currentAddressLine1);
      handleInputChange('permanentAddressLine2', formData.currentAddressLine2);
      handleInputChange('permanentCity', formData.currentCity);
      handleInputChange('permanentState', formData.currentState);
      handleInputChange('permanentCountry', formData.currentCountry);
      handleInputChange('permanentPincode', formData.currentPincode);
      setSelectedPermanentCountry(selectedCountry);
      setSelectedPermanentState(selectedState);
      setSelectedPermanentCity(selectedCity);
    } else {
      // Clear permanent address when unchecked
      handleInputChange('permanentAddressLine1', '');
      handleInputChange('permanentAddressLine2', '');
      handleInputChange('permanentCity', '');
      handleInputChange('permanentState', '');
      handleInputChange('permanentCountry', 'India');
      handleInputChange('permanentPincode', '');
      setSelectedPermanentCountry(null);
      setSelectedPermanentState(null);
      setSelectedPermanentCity(null);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };


 useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/users/student/${id}`);
        const student = response.data;
        console.log("Student data:", student);
        populateFormData(student);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching student:", err);
        setError(err.response?.data?.message || "Failed to load student data");
        toast.error("Failed to load student data");
        setLoading(false);
      }
    };
    
    if (id) {
      fetchStudentData();
    }
  }, [id]);

  const populateFormData = (student) => {
    const studentInfo = student.studentInfo || {};
    const account = student.account || {};
    const personalInfo = studentInfo.personalInfo || {};
    const academicInfo = studentInfo.academicInfo || {};
    const contactInfo = studentInfo.contactInfo || {};
    const parentInfo = studentInfo.parentInfo || {};
    const medicalInfo = studentInfo.medicalInfo || {};
    const transportInfo = studentInfo.transportInfo || {};
    const documents = studentInfo.documents || {};
    const feeInfo = studentInfo.feeInfo || {};

    // Set form data
    setFormData({
      email: account.email || "",
      phone: account.phone || "",
      fullName: personalInfo.fullName || "",
      dateOfBirth: personalInfo.dateOfBirth ? personalInfo.dateOfBirth.split('T')[0] : "",
      gender: personalInfo.gender || "",
      academicYear: academicInfo.academicYear || "",
      currentClass: academicInfo.currentClass || "",
      section: academicInfo.section || "",
      stream: academicInfo.stream || "",
      house: academicInfo.house || "",
      nationality: personalInfo.nationality || "",
      religion: personalInfo.religion || "",
      category: personalInfo.category || "",
      bloodGroup: personalInfo.bloodGroup || "",
      placeOfBirth: personalInfo.placeOfBirth || "",
      motherTongue: personalInfo.motherTongue || "",
      languagesKnown: personalInfo.languagesKnown?.[0] || "",
      aadhaarNumber: personalInfo.aadhaarNumber || "",
      previousSchoolName: academicInfo.previousSchool?.name || "",
      previousBoard: academicInfo.previousSchool?.board || "",
      yearOfPassing: academicInfo.previousSchool?.yearOfPassing || "",
      percentage: academicInfo.previousSchool?.percentage || "",
      schoolCode: academicInfo.previousSchool?.schoolCode || "",
      transferCertificateNo: academicInfo.previousSchool?.transferCertificateNo || "",
      transferReason: academicInfo.previousSchool?.transferReason || "",
      alternatePhone: contactInfo.secondaryMobile || "",
      currentAddressLine1: contactInfo.currentAddress?.addressLine1 || "",
      currentAddressLine2: contactInfo.currentAddress?.addressLine2 || "",
      currentCity: contactInfo.currentAddress?.city || "",
      currentState: contactInfo.currentAddress?.state || "",
      currentCountry: contactInfo.currentAddress?.country || "India",
      currentPincode: contactInfo.currentAddress?.pincode || "",
      permanentAddressLine1: contactInfo.permanentAddress?.addressLine1 || "",
      permanentAddressLine2: contactInfo.permanentAddress?.addressLine2 || "",
      permanentCity: contactInfo.permanentAddress?.city || "",
      permanentState: contactInfo.permanentAddress?.state || "",
      permanentCountry: contactInfo.permanentAddress?.country || "India",
      permanentPincode: contactInfo.permanentAddress?.pincode || "",
      sameAsCurrent: contactInfo.permanentAddress?.sameAsCurrent || false,
      fatherName: parentInfo.father?.fullName || "",
      fatherMobile: parentInfo.father?.mobileNumber || "",
      fatherEmail: parentInfo.father?.email || "",
      fatherOccupation: parentInfo.father?.occupation || "",
      fatherQualification: parentInfo.father?.qualification || "",
      fatherDesignation: parentInfo.father?.designation || "",
      fatherOrganization: parentInfo.father?.organizationName || "",
      fatherOrganizationAddress: parentInfo.father?.organizationAddress || "",
      fatherAnnualIncome: parentInfo.father?.annualIncome || "",
      motherName: parentInfo.mother?.fullName || "",
      motherMobile: parentInfo.mother?.mobileNumber || "",
      motherEmail: parentInfo.mother?.email || "",
      motherOccupation: parentInfo.mother?.occupation || "",
      motherQualification: parentInfo.mother?.qualification || "",
      motherDesignation: parentInfo.mother?.designation || "",
      motherOrganization: parentInfo.mother?.organizationName || "",
      motherOrganizationAddress: parentInfo.mother?.organizationAddress || "",
      motherAnnualIncome: parentInfo.mother?.annualIncome || "",
      guardianName: parentInfo.localGuardian?.fullName || "",
      guardianMobile: parentInfo.localGuardian?.mobileNumber || "",
      guardianEmail: parentInfo.localGuardian?.email || "",
      guardianRelation: parentInfo.localGuardian?.relation || "",
      allergies: medicalInfo.allergies?.join(", ") || "",
      chronicIllness: medicalInfo.chronicIllness?.join(", ") || "",
      dietaryRestrictions: medicalInfo.dietaryRestrictions?.join(", ") || "",
      physicalDisability: medicalInfo.physicalDisability ? "Yes" : "No",
      medication: medicalInfo.medication?.map(m => m.name).join(", ") || "",
      doctorName: medicalInfo.doctor?.name || "",
      doctorContact: medicalInfo.doctor?.contactNumber || "",
      medicalNotes: medicalInfo.medicalNotes || "",
      route: transportInfo.route || "",
      busStop: transportInfo.busStop || "",
      busNumber: transportInfo.busNumber || "",
      driverName: transportInfo.driverName || "",
      feeCategory: feeInfo.feeCategory || "",
      concessionType: feeInfo.concessionType || "",
      concessionAmount: feeInfo.concessionAmount || "",
      totalFee: feeInfo.totalFee || "",
      remarks: studentInfo.additionalInfo?.remarks || "",
      specialInstructions: studentInfo.additionalInfo?.specialInstructions || "",
      studentStatus: studentInfo.accountInfo?.status || "Active",
    });
     setTransportOpted(transportInfo.opted ? "Yes" : "No");
    
    // Set show guardian if guardian exists
    if (parentInfo.localGuardian?.fullName) {
      setShowGuardian(true);
    }

    // Set selected country/state/city from existing data
    if (contactInfo.currentAddress?.country) {
      const country = countryOptions.find(c => c.label === contactInfo.currentAddress.country);
      if (country) {
        setSelectedCountry(country);
        if (contactInfo.currentAddress?.state) {
          const state = State.getStatesOfCountry(country.value).find(s => s.name === contactInfo.currentAddress.state);
          if (state) {
            setSelectedState({ value: state.isoCode, label: state.name });
            if (contactInfo.currentAddress?.city) {
              const city = City.getCitiesOfState(country.value, state.isoCode).find(c => c.name === contactInfo.currentAddress.city);
              if (city) {
                setSelectedCity({ value: city.name, label: city.name });
              }
            }
          }
        }
      }
    }
  if (contactInfo.permanentAddress && !contactInfo.permanentAddress.sameAsCurrent) {
      if (contactInfo.permanentAddress?.country) {
        const permCountry = countryOptions.find(c => c.label === contactInfo.permanentAddress.country);
        if (permCountry) {
          setSelectedPermanentCountry(permCountry);
          if (contactInfo.permanentAddress?.state) {
            const permState = State.getStatesOfCountry(permCountry.value).find(s => s.name === contactInfo.permanentAddress.state);
            if (permState) {
              setSelectedPermanentState({ value: permState.isoCode, label: permState.name });
              if (contactInfo.permanentAddress?.city) {
                const permCity = City.getCitiesOfState(permCountry.value, permState.isoCode).find(c => c.name === contactInfo.permanentAddress.city);
                if (permCity) {
                  setSelectedPermanentCity({ value: permCity.name, label: permCity.name });
                }
              }
            }
          }
        }
      }
    }
    
    // Set siblings
    if (parentInfo.siblings && parentInfo.siblings.length > 0) {
      setShowSibling(true);
      setSiblings(parentInfo.siblings.map(s => ({
        name: s.fullName || "",
        admission: s.admissionNumber || "",
        class: s.class || "",
        gender: s.gender || "",
        relation: s.relation || "",
      })));
    } else {
      setSiblings([{ name: "", admission: "", class: "", gender: "", relation: "" }]);
    }
    
    // Set marks rows
    if (academicInfo.subjects && academicInfo.subjects.length > 0) {
      setRows(academicInfo.subjects.map(s => ({
        subject: s.name || "",
        maxMarks: s.maxMarks || "",
        obtained: s.obtainedMarks || "",
      })));
    }
    
    // Set existing documents
    setExistingDocuments({
      studentDocuments: documents.studentDocuments || [],
      parentDocuments: documents.parentDocuments || [],
      otherDocuments: documents.otherDocuments || []
    });
  };

    const handleDocumentChange = (docType, category, file) => {
    if (!file) return;
    if (file.size > 1 * 1024 * 1024) {
      toast.error(`${docType} file size should be less than 1MB`);
      return;
    }
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      toast.error(`${docType} must be PDF, JPG, or PNG format`);
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    
    if (category === 'student') {
      setStudentDocuments(prev => ({ ...prev, [docType]: file }));
    } else if (category === 'parent') {
      setParentDocuments(prev => ({ ...prev, [docType]: file }));
    } else {
      setOtherDocuments(prev => ({ ...prev, [docType]: file }));
    }
    setDocumentPreviews(prev => ({ ...prev, [docType]: previewUrl }));
  };
  
  const handleSiblingChange = (index, field, value) => {
    const updatedSiblings = [...siblings];
    updatedSiblings[index][field] = value;
    setSiblings(updatedSiblings);
    const error = validateField(`sibling_${index}_${field}`, value);
    setErrors((prev) => ({...prev, [`sibling_${index}_${field}`]: error}));
  };
  
  const handleAddSibling = () => {
    setSiblings([...siblings, { name: "", admission: "", class: "", gender: "", relation: "" }]);
  };
  
  const handleFileChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const handleAddRow = () => {
    setRows([...rows, { subject: "", maxMarks: "", obtained: "" }]);
  };

  const calcPercent = (maxMarks, obtained) => {
    const max = Number(maxMarks);
    const get = Number(obtained);
    if (!max || max <= 0 || !get) return "";
    return ((get / max) * 100).toFixed(2);
  };

  const nextPage = () => {
    if (currentIndex < pages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
  console.log('=== VALIDATION DEBUG ===');
    console.log('Form data being submitted', formData)
     const activeSections = {
    showSibling: showSibling,
    showGuardian: showGuardian
  };
   const requiredFields = [
    'fullName', 'dateOfBirth', 'gender', 'phone', 'email',
    'currentAddressLine1', 'currentCity', 'currentState', 'currentPincode',
    'fatherName', 'motherName', 'academicYear', 'currentClass'
  ];
    const missingFields = [];
  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].trim() === '') {
      missingFields.push(field);
    }
  });
  
  if (missingFields.length > 0) {
    console.log('Missing required fields:', missingFields);
    toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
    return;
  }
    
    const isValid = validateForm(formData, activeSections);
     console.log('Validation result:', isValid);
  console.log('Validation errors:', errors);
    if (!isValid) {
      toast.error("Please fix all validation errors");
      return;
    }
    
    setSubmitting(true);
    
    try {
      const validSubjects = rows.filter(s => s.subject && s.maxMarks && s.obtained);
      const formattedSiblings = showSibling && siblings.length > 0 
        ? siblings.filter(s => s.name && s.name.trim() !== "").map(s => ({
            fullName: s.name,
            admissionNumber: s.admission,
            class: s.class,
            gender: s.gender,
            relation: s.relation,
          }))
        : [];
      
      const cleanValue = (value) => {
        if (value === "" || value === null || value === undefined) return undefined;
        if (typeof value === 'string' && value.trim() === '') return undefined;
        return value;
      };
      
      const updateData = {
        account: {
          email: formData.email,
          phone: formData.phone,
          status: formData.studentStatus,
        },
        studentInfo: {
          personalInfo: {
            fullName: cleanValue(formData.fullName),
            dateOfBirth: cleanValue(formData.dateOfBirth),
            gender: cleanValue(formData.gender),
            nationality: cleanValue(formData.nationality),
            religion: cleanValue(formData.religion),
            category: cleanValue(formData.category),
            bloodGroup: cleanValue(formData.bloodGroup),
            placeOfBirth: cleanValue(formData.placeOfBirth),
            motherTongue: cleanValue(formData.motherTongue),
            languagesKnown: formData.languagesKnown ? [formData.languagesKnown] : [],
            aadhaarNumber: cleanValue(formData.aadhaarNumber),
          },
          academicInfo: {
            academicYear: cleanValue(formData.academicYear),
            currentClass: cleanValue(formData.currentClass),
            section: cleanValue(formData.section),
            stream: cleanValue(formData.stream),
            house: cleanValue(formData.house),
            previousSchool: {
              name: cleanValue(formData.previousSchoolName),
              board: cleanValue(formData.previousBoard),
              yearOfPassing: cleanValue(formData.yearOfPassing),
              percentage: formData.percentage ? parseFloat(formData.percentage) : undefined,
              transferCertificateNo: cleanValue(formData.transferCertificateNo),
              transferReason: cleanValue(formData.transferReason),
            },
            subjects: validSubjects.map(s => ({
              name: s.subject,
              maxMarks: parseInt(s.maxMarks),
              obtainedMarks: parseInt(s.obtained),
              percentage: parseFloat(calcPercent(s.maxMarks, s.obtained)),
            })),
          },
          contactInfo: {
            primaryMobile: formData.phone,
            secondaryMobile: cleanValue(formData.alternatePhone),
            email: formData.email,
            currentAddress: {
              addressLine1: formData.currentAddressLine1,
              addressLine2: cleanValue(formData.currentAddressLine2),
              city: formData.currentCity,
              state: formData.currentState,
              country: formData.currentCountry,
              pincode: formData.currentPincode,
            },
            permanentAddress: formData.sameAsCurrent ? { sameAsCurrent: true } : {
              addressLine1: cleanValue(formData.permanentAddressLine1),
              addressLine2: cleanValue(formData.permanentAddressLine2),
              city: cleanValue(formData.permanentCity),
              state: cleanValue(formData.permanentState),
              country: cleanValue(formData.permanentCountry),
              pincode: cleanValue(formData.permanentPincode),
              sameAsCurrent: false,
            },
          },
          parentInfo: {
            father: {
              fullName: cleanValue(formData.fatherName),
              mobileNumber: cleanValue(formData.fatherMobile),
              email: cleanValue(formData.fatherEmail),
              occupation: cleanValue(formData.fatherOccupation),
              qualification: cleanValue(formData.fatherQualification),
              designation: cleanValue(formData.fatherDesignation),
              organizationName: cleanValue(formData.fatherOrganization),
              organizationAddress: cleanValue(formData.fatherOrganizationAddress),
              annualIncome: formData.fatherAnnualIncome ? parseFloat(formData.fatherAnnualIncome) : undefined,
            },
            mother: {
              fullName: cleanValue(formData.motherName),
              mobileNumber: cleanValue(formData.motherMobile),
              email: cleanValue(formData.motherEmail),
              occupation: cleanValue(formData.motherOccupation),
              qualification: cleanValue(formData.motherQualification),
              designation: cleanValue(formData.motherDesignation),
              organizationName: cleanValue(formData.motherOrganization),
              organizationAddress: cleanValue(formData.motherOrganizationAddress),
              annualIncome: formData.motherAnnualIncome ? parseFloat(formData.motherAnnualIncome) : undefined,
            },
            localGuardian: showGuardian && formData.guardianName ? {
              fullName: cleanValue(formData.guardianName),
              relation: cleanValue(formData.guardianRelation),
              mobileNumber: cleanValue(formData.guardianMobile),
              email: cleanValue(formData.guardianEmail),
            } : undefined,
            siblings: formattedSiblings,
          },
          medicalInfo: {
            allergies: formData.allergies ? [formData.allergies] : [],
            chronicIllness: formData.chronicIllness ? [formData.chronicIllness] : [],
            dietaryRestrictions: formData.dietaryRestrictions ? [formData.dietaryRestrictions] : [],
            physicalDisability: formData.physicalDisability === 'Yes',
            medication: formData.medication ? [{ name: formData.medication }] : [],
            doctor: {
              name: cleanValue(formData.doctorName),
              contactNumber: formData.doctorContact ? String(formData.doctorContact) : undefined,
            },
            medicalNotes: cleanValue(formData.medicalNotes),
          },
          feeInfo: {
            feeCategory: cleanValue(formData.feeCategory),
            concessionType: cleanValue(formData.concessionType),
            concessionAmount: formData.concessionAmount ? parseFloat(formData.concessionAmount) : undefined,
            totalFee: formData.totalFee ? parseFloat(formData.totalFee) : undefined,
          },
          transportInfo: {
            opted: transportOpted === 'Yes',
            route: cleanValue(formData.route),
            busStop: cleanValue(formData.busStop),
            busNumber: cleanValue(formData.busNumber),
            driverName: cleanValue(formData.driverName),
          },
          additionalInfo: {
            remarks: cleanValue(formData.remarks),
            specialInstructions: cleanValue(formData.specialInstructions),
          },
          accountInfo: {
            status: formData.studentStatus,
          },
        },
      };

      const removeUndefined = (obj) => {
        if (obj && typeof obj === 'object') {
          Object.keys(obj).forEach(key => {
            if (obj[key] === undefined) {
              delete obj[key];
            } else if (typeof obj[key] === 'object') {
              removeUndefined(obj[key]);
            }
          });
        }
        return obj;
      };
      
      const cleanedData = removeUndefined(updateData);
      console.log("Updating student:", cleanedData);
      
      await api.put(`/users/student/${id}`, cleanedData);
      
      // Upload new documents
      if (Object.keys(studentDocuments).length > 0 || Object.keys(parentDocuments).length > 0 || Object.keys(otherDocuments).length > 0) {
        setUploadingDocs(true);
        toast.info("Uploading documents...");
        
        const uploadPromises = [];
        
        for (const [docType, file] of Object.entries(studentDocuments)) {
          if (file) {
            const docFormData = new FormData();
            docFormData.append("document", file);
            docFormData.append("documentType", docType);
            docFormData.append("category", "student");
            uploadPromises.push(
              api.post(`/users/student/${id}/documents`, docFormData, {
                headers: { "Content-Type": "multipart/form-data" }
              })
            );
          }
        }
        
        for (const [docType, file] of Object.entries(parentDocuments)) {
          if (file) {
            const docFormData = new FormData();
            docFormData.append("document", file);
            docFormData.append("documentType", docType);
            docFormData.append("category", "parent");
            uploadPromises.push(
              api.post(`/users/student/${id}/documents`, docFormData, {
                headers: { "Content-Type": "multipart/form-data" }
              })
            );
          }
        }
        
        for (const [docType, file] of Object.entries(otherDocuments)) {
          if (file) {
            const docFormData = new FormData();
            docFormData.append("document", file);
            docFormData.append("documentType", docType);
            docFormData.append("category", "other");
            uploadPromises.push(
              api.post(`/users/student/${id}/documents`, docFormData, {
                headers: { "Content-Type": "multipart/form-data" }
              })
            );
          }
        }
        
        if (uploadPromises.length > 0) {
          await Promise.all(uploadPromises);
          console.log("Documents uploaded successfully");
        }
        setUploadingDocs(false);
      }
      
      toast.success("Student updated successfully!");
      setTimeout(() => {
        navigate(`/Studentdetails/${id}`);
      }, 2000);
      
    } catch (err) {
      console.error("Update error:", err);
      console.error("Error response:", err.response?.data);
      toast.error(err.response?.data?.message || "Failed to update student");
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <Link to="/teacher-mystudents" className="text-blue-500 underline mt-2 inline-block">
            Back to Students
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2">
        <Link to="/teacher-mystudents" style={{textDecoration:"none"}}>
          <span className="text-[#696969] text-[18px] sm:text-[20px] md:text-[24px] font-semibold">
            My Students
          </span>
        </Link>
        <span className="text-[#696969]">
          <IoIosArrowForward size={18} />
        </span>
        <span className="text-[#1c1c1c] text-[18px] sm:text-[20px] md:text-[24px] font-semibold">
          Edit Student
        </span>
      </div>

      {/* Card */}
      <div className="mt-6 bg-white p-4 sm:p-6 rounded-md shadow-md">
        {/* Heading */}
        <div className="flex justify-center text-center">
          <div className="flex flex-col gap-1">
            <span className="text-[#1c1c1c] text-[16px] sm:text-[18px] font-semibold">
              Edit Student
            </span>
            <span className="text-[#9c9c9c] text-[13px] sm:text-[15px] font-normal">
              Update the student information
            </span>
          </div>
        </div>

        {/* Stepper */}
        <div className="px-10 sm:px-30 md:px-50 mt-18 pb-24">
          <div className="relative h-2 bg-[#eeeeee] rounded-full">
            <div className="absolute -top-6 left-0 w-full flex justify-between">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full shadow-sm ${
                    index <= currentIndex ? 'bg-[#E9C05A] text-[#0B3142]' : 'bg-gray-300 text-gray-500'
                  }`}>
                    {step.icon}
                  </div>
                  <span className="w-30 mt-5 text-[#1c1c1c] text-[14px] sm:text-[16px] md:text-[18px] font-semibold leading-tight text-center">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        {(() => {
          switch (pages[currentIndex]) {
            case "student":
              return (
                <div className="flex flex-col gap-2 sm:gap-3 mt-6">
                  {/* Student Information */}
                  <div className="mt-6 flex flex-col gap-2 sm:gap-3">
                    <div className="flex gap-4 items-center">
                      <div className="p-1 rounded-full h-10 bg-[#00C950]"></div>
                      <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
                        <span>1. Student Information</span>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label className="text-[#696969] font-medium text-[14px]">Academic Year</label>
                          <span className="text-[#DC2626] text-[14px]">*</span>
                        </div>
                        <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                          <select
                            value={formData.academicYear}
                            onChange={(e) => handleInputChange('academicYear', e.target.value)}
                            className="w-full border-none outline-none"
                          >
                            <option value="">Select Your Academic Year</option>
                            {generateYearOptions(2020, 2030).map(year => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                          {errors.academicYear && <small className="text-red-500 text-xs mt-1">{errors.academicYear}</small>}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label className="text-[#696969] font-medium text-[14px]">Student Name</label>
                          <span className="text-[#DC2626] text-[14px]">*</span>
                        </div>
                       <input
  type="text"
  placeholder="Enter Student Name"
  value={formData.fullName}
  onChange={(e) => {
    // Allow letters, spaces, hyphens, dots, apostrophes
    const value = e.target.value.replace(/[^a-zA-Z\s\-\.']/g, '');
    handleInputChange('fullName', value);
  }}
  onBlur={() => onBlur('fullName')}
  className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
/>
{errors.fullName && touched.fullName && <small className="text-red-500 text-xs mt-1">{errors.fullName}</small>}
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label className="text-[#696969] font-medium text-[14px]">Date of Birth</label>
                          <span className="text-[#DC2626] text-[14px]">*</span>
                        </div>
                      <input
  type="date"
  value={formData.dateOfBirth}
  onChange={(e) => {
    const selectedDate = e.target.value;
    // Validate age
    if (selectedDate) {
      const birthDate = new Date(selectedDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 3 || age > 25) {
        toast.error("Student age must be between 3 and 25 years");
        return;
      }
      if (birthDate > today) {
        toast.error("Date of birth cannot be in the future");
        return;
      }
    }
    handleInputChange('dateOfBirth', selectedDate);
  }}
  onBlur={() => onBlur('dateOfBirth')}
  className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
  max={new Date().toISOString().split('T')[0]} // Prevent future dates
/>
{errors.dateOfBirth && touched.dateOfBirth && <small className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</small>}
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label className="text-[#696969] font-medium text-[14px]">Aadhaar Number</label>
                        </div>
                       <input
  type="text"
  placeholder="Enter Your Aadhaar Number"
  value={formData.aadhaarNumber}
  onChange={(e) => {
    // Only allow numbers, max 12 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 12);
    handleInputChange('aadhaarNumber', value);
  }}
  onBlur={() => onBlur('aadhaarNumber')}
  className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
/>
{errors.aadhaarNumber && touched.aadhaarNumber && <small className="text-red-500 text-xs mt-1">{errors.aadhaarNumber}</small>}
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label className="text-[#696969] font-medium text-[14px]">Gender</label>
                          <span className="text-[#DC2626] text-[14px]">*</span>
                        </div>
                        <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                          <select
                            value={formData.gender}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            className="w-full border-none outline-none"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.gender && <small className="text-red-500 text-xs mt-1">{errors.gender}</small>}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label className="text-[#696969] font-medium text-[14px]">Nationality</label>
                          <span className="text-[#DC2626] text-[14px]">*</span>
                        </div>
                        <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                          <Select
                            options={nationalityOptions}
                            value={nationalityOptions.find(opt => opt.value === formData.nationality)}
                            onChange={(option) => handleInputChange('nationality', option?.value || '')}
                            placeholder="Select Nationality"
                            className="w-full"
                            styles={{
                              control: (base) => ({
                                ...base,
                                borderColor: "#9C9C9C",
                                borderRadius: "6px",
                                minHeight: "42px",
                                boxShadow: "none",
                                "&:hover": { borderColor: "#9C9C9C" },
                              }),
                            }}
                          />
                          {errors.nationality && <small className="text-red-500 text-xs mt-1">{errors.nationality}</small>}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label className="text-[#696969] font-medium text-[14px]">Category</label>
                        </div>
                        <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                          <select
                            value={formData.category}
                            onChange={(e) => handleInputChange('category', e.target.value)}
                            className="w-full border-none outline-none"
                          >
                            <option value="">Select Category</option>
                            <option value="General">General</option>
                            <option value="OBC">OBC</option>
                            <option value="SC">SC</option>
                            <option value="ST">ST</option>
                          </select>
                          {errors.category && <small className="text-red-500 text-xs mt-1">{errors.category}</small>}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label className="text-[#696969] font-medium text-[14px]">Religion</label>
                        </div>
                        <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                          <select
                            value={formData.religion}
                            onChange={(e) => handleInputChange('religion', e.target.value)}
                            className="w-full border-none outline-none"
                          >
                            <option value="">Select Religion</option>
                            {religionOptions.map(religion => (
                              <option key={religion} value={religion}>{religion}</option>
                            ))}
                          </select>
                          {errors.religion && <small className="text-red-500 text-xs mt-1">{errors.religion}</small>}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label className="text-[#696969] font-medium text-[14px]">Blood Group</label>
                        </div>
                        <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                          <select
                            value={formData.bloodGroup}
                            onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                            className="w-full border-none outline-none"
                          >
                            <option value="">Select Blood Group</option>
                            {bloodGroupOptions.map(bg => (
                              <option key={bg} value={bg}>{bg}</option>
                            ))}
                          </select>
                          {errors.bloodGroup && <small className="text-red-500 text-xs mt-1">{errors.bloodGroup}</small>}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label className="text-[#696969] font-medium text-[14px]">Place of Birth</label>
                        </div>
                        <input
                          type="text"
                          placeholder="Enter Place of Birth"
                          value={formData.placeOfBirth}
                          onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
                          className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                        />
                        {errors.placeOfBirth && <small className="text-red-500 text-xs mt-1">{errors.placeOfBirth}</small>}
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label className="text-[#696969] font-medium text-[14px]">Mother Tongue</label>
                        </div>
                        <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                          <select
                            value={formData.motherTongue}
                            onChange={(e) => handleInputChange('motherTongue', e.target.value)}
                            className="w-full border-none outline-none"
                          >
                            <option value="">Select Mother Tongue</option>
                            {motherTongueOptions.map(tongue => (
                              <option key={tongue} value={tongue}>{tongue}</option>
                            ))}
                          </select>
                          {errors.motherTongue && <small className="text-red-500 text-xs mt-1">{errors.motherTongue}</small>}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label className="text-[#696969] font-medium text-[14px]">Language Known</label>
                        </div>
                        <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                          <select
                            value={formData.languagesKnown}
                            onChange={(e) => handleInputChange('languagesKnown', e.target.value)}
                            className="w-full border-none outline-none"
                          >
                            <option value="">Select Language</option>
                            {languageOptions.map(lang => (
                              <option key={lang} value={lang}>{lang}</option>
                            ))}
                          </select>
                          {errors.languagesKnown && <small className="text-red-500 text-xs mt-1">{errors.languagesKnown}</small>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="mt-6">
                    <div className="flex gap-4 items-center">
                      <div className="p-1 rounded-full h-10 bg-[#2B7FFF]"></div>
                      <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
                        <span>2. Contact Information</span>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3 mt-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label className="text-[#696969] font-medium text-[14px]">Mobile Number</label>
                          <span className="text-[#DC2626] text-[14px]">*</span>
                        </div>
                       <input
  type="tel"
  placeholder="Enter Mobile Number"
  value={formData.phone}
  onChange={(e) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    handleInputChange('phone', value);
  }}
  onBlur={() => onBlur('phone')}
  className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
/>
{errors.phone && touched.phone && <small className="text-red-500 text-xs mt-1">{errors.phone}</small>}
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label className="text-[#696969] font-medium text-[14px]">Email</label>
                          <span className="text-[#DC2626] text-[14px]">*</span>
                        </div>
                        <input
                          type="email"
                          placeholder="Enter Email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                        />
                        {errors.email && <small className="text-red-500 text-xs mt-1">{errors.email}</small>}
                      </div>
                    </div>
                  </div>

                  {/* Address Details */}
                  <div className="grid lg:grid-cols-3 mt-4">
                    <div className="border-b-2 border-[#12516E] p-2 text-[16px] font-semibold text-[#1c1c1c]">
                      <span>Current Address</span>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3 mt-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Address Line 1</label>
                        <span className="text-[#DC2626] text-[14px]">*</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter Address Line 1"
                        value={formData.currentAddressLine1}
                        onChange={(e) => handleInputChange('currentAddressLine1', e.target.value)}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.currentAddressLine1 && <small className="text-red-500 text-xs mt-1">{errors.currentAddressLine1}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Country</label>
                        <span className="text-[#DC2626] text-[14px]">*</span>
                      </div>
                      <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                        <Select
                          options={countryOptions}
                          value={selectedCountry}
                          onChange={handleCountryChange}
                          placeholder="Select Country"
                          className="w-full"
                          styles={{
                            control: (base) => ({
                              ...base,
                              borderColor: "#9C9C9C",
                              borderRadius: "6px",
                              minHeight: "42px",
                              boxShadow: "none",
                              "&:hover": { borderColor: "#9C9C9C" },
                            }),
                          }}
                        />
                        {errors.currentCountry && <small className="text-red-500 text-xs mt-1">{errors.currentCountry}</small>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">State</label>
                        <span className="text-[#DC2626] text-[14px]">*</span>
                      </div>
                      <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                        <Select
                          options={stateOptions}
                          value={selectedState}
                          onChange={handleStateChange}
                          placeholder="Select State"
                          isDisabled={!selectedCountry}
                          styles={{
                            control: (base) => ({
                              ...base,
                              borderColor: "#9C9C9C",
                              borderRadius: "6px",
                              minHeight: "42px",
                              boxShadow: "none",
                              "&:hover": { borderColor: "#9C9C9C" },
                            }),
                          }}
                        />
                        {errors.currentState && <small className="text-red-500 text-xs mt-1">{errors.currentState}</small>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">City</label>
                        <span className="text-[#DC2626] text-[14px]">*</span>
                      </div>
                      <Select
                        options={cityOptions}
                        value={selectedCity}
                        onChange={handleCityChange}
                        placeholder="Select City"
                        isDisabled={!selectedState}
                        styles={{
                          control: (base) => ({
                            ...base,
                            borderColor: "#9C9C9C",
                            borderRadius: "6px",
                            minHeight: "42px",
                            boxShadow: "none",
                            "&:hover": { borderColor: "#9C9C9C" },
                          }),
                        }}
                      />
                      {errors.currentCity && <small className="text-red-500 text-xs mt-1">{errors.currentCity}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Pin Code</label>
                        <span className="text-[#DC2626] text-[14px]">*</span>
                      </div>
                     <input
  type="text"
  placeholder="Pin Code"
  value={formData.currentPincode}
  onChange={(e) => {
    // Only allow 6 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    handleInputChange('currentPincode', value);
  }}
  onBlur={() => onBlur('currentPincode')}
  className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
/>
{errors.currentPincode && touched.currentPincode && <small className="text-red-500 text-xs mt-1">{errors.currentPincode}</small>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <span>
                      <LiaLongArrowAltRightSolid size={20} className="text-[#118AB2] font-semibold" />
                    </span>
                    <span className="text-[17px] text-[#1c1c1c] font-semibold">
                      is Current & Permanent Address is Same?
                    </span>
                    <input
                      type="checkbox"
                      checked={formData.sameAsCurrent}
                      onChange={(e) => handleSameAsCurrentChange(e.target.checked)}
                    />
                  </div>

                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3 mt-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Address Line 1</label>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter Address Line 1"
                        value={formData.permanentAddressLine1}
                        onChange={(e) => handleInputChange('permanentAddressLine1', e.target.value)}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.permanentAddressLine1 && <small className="text-red-500 text-xs mt-1">{errors.permanentAddressLine1}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Country</label>
                        <span className="text-[#DC2626] text-[14px]">*</span>
                      </div>
                      <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                        <Select
                          options={countryOptions}
                          value={selectedPermanentCountry}
                          onChange={handlePermanentCountryChange}
                          placeholder="Select Country"
                          styles={{
                            control: (base) => ({
                              ...base,
                              borderColor: "#9C9C9C",
                              borderRadius: "6px",
                              minHeight: "42px",
                              boxShadow: "none",
                              "&:hover": { borderColor: "#9C9C9C" },
                            }),
                          }}
                        />
                        {errors.permanentCountry && <small className="text-red-500 text-xs mt-1">{errors.permanentCountry}</small>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">State</label>
                        <span className="text-[#DC2626] text-[14px]">*</span>
                      </div>
                      <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                        <Select
                          options={selectedPermanentCountry ? State.getStatesOfCountry(selectedPermanentCountry.value).map(s => ({ value: s.isoCode, label: s.name })) : []}
                          value={selectedPermanentState}
                          onChange={handlePermanentStateChange}
                          placeholder="Select State"
                          isDisabled={!selectedPermanentCountry}
                          styles={{
                            control: (base) => ({
                              ...base,
                              borderColor: "#9C9C9C",
                              borderRadius: "6px",
                              minHeight: "42px",
                              boxShadow: "none",
                              "&:hover": { borderColor: "#9C9C9C" },
                            }),
                          }}
                        />
                        {errors.permanentState && <small className="text-red-500 text-xs mt-1">{errors.permanentState}</small>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">City</label>
                        <span className="text-[#DC2626] text-[14px]">*</span>
                      </div>
                      <Select
                        options={selectedPermanentState ? City.getCitiesOfState(selectedPermanentCountry?.value, selectedPermanentState?.value).map(c => ({ value: c.name, label: c.name })) : []}
                        value={selectedPermanentCity}
                        onChange={handlePermanentCityChange}
                        placeholder="Select City"
                        isDisabled={!selectedPermanentState}
                        styles={{
                          control: (base) => ({
                            ...base,
                            borderColor: "#9C9C9C",
                            borderRadius: "6px",
                            minHeight: "42px",
                            boxShadow: "none",
                            "&:hover": { borderColor: "#9C9C9C" },
                          }),
                        }}
                      />
                      {errors.permanentCity && <small className="text-red-500 text-xs mt-1">{errors.permanentCity}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Pin Code</label>
                      </div>
                      <input
                        type="text"
                        placeholder="Pin Code"
                        value={formData.permanentPincode}
                        onChange={(e) => handleInputChange('permanentPincode', e.target.value)}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.permanentPincode && <small className="text-red-500 text-xs mt-1">{errors.permanentPincode}</small>}
                    </div>
                  </div>

                  {/* Parent/Guardian/Sibling Details */}
                  <div className="flex gap-4 items-center mt-4">
                    <div className="p-1 rounded-full h-10 bg-[#FF6900]"></div>
                    <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
                      <span>3. Parent/Guardian/Sibling Details</span>
                    </div>
                  </div>

                  {/* Father Details */}
                  <div className="grid lg:grid-cols-3">
                    <div className="border-b-2 border-[#12516E] p-2 text-[16px] font-semibold text-[#1c1c1c]">
                      <span>Father Details</span>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3 mt-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Father Name</label>
                        <span className="text-[#DC2626] text-[14px]">*</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter Father Name"
                        value={formData.fatherName}
                        onChange={(e) => handleInputChange('fatherName', e.target.value)}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.fatherName && <small className="text-red-500 text-xs mt-1">{errors.fatherName}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Mobile Number</label>
                      </div>
                     <input
  type="tel"
  placeholder="Enter Mobile Number"
  value={formData.fatherMobile}
  onChange={(e) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    handleInputChange('fatherMobile', value);
  }}
  onBlur={() => onBlur('fatherMobile')}
  className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
/>
{errors.fatherMobile && touched.fatherMobile && <small className="text-red-500 text-xs mt-1">{errors.fatherMobile}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Email</label>
                      </div>
                      <input
                        type="email"
                        placeholder="Enter Email"
                        value={formData.fatherEmail}
                        onChange={(e) => {
    // Remove spaces
    const value = e.target.value.replace(/\s/g, '');
    handleInputChange('fatherEmail', value);
  }}
  onBlur={() => onBlur('fatherEmail')}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.fatherEmail && <small className="text-red-500 text-xs mt-1">{errors.fatherEmail}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Occupation</label>
                      </div>
                      <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                        <select
                          value={formData.fatherOccupation}
                          onChange={(e) => handleInputChange('fatherOccupation', e.target.value)}
                          className="w-full border-none outline-none"
                        >
                          <option value="">Select Occupation</option>
                          {occupationOptions.map(occ => (
                            <option key={occ} value={occ}>{occ}</option>
                          ))}
                        </select>
                        {errors.fatherOccupation && <small className="text-red-500 text-xs mt-1">{errors.fatherOccupation}</small>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Qualification</label>
                      </div>
                      <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                        <select
                          value={formData.fatherQualification}
                          onChange={(e) => handleInputChange('fatherQualification', e.target.value)}
                          className="w-full border-none outline-none"
                        >
                          <option value="">Select Qualification</option>
                          {qualificationOptions.map(qual => (
                            <option key={qual} value={qual}>{qual}</option>
                          ))}
                        </select>
                        {errors.fatherQualification && <small className="text-red-500 text-xs mt-1">{errors.fatherQualification}</small>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Designation</label>
                      </div>
                      <input
                        type="text"
                        placeholder="Designation"
                        value={formData.fatherDesignation}
                        onChange={(e) => handleInputChange('fatherDesignation', e.target.value)}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.fatherDesignation && <small className="text-red-500 text-xs mt-1">{errors.fatherDesignation}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Organization Name</label>
                      </div>
                      <input
                        type="text"
                        value={formData.fatherOrganization}
                        onChange={(e) => handleInputChange('fatherOrganization', e.target.value)}
                        placeholder="Organization Name"
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.fatherOrganization && <small className="text-red-500 text-xs mt-1">{errors.fatherOrganization}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Organization Address</label>
                      </div>
                      <input
                        type="text"
                        value={formData.fatherOrganizationAddress}
                        onChange={(e) => handleInputChange('fatherOrganizationAddress', e.target.value)}
                        placeholder="Enter Organization Address"
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.fatherOrganizationAddress && <small className="text-red-500 text-xs mt-1">{errors.fatherOrganizationAddress}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Annual Income</label>
                      </div>
                      <input
                        type="number"
                        placeholder="Enter Annual Income"
                        value={formData.fatherAnnualIncome}
                        onChange={(e) => handleInputChange('fatherAnnualIncome', e.target.value)}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.fatherAnnualIncome && <small className="text-red-500 text-xs mt-1">{errors.fatherAnnualIncome}</small>}
                    </div>
                  </div>

                  {/* Mother Details */}
                  <div className="grid lg:grid-cols-3 mt-4">
                    <div className="border-b-2 border-[#12516E] p-2 text-[16px] font-semibold text-[#1c1c1c]">
                      <span>Mother Details</span>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3 mt-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Mother Name</label>
                        <span className="text-[#DC2626] text-[14px]">*</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter Mother Name"
                        value={formData.motherName}
                        onChange={(e) => handleInputChange('motherName', e.target.value)}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.motherName && <small className="text-red-500 text-xs mt-1">{errors.motherName}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Mobile Number</label>
                      </div>
                     <input
  type="tel"
  placeholder="Enter Mobile Number"
  value={formData.motherMobile}
  onChange={(e) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    handleInputChange('motherMobile', value);
  }}
  onBlur={() => onBlur('motherMobile')}
  className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
/>
{errors.motherMobile && touched.motherMobile && <small className="text-red-500 text-xs mt-1">{errors.motherMobile}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Email</label>
                      </div>
                      <input
                        type="email"
                        placeholder="Enter Email"
                        value={formData.motherEmail}
                        onChange={(e) => {
    // Remove spaces
    const value = e.target.value.replace(/\s/g, '');
    handleInputChange('motherEmail', value);
  }}
  onBlur={() => onBlur('motherEmail')}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.motherEmail && <small className="text-red-500 text-xs mt-1">{errors.motherEmail}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Occupation</label>
                      </div>
                      <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                        <select
                          value={formData.motherOccupation}
                          onChange={(e) => handleInputChange('motherOccupation', e.target.value)}
                          className="w-full border-none outline-none"
                        >
                          <option value="">Occupation</option>
                          <option value="gov">Government Employee</option>
                          <option value="bus">Business</option>
                          <option value="unemp">Unemployed</option>
                        </select>
                        {errors.motherOccupation && <small className="text-red-500 text-xs mt-1">{errors.motherOccupation}</small>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Qualification</label>
                      </div>
                      <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                        <select
                          value={formData.motherQualification}
                          onChange={(e) => handleInputChange('motherQualification', e.target.value)}
                          className="w-full border-none outline-none"
                        >
                          <option value="">Qualification</option>
                          <option value="matriculam">Matriculation</option>
                          <option value="inter">Intermediate</option>
                          <option value="grad">Graduation</option>
                          <option value="master">Masters</option>
                          <option value="phd">P.H.D</option>
                        </select>
                        {errors.motherQualification && <small className="text-red-500 text-xs mt-1">{errors.motherQualification}</small>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Designation</label>
                      </div>
                      <input
                        type="text"
                        value={formData.motherDesignation}
                        onChange={(e) => handleInputChange('motherDesignation', e.target.value)}
                        placeholder="Designation"
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.motherDesignation && <small className="text-red-500 text-xs mt-1">{errors.motherDesignation}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Organization Name</label>
                      </div>
                      <input
                        type="text"
                        value={formData.motherOrganization}
                        onChange={(e) => handleInputChange('motherOrganization', e.target.value)}
                        placeholder="Organization Name"
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.motherOrganization && <small className="text-red-500 text-xs mt-1">{errors.motherOrganization}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Organization Address</label>
                      </div>
                      <input
                        type="text"
                        value={formData.motherOrganizationAddress}
                        onChange={(e) => handleInputChange('motherOrganizationAddress', e.target.value)}
                        placeholder="Enter Organization Address"
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.motherOrganizationAddress && <small className="text-red-500 text-xs mt-1">{errors.motherOrganizationAddress}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Annual Income</label>
                      </div>
                      <input
                        type="text"
                        value={formData.motherAnnualIncome}
                       onChange={(e) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    handleInputChange('motherAnnualIncome', value);
  }}
  onBlur={() => onBlur('motherAnnualIncome')}
                        placeholder="Enter Annual Income"
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.motherAnnualIncome && <small className="text-red-500 text-xs mt-1">{errors.motherAnnualIncome}</small>}
                    </div>
                  </div>

                  {/* Local Guardian */}
                  <div className="grid lg:grid-cols-3">
                    <div className="flex items-center gap-2 mt-4 border-b-2 border-[#12516E] p-2">
                      <span className="text-[17px] text-[#1c1c1c] font-semibold">
                        Local Guardian Details if Any
                      </span>
                      <input
                        type="checkbox"
                        checked={showGuardian}
                        onChange={() => setShowGuardian(!showGuardian)}
                      />
                    </div>
                  </div>
                  {showGuardian && (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3 mt-2">
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label className="text-[#696969] font-medium text-[14px]">Full Name</label>
                          <span className="text-[#DC2626] text-[14px]">*</span>
                        </div>
                        <input
                          type="text"
                          placeholder="Enter Name"
                          value={formData.guardianName}
                          onChange={(e) => {
    // Only allow letters, spaces, hyphens, dots, apostrophes
    const value = e.target.value.replace(/[^a-zA-Z\s\-\.']/g, '');
    handleInputChange('guardianName', value);
  }}
  onBlur={() => onBlur('guardianName')}
                          className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                        />
                        {errors.guardianName && <small className="text-red-500 text-xs mt-1">{errors.guardianName}</small>}
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label className="text-[#696969] font-medium text-[14px]">Mobile Number</label>
                        </div>
                        <input
  type="tel"
  placeholder="Enter Mobile Number"
  value={formData.phone}
  onChange={(e) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    handleInputChange('phone', value);
  }}
  onBlur={() => onBlur('phone')}
  className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
/>
{errors.phone && touched.phone && <small className="text-red-500 text-xs mt-1">{errors.phone}</small>}
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label className="text-[#696969] font-medium text-[14px]">Email</label>
                        </div>
                        <input
                          type="email"
                          placeholder="Enter Email"
                          value={formData.guardianEmail}
                          onChange={(e) => handleInputChange('guardianEmail', e.target.value)}
                          className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                        />
                        {errors.guardianEmail && <small className="text-red-500 text-xs mt-1">{errors.guardianEmail}</small>}
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <label className="text-[#696969] font-medium text-[14px]">Relation</label>
                          <span className="text-[#DC2626] text-[14px]">*</span>
                        </div>
                        <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                          <select
                            value={formData.guardianRelation}
                            onChange={(e) => handleInputChange('guardianRelation', e.target.value)}
                            className="w-full border-none outline-none"
                          >
                            <option value="">Select Relation</option>
                            {relationOptions.map(rel => (
                              <option key={rel} value={rel}>{rel}</option>
                            ))}
                          </select>
                          {errors.guardianRelation && <small className="text-red-500 text-xs mt-1">{errors.guardianRelation}</small>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sibling Information */}
                  <div className="grid lg:grid-cols-3">
                    <div className="flex items-center gap-2 mt-4 border-b-2 border-[#12516E] p-2">
                      <span className="text-[17px] text-[#1c1c1c] font-semibold">
                        Sibling Information
                      </span>
                      <input
                        type="checkbox"
                        checked={showSibling}
                        onChange={() => setShowSibling(!showSibling)}
                      />
                    </div>
                  </div>
                  <span className="text-[#DC2626] underline text-[14px]">
                    *if Sibling are enrolled in the same school, Please provide details for each student
                  </span>
                  {showSibling && (
                    <div>
                      {siblings.map((sib, index) => (
                        <div key={index} className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3 mt-2">
                          <div className="flex flex-col gap-1">
                            <div className="flex gap-1">
                              <label className="text-[#696969] font-medium text-[14px]">Sibling Name</label>
                              <span className="text-[#DC2626] text-[14px]">*</span>
                            </div>
                            <input
                              type="text"
                              placeholder="Enter Name"
                              value={sib.name}
                             onChange={(e) => {
    // Only allow letters, spaces, hyphens, dots, apostrophes
    const value = e.target.value.replace(/[^a-zA-Z\s\-\.']/g, '');
    handleSiblingChange(index, 'name', value);
  }}
  onBlur={() => onBlur(`sibling_${index}_name`)}
                              className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                            />
                           {errors[`sibling_${index}_name`] && touched[`sibling_${index}_name`] && 
  <small className="text-red-500 text-xs mt-1">{errors[`sibling_${index}_name`]}</small>}
                          </div>

                          <div className="flex flex-col gap-1">
                            <div className="flex gap-1">
                              <label className="text-[#696969] font-medium text-[14px]">Sibling admission no.</label>
                              <span className="text-[#DC2626] text-[14px]">*</span>
                            </div>
                            <input
                              type="text"
                              placeholder="Enter Admission Number"
                              value={sib.admission}
                             onChange={(e) => {
    // Allow letters, numbers, hyphens
    const value = e.target.value.replace(/[^A-Za-z0-9\-]/g, '');
    handleSiblingChange(index, 'admission', value);
  }}
  onBlur={() => onBlur(`sibling_${index}_admission`)}
                              className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                            />
                            {errors[`sibling_${index}_admission`] && <small className="text-red-500 text-xs mt-1">{errors[`sibling_${index}_admission`]}</small>}
                          </div>

                          <div className="flex flex-col gap-1">
                            <div className="flex gap-1">
                              <label className="text-[#696969] font-medium text-[14px]">Class</label>
                              <span className="text-[#DC2626] text-[14px]">*</span>
                            </div>
                            <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                              <select
                                value={sib.class}
                                onChange={(e) => handleSiblingChange(index, 'class', e.target.value)}
                                className="w-full border-none outline-none"
                              >
                                <option value="">Select Class</option>
                                {classOptions.map(className => (
                                  <option key={className} value={className}>{className}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <div className="flex gap-1">
                              <label className="text-[#696969] font-medium text-[14px]">Gender</label>
                              <span className="text-[#DC2626] text-[14px]">*</span>
                            </div>
                            <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                              <select
                                value={sib.gender}
                                onChange={(e) => handleSiblingChange(index, 'gender', e.target.value)}
                                className="w-full border-none outline-none"
                              >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <div className="flex gap-1">
                              <label className="text-[#696969] font-medium text-[14px]">Relation</label>
                              <span className="text-[#DC2626] text-[14px]">*</span>
                            </div>
                            <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                              <select
                                value={sib.relation}
                                onChange={(e) => handleSiblingChange(index, 'relation', e.target.value)}
                                className="w-full border-none outline-none"
                              >
                                <option value="">Select Relation</option>
                                <option value="Brother">Brother</option>
                                <option value="Sister">Sister</option>
                                <option value="Cousin">Cousin</option>
                              </select>
                            </div>
                          </div>

                          {index === siblings.length - 1 && (
                            <div className="mt-6">
                              <button
                                type="button"
                                onClick={handleAddSibling}
                                className="flex items-center gap-2 px-4 py-2 bg-[#0B3142] text-white rounded-lg hover:scale-105 transition"
                              >
                                <IoAdd />
                                Add
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Academic Information */}
                  <div className="flex gap-4 items-center mt-4">
                    <div className="p-1 rounded-full h-10 bg-[#00C950]"></div>
                    <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
                      <span>4. Academic Information</span>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3 mt-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Previous School Name</label>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter School Name"
                        value={formData.previousSchoolName}
                        onChange={(e) => handleInputChange('previousSchoolName', e.target.value)}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.previousSchoolName && <small className="text-red-500 text-xs mt-1">{errors.previousSchoolName}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Class</label>
                        <span className="text-[#DC2626] text-[14px]">*</span>
                      </div>
                      <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                        <select
                          value={formData.currentClass}
                          onChange={(e) => handleInputChange('currentClass', e.target.value)}
                          className="w-full border-none outline-none"
                        >
                          <option value="">Select Class</option>
                          {classOptions.map(className => (
                            <option key={className} value={className}>{className}</option>
                          ))}
                        </select>
                        {errors.currentClass && <small className="text-red-500 text-xs mt-1">{errors.currentClass}</small>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Year of Passing</label>
                      </div>
                      <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                        <select
                          value={formData.yearOfPassing}
                          onChange={(e) => handleInputChange('yearOfPassing', e.target.value)}
                          className="w-full border-none outline-none"
                        >
                          <option value="">Passing Year</option>
                          {generateYearOptions(2020, 2030).map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                        {errors.yearOfPassing && <small className="text-red-500 text-xs mt-1">{errors.yearOfPassing}</small>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Previous Board</label>
                      </div>
                      <input
                        value={formData.previousBoard}
                        onChange={(e) => handleInputChange('previousBoard', e.target.value)}
                        type="text"
                        placeholder="Enter Previous Board"
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.previousBoard && <small className="text-red-500 text-xs mt-1">{errors.previousBoard}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">School Code</label>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter School Code"
                        value={formData.schoolCode}
                        onChange={(e) => handleInputChange('schoolCode', e.target.value)}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.schoolCode && <small className="text-red-500 text-xs mt-1">{errors.schoolCode}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">% Marks/Grade Obtained</label>
                      </div>
                     <input
  type="text"
  placeholder="% Marks/Grade Obtained"
  value={formData.percentage}
  onChange={(e) => {
    // Allow numbers with up to 2 decimal places
    let value = e.target.value.replace(/[^\d.]/g, '');
    // Prevent multiple decimals
    const parts = value.split('.');
    if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
    // Limit to 3 digits before decimal and 2 after
    if (parts[0]?.length > 3) value = value.slice(0, 3) + (parts[1] ? '.' + parts[1] : '');
    if (parts[1]?.length > 2) value = parts[0] + '.' + parts[1].slice(0, 2);
    // Max 100
    if (parseFloat(value) > 100) value = '100';
    handleInputChange('percentage', value);
  }}
  onBlur={() => onBlur('percentage')}
  className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
/>
{errors.percentage && touched.percentage && <small className="text-red-500 text-xs mt-1">{errors.percentage}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Transfer Certificate No.</label>
                      </div>
                      <input
                        type="text"
                        placeholder="Transfer Certificate No."
                        value={formData.transferCertificateNo}
                        onChange={(e) => handleInputChange('transferCertificateNo', e.target.value)}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.transferCertificateNo && <small className="text-red-500 text-xs mt-1">{errors.transferCertificateNo}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Transfer Reason</label>
                      </div>
                      <input
                        type="text"
                        placeholder="Transfer Reason"
                        value={formData.transferReason}
                        onChange={(e) => handleInputChange('transferReason', e.target.value)}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.transferReason && <small className="text-red-500 text-xs mt-1">{errors.transferReason}</small>}
                    </div>
                  </div>

                  {/* Marks Table */}
                  <div className="mt-4">
                    <span className="text-[18px] text-[#1c1c1c] font-semibold">Details of Marks Obtained:</span>
                  </div>
                  <div className="w-full overflow-hidden rounded-lg border border-[#e6e6e6] mt-4">
                    <table className="w-full">
                      <thead className="bg-[#F5F7F7]">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Subject</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Max Marks</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Marks Obtained</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">% of Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, index) => (
                          <tr key={index} className="border-t border-[#e6e6e6]">
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                placeholder="Enter subject"
                                value={row.subject}
                                onChange={(e) => handleFileChange(index, "subject", e.target.value)}
                                className="w-full rounded-md px-3 py-2 outline-none"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                placeholder="Max"
                                value={row.maxMarks}
                                onChange={(e) => handleFileChange(index, "maxMarks", e.target.value)}
                                className="w-full rounded-md px-3 py-2 outline-none"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                placeholder="Obtained"
                                value={row.obtained}
                                onChange={(e) => handleFileChange(index, "obtained", e.target.value)}
                                className="w-full rounded-md px-3 py-2 outline-none"
                              />
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold text-[#0B3142]">
                              {calcPercent(row.maxMarks, row.obtained) ? `${calcPercent(row.maxMarks, row.obtained)}%` : "Percentage"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={handleAddRow}
                      className="flex items-center gap-2 px-4 py-1.5 bg-[#0B3142] text-white border border-[#0B3142] rounded-lg"
                    >
                      <span><IoAdd /></span>
                      Add
                    </button>
                  </div>

                  {/* Medical Information */}
                  <div className="flex gap-4 items-center mt-4">
                    <div className="p-1 rounded-full h-10 bg-[#AD46FF]"></div>
                    <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
                      <span>5. Medical Information</span>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3 mt-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Allergies (If any)</label>
                      </div>
                      <input
                        type="text"
                        placeholder="Peanuts, Dust, etc"
                        value={formData.allergies}
                        onChange={(e) => handleInputChange('allergies', e.target.value)}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.allergies && <small className="text-red-500 text-xs mt-1">{errors.allergies}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Chronic Illness</label>
                      </div>
                      <input
                        type="text"
                        placeholder="Asthma"
                        value={formData.chronicIllness}
                        onChange={(e) => handleInputChange('chronicIllness', e.target.value)}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.chronicIllness && <small className="text-red-500 text-xs mt-1">{errors.chronicIllness}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Dietary Restrictions</label>
                      </div>
                      <input
                        type="text"
                        placeholder="Dietary Restrictions"
                        value={formData.dietaryRestrictions}
                        onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.dietaryRestrictions && <small className="text-red-500 text-xs mt-1">{errors.dietaryRestrictions}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Physical Disability</label>
                      </div>
                      <div className="border border-[#9C9C9C] rounded-md px-3 py-2">
                        <select
                          value={formData.physicalDisability}
                          onChange={(e) => handleInputChange('physicalDisability', e.target.value)}
                          className="w-full border-none outline-none"
                        >
                          <option value="">Physical Disability</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.physicalDisability && <small className="text-red-500 text-xs mt-1">{errors.physicalDisability}</small>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Medication</label>
                      </div>
                      <input
                        type="text"
                        placeholder="Medication if any"
                        value={formData.medication}
                        onChange={(e) => handleInputChange('medication', e.target.value)}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.medication && <small className="text-red-500 text-xs mt-1">{errors.medication}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Doctor Name</label>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter Doctor Name"
                        value={formData.doctorName}
                        onChange={(e) => handleInputChange('doctorName', e.target.value)}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.doctorName && <small className="text-red-500 text-xs mt-1">{errors.doctorName}</small>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Doctor's Contact Number</label>
                      </div>
                      <input
                        type="number"
                        placeholder="Enter number"
                        value={formData.doctorContact}
                        onChange={(e) => handleInputChange('doctorContact', e.target.value)}
                        className="w-full border border-[#9C9C9C] rounded-md px-3 py-2 outline-none focus:ring-[#9C9C9C]"
                      />
                      {errors.doctorContact && <small className="text-red-500 text-xs mt-1">{errors.doctorContact}</small>}
                    </div>
                  </div>

                  {/* Medical Notes */}
                  <div className="flex flex-col gap-1 mt-3">
                    <label className="text-[#696969] text-[14px] font-normal">Medical Notes</label>
                    <textarea
                      value={formData.medicalNotes}
                      onChange={(e) => handleInputChange('medicalNotes', e.target.value)}
                      placeholder="Type Here..."
                      className="w-full border border-[#9c9c9c] rounded px-4 py-3 outline-0 resize-none"
                      rows="3"
                    />
                  </div>

                  {/* Other Information */}
                  <div className="flex gap-4 items-center mt-4">
                    <div className="p-1 rounded-full h-10 bg-[#00C950]"></div>
                    <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
                      <span>6. Other Information</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 mt-3">
                    <label className="text-[#696969] text-[14px] font-normal">Other Information</label>
                    <textarea
                      value={formData.remarks}
                      onChange={(e) => handleInputChange('remarks', e.target.value)}
                      placeholder="Type Here..."
                      className="w-full border border-[#9c9c9c] rounded px-4 py-3 outline-0 resize-none"
                    />
                  </div>
                </div>
              );

           case "documents":
  return (
    <div>
      {/* Student Documents */}
      <div className="flex gap-3 items-center mt-4">
        <div className="p-1 rounded-full h-10 bg-[#00C950]"></div>
        <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
          <span className="px-2">1. Student Documents:</span>
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-10 gap-y-5 mt-6">
        {uploadDocs.map((item, index) => {
          // Find existing document
          const existingDoc = existingDocuments.studentDocuments.find(doc => doc.documentType === item.label);
          return (
            <div key={index} className="w-full">
              <div className="relative w-full border border-dashed border-[#118AB2] rounded-lg bg-white px-2 py-4">
                <span className="absolute -top-3 left-4 bg-white px-2 text-[18px] text-[#118AB2] font-medium">
                  {item.label}
                  {requiredDocs.includes(item.label) && <span className="text-[#DC2626]">*</span>}
                </span>
                <div className="flex flex-col items-center justify-center text-center">
                  {/* Show existing or new document */}
                  {(documentPreviews[item.label] || existingDoc) ? (
                    <div className="w-full">
                      {item.label.toLowerCase().includes('photo') ? (
                        <img 
                          src={documentPreviews[item.label] || existingDoc?.fileUrl}
                          alt={item.label}
                          className="w-32 h-32 object-cover rounded-lg mx-auto mb-2"
                        />
                      ) : (
                        <div className="text-green-600 mb-2">
                          <FiUpload size={28} className="mx-auto" />
                          <span className="text-sm">
                            {documentPreviews[item.label] ? 'New file selected' : 'Document exists'}
                          </span>
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Remove from preview or mark for deletion
                          if (documentPreviews[item.label]) {
                            setDocumentPreviews(prev => {
                              const newPreviews = {...prev};
                              delete newPreviews[item.label];
                              return newPreviews;
                            });
                            setStudentDocuments(prev => {
                              const newDocs = {...prev};
                              delete newDocs[item.label];
                              return newDocs;
                            });
                          } else if (existingDoc) {
                            // Mark existing document for deletion
                            setExistingDocuments(prev => ({
                              ...prev,
                              studentDocuments: prev.studentDocuments.filter(doc => doc.documentType !== item.label)
                            }));
                          }
                        }}
                        className="mt-2 text-red-500 text-sm hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <FiUpload className="text-[#118AB2]" size={28} />
                      <p className="flex flex-wrap justify-center gap-1 mt-2 text-[16px] text-[#1c1c1c] font-medium">
                        Drag & Drop to upload or Browse
                      </p>
                      <p className="mt-1 text-[14px] text-[#696969]">
                        PDF, JPG, PNG files allowed (Max 1MB)
                      </p>
                    </>
                  )}
                  <input
                    id={`student-doc-${index}`}
                    type="file"
                    accept="application/pdf,image/jpeg,image/jpg,image/png"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        handleDocumentChange(item.label, 'student', e.target.files[0]);
                      }
                      e.target.value = '';
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Parent/Local Guardian Documents - Similar pattern */}
      <div className="flex gap-3 items-center mt-4">
        <div className="p-1 rounded-full h-10 bg-[#2B7FFF]"></div>
        <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
          <span className="px-2">2. Parent/Local Guardian Documents:</span>
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-10 gap-y-5 mt-6">
        {guardianDocs.map((item, index) => {
          const existingDoc = existingDocuments.parentDocuments.find(doc => doc.documentType === item.label);
          return (
            <div key={index} className="w-full">
              <div className="relative w-full border border-dashed border-[#118AB2] rounded-lg bg-white px-2 py-4">
                <span className="absolute -top-3 left-4 bg-white px-2 text-[18px] text-[#118AB2] font-medium">
                  {item.label}
                  {requiredDocs.includes(item.label) && <span className="text-[#DC2626]">*</span>}
                </span>
                <div className="flex flex-col items-center justify-center text-center">
                  {(documentPreviews[item.label] || existingDoc) ? (
                    <div className="w-full">
                      {item.label.toLowerCase().includes('photo') ? (
                        <img 
                          src={documentPreviews[item.label] || existingDoc?.fileUrl}
                          alt={item.label}
                          className="w-32 h-32 object-cover rounded-lg mx-auto mb-2"
                        />
                      ) : (
                        <div className="text-green-600 mb-2">
                          <FiUpload size={28} className="mx-auto" />
                          <span className="text-sm">
                            {documentPreviews[item.label] ? 'New file selected' : 'Document exists'}
                          </span>
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (documentPreviews[item.label]) {
                            setDocumentPreviews(prev => {
                              const newPreviews = {...prev};
                              delete newPreviews[item.label];
                              return newPreviews;
                            });
                            setParentDocuments(prev => {
                              const newDocs = {...prev};
                              delete newDocs[item.label];
                              return newDocs;
                            });
                          } else if (existingDoc) {
                            setExistingDocuments(prev => ({
                              ...prev,
                              parentDocuments: prev.parentDocuments.filter(doc => doc.documentType !== item.label)
                            }));
                          }
                        }}
                        className="mt-2 text-red-500 text-sm hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <FiUpload className="text-[#118AB2]" size={28} />
                      <p className="flex flex-wrap justify-center gap-1 mt-2 text-[16px] text-[#1c1c1c] font-medium">
                        Drag & Drop to upload or Browse
                      </p>
                      <p className="mt-1 text-[14px] text-[#696969]">
                        PDF, JPG, PNG files allowed (Max 1MB)
                      </p>
                    </>
                  )}
                  <input
                    id={`parent-doc-${index}`}
                    type="file"
                    accept="application/pdf,image/jpeg,image/jpg,image/png"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        handleDocumentChange(item.label, 'parent', e.target.files[0]);
                      }
                      e.target.value = '';
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Other Documents */}
      <div className="flex gap-3 items-center mt-4">
        <div className="p-1 rounded-full h-10 bg-[#FF6900]"></div>
        <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
          <span className="px-2">3. Other Documents:</span>
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-x-10 gap-y-5 mt-6">
        <div className="w-full">
          <div className="relative w-full border border-dashed border-[#118AB2] rounded-lg bg-white px-2 py-4">
            <span className="absolute -top-3 left-4 bg-white px-2 text-[18px] text-[#118AB2] font-medium">
              Caste Certificate
            </span>
            <div className="flex flex-col items-center justify-center text-center">
              {documentPreviews["Caste Certificate"] ? (
                <div className="w-full">
                  <div className="text-green-600 mb-2">
                    <FiUpload size={28} className="mx-auto" />
                    <span className="text-sm">File selected: {otherDocuments["Caste Certificate"]?.name}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOtherDocuments(prev => {
                        const newDocs = {...prev};
                        delete newDocs["Caste Certificate"];
                        return newDocs;
                      });
                      setDocumentPreviews(prev => {
                        const newPreviews = {...prev};
                        delete newPreviews["Caste Certificate"];
                        return newPreviews;
                      });
                    }}
                    className="mt-2 text-red-500 text-sm hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ) : existingDocuments.otherDocuments.find(doc => doc.documentType === "Caste Certificate") ? (
                <div className="w-full">
                  <div className="text-green-600 mb-2">
                    <FiUpload size={28} className="mx-auto" />
                    <span className="text-sm">Existing document available</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExistingDocuments(prev => ({
                        ...prev,
                        otherDocuments: prev.otherDocuments.filter(doc => doc.documentType !== "Caste Certificate")
                      }));
                    }}
                    className="mt-2 text-red-500 text-sm hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <FiUpload className="text-[#118AB2]" size={28} />
                  <p className="flex flex-wrap justify-center gap-1 mt-2 text-[16px] text-[#1c1c1c] font-medium">
                    Drag & Drop to upload or Browse
                  </p>
                  <p className="mt-1 text-[14px] text-[#696969]">
                    PDF, JPG, PNG files allowed (Max 1MB)
                  </p>
                </>
              )}
              <input
                id="doc-caste"
                type="file"
                accept="application/pdf,image/jpeg,image/jpg,image/png"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    handleDocumentChange("Caste Certificate", "other", e.target.files[0]);
                  }
                  e.target.value = '';
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      </div>
      {uploadingDocs && (
        <div className="mt-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded text-center">
          Uploading documents... Please wait.
        </div>
      )}
    </div>
  );

            case "academic":
              return (
                <div>
                  {/* Assign Class */}
                  <div className="flex gap-3 items-center mt-4">
                    <div className="p-1 rounded-full h-10 bg-[#00C950]"></div>
                    <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
                      <span className="px-2">1. Assign Class</span>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3 mt-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Class</label>
                        <span className="text-[#DC2626] text-[14px]">*</span>
                      </div>
                      <div className="border border-[#9C9C9C] rounded-md px-4 py-3">
                        <select
                          value={formData.currentClass}
                          onChange={(e) => handleInputChange('currentClass', e.target.value)}
                          className="w-full border-none outline-none"
                        >
                          <option value="">Select Class</option>
                          {classOptions.map((currentClass) => (
                            <option key={currentClass} value={currentClass}>{currentClass}</option>
                          ))}
                        </select>
                        {errors.currentClass && <small className="text-red-500 text-xs mt-1">{errors.currentClass}</small>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Section</label>
                      </div>
                      <div className="border border-[#9C9C9C] rounded-md px-4 py-3">
                        <select
                          value={formData.section}
                          onChange={(e) => handleInputChange('section', e.target.value)}
                          className="w-full border-none outline-none"
                        >
                          <option value="">Select Section</option>
                          {sectionOptions.map(sec => (
                            <option key={sec} value={sec}>Section {sec}</option>
                          ))}
                        </select>
                        {errors.section && <small className="text-red-500 text-xs mt-1">{errors.section}</small>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">Stream</label>
                      </div>
                      <div className="border border-[#9C9C9C] rounded-md px-4 py-3">
                        <select
                          value={formData.stream}
                          onChange={(e) => handleInputChange('stream', e.target.value)}
                          className="w-full border-none outline-none"
                        >
                          <option value="">Select Stream</option>
                          {streamOptions.map(stream => (
                            <option key={stream} value={stream}>{stream}</option>
                          ))}
                        </select>
                        {errors.stream && <small className="text-red-500 text-xs mt-1">{errors.stream}</small>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <label className="text-[#696969] font-medium text-[14px]">House</label>
                      </div>
                      <div className="border border-[#9C9C9C] rounded-md px-4 py-3">
                        <select
                          value={formData.house}
                          onChange={(e) => handleInputChange('house', e.target.value)}
                          className="w-full border-none outline-none"
                        >
                          <option value="">Select House</option>
                          {houseOptions.map(house => (
                            <option key={house} value={house}>{house} House</option>
                          ))}
                        </select>
                        {errors.house && <small className="text-red-500 text-xs mt-1">{errors.house}</small>}
                      </div>
                    </div>
                  </div>

                  {/* Student Status */}
                  <div className="flex gap-3 items-center mt-4">
                    <div className="p-1 rounded-full h-10 bg-[#2B7FFF]"></div>
                    <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
                      <span className="px-2">2. Student Status</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="border border-[#9C9C9C] rounded-md px-4 py-3">
                      <select
                        value={formData.studentStatus}
                        onChange={(e) => handleInputChange('studentStatus', e.target.value)}
                        className="w-full border-none outline-none"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Alumni">Alumni</option>
                      </select>
                      {errors.studentStatus && <small className="text-red-500 text-xs mt-1">{errors.studentStatus}</small>}
                    </div>
                  </div>

                  {/* Transport Information */}
                  <div className="flex gap-3 items-center mt-4">
                    <div className="p-1 rounded-full h-10 bg-[#d613d6]"></div>
                    <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
                      <span className="px-2">3. Transport Information</span>
                    </div>
                  </div>
                  <section className="mt-6">
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                      <div className="flex flex-col gap-1">
                        <div style={{ display: "flex", gap: "5px" }}>
                          <label className="text-sm text-[#696969]">Transport Opted</label>
                          <span className="text-[#DC2626] text-[14px]">*</span>
                        </div>
                        <div className="border border-[#9C9C9C] rounded-md px-4 py-3">
                          <select
                            value={transportOpted}
                            onChange={(e) => setTransportOpted(e.target.value)}
                            className="w-full border-none outline-none"
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {transportOpted === "Yes" && (
                      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                        <div className="flex flex-col gap-1">
                          <label className="text-sm text-[#696969]">Assign Route</label>
                          <div className="border border-[#9C9C9C] rounded-md px-4 py-3">
                            <select
                              value={formData.route}
                              onChange={(e) => handleInputChange('route', e.target.value)}
                              className="w-full outline-none border-none"
                            >
                              <option value="">Choose Route</option>
                              <option value="Route 1">Route 1</option>
                              <option value="Route 2">Route 2</option>
                              <option value="Route 3">Route 3</option>
                            </select>
                            {errors.route && <small className="text-red-500 text-xs mt-1">{errors.route}</small>}
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-sm text-[#696969]">Bus Stop</label>
                          <div className="border border-[#9C9C9C] rounded-md px-4 py-3">
                            <select
                              value={formData.busStop}
                              onChange={(e) => handleInputChange('busStop', e.target.value)}
                              className="w-full outline-none border-none"
                            >
                              <option value="">Choose Bus Stop</option>
                              <option value="Stop 1">Stop 1</option>
                              <option value="Stop 2">Stop 2</option>
                              <option value="Stop 3">Stop 3</option>
                            </select>
                            {errors.busStop && <small className="text-red-500 text-xs mt-1">{errors.busStop}</small>}
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-sm text-[#696969]">Bus Number / Vehicle No.</label>
                          <div className="border border-[#9C9C9C] rounded-md px-4 py-3">
                            <select
                              className="w-full outline-none border-none"
                              value={formData.busNumber}
                              onChange={(e) => handleInputChange('busNumber', e.target.value)}
                            >
                              <option value="">Choose Bus Number / Vehicle No.</option>
                              <option value="BUS001">BUS001</option>
                              <option value="BUS002">BUS002</option>
                              <option value="BUS003">BUS003</option>
                            </select>
                            {errors.busNumber && <small className="text-red-500 text-xs mt-1">{errors.busNumber}</small>}
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-sm text-[#696969]">Driver Name</label>
                          <input
                            type="text"
                            value={formData.driverName}
                            onChange={(e) => handleInputChange('driverName', e.target.value)}
                            placeholder="Driver Name"
                            className="w-full rounded-sm px-4 py-3 text-sm outline-none border border-[#9C9C9C] focus:ring-2 focus:ring-[#696969]"
                          />
                          {errors.driverName && <small className="text-red-500 text-xs mt-1">{errors.driverName}</small>}
                        </div>
                      </div>
                    )}
                  </section>

                  {/* Fee & Concession Details */}
                  <div className="flex gap-3 items-center mt-4">
                    <div className="p-1 rounded-full h-10 bg-[#2B7FFF]"></div>
                    <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
                      <span className="px-2">4. Fee & Concession Details</span>
                    </div>
                  </div>
                  <section className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                      <div className="flex flex-col gap-1">
                        <label className="text-sm text-[#696969]">
                          Fee Category <span className="text-[#DC2626]">*</span> (Automatically fetch fee when select the class)
                        </label>
                        <div className="border border-[#9C9C9C] rounded-md px-4 py-3">
                          <select
                            value={formData.feeCategory}
                            onChange={(e) => handleInputChange('feeCategory', e.target.value)}
                            className="w-full outline-none border-none"
                          >
                            <option value="">Select Fee Category</option>
                            <option value="General">General</option>
                            <option value="Scholarship">Scholarship</option>
                            <option value="Staff Ward">Staff Ward</option>
                          </select>
                          {errors.feeCategory && <small className="text-red-500 text-xs mt-1">{errors.feeCategory}</small>}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-sm text-[#696969]">Concession Type</label>
                        <div className="border border-[#9C9C9C] rounded-md px-4 py-3">
                          <select
                            value={formData.concessionType}
                            onChange={(e) => handleInputChange('concessionType', e.target.value)}
                            className="w-full outline-none border-none"
                          >
                            <option value="">Select Concession Type</option>
                            <option value="Percentage">Percentage</option>
                            <option value="Fixed Amount">Fixed Amount</option>
                          </select>
                          {errors.concessionType && <small className="text-red-500 text-xs mt-1">{errors.concessionType}</small>}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-sm text-[#696969]">Concession % or Amount (Automatically fetch fee when select the concession type)</label>
                        <input
                          type="text"
                          placeholder="Concession % or Amount"
                          value={formData.concessionAmount}
                          onChange={(e) => handleInputChange('concessionAmount', e.target.value)}
                          className="w-full rounded-sm px-4 py-3 text-sm outline-none border border-[#9C9C9C] focus:ring-2 focus:ring-[#696969]"
                        />
                        {errors.concessionAmount && <small className="text-red-500 text-xs mt-1">{errors.concessionAmount}</small>}
                      </div>
                    </div>
                  </section>

                  {/* Attach Document */}
                  <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-5 mt-6">
                    <div className="flex flex-col gap-1">
                      <label className="text-[18px] text-[#1c1c1c] font-medium">Attach Document</label>
                      <div className="w-full">
                        <div
                          className="relative w-full border border-dashed border-[#118AB2] rounded-lg bg-white px-2 py-4 cursor-pointer hover:bg-[#F8FBFF] hover:border-[#0B77FF] transition"
                          onClick={() => document.getElementById("doc-other").click()}
                        >
                          <div className="flex flex-col items-center justify-center text-center">
                            <FiUpload className="text-[#118AB2]" size={28} />
                            <p className="flex flex-wrap justify-center gap-1 mt-2 text-[16px] text-[#1c1c1c] font-medium">
                              Drag & Drop to upload or Browse
                            </p>
                            <p className="mt-1 text-[14px] text-[#696969]">
                              Only PDF file are allowed.
                            </p>
                            <input
                              id="doc-other"
                              type="file"
                              accept="application/pdf"
                              className="hidden"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );

          case "review":
  return (
    <div className="mt-6 flex flex-col gap-9">
      <div className="w-full bg-[#12516E] text-white px-6 py-3 rounded text-[20px] font-semibold">
        <span>Review Your Detail:</span>
      </div>

      {/* 1. Student Information */}
      <div className="rounded w-full border border-[#118AB240] bg-[#118ab225] p-6">
        <div className="flex gap-4 items-center">
          <div className="p-1 rounded-full h-10 bg-[#00C950]"></div>
          <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
            <span>1. Student Information</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-3 gap-x-10 gap-y-3">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Academic Year</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.academicYear || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Date of Birth</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.dateOfBirth || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Nationality</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.nationality || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Blood Group</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.bloodGroup || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Language</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.languagesKnown || "Not provided"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Class</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.currentClass || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Aadhaar Number</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.aadhaarNumber || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Category</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.category || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Place of birth</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.placeOfBirth || "Not provided"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Student Name</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.fullName || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Gender</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.gender || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Religion</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.religion || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Mother Tongue</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.motherTongue || "Not provided"}
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="h-50 w-40 overflow-hidden rounded">
              {documentPreviews["Student Photo"] ? (
                <img src={documentPreviews["Student Photo"]} alt="Student" className="w-full h-full object-cover rounded" />
              ) : existingDocuments.studentDocuments.find(doc => doc.documentType === "Student Photo") ? (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
                  <span className="text-gray-400 text-sm">Photo exists</span>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
                  <span className="text-gray-400 text-sm">No Photo</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Contact Information */}
      <div className="rounded w-full border border-[#118AB240] bg-[#118ab225] p-6">
        <div className="flex gap-4 items-center">
          <div className="p-1 rounded-full h-10 bg-[#2B7FFF]"></div>
          <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
            <span>2. Contact Information</span>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex flex-col gap-1">
            <label className="text-[#696969] font-medium text-[15px]">Mobile No.</label>
            <span className="text-[15px] text-[#1C1C1C] font-semibold">
              {formData.phone || "Not provided"}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#696969] font-medium text-[15px]">Email ID</label>
            <span className="text-[15px] text-[#1C1C1C] font-semibold">
              {formData.email || "Not provided"}
            </span>
          </div>
        </div>

        {/* Current Address */}
        <div className="grid lg:grid-cols-3 mt-3">
          <div className="border-b-2 border-[#12516E] p-2 text-[16px] font-semibold text-[#1c1c1c]">
            <span>Current Address</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3 gap-x-10 gap-y-3">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Address</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.currentAddressLine1 || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">City</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.currentCity || "Not provided"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Country</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.currentCountry || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Pin Code</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.currentPincode || "Not provided"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">State</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.currentState || "Not provided"}
              </span>
            </div>
          </div>
        </div>

        {/* Permanent Address (if different from current) */}
        {!formData.sameAsCurrent && (
          <>
            <div className="grid lg:grid-cols-3 mt-3">
              <div className="border-b-2 border-[#12516E] p-2 text-[16px] font-semibold text-[#1c1c1c]">
                <span>Permanent Address</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3 gap-x-10 gap-y-3">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[#696969] font-medium text-[15px]">Address</label>
                  <span className="text-[15px] text-[#1C1C1C] font-semibold">
                    {formData.permanentAddressLine1 || "Not provided"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[#696969] font-medium text-[15px]">City</label>
                  <span className="text-[15px] text-[#1C1C1C] font-semibold">
                    {formData.permanentCity || "Not provided"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[#696969] font-medium text-[15px]">Country</label>
                  <span className="text-[15px] text-[#1C1C1C] font-semibold">
                    {formData.permanentCountry || "Not provided"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[#696969] font-medium text-[15px]">Pin Code</label>
                  <span className="text-[15px] text-[#1C1C1C] font-semibold">
                    {formData.permanentPincode || "Not provided"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[#696969] font-medium text-[15px]">State</label>
                  <span className="text-[15px] text-[#1C1C1C] font-semibold">
                    {formData.permanentState || "Not provided"}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 3. Parent/Guardian/Sibling Details */}
      <div className="rounded w-full border border-[#118AB240] bg-[#118ab225] p-6">
        <div className="flex gap-4 items-center">
          <div className="p-1 rounded-full h-10 bg-[#FF6900]"></div>
          <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
            <span>3. Parent/Guardian/Sibling Details</span>
          </div>
        </div>

        {/* Father Details */}
        <div className="grid lg:grid-cols-3 mt-3">
          <div className="border-b-2 border-[#12516E] p-2 text-[16px] font-semibold text-[#1c1c1c]">
            <span>Father Details</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-3 gap-x-10 gap-y-3">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Full Name</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.fatherName || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Occupation</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.fatherOccupation || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Organization Name</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.fatherOrganization || "Not provided"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Mobile Number</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.fatherMobile || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Qualification</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.fatherQualification || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Organization Address</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.fatherOrganizationAddress || "Not provided"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Email ID</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.fatherEmail || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Designation</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.fatherDesignation || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Annual Income</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.fatherAnnualIncome || "Not provided"}
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="h-50 w-40 overflow-hidden rounded">
              {documentPreviews["Father Photo"] ? (
                <img src={documentPreviews["Father Photo"]} alt="Father" className="w-full h-full object-cover rounded" />
              ) : existingDocuments.parentDocuments.find(doc => doc.documentType === "Father Photo") ? (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
                  <span className="text-gray-400 text-sm">Photo exists</span>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
                  <span className="text-gray-400 text-sm">No Photo</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mother Details */}
        <div className="grid lg:grid-cols-3 mt-3">
          <div className="border-b-2 border-[#12516E] p-2 text-[16px] font-semibold text-[#1c1c1c]">
            <span>Mother Details</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-3 gap-x-10 gap-y-3">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Full Name</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.motherName || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Occupation</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.motherOccupation || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Organization Name</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.motherOrganization || "Not provided"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Mobile Number</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.motherMobile || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Qualification</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.motherQualification || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Organization Address</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.motherOrganizationAddress || "Not provided"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Email ID</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.motherEmail || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Designation</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.motherDesignation || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Annual Income</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.motherAnnualIncome || "Not provided"}
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="h-50 w-40 overflow-hidden rounded">
              {documentPreviews["Mother Photo"] ? (
                <img src={documentPreviews["Mother Photo"]} alt="Mother" className="w-full h-full object-cover rounded" />
              ) : existingDocuments.parentDocuments.find(doc => doc.documentType === "Mother Photo") ? (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
                  <span className="text-gray-400 text-sm">Photo exists</span>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
                  <span className="text-gray-400 text-sm">No Photo</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Local Guardian (if provided) */}
        {showGuardian && formData.guardianName && (
          <>
            <div className="grid lg:grid-cols-3 mt-3">
              <div className="border-b-2 border-[#12516E] p-2 text-[16px] font-semibold text-[#1c1c1c]">
                <span>Local Guardian</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-3 gap-x-10 gap-y-3">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[#696969] font-medium text-[15px]">Full Name</label>
                  <span className="text-[15px] text-[#1C1C1C] font-semibold">{formData.guardianName}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[#696969] font-medium text-[15px]">Relation</label>
                  <span className="text-[15px] text-[#1C1C1C] font-semibold">{formData.guardianRelation}</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[#696969] font-medium text-[15px]">Mobile Number</label>
                  <span className="text-[15px] text-[#1C1C1C] font-semibold">
                    {formData.guardianMobile || "Not provided"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[#696969] font-medium text-[15px]">Email ID</label>
                  <span className="text-[15px] text-[#1C1C1C] font-semibold">
                    {formData.guardianEmail || "Not provided"}
                  </span>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="h-50 w-40 overflow-hidden rounded">
                  {documentPreviews["Guardian Photo"] ? (
                    <img src={documentPreviews["Guardian Photo"]} alt="Guardian" className="w-full h-full object-cover rounded" />
                  ) : existingDocuments.parentDocuments.find(doc => doc.documentType === "Guardian Photo") ? (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
                      <span className="text-gray-400 text-sm">Photo exists</span>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
                      <span className="text-gray-400 text-sm">No Photo</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Sibling Information */}
        {showSibling && siblings.length > 0 && siblings.some(s => s.name) && (
          <>
            <div className="grid lg:grid-cols-3 mt-3">
              <div className="border-b-2 border-[#12516E] p-2 text-[16px] font-semibold text-[#1c1c1c]">
                <span>Sibling Information</span>
              </div>
            </div>
            {siblings.map((sib, idx) => (
              sib.name && (
                <div key={idx} className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-3 gap-x-10 gap-y-3">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-medium text-[15px]">Full Name</label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">{sib.name}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-medium text-[15px]">Relation</label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">{sib.relation}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-medium text-[15px]">Admission Number</label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">{sib.admission}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-medium text-[15px]">Gender</label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">{sib.gender}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[#696969] font-medium text-[15px]">Class</label>
                      <span className="text-[15px] text-[#1C1C1C] font-semibold">{sib.class}</span>
                    </div>
                  </div>
                </div>
              )
            ))}
          </>
        )}
      </div>

      {/* 4. Academic Details */}
      <div className="rounded w-full border border-[#118AB240] bg-[#118ab225] p-6">
        <div className="flex gap-4 items-center">
          <div className="p-1 rounded-full h-10 bg-[#FF6900]"></div>
          <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
            <span>4. Academic Details</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3 gap-x-10 gap-y-3">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Previous School Name</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.previousSchoolName || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Previous Board</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.previousBoard || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Transfer Certificate Number</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.transferCertificateNo || "Not provided"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Class</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.currentClass || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Section</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.section || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Stream</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.stream || "Not provided"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Year of Passing</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.yearOfPassing || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Percentage/Grade</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.percentage ? `${formData.percentage}%` : "Not provided"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">House</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.house ? `${formData.house} House` : "Not provided"}
              </span>
            </div>
          </div>
        </div>

        {/* Marks Table */}
        {rows.length > 0 && rows[0].subject && (
          <div className="mt-4">
            <span className="text-[16px] font-semibold">Details Of Marks Obtained:</span>
            <div className="w-full overflow-hidden rounded-lg border border-[#e6e6e6] mt-3">
              <table className="w-full">
                <thead className="bg-[#F5F7F7]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Subject</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Max Marks</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Marks Obtained</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">% of Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    row.subject && (
                      <tr key={idx} className="border-t border-[#e6e6e6]">
                        <td className="px-4 py-3 text-sm">{row.subject}</td>
                        <td className="px-4 py-3 text-sm">{row.maxMarks}</td>
                        <td className="px-4 py-3 text-sm">{row.obtained}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-[#0B3142]">
                          {calcPercent(row.maxMarks, row.obtained)}%
                        </td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 5. Medical Information */}
      <div className="rounded w-full border border-[#118AB240] bg-[#118ab225] p-6">
        <div className="flex gap-4 items-center">
          <div className="p-1 rounded-full h-10 bg-[#AD46FF]"></div>
          <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
            <span>5. Medical Information</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3 gap-x-10 gap-y-3">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Allergies (if any)</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.allergies || "None"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Physical Disability</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.physicalDisability === "Yes" ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Doctor Contact No</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.doctorContact || "Not provided"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Chronic Illness</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.chronicIllness || "None"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Medical Notes</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.medicalNotes || "None"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Medication</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.medication || "None"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Dietary Restrictions</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.dietaryRestrictions || "None"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Doctor Name</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">
                {formData.doctorName || "Not provided"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Transport Information */}
      <div className="rounded w-full border border-[#118AB240] bg-[#118ab225] p-6">
        <div className="flex gap-4 items-center">
          <div className="p-1 rounded-full h-10 bg-[#d613d6]"></div>
          <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
            <span>6. Transport Information</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3 gap-x-10 gap-y-3">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[#696969] font-medium text-[15px]">Transport Opted</label>
              <span className="text-[15px] text-[#1C1C1C] font-semibold">{transportOpted}</span>
            </div>
          </div>
          {transportOpted === "Yes" && (
            <>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[#696969] font-medium text-[15px]">Route</label>
                  <span className="text-[15px] text-[#1C1C1C] font-semibold">
                    {formData.route || "Not provided"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[#696969] font-medium text-[15px]">Bus Stop</label>
                  <span className="text-[15px] text-[#1C1C1C] font-semibold">
                    {formData.busStop || "Not provided"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[#696969] font-medium text-[15px]">Bus Number</label>
                  <span className="text-[15px] text-[#1C1C1C] font-semibold">
                    {formData.busNumber || "Not provided"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[#696969] font-medium text-[15px]">Driver Name</label>
                  <span className="text-[15px] text-[#1C1C1C] font-semibold">
                    {formData.driverName || "Not provided"}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 7. Other Information */}
      <div className="rounded w-full border border-[#118AB240] bg-[#118ab225] p-6">
        <div className="flex gap-4 items-center">
          <div className="p-1 rounded-full h-10 bg-[#00C950]"></div>
          <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
            <span>7. Other Information</span>
          </div>
        </div>
        <div className="w-full mt-4">
          <div className="flex flex-col gap-1">
            <label className="text-[#696969] font-medium text-[15px]">
              Any other information about your ward which the school should be aware of?
            </label>
            <span className="text-[15px] text-[#1C1C1C] font-semibold">
              {formData.remarks || "None"}
            </span>
          </div>
        </div>
      </div>

      {/* 8. Uploaded Documents Summary */}
      {(Object.keys(studentDocuments).length > 0 || 
        Object.keys(parentDocuments).length > 0 || 
        Object.keys(otherDocuments).length > 0 ||
        existingDocuments.studentDocuments.length > 0 ||
        existingDocuments.parentDocuments.length > 0 ||
        existingDocuments.otherDocuments.length > 0) && (
        <div className="rounded w-full border border-[#118AB240] bg-[#118ab225] p-6">
          <div className="flex gap-4 items-center mb-4">
            <div className="p-1 rounded-full h-10 bg-[#FF6900]"></div>
            <div className="text-[#1c1c1c] font-medium text-[18px] leading-tight flex gap-2 items-center">
              <span>8. Documents to Upload</span>
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <div className="flex gap-4 pb-2 min-w-max">
              {/* New Student Documents */}
              {Object.entries(studentDocuments).map(([docType, file], idx) => (
                <div key={`new-student-${idx}`} className="flex flex-col items-center" style={{ minWidth: '100px' }}>
                  <div className="w-[100px] h-[100px] border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                    {docType.toLowerCase().includes('photo') && documentPreviews[docType] ? (
                      <img src={documentPreviews[docType]} alt={docType} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-2">
                        <FiUpload size={24} className="text-[#118AB2]" />
                        <span className="text-xs text-gray-500 text-center mt-1 break-words">
                          {file.name ? (file.name.length > 15 ? file.name.substring(0, 12) + '...' : file.name) : docType}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-green-600 mt-1 text-center max-w-[100px] truncate">
                    New: {docType}
                  </span>
                </div>
              ))}

              {/* Existing Student Documents */}
              {existingDocuments.studentDocuments.map((doc, idx) => (
                <div key={`existing-student-${idx}`} className="flex flex-col items-center" style={{ minWidth: '100px' }}>
                  <div className="w-[100px] h-[100px] border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center p-2">
                      <FiUpload size={24} className="text-[#118AB2]" />
                      <span className="text-xs text-gray-500 text-center mt-1">{doc.documentType}</span>
                    </div>
                  </div>
                  <span className="text-xs text-blue-600 mt-1 text-center max-w-[100px] truncate">
                    Existing: {doc.documentType}
                  </span>
                </div>
              ))}

              {/* New Parent Documents */}
              {Object.entries(parentDocuments).map(([docType, file], idx) => (
                <div key={`new-parent-${idx}`} className="flex flex-col items-center" style={{ minWidth: '100px' }}>
                  <div className="w-[100px] h-[100px] border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                    {docType.toLowerCase().includes('photo') && documentPreviews[docType] ? (
                      <img src={documentPreviews[docType]} alt={docType} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-2">
                        <FiUpload size={24} className="text-[#118AB2]" />
                        <span className="text-xs text-gray-500 text-center mt-1 break-words">
                          {file.name ? (file.name.length > 15 ? file.name.substring(0, 12) + '...' : file.name) : docType}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-green-600 mt-1 text-center max-w-[100px] truncate">
                    New: {docType}
                  </span>
                </div>
              ))}

              {/* Existing Parent Documents */}
              {existingDocuments.parentDocuments.map((doc, idx) => (
                <div key={`existing-parent-${idx}`} className="flex flex-col items-center" style={{ minWidth: '100px' }}>
                  <div className="w-[100px] h-[100px] border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center p-2">
                      <FiUpload size={24} className="text-[#118AB2]" />
                      <span className="text-xs text-gray-500 text-center mt-1">{doc.documentType}</span>
                    </div>
                  </div>
                  <span className="text-xs text-blue-600 mt-1 text-center max-w-[100px] truncate">
                    Existing: {doc.documentType}
                  </span>
                </div>
              ))}

              {/* Other Documents */}
              {Object.entries(otherDocuments).map(([docType, file], idx) => (
                <div key={`other-${idx}`} className="flex flex-col items-center" style={{ minWidth: '100px' }}>
                  <div className="w-[100px] h-[100px] border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center p-2">
                      <FiUpload size={24} className="text-[#118AB2]" />
                      <span className="text-xs text-gray-500 text-center mt-1 break-words">
                        {file.name ? (file.name.length > 15 ? file.name.substring(0, 12) + '...' : file.name) : docType}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-green-600 mt-1 text-center max-w-[100px] truncate">
                    New: {docType}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

            default:
              return null;
          }
        })()}

        {/* Navigation Buttons */}
        <div className="mt-6 border-t-2 border-[#e6e6e6]">
          <div className="flex justify-end p-2 mt-3 gap-4">
            {currentIndex !== 0 && (
              <button
                onClick={prevPage}
                className="inline-flex px-6 py-3 text-[#696969] border border-[#9c9c9c] rounded-lg"
              >
                Previous
              </button>
            )}
            {currentIndex === pages.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex px-6 py-3 bg-[#FF6900] text-white border border-[#FF6900] rounded-lg disabled:opacity-50"
              >
                {submitting ? "Updating..." : "Update"}
              </button>
            ) : (
              <button
                onClick={nextPage}
                className="inline-flex px-6 py-3 bg-[#0B3142] text-white border border-[#0B3142] rounded-lg"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMyStudent;
