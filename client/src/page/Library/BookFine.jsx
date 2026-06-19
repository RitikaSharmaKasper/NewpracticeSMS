import React, { useState, useEffect } from "react";
import viewMessage from "../../assets/images/viewmessage.png";
import calculation from "../../assets/images/calculation.png";
import student_fine_rule from "../../assets/images/student_fine_rule.png";
import staff_fine_rule from "../../assets/images/staff_fine_rule.png";
const STORAGE_KEY_STUDENT = "sms_fine_rules_student";
const STORAGE_KEY_STAFF = "sms_fine_rules_staff";

const BookFine = () => {
  // States for Student and Staff fine rules
  const [studentRules, setStudentRules] = useState({
    finePerDay: 5,
    gracePeriod: 2,
    maxFine: 200,
  });

  const [staffRules, setStaffRules] = useState({
    finePerDay: 10,
    gracePeriod: 5,
    maxFine: 500,
  });

 
  useEffect(() => {
    const savedStudent = localStorage.getItem(STORAGE_KEY_STUDENT);
    const savedStaff = localStorage.getItem(STORAGE_KEY_STAFF);
    if (savedStudent) {
      try { setStudentRules(JSON.parse(savedStudent)); } catch (e) { console.error(e); }
    }
    if (savedStaff) {
      try { setStaffRules(JSON.parse(savedStaff)); } catch (e) { console.error(e); }
    }
  }, []);

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState("select"); // "select" | "edit-student" | "edit-staff"
  const [openedFrom, setOpenedFrom] = useState("configure"); // "configure" | "direct-edit"

  // Temporary edit states
  const [editForm, setEditForm] = useState({
    finePerDay: "",
    gracePeriod: "",
    maxFine: "",
  });

  const handleOpenConfigure = () => {
    setOpenedFrom("configure");
    setModalView("select");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (type) => {
    setOpenedFrom("direct-edit");
    const rules = type === "student" ? studentRules : staffRules;
    setEditForm({
      finePerDay: String(rules.finePerDay),
      gracePeriod: String(rules.gracePeriod),
      maxFine: String(rules.maxFine),
    });
    setModalView(type === "student" ? "edit-student" : "edit-staff");
    setIsModalOpen(true);
  };

  const selectEditType = (type) => {
    const rules = type === "student" ? studentRules : staffRules;
    setEditForm({
      finePerDay: String(rules.finePerDay),
      gracePeriod: String(rules.gracePeriod),
      maxFine: String(rules.maxFine),
    });
    setModalView(type === "student" ? "edit-student" : "edit-staff");
  };

  const handleSave = (e) => {
    e.preventDefault();
    const parsed = {
      finePerDay: Number(editForm.finePerDay) || 0,
      gracePeriod: Number(editForm.gracePeriod) || 0,
      maxFine: Number(editForm.maxFine) || 0,
    };

    if (modalView === "edit-student") {
      setStudentRules(parsed);
      localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(parsed));
    } else if (modalView === "edit-staff") {
      setStaffRules(parsed);
      localStorage.setItem(STORAGE_KEY_STAFF, JSON.stringify(parsed));
    }

    if (openedFrom === "direct-edit") {
      setIsModalOpen(false);
    } else {
      setModalView("select");
    }
  };

  return (
    <div className=" bg-white rounded-[12px] border border-[#E6E6E6] shadow-[0_4px_12px_rgba(0,0,0,0.05)] pt-2 pb-4 pr-4 pl-4" style={{ fontFamily: "Segoe UI" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 mt-1">
        <div>
          <h1 className="text-[18px] font-semibold text-[#1C1C1C] font-[600]">Fine Management</h1>
          <p className="text-[16px] text-[#696969] font-[400] font-normal -mt-[5px] ">
            Current fine rules and settings
          </p>
        </div>
        <button
          onClick={handleOpenConfigure}
          className="bg-[#0B3142] text-[#FFFFFF] px-6 h-[40px] rounded-[8px] text-[16px] font-[600] font-semibold flex items-center gap-2 transition cursor-pointer -mt-[8px]"
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          Configure Fine Rules
        </button>
      </div>

      {/* Cards List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {/* Students Card */}
      <div className="bg-white rounded-[12px] border border-[#E6E6E6] shadow-[0_4px_12px_rgba(0,0,0,0.05)] pt-3 pr-4 pl-4 pb-5 flex flex-col relative">
  
  <div className="flex justify-between items-center mb-2">
    <h3 className="text-[18px] font-semibold text-[#1C1C1C]">Students</h3>
    <button onClick={() => handleOpenEdit("student")} className="p-1.5  text-[text-[#1C1C1C] transition cursor-pointer">
      <img src={viewMessage} alt="Edit" className="h-6 w-6 object-contain text-[#1C1C1C] invert" />
    </button>
  </div>
  
  <div className="space-y-1">
    <div className="flex justify-between items-center">
      <span className="text-[#696969] font-[400] font-regular text-[14px] ">Fine per day:</span>
      <span className="text-[#1C1C1C] font-semibold font-[14px]  font-[600]">₹{studentRules.finePerDay}</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-[#696969] font-[400] font-regular text-[14px]">Grace period:</span>
      <span className="text-[#1C1C1C] font-semibold font-[14px]  font-[600]">{studentRules.gracePeriod} days</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-[#696969] font-[400] font-regular text-[14px]">Maximum fine:</span>
      <span className="text-[#1C1C1C] font-semibold font-[14px]  font-[600]">₹{studentRules.maxFine}</span>
    </div>
  </div>
  
  {/* Remove any empty divs here */}
</div>
        {/* Staff Card */}
        <div className="bg-white rounded-[12px] border border-[#E6E6E6] shadow-[0_4px_12px_rgba(0,0,0,0.05)] pt-3 pr-4 pl-4 pb-5  flex flex-col justify-between relative">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-[18px] font-semibold text-[#1C1C1C] font-[600]">Staff</h3>
            <button
              onClick={() => handleOpenEdit("staff")}
              title="Edit Staff Fine Rules"
              className="p-1.5 transition cursor-pointer"
            >
              <img
                src={viewMessage}
                alt="Edit"
                className="h-6 w-6 object-contain text-[#1C1C1C] invert "
              />
            </button>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[15px]">
              <span className="text-[#696969] font-[400] font-regular text-[14px]">Fine per day:</span>
              <span className="text-[#1C1C1C] font-semibold font-[14px]  font-[600] ">₹{staffRules.finePerDay}</span>
            </div>
            <div className="flex justify-between items-center text-[15px]">
              <span className="text-[#696969] font-[400] font-regular text-[14px]">Grace period:</span>
              <span className="text-[#1C1C1C] font-semibold font-[14px]  font-[600]">{staffRules.gracePeriod} days</span>
            </div>
            <div className="flex justify-between items-center text-[15px]">
              <span className="text-[#696969] font-[400] font-regular text-[14px]">Maximum fine:</span>
              <span className="text-[#1C1C1C] font-semibold font-[14px]  font-[600]">₹{staffRules.maxFine}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Styled animation overrides */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scaleUp { animation: scaleUp 0.25s ease-out; }
      `}</style>

      {/* Flexible Overlay Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-[0.5px] flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-[16px] w-full max-w-[32rem] sm:max-w-[50rem] flex flex-col overflow-hidden shadow-2xl border border-[#E6E6E6] relative animate-scaleUp">
            
            {/* Modal View: Selection */}
            {modalView === "select" && (
              <div className="flex flex-col">
                <div className="pt-4 pb-2 px-5 flex justify-between items-center select-none">
                  <div>
                    <h3 className="text-[20px] font-semibold text-[#1C1C1C] font-[600]">
                      Configure Fine Rules
                    </h3>
                    <p className="text-[16px] text-[#9C9C9C] font-normal mt-0">
                      Choose user type to configure fine rules
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-[#1C1C1C] pr-1    transition cursor-pointer text-md font-bold"
                  >
                    ✕
                  </button>
                </div>
<div className="p-5 space-y-3">
  
  {/* Student Card button - FIXED */}
  <div
    onClick={() => selectEditType("student")}
    className="border border-[#E6E6E6] rounded-[10px] p-3 cursor-pointer transition "
  >
    <div>
      <div className="flex items-center gap-2 mb-1">
        <img
          src={staff_fine_rule}
          alt="Edit"
          className="h-4 w-4 object-contain opacity-70"
        />
        <h4 className="text-[14px] font-semibold font-[600] text-[#1C1C1C]">
          Student Fine Rules
        </h4>
      </div>
      <p className="text-[14px] text-[#9C9C9C] font-normal mt-0">
        ₹{studentRules.finePerDay}/day • {studentRules.gracePeriod} days grace • Max ₹{studentRules.maxFine}
      </p>
    </div>
  </div>

  {/* Staff Card button - Already correct */}
  <div
    onClick={() => selectEditType("staff")}
    className="border border-[#E6E6E6] rounded-[10px] p-3 cursor-pointer transition "
  >
    <div>
      <div className="flex items-center gap-2 mb-1">
        <img
          src={student_fine_rule}
          alt="Edit"
          className="h-4 w-4 object-contain opacity-70"
        />
        <h4 className="text-[14px] font-semibold font-[600] text-[#1C1C1C]">
          Staff Fine Rules
        </h4>
      </div>
      <p className="text-[14px] text-[#9C9C9C] font-normal mt-0">
        ₹{staffRules.finePerDay}/day • {staffRules.gracePeriod} days grace • Max ₹{staffRules.maxFine}
      </p>
    </div>
  </div>

</div>
                <div className="flex justify-end gap-3 p-6 pt-5 select-none">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2 h-[38px] min-w-[90px] border border-[#9C9C9C] bg-[#FFFFFF] text-[#696969] rounded-[8px] font-semibold text-[16px] transition cursor-pointer hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2 h-[38px] min-w-[100px] bg-[#0B3142] text-white rounded-[8px] text-[16px] font-semibold transition cursor-pointer hover:bg-[#082330]"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Modal View: Edit Student / Staff Rules */}
            {(modalView === "edit-student" || modalView === "edit-staff") && (
              <form onSubmit={handleSave} className="flex flex-col">
                <div className="pt-4 pb-2 px-4 flex justify-between items-center select-none">
                  <div>
                    <h3 className="text-[18px] font-semibold text-[#1C1C1C] font-[600]">
                      {modalView === "edit-student" ? "Edit Fine Rules - Students" : "Edit Fine Rules - Staff"}
                    </h3>
                    <p className="text-[14px] text-[#9C9C9C] font-normal -mt-[2px]">
                      {modalView === "edit-student"
                        ? "Set fine calculation rules for students"
                        : "Set fine calculation rules for staffs"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openedFrom === "direct-edit" ? setIsModalOpen(false) : setModalView("select")}
                    className="text-[#1C1C1C] p-0 pr-1 transition cursor-pointer text-md font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  {/* Fine per Day */}
                  <div>
                    <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
                      Fine per Day (₹)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={editForm.finePerDay}
                      onChange={(e) => setEditForm({ ...editForm, finePerDay: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] outline-none transition text-[#696969] font-[400] "
                    />
                    <span className="block text-[14px] text-[#9C9C9C] mt-1">
                      Amount charged for each day the book is overdue (after grace period)
                    </span>
                  </div>

                  {/* Grace Period */}
                  <div>
                    <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
                      Grace Period (Days)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={editForm.gracePeriod}
                      onChange={(e) => setEditForm({ ...editForm, gracePeriod: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] outline-none transition text-[#696969] font-[400] "
                    />
                    <span className="block text-[14px] text-[#9C9C9C] mt-1">
                      Number of days after due date before fine starts accumulating
                    </span>
                  </div>

                  {/* Maximum Fine */}
                  <div>
                    <label className="block text-[14px] font-semibold text-[#1C1C1C] font-[600] mb-1">
                      Maximum Fine (₹)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={editForm.maxFine}
                      onChange={(e) => setEditForm({ ...editForm, maxFine: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-white border border-[#E6E6E6] rounded-[12px] outline-none transition text-[#696969] font-[400] "
                    />
                    <span className="block text-[14px] text-[#9C9C9C] mt-1">
                      Maximum fine amount that can be charged for a single book
                    </span>
                  </div>

                  {/* Dynamic Example Calculation Alert Banner */}
                  <div className="bg-[#EFF6FF] border border-[#BEDBFF] rounded-[10px] p-3 flex gap-3 mt-0 items-start select-none">
                    <div className="  flex items-center justify-center shrink-0 mt-1.5">
                    <img src={calculation} alt="" className="w-4 h-4 object-contain" />
                    </div>
                    <div className="text-[16px] text-[#193CB8]">
                      <span className="text-[16px]  font-[400] font-normal block">Example Calculation:</span>
                      <span className="block mt-0 text-[#193CB8] text-[12px]  font-[400] font-normal">
                        Book overdue by 10 days: {Number(editForm.gracePeriod) || 0} days grace +{" "}
                        {Math.max(0, 10 - (Number(editForm.gracePeriod) || 0))} days * ₹
                        {Number(editForm.finePerDay) || 0} = ₹
                        {Math.min(
                          Number(editForm.maxFine) || 0,
                          Math.max(0, 10 - (Number(editForm.gracePeriod) || 0)) *
                            (Number(editForm.finePerDay) || 0)
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 p-6 pt-3 select-none">
                  <button
                    type="button"
                    onClick={() => openedFrom === "direct-edit" ? setIsModalOpen(false) : setModalView("select")}
                    className="px-5 py-2 h-[38px] min-w-[90px] border border-[#9C9C9C] bg-[#FFFFFF] text-[#696969] rounded-[8px] font-semibold text-[16px] transition cursor-pointer hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 h-[40px] min-w-[148px] bg-[#0B3142] text-white rounded-[8px] text-[16px] font-semibold transition cursor-pointer hover:bg-[#082330]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}








    </div>
  );
};

export default BookFine;
