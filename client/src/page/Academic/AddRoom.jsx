import React, { useState, useEffect } from "react";
import { MdKeyboardReturn } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import api from "../../config/axiosInstance";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "../../CSS/Room.css";

const AddRoom = ({ onClose, editData }) => {
const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showRoomTypeDropdown, setShowRoomTypeDropdown] = useState(false);
  const { id } = useParams(); // ✅ get id
  // const isEdit = !!id;
  // Backend implement
  const [form, setForm] = useState({
    roomName: "",
    roomType: "",
    location: "",
    floor: "",
    capacity: "",
    area: "",
    status: "",
    desks: "",
    chairs: "",
    teacherTable: "",
    note: "",
    facilities: [],
  });
  const isEdit = !!editData;
  useEffect(() => {
    if (editData) {
      setForm({
        roomName: editData.roomName || "",
        roomType: editData.roomType || "",
        location: editData.location || "",
        floor: editData.floor || "",
        capacity: editData.capacity || "",
        area: editData.area || "",
        status: editData.status || "Active",

        desks: editData.furniture?.desks ?? "",
        chairs: editData.furniture?.chairs ?? "",
        teacherTable: editData.furniture?.teacherTable ?? "",

        facilities: Array.isArray(editData.facilities)
          ? editData.facilities
          : [], // ✅ FIX

        note: editData.note || "",
      });
    }
  }, [editData]);

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // checkbox
  const handleFacility = (item) => {
    setForm((prev) => {
      const exists = prev.facilities.includes(item);
      return {
        ...prev,
        facilities: exists
          ? prev.facilities.filter((f) => f !== item)
          : [...prev.facilities, item],
      };
    });
  };

  // submit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //    try {
  //   const res = await api.post("/api/rooms", form);

  //   toast.success(res.data.message || "Room created successfully");
  //   onClose();
  // } catch (err) {
  //   console.log(err);
  //   toast.error(err.response?.data?.message || "Something went wrong");
  // }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        const res = await api.put(`/rooms/${editData._id}`, form);
        toast.success(res.data.message || "Room updated successfully");
      } else {
        const res = await api.post("/rooms", form);
        toast.success(res.data.message || "Room created successfully");
      }

      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const [options, setOptions] = useState([
    "Classroom",
    "Laboratory",
    "Computer Lab",
    "Special Room",
  ]);
  const [value, setValue] = useState("");

  // const handleChangeRoomType = (e) => {
  //   const { name, value } = e.target;

  //   if (name === "roomType" && value === "add_new") {
  //     const newVal = prompt("Enter New Here");
  //     if (newVal) {
  //       setForm({ ...form, roomType: newVal });
  //       setOptions([...options, newVal]);
  //     }
  //     return;
  //   }

  //   setForm({ ...form, [name]: value });
  // };
  const handleChangeRoomType = (e) => {
    const value = e.target.value;

    if (value === "add_new") {
      const newVal = prompt("Enter New Room Type");

      if (newVal && newVal.trim() !== "") {
        // add to options
        setOptions((prev) => [...prev, newVal]);

        // set selected
        setForm((prev) => ({
          ...prev,
          roomType: newVal,
        }));
      }
    } else {
      setForm((prev) => ({
        ...prev,
        roomType: value,
      }));
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        fontFamily: "Segoe UI",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          maxWidth: "836px",
          height: "100%",
          maxHeight: "624px",
          overflow: "auto",
        }}
      >
        {/* Header and cross */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
              {/* Add New Room */}
              {isEdit ? "Edit Room" : "Add New Room"}
            </label>
            <label
              htmlFor=""
              style={{ color: "#9C9C9C", fontWeight: "400", fontSize: "14px" }}
            >
              {isEdit
                ? "Update the room information"
                : "Create a new room with facilities and capacity details"}
            </label>
          </div>
          <RxCross2
            onClick={onClose}
            style={{
              cursor: "pointer",
              color: "#1F1F1F",
              fontSize: "16px",
              fontWeight: "600",
            }}
          />
        </div>

        {/* form start here */}
        <form onSubmit={handleSubmit}>
          {/* first form */}
          <div
            className="addcreate-popup-sms"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              columnGap: "18px",
              rowGap: "18px",
            }}
          >
            {/* room name */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                htmlFor=""
                style={{
                  color: "#1C1C1C",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Room Name
              </label>
              <input
                name="roomName"
                id=""
                placeholder="Type here room name.."
                value={form.roomName}
                onChange={handleChange}
                style={{
                  border: "1px solid #E6E6E6",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  color: "#0f0e0ebf",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              />
            </div>
            {/* Room Type*/}
           <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
  <label
    htmlFor=""
    style={{
      color: "#1C1C1C",
      fontSize: "14px",
      fontWeight: "600",
    }}
  >
    Room Type
  </label>

  <div className="relative">
    <button
      type="button"
      onClick={() => setShowRoomTypeDropdown(!showRoomTypeDropdown)}
      className="w-full bg-white border border-[#E6E6E6] rounded-xl px-4 py-3 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors"
      style={{
        color: form.roomType ? "#1C1C1C" : "#9C9C9C",
        fontSize: "16px",
      }}
    >
      <span>{form.roomType || "Select Room Type"}</span>
      <svg
        className={`w-4 h-4 transition-transform duration-200 ${showRoomTypeDropdown ? "rotate-180" : ""}`}
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

    {showRoomTypeDropdown && (
      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-xl shadow-lg max-h-60 overflow-y-auto">
        {/* Existing options */}
        {options.map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              handleChangeRoomType({ target: { name: "roomType", value: opt } });
              setShowRoomTypeDropdown(false);
            }}
            className={`w-full text-left px-4 py-3 text-[14px] hover:bg-[#F5F7F7] transition-colors ${
              form.roomType === opt ? "bg-[#F5F7F7] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
            }`}
          >
            {opt}
          </button>
        ))}

        {/* Add new option - Separator */}
        <div className="border-t border-[#E6E6E6] my-1"></div>
        
        <button
          type="button"
          onClick={() => {
            handleChangeRoomType({ target: { name: "roomType", value: "add_new" } });
            setShowRoomTypeDropdown(false);
          }}
          className="w-full text-left px-4 py-3 text-[14px] hover:bg-[#F5F7F7] transition-colors text-[#118AB2] font-medium"
        >
          ➕ Enter New
        </button>
      </div>
    )}
  </div>
</div>
            {/* Location */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                htmlFor=""
                style={{
                  color: "#1C1C1C",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Location
              </label>
              <input
                name="location"
                placeholder="Type here location.."
                onChange={handleChange}
                value={form.location}
                style={{
                  border: "1px solid #E6E6E6",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  color: "#0f0e0ebf",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              />
            </div>
            {/* Floor*/}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                htmlFor=""
                style={{
                  color: "#1C1C1C",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Floor
              </label>
              <input
                name="floor"
                placeholder="Type here floor.."
                onChange={handleChange}
                value={form.floor}
                style={{
                  border: "1px solid #E6E6E6",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  color: "#0f0e0ebf",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              />
            </div>
            {/* Capacity */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                htmlFor=""
                style={{
                  color: "#1C1C1C",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Capacity
              </label>
              <input
                name="capacity"
                onChange={handleChange}
                value={form.capacity}
                placeholder="Type here capacity.."
                style={{
                  border: "1px solid #E6E6E6",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  color: "#0f0e0ebf",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              />
            </div>
            {/* Area (sq ft)*/}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                htmlFor=""
                style={{
                  color: "#1C1C1C",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Area (sq ft)
              </label>
              <input
                name="area"
                onChange={handleChange}
                value={form.area}
                placeholder="Type here area sq ft.."
                style={{
                  border: "1px solid #E6E6E6",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  color: "#0f0e0ebf",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              />
            </div>
            {/* Status select*/}
           <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
  <label
    htmlFor=""
    style={{
      color: "#1C1C1C",
      fontSize: "14px",
      fontWeight: "600",
    }}
  >
    Status
  </label>

  <div className="relative">
    <button
      type="button"
      onClick={() => setShowStatusDropdown(!showStatusDropdown)}
      className="w-full bg-white border border-[#E6E6E6] rounded-xl px-4 py-3 text-left flex items-center justify-between hover:border-[#0B3142] transition-colors"
      style={{
        color: form.status && form.status !== "Select status" ? "#1C1C1C" : "#9C9C9C",
        fontSize: "16px",
        fontWeight: "400",
        borderRadius: "12px",
        padding: "12px 16px",
      }}
    >
      <span>{form.status && form.status !== "Select status" ? form.status : "Select status"}</span>
      <svg
        className={`w-4 h-4 transition-transform duration-200 ${showStatusDropdown ? "rotate-180" : ""}`}
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

    {showStatusDropdown && (
      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E6E6E6] rounded-xl shadow-lg overflow-hidden">
        <button
          type="button"
          onClick={() => {
            const event = { target: { name: "status", value: "Active" } };
            handleChange(event);
            setShowStatusDropdown(false);
          }}
          className={`w-full text-left px-4 py-3 text-[14px] hover:bg-[#F5F7F7] transition-colors ${
            form.status === "Active" ? "bg-[#F5F7F7] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
          }`}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => {
            const event = { target: { name: "status", value: "Inactive" } };
            handleChange(event);
            setShowStatusDropdown(false);
          }}
          className={`w-full text-left px-4 py-3 text-[14px] hover:bg-[#F5F7F7] transition-colors ${
            form.status === "Inactive" ? "bg-[#F5F7F7] font-medium text-[#0B3142]" : "text-[#1C1C1C]"
          }`}
        >
          Inactive
        </button>
      </div>
    )}
  </div>
</div>
          </div>
          {/* Second form */}
          <div
            className="addcreate-popup-sms"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              columnGap: "18px",
              rowGap: "18px",
              padding: "18px 0",
            }}
          >
            {/* Desks */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                htmlFor=""
                style={{
                  color: "#1C1C1C",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Desks
              </label>
              <input
                name="desks"
                onChange={handleChange}
                value={form.desks}
                placeholder="Type desks number.."
                style={{
                  border: "1px solid #E6E6E6",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  color: "#0f0e0ebf",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              />
            </div>
            {/* Chair */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                htmlFor=""
                style={{
                  color: "#1C1C1C",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Chair
              </label>
              <input
                name="chairs"
                onChange={handleChange}
                value={form.chairs}
                placeholder="Type Chair Number.."
                style={{
                  border: "1px solid #E6E6E6",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  color: "#0f0e0ebf",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              />
            </div>
            {/* Teacher Table*/}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                htmlFor=""
                style={{
                  color: "#1C1C1C",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Teacher Table
              </label>
              <input
                name="teacherTable"
                onChange={handleChange}
                value={form.teacherTable}
                placeholder="Type techaer table number.."
                style={{
                  border: "1px solid #E6E6E6",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  color: "#0f0e0ebf",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              />
            </div>
          </div>
          {/* Third form */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              htmlFor=""
              style={{ color: "#1C1C1C", fontSize: "14px", fontWeight: "600" }}
            >
              Facilities
            </label>
            <div
              className="facilities-addpopup"
              style={{
                border: "1px solid #E6E6E6",
                borderRadius: "12px",
                padding: "12px 16px",
                color: "#9C9C9C",
                fontSize: "16px",
                fontWeight: "400",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                rowGap: "10px",
              }}
            >
              <label
                htmlFor=""
                style={{
                  color: "#1c1c1cc0",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.facilities?.includes("Projector") || false}
                  onChange={() => handleFacility("Projector")}
                  value={form.facilities}
                />
                Projector
              </label>
              <label
                htmlFor=""
                style={{
                  color: "#1c1c1cc0",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.facilities?.includes("Whiteboard") || false}
                  onChange={() => handleFacility("Whiteboard")}
                  value={form.facilities}
                />
                Whiteboard
              </label>
              <label
                htmlFor=""
                style={{
                  color: "#1c1c1cc0",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.facilities?.includes("Smart Board") || false}
                  onChange={() => handleFacility("Smart Board")}
                  value={form.facilities}
                />
                Smart Board
              </label>
              <label
                htmlFor=""
                style={{
                  color: "#1c1c1cc0",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.facilities?.includes("WiFi") || false}
                  onChange={() => handleFacility("WiFi")}
                  value={form.facilities}
                />
                WiFi
              </label>
              <label
                htmlFor=""
                style={{
                  color: "#1c1c1cc0",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  type="checkbox"
                  checked={
                    form.facilities?.includes("Air Conditioning") || false
                  }
                  onChange={() => handleFacility("Air Conditioning")}
                  value={form.facilities}
                />
                Air Conditioning
              </label>
              <label
                htmlFor=""
                style={{
                  color: "#1c1c1cc0",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.facilities?.includes("Computers") || false}
                  onChange={() => handleFacility("Computers")}
                  value={form.facilities}
                />
                Computers
              </label>
              <label
                htmlFor=""
                style={{
                  color: "#1c1c1cc0",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.facilities?.includes("Lab Equipment") || false}
                  onChange={() => handleFacility("Lab Equipment")}
                  value={form.facilities}
                />
                Lab Equipment
              </label>
              <label
                htmlFor=""
                style={{
                  color: "#1c1c1cc0",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.facilities?.includes("Sound System") || false}
                  onChange={() => handleFacility("Sound System")}
                  value={form.facilities}
                />
                Sound System
              </label>
              <label
                htmlFor=""
                style={{
                  color: "#1c1c1cc0",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.facilities?.includes("Ventilation") || false}
                  onChange={() => handleFacility("Ventilation")}
                  value={form.facilities}
                />
                Ventilation
              </label>
            </div>
          </div>
          {/* Fourth form  */}
          {/* Note */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "18px 0",
            }}
          >
            <label
              htmlFor=""
              style={{
                color: "#1C1C1C",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Note(Optional)
            </label>
            <input
              type="name"
              name="note"
              onChange={handleChange}
              value={form.note}
              placeholder="Any Additional About the Room.."
              style={{
                border: "1px solid #E6E6E6",
                borderRadius: "12px",
                padding: "12px 16px",
                color: "#0f0e0ebf",
                fontSize: "16px",
                fontWeight: "400",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "end", gap: "18px" }}>
            <button
              onClick={onClose}
              style={{
                border: "1px solid #9C9C9C",
                fontSize: "16px",
                fontWeight: "600",
                color: "#696969",
                padding: "12px 16px",
                borderRadius: "12px",
              }}
            >
              Cancel
            </button>
            <button
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#FFFFFF",
                backgroundColor: "#0B3142",
                padding: "12px 16px",
                borderRadius: "12px",
              }}
            >
              {/* Create Room */}
              {isEdit ? "Update Room" : "Create Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
