// import React, { useState, useRef, useEffect } from "react";
// import "../../CSS/Style.css";
// import styled from "styled-components";
// import api from "../../config/axiosInstance";
// import { toast } from "react-toastify";
// {
//   /* <----------------------------------------------- GIF ----------------------------------------------------> */
// }
// import TotalRooms from "../../assets/images/gate.gif";
// import OccupiedRooms from "../../assets/images/OccupiedRooms.gif";
// import AvailableRooms from "../../assets/images/AvailableRooms.gif";
// import TotalCapacity from "../../assets/images/TotalCapacity.gif";

// {
//   /* <---------------------------------------------- icon -----------------------------------------------------> */
// }
// import { TbFileImport } from "react-icons/tb";
// import { FiEdit } from "react-icons/fi";
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { AiOutlinePlus } from "react-icons/ai";
// import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
// import { FiEye } from "react-icons/fi";
// import { IoClose } from "react-icons/io5";
// import { BsArrowDown, BsArrowDownUp, BsDot } from "react-icons/bs";
// import { LuFileInput } from "react-icons/lu";
// import { FaRegEdit } from "react-icons/fa";

// /* <----------------------------------------------- img -------------------------------------------------------> */
// import Pagination from "../../components/Pagination";
// import { Link, useNavigate } from "react-router-dom";
// import profile from "../../assets/images/building.png";
// import udefine_profile from "../../assets/images/nul-profile.svg";
// import PaginationAll from "../../components/PaginationAll";
// import AddRoom from "./AddRoom";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import ViewRoom from "./ViewRoom";
// import DeletePopup from "../../components/DeletePopup";
// import nodata_foundIcon from "../../assets/images/absence.png";

// const cardData = [
//   {
//     des: "Total Rooms",
//     number: "14",
//     text: "Across all buildings",
//     gif: TotalRooms,
//   },
//   {
//     des: "Occupied Rooms",
//     number: "5",
//     text: "Currently in use",
//     gif: OccupiedRooms,
//   },
//   {
//     des: "Available Rooms",
//     number: "8",
//     text: "Ready for use",
//     gif: AvailableRooms,
//   },
//   {
//     des: "Total Capacity",
//     number: "587",
//     text: "Maximum students",
//     gif: TotalCapacity,
//   },
// ];

// /* <--------------------------------------------------- student Dummy Data --------------------------------------------> */

// const rommData = [
//   {
//     roomdetails: "Room 101",
//     roomsize: "600 sq ft",
//     location: "Main Building",
//     floor: "Ground Floor",
//     Type: "Classroom",
//     Capacity: "30",
//     AssignedToclass: "Class 1 A",
//     AssignedToperson: "Sarah Johnson",
//     status: "Active",
//   },
//   {
//     roomdetails: "Room 101",
//     roomsize: "600 sq ft",
//     location: "Main Building",
//     floor: "Ground Floor",
//     Type: "Classroom",
//     Capacity: "30",
//     AssignedToclass: "Class 1 A",
//     AssignedToperson: "Sarah Johnson",
//     status: "Active",
//   },
//   {
//     roomdetails: "Room 101",
//     roomsize: "600 sq ft",
//     location: "Main Building",
//     floor: "Ground Floor",
//     Type: "Classroom",
//     Capacity: "30",
//     AssignedToclass: "Class 1 A",
//     AssignedToperson: "Sarah Johnson",
//     status: "Active",
//   },
//   {
//     roomdetails: "Room 101",
//     roomsize: "600 sq ft",
//     location: "Main Building",
//     floor: "Ground Floor",
//     Type: "Classroom",
//     Capacity: "30",
//     AssignedToclass: "Class 1 A",
//     AssignedToperson: "Sarah Johnson",
//     status: "Active",
//   },
//   {
//     roomdetails: "Room 101",
//     roomsize: "600 sq ft",
//     location: "Main Building",
//     floor: "Ground Floor",
//     Type: "Classroom",
//     Capacity: "30",
//     AssignedToclass: "Class 1 A",
//     AssignedToperson: "Sarah Johnson",
//     status: "Active",
//   },
//   {
//     roomdetails: "Room 101",
//     roomsize: "600 sq ft",
//     location: "Main Building",
//     floor: "Ground Floor",
//     Type: "Classroom",
//     Capacity: "30",
//     AssignedToclass: "Class 1 A",
//     AssignedToperson: "Sarah Johnson",
//     status: "Active",
//   },
//   {
//     roomdetails: "Room 101",
//     roomsize: "600 sq ft",
//     location: "Main Building",
//     floor: "Ground Floor",
//     Type: "Classroom",
//     Capacity: "30",
//     AssignedToclass: "Class 1 A",
//     AssignedToperson: "Sarah Johnson",
//     status: "Active",
//   },
//   {
//     roomdetails: "Room 101",
//     roomsize: "600 sq ft",
//     location: "Main Building",
//     floor: "Ground Floor",
//     Type: "Classroom",
//     Capacity: "30",
//     AssignedToclass: "Class 1 A",
//     AssignedToperson: "Sarah Johnson",
//     status: "Active",
//   },
//   {
//     roomdetails: "Room 101",
//     roomsize: "600 sq ft",
//     location: "Main Building",
//     floor: "Ground Floor",
//     Type: "Classroom",
//     Capacity: "30",
//     AssignedToclass: "Class 1 A",
//     AssignedToperson: "Sarah Johnson",
//     status: "Active",
//   },
//   {
//     roomdetails: "Room 101",
//     roomsize: "600 sq ft",
//     location: "Main Building",
//     floor: "Ground Floor",
//     Type: "Classroom",
//     Capacity: "30",
//     AssignedToclass: "Class 1 A",
//     AssignedToperson: "Sarah Johnson",
//     status: "Inactive",
//   },
// ];

