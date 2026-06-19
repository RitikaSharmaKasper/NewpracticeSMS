import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import presetBooks from '../../data/books.json';
import sendreminder from "../../assets/images/sendreminder.png";

const STORAGE_KEY = "sms_library_books_v1";

const PendingReturnBook = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("overdue");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setBooks(JSON.parse(saved)); } catch { setBooks(presetBooks); }
    } else {
      setBooks(presetBooks);
    }
  }, []);

  const getAllBorrowers = () => {
    const borrowers = [];
    books.forEach(book => {
      if (book.borrowers && book.borrowers.length > 0) {
        book.borrowers.forEach(borrower => {
          borrowers.push({
            ...borrower,
            bookTitle: book.title,
            bookAuthor: book.author,
            bookCover: book.coverImage,
            bookId: book.id,
            isbn: book.isbn
          });
        });
      }
    });
    return borrowers;
  };

  const getFilteredBorrowers = () => {
    let borrowers = getAllBorrowers();
    if (filterType === "all") {
      borrowers = borrowers.filter(b => b.loanStatus === "Overdue");
    } else if (filterType === "pending") {
      borrowers = borrowers.filter(b => b.loanStatus === "Active");
    } else if (filterType === "overdue") {
      borrowers = borrowers.filter(b => b.loanStatus === "Overdue");
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      borrowers = borrowers.filter(b =>
        b.bookTitle.toLowerCase().includes(term) ||
        b.memberName.toLowerCase().includes(term) ||
        b.memberId.toLowerCase().includes(term)
      );
    }
    return borrowers.sort((a, b) => {
      if (a.loanStatus === "Overdue" && b.loanStatus !== "Overdue") return -1;
      if (a.loanStatus !== "Overdue" && b.loanStatus === "Overdue") return 1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  };

  const filteredData = getFilteredBorrowers();
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, itemsPerPage]);

  const handleSendReminder = (borrower) => {
    alert(`Reminder sent to ${borrower.memberName} for book: ${borrower.bookTitle}`);
  };

  const getStatusBadge = (status, daysOverdue) => (
    <span className="inline-flex items-center justify-center gap-1 px-3 py-1 text-[14px] font-normal text-[#DC2626]">
      {daysOverdue} days
    </span>
  );

  return (
    <div className="pt-1 pl-1 pr-1 pb-1" style={{ fontFamily: 'Segoe UI' }}>
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E8E8] p-3 sm:p-4">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-[18px] font-semibold text-[#1C1C1C] pl-1">Book Issue & Return</h1>
            <p className="text-[14px] sm:text-[16px] text-[#9C9C9C] font-normal -mt-[4px] mb-2 pl-1">
              Issue books to members and track returns
            </p>
          </div>
        </div>

        {/* Table wrapper — forces scroll, never clips */}
        <div
          className="rounded-[12px] border border-[#E6E6E6]"
          style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}
        >
          <table style={{ minWidth: '860px', width: '100%', tableLayout: 'fixed' }} className="text-left">
            <colgroup>
              <col style={{ width: '190px' }} /> {/* Members */}
              <col style={{ width: '220px' }} /> {/* Books */}
              <col style={{ width: '160px' }} /> {/* ISBN */}
              <col style={{ width: '110px' }} /> {/* Due Date */}
              <col style={{ width: '120px' }} /> {/* Days Overdue */}
              <col style={{ width: '160px' }} /> {/* Action */}
            </colgroup>
            <thead className="border-b border-[#E6E6E6]">
              <tr>
                <th className="px-4 py-3 text-[14px] font-semibold text-[#1C1C1C]">Members</th>
                <th className="px-4 py-3 text-[14px] font-semibold text-[#1C1C1C]">Books</th>
                <th className="px-4 py-3 text-[14px] font-semibold text-[#1C1C1C]">ISBN</th>
                <th className="px-4 py-3 text-[14px] font-semibold text-[#1C1C1C]">Due Date</th>
                <th className="px-4 py-3 text-[14px] font-semibold text-[#1C1C1C]">Days Overdue</th>
                <th className="px-4 py-3 text-[14px] font-semibold text-[#1C1C1C] text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map((borrower, idx) => (
                <tr
                  key={`${borrower.memberId}-${borrower.bookId}-${idx}`}
                  className="border-b border-[#E6E6E6] hover:bg-[#F9FAFB] transition-colors"
                >
                  {/* Member */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden shrink-0">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(borrower.memberName)}&background=random`}
                          alt={borrower.memberName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[14px] font-semibold text-[#1C1C1C] leading-tight mb-0.5 truncate">
                          {borrower.memberName}
                        </p>
                        <p className="text-[13px] font-normal text-[#9C9C9C] truncate">
                          Student • {borrower.memberId}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Book */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={borrower.bookCover || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=40&auto=format&fit=crop&q=80"}
                        alt={borrower.bookTitle}
                        className="w-10 h-14 object-cover rounded-[4px] border border-[#E1E1E1] shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-[14px] font-semibold text-[#1C1C1C] truncate">{borrower.bookTitle}</p>
                        <p className="text-[12px] text-[#696969] truncate">{borrower.bookAuthor}</p>
                      </div>
                    </div>
                  </td>

                  {/* ISBN */}
                  <td className="px-4 py-3 text-[14px] text-[#1C1C1C] font-normal">
                    {borrower.isbn}
                  </td>

                  {/* Due Date */}
                  <td className="px-4 py-3">
                    <span className="text-[14px] font-normal text-[#1C1C1C]">
                      {new Date(borrower.dueDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </td>

                  {/* Days Overdue */}
                  <td className="px-4 py-3">
                    {getStatusBadge(borrower.loanStatus, borrower.daysOverdue)}
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleSendReminder(borrower)}
                      className="bg-[#0B3142] hover:bg-[#1a4a5f] text-white px-3 py-1.5 rounded-[6px] text-[13px] font-semibold transition cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <img src={sendreminder} alt="reminder" className="h-3 w-3" />
                      Send Reminder
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-5 py-12 text-center">
                    <p className="text-[16px] text-[#9C9C9C]">No pending or overdue books found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-2 sm:px-5 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setIsItemsPerPageOpen(!isItemsPerPageOpen)}
                className="w-20 px-3 py-1.5 rounded-[6px] bg-[#F5F5F5] border border-[#E0E0E0] text-[14px] text-[#1C1C1C] flex items-center justify-between cursor-pointer"
              >
                {itemsPerPage}
                <span className="text-[10px]">▼</span>
              </button>
              {isItemsPerPageOpen && (
                <div className="absolute bottom-full mb-2 left-0 w-20 bg-white border border-[#E0E0E0] rounded-[8px] shadow-lg z-50 overflow-hidden">
                  {[5, 10, 20, 50].map((val) => (
                    <div
                      key={val}
                      onClick={() => { setItemsPerPage(val); setIsItemsPerPageOpen(false); setCurrentPage(1); }}
                      className="px-3 py-2 text-[13px] text-[#696969] hover:bg-[#F3F4F6] cursor-pointer text-center"
                    >
                      {val}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span className="text-[13px] text-[#696969]">
              Showing {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-[6px] text-[13px] transition ${
                currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#F0F2F2] cursor-pointer'
              }`}
            >
              <MdKeyboardArrowLeft size={18} /> Previous
            </button>

            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) pageNum = i + 1;
                else if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center rounded-[6px] text-[13px] transition cursor-pointer ${
                      currentPage === pageNum ? 'bg-[#0B3142] text-white' : 'text-[#696969] hover:bg-[#F0F2F2]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="w-8 h-8 flex items-center justify-center text-[#696969]">...</span>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="w-8 h-8 flex items-center justify-center rounded-[6px] text-[13px] text-[#696969] hover:bg-[#F0F2F2] cursor-pointer"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-[6px] text-[13px] transition ${
                currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#F0F2F2] cursor-pointer'
              }`}
            >
              Next <MdKeyboardArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PendingReturnBook;