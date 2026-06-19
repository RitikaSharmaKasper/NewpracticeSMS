import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiSearch, HiOutlineExclamationCircle } from 'react-icons/hi';
import visitorData from "../../data/frontdesk.json";

// Using your specific assets
import phoneIcon from "../../assets/images/meeting.png";
import userIcon from "../../assets/images/usericon.png";
import calendarIcon from "../../assets/images/calendar-icon.png";
import sourceIcon from "../../assets/images/purpose.png";
import nodata_foundIcon from "../../assets/images/absence.png";
import ViewEnquiryModal from './Modals/ViewEnquiryModal';

const AdmissionEnquiries = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [enquiries, setEnquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  
  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [selectedEnquiryFollowUps, setSelectedEnquiryFollowUps] = useState([]);

  const statusOptions = ["All Status", "Active", "Inactive", "Converted"];

  useEffect(() => {
    const saved = localStorage.getItem('sms_admission_enquiries');
    const baseData = visitorData.filter(v => 
      v.visitorType === "Parent" || (v.purpose && v.purpose.toLowerCase().includes("admission"))
    );

    let finalData = [];
    if (saved) {
      const localData = JSON.parse(saved);
      finalData = baseData.map(jsonItem => {
        const localItem = localData.find(l => l.id === jsonItem.id);
        if (localItem) {
          return {
            ...jsonItem,
            ...localItem
          };
        }
        return jsonItem;
      });
      const newItems = localData.filter(l => !baseData.find(b => b.id === l.id));
      finalData = [...newItems, ...finalData];

    } else {
      finalData = baseData.map(v => ({
        ...v,
        status: v.id % 4 === 0 ? 'Inactive' : v.status
      }));
    }
    
    localStorage.setItem('sms_admission_enquiries', JSON.stringify(finalData));
    setEnquiries(finalData);
  }, []);

  const handleViewDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    let followUps = [];
    if (enquiry.followUps && enquiry.followUps.length > 0) {
      followUps = enquiry.followUps;
    } else {
      followUps = [{
        date: enquiry.lastFollowUpDate || enquiry.date,
        followUpBy: enquiry.followUpBy || 'Admin',
        empId: enquiry.empId || 'EMP001',
        type: enquiry.type || 'Call',
        response: enquiry.response || 'No follow-up response yet',
        status: enquiry.status || 'Active'
      }];
    }
    setSelectedEnquiryFollowUps(followUps);
    setIsViewModalOpen(true);
  };

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (item.phone && item.phone.includes(searchQuery));
      const matchesStatus = statusFilter === "All Status" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [enquiries, searchQuery, statusFilter]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState(false);

  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);
  const paginatedEnquiries = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEnquiries.slice(start, start + itemsPerPage);
  }, [filteredEnquiries, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md overflow-visible">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-7 px-2">
        <div className="text-left">
          <h1 className="text-[18px] font-semibold text-[#1C1C1C]">Admission Enquiries</h1>
          <p className="text-[14px] sm:text-[16px] text-[#9C9C9C]">Track and manage admission enquiries</p>
        </div>
        <button 
          onClick={() => navigate('/frontdesk/add_admission_enquiry')}
          className="w-full sm:w-auto bg-[#002B36] text-white px-5 py-3 h-10  rounded-[8px] text-[14px] font-semibold flex items-center justify-center gap-3 transition-all hover:bg-[#003d4d]"
        >
          <span className="text-[20px] -mt-[3px] ">+</span> Add Enquiry
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 px-0">
        <div className="relative flex-1">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#696969] text-[18px]" />
          <input
            type="text"
            placeholder="Search enquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#EEEEEE] border border-[#E8E8E8] rounded-[9px] text-[14px] focus:outline-none"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <div onClick={() => setIsStatusOpen(!isStatusOpen)} className="bg-[#EFF2F2]  rounded-[9px] px-4 py-2.5  text-[12px] text-[#1C1C1C] min-w-[130px] cursor-pointer flex items-center justify-between">
              <span>{statusFilter}</span>
              <span className={`text-[8px] transition-transform ${isStatusOpen ? 'rotate-180' : ''}`}>▼</span>
            </div>
            {isStatusOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white border rounded-[9px] shadow-lg overflow-hidden">
                {statusOptions.map((opt) => (
                  <div key={opt} onClick={() => { setStatusFilter(opt); setIsStatusOpen(false); }} className="px-4 py-2 text-[13px] hover:bg-[#F3F4F6] cursor-pointer">{opt}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">

        {paginatedEnquiries.length > 0 ? (
          paginatedEnquiries.map((item) => (
            <div key={item.id} className="border border-[#E6E6E6] rounded-[11px] p-3 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-semibold text-[#0A0A0A] text-[18px]">{item.name}</h3>
                  <span className={`text-[12px] px-2 py-0.5 rounded-[9px] ${
                    item.status === 'Active' ? 'text-[#006045] bg-[#DCFCE7]' : 
                    item.status === 'Converted' ? 'text-[#0055D4] bg-[#E1EFFF]' :
                    'text-[#696969] bg-[#EEEEEE]'
                  }`}>{item.status}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 max-w-3xl mb-3">

                  <div className="flex items-center gap-2 text-[14px] text-[#717182]"><img src={userIcon} className="h-4 w-4" />Parent: <span className="text-[#717182] font-[400] font-normal text-[14px]">{item.personToMeet || "Mr. Suresh Patel"}</span></div>
                  <div className="flex items-center gap-2 text-[14px] text-[#717182]"><img src={phoneIcon} className="h-4 w-4" />+91 <span className="text-[#717182] font-[400] font-normal text-[14px]">{item.phone}</span></div>
                  <div className="flex items-center gap-2 text-[14px] text-[#717182]"><img src={calendarIcon} className="h-4 w-4" />Date: <span className="text-[#717182] font-[400] font-normal text-[14px]">{item.date}</span></div>
                  <div className="flex items-center gap-2 text-[14px] text-[#717182]"><img src={sourceIcon} className="h-4 w-4" />Class: <span className="text-[#717182] font-[400] font-normal text-[14px]">{item.class || "--"}</span></div>
                  <div className="flex items-center gap-2 text-[14px] text-[#717182]"><img src={sourceIcon} className="h-4 w-4" />Source: <span className="text-[#717182] font-[400] font-normal text-[14px]">{item.source || "Walk-in"}</span></div>
                </div>
                {item.nextFollowUp && (
                  <div className="bg-[#FFF9E6] rounded-[8px] px-3 py-1.5 flex items-center gap-2 w-fit border border-[#FDE68A]">
                    <HiOutlineExclamationCircle className="text-[#894B00] text-[16px]" />
                    <span className="text-[#894B00] text-[14px] font-medium">Follow-up: {item.nextFollowUp}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0 w-full md:w-auto">
                <button 
                  onClick={() => handleViewDetails(item)}
                  className={`flex-1 md:w-[120px] py-1.5 border border-[#E6E6E6] rounded-[6px] text-[14px] font-semibold text-[#1C1C1C] hover:bg-gray-50 transition-all ${item.status === 'Inactive' ? 'w-full md:w-[120px]' : ''}`}
                >
                  View
                </button>
                {item.status !== 'Inactive' && (
                  <button 
                    onClick={() => navigate(`/frontdesk/follow_up_admission_enquiry/${item.id}`)}
                    className="flex-1 md:w-[120px] py-1.5 bg-[#002B36] text-white rounded-[6px] text-[14px] font-semibold hover:bg-[#003d4d] transition-all"
                  >
                    Follow Up
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center flex flex-col items-center">
            <img src={nodata_foundIcon} className="w-12 mb-3 opacity-20" />
            <p className="text-gray-400 text-sm">No enquiries found</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-[#9C9C9C] px-2 pt-4 ">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div 
              onClick={() => setIsItemsPerPageOpen(!isItemsPerPageOpen)}
              className="flex items-center gap-2 bg-[#F9F9F9] border border-[#E8E8E8] rounded-[8px] px-3 py-1.5 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
            >
              <span className="text-[#1C1C1C] font-bold text-[14px]">{itemsPerPage}</span>
              <span className={`text-[10px] text-[#696969] transition-transform ${isItemsPerPageOpen ? 'rotate-180' : ''}`}>▼</span>
            </div>
            {isItemsPerPageOpen && (
              <div className="absolute bottom-full mb-2 left-0 w-20 bg-white border border-[#E8E8E8] rounded-[8px] shadow-xl z-50 overflow-hidden">
                {[5, 10, 20, 50].map((val) => (
                  <div key={val} onClick={() => { setItemsPerPage(val); setIsItemsPerPageOpen(false); setCurrentPage(1); }} className="px-4 py-2 text-[13px] text-[#1C1C1C] hover:bg-[#F3F4F6] cursor-pointer text-center font-semibold">{val}</div>
                ))}
              </div>
            )}
          </div>
          <span className="text-[14px] text-[#696969]">Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredEnquiries.length)} of {filteredEnquiries.length} results</span>
        </div>
        <div className="flex items-center gap-4">
          <div onClick={() => handlePageChange(currentPage - 1)} className={`cursor-pointer ${currentPage === 1 ? 'opacity-30' : ''}`}>‹ Previous</div>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <span key={p} onClick={() => handlePageChange(p)} className={`w-7 h-7 flex items-center justify-center rounded-[8px] cursor-pointer ${currentPage === p ? 'bg-[#002B36] text-white' : ''}`}>{p}</span>
            ))}
          </div>
          <div onClick={() => handlePageChange(currentPage + 1)} className={`cursor-pointer ${currentPage === totalPages ? 'opacity-30' : ''}`}>Next ›</div>
        </div>
      </div>

      <ViewEnquiryModal 
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        enquiry={selectedEnquiry}
        followUpList={selectedEnquiryFollowUps}
      />
    </div>
  );
};

export default AdmissionEnquiries;