// const Select = styled.select`
//   appearance: none;
//   -webkit-appearance: none;
//   -moz-appearance: none;

//   }

// `;
// const room = [
//   {
//     buildingIcon: profile,
//     room: "Room 101",
//     sqFt: "600 sq ft",
//     loactionmain: "Main Building",
//     locationFloor: "Groudn Floor",
//     type: "Classroom",
//     capacity: "30",
//     assignedTo: "Class 1 A",
//     teacherName: "Sarah Johnson",
//     status: "Active",
//   },
//   {
//     buildingIcon: profile,
//     room: "Room 101",
//     sqFt: "600 sq ft",
//     loactionmain: "Main Building",
//     locationFloor: "Groudn Floor",
//     type: "Lab Room",
//     capacity: "30",
//     assignedTo: "Nursery",
//     teacherName: "Sarah Johnson",
//     status: "Inactive",
//   },
//   {
//     buildingIcon: profile,
//     room: "Room 101",
//     sqFt: "600 sq ft",
//     loactionmain: "Main Building",
//     locationFloor: "Groudn Floor",
//     type: "Lab Room",
//     capacity: "30",
//     assignedTo: "Nursery",
//     teacherName: "Sarah Johnson",
//     status: "Active",
//   },
//   {
//     buildingIcon: profile,
//     room: "Room 101",
//     sqFt: "600 sq ft",
//     loactionmain: "Main Building",
//     locationFloor: "Groudn Floor",
//     type: "Classroom",
//     capacity: "30",
//     assignedTo: "Class 1 A",
//     teacherName: "Sarah Johnson",
//     status: "Active",
//   },
// ];

// const Rooms = () => {
//   const [openAddModel, setopenAddModel] = useState(false);
//   const [openEditModel, setopenEditModel] = useState(false);
//   const [openRoomDetails, setopenRoomDetails] = useState(false);
//   const navigate = useNavigate();
//   const [hoverIndex, setHoverIndex] = useState(null);
//   const [hoverIndexTwo, setHoverIndexTwo] = useState(null);
//   const [addRoomAction, setAddRoomAction] = useState(false);
//   const ref = useRef();
//   const [showAddRoom, setshowAddRoom] = useState(false);
//   const [viewRoom, setViewRoom] = useState(false);
//   const [room, setRoom] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editRoom, setEditRoom] = useState(null);
//   const [showDelete, setShowDelete] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [statusFilter, setStatusFilter] = useState("Status");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [typeFilter, setTypeFilter] = useState("Type");
//   const [typeList, setTypeList] = useState([]);

//   // Pagination Logic
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);

//   // const totalItems = room.length;

//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;

//   // const currentData = room.slice(indexOfFirst, indexOfLast);

//   // Fetch method
//   const fetchRooms = async () => {
//     try {
//       setLoading(true);

//       const res = await api.get("/api/rooms");
//       const data = res.data.data;
//       setRoom(res.data.data); // backend data

//       const uniqueTypes = [...new Set(data.map((item) => item.roomType))];
//       setTypeList(uniqueTypes);
//     } catch (err) {
//       toast.error("Failed to fetch rooms");
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchRooms();
//   }, []);

//   // Delete Data
//   const handleDelete = async () => {
//     try {
//       await api.delete(`/api/rooms/${selectedRoom._id}`);

//       toast.success("Room deleted successfully");

//       setShowDelete(false);
//       setSelectedRoom(null);

//       fetchRooms(); // refresh list
//     } catch (err) {
//       toast.error("Delete failed");
//       console.log(err);
//     }
//   };

//   //  hide button logic
//   useEffect(() => {
//     const handleOutside = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) {
//         setAddRoomAction(false);
//       }
//     };
//     document.addEventListener("mousedown", handleOutside);
//     return () => document.removeEventListener("mousedown", handleOutside);
//   }, []);

//   const handleclickCreateRoomType = () => {
//     navigate("/create-room-type");
//   };
//   const handleclickBulkImport = () => {
//     navigate("/bulk-import-room");
//   };

//   // filter data
//   // const filteredData =
//   //   statusFilter === "Status"
//   //     ? room
//   //     : room.filter((item) => item.status === statusFilter);
//   const filteredData = room
//     .filter((item) =>
//       statusFilter === "Status" ? true : item.status === statusFilter,
//     )
//     .filter((item) =>
//       typeFilter === "Type" ? true : item.roomType === typeFilter,
//     )

//     .filter((item) =>
//       item.roomName.toLowerCase().includes(searchTerm.toLowerCase()),
//     );

//   // pagination on filtered data
//   const currentData = filteredData.slice(indexOfFirst, indexOfLast);

//   // total items should also change
//   const totalItems = filteredData.length;

//   return (
//     <div
//       style={{
//         fontFamily: "Segoe UI",
//         display: "flex",
//         flexDirection: "column",
//         gap: "16px",
//       }}
//     >
//       {/* <--------------------------------------- Card -----------------------------------> */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-3">
//         {cardData.map((item, index) => (
//           <div key={index} className="box-shadow bg-white rounded-2xl p-4">
//             <div className="flex items-center justify-between ">
//               {/* LEFT CONTENT */}
//               <div className="flex flex-col justify-center">
//                 <p className="font-normal text-[16px] text-[#1C1C1C]">
//                   {item.des}
//                 </p>

//                 <span className="font-bold text-[28px] text-[#1c1c1c] mt-5 leading-none">
//                   {item.number}
//                 </span>

//                 <p className="mt-3 flex items-center gap-2 text-[14px] font-semibold ">
//                   <span className="text-[#696969]">{item.text}</span>
//                 </p>
//               </div>

