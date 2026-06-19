import React, { useRef, useEffect, useState, useMemo } from "react";
import {
  Plus,
  FileText,
  Image as ImageIcon,
  Link,
  Eye,
  Edit3,
  Download,
  Trash2,
  Heart,
  Users,
} from "lucide-react";
import { toast } from 'react-toastify'
import { MdArrowDropDown } from "react-icons/md";
import filterImg from "../../assets/images/filter.png";
import { Study_Matarial } from "../../data/Study_Matarial";
import EditStudyMaterial from "../../page/StudyMaterial/EditStudyMaterial.jsx";
import AddMaterial from "./AddMaterial.jsx";
import DeleteStudyMatarial from "./deleteStudyMatarial.jsx";
import PreviewStudyMaterial from "./PreviewStudyMatarial.jsx";
import nodata_foundIcon from "../../assets/images/absence.png";
import api from "../../config/axiosInstance.js";
import { getTotalFileSize } from "../../utils/CommonFunctions.jsx";

const baseBtn =
  "flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-[6px] border bg-white font-['Segoe_UI'] text-[13px] sm:text-[14px] font-semibold leading-[100%] transition";

const StudyMaterialPage = () => {
  const [filters, setFilters] = useState({
    class: "",
    subject: "",
    type: "",
    sort: "Newest First",
  });
  const [materials, setMaterials] = useState([...Study_Matarial]);

  const classOptions = [...new Set(materials.map((item) => item.class))];
  const subjectOptions = [...new Set(materials.map((item) => item.subject))];
  const typeOptions = [...new Set(materials.map((item) => item.type))];
  const [showAddModal, setShowAddModal] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState(null);

  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);

  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [editMaterial, setEditMaterial] = useState(null);

  const fetchStudyMaterial = async (params) => {
    try {
      const response = await api.get(`/studymaterials?class=${filters.class}&subject=${filters.subject}&type=${filters.type}&sort=${filters.sort}`)
      setMaterials(response.data?.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const fetchWishlist = async () => {
    try {
      const response = await api.get("/studymaterials/wishlist");

      setWishlist(response?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };




  useEffect(() => {
    fetchStudyMaterial();
  }, [filters]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleWishlist = async (materialId) => {
    try {
      const isWishlisted = wishlist.includes(materialId);

      if (isWishlisted) {
        await api.delete(`/studymaterials/wishlist/${materialId}`);

        setWishlist((prev) =>
          prev.filter((id) => id !== materialId)
        );

        toast.success("Removed from wishlist");
      } else {
        await api.post("/studymaterials/wishlist", {
          materialId,
        });

        setWishlist((prev) => [...prev, materialId]);

        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error(error);

      toast.error("Wishlist update failed", error.message);
    }
  };




  const handleDeleteConfirm = async (data) => {
    // if (materialToDelete) {
    //   setMaterials(materials.filter((item) => item.id !== materialToDelete.id));
    //   if (wishlist.includes(materialToDelete.id)) {
    //     setWishlist(wishlist.filter((id) => id !== materialToDelete.id));
    //   }
    //   setShowDelete(false);
    //   setMaterialToDelete(null);
    // }
    try {
      const response = await api.delete(`/studymaterials/${data._id}`)
      if (response) {
        toast.success(response?.data?.message || "material deleted successfully")
      }
    } catch (error) {
      toast.error(error?.message || "delete failed")
    }
    fetchStudyMaterial()
    setShowDelete(false);
    setMaterialToDelete(null);
  };

  const filteredMaterials = useMemo(() => {
    let list = [...materials];

    // if (filters.class && filters.class !== "All") {
    //   list = list.filter((m) => m.class === filters.class);
    // }

    // if (filters.subject && filters.subject !== "All") {
    //   list = list.filter((m) => m.subject === filters.subject);
    // }

    // if (filters.type && filters.type !== "All") {
    //   list = list.filter((m) => m.type === filters.type);
    // }
    // if (filters.sort === "Newest First") {
    //   list.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    // } else {
    //   list.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
    // }

    // if (filters.sort === "Whishlist" || showWishlist) {
    list.sort((a, b) => {
      const aWish = wishlist.includes(a._id);
      const bWish = wishlist.includes(b._id);

      if (aWish === bWish) return 0;
      return aWish ? -1 : 1; // wishlist items go first
    });
    // }

    return list;
  }, [filters, wishlist, showWishlist, materials]);
  return (
    <div className="bg-[#FAFAFA]">
      <div
        className="p-6 bg-[#FFF] font-['Segoe_UI'] mx-auto flex flex-col items-start rounded-2xl w-full"
        style={{
          gap: "36px",
          boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-[18px] font-semibold text-[#1C1C1C]">
              Study Materials
            </h1>
            <p className="text-[14px] sm:text-[16px] text-[#9C9C9C] mt-1">
              Access and manage study materials including documents, images, and
              external resources.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-[#0B3142] text-white rounded-[8px] font-semibold text-[13px] sm:text-[14px] md:text-[15px] leading-[100%] whitespace-nowrap shrink-0 hover:bg-[#082633] transition"
          >
            <Plus size={18} className="sm:w-[18px] sm:h-[18px] " />
            <span className=" font-normal text-[16px] leading-[100%] tracking-[0%] text-white">
              Add Material
            </span>
          </button>
        </div>

        {/* FILTERS */}
        <div className="border p-4 rounded-lg border-gray-300 text-[14px] flex flex-col gap-4 w-full">
          <div className="flex items-center h-4 w-17 gap-2">
            <img src={filterImg} className="w-4 h-3" alt="filter" />
            <h2 className="font-semibold text-[#1C1C1C] text-[16px]">
              Filters
            </h2>
          </div>

          <div className="grid font-normal text-[14px] text=[#0A0A0A]grid-cols-2 md:grid-cols-4 gap-4">
            <FilterDropdown
              label="Class"
              options={["All", ...classOptions]}
              value={filters.class}
              onChange={(val) => setFilters({ ...filters, class: val })}
            />

            <FilterDropdown
              label="Subject"
              options={["All", ...subjectOptions]}
              value={filters.subject}
              onChange={(val) => setFilters({ ...filters, subject: val })}
            />

            <FilterDropdown
              label=" Material Type"
              options={["All", ...typeOptions]}
              value={filters.type}
              onChange={(val) => setFilters({ ...filters, type: val })}
            />

            <FilterDropdown
              label="Sort by"
              options={["Newest First", "Oldest First"]}
              value={filters.sort}
              onChange={(val) => setFilters({ ...filters, sort: val })}
            />
          </div>
        </div>

        {/* LIST */}
        <div className="flex flex-col gap-4 w-full">
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map((item, index) => (
              <MaterialCard
                key={item?._id || item?.id || index}
                item={item}
                wishlist={wishlist}
                handleWishlist={handleWishlist}
                onEdit={() => setEditMaterial(item)}
                onDelete={() => {
                  setMaterialToDelete(item);
                  setShowDelete(true);
                }}
                onPreview={() => setSelectedMaterial(item)}
              />
            ))
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <img
                style={{ width: "5%" }}
                src={nodata_foundIcon}
                alt="nodata"
              />
              <p className="text-center text-gray-400 py-5">
                No materials found
              </p>
            </div>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editMaterial && (
        <EditStudyMaterial
          data={editMaterial}
          onClose={() => setEditMaterial(null)}
          materials={materials}
          setMaterials={setMaterials}
          refreshFuntion={fetchStudyMaterial}
        />
      )}

      {/* DELETE POPUP */}
      {showDelete && (
        <DeleteStudyMatarial
          title="Delete Study Material"
          nameKey="title"
          Cancel={() => setShowDelete(false)}
          onConfirm={handleDeleteConfirm}
          data={materialToDelete}
        />
      )}

      {selectedMaterial && (
        <PreviewStudyMaterial
          data={selectedMaterial}
          materials={filteredMaterials}
          onClose={() => setSelectedMaterial(null)}
          onNavigate={(material) => setSelectedMaterial(material)}
        />
      )}

      {/* ADD MODAL */}
      {showAddModal && (
        <AddMaterial
          onClose={() => setShowAddModal(false)}
          materials={materials}
          setMaterials={setMaterials}
          refreshFuntion={fetchStudyMaterial}
        />
      )}
    </div>
  );
};

const FilterDropdown = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative flex flex-col gap-1">
      <label className="text-sm">{label}</label>

      <div
        onClick={() => setOpen(!open)}
        className="
    flex flex-col justify-center items-start
    h-12 w-full
    pt-4 pb-4 pr-3 pl-6
    gap-[10px]
    rounded-xl
    border border-[#E6E6E6]
    bg-white
    cursor-pointer
  "
      >
        <div className="flex w-full justify-between items-center">
          <span
            className={`font-['Segoe_UI'] text-[14px] leading-[100%] ${value ? "text-[#1C1C1C]" : "text-[#9C9C9C]"
              }`}
          >
            {value || "Select"}
          </span>

          <MdArrowDropDown className="text-gray-500" size={20} />
        </div>
      </div>

      {open && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded shadow z-10">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MaterialCard = ({
  item,
  wishlist,
  handleWishlist,
  onEdit,
  onDelete,
  onPreview,
}) => {
  const icons = {
    Document: <FileText />,
    Image: <ImageIcon />,
    "Link": <Link />,
  };

  const typeStyles = {
    Document: {
      bg: "bg-[#F9FAFB]",
      icon: "text-blue-600",
      badge: "bg-blue-100 text-blue-600",
    },
    Image: {
      bg: "bg-[#F9FAFB]",
      icon: "text-green-600",
      badge: "bg-green-100 text-green-600",
    },
    Link: {
      bg: "bg-[#F9FAFB]",
      icon: "text-purple-600",
      badge: "bg-purple-100 text-purple-600",
    },
  };

  const isWishlisted = wishlist.includes(item._id);

  // const handleDownload = () => {
  //   // Link
  //   if (item.type === "Link") {
  //     if (item.url) {
  //       window.open(item.url, "_blank");
  //     } else {
  //       alert("No link available");
  //     }
  //     return;
  //   }

  //   // Collect all files
  //   let filesToDownload = [];

  //   // OLD SINGLE FILE SUPPORT
  //   if (item.url) {
  //     filesToDownload.push({
  //       url: item.url,
  //       name: item.fileName || item.title || "file",
  //     });
  //   }

  //   // DOCUMENTS ARRAY SUPPORT
  //   if (item.documents && Array.isArray(item.documents)) {
  //     item.documents.forEach((doc, index) => {
  //       filesToDownload.push({
  //         url: doc.url || doc.preview,
  //         name: doc.name || `document-${index + 1}`,
  //       });
  //     });
  //   }

  //   // IMAGES ARRAY SUPPORT
  //   if (item.images && Array.isArray(item.images)) {
  //     item.images.forEach((img, index) => {
  //       filesToDownload.push({
  //         url: img.url || img.preview,
  //         name: img.name || `image-${index + 1}`,
  //       });
  //     });
  //   }

  //   // GENERIC FILES ARRAY SUPPORT
  //   if (item.files && Array.isArray(item.files)) {
  //     item.files.forEach((file, index) => {
  //       filesToDownload.push({
  //         url: file.url || file.preview,
  //         name: file.name || `file-${index + 1}`,
  //       });
  //     });
  //   }

  //   // Remove duplicate files
  //   const uniqueFiles = filesToDownload.filter(
  //     (file, index, self) =>
  //       index === self.findIndex((f) => f.url === file.url)
  //   );

  //   // No files
  //   if (uniqueFiles.length === 0) {
  //     alert("No files available");
  //     return;
  //   }

  //   // Download all files
  //   uniqueFiles.forEach((file) => {
  //     const link = document.createElement("a");
  //     link.href = file.url;
  //     link.download = file.name;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   });
  // };

  const handleDownload = async (files = []) => {
    try {
      for (const file of files) {
        const fileUrl = file?.url;
        const fileName = file?.fileName || "download";

        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error("Failed to fetch file");

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="p-4 rounded-xl border border-[#E6E6E6] bg-white flex gap-4 items-start">
      <div
        className={`w-12 h-12 rounded flex items-center justify-center rounded ${typeStyles[item.type]?.bg}`}
      >
        <div className={typeStyles[item.type]?.icon}>{icons[item?.type]}</div>
      </div>

      <div className="flex-1 gap-4 flex flex-col">
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-[16px] sm:text-[18px] font-semibold leading-[100%] text-[#1C1C1C]">
            {item.title}
          </h3>

          <Heart
            className={`cursor-pointer shrink-0 transition ${isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"
              }`}
            onClick={() => handleWishlist(item._id)}
          />
        </div>

        <p className="font-['Segoe_UI'] text-[14px] sm:text-[16px] font-normal leading-[100%] text-[#9C9C9C] ">
          {item.description}
        </p>

        <div className="flex flex-wrap items-center gap-2 ">
          <Users size={14} className="text-[#696969] shrink-0" />

          <span className="font-['Segoe_UI'] text-[13px] sm:text-[16px] font-normal leading-[100%] text-[#696969] wrap-break-words">
            {`${item.class} • ${item.subject} • ${item.uploadedBy} • ${getTotalFileSize(item?.files) || "kb"}`}
          </span>
        </div>
        <hr className="border-t border-[#E6E6E6]" />

        <div className="flex justify-between mt-3">
          <span className="font-['Segoe_UI'] text-[13px] sm:text-[16px] font-normal leading-[100%] text-[#9C9C9C]">
            {item.uploadDate}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onPreview}
              className={`${baseBtn} border-[#9C9C9C] text-[#696969] hover:bg-gray-50`}
            >
              <Eye size={16} />{" "}
              <span className="hidden sm:inline">Preview</span>
            </button>
            <div></div>
            <button
              onClick={onEdit}
              className={`${baseBtn} border-[#9C9C9C] text-[#696969] hover:bg-gray-50`}
            >
              <Edit3 size={16} />
              <span className="hidden sm:inline">Edit</span>
            </button>

            {/* SHOW DOWNLOAD BUTTON ONLY FOR DOCUMENT & IMAGE */}
            {item.type !== "Link" && (
              <button
                onClick={() => handleDownload(item.files)}
                className={`${baseBtn} border-[#9C9C9C] text-[#696969] hover:bg-gray-50`}
              >
                <Download size={16} />
                <span className="hidden sm:inline">Download</span>
              </button>
            )}

            <button
              onClick={onDelete}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-[6px] border border-[#DC2626] bg-white font-['Segoe_UI'] text-[13px] sm:text-[14px] font-semibold leading-[100%] text-[#DC2626] hover:bg-red-50 transition"
            >
              <Trash2 size={16} />{" "}
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialPage;