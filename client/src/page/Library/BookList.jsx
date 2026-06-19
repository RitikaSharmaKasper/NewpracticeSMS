import React, { useState, useEffect, useRef } from "react";
import presetBooks from "../../data/books.json";
import AddBookModal from "./AddBookModal";
import EditBookModal from "./EditBookModal";
import DeleteBookModal from "./DeleteBookModal";
import editted from "../../assets/images/editted.png";
import viewMessage from "../../assets/images/viewmessage.png";
import eye from "../../assets/images/eye.png";
import { HiSearch } from 'react-icons/hi';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import totalbooks_gif from "../../assets/images/totalbooks.gif.gif";
import booksissued from "../../assets/images/booksissued.gif";
import availablebooks from "../../assets/images/availablebooks.gif";
import overduebooks from "../../assets/images/overdue.gif";
import deleteIcon from "../../assets/images/delete-2.png";
import ViewBookModal from  "./ViewBookModal";
import plusIcon from "../../assets/images/plus.png";
// ADDED STATE VARIABLES

const STORAGE_KEY = "sms_library_books_v1";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Category");
  const [isCatFilterOpen, setIsCatFilterOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
 
  const [selectedBook, setSelectedBook] = useState(null);
  const [deleteBook, setDeleteBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState(false);
  const catFilterRef = useRef(null);
const [isViewModalOpen, setIsViewModalOpen] = useState(false);
const [viewingBook, setViewingBook] = useState(null)
  const categories = ["All Category", "Textbooks", "Fiction", "Non-Fiction", "Science", "Technology", "Biography"];

  // Load from localStorage or preset
useEffect(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  let loadedBooks = [];
  if (saved) {
    try { 
      loadedBooks = JSON.parse(saved); 
    } catch { 
      loadedBooks = presetBooks; 
    }
  } else {
    loadedBooks = presetBooks;
  }
  // Sort books - newest first
  const sortedBooks = sortBooksNewestFirst(loadedBooks);
  setBooks(sortedBooks);
}, []);


// Add this after your state declarations (around line 25-30)
const sortBooksNewestFirst = (bookList) => {
  return [...bookList].sort((a, b) => {
    // If books have a createdAt timestamp, use that
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    // If using numeric IDs (like Date.now()), compare them
    if (a.id && b.id) {
      const aIdNum = parseInt(a.id.replace(/\D/g, ''));
      const bIdNum = parseInt(b.id.replace(/\D/g, ''));
      if (!isNaN(aIdNum) && !isNaN(bIdNum)) {
        return bIdNum - aIdNum; // Higher number = newer
      }
    }
    return 0;
  });
};


  // Save to localStorage on change
const saveBooks = (updated) => {
  const sorted = sortBooksNewestFirst(updated);
  setBooks(sorted);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
};
  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (catFilterRef.current && !catFilterRef.current.contains(e.target)) setIsCatFilterOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // CRUD handlers
const handleAddBook = (newBook) => {
  const bookWithTimestamp = {
    ...newBook,
    createdAt: new Date().toISOString(),
    id: newBook.id || `book-${Date.now()}`
  };
  saveBooks([...books, bookWithTimestamp]);
};

const handleEditBook = (updated) => {
  const existingBook = books.find(b => b.id === updated.id);
  const bookWithTimestamp = {
    ...updated,
    createdAt: existingBook?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  saveBooks(books.map(b => b.id === updated.id ? bookWithTimestamp : b));
  setIsEditModalOpen(false);
  setSelectedBook(null);
};

  const handleDeleteConfirm = () => {
    if (!deleteBook) return;
    saveBooks(books.filter(b => b.id !== deleteBook.id));
    setIsDeleteModalOpen(false);
    setDeleteBook(null);
  };

  // Filter logic
  const filtered = books.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.isbn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === "All Category" || b.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filtered.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Reset page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter]);

  // Stats
  const totalBooks = books.reduce((s, b) => s + (b.totalCopies || 0), 0);
  const totalIssued = books.reduce((s, b) => s + (b.issued || 0), 0);
  const totalAvailable = books.reduce((s, b) => s + (b.available || 0), 0);
  const overdueBooks = books.filter(b => b.status === "Unavailable").length;
  const uniqueTitles = books.length;
  const issuedMembers = Math.floor(totalIssued * 0.85);

  // Status badge helper
  const getStatusBadge = (status) => {
   switch (status) {
  case "Available": 
    return (
      <span className="inline-flex items-center justify-center gap-1.5 w-[100px] py-0.25 rounded-[4px] bg-[#D4EDDA] text-[12px] font-normal text-[#009638]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#009638] shrink-0"></span>
        Available
      </span>
    );
  case "Unavailable": 
    return (
      <span className="inline-flex items-center justify-center gap-1.5 w-[100px] py-0.25 rounded-[4px] bg-[#F8D7DA] text-[12px] font-normal text-[#C92131]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C92131] shrink-0"></span>
        Unavailable
      </span>
    );
  case "Low Stock": 
    return (
      <span className="inline-flex items-center justify-center gap-1.5 w-[100px] py-0.25 rounded-[4px] bg-[#FFEDB4] text-[12px] font-normal text-[#A14700]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A14700] shrink-0"></span>
        Low Stock
      </span>
    );
  default: 
    return (
      <span className="inline-flex items-center justify-center gap-1.5 w-[100px] py-0.25 rounded-[4px] bg-gray-100 text-[12px] font-normal text-[#6B7280]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#6B7280] shrink-0"></span>
        {status}
      </span>
    );
}
  };

  return (
    <div className=" pt-1 pl-1 pr-1 pb-1 " style={{ fontFamily: 'Segoe UI'}}>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-[30px] font-semibold text-[#0B3142] font-[600]">Library Management</h1>
          <p className="text-[24px] text-[#696969] font-[400] font-normal -mt-[7px] mb-1">Comprehensive library management system for books, members, and circulation</p>
        </div>
      
      </div>

      {/* ===== ANIMATED STAT CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5" style={{ fontFamily: 'Segoe UI'}}>

        {/* Total Books - icon bounces up/down */}
        <div className="bg-[#FFFFFF] rounded-[12px]  shadow-[0_4px_12px_rgba(0,0,0,0.15)] pl-4 pt-3 pr-4 pb-4 flex justify-between items-center">
          <div>
            <p className="text-[16px] font-normal text-[#1C1C1C] font-[400] mb-3 mt-0">Total Books</p>
            <h3 className="text-[28px] font-bold text-[#1C1C1C] font-[700] mt-0">{totalBooks.toLocaleString()}</h3>
            <p className="text-[14px] text-[#696969] font-semibold">{uniqueTitles} unique titles</p>
          </div>
          <div className="flex items-center justify-center">
            {/* Animated books icon - bouncing up and down */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-12 h-12" style={{ animation: "bounceUpDown 2s ease-in-out infinite" }}>
              <g stroke="#1E3A8A" strokeWidth="1.5">
                <rect x="12" y="18" width="8" height="38" rx="1" fill="#E83E8C" />
                <rect x="22" y="13" width="8" height="42" rx="1" fill="#FBBF24" />
                <rect x="32" y="14" width="8" height="40" rx="1" fill="#3B82F6" />
                <rect x="42" y="18" width="8" height="36" rx="1" fill="#8B5CF6" />
              </g>
            </svg> */}


            <img 
  src={totalbooks_gif} 
  alt="Animation" 
  className="w-13 h-13" 
  
/>
          </div>
        </div>

        {/* Books Issued - opened book animation */}
        <div className="bg-[#FFFFFF] rounded-[12px]  shadow-[0_4px_12px_rgba(0,0,0,0.15)] pl-4 pt-3 pr-4 pb-4 flex justify-between items-center">
          <div>
            <p className="text-[16px] font-normal text-[#1C1C1C] font-[400] mb-3 mt-0">Books Issued</p>
            <h3 className="text-[28px] font-bold text-[#1C1C1C] font-[700] mt-0">{totalIssued.toLocaleString()}</h3>
            <p className="text-[14px] text-[#696969] font-semibold">To {issuedMembers} members</p>
          </div>
          <div className="flex items-center justify-center">
            {/* Animated open book - pages flipping */}
          
            <img 
  src={booksissued} 
  alt="Animation" 
  className="w-12 h-12" 
  
/>
          </div>
        </div>

        {/* Available Books - sliding left/right */}
        <div className="bg-[#FFFFFF] rounded-[12px]  shadow-[0_4px_12px_rgba(0,0,0,0.15)] pl-4 pt-3 pr-4 pb-4 flex justify-between items-center">
          <div>
            <p className="text-[16px] font-normal text-[#1C1C1C] font-[400] mb-3 mt-0">Available Books</p>
            <h3 className="text-[28px] font-bold text-[#1C1C1C] font-[700] mt-0">{totalAvailable.toLocaleString()}</h3>
            <p className="text-[14px] text-[#696969] font-semibold">{totalBooks > 0 ? Math.round((totalAvailable / totalBooks) * 100) : 0}% available</p>
          </div>
          <div className="flex items-center justify-center">
            {/* Animated books icon - sliding left/right */}
                  <img 
  src={availablebooks} 
  alt="Animation" 
  className="w-13 h-13" 
  
/>
          </div>
        </div>

        {/* Overdue Books - clock animation */}
        <div className="bg-[#FFFFFF] rounded-[12px]  shadow-[0_4px_12px_rgba(0,0,0,0.15)] pl-4 pt-3 pr-4 pb-4 flex justify-between items-center">
          <div>
            <p className="text-[16px] font-normal text-[#1C1C1C] font-[400] mb-3 mt-0">Overdue Books</p>
            <h3 className="text-[28px] font-bold text-[#1C1C1C] font-[700] mt-0">{overdueBooks}</h3>
            <p className="text-[14px] text-[#696969] font-semibold">by {Math.max(1, Math.floor(overdueBooks * 3.3))} members</p>
          </div>
          <div className="flex items-center justify-center">
            {/* Animated clock - hand rotating */}
                   <img 
  src={overduebooks} 
  alt="Animation" 
  className="w-13 h-13" 
  
/>   
          </div>
        </div>
      </div>

      {/* CSS Keyframe Animations injected */}
      <style>{`
        @keyframes bounceUpDown {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pageFlip {
          0% { transform: scaleX(1); }
          49% { transform: scaleX(0); fill: #FDE68A; }
          50% { transform: scaleX(0); fill: #FBBF24; }
          100% { transform: scaleX(-1); }
        }
        @keyframes slideLeftRight {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(5px); }
        }
        @keyframes clockSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scaleUp { animation: scaleUp 0.25s ease-out; }
      `}</style>

      {/* Book Catalog Management Section */}
      <div className="bg-white rounded-xl  shadow-md overflow-visible  p-4">
<div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
  <div>
    <h2 className="text-[18px] font-semibold text-[#0B3142] font-[600] -mt-[2px]">Book Catalog Management</h2>
    <p className="text-[16px] text-[#9C9C9C] font-normal -mt-[3px] mb-5">Add, edit, and organize all books in the library</p>
  </div>

  <button 
    onClick={() => setIsAddModalOpen(true)}
    className="bg-[#0B3142] text-[#FFFFFF] pl-8  pr-6 w-[168px] h-[40px] rounded-[8px]  text-[16px] font-[600] font-normal flex items-center gap-2 transition cursor-pointer -mt-[8px]"
  >
    <img src={plusIcon} alt="plus" className="h-5 w-4 object-contain" />Add Book
  </button>
</div>

        {/* Search + Filter Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 px-4">
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#696969] text-[18px]" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#EEEEEE] border border-[#E8E8E8] rounded-[9px] text-[14px] focus:outline-none"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative" ref={catFilterRef}>
              <div 
                onClick={() => setIsCatFilterOpen(!isCatFilterOpen)}
                className="bg-[#EFF2F2] rounded-[9px] px-4 py-2.5 text-[12px] text-[#1C1C1C] min-w-[130px] cursor-pointer flex items-center justify-between"
              >
                <span>{categoryFilter}</span>
                <span className={`text-[8px] transition-transform ${isCatFilterOpen ? '' : ''}`}>▼</span>
              </div>
              {isCatFilterOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-[#E8E8E8] rounded-[9px] shadow-lg overflow-hidden">
                  {categories.map((cat) => (
                    <div 
                      key={cat} 
                      onClick={() => { setCategoryFilter(cat); setIsCatFilterOpen(false); }} 
                      className="px-4 py-2 text-[13px] hover:bg-[#F3F4F6] cursor-pointer text-[#1C1C1C]"
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Book Table */}
        <div className="overflow-x-auto rounded-[12px] border border-[#E6E6E6]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#E6E6E6]">
                <th className="px-4 py-3 text-[14px] font-semibold text-[#1C1C1C] font-[600] w-[70px] whitespace-nowrap">S No.</th>
                <th className="px-9 py-3 text-[14px] font-semibold text-[#1C1C1C] font-[600] min-w-[200px]">Books</th>
                <th className="px-6 py-3 text-[14px] font-semibold text-[#1C1C1C] font-[600]">ISBN</th>
                <th className="px-9 py-3 text-[14px] font-semibold text-[#1C1C1C] font-[600]">Category</th>
                <th className="px-3 py-3 text-[14px] font-semibold text-[#1C1C1C] font-[600] text-center">Copies</th>
                <th className="px-6 py-3 text-[14px] font-semibold text-[#1C1C1C] font-[600] text-center">Issued</th>
                <th className="px-5 py-3 text-[14px] font-semibold text-[#1C1C1C] font-[600] text-center">Available</th>
                <th className="px-4 py-3 text-[14px] font-semibold text-[#1C1C1C] font-[600] text-center">Status</th>
                <th className="px-4 py-3 text-[14px] font-semibold text-[#1C1C1C] font-[600] text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map((book, idx) => (
                <tr key={book.id} className="border-b border-[#E1E1E1]  transition-colors">
                  <td className="px-4 py-3 text-[14px] text-[#1C1C1C] whitespace-nowrap">{indexOfFirst + idx + 1}</td>
                  <td className="px-9 py-2">
                    <div className="flex items-center gap-4">
                      <img src={book.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=60&auto=format&fit=crop&q=80"}
                        alt={book.title} className="w-12 h-16 object-cover rounded-[6px] border border-[#E1E1E1] shadow-sm" />
                      <div>
                        <p className="text-[14px] font-semibold text-[#1C1C1C] font-[600] leading-tight">{book.title}</p>
                        <p className="text-[14px] text-[#9C9C9C] font-normal">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-[14px] text-[#1C1C1C] font-normal">{book.isbn}</td>
                  <td className="px-4 py-3">
                  <span className="inline-flex items-center justify-center w-[140px] py-0 rounded-[4px] text-[14px] font-normal bg-[#FFFFFF] text-[#4A5565] border border-[#E1E1E1]">
    {book.category}
  </span>
                  </td>
                  <td className="px-3 py-3 text-[14px] text-[#1C1C1C] font-normal text-center">{book.totalCopies}</td>
                  <td className="px-6 py-3 text-[14px] text-[#1C1C1C] font-normal text-center">{book.issued}</td>
                  <td className="px-5 py-3 text-[14px] text-[#1C1C1C] font-normal text-center">{book.available}</td>
                  <td className="px-4 py-3 text-center">{getStatusBadge(book.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button title="View" className="p-1.5 rounded-md  transition cursor-pointer" onClick={() => { setViewingBook(book); setIsViewModalOpen(true); }}>
                        <img src={eye} alt="View" className="h-4 w-4 object-contain opacity-60" />
                      </button>
                      <button title="Edit" onClick={() => { setSelectedBook(book); setIsEditModalOpen(true); }}
                        className="p-1.5 rounded-md  transition cursor-pointer">
                        {/* <img src={editted} alt="Edit" className="h-5 w-5 object-contain opacity-60" /> */}
                           <img
                                                  src={viewMessage}
                                                  alt="viewmessage"
                                                 
                                                  className="h-6 w-6 cursor-pointer [image-rendering:-webkit-optimize-contrast]"
                                                />
                      </button>
                      <button title="Delete" onClick={() => { setDeleteBook(book); setIsDeleteModalOpen(true); }}
                        className="p-1.5 rounded-md  transition cursor-pointer">
                        <img
                            src={deleteIcon}
                            alt="delete"
                            onClick={() => triggerDeleteModal(item.roleName)}
                            className="h-6 w-6 cursor-pointer [image-rendering:-webkit-optimize-contrast]"
                          />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="9" className="px-4 py-12 text-center">
                    <p className="text-[16px] text-[#9C9C9C] font-normal">No books found matching your search criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="text-[10px] md:text-[12px] lg:text-[14px] paginationAll-sms mt-2 pt-4"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#6B7280", fontFamily: "Segoe UI" }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div onClick={() => setIsItemsPerPageOpen(!isItemsPerPageOpen)}
                style={{ width: "80px", padding: "4px 8px", borderRadius: "4px", background: "#F9F9F9", appearance: "none", WebkitAppearance: "none", MozAppearance: "none", boxShadow: "-2px 0px 1px rgba(0,0,0,0.05) inset, 2px 0px 1px rgba(0,0,0,0.05) inset, 0px -2px 1px rgba(0,0,0,0.05) inset, 0px 2px 1px rgba(0,0,0,0.05) inset", cursor: "pointer", outline: "none" }}>
                <span className="text-[#1C1C1C] font-bold text-[14px]">{itemsPerPage}</span>
                <span style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", fontSize: "8px", color: "#555" }}>▼</span>
              </div>
              {isItemsPerPageOpen && (
                <div className="absolute bottom-full mb-2 left-0 w-20 bg-white border border-[#696969] rounded-[8px] shadow-xl z-50 overflow-hidden">
                  {[5, 10, 20, 50].map((val) => (
                    <div key={val} onClick={() => { setItemsPerPage(val); setIsItemsPerPageOpen(false); setCurrentPage(1); }}
                      className="px-4 py-2 text-[12px] text-[#696969] hover:bg-[#F3F4F6] cursor-pointer text-center font-normal">
                      {val}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span className="text-[14px] text-[#696969]">
              Showing <span style={{ color: "#1C1C1C" }}>{totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span>-
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div onClick={() => handlePageChange(currentPage - 1)} className={`cursor-pointer ${currentPage === 1 ? "opacity-30" : ""}`}>
              <button disabled={currentPage === 1} style={{ border: "none", background: "transparent", color: "#9CA3AF", display: "flex", alignItems: "center", cursor: currentPage === 1 ? "not-allowed" : "pointer", opacity: currentPage === 1 ? 0.5 : 1 }}>
                <MdKeyboardArrowLeft size={25} /> Previous
              </button>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <span key={p} onClick={() => handlePageChange(p)}
                  className={`w-7 h-7 flex items-center justify-center rounded-[8px] cursor-pointer ${currentPage === p ? "bg-[#002B36] text-white" : ""}`}>
                  {p}
                </span>
              ))}
            </div>
            <div onClick={() => handlePageChange(currentPage + 1)} className={`cursor-pointer ${currentPage === totalPages ? "opacity-30" : ""}`}>
              <button disabled={currentPage === totalPages} style={{ border: "none", background: "transparent", color: "#9CA3AF", display: "flex", alignItems: "center", cursor: currentPage === totalPages ? "not-allowed" : "pointer", opacity: currentPage === totalPages ? 0.5 : 1 }}>
                Next <MdKeyboardArrowRight size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddBookModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddBook} />
      <EditBookModal isOpen={isEditModalOpen} onClose={() => { setIsEditModalOpen(false); setSelectedBook(null); }} onSubmit={handleEditBook} bookData={selectedBook} />
      <DeleteBookModal isOpen={isDeleteModalOpen} onClose={() => { setIsDeleteModalOpen(false); setDeleteBook(null); }} onConfirm={handleDeleteConfirm} bookTitle={deleteBook?.title || ""} />
   <ViewBookModal 
     isOpen={isViewModalOpen} 
     onClose={() => { setIsViewModalOpen(false); setViewingBook(null); }} 
     bookData={viewingBook}
     onEditClick={(book) => {
       setIsViewModalOpen(false);
       setViewingBook(null);
       setSelectedBook(book);
       setIsEditModalOpen(true);
     }}
   />
   
   
   
    </div>
  );
};

export default BookList;