//               {/* RIGHT ICON / GIF */}
//               <div className="flex items-center justify-center w-16 h-16">
//                 <img
//                   src={item.gif}
//                   alt="student"
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Main Section of Table */}
//       <div
//         //  className="box-shadow mt-6 bg-white rounded-md"
//         style={{
//           boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.15)",
//           borderRadius: "16px",
//           padding: "16px",
//           backgroundColor: "white",
//           display: "flex",
//           flexDirection: "column",
//           gap: "24px",
//         }}
//       >
//         {/* Header + Add Button */}
//         <div
//           className="performance-overview-headerfilter-sms"
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             gap: "100px",
//           }}
//         >
//           <div style={{ display: "flex", flexDirection: "column" }}>
//             <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
//               Room Management
//             </label>
//             <label
//               htmlFor=""
//               style={{ color: "#9C9C9C", fontWeight: "400", fontSize: "14px" }}
//             >
//               Manage all school rooms, facilities, and allocations
//             </label>
//           </div>
//           <div ref={ref} style={{ display: "flex", gap: "10px" }}>
//             <button
//               onClick={handleclickBulkImport}
//               // onClick={setAddRoomAction}
//               // onClick={() => setAddRoomAction((prev) => !prev)}
//               className="text-[16px]"
//               style={{
//                 // backgroundColor: "#0B3142",
//                 color: "#9C9C9C",
//                 padding: "12px 24px",
//                 borderRadius: "8px",
//                 height: "40px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 // width: "100%",
//                 gap: "3px",
//                 border: "1px solid #9C9C9C",
//               }}
//             >
//               <LuFileInput /> Bulk Import
//             </button>
//             <button
//               onClick={() => {
//                 setshowAddRoom(true);
//               }}
//               className="text-[16px]"
//               style={{
//                 backgroundColor: "#0B3142",
//                 color: "#FFFFFF",
//                 padding: "12px 24px",
//                 borderRadius: "8px",
//                 height: "40px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 // width: "100%",
//               }}
//             >
//               + Add Room
//             </button>

//             {/* + Add action button */}
//             {/* {addRoomAction && (
//               <div
//                 style={{
//                   boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.15)",
//                   backgroundColor: "white",
//                   borderRadius: "8px",
//                   width: "100%",
//                   // maxWidth: "168px",
//                   height: "100%",
//                   height: "130px",
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "10px",
//                   position: "absolute",
//                   zIndex: "9999",
//                   top: "40px",
//                 }}
//               >
//                 <span
//                   //  onClick={setshowAddRoom}
//                   onClick={() => {
//                     setshowAddRoom(true);
//                     setAddRoomAction(false);
//                   }}
//                   onMouseEnter={() => setHoverIndexTwo(0)}
//                   onMouseLeave={() => setHoverIndexTwo(null)}
//                   style={{
//                     color: "#696969",
//                     backgroundColor:
//                       hoverIndexTwo === 0 ? "#F5F5F5" : "transparent",
//                     fontSize: "16px",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                     fontWeight: "600",
//                     cursor: "pointer",
//                     padding: "6px 24px",
//                   }}
//                 >
//                   + Add Room



//                 </span>
//                 <span
//                   onClick={handleclickCreateRoomType}
//                   onMouseEnter={() => setHoverIndexTwo(1)}
//                   onMouseLeave={() => setHoverIndexTwo(null)}
//                   style={{
//                     color: "#696969",
//                     backgroundColor:
//                       hoverIndexTwo === 1 ? "#F5F5F5" : "transparent",
//                     fontSize: "16px",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                     fontWeight: "600",
//                     cursor: "pointer",
//                     padding: "6px 24px",
//                   }}
//                 >
//                   + Add category
//                 </span>
//                 <span
//                   onClick={handleclickBulkImport}
//                   onMouseEnter={() => setHoverIndexTwo(2)}
//                   onMouseLeave={() => setHoverIndexTwo(null)}
//                   style={{
//                     color: "#696969",
//                     backgroundColor:
//                       hoverIndexTwo === 2 ? "#F5F5F5" : "transparent",
//                     fontSize: "16px",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                     fontWeight: "600",
//                     cursor: "pointer",
//                     padding: "6px 24px",
//                   }}
//                 >
//                   <LuFileInput /> Bulk Import
//                 </span>
//               </div>
//             )} */}
//           </div>
//         </div>

//         {/* <-------------------------------------- search & filter ------------------------------> */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             gap: "100px",
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: "#EEEEEE",
//               borderRadius: "8px",
//               padding: "8px 16px",
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//               width: "100%",
//             }}
//           >
//             <input
//               style={{ border: "none", outline: "none", width: "100%" }}
//               type="search"
//               placeholder="Search here..."
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1); // reset pagination
//               }}
//             />
//           </div>
//           {/* Select filter Button */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",

//               cursor: "pointer",
//               gap: "10px",
//               fontSize: "14px",
//             }}
//           >
//             <div
//               style={{
//                 display: "inline-block",
//                 position: "relative",
//                 backgroundColor: "#EFF2F2",
//                 borderRadius: "6px",
//                 width:"124px"
//               }}
//             >
//               <Select
//                 value={typeFilter}
//                 onChange={(e) => {
//                   setTypeFilter(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 style={{
//                   // maxWidth: "124px",
//                   width:"100%",
//                   outline: "none",
//                   color: "#1C1C1C",
//                   paddingTop: "6px",
//                   paddingBottom: "6px",
//                   paddingLeft: "12px",
//                   paddingRight: "8px",
//                 }}
//               >
//                 <option value="Type" hidden>
//                   Type
//                 </option>
//                 <option value="Type">All</option>
//                 {typeList.map((type, index) => (
//                   <option key={index} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </Select>
//               {/* Custom Icon */}

//               <div
//                 style={{
//                   position: "absolute",
//                   right: "8px",
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   pointerEvents: "none",
//                   color: "#1C1C1C",
//                   fontSize: "8px",
//                   fontWeight: "200",
//                 }}
//               >
//                 ▼
//               </div>
//             </div>
//             <div
//               style={{
//                 display: "inline-block",
//                 position: "relative",
//                 backgroundColor: "#EFF2F2",
//                 borderRadius: "6px",
//                   width:"124px",

//               }}
//             >
//               <Select
//                 value={statusFilter}
//                 onChange={(e) => {
//                   setStatusFilter(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 style={{
//                   width: "100%",
//                   // maxWidth:"124px",
//                   outline: "none",
//                   color: "#1C1C1C",
//                   paddingTop: "6px",
//                   paddingBottom: "6px",
//                   paddingLeft: "12px",
//                   paddingRight: "8px",
//                 }}
//               >
//                 <option value="Status" hidden>
//                   Status
//                 </option>
//                 <option value="Status">All</option>
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </Select>
//               {/* Custom Icon */}

//               <div
//                 style={{
//                   position: "absolute",
//                   right: "8px",
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   pointerEvents: "none",
//                   color: "#1C1C1C",
//                   fontSize: "8px",
//                   fontWeight: "200",
//                 }}
//               >
//                 ▼
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* <------------------------------------------ Table ---------------------------------------> */}

//         <div
//           style={{
//             border: "1px solid #EEEEEE",
//             borderRadius: "8px",
//             width: "100%",
//             overflow: "auto",
//             // maxHeight:"224px"
//           }}
//         >
//           <table style={{ width: "100%" }}>
//             <thead style={{ borderBottom: "1px solid #EEEEEE" }}>
//               <tr style={{ textAlign: "left" }}>
//                 <th
//                   style={{
//                     padding: "10px 15px",
//                     color: "#1C1C1C",

//                     fontWeight: "600",
//                     fontSize: "14px",
//                   }}
//                 >
//                   Room Details
//                 </th>
//                 <th
//                   style={{
//                     padding: "10px 15px",
//                     color: "#1C1C1C",
//                     fontWeight: "600",
//                     fontSize: "14px",
//                   }}
//                 >
//                   Location
//                 </th>
//                 <th
//                   style={{
//                     padding: "10px 15px",
//                     color: "#1C1C1C",
//                     fontWeight: "600",
//                     fontSize: "14px",
//                   }}
//                 >
//                   Type
//                 </th>
//                 <th
//                   style={{
//                     padding: "10px 15px",
//                     color: "#1C1C1C",
//                     fontWeight: "600",
//                     fontSize: "14px",
//                   }}
//                 >
//                   Capacity
//                 </th>
//                 <th
//                   style={{
//                     padding: "10px 15px",
//                     color: "#1C1C1C",
//                     fontWeight: "600",
//                     fontSize: "14px",
//                   }}
//                 >
//                   Assigned To
//                 </th>
//                 <th
//                   style={{
//                     padding: "10px 15px",
//                     color: "#1C1C1C",
//                     fontWeight: "600",
//                     fontSize: "14px",
//                   }}
//                 >
//                   Status
//                 </th>
//                 <th
//                   style={{
//                     padding: "10px 15px",
//                     color: "#1C1C1C",
//                     fontWeight: "600",
//                     fontSize: "14px",
//                   }}
//                 >
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentData.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="7"
//                     style={{
//                       textAlign: "center",
//                       padding: "20px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         gap: "10px",
//                       }}
//                     >
//                       <img
//                         style={{ width: "5%" }}
//                         src={nodata_foundIcon}
//                         alt="nodata"
//                       />
//                       <span style={{ color: "#9C9C9C", fontWeight: "500" }}>
//                         No rooms found
//                       </span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 currentData.map((item, key) => (
//                   <tr
//                     key={key}
//                     onMouseEnter={() => setHoverIndex(key)}
//                     onMouseLeave={() => setHoverIndex(null)}
//                     style={{
//                       textAlign: "left",
//                       borderBottom: "1px solid #EEEEEE",
//                       fontSize: "14px",
//                       backgroundColor:
//                         hoverIndex === key ? "#F5F7F9" : "transparent",
//                     }}
//                   >
//                     <td
//                       style={{
//                         padding: "4px 15px",
//                         textAlign: "left",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "5px",
//                       }}
//                     >
//                       <span
//                         style={{
//                           backgroundColor: "#f6f9fb",
//                           borderRadius: "50%",
//                           height: "40px",
//                           width: "40px",
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                         }}
//                       >
//                         <img src={profile} alt="buildingIcon" />
//                       </span>
//                       <span
//                         style={{ display: "flex", flexDirection: "column" }}
//                       >
//                         <span style={{ color: "#12516E", fontWeight: "600" }}>
//                           {item.roomName}
//                         </span>
//                         <span style={{ color: "#9C9C9C" }}>{item.area}</span>
//                       </span>
//                     </td>
//                     <td
//                       style={{
//                         padding: "4px 15px",
//                         fontWeight: "400",
//                       }}
//                     >
//                       <span
//                         style={{ display: "flex", flexDirection: "column" }}
//                       >
//                         <span style={{ color: "#1C1C1C", fontWeight: "600" }}>
//                           {item.location}
//                         </span>
//                         <span style={{ color: "#9C9C9C" }}>{item.floor}</span>
//                       </span>
//                     </td>
//                     <td
//                       style={{
//                         padding: "4px 15px",
//                         fontWeight: "400",

//                       }}
//                     >
//                       <span
//                         style={{
//                           border: "1px solid #696969",
//                           color: "#696969",
//                           padding: "4px 8px",
//                           borderRadius: "6px",
//                         }}
//                       >
//                         {item.roomType}
//                       </span>
//                     </td>
//                     <td
//                       style={{
//                         padding: "4px 15px",
//                         fontWeight: "400",
//                       }}
//                     >
//                       <span>{item.capacity}</span>
//                     </td>
//                     <td
//                       style={{
//                         padding: "4px 15px",
//                         fontWeight: "400",
//                       }}
//                     >
//                       <span
//                         style={{ display: "flex", flexDirection: "column" }}
//                       >
//                         <span style={{ color: "#1C1C1C", fontWeight: "600" }}>
//                           N/A
//                         </span>
//                         <span style={{ color: "#9C9C9C" }}>N/A</span>
//                       </span>
//                     </td>
//                     <td
//                       style={{
//                         padding: "4px 15px",
//                         fontWeight: "400",
//                       }}
//                     >
//                       <span
//                         style={{
//                           // background: "#E6F4EA",
//                           // color: "#1E8E3E",
//                           background:
//                             item.status === "Active" ? "#E6F4EA" : "#EEEEEE",
//                           color:
//                             item.status === "Active" ? "#1E8E3E" : "#9C9C9C",
//                           padding: "2px 5px",
//                           borderRadius: "6px",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "5px",
//                           justifyContent: "center",
//                           maxWidth: "100px",
//                         }}
//                       >
//                         <span
//                           style={{
//                             width: "6px",
//                             height: "6px",
//                             // background: "#1E8E3E",
//                             background:
//                               item.status === "Active" ? "#1E8E3E" : "#9C9C9C",
//                             borderRadius: "50%",
//                           }}
//                         ></span>
//                         {item.status}
//                       </span>
//                     </td>
//                     <td
//                       style={{
//                         padding: "10px 20px 10px 20px",
//                         color: "#1C1C1C",

//                         fontWeight: "400",
//                         fontSize: "14px",
//                       }}
//                     >
//                       <span
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "12px",
//                         }}
//                       >
//                         <MdOutlineRemoveRedEye
//                           // onClick={setViewRoom}
//                           onClick={() => setViewRoom(item)}
//                           style={{ color: "#9C9C9C", fontSize: "20px" }}
//                         />
//                         <FaRegEdit
//                           // onClick={() => setEditRoomType(true)}
//                           onClick={() => {
//                             setEditRoom(item);
//                             setshowAddRoom(true);
//                           }}
//                           style={{ color: "#9C9C9C", fontSize: "20px" }}
//                         />{" "}
//                         <RiDeleteBin5Line
//                           onClick={() => {
//                             setSelectedRoom(item); // ✅ store clicked room
//                             setShowDelete(true);
//                           }}
//                           style={{ color: "#FF4B4B", fontSize: "20px" }}
//                         />
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* <------------------------------------------- pagination ---------------------------------> */}
//         <PaginationAll
//           totalItems={totalItems}
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//           itemsPerPage={itemsPerPage}
//           setItemsPerPage={setItemsPerPage}
//         />
//       </div>

//       {/* add room */}
//       {showAddRoom && (
//         <AddRoom
//           // onClose={() => setshowAddRoom(false)}
//           onClose={() => {
//             setshowAddRoom(false);
//             setEditRoom(null);
//             fetchRooms(); // ✅ refresh data
//           }}
//           editData={editRoom}
//         />
//       )}
//       {/* view all room */}
//       {viewRoom && (
//         <ViewRoom
//           onClose={() => setViewRoom(null)}
//           data={viewRoom}
//           // onClose={() => setViewRoom(false)}
//           onEdit={(room) => {
//             setViewRoom(null);
//             setEditRoom(room);
//             setshowAddRoom(true);
//           }}
//         />
//       )}

//       {/* Delete Popup */}
//       {showDelete && (
//         <DeletePopup
//           Cancel={() => setShowDelete(false)}
//           onConfirm={handleDelete}
//           data={selectedRoom}
//         />
//       )}
//     </div>
//   );
// };

// export default Rooms;

import React, { useState, useRef, useEffect } from "react";
import "../../CSS/Style.css";
import styled from "styled-components";
import api from "../../config/axiosInstance";
import { toast } from "react-toastify";

import { HiSearch, HiOutlineExclamationCircle } from 'react-icons/hi';
{
  /* <----------------------------------------------- GIF ----------------------------------------------------> */
}
import TotalRooms from "../../assets/images/gate.gif";
import OccupiedRooms from "../../assets/images/OccupiedRooms.gif";
import AvailableRooms from "../../assets/images/AvailableRooms.gif";
import TotalCapacity from "../../assets/images/TotalCapacity.gif";

{
  /* <---------------------------------------------- icon -----------------------------------------------------> */
}
import { TbFileImport } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FiEye } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { BsArrowDown, BsArrowDownUp, BsDot } from "react-icons/bs";
import { LuFileInput } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import viewMessage from "../../assets/images/viewmessage.png";

import deleteIcon from "../../assets/images/delete-2.png";
/* <----------------------------------------------- img -------------------------------------------------------> */
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import profile from "../../assets/images/building.png";
import udefine_profile from "../../assets/images/nul-profile.svg";
import PaginationAll from "../../components/PaginationAll";
import AddRoom from "./AddRoom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import ViewRoom from "./ViewRoom";
import DeletePopup from "../../components/DeletePopup";
import nodata_foundIcon from "../../assets/images/absence.png";
// React Query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "../../CSS/Room.css"

