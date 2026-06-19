import { useState, useEffect, useRef } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import yoda from "../../../assets/images/yoda.jpg";

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {/* SELECT BOX */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="w-full bg-[#ffffff] border border-[#E6E6E6] rounded-lg px-2 py-3 flex justify-between items-center cursor-pointer"
      >
        <span className={value ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}>
          {value || placeholder}
        </span>

        <MdOutlineArrowDropDown
          size={20}
          className={`text-[#9C9C9C] transition-transform duration-200 ${open ? "rotate-180" : ""
            }`}
        />
      </div>
      {open && (
        <div className="absolute mt-2 w-full bg-white border border-[#E6E6E6] rounded-lg shadow z-50 max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`px-4 py-3 cursor-pointer ${value === opt
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
                }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function FeeDiscount() {
  const [showFeeMonth, setShowFeeMonth] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  return (
    <div>

      <div className="mt-4 bg-white p-4 rounded-lg shadow-lg gap-6">
        <div className="flex flex-col font-['Segoe_UI']">
          <span className="text-[#1C1C1C] text-[18px] font-semibold leading-[100%] tracking-[0em]">
            Fee Collections
          </span>

          <span className="text-[#9C9C9C] text-[16px] font-normal leading-[100%] tracking-[0em]">
            Record Payments and generates receipts
          </span>
        </div>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 mt-9">
          <div>
            <section className="flex flex-col gap-2">
              <label
                htmlFor="admissionNumber"
                className="font-['Segoe_UI'] text-[#1C1C1C] text-[14px] font-semibold leading-[100%]"
              >
                Admission Number
              </label>

              <input
                id="admissionNumber"
                type="text"
                placeholder="Enter Admission Number"
                className="rounded-lg px-2 py-3 border border-[#E6E6E6] outline-none"
              />
            </section>
          </div>

          <div>
            <section className="flex flex-col gap-2">
              <label
                htmlFor="studentid"
                className="font-['Segoe_UI'] text-[#1C1C1C] text-[14px] font-semibold leading-[100%]"
              >
                Student ID
              </label>

              <input
                id="studentid"
                type="text"
                placeholder="Enter Student ID"
                className="rounded-lg px-2 py-3 border border-[#E6E6E6] outline-none"
              />
            </section>
          </div>
          <div>
            <section className="flex flex-col gap-2">
              <label
                htmlFor="class"
                className="font-['Segoe_UI'] text-[#1C1C1C] text-[14px] font-semibold leading-[100%]"
              >
                Class
              </label>

              <CustomSelect
                options={["Class 1", "Class 2", "Class 3"]}
                value={selectedClass}
                onChange={setSelectedClass}
                placeholder="Select Class"
              />
            </section>
          </div>

          <div>
            <section className="flex flex-col gap-2">
              <label
                htmlFor="section"
                className="font-['Segoe_UI'] text-[#1C1C1C] text-[14px] font-semibold leading-[100%]"
              >
                Section
              </label>

              <CustomSelect
                options={["Section A", "Section B", "Section C"]}
                value={selectedSection}
                onChange={setSelectedSection}
                placeholder="Select Section"
              />
            </section>
          </div>


          <div>
            <section className="flex flex-col gap-2">
              <label
                htmlFor="student"
                className="font-['Segoe_UI'] text-[#1C1C1C] text-[14px] font-semibold leading-[100%]"
              >
                Student
              </label>

              <CustomSelect
                options={["Langford", "Homelander", "Thanos"]}
                value={selectedStudent}
                onChange={setSelectedStudent}
                placeholder="Select Student"
              />
            </section>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => setShowFeeMonth(true)}
            className="flex gap-2 border items-center px-6 py-3 rounded-lg border-none bg-[#0B3142] text-white"
          >
            <span>
              <IoSearchOutline size={16} />
            </span>
            <span className="text-[16px] font-semibold">Search</span>
          </button>
        </div>

      </div>
      {showFeeMonth && (
        <div>
          <div className="mt-4 bg-white p-4 rounded-lg shadow-lg gap-6">
            <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">

              <div className="flex flex-col gap-1">
                <div>
                  <label
                    htmlFor="monthlyFee"
                    className="font-['Segoe_UI'] text-[#1C1C1C] text-[14px] font-semibold leading-[100%]"
                  >
                    Tution Fee Monthly
                  </label>
                </div>
                <div>
                  <input
                    id="monthlyFee"
                    type="Number"
                    placeholder="Enter Monthly Fee"
                    className="border border-[#E6E6E6] bg-[#F2F2F2] rounded-lg px-2 py-3 border border-[#E6E6E6] outline-none w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div>
                  <label
                    htmlFor="monthlyFee"
                    className="font-['Segoe_UI'] text-[#1C1C1C] text-[14px] font-semibold leading-[100%]"
                  >
                    Discount
                  </label>
                </div>
                <div>
                  <input
                    id="monthlyFee"
                    type="Number"
                    placeholder="500"
                    className="rounded-lg px-2 py-3 border border-[#E6E6E6] outline-none w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div>
                  <label
                    htmlFor="monthlyFee"
                    className="font-['Segoe_UI'] text-[#1C1C1C] text-[14px] font-semibold leading-[100%]"
                  >
                    Transport
                  </label>
                </div>
                <div>
                  <input
                    id="monthlyFee"
                    type="Number"
                    placeholder="Enter Transport Fee"
                    className="border border-[#E6E6E6] bg-[#F2F2F2] rounded-lg px-2 py-3 border border-[#E6E6E6] outline-none w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div>
                  <label
                    htmlFor="monthlyFee"
                    className="font-['Segoe_UI'] text-[#1C1C1C] text-[14px] font-semibold leading-[100%]"
                  >
                    Discount
                  </label>
                </div>
                <div>
                  <input
                    id="monthlyFee"
                    type="Number"
                    placeholder=" 500"
                    className="rounded-lg px-2 py-3 border border-[#E6E6E6] outline-none w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div>
                  <label
                    htmlFor="monthlyFee"
                    className="font-['Segoe_UI'] text-[#1C1C1C] text-[14px] font-semibold leading-[100%]"
                  >
                    Library
                  </label>
                </div>
                <div>
                  <input
                    id="monthlyFee"
                    type="Number"
                    placeholder="Enter Library Fee"
                    className="border border-[#E6E6E6] bg-[#F2F2F2] rounded-lg px-2 py-3 border border-[#E6E6E6] outline-none w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div>
                  <label
                    htmlFor="monthlyFee"
                    className="font-['Segoe_UI'] text-[#1C1C1C] text-[14px] font-semibold leading-[100%]"
                  >
                    Discount
                  </label>
                </div>
                <div>
                  <input
                    id="monthlyFee"
                    type="Number"
                    placeholder=" 500"
                    className="rounded-lg px-2 py-3 border border-[#E6E6E6] outline-none w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div>
                  <label
                    htmlFor="monthlyFee"
                    className="font-['Segoe_UI'] text-[#1C1C1C] text-[14px] font-semibold leading-[100%]"
                  >
                    Activity
                  </label>
                </div>
                <div>
                  <input
                    id="monthlyFee"
                    type="Number"
                    placeholder="Enter Activity Fee"
                    className="border border-[#E6E6E6] bg-[#F2F2F2] rounded-lg px-2 py-3 border border-[#E6E6E6] outline-none w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div>
                  <label
                    htmlFor="monthlyFee"
                    className="font-['Segoe_UI'] text-[#1C1C1C] text-[14px] font-semibold leading-[100%]"
                  >
                    Discount
                  </label>
                </div>
                <div>
                  <input
                    id="monthlyFee"
                    type="Number"
                    placeholder=" 500"
                    className="rounded-lg px-2 py-3 border border-[#E6E6E6] outline-none w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div>
                  <label
                    htmlFor="monthlyFee"
                    className="font-['Segoe_UI'] text-[#1C1C1C] text-[14px] font-semibold leading-[100%]"
                  >
                    Uniform Fee
                  </label>
                </div>
                <div>
                  <input
                    id="monthlyFee"
                    type="Number"
                    placeholder="Enter Uniform Fee"
                    className="border border-[#E6E6E6] bg-[#F2F2F2] rounded-lg px-2 py-3 border border-[#E6E6E6] outline-none w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div>
                  <label
                    htmlFor="discountFee"
                    className="font-['Segoe_UI'] text-[#1C1C1C] text-[14px] font-semibold leading-[100%]"
                  >
                    Discount
                  </label>
                </div>
                <div>
                  <input
                    id="discountFee"
                    type="Number"
                    placeholder="500"
                    className="rounded-lg px-2 py-3 border border-[#E6E6E6] outline-none w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div>
                  <label
                    htmlFor="monthlyFee"
                    className="font-['Segoe_UI'] text-[#1C1C1C] text-[14px] font-semibold leading-[100%]"
                  >
                    Exam Fee
                  </label>
                </div>
                <div>
                  <input
                    id="monthlyFee"
                    type="Number"
                    placeholder="Enter Exam Fee"
                    className="border border-[#E6E6E6] bg-[#F2F2F2] rounded-lg px-2 py-3 border border-[#E6E6E6] outline-none w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div>
                  <label
                    htmlFor="examDiscountFee"
                    className="font-['Segoe_UI'] text-[#1C1C1C] text-[14px] font-semibold leading-[100%]"
                  >
                    Discount
                  </label>
                </div>
                <div>
                  <input
                    id="examDiscountFee"
                    type="Number"
                    placeholder="500"
                    className="rounded-lg px-2 py-3 border border-[#E6E6E6] outline-none w-full"
                  />
                </div>
              </div>




            </div>

            <div className="flex flex-col gap-1 mt-3">
              <div>
                <label
                  htmlFor="remark"
                  className="font-['Segoe_UI'] text-[#1C1C1C] text-[14px] font-semibold leading-[100%]"
                >
                  Remark
                </label>
              </div>
              <div>
                <textarea
                  id="remark"
                  type="text"
                  placeholder="Type here..."
                  className="border border-[#E6E6E6] rounded-lg px-2 py-1 border border-[#E6E6E6] outline-none w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-3">
            <button className="border border-[#9C9C9C] text-[#696969] px-3 py-2 rounded-md font-semibold font-['Segoe_UI']">
              Reset
            </button>
            <button className="bg-[#0B3142] border border-[#9C9C9C] text-white px-3 py-2 rounded-md font-semibold font-['Segoe_UI']">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeeDiscount