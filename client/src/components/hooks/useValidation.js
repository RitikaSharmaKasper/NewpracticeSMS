// hooks/useValidation.js
import { useState, useCallback } from 'react';

// Helper function to validate date is not future and age appropriate
const isValidDateOfBirth = (dateString) => {
  if (!dateString) return false;
  const birthDate = new Date(dateString);
  const today = new Date();
  
  if (isNaN(birthDate.getTime())) return false;
  if (birthDate > today) return false;
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age >= 3 && age <= 25;
};

// Helper to validate name (only letters, spaces, hyphens, dots, apostrophes)
const isValidName = (value) => {
  return /^[a-zA-Z\s\-\.']+$/.test(value);
};

// Helper to validate mobile number
const isValidMobile = (value) => {
  return /^\d{10}$/.test(value);
};

// Helper to validate email
const isValidEmail = (value) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
};

// Helper to validate pincode
const isValidPincode = (value) => {
  return /^\d{6}$/.test(value);
};

// Helper to validate percentage
const isValidPercentage = (value) => {
  if (!value) return true;
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0 && num <= 100;
};

// Helper to validate annual income
const isValidAnnualIncome = (value) => {
  if (!value) return true;
  return /^\d{1,10}$/.test(String(value).replace(/,/g, ''));
};