const cardData = [
  {
    des: "Total Rooms",
    number: "14",
    text: "Across all buildings",
    gif: TotalRooms,
  },
  {
    des: "Occupied Rooms",
    number: "5",
    text: "Currently in use",
    gif: OccupiedRooms,
  },
  {
    des: "Available Rooms",
    number: "8",
    text: "Ready for use",
    gif: AvailableRooms,
  },
  {
    des: "Total Capacity",
    number: "587",
    text: "Maximum students",
    gif: TotalCapacity,
  },
];

/* <--------------------------------------------------- student Dummy Data --------------------------------------------> */

const Select = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  }
 
`;

const Rooms = () => {
  const [openAddModel, setopenAddModel] = useState(false);
  const [openEditModel, setopenEditModel] = useState(false);
  const [openRoomDetails, setopenRoomDetails] = useState(false);
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoverIndexTwo, setHoverIndexTwo] = useState(null);
  const [addRoomAction, setAddRoomAction] = useState(false);
  const ref = useRef();
  const [showAddRoom, setshowAddRoom] = useState(false);
  const [viewRoom, setViewRoom] = useState(false);
  // const [room, setRoom] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [statusFilter, setStatusFilter] = useState("Status");
  const [searchTerm, setSearchTerm] = useState("");
  
const [showTypeDropdown, setShowTypeDropdown] = useState(false);
const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


const [typeFilter, setTypeFilter] = useState("Type");


  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  // const currentData = room.slice(indexOfFirst, indexOfLast);

  // Fetch method
  // const fetchRooms = async () => {
  //   try {
  //     setLoading(true);

  //     const res = await api.get("/api/rooms");
  //     const data = res.data.data;
  //     setRoom(res.data.data); // backend data

  //     const uniqueTypes = [...new Set(data.map((item) => item.roomType))];
  //     setTypeList(uniqueTypes);
  //   } catch (err) {
  //     toast.error("Failed to fetch rooms");
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchRooms();
  // }, []);
  // UseQuery Method  for fetch
  const queryClient = useQueryClient();

  const { data: room = [], isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const res = await api.get("/rooms");
      return res.data.data;
    },
    onError: () => {
      toast.error("Failed to fetch rooms");
    },
  });
  //useQuery
  const typeList = [...new Set(room.map((item) => item.roomType))];

  // Delete Data
  // const handleDelete = async () => {
  //   try {
  //     await api.delete(`/api/rooms/${selectedRoom._id}`);

  //     toast.success("Room deleted successfully");

  //     setShowDelete(false);
  //     setSelectedRoom(null);

  //     fetchRooms(); // refresh list
  //   } catch (err) {
  //     toast.error("Delete failed");
  //     console.log(err);
  //   }
  // };
  //useQuery delete data
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await api.delete(`/rooms/${id}`);
    },
    onSuccess: () => {
      toast.success("Room deleted successfully");

      queryClient.invalidateQueries(["rooms"]); // 🔥 auto refetch
      setShowDelete(false);
      setSelectedRoom(null);
    },
    onError: () => {
      toast.error("Delete failed");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(selectedRoom._id);
  };

  //  hide button logic
  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setAddRoomAction(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleclickCreateRoomType = () => {
    navigate("/create-room-type");
  };
  const handleclickBulkImport = () => {
    navigate("/bulk-import-room");
  };

  // filter data
  // const filteredData =
  //   statusFilter === "Status"
  //     ? room
  //     : room.filter((item) => item.status === statusFilter);
  const  filteredData=room.filter((item)=>
    statusFilter==="Status" ? true :item.status===statusFilter
  )
  .filter((item)=>
  typeFilter==="Type"? true :item.roomType===typeFilter)
  .filter ((item)=>{
    if(!searchTerm) return true;

const searchLower=searchTerm.toLowerCase();

return(
  (item.roomName && item.roomName.toLowerCase().includes(searchLower)) ||
      (item.location && item.location.toLowerCase().includes(searchLower)) ||
      (item.roomType && item.roomType.toLowerCase().includes(searchLower)) ||

      (item.capacity && item.capacity.toString().includes(searchLower))
);




  });

  // pagination on filtered data
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);
  // total items should also change
  const totalItems = filteredData.length;

  return (
    <div
      style={{
        fontFamily: "Segoe UI",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* <--------------------------------------- Card -----------------------------------> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-3">
        {cardData.map((item, index) => (
          <div key={index} className="box-shadow bg-white rounded-2xl p-4">
            <div className="flex items-center justify-between ">
              {/* LEFT CONTENT */}
              <div className="flex flex-col justify-center">
                <p className="font-normal text-[12px] md:text-[14px] lg:text-[16px] text-[#1C1C1C]">
                  {item.des}
                </p>

                <span className="font-bold text-[20px] md:text-[24px] lg:text-[28px] text-[#1c1c1c] mt-5 leading-none">
                  {item.number}
                </span>

                <p className="mt-3 flex items-center gap-2 text-[10px] md:text-[12px] lg:text-[14px] font-semibold ">
                  <span className="text-[#696969]">{item.text}</span>
                </p>
              </div>

              {/* RIGHT ICON / GIF */}
              <div className="flex items-center justify-center w-16 h-16">
                <img
                  src={item.gif}
                  alt="student"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Section of Table */}
      <div
        //  className="box-shadow mt-6 bg-white rounded-md"
        style={{
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.15)",
          borderRadius: "16px",
          padding: "16px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          
        }}
      >
        {/* Header + Add Button */}
        <div
          className="performance-overview-headerfilter-sms"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "100px",
           
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="text-[14px] md:text-[16px] lg:text-[18px]" style={{ color: "#1C1C1C", fontWeight: "600" }}>
              Room Management
            </label>
            <label
              className="text-[12px] md:text-[14px] lg:text-[16px]"
              style={{ color: "#9C9C9C", fontWeight: "400", fontSize: "14px" }}
            >
              Manage all school rooms, facilities, and allocations
            </label>
          </div>
          <div ref={ref} style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleclickBulkImport}
              // onClick={setAddRoomAction}
              // onClick={() => setAddRoomAction((prev) => !prev)}
              className="text-[12px] md:text-[14px] lg:text-[16px]"
              style={{
                // backgroundColor: "#0B3142",
                color: "#9C9C9C",
                padding: "12px 24px",
                borderRadius: "8px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // width: "100%",
                gap: "3px",
                border: "1px solid #9C9C9C",
              }}
            >
              <LuFileInput /> Bulk Import
            </button>
            <button
              onClick={() => {
                setshowAddRoom(true);
              }}
               className="text-[12px] md:text-[14px] lg:text-[16px]"
              style={{
                backgroundColor: "#0B3142",
                color: "#FFFFFF",
                padding: "12px 24px",
                borderRadius: "8px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap:"4px"
                // width: "100%",
              }}
            >
              <AiOutlinePlus className="text-white " />  Add Room
            </button>

    
          </div>
        </div>

    




            <div className="flex flex-col md:flex-row gap-4 mb-6 px-0">   
              
                <div className="relative flex-1">
                        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#696969] text-[18px]" />
                        <input
      type="text"
      placeholder="Search by room name, location, type..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
      }}
                          className="w-full pl-10 pr-4 py-2 bg-[#EEEEEE] border border-[#E8E8E8] rounded-[9px] text-[14px] focus:outline-none"
                        />
</div>







<div className="text-[10px] md:text-[12px] lg:text-[14px]" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  
  {/* TYPE DROPDOWN */}
 <div className="relative inline-block" style={{ width: "124px" }}>
  <button
    onClick={() => setShowTypeDropdown(!showTypeDropdown)}
    className="bg-[#EFF2F2] rounded-[9px] px-4 py-2.5 text-[12px] text-[#1C1C1C] w-full cursor-pointer flex items-center justify-between hover:bg-[#E5E7E8] transition-colors"
  >
    <span>{typeFilter === "Type" ? "Type" : typeFilter || "Type"}</span>
    <svg
      className={`w-3.5 h-3.5 transition-transform duration-200 ${showTypeDropdown ? "" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {showTypeDropdown && (
    <div className="absolute z-50 w-full mt-1.5 bg-white border border-[#E6E6E6] rounded-[9px] shadow-lg overflow-hidden">
      <button
        onClick={() => {
          setTypeFilter("Type");
          setShowTypeDropdown(false);
          setCurrentPage(1);
        }}
        className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-[#F5F7F7] transition-colors"
      >
        All
      </button>
      {typeList.map((type) => (
        <button
          key={type}
          onClick={() => {
            setTypeFilter(type);
            setShowTypeDropdown(false);
            setCurrentPage(1);
          }}
          className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-[#F5F7F7] transition-colors ${
            typeFilter === type ? "bg-[#F5F7F7] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  )}
</div>

  {/* STATUS DROPDOWN */}
 
{/* STATUS DROPDOWN */}
<div className="relative inline-block" style={{ width: "124px" }}>
  <button
    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
    className="bg-[#EFF2F2] rounded-[9px] px-4 py-2.5 text-[12px] text-[#1C1C1C] w-full cursor-pointer flex items-center justify-between hover:bg-[#E5E7E8] transition-colors"
  >
    <span>{statusFilter === "Status" ? "Status" : statusFilter || "Status"}</span>
    <svg
      className={`w-3.5 h-3.5 transition-transform duration-200 ${showStatusDropdown ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {showStatusDropdown && (
    <div className="absolute z-50 w-full mt-1.5 bg-white border border-[#E6E6E6] rounded-[9px] shadow-lg overflow-hidden">
      <button
        onClick={() => {
          setStatusFilter("Status");
          setShowStatusDropdown(false);
          setCurrentPage(1);
        }}
        className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-[#F5F7F7] transition-colors"
      >
        All
      </button>
      <button
        onClick={() => {
          setStatusFilter("Active");
          setShowStatusDropdown(false);
          setCurrentPage(1);
        }}
        className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-[#F5F7F7] transition-colors ${
          statusFilter === "Active" ? "bg-[#F5F7F7] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
        }`}
      >
        Active
      </button>
      <button
        onClick={() => {
          setStatusFilter("Inactive");
          setShowStatusDropdown(false);
          setCurrentPage(1);
        }}
        className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-[#F5F7F7] transition-colors ${
          statusFilter === "Inactive" ? "bg-[#F5F7F7] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
        }`}
      >
        Inactive
      </button>
    </div>
  )}
</div>


 
</div>



</div>



        

        {/* <------------------------------------------ Table ---------------------------------------> */}

        <div
          style={{
            border: "1px solid #EEEEEE",
            borderRadius: "8px",
            width: "100%",
            overflow: "auto",
            // maxHeight:"224px"
          }}
        >
          <table style={{ width: "100%" }}>
            <thead className="text-[10px] md:text-[12px] lg:text-[14px]" style={{ borderBottom: "1px solid #EEEEEE" }}>
              <tr style={{ textAlign: "left" }}>
                <th
                  
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",

                    fontWeight: "600",
                  
                  }}
                >
                  Room Details
                </th>
                <th
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",
                    fontWeight: "600",
                    
                  }}
                >
                  Location
                </th>
                <th
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",
                    fontWeight: "600",
                 
                  }}
                >
                  Type
                </th>
                <th
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",
                    fontWeight: "600",
                
                  }}
                >
                  Capacity
                </th>
                <th
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",
                    fontWeight: "600",
                  
                  }}
                >
                  Assigned To
                </th>
                <th
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",
                    fontWeight: "600",
                   
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: "10px 15px",
                    color: "#1C1C1C",
                    fontWeight: "600",
                    
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr> 
                  <td
                  className="text-[10px] md:text-[12px] lg:text-[14px]"
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      
                    }}
                  >
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
                      <span style={{ color: "#9C9C9C", fontWeight: "500" }}>
                        No rooms found
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                currentData.map((item, key) => (
                  <tr
                  
                    key={key}
                    onMouseEnter={() => setHoverIndex(key)}
                    onMouseLeave={() => setHoverIndex(null)}
                    style={{
                      textAlign: "left",
                      borderBottom: "1px solid #EEEEEE",
                      fontSize: "14px",
                      backgroundColor:
                        hoverIndex === key ? "#F5F7F9" : "transparent",
                    }}
                  >
                    <td
                    className="text-[10px] md:text-[12px] lg:text-[14px]"
                      style={{
                        padding: "4px 15px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: "#f6f9fb",
                          borderRadius: "50%",
                          height: "40px",
                          width: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img src={profile} alt="buildingIcon" />
                      </span>
                      <span
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span style={{ color: "#12516E", fontWeight: "600" }}>
                          {item.roomName}
                        </span>
                        <span style={{ color: "#9C9C9C" }}>{item.area}</span>
                      </span>
                    </td>
                    <td
                     className="text-[10px] md:text-[12px] lg:text-[14px]"
                      style={{
                        padding: "4px 15px",
                        fontWeight: "400",
                      }}
                    >
                      <span
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span style={{ color: "#1C1C1C", fontWeight: "600" }}>
                          {item.location}
                        </span>
                        <span style={{ color: "#9C9C9C" }}>{item.floor}</span>
                      </span>
                    </td>
                    <td
                     className="text-[10px] md:text-[12px] lg:text-[14px]"
                      style={{
                        padding: "4px 15px",
                        fontWeight: "400",
                      }}
                    >
                      <span
                       className="room-type-table"
                        style={{
                          border: "1px solid #696969",
                          color: "#696969",
                          padding: "4px 8px",
                          borderRadius: "6px",
                           
                        }}
                      >
                        {item.roomType}
                      </span>
                    </td>
                    <td
                    className="text-[10px] md:text-[12px] lg:text-[14px]"
                      style={{
                        padding: "4px 15px",
                        fontWeight: "400",
                      }}
                    >
                      <span>{item.capacity}</span>
                    </td>
                    <td
                     className="text-[10px] md:text-[12px] lg:text-[14px]"
                      style={{
                        padding: "4px 15px",
                        fontWeight: "400",
                      }}
                    >
                      <span
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span style={{ color: "#1C1C1C", fontWeight: "600" }}>
                          N/A
                        </span>
                        <span style={{ color: "#9C9C9C" }}>N/A</span>
                      </span>
                    </td>
                    <td
                    className="text-[10px] md:text-[12px] lg:text-[14px]"
                      style={{
                        padding: "4px 15px",
                        fontWeight: "400",
                      }}
                    >
                      <span
                        style={{
                          // background: "#E6F4EA",
                          // color: "#1E8E3E",
                          background:
                            item.status === "Active" ? "#E6F4EA" : "#EEEEEE",
                          color:
                            item.status === "Active" ? "#1E8E3E" : "#9C9C9C",
                          padding: "2px 5px",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          justifyContent: "center",
                          maxWidth: "100px",
                        }}
                      >
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            // background: "#1E8E3E",
                            background:
                              item.status === "Active" ? "#1E8E3E" : "#9C9C9C",
                            borderRadius: "50%",
                          }}
                        ></span>
                        {item.status}
                      </span>
                    </td>
                    <td
                     className="text-[10px] md:text-[12px] lg:text-[14px]"
                      style={{
                        padding: "10px 20px 10px 20px",
                        color: "#1C1C1C",

                        fontWeight: "400",
                        
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <MdOutlineRemoveRedEye
                          // onClick={setViewRoom}
                          onClick={() => setViewRoom(item)}
                          style={{ color: "#9C9C9C", fontSize: "20px" }}
                        />
                        

    <button 
                       onClick={() => {
                            setEditRoom(item);
                            setshowAddRoom(true);
                          }}
                      
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
                                              onClick={() => {
                            setSelectedRoom(item); // ✅ store clicked room
                            setShowDelete(true);
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
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* <------------------------------------------- pagination ---------------------------------> */}
        <PaginationAll
          
          totalItems={totalItems}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>

      {/* add room */}
      {showAddRoom && (
        <AddRoom
          // onClose={() => setshowAddRoom(false)}
          onClose={() => {
            setshowAddRoom(false);
            setEditRoom(null);
            // fetchRooms(); // ✅ refresh data
            queryClient.invalidateQueries(["rooms"]);
          }}
          editData={editRoom}
        />
      )}
      {/* view all room */}
      {viewRoom && (
        <ViewRoom
          onClose={() => setViewRoom(null)}
          data={viewRoom}
          // onClose={() => setViewRoom(false)}
          onEdit={(room) => {
            setViewRoom(null);
            setEditRoom(room);
            setshowAddRoom(true);
          }}
        />
      )}

      {/* Delete Popup */}
      {showDelete && (
        <DeletePopup
        title="Delete Room"
         nameKey="roomName"
          Cancel={() => setShowDelete(false)}
          onConfirm={handleDelete}
          data={selectedRoom}
        />
      )}
    </div>
  );
};

export default Rooms;
