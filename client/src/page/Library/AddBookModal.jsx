import React, { useState, useRef } from "react";
import upload from "../../assets/images/upload.png";

const AddBookModal = ({ isOpen, onClose, onSubmit }) => {
  const fileInputRef = useRef(null);
  const categoryRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  // Validation error states
  const [errors, setErrors] = useState({});

  const [bookData, setBookData] = useState({
    title: "", author: "", isbn: "", publisher: "", language: "",
    category: "", publicationYear: "", edition: "", totalPages: "",
    totalCopies: "", price: "", shelfLocation: "", description: "",
    coverImage: null, coverFileName: ""
  });

  const categories = ["Textbooks", "Fiction", "Non-Fiction", "Science", "Technology", "Biography"];

  // Validation functions
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "title":
        if (!value.trim()) error = "Book title is required";
        else if (value.trim().length < 2) error = "Title must be at least 2 characters";
        else if (!/^[A-Za-z\s\d\-\'\,\.\&\:]+$/.test(value)) error = "Title contains invalid characters";
        break;

      case "author":
        if (!value.trim()) error = "Author name is required";
        else if (value.trim().length < 2) error = "Author name must be at least 2 characters";
        else if (!/^[A-Za-z\s\.\']+$/.test(value)) error = "Author name should contain only letters, spaces, dots, and apostrophes";
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

      case "publisher":
        if (value && !/^[A-Za-z\s\d\&\'\.\,]+$/.test(value)) {
          error = "Publisher name contains invalid characters";
        }
        break;

      case "language":
        if (value && !/^[A-Za-z\s\-]+$/.test(value)) {
          error = "Language should contain only letters and hyphens";
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

      case "edition":
        if (value && !/^[\d]+(st|nd|rd|th)?$/i.test(value) && !/^[A-Za-z\s\d]+$/.test(value)) {
          error = "Please enter a valid edition (e.g., 2nd, 3rd, Fourth)";
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

      case "shelfLocation":
        if (value && !/^[A-Za-z0-9\-]+$/.test(value)) {
          error = "Shelf location should contain only letters, numbers, and hyphens";
        }
        break;

      case "description":
        if (value && value.length > 1000) error = "Description cannot exceed 1000 characters";
        break;

      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = ["title", "author", "isbn", "publisher", "language", "category", 
                    "publicationYear", "edition", "totalPages", "totalCopies", "price", 
                    "shelfLocation", "description"];

    fields.forEach(field => {
      const error = validateField(field, bookData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    reader.onload = (e) => setBookData(prev => ({ ...prev, coverImage: e.target.result, coverFileName: file.name }));
    reader.readAsDataURL(file);
  };

  const handleChange = (e, field) => {
    let value = e.target.value;
    
    // -------- ACTIVE INPUT FILTERING (PREVENTS INVALID CHARACTERS) --------
    
    // For ISBN: Only allow numbers, spaces, and hyphens
    if (field === "isbn") {
      value = value.replace(/[^0-9\s\-]/g, '');
    }
    
    // For numeric fields: Only allow numbers and decimal point for price
    if (["totalPages", "totalCopies", "publicationYear"].includes(field)) {
      value = value.replace(/[^0-9]/g, '');
    }
    
    // For price: Allow numbers and one decimal point
    if (field === "price") {
      // Allow only numbers and one decimal point
      value = value.replace(/[^0-9.]/g, '');
      // Prevent multiple decimal points
      const parts = value.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
      }
      // Limit to 2 decimal places
      if (parts[1] && parts[1].length > 2) {
        value = parts[0] + '.' + parts[1].slice(0, 2);
      }
    }
    
    // For edition: Allow numbers, letters, and spaces (e.g., "2nd", "Third", "4th Edition")
    if (field === "edition") {
      value = value.replace(/[^a-zA-Z0-9\s]/g, '');
    }
    
    // For shelf location: Only allow uppercase letters, numbers, and hyphens
    if (field === "shelfLocation") {
      value = value.replace(/[^A-Za-z0-9\-]/g, '').toUpperCase();
    }
    
    // Auto-capitalize first letter for text fields
    if (["title", "author", "publisher", "language", "category", "description"].includes(field)) {
      if (value.length > 0) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
      }
    }

    setBookData({ ...bookData, [field]: value });
    
    // Clear error for this field when user starts typing
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

    onSubmit({
      ...bookData,
      id: `book-${Date.now()}`,
      totalCopies: parseInt(bookData.totalCopies) || 0,
      issued: 0,
      available: parseInt(bookData.totalCopies) || 0,
      status: "Available"
    });
    
    setBookData({ title: "", author: "", isbn: "", publisher: "", language: "",
      category: "", publicationYear: "", edition: "", totalPages: "",
      totalCopies: "", price: "", shelfLocation: "", description: "",
      coverImage: null, coverFileName: "" });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-[0.5px] flex items-center justify-center p-3 md:p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-[16px] w-full max-w-[48rem] max-h-[62vh] flex flex-col overflow-hidden shadow-2xl border border-[#E6E6E6] relative animate-scaleUp mt-15">
        {/* Header */}
        <div className="bg-white text-slate-800 pt-4 pb-1 px-5 relative flex justify-between items-center select-none">
          <div>
            <h3 className="text-[18px] font-semibold font-[600] text-[#1C1C1C]">Add New Book</h3>
            <p className="text-[16px] text-[#9C9C9C] font-normal -mt-[2px]">Add a new book to the library catalog</p>
          </div>
          <button type="button" onClick={onClose} className="text-[#1C1C1C] -pt-[2px] pr-3 mt-0 rounded-full transition cursor-pointer flex items-center justify-center font-bold" title="Close">✕</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto overflow-x-visible pt-5 pr-5 pl-5 pb-5 space-y-3">
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
                placeholder="e.g., The Great Gatsby"
                value={bookData.title}
                onChange={(e) => handleChange(e, "title")}
                className={`w-full px-4 py-3 text-[16px] bg-white border ${
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
                placeholder="e.g., F. Scott Fitzgerald"
                value={bookData.author}
                onChange={(e) => handleChange(e, "author")}
                className={`w-full px-4 py-3 text-[16px] bg-white border ${
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
                placeholder="e.g., 9780743273565"
                value={bookData.isbn}
                onChange={(e) => handleChange(e, "isbn")}
                className={`w-full px-4 py-3 text-[16px] bg-white border ${
                  errors.isbn ? "border-red-500" : "border-[#E6E6E6]"
                } rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#696969] font-[400]`}
              />
              {errors.isbn && <p className="text-red-500 text-xs mt-1">{errors.isbn}</p>}
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Publisher</label>
              <input
                type="text"
                name="publisher"
                placeholder="e.g., Harper Perennial"
                value={bookData.publisher}
                onChange={(e) => handleChange(e, "publisher")}
                className={`w-full px-4 py-3 text-[16px] bg-white border ${
                  errors.publisher ? "border-red-500" : "border-[#E6E6E6]"
                } rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#696969] font-[400]`}
              />
              {errors.publisher && <p className="text-red-500 text-xs mt-1">{errors.publisher}</p>}
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Language</label>
              <input
                type="text"
                name="language"
                placeholder="e.g., English"
                value={bookData.language}
                onChange={(e) => handleChange(e, "language")}
                className={`w-full px-4 py-3 text-[16px] bg-white border ${
                  errors.language ? "border-red-500" : "border-[#E6E6E6]"
                } rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#696969] font-[400]`}
              />
              {errors.language && <p className="text-red-500 text-xs mt-1">{errors.language}</p>}
            </div>
          </div>

          {/* Category, Publication Year, Edition */}
          <div className="grid grid-cols-3 gap-4 relative z-30">
            <div className="relative" ref={categoryRef}>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={`w-full px-4 py-3 text-[16px] bg-white border ${
                  errors.category ? "border-red-500" : "border-[#E6E6E6]"
                } rounded-[12px] text-left outline-none transition flex justify-between items-center`}
              >
                <span className={bookData.category ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}>
                  {bookData.category || "Select Category"}
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
                        setBookData({ ...bookData, category: cat });
                        setIsCategoryOpen(false);
                        if (errors.category) setErrors({ ...errors, category: "" });
                      }}
                      className={`w-full text-left px-4 py-3 text-[16px] transition-colors block ${
                        bookData.category === cat ? "bg-[#F5F5F5] text-[#1C1C1C] font-medium" : "text-[#4A4A4A] hover:bg-[#F9F9F9]"
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
                value={bookData.publicationYear}
                onChange={(e) => handleChange(e, "publicationYear")}
                className={`w-full px-4 py-3 text-[16px] bg-white border ${
                  errors.publicationYear ? "border-red-500" : "border-[#E6E6E6]"
                } rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#696969] font-[400]`}
              />
              {errors.publicationYear && <p className="text-red-500 text-xs mt-1">{errors.publicationYear}</p>}
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Edition</label>
              <input
                type="text"
                name="edition"
                placeholder="e.g., 4th"
                value={bookData.edition}
                onChange={(e) => handleChange(e, "edition")}
                className={`w-full px-4 py-3 text-[16px] bg-white border ${
                  errors.edition ? "border-red-500" : "border-[#E6E6E6]"
                } rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#696969] font-[400]`}
              />
              {errors.edition && <p className="text-red-500 text-xs mt-1">{errors.edition}</p>}
            </div>
          </div>

          {/* Total Pages, Total Copies, Price */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Total Pages</label>
              <input
                type="text"
                name="totalPages"
                placeholder="30"
                value={bookData.totalPages}
                onChange={(e) => handleChange(e, "totalPages")}
                className={`w-full px-4 py-3 text-[16px] bg-white border ${
                  errors.totalPages ? "border-red-500" : "border-[#E6E6E6]"
                } rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#1C1C1C] font-[400]`}
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
                placeholder="30"
                value={bookData.totalCopies}
                onChange={(e) => handleChange(e, "totalCopies")}
                className={`w-full px-4 py-3 text-[16px] bg-white border ${
                  errors.totalCopies ? "border-red-500" : "border-[#E6E6E6]"
                } rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#1C1C1C] font-[400]`}
              />
              {errors.totalCopies && <p className="text-red-500 text-xs mt-1">{errors.totalCopies}</p>}
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Price(₹)</label>
              <input
                type="text"
                name="price"
                placeholder="₹ 600.00"
                value={bookData.price}
                onChange={(e) => handleChange(e, "price")}
                className={`w-full px-4 py-3 text-[16px] bg-white border ${
                  errors.price ? "border-red-500" : "border-[#E6E6E6]"
                } rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#1C1C1C] font-[400]`}
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
          </div>

          {/* Rack Number */}
          <div>
            <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Rack Number</label>
            <input
              type="text"
              name="shelfLocation"
              placeholder="Select shelf code"
              value={bookData.shelfLocation}
              onChange={(e) => handleChange(e, "shelfLocation")}
              className={`w-full px-4 py-3 text-[16px] bg-white border ${
                errors.shelfLocation ? "border-red-500" : "border-[#E6E6E6]"
              } rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#1C1C1C] font-[400]`}
            />
            {errors.shelfLocation && <p className="text-red-500 text-xs mt-1">{errors.shelfLocation}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">Description</label>
            <textarea
              rows={3}
              name="description"
              placeholder="Brief description of the book"
              value={bookData.description}
              onChange={(e) => handleChange(e, "description")}
              className={`w-full px-4 py-2 text-[14px] bg-white border ${
                errors.description ? "border-red-500" : "border-[#E6E6E6]"
              } rounded-[12px] outline-none transition placeholder-[#9C9C9C] text-[#1C1C1C] font-[400] resize-none`}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Book Cover Image Upload */}
          <div className="relative z-0">
            <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1 mt-0">Book Cover Image</label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
              onDrop={(e) => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]); }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-[12px] p-4 text-center transition cursor-pointer flex flex-col items-center justify-center min-h-[110px] select-none ${
                dragActive ? "border-[#118AB2]" : bookData.coverImage ? "border-green-400 bg-green-50/10" : "border-[#BFDBFE]"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => { if (e.target.files?.[0]) { processFile(e.target.files[0]); e.target.value = ""; } }}
                accept="image/*"
                className="hidden"
              />
              {bookData.coverImage ? (
                <div className="flex flex-col items-center justify-center">
                  <img src={bookData.coverImage} alt="Preview" className="max-h-20 object-contain rounded-[8px] border border-gray-200 mb-1 shadow-sm" />
                  <p className="text-[14px] font-semibold text-green-600">File Selected Successfully!</p>
                  {bookData.coverFileName && <p className="text-[12px] text-slate-500 mt-0 max-w-sm truncate mx-auto font-medium">{bookData.coverFileName}</p>}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1">
                    <div className="h-6 w-6 bg-[#118AB2]" style={{ maskImage: `url(${upload})`, WebkitMaskImage: `url(${upload})`, maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center', maskSize: 'contain', WebkitMaskSize: 'contain' }}></div>
                  </div>
                  <p className="text-[15px] text-[#1C1C1C] font-normal">Drag & Drop to upload or <span className="text-[#118AB2] underline">Browse</span></p>
                  <p className="text-[13px] text-[#696969] mt-0 font-normal">Only image files are allowed.</p>
                </div>
              )}
            </div>
            {uploadError && <p className="text-red-500 text-xs mt-1 font-semibold text-center select-none">{uploadError}</p>}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2 relative z-0">
            <button
              type="button"
              onClick={onClose}
              className="py-2 h-[38px] min-w-[90px] rounded-[8px] border border-[#9C9C9C] bg-white px-4 text-[16px] font-semibold text-[#696969] transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-[38px] min-w-[100px] rounded-[8px] bg-[#0B3142] px-5 text-[16px] font-semibold text-white hover:bg-[#15465c] transition cursor-pointer font-[Segoe UI]"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;