const validationRules = {
  // Student Information
  fullName: {
    required: true,
    custom: isValidName,
    minLength: 2,
    maxLength: 100,
    message: "Student name must contain only letters, spaces, hyphens, dots, or apostrophes (2-100 characters)"
  },
  
  dateOfBirth: {
    required: true,
    custom: isValidDateOfBirth,
    message: "Please enter a valid date of birth (Student must be between 3-25 years old)"
  },
  
  gender: {
    required: true,
    message: "Please select gender"
  },
  
  nationality: {
    required: true,
    message: "Please select nationality"
  },
  
  aadhaarNumber: {
    required: false,
    pattern: /^\d{12}$/,
    message: "Please enter a valid 12-digit Aadhaar number (only numbers)"
  },
  
  placeOfBirth: {
    required: false,
    custom: isValidName,
    maxLength: 100,
    message: "Place of birth must contain only letters, spaces, and hyphens"
  },
  
  motherTongue: {
    required: false,
    message: "Please select mother tongue"
  },
  
  languagesKnown: {
    required: false,
    message: "Please select language"
  },
  
  bloodGroup: {
    required: false,
    message: "Please select blood group"
  },
  
  religion: {
    required: false,
    message: "Please select religion"
  },
  
  category: {
    required: false,
    message: "Please select category"
  },
  
  // Academic Information
  academicYear: {
    required: true,
    pattern: /^\d{4}-\d{4}$/,
    message: "Please select a valid academic year"
  },
  
  currentClass: {
    required: true,
    message: "Please select class"
  },
  
  section: {
    required: false,
    message: "Please select section"
  },
  
  stream: {
    required: false,
    message: "Please select stream"
  },
  
  house: {
    required: false,
    message: "Please select house"
  },
  
  previousSchoolName: {
    required: false,
    minLength: 2,
    maxLength: 200,
    message: "School name should be between 2-200 characters"
  },
  
  previousBoard: {
    required: false,
    minLength: 2,
    maxLength: 100,
    message: "Board name should be between 2-100 characters"
  },
  
  yearOfPassing: {
    required: false,
    pattern: /^\d{4}-\d{4}$/,
    message: "Please select a valid year"
  },
  
  percentage: {
    required: false,
    custom: isValidPercentage,
    message: "Please enter a valid percentage (0-100)"
  },
  
  schoolCode: {
    required: false,
    pattern: /^[A-Za-z0-9\-]+$/,
    maxLength: 20,
    message: "School code should contain only letters, numbers, and hyphens"
  },
  
  transferCertificateNo: {
    required: false,
    maxLength: 50,
    message: "Transfer certificate number too long (max 50 characters)"
  },
  
  transferReason: {
    required: false,
    maxLength: 200,
    message: "Transfer reason too long (max 200 characters)"
  },
  
  // Contact Information
  phone: {
    required: true,
    custom: isValidMobile,
    message: "Please enter a valid 10-digit mobile number (only numbers)"
  },
  
  email: {
    required: true,
    custom: isValidEmail,
    message: "Please enter a valid email address (e.g., name@domain.com)"
  },
  
  alternatePhone: {
    required: false,
    custom: isValidMobile,
    message: "Please enter a valid 10-digit alternate number"
  },
  
  // Address Fields
  currentAddressLine1: {
    required: true,
    minLength: 5,
    maxLength: 200,
    message: "Address line 1 is required (5-200 characters)"
  },
  
  currentAddressLine2: {
    required: false,
    maxLength: 200,
    message: "Address line 2 too long (max 200 characters)"
  },
  
  currentCity: {
    required: true,
    custom: isValidName,
    minLength: 2,
    maxLength: 50,
    message: "City name must contain only letters and spaces (2-50 characters)"
  },
  
  currentState: {
    required: true,
    custom: isValidName,
    minLength: 2,
    maxLength: 50,
    message: "State name must contain only letters and spaces"
  },
  
  currentCountry: {
    required: true,
    message: "Please select country"
  },
  
  currentPincode: {
    required: true,
    custom: isValidPincode,
    message: "Please enter a valid 6-digit pincode"
  },
  
  permanentAddressLine1: {
    required: false,
    minLength: 5,
    maxLength: 200,
    message: "Address should be 5-200 characters"
  },
  
  permanentCity: {
    required: false,
    custom: isValidName,
    message: "City name must contain only letters and spaces"
  },
  
  permanentPincode: {
    required: false,
    custom: isValidPincode,
    message: "Please enter a valid 6-digit pincode"
  },
  
  // Parent Information - Father
  fatherName: {
    required: true,
    custom: isValidName,
    minLength: 2,
    maxLength: 100,
    message: "Father's name must contain only letters, spaces, hyphens, dots, or apostrophes (2-100 characters)"
  },
  
  fatherMobile: {
    required: false,
    custom: isValidMobile,
    message: "Please enter a valid 10-digit mobile number"
  },
  
  fatherEmail: {
    required: false,
    custom: isValidEmail,
    message: "Please enter a valid email address"
  },
  
  fatherOccupation: {
    required: false,
    message: "Please select occupation"
  },
  
  fatherQualification: {
    required: false,
    message: "Please select qualification"
  },
  
  fatherDesignation: {
    required: false,
    maxLength: 100,
    message: "Designation too long (max 100 characters)"
  },
  
  fatherOrganization: {
    required: false,
    maxLength: 100,
    message: "Organization name too long (max 100 characters)"
  },
  
  fatherOrganizationAddress: {
    required: false,
    maxLength: 200,
    message: "Organization address too long (max 200 characters)"
  },
  
  fatherAnnualIncome: {
    required: false,
    custom: isValidAnnualIncome,
    message: "Please enter a valid annual income (numbers only, max 10 digits)"
  },
  
  // Parent Information - Mother
  motherName: {
    required: true,
    custom: isValidName,
    minLength: 2,
    maxLength: 100,
    message: "Mother's name must contain only letters, spaces, hyphens, dots, or apostrophes (2-100 characters)"
  },
  
  motherMobile: {
    required: false,
    custom: isValidMobile,
    message: "Please enter a valid 10-digit mobile number"
  },
  
  motherEmail: {
    required: false,
    custom: isValidEmail,
    message: "Please enter a valid email address"
  },
  
  motherOccupation: {
    required: false,
    message: "Please select occupation"
  },
  
  motherQualification: {
    required: false,
    message: "Please select qualification"
  },
  
  motherDesignation: {
    required: false,
    maxLength: 100,
    message: "Designation too long (max 100 characters)"
  },
  
  motherOrganization: {
    required: false,
    maxLength: 100,
    message: "Organization name too long (max 100 characters)"
  },
  
  motherOrganizationAddress: {
    required: false,
    maxLength: 200,
    message: "Organization address too long (max 200 characters)"
  },
  
  motherAnnualIncome: {
    required: false,
    custom: isValidAnnualIncome,
    message: "Please enter a valid annual income (numbers only, max 10 digits)"
  },
  
  // Guardian Information
  guardianName: {
    required: false,
    custom: isValidName,
    minLength: 2,
    maxLength: 100,
    message: "Guardian name must contain only letters, spaces, hyphens, dots, or apostrophes (2-100 characters)"
  },
  
  guardianMobile: {
    required: false,
    custom: isValidMobile,
    message: "Please enter a valid 10-digit mobile number"
  },
  
  guardianEmail: {
    required: false,
    custom: isValidEmail,
    message: "Please enter a valid email address"
  },
  
  guardianRelation: {
    required: false,
    message: "Please select relation"
  },
  
  // Sibling Fields (dynamic)
  sibling_name: {
    required: false,
    custom: isValidName,
    minLength: 2,
    maxLength: 100,
    message: "Sibling name must contain only letters and spaces"
  },
  
  sibling_admission: {
    required: false,
    pattern: /^[A-Za-z0-9\-]+$/,
    minLength: 2,
    maxLength: 30,
    message: "Admission number should contain letters, numbers, and hyphens"
  },
  
  sibling_class: {
    required: false,
    message: "Please select sibling class"
  },
  
  sibling_gender: {
    required: false,
    message: "Please select sibling gender"
  },
  
  sibling_relation: {
    required: false,
    message: "Please select sibling relation"
  },
  
  // Medical Information
  allergies: {
    required: false,
    maxLength: 500,
    message: "Allergies information too long (max 500 characters)"
  },
  
  chronicIllness: {
    required: false,
    maxLength: 500,
    message: "Chronic illness information too long (max 500 characters)"
  },
  
  dietaryRestrictions: {
    required: false,
    maxLength: 500,
    message: "Dietary restrictions too long (max 500 characters)"
  },
  
  medication: {
    required: false,
    maxLength: 500,
    message: "Medication information too long (max 500 characters)"
  },
  
  doctorName: {
    required: false,
    custom: isValidName,
    maxLength: 100,
    message: "Doctor name must contain only letters and spaces"
  },
  
  doctorContact: {
    required: false,
    custom: isValidMobile,
    message: "Please enter a valid 10-digit contact number"
  },
  
  medicalNotes: {
    required: false,
    maxLength: 1000,
    message: "Medical notes too long (max 1000 characters)"
  },
  
  // Transport Information
  route: {
    required: false,
    maxLength: 50,
    message: "Route name too long (max 50 characters)"
  },
  
  busStop: {
    required: false,
    maxLength: 100,
    message: "Bus stop name too long (max 100 characters)"
  },
  
  busNumber: {
    required: false,
    maxLength: 20,
    message: "Bus number too long (max 20 characters)"
  },
  
  driverName: {
    required: false,
    custom: isValidName,
    maxLength: 100,
    message: "Driver name must contain only letters and spaces"
  },
  
  // Fee Information
  feeCategory: {
    required: false,
    message: "Please select fee category"
  },
  
  concessionType: {
    required: false,
    message: "Please select concession type"
  },
  
  concessionAmount: {
    required: false,
    pattern: /^\d{1,10}(?:\.\d{1,2})?$/,
    message: "Please enter a valid concession amount"
  },
  
  // Other
  remarks: {
    required: false,
    maxLength: 1000,
    message: "Remarks too long (max 1000 characters)"
  },
  
  studentStatus: {
    required: true,
    message: "Please select student status"
  }
};

