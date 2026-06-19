import React, { useEffect, useState, useRef } from "react";
import "../../CSS/Style.css";
{
  /* <----------------------------------------------- GIF ----------------------------------------------------> */
}
import Teamwork from "../../assets/images/TeamWork.gif";
import calender from "../../assets/images/calender.gif";
import worker from "../../assets/images/worker.gif";
import teacher from "../../assets/images/teacher.gif";
import { HiSearch, HiOutlineExclamationCircle } from 'react-icons/hi';
{
  /* <----------------------------------------------- IMAGE ----------------------------------------------------> */
}
import backgroundImg1 from "../../assets/images/id-card-bg.png";
import backgroundImg2 from "../../assets/images/id-card-bg-2.png";
import schoollogo from "../../assets/images/school-logo.png";
import iddown1 from "../../assets/images/id-down-bg-1.png";
import iddown2 from "../../assets/images/id-down-bg-2.png";
import idphoto from "../../assets/images/id-photo.png";

{
  /* <---------------------------------------------- icon -----------------------------------------------------> */
}
import { TbFileImport } from "react-icons/tb";
import { GrUserAdd } from "react-icons/gr";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PiArrowsDownUpThin } from "react-icons/pi";
import { FiEdit, FiSearch } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { PiPrinterLight } from "react-icons/pi";
import { FiDownload, FiPrinter } from "react-icons/fi";

