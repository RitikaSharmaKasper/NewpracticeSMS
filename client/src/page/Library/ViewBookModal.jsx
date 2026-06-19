import React, { useState, useEffect } from "react"; 
import EditBookModal from "./EditBookModal";
import viewgif1 from  "../../assets/images/viewgif1.gif";
import viewgif2 from "../../assets/images/viewgif2.gif";
import viewgif3 from "../../assets/images/viewgif3.gif";
import viewgif4 from "../../assets/images/viewgif4.gif";
import availablebooks from "../../assets/images/availablebooks.gif";
const ViewBookModal = ({ isOpen, onClose, bookData, onEditClick, onUpdateBook }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // ✅ Reset edit state every time modal opens
  useEffect(() => {
    if (isOpen) {
      setIsEditModalOpen(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsEditModalOpen(false);
    onClose();
  };

  if (!isOpen || !bookData) return null;

  const totalCopies = parseInt(bookData.totalCopies) || 0;
  const availableCopies = parseInt(bookData.available) || 0;
  const issuedCopies = parseInt(bookData.issued) || 0;
  const totalBorrows = parseInt(bookData.totalBorrows) || 0;

  const handleEditBook = (updated) => {
    if (onUpdateBook) onUpdateBook(updated);
    handleClose();
  };

  // ✅ Pass bookData directly from props — no selectedBook state needed
  if (isEditModalOpen) {
    return (
      <EditBookModal
        isOpen={isEditModalOpen}
        onClose={handleClose}
        onSubmit={handleEditBook}
        bookData={bookData}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-[0.5px] flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-[16px] w-full max-w-[48rem] max-h-[62vh]flex flex-col overflow-hidden shadow-2xl border border-[#E6E6E6] relative animate-scaleUp">
        
        <div className="bg-white pt-4 pb-2 px-4 flex justify-between items-start select-none">
          <div>
            <h3 className="text-[18px] font-semibold font-[600]  text-[#1C1C1C]">Book Details</h3>
            <p className="text-[16px] text-[#9C9C9C]  font-normal -mt-[3px]">Complete information about the selected book</p>
          </div>
          <button 
            type="button" 
            onClick={handleClose} 
            className="text-[#1C1C1C] text-lg hover:bg-gray-100 h-8 w-8 rounded-full transition cursor-pointer flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5" style={{ fontFamily: 'Segoe UI' }}>
          
          <div className="border border-[#E6E6E6] rounded-[12px] pl-4 pr-3 pt-3 pb-5 flex flex-col sm:flex-row gap-6 bg-white">
            <div className="w-[145px] h-[190px] shrink-0 mx-auto sm:mx-0">
              <img 
                src={bookData.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&auto=format&fit=crop&q=80"} 
                alt={bookData.title} 
                className="w-full h-full object-cover rounded-[8px] border border-[#E1E1E1] shadow-sm"
              />
            </div>
            
            <div className="flex-1 min-w-0 ">
              <h4 className="text-[24px] font-semibold text-[#0B3142] font-[600] truncate leading-tight">{bookData.title}</h4>
              <p className="text-[14px] text-[#1C1C1C] font-normal mb-5 -mt-[3px]">{bookData.author}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="bg-[linear-gradient(to_right,#D3CCE3,#E9E4F0)] p-1 pl-2 rounded-[8px]">
                  <p className="text-[14px] text-[#696969]">Book ID</p>
                  <p className="text-[14px] font-semibold text-[#1C1C1C] font-[600]  truncate">{bookData.id || "N/A"}</p>
                </div>
                <div className="bg-[linear-gradient(to_right,#D3CCE3,#E9E4F0)] p-1 pl-2  rounded-[8px]">
                  <p className="text-[14px] text-[#696969]">Category</p>
                  <p className="text-[14px] font-semibold text-[#1C1C1C] font-[600]  truncate">{bookData.category || "N/A"}</p>
                </div>
                <div className="bg-[linear-gradient(to_right,#D3CCE3,#E9E4F0)] p-1 pl-2  rounded-[8px]">
                  <p className="text-[14px] text-[#696969]">Edition</p>
                  <p className="text-[14px] font-semibold text-[#1C1C1C] font-[600]   truncate">{bookData.edition || "N/A"}</p>
                </div>
                <div className="bg-[linear-gradient(to_right,#D3CCE3,#E9E4F0)] p-1 pl-2 rounded-[8px]">
                  <p className="text-[14px] text-[#696969]">Pages</p>
                  <p className="text-[14px] font-semibold text-[#1C1C1C] font-[600]  truncate">{bookData.totalPages || "N/A"}</p>
                </div>
                <div className="bg-[linear-gradient(to_right,#D3CCE3,#E9E4F0)] p-1 pl-2 rounded-[8px]">
                  <p className="text-[14px] text-[#696969]">Publication Year</p>
                  <p className="text-[14px] font-semibold text-[#1C1C1C] font-[600]  truncate">{bookData.publicationYear || "N/A"}</p>
                </div>
                <div className="bg-[linear-gradient(to_right,#D3CCE3,#E9E4F0)] p-1 rounded-[8px]">
                  <p className="text-[14px] text-[#696969]">Publisher</p>
                  <p className="text-[14px] font-semibold text-[#1C1C1C] font-[600]  truncate">{bookData.publisher || "N/A"}</p>
                </div>
                <div className="bg-[linear-gradient(to_right,#D3CCE3,#E9E4F0)] p-1  pl-2 rounded-[8px]">
                  <p className="text-[14px] text-[#696969]">Language</p>
                  <p className="text-[14px] font-semibold text-[#1C1C1C] font-[600]  truncate">{bookData.language || "N/A"}</p>
                </div>
                <div className="bg-[linear-gradient(to_right,#D3CCE3,#E9E4F0)] p-1 pl-2 rounded-[8px]">
                  <p className="text-[14px] text-[#696969]">ISBN</p>
                  <p className="text-[14px] font-semibold text-[#1C1C1C] font-[600]  truncate">{bookData.isbn || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="border border-[#E6E6E6] rounded-[8px] p-2 pl-3 flex justify-between items-center bg-white">
              <div>
                <p className="text-[14px] text-[#696969]">Total Copies</p>
                <p className="text-[16px] font-bold font-[700] text-[#1C1C1C]">{totalCopies}</p>
              </div>
            <img 
            src={viewgif1} 
            alt="Animation" 
            className="w-13 h-13" 
            
          />
            </div>
            <div className="border border-[#E6E6E6] rounded-[8px] p-2 pl-3 flex justify-between items-center bg-white">
              <div>
                <p className="text-[14px] text-[#696969]">Available Copies</p>
                <p className="text-[16px] font-bold font-[700] text-[#009638]">{availableCopies}</p>
              </div>
           <img 
            src={viewgif2} 
            alt="Animation" 
            className="w-13 h-13" 
            
          />
            </div>
            <div className="border border-[#E6E6E6] rounded-[8px] p-2 pl-3 flex justify-between items-center bg-white">
              <div>
                <p className="text-[14px] text-[#696969]">Issue</p>
                <p className="text-[16px] font-bold font-[700] text-[#007AFF]">{issuedCopies}</p>
              </div>
             <img 
            src={viewgif3} 
            alt="Animation" 
            className="w-13 h-13" 
            
          />
            </div>
            <div className="border border-[#E6E6E6] rounded-[8px] p-2 pl-3 flex justify-between items-center bg-white">
              <div>
                <p className="text-[14px] text-[#696969]">Total Borrows</p>
                <p className="text-[16px] font-bold font-[700] text-[#F97316]">{totalBorrows || (issuedCopies * 9)}</p>
              </div>
            <img 
            src={viewgif4} 
            alt="Animation" 
            className="w-13 h-13" 
            
          />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 pb-3  border-t border-b border-[#E6E6E6]">
            <div>
              <p className="text-[14px] font-normal font-[400] text-[#696969] pl-4">Shelf Code</p>
              <p className="text-[16px] text-[#1C1C1C] font-bold font-[700] mt-0 pl-5">{bookData.shelfLocation || "A-12"}</p>
            </div>
            <div>
              <p className="text-[14px] font-normal font-[400] text-[#696969] pl-4">Price</p>
              <p className="text-[16px] text-[#009638]  font-[700] font-bold mt-0 pl-5">₹{bookData.price || "0"}</p>
            </div>
          </div>

          <div className="border-[#F3F4F6]">
            <p className="text-[14px] font-normal font-[400]  text-[#696969] mb-0 pl-4 -mt-[8px] ">Description</p>
            <p className="text-[14px] text-[#1C1C1C] font-normal pl-4 pt-1  font-[400]  break-words whitespace-normal ">
              {bookData.description || "No description provided for this book catalog entry item."}
            </p>
          </div>
        </div>

        <div className="bg-white border-t border-[#E6E6E6]  flex justify-end select-none gap-3 pt-9 pr-7  pb-5 relative z-0">
          <button 
            type="button" 
            onClick={handleClose}  
            className="h-[38px] min-w-[90px] px-5 border border-[#9C9C9C] text-[14px] font-medium text-[#696969] rounded-[8px]  transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              setIsEditModalOpen(true);
              if (onEditClick) onEditClick();
            }}
            className="h-[38px] min-w-[100px] rounded-[8px] bg-[#0B3142] px-5 text-[16px] font-semibold text-white hover:bg-[#15465c] transition cursor-pointer font-[Segoe UI]"
          >
            Edit Book
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewBookModal;