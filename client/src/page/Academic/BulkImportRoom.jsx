import React,{useState, useRef} from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RxUpload } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
const BulkImportRoom = () => {
    const [fileName, setFileName] = useState("");
const fileRef = useRef();
const navigate=useNavigate();

  return (
    <div style={{fontFamily:"Segoe UI"}}>
      {/* Back */}
      <div
        onClick={() => navigate("/")}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          marginBottom: "20px",
          color: "#696969",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        <MdKeyboardArrowLeft /> Back
      </div>
      <div
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
            <label htmlFor="" style={{ color: "#1C1C1C", fontWeight: "600" }}>
              Bulk Import 
            </label>
            <label
              htmlFor=""
              style={{ color: "#9C9C9C", fontWeight: "400", fontSize: "14px" }}
            >
              Upload a CSV or Excel file to import multiple subject at once
            </label>
          </div>

          <button
            // onClick={setAddRoomAction}
            //   onClick={() => setAddRoomAction((prev) => !prev)}
            className="text-[16px]"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#696969",
              padding: "12px 24px",
              borderRadius: "8px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: "217px",
              border: "1px solid #9C9C9C",
            }}
          >
            <AiOutlineDownload /> Download Template
          </button>
        </div>

        <div
          style={{
            border: "1px solid #BEDBFF",
            backgroundColor: "#EFF6FF",
            padding: "24px",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <label
            htmlFor=""
            style={{ color: "#0546D4", fontSize: "16px", fontWeight: "600" }}
          >
            Instructions:
          </label>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor=""
              style={{ color: "#0546D4", fontSize: "14px", fontWeight: "400" }}
            >
              1. Download the template file
            </label>
            <label
              htmlFor=""
              style={{ color: "#0546D4", fontSize: "14px", fontWeight: "400" }}
            >
              2. Open the downloaded ‘csv’ file and carefully fill the details
              of subject
            </label>
            <label
              htmlFor=""
              style={{ color: "#0546D4", fontSize: "14px", fontWeight: "400" }}
            >
              2. File format are accepting in CSV or Excel (.xlsx)
            </label>
          </div>
        </div>
        <div style={{ borderRadius: "16px", border: "1px dashed #118AB2" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "29px 16px",
              gap:"8px"
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#DBEEF4",
                color: "#118AB2",
                display:"flex",
                justifyContent:"center",
                alignItems:'center'
              }}
            >
              <RxUpload size={24} />
            </div>
             <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                 <label htmlFor="" style={{color:"#1C1C1C", fontWeight:"600", fontSize:"16px"}}>Upload Subject Data File</label>
            <label htmlFor="" style={{color:"#696969", fontSize:"14px"}}>Supports CSV and Excel files (Max 5MB)</label>
             </div>
            {/* <input
             onChange={(e) => {
          const file = e.target.files[0];
          if (file) setFileName(file.name);
        }}
              type="file"
              placeholder="Choose File"
              style={{
                border: "1px solid #9C9C9C",
                padding: "8px 16px",
                borderRadius: "6px",
                color:"#696969",
                fontSize:"14px",
                textAlign:"center"
              }}
            /> */}
            {/* Hidden input */}
      <input
        type="file"
        ref={fileRef}
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) setFileName(file.name);
        }}
      />

      {/* Custom button */}
      <button
        onClick={() => fileRef.current.click()}
        style={{
          border: "1px solid #9C9C9C",
          padding: "8px 16px",
          borderRadius: "6px",
          color: "#696969",
          fontSize: "14px",
          background: "white",
          cursor: "pointer",
        }}
      >
        {fileName ? "Change File" : "Choose File"}
      </button>

      {/* File name */}
      {fileName && (
        <span style={{ fontSize: "12px", color: "#1C1C1C" }}>
          {fileName}
        </span>
      )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkImportRoom;