export const useValidation = () => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((name, value) => {
    // Handle dynamic sibling fields
    let rule = validationRules[name];
    
    // Check for sibling fields pattern
    if (!rule && name.startsWith('sibling_')) {
      const baseField = name.split('_').slice(0, -1).join('_');
      const fieldType = name.split('_').pop();
      rule = validationRules[`${baseField}_${fieldType}`];
    }
    
    if (!rule) return '';

    // Check required
    if (rule.required) {
      const isEmpty = !value || (typeof value === 'string' && !value.trim());
      if (isEmpty) {
        return rule.message || `${name.replace(/([A-Z])/g, ' $1').trim()} is required`;
      }
    }

    // Skip further validation if value is empty and not required
    if (!value || (typeof value === 'string' && !value.trim())) {
      return '';
    }

    const stringValue = String(value).trim();

    // Check min length
    if (rule.minLength && stringValue.length < rule.minLength) {
      return rule.message || `Must be at least ${rule.minLength} characters`;
    }

    // Check max length
    if (rule.maxLength && stringValue.length > rule.maxLength) {
      return rule.message || `Must be less than ${rule.maxLength} characters`;
    }

    // Check pattern
    if (rule.pattern && !rule.pattern.test(stringValue)) {
      return rule.message;
    }

    // Check custom validation
    if (rule.custom && !rule.custom(stringValue)) {
      return rule.message;
    }

    return '';
  }, []);

  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const validateForm = useCallback((formData, activeSections = {}) => {
    const newErrors = {};
    let hasErrors = false;

     Object.keys(validationRules).forEach(field => {
    // Skip sameAsCurrent - it's a checkbox, not a required field
    if (field === 'sameAsCurrent') {
      return;
    }
    
      if (field.startsWith('sibling_') && !activeSections.showSibling) {
        return;
      }
      
      // Skip guardian validation if guardian section is not active
      if (field.startsWith('guardian') && !activeSections.showGuardian) {
        return;
      }
      
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });
    
    setErrors(newErrors);
    return !hasErrors;
  }, [validateField]);
  

   const validateFieldOnChange = useCallback((field, value) => {
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  }, [validateField]);

  return {
    errors,
    touched,
    validateField,
    validateForm,
    validateFieldOnChange,
    handleBlur,
    setErrors,
    setTouched
  };
};