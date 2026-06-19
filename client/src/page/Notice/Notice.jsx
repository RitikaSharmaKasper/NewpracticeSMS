import React, { useState, useEffect } from "react";
import AddNoticeModal from "./AddNoticeModal";
import DeleteNoticeModal from "./DeleteNoticeModal";
import viewMessage from "../../assets/images/viewmessage.png";
import nodata_foundIcon from "../../assets/images/absence.png";
import deleteIcon from "../../assets/images/delete-2.png";
import EditNoticeModal from "./EditNoticeModal";
import api from "../../config/axiosInstance.js";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNoticeToDelete, setSelectedNoticeToDelete] = useState(null);
  const [selectedNoticeToEdit, setSelectedNoticeToEdit] = useState(null);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // Track which notice is currently expanded
  const [loading, setLoading] = useState(true);
  const [expandedNoticeId, setExpandedNoticeId] = useState(null);

  // useEffect(() => {
  //   const saved = localStorage.getItem("sms_notices");
  //   if (saved) {
  //     try {
  //       setNotices(JSON.parse(saved));
  //     } catch (e) {
  //       setNotices(presetNotices);
  //     }
  //   } else {
  //     setNotices(presetNotices);
  //   }
  // }, []);
  // 2. Fetch all Notices from Backend on component mount
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      // Replace URL if your backend router runs on a different port/route prefix
      const response = await api.get("/notices/get_all_notices", { withCredentials: true });
      if (response.data && response.data.success) {
        setNotices(response.data.data);
      } else if (Array.isArray(response.data)) {
        setNotices(response.data);
      }
    } catch (error) {
      console.error("Error fetching notices:", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleAddNoticeSubmit = (newNoticeData) => {
  //   const newNotice = {
  //     ...newNoticeData,
  //     publishOn: new Date().toISOString()
  //   };
  //   const updated = [newNotice, ...notices]; // Add to top
  //   setNotices(updated);
  //   localStorage.setItem("sms_notices", JSON.stringify(updated));
  //   setIsAddModalOpen(false);
  // };

  // const handleDeleteNoticeConfirm = () => {
  //   if (!selectedNoticeToDelete) return;
  //   const updated = notices.filter(
  //     (n) => (n.id || n.title) !== (selectedNoticeToDelete.id || selectedNoticeToDelete.title)
  //   );
  //   setNotices(updated);
  //   localStorage.setItem("sms_notices", JSON.stringify(updated));
  //   setIsDeleteModalOpen(false);
  //   setSelectedNoticeToDelete(null);
  //   if (expandedNoticeId === (selectedNoticeToDelete.id || selectedNoticeToDelete.title)) {
  //     setExpandedNoticeId(null);
  //   }
  // };

  // const toggleNoticeExpand = (id) => {
  //   if (expandedNoticeId === id) {
  //     setExpandedNoticeId(null);
  //   } else {
  //     setExpandedNoticeId(id);
  //   }
  // };
const handleAddNoticeSubmit = async (newNoticeData) => {
  // Validate file type BEFORE sending — backend only accepts png, jpg, jpeg, gif, pdf
  if (newNoticeData.uploadedFile instanceof File) {
    const allowedMimes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "application/pdf"];
    const allowedExts = [".png", ".jpg", ".jpeg", ".gif", ".pdf"];
    const fileExt = "." + newNoticeData.uploadedFile.name.split(".").pop().toLowerCase();
    if (!allowedMimes.includes(newNoticeData.uploadedFile.type) && !allowedExts.includes(fileExt)) {
      alert(`File type "${fileExt}" is not supported. Please upload only PNG, JPG, JPEG, GIF, or PDF files.`);
      return;
    }
  }

  try {
    const formData = new FormData();
    formData.append("title", newNoticeData.title || "");
    formData.append("description", newNoticeData.description || "");
    formData.append("publishDate", newNoticeData.publishDate || "");
    formData.append("publishTime", newNoticeData.publishTime || "");

    if (Array.isArray(newNoticeData.messageFor) && newNoticeData.messageFor.length > 0) {
      newNoticeData.messageFor.forEach((role) => {
        formData.append("messageFor", role);
      });
    } else if (newNoticeData.messageFor) {
      formData.append("messageFor", newNoticeData.messageFor);
    } else {
      formData.append("messageFor", "All");
    }

    if (newNoticeData.uploadedFile instanceof File) {
      formData.append("attachments", newNoticeData.uploadedFile);
    }

    const response = await api.post("/notices/create_notice", formData, {
            headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    });

    if (response.data.success) {
      setNotices((prev) => [response.data.data, ...prev]);
      setIsAddModalOpen(false);
    }
  } catch (error) {
    console.error("Error creating notice:", error.response?.data?.message || error.message);
    alert(error.response?.data?.message || error.response?.data?.error || "Failed to create notice. Please try again.");
  }
};

  // 4. Handle Update Notice (Using FormData pointing to notice ID endpoint)
 const handleEditNoticeSubmit = async (updatedNoticeFields) => {
  try {
    const noticeId = selectedNoticeToEdit._id; 
    const formData = new FormData();
    
    formData.append("title", updatedNoticeFields.title);
    formData.append("description", updatedNoticeFields.description);
    formData.append("publishDate", updatedNoticeFields.publishDate);
    formData.append("publishTime", updatedNoticeFields.publishTime);

    const messageFor = updatedNoticeFields.messageFor || updatedNoticeFields.messageTo;
    if (Array.isArray(messageFor)) {
      messageFor.forEach((role) => {
        formData.append("messageFor", role);
      });
    } else {
      formData.append("messageFor", messageFor || "All");
    }

    if (updatedNoticeFields.uploadedFile instanceof File) {
      formData.append("attachments", updatedNoticeFields.uploadedFile);
    }

    const response = await api.put(`/notices/update_notice/${noticeId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    });

    if (response.data.success) {
      setNotices((prev) =>
        prev.map((n) => (n._id === noticeId ? response.data.data : n))
      );
      setIsEditModalOpen(false);
      setSelectedNoticeToEdit(null);
    }
  } catch (error) {
    console.error("Error updating notice:", error.response?.data?.message || error.message);
    alert(error.response?.data?.message || "Failed to update notice");
  }
};

  // 5. Handle Soft Delete Notice via Backend
  const handleDeleteNoticeConfirm = async () => {
    if (!selectedNoticeToDelete) return;
    try {
      const targetId = selectedNoticeToDelete._id;
      const response = await api.delete(`/notices/delete_notice/${targetId}`, { withCredentials: true });

      if (response.data.success) {
        setNotices((prev) => prev.filter((n) => n._id !== targetId));
        setIsDeleteModalOpen(false);
        setSelectedNoticeToDelete(null);
        if (expandedNoticeId === targetId) {
          setExpandedNoticeId(null);
        }
      }
    } catch (error) {
      console.error("Error deleting notice:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Failed to delete notice");
    }
  };

  const toggleNoticeExpand = (id) => {
    setExpandedNoticeId((prev) => (prev === id ? null : id));
  };


  const formatDateString = (dateStr) => {
    if (!dateStr) return "";
    // Handle YYYY-MM-DD format (from date picker)
    const d = dateStr.includes("T") ? new Date(dateStr) : new Date(dateStr + "T00:00:00");
    if (isNaN(d.getTime())) return dateStr;
    const day = d.getDate();
    const suffix = ["th", "st", "nd", "rd"][
      day % 10 > 3 || Math.floor(day % 100 / 10) === 1 ? 0 : day % 10
    ];
    return `${d.toLocaleDateString("en-US", { month: "short" })} ${day}${suffix}, ${d.getFullYear()}`;
  };

  const formatTimeString = (timeStr) => {
    if (!timeStr) return "";
    // Handle HH:MM format (from time picker)
    if (timeStr.includes(":") && !timeStr.includes("T")) {
      const [h, m] = timeStr.split(":").map(Number);
      const period = h >= 12 ? "PM" : "AM";
      const hour = h % 12 === 0 ? 12 : h % 12;
      return `${hour}:${String(m).padStart(2, "0")}${period}`;
    }
    // Handle ISO date string
    const d = new Date(timeStr);
    if (isNaN(d.getTime())) return timeStr;
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).replace(" ", "");
  };

  const handlePDFDownload = (file) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.fileName || "notice_attachment.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
// const handleEditNoticeSubmit = (updatedNotice) => {
//   const updated = notices.map((n) => {
//     const nId = n.id || n.title;
//     const updatedId = updatedNotice.id || updatedNotice.title;
//     return nId === updatedId ? updatedNotice : n;
//   });
//   setNotices(updated);
//   localStorage.setItem("sms_notices", JSON.stringify(updated));
//   setIsEditModalOpen(false);
//   setSelectedNoticeToEdit(null);
// };
  return (
    <div className="flex flex-col box-shadow bg-white rounded-xl p-4 sm:p-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-7">
        <div>
          <h1 className="text-[18px] font-semibold text-[#1C1C1C] font-[600] mt-[2px]">Notice Board</h1>
          <p className="text-[16px] text-[#9C9C9C] font-[400] font-normal -mt-[5px]">Create and manage school-wide notices</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#0B3142] text-[#FFFFFF] pr-4 pl-5  w-[155px] py-2 rounded-[8px] text-[16px] font-[Segoe UI] font-[600] font-semibold flex items-center gap-2 transition hover:bg-[#2c4b56] cursor-pointer"
        >
          <span className="text-xl leading-none mb-[2px]">+</span> Add Notice
        </button>
      </div>

     <div className="flex flex-col gap-5">
  {loading ? (
    <div className="text-center py-12 text-gray-500 font-medium">
   
    </div>
  ) : notices.length > 0 ? (
    notices.map((notice) => {
      const noticeId = notice._id; 
      const isExpanded = expandedNoticeId === noticeId;
            
            return (
              <div 
                key={noticeId} 
                onClick={() => toggleNoticeExpand(noticeId)}
                className={`bg-white border border-[#E6E6E6] overflow-hidden flex flex-col transition-all duration-300 ${isExpanded ? "rounded-[12px]" : "rounded-[12px]"}`}
              >
                <div className="p-4 flex justify-between items-start pb-6 pl-5">
                  <div className="flex flex-col gap-2 mt-0 pt-0 ">
                    <h3 className="text-[18px] font-semibold font-[600] text-[#1C1C1C] pb-0">
                      {notice.title}
                    </h3>
                    
                    <div className="flex items-center gap-2">
                      <img
                        src={"https://ui-avatars.com/api/?name=" + (notice.creatorName || "Admin")}
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover mt-0"
                      />
                      <div className="flex flex-col">
                        <span className="text-[16px] font-semibold text-[#1C1C1C]">
                         {notice.creatorName || "Admin User"}
                        </span>
                        <span className="text-[12px] text-[#696969] font-[400] font-normal -mt-[1px]">
{`${notice.creatorRole || "Admin"} • `}
                          {formatDateString(notice.publishDate)}
                          {` • ${formatTimeString(notice.publishTime)}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-7">
                    <button 
                      onClick={(e) => {
                      
    e.stopPropagation();
    setSelectedNoticeToEdit(notice);
    setIsEditModalOpen(true);
  }
                      }
                      className="transition cursor-pointer text-[#9C9C9C] hover:text-[#1C1C1C]"
                      title="View Notice"
                    >
                      
                       <img
                          src={viewMessage}
                          alt="viewmessage"
                         
                          className="h-6 w-6 cursor-pointer [image-rendering:-webkit-optimize-contrast]"
                        />
                      {/* <FiExternalLink size={20} strokeWidth={2.5} /> */}
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNoticeToDelete(notice);
                        setIsDeleteModalOpen(true);
                      }}
                      className="transition cursor-pointer"
                      title="Delete Notice"
                    >
                 
                       <img
                          src={deleteIcon}
                          alt="delete"
                         
                          className="h-5.5 w-5.5 cursor-pointer [image-rendering:-webkit-optimize-contrast]"
                        />
                    </button>
                  </div>
                </div>
                
             {isExpanded && (
  <div className="pl-5 pr-6 pb-5 pt-4 text-[#1C1C1C] text-[14px] font-normal mt-1 whitespace-pre-wrap leading-[1.6] bg-[#F9F9F9]  animate-in fade-in duration-200  ">
    {notice.description}


 
                    
                    {notice.attachments && notice.attachments.length > 0 && (
                      <div className="mt-2 pt-2 ">
                        {notice.attachments.map((file, idx) => (
                          <div key={idx} className="flex flex-col">
                            {file.fileType === 'pdf' || file.fileName?.endsWith('.pdf') ? (
                               <div
                                 onClick={() => handlePDFDownload(file)}
                                 className="w-full h-auto p-3  rounded-md flex items-center bg-[#F5F7F7] justify-between border border-[#E6E6E6] cursor-pointer hover:bg-gray-100 transition"
                               >
                                 <div className="flex items-center gap-2">
                                   <div className="w-8 h-8 bg-red-100 rounded-[12px] flex items-center justify-center flex-shrink-0">
                                     <span className=" font-bold text-xs">PDF</span>
                                   </div>
                                   <span className="text-[14px] text-[#1C1C1C] font-medium">{file.fileName}</span>
                                 </div>
                                 <span className=" text-[#1447E6] text-[12px] font-semibold mt-1 mb-2 cursor-pointer hover:underline inline-block">Download</span>
                               </div>
                            ) : (
                              //  <img src={file.url} alt="attachment" className="w-full max-w-[300px]  h-[200px] rounded-[12px] object-cover border border-[#E6E6E6] " />
      <div 
            onClick={async () => {
              try {
                const response = await fetch(file.url);
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = file.fileName || `image-attachment-${idx}.jpg`;
                document.body.appendChild(link);
                link.click();
                
                document.body.removeChild(link);
                URL.revokeObjectURL(blobUrl);
              } catch (error) {
                window.open(file.url, '_blank');
              }
            }}
            className="relative w-full max-w-[300px] h-[200px] rounded-[12px] overflow-hidden border border-[#E6E6E6] cursor-pointer group flex items-center justify-center"
          >
            {/* The Image */}
            <img 
              src={file.url} 
              alt="attachment" 
              className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-75" 
            />
            
            {/* Centered Download Button Overlay */}
            <div className="relative z-10 bg-slate-900/70 backdrop-blur-[4px] text-white text-[13px] font-semibold px-4 py-2 rounded-full shadow-lg opacity-0 transform scale-90 transition duration-300 group-hover:opacity-100 group-hover:scale-100 flex items-center gap-2 select-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download
            </div>
          </div>
                            )}
                          </div>
                        ))}
                      </div>




                    )}
                        

                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[14px] p-12 flex flex-col items-center justify-center gap-[15px] text-center mt-10">
            <h3 className="text-lg font-bold text-[#364153] mb-1">No Notices Listed</h3>
            <img
              className="w-[80px]"
              src={nodata_foundIcon}
              alt="nodata"
            />
            <p className="text-[#6B7280] text-[18px] font-medium">
                Click "Add Notice" above to post a new announcement.
            </p>
          </div>
        )}
      </div>

      <AddNoticeModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSubmit={handleAddNoticeSubmit} 
      />

      <DeleteNoticeModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedNoticeToDelete(null);
        }}
        onConfirm={handleDeleteNoticeConfirm}
        noticeTitle={selectedNoticeToDelete ? selectedNoticeToDelete.title : ""}
      />

      <EditNoticeModal
  isOpen={isEditModalOpen}
  onClose={() => { setIsEditModalOpen(false); setSelectedNoticeToEdit(null); }}
  onSubmit={handleEditNoticeSubmit}
  noticeData={selectedNoticeToEdit}
/>
    </div>
  );
};

export default Notice;