/* <----------------------------------------------- img -------------------------------------------------------> */
import everdeen from "../../assets/images/katnis.jpg";
import goku from "../../assets/images/goku.jpg";
import langford from "../../assets/images/langford.jpg";
import homelander from "../../assets/images/homelander.jpg";
import thanos from "../../assets/images/thanos.jpg";
import Joffrey from "../../assets/images/Joffrey.jpg";
import doll from "../../assets/images/bella.jpg";
import prime from "../../assets/images/prime.jpg";
import peter from "../../assets/images/lord.jpg";
import gamora from "../../assets/images/gamora.jpg";
import meave from "../../assets/images/meave.jpg";
import Pagination from "../../components/Pagination";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import api from "../../config/axiosInstance";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const StaffIdCard = () => {
  /* ================= STATES ================= */
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);
  const [previewStaffList, setPreviewStaffList] = useState([]);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  // btn loader
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const roles = [
    "Teacher",
    "Accountant",
    "Receptionist",
    "Librarian",
    "Driver",
    "Cleaner",
  ];

  // ===================
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const [debouncedSerch] = useDebounce(search, 500);
  const navigate = useNavigate();
  const printableRef = useRef(null);

  // get the list of staff from the server using react query
  const {
    data: staffData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-staff", page, limit, debouncedSerch, role],

    queryFn: async () => {
      const res = await api.get("/staff/all-staff", {
        params: {
          page,
          limit,
          search: debouncedSerch,
          role,
        },
      });

      return res.data;
    },
  });
  // console.log(staffData);

  const staffList = staffData?.data || [];
  const pagination = staffData?.pagination || {};

  useEffect(() => {
    setPage(1);
  }, [debouncedSerch, role]);

  /* ================= CHECKBOX HANDLER ================= */
  const handleCheckboxChange = (staffId) => {
    let updatedIds;

    if (selectedStaffIds.includes(staffId)) {
      updatedIds = selectedStaffIds.filter((id) => id !== staffId);
    } else {
      updatedIds = [...selectedStaffIds, staffId];
    }

    setSelectedStaffIds(updatedIds);

    const selectedStaff = staffList.filter((staff) =>
      updatedIds.includes(staff._id),
    );

    setPreviewStaffList(selectedStaff);
  };

  /* ================= EYE CLICK HANDLER ================= */
  const handlePreview = () => {
    if (selectedStaffIds.length === 0) {
      alert("Please select at least one staff");
      return;
    }

    const selectedStaff = staffData.filter((staff) =>
      selectedStaffIds.includes(staff._id),
    );

    setPreviewStaffList(selectedStaff);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = staffList.map((item) => item._id);

      setSelectedStaffIds(allIds);
      setPreviewStaffList(staffList);
    } else {
      setSelectedStaffIds([]);
      setPreviewStaffList([]);
    }
  };

  // color in print
  const fixOklchColors = (element) => {
    const all = element.querySelectorAll("*");

    all.forEach((el) => {
      const style = window.getComputedStyle(el);

      el.style.color = style.color.includes("oklch") ? "#000000" : style.color;
      el.style.backgroundColor = style.backgroundColor.includes("oklch")
        ? "#ffffff"
        : style.backgroundColor;
      el.style.borderColor = style.borderColor.includes("oklch")
        ? "#E6E6E6"
        : style.borderColor;

      el.style.boxShadow = "none";
    });
  };

  const captureCardCanvas = async (card) => {
    const clonedCard = card.cloneNode(true);

    clonedCard.style.position = "fixed";
    clonedCard.style.left = "-9999px";
    clonedCard.style.top = "0";
    clonedCard.style.background = "#ffffff";

    document.body.appendChild(clonedCard);

    fixOklchColors(clonedCard);

    const canvas = await html2canvas(clonedCard, {
      scale: 4,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
      windowWidth: clonedCard.scrollWidth,
      windowHeight: clonedCard.scrollHeight,
    });

    document.body.removeChild(clonedCard);

    return canvas;
  };

  // print card
  const handlePrint = async () => {
    if (!printableRef.current || previewStaffList.length === 0) {
      alert("Please select at least one card to print");
      return;
    }

    try {
      setIsPrinting(true);

      const cardElements =
        printableRef.current.querySelectorAll(".id-card-print");

      const images = [];

      for (const card of cardElements) {
        // const canvas = await html2canvas(card, {
        //   scale: 4,
        //   useCORS: true,
        //   backgroundColor: "#ffffff",
        // });

        const canvas = await captureCardCanvas(card);

        images.push(canvas.toDataURL("image/png"));
      }

      const printWindow = window.open("", "_blank");

      printWindow.document.write(`
    <html>
      <head>
        <title>Staff ID Cards</title>
        <style>
          @page {
  size: A4 portrait;
  margin: 5mm;
}

body {
  margin: 0;
  padding: 0;
  background: white;
}

.print-page {
  display: grid;
  grid-template-columns: repeat(3, 54mm);
  grid-auto-rows: 85.6mm;
  column-gap: 8mm;
  row-gap: 10mm;
  justify-content: center;
  align-items: start;
}

.card-img {
  width: 54mm;
  height: 85.6mm;
  object-fit: fill;
  display: block;
  break-inside: avoid;
  page-break-inside: avoid;
}
  .card-img:nth-child(6n) {
  page-break-after: always;
}
        </style>
      </head>

      <body>
        <div class="print-page">
          ${images
            .map((img) => `<img class="card-img" src="${img}" />`)
            .join("")}
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.close();
            }, 700);
          };
        </script>
      </body>
    </html>
  `);
      printWindow.document.close();
    } catch (error) {
      console.log("Print error", error);
    } finally {
      setIsPrinting(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!printableRef.current || previewStaffList.length === 0) {
      alert("Please select at least one card");
      return;
    }

    try {
      setIsDownloading(true);
      const cardElements =
        printableRef.current.querySelectorAll(".id-card-print");

      const cardWidth = 54;
      const cardHeight = 85.6;

      // SINGLE CARD PDF
      if (cardElements.length === 1) {
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: [cardWidth, cardHeight],
        });

        // const canvas = await html2canvas(cardElements[0], {
        //   scale: 4,
        //   useCORS: true,
        //   allowTaint: false,
        //   backgroundColor: "#ffffff",
        //   scrollX: 0,
        //   scrollY: 0,
        //   windowWidth: cardElements[0].scrollWidth,
        //   windowHeight: cardElements[0].scrollHeight,
        // });

        const canvas = await captureCardCanvas(cardElements[0]);



        const imgData = canvas.toDataURL("image/png");

        pdf.addImage(imgData, "PNG", 0, 0, cardWidth, cardHeight);
        pdf.save(`staff-id-card-${Date.now()}.pdf`);
        return;
      }

      // MULTIPLE CARDS PDF - 6 CARDS PER A4 PAGE
      const pdf = new jsPDF("p", "mm", "a4");

      const marginX = 10;
      const marginY = 10;
      const gapX = 8;
      const gapY = 10;
      // const marginX = 5;
      // const marginY = 5;
      // const gapX = 2;
      // const gapY = 2;

      const cardsPerRow = 3;
      const cardsPerPage = 6;

      for (let i = 0; i < cardElements.length; i++) { 
        const positionOnPage = i % cardsPerPage;

        if (positionOnPage === 0 && i !== 0) {
          pdf.addPage();
        }

        const col = positionOnPage % cardsPerRow;
        const row = Math.floor(positionOnPage / cardsPerRow);

        const x = marginX + col * (cardWidth + gapX);
        const y = marginY + row * (cardHeight + gapY);

        const canvas = await html2canvas(cardElements[i], {
          scale: 4,
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#ffffff",
          scrollX: 0,
          scrollY: 0,
          windowWidth: cardElements[i].scrollWidth,
          windowHeight: cardElements[i].scrollHeight,
        });

        const imgData = canvas.toDataURL("image/png");

        pdf.addImage(imgData, "PNG", x, y, cardWidth, cardHeight);
      }

      pdf.save(`staff-id-cards-${Date.now()}.pdf`);
    } catch (error) {
      console.log("Downlode error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <div className="w-full">
        <div className="box-shadow mt-3 bg-white rounded-md">
          <div className="flex flex-col md:flex-row md:justify-between gap-4 p-4 items-center">
            {/* LEFT CONTENT */}
            <div>
              <p className="flex flex-col">
                <span className="text-[16px] md:text-[18px] text-[#1c1c1c] font-semibold">
                  Staff ID Card Management
                </span>
                <span className="text-sm text-[#696969]">
                  Generate, print, and manage staff ID cards
                </span>
              </p>
            </div>
          </div>

       




    <div className="flex flex-col md:flex-row gap-4 mb-6 px-4">   
              
                <div className="relative flex-1">
                        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#696969] text-[18px]" />
                        <input
                          type="text"
                          placeholder="Search visitors..."
                           value={search}
                              onChange={(e) => {
                  setSearch(e.target.value);
                  // setPage(1);
                }}
                          className="w-full pl-10 pr-4 py-2 bg-[#EEEEEE] border border-[#E8E8E8] rounded-[9px] text-[14px] focus:outline-none"
                        />
                      </div>
          
          
            <div className="relative inline-block">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="bg-[#EFF2F2]  rounded-[9px] px-4 py-2.5 text-[12px] text-[#1C1C1C] min-w-[130px] cursor-pointer flex items-center justify-between"
              >
                <span>{role || "All Roles"}</span>

                <svg
                  className={`w-4 h-4 transition ${
                    showRoleDropdown ? "" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showRoleDropdown && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-[#E8E8E8] rounded-[9px] shadow-lg overflow-hidden">
                  <button
                    onClick={() => {
                      setRole("");
                      setShowRoleDropdown(false);
                    }}
                    className="px-4 py-2 text-[13px] hover:bg-[#F3F4F6] cursor-pointer"
                  >
                    All
                  </button>

                  {roles.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setRole(item);
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F4F6] ${
                        role === item
                          ? " text-[#1C1C1C] font-normal"
                          : ""
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          
            </div>



























          {/* <------------------------------------------ Table ---------------------------------------> */}
          <div
            className={` grid grid-cols-1 gap-6 p-4  ${
              previewStaffList.length > 0
                ? "lg:grid-cols-[53%_45%]"
                : "lg:grid-cols-1"
            }`}
          >
            <div className=" border border-[#e6e6e6] rounded-lg overflow-hidden">
              <table className="w-full table  table-responsive">
                <thead className="border border-[#e6e6e6] border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold w-[70%]">
                      <div className="flex items-center gap-10">
                        <input
                          type="checkbox"
                          checked={
                            staffList.length > 0 &&
                            staffList.every((staff) =>
                              selectedStaffIds.includes(staff._id),
                            )
                          }
                          onChange={handleSelectAll}
                        />

                        <span className="flex  gap-2 items-center">
                          <span className="text-[#9C9C9C]">
                            {/* <PiArrowsDownUpThin /> */}
                          </span>
                          Staff
                        </span>
                      </div>
                    </th>

                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      <div className="flex items-center gap-2">
                        <span>Role</span>
                      </div>
                    </th>

                    <th className="px-4 py-3 text-center text-sm font-semibold">
                      Action
                    </th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {staffList.map((item, index) => (
                    <tr key={index} className="border-b border-[#e6e6e6]">
                      <td className="px-4 py-3 text-left text-sm font-semibold w-[80%] ">
                        <div className="flex gap-10">
                          <input
                            type="checkbox"
                            checked={selectedStaffIds.includes(item._id)}
                            onChange={() => handleCheckboxChange(item._id)}
                          />
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                              src={item?.profilePhoto?.url || idphoto}
                              alt={item?.profilePhoto?.url}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Name + ID */}
                          <div className="flex flex-col leading-tight">
                            <span className="text-[#12516E] font-semibold">
                              {item?.personalInfo?.staffName}
                            </span>
                            <span className="text-sm text-[#9c9c9c] font-semibold">
                              {item?.staffId}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-left text-sm font-semibold">
                        <div className="flex items-center">
                          <span
                            className={`inline-flex px-4 py-1 rounded-md border ${
                              item?.employmentInfo?.role === "Teacher"
                                ? "border-[#007AFF] text-[#007AFF]"
                                : item?.employmentInfo?.role === "Accountant"
                                  ? "border-[#894B00] text-[#894B00]"
                                  : item?.employmentInfo?.role ===
                                      "Receptionist"
                                    ? "border-[#A8038D] text-[#A8038D]"
                                    : item?.employmentInfo?.role === "Librarian"
                                      ? "border-[#4BA803] text-[#4BA803]"
                                      : item?.employmentInfo?.role ===
                                          "Super Admin"
                                        ? "border-[#C1891B] text-[#C1891B]"
                                        : item?.employmentInfo?.role ===
                                            "Driver"
                                          ? "border-[#00ADAD] text-[#00ADAD]"
                                          : item?.employmentInfo?.role ===
                                              "Cleaner"
                                            ? "border-[#EF476F] text-[#EF476F]"
                                            : ""
                            }`}
                          >
                            {item?.employmentInfo?.role || "N/A"}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3    text-sm  font-semibold   ">
                        <div className="flex justify-center gap-3">
                          <IoEyeOutline
                            className="w-5 h-5 text-[#9C9C9C]"
                            onClick={(e) => {
                              e.stopPropagation();

                              setPreviewStaffList([item]);
                            }}
                          />
                          <PiPrinterLight
                            onClick={() => {
                              setPreviewStaffList([item]);
                              setTimeout(() => {
                                handlePrint();
                              }, 700);
                            }}
                            className="w-5 h-5 text-[#9C9C9C] cursor-pointer"
                          />
                        </div>
                      </td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {previewStaffList.length > 0 && (
              <div className="bg-white border border-[#E6E6E6] rounded-xl shadow-sm p-6 max-h-[620px] overflow-y-auto">
                {/* Header */}

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      ID Card Preview
                    </h2>
                    <p className="text-sm text-gray-500">
                      Preview of the student ID card design
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleDownloadPDF}
                      className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {isDownloading ? (
                        "Downloading...."
                      ) : (
                        <>
                          <FiDownload />
                          Download
                        </>
                      )}
                    </button>
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-2 px-4 py-2 rounded-md text-sm text-white bg-[#0B2B3C] hover:bg-[#09304a]"
                    >
                      {isPrinting ? (
                        "Printing..."
                      ) : (
                        <>
                          {" "}
                          <FiPrinter />
                          Print
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Content */}

                {/* Content */}
                <div
                  id="printable-cards"
                  ref={printableRef}
                  className="flex flex-wrap gap-x-6 gap-y-3 pr-2"
                >
                  {previewStaffList.map((staff, index) => (
                    <div
                      key={index}
                      className="id-card-print w-[216px] h-[345px]"
                    >
                      <div className="relative border border-[#E6E6E6] bg-white rounded-xl overflow-hidden shadow-md w-full h-full">
                        {/* Top Header */}
                        <img src={backgroundImg1} alt="" />
                        <img
                          src={backgroundImg2}
                          alt=""
                          className="absolute top-0 left-0  z-10"
                        />
                        <div className="text-white text-center p-4 absolute top-0 left-0 z-10 flex mb-5">
                          <div>
                            <img
                              src={schoollogo}
                              alt=""
                              className="h-9 w-9 overflow-hidden rounded-full mt-1"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">School name</p>
                            <p className="text-[10px] opacity-90 mt-1 ">
                              (Govt. Recognized)
                            </p>
                            <p className="text-[10px] mt-1 leading-tight">
                              Place your address, District
                              <br />
                              state and pin - 000000
                            </p>
                            <img
                              src={staff?.profilePhoto?.url || idphoto}
                              alt="Profile"
                              className="w-20 h-20 mx-auto rounded-md object-cover border-2 mt-2 ml-3 border-[#FFFFFF] "
                            />
                          </div>
                        </div>
                        {/* Body */}
                        <div className="mt-3 text-center">
                          <h3 className="mt-4 text-[#B21119] text-[16px] font-bold">
                            {staff?.personalInfo?.staffName || ""}
                          </h3>
                          <p className="text-[10px] font-semibold text-[#0B3142]">
                            {staff?.staffId}
                          </p>

                          <div className="flex justify-between items-start gap-2 mt-1.5 mb-2 px-6">
                            <div className="flex flex-col text-[8px] text-left text-nowrap">
                              <span>Role</span>
                              <span>Date of Birth</span>
                              <span>Contact No.</span>
                              <span>Department</span>
                              <span>Address</span>
                            </div>
                            <div className="flex flex-col text-[8px] text-left font-semibold w-[105px]">
                              <span>{staff?.employmentInfo?.role || ""}</span>
                              <span>
                                {staff?.employmentInfo?.dateOfJoining}
                              </span>
                              <span>{staff?.contactInfo?.mobileNumber}</span>
                              <span>{staff?.employmentInfo?.department}</span>

                              <span className="leading-tight word-break-words text-[7px] max-h-8">
                                {[
                                  staff?.currentAddress?.addressLine,
                                  staff?.currentAddress?.country,
                                  staff?.currentAddress?.city,
                                  staff?.currentAddress?.state,
                                  staff?.currentAddress?.pinCode,
                                ]
                                  .filter(Boolean)
                                  .join(", ")}
                              </span>
                            </div>
                          </div>

                          <p className="mt-4 text-[6px] font-semibold px-3 text-right text-gray-500">
                            Principal Sign.
                          </p>
                        </div>
                        <img
                          src={iddown1}
                          className="absolute bottom-0 -right-1"
                          alt=""
                        />

                        <img
                          src={iddown2}
                          className="absolute  z-10 bottom-0"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Specifications */}
                <div className="mt-8 h-34 w-auto rounded-lg p-4 border border-[#E6E6E6] bg-[#F9F9F9]">
                  <p className="text-sm font-medium text-[#9C9C9C] mb-2">
                    Card Specifications:
                  </p>
                  <ul className="text-xs text-[#9C9C9C] space-y-1 list-disc pl-5">
                    <li>Size: 85.6mm × 54mm (CR80)</li>
                    <li>Material: PVC with lamination</li>
                    <li>Features: QR Code, Emergency contact</li>
                    <li>Validity: 1 Academic Year</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* <------------------------------------------- pagination ---------------------------------> */}
          <Pagination
            currentPage={page}
            total={pagination?.totalStaff || 0}
            itemsPerPage={limit}
            onPageChange={setPage}
            onItemsPerPageChange={(value) => {
              setLimit(value);
              setPage(1);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StaffIdCard;
