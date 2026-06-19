import React, { useState, useEffect, useRef } from "react";
import upload from "../../assets/images/upload.png";

const EditBookModal = ({ isOpen, onClose, onSubmit, bookData }) => {
  const fileInputRef = useRef(null);
  const categoryRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  // Validation error states
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "", author: "", isbn: "", publisher: "", language: "",
    category: "", publicationYear: "", edition: "", totalPages: "",
    totalCopies: "", price: "", shelfLocation: "", description: "",
    coverImage: null, coverFileName: ""
  });

  const categories = ["Textbooks", "Fiction", "Non-Fiction", "Science", "Technology", "Biography"];

  // Validation function
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "title":
        if (!value.trim()) error = "Book title is required";
        else if (value.trim().length < 2) error = "Title must be at least 2 characters";
        break;

      case "author":
        if (!value.trim()) error = "Author name is required";
        else if (value.trim().length < 2) error = "Author name must be at least 2 characters";
        break;

      case "isbn":
        if (value) {
          const cleanIsbn = value.replace(/[\s\-]/g, '');
          if (!/^\d+$/.test(cleanIsbn)) {
            error = "ISBN should contain only numbers, spaces, and hyphens";
          } else if (cleanIsbn.length < 10 || cleanIsbn.length > 13) {
            error = "ISBN must be 10-13 digits long";
          }
        }
        break;

      case "category":
        if (!value) error = "Please select a category";
        break;

      case "publicationYear":
        if (value) {
          const year = parseInt(value);
          const currentYear = new Date().getFullYear();
          if (!/^\d{4}$/.test(value)) error = "Please enter a valid 4-digit year";
          else if (year < 1000 || year > currentYear) error = `Year must be between 1000 and ${currentYear}`;
        }
        break;

      case "totalPages":
        if (value) {
          if (!/^\d+$/.test(value)) error = "Pages must be a valid number";
          else if (parseInt(value) < 1) error = "Pages must be at least 1";
          else if (parseInt(value) > 10000) error = "Pages cannot exceed 10,000";
        }
        break;

      case "totalCopies":
        if (!value) error = "Total copies is required";
        else if (!/^\d+$/.test(value)) error = "Copies must be a valid number";
        else if (parseInt(value) < 1) error = "Copies must be at least 1";
        else if (parseInt(value) > 1000) error = "Copies cannot exceed 1,000";
        break;

      case "price":
        if (value) {
          if (!/^\d+(\.\d{1,2})?$/.test(value)) error = "Please enter a valid price (e.g., 599.99)";
          else if (parseFloat(value) < 0) error = "Price cannot be negative";
          else if (parseFloat(value) > 1000000) error = "Price cannot exceed ₹10,00,000";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = ["title", "author", "isbn", "category", "publicationYear", 
                    "totalPages", "totalCopies", "price"];

    fields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (bookData) {
      setFormData({
        title: bookData.title || "",
        author: bookData.author || "",
        isbn: bookData.isbn || "",
        publisher: bookData.publisher || "",
        language: bookData.language || "",
        category: bookData.category || "",
        publicationYear: bookData.publicationYear || "",
        edition: bookData.edition || "",
        totalPages: bookData.totalPages || "",
        totalCopies: String(bookData.totalCopies || ""),
        price: bookData.price || "",
        shelfLocation: bookData.shelfLocation || "",
        description: bookData.description || "",
        coverImage: bookData.coverImage || null,
        coverFileName: bookData.coverFileName || ""
      });
      setErrors({});
      setUploadError("");
    }
  }, [bookData]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) setIsCategoryOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const processFile = (file) => {
    if (!file) return;
    setUploadError("");
    if (!file.type.startsWith("image/")) { 
      setUploadError("Only images are allowed."); 
      return; 
    }
    if (file.size > 1024 * 1024) { 
      setUploadError("Image must be under 1 MB."); 
      return; 
    }
    const reader = new FileReader();
    reader.onload = (e) => setFormData(prev => ({ ...prev, coverImage: e.target.result, coverFileName: file.name }));
    reader.readAsDataURL(file);
  };

  const handleChange = (e, field) => {
    let value = e.target.value;
    
    // Active input filtering
    if (field === "isbn") {
      value = value.replace(/[^0-9\s\-]/g, '');
    }
    
    if (["totalPages", "totalCopies", "publicationYear"].includes(field)) {
      value = value.replace(/[^0-9]/g, '');
    }
    
    if (field === "price") {
      value = value.replace(/[^0-9.]/g, '');
      const parts = value.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
      }
      if (parts[1] && parts[1].length > 2) {
        value = parts[0] + '.' + parts[1].slice(0, 2);
      }
    }
    
    if (field === "shelfLocation") {
      value = value.replace(/[^A-Za-z0-9\-]/g, '').toUpperCase();
    }
    
    // Auto-capitalize first letter for text fields
    if (["title", "author", "publisher", "language", "description"].includes(field)) {
      if (value.length > 0) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
      }
    }

    setFormData({ ...formData, [field]: value });
    
    // Clear error for this field
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) element.focus();
      }
      return;
    }
    
    const copies = parseInt(formData.totalCopies) || 0;
    const issued = bookData?.issued || 0;
    const avail = Math.max(0, copies - issued);
    let status = "Available";
    if (avail === 0) status = "Unavailable";
    else if (avail <= 2) status = "Low Stock";
    
    onSubmit({ 
      ...formData, 
      id: bookData?.id, 
      totalCopies: copies, 
      issued, 
      available: avail, 
      status,
      createdAt: bookData?.createdAt // Preserve createdAt
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-[0.5px] flex items-center justify-center p-4 md:p-6 z-50 animate-fadeIn">
      <div className="bg-white rounded-[16px] w-full max-w-[48rem] max-h-[62vh] flex flex-col overflow-hidden shadow-2xl border border-[#E6E6E6] relative animate-scaleUp mt-15">
        <div className="bg-white pt-4 pb-1 px-5 relative flex justify-between items-center select-none">
          <div>
            <h3 className="text-[18px] font-semibold font-[600] text-[#1C1C1C]">Edit Book</h3>
            <p className="text-[16px] text-[#9C9C9C] font-normal -mt-[2px]">Update the book information</p>
          </div>
          <button type="button" onClick={onClose} className="text-[#1C1C1C] pt-1 pr-4 pl-2 pb-1 rounded-full transition cursor-pointer flex items-center justify-center font-bold">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto overflow-x-visible p-4 space-y-4">
          {/* Title & Author */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
                Book Title <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="title"
                required 
                value={formData.title}
                onChange={(e) => handleChange(e, "title")}
                className={`w-full px-4 py-3 text-sm bg-white border ${
                  errors.title ? "border-red-500" : "border-[#E6E6E6]"
                } rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#696969] font-[400]`} 
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
                Author <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="author"
                required 
                value={formData.author}
                onChange={(e) => handleChange(e, "author")}
                className={`w-full px-4 py-3 text-sm bg-white border ${
                  errors.author ? "border-red-500" : "border-[#E6E6E6]"
                } rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#696969] font-[400]`} 
              />
              {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
            </div>
          </div>

          {/* ISBN, Publisher, Language */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">ISBN</label>
              <input 
                type="text" 
                name="isbn"
                value={formData.isbn} 
                onChange={(e) => handleChange(e, "isbn")}
                className={`w-full px-4 py-3 text-sm bg-white border ${
                  errors.isbn ? "border-red-500" : "border-[#E6E6E6]"
                } rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#696969] font-[400]`} 
              />
              {errors.isbn && <p className="text-red-500 text-xs mt-1">{errors.isbn}</p>}
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Publisher</label>
              <input 
                type="text" 
                value={formData.publisher} 
                onChange={(e) => handleChange(e, "publisher")}
                className="w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#696969] font-[400]" 
              />
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Language</label>
              <input 
                type="text" 
                value={formData.language} 
                onChange={(e) => handleChange(e, "language")}
                className="w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#696969] font-[400]" 
              />
            </div>
          </div>

          {/* Category, Year, Edition */}
          <div className="grid grid-cols-3 gap-4 relative z-30">
            <div className="relative" ref={categoryRef}>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <button 
                type="button" 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={`w-full px-4 py-3 text-sm bg-white border ${
                  errors.category ? "border-red-500" : "border-[#E6E6E6]"
                } rounded-[12px] text-left outline-none transition flex justify-between items-center`}
              >
                <span className={formData.category ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}>
                  {formData.category || "Select Category"}
                </span>
                <svg className={`w-4 h-4 text-[#9C9C9C] transition-transform duration-200 ${isCategoryOpen ? "" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isCategoryOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-[12px] shadow-lg overflow-hidden py-1">
                  {categories.map(cat => (
                    <button 
                      key={cat} 
                      type="button" 
                      onClick={() => { 
                        setFormData({ ...formData, category: cat }); 
                        setIsCategoryOpen(false);
                        if (errors.category) setErrors({ ...errors, category: "" });
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors block ${
                        formData.category === cat ? "bg-[#F5F5F5] text-[#1C1C1C] font-medium" : "text-[#4A4A4A] hover:bg-[#F9F9F9]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Publication Year</label>
              <input 
                type="text" 
                name="publicationYear"
                placeholder="e.g., 2005" 
                value={formData.publicationYear} 
                onChange={(e) => handleChange(e, "publicationYear")}
                className={`w-full px-4 py-3 text-sm bg-white border ${
                  errors.publicationYear ? "border-red-500" : "border-[#E6E6E6]"
                } rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#696969] font-[400]`} 
              />
              {errors.publicationYear && <p className="text-red-500 text-xs mt-1">{errors.publicationYear}</p>}
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Edition</label>
              <input 
                type="text" 
                placeholder="e.g., 4th" 
                value={formData.edition} 
                onChange={(e) => handleChange(e, "edition")}
                className="w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#696969] font-[400]" 
              />
            </div>
          </div>

          {/* Pages, Copies, Price */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Total Pages</label>
              <input 
                type="text" 
                name="totalPages"
                value={formData.totalPages} 
                onChange={(e) => handleChange(e, "totalPages")}
                className={`w-full px-4 py-3 text-sm bg-white border ${
                  errors.totalPages ? "border-red-500" : "border-[#E6E6E6]"
                } rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#696969] font-[400]`} 
              />
              {errors.totalPages && <p className="text-red-500 text-xs mt-1">{errors.totalPages}</p>}
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
                Total Copies <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="totalCopies"
                required 
                value={formData.totalCopies} 
                onChange={(e) => handleChange(e, "totalCopies")}
                className={`w-full px-4 py-3 text-sm bg-white border ${
                  errors.totalCopies ? "border-red-500" : "border-[#E6E6E6]"
                } rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#696969] font-[400]`} 
              />
              {errors.totalCopies && <p className="text-red-500 text-xs mt-1">{errors.totalCopies}</p>}
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Price(₹)</label>
              <input 
                type="text" 
                name="price"
                value={formData.price} 
                onChange={(e) => handleChange(e, "price")}
                className={`w-full px-4 py-3 text-sm bg-white border ${
                  errors.price ? "border-red-500" : "border-[#E6E6E6]"
                } rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#696969] font-[400]`} 
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
          </div>

          {/* Shelf Location */}
          <div>
            <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Rack Number</label>
            <input 
              type="text" 
              value={formData.shelfLocation} 
              onChange={(e) => handleChange(e, "shelfLocation")}
              className="w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#696969] font-[400]" 
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Description</label>
            <textarea 
              rows={4} 
              value={formData.description} 
              onChange={(e) => handleChange(e, "description")}
              className="w-full px-4 py-2 text-[14px] bg-white border border-[#E6E6E6] rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#696969] font-[400] resize-none" 
            />
          </div>

          {/* Cover Image */}
          <div className="relative z-0">
            <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Book Cover Image</label>
            {formData.coverImage ? (
              <div className="flex flex-col-2 items-start gap-3">
                <img src={formData.coverImage} alt="Cover" className="h-48 w-36 rounded-[5px] shadow-sm" />
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()} 
                  className="text-[14px] px-2 py-1 font-semibold cursor-pointer mt-20 rounded-[8px] text-[#1f80ee] bg-[#E1EFFF]"
                >
                  Change Image
                </button>
              </div>
            ) : (
              <div 
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
                onDrop={(e) => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]); }}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-[12px] p-4 text-center transition cursor-pointer flex flex-col items-center justify-center min-h-[110px] select-none ${
                  dragActive ? "border-[#118AB2]" : "border-[#BFDBFE]"
                }`}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1">
                    <div className="h-6 w-6 bg-[#118AB2]" style={{ 
                      maskImage: `url(${upload})`, 
                      WebkitMaskImage: `url(${upload})`, 
                      maskRepeat: 'no-repeat', 
                      WebkitMaskRepeat: 'no-repeat', 
                      maskPosition: 'center', 
                      WebkitMaskPosition: 'center', 
                      maskSize: 'contain', 
                      WebkitMaskSize: 'contain' 
                    }}></div>
                  </div>
                  <p className="text-[15px] text-[#1C1C1C] font-normal">Drag & Drop to upload or <span className="text-[#118AB2] underline">Browse</span></p>
                  <p className="text-[13px] text-[#696969] mt-0 font-normal">Only image files are allowed.</p>
                </div>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={(e) => { 
                if (e.target.files?.[0]) { 
                  processFile(e.target.files[0]); 
                  e.target.value = ""; 
                } 
              }} 
              accept="image/*" 
              className="hidden" 
            />
            {uploadError && <p className="text-red-500 text-xs mt-1 font-semibold text-center">{uploadError}</p>}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2 relative z-0">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-5 py-2 h-[38px] min-w-[90px] border border-[#9C9C9C] bg-[#FFFFFF] text-[#696969] rounded-[8px] font-[600] text-[16px] font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 h-[38px] min-w-[100px] bg-[#0B3142] text-white rounded-[8px] text-[16px] font-semibold transition cursor-pointer font-[Segoe UI]"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;