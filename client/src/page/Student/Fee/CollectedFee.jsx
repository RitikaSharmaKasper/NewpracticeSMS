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


function CollectedFee() {
    const [showFeeMonth, setShowFeeMonth] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");
    const currentYear = new Date().getFullYear();

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
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

                {showFeeMonth && (
                    <div className="mt-9">
                        <div>
                            <section className="flex flex-col gap-2">
                                <label
                                    htmlFor="admissionNumber"
                                    className="text-[#1C1C1C] text-[14px] font-semibold"
                                >
                                    Fee Month
                                </label>
                                <select
                                    id="feeMonth"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="rounded-lg py-3 border border-[#E6E6E6] outline-none"
                                >
                                    <option value="">Select Month</option>

                                    {months.map((month, index) => {
                                        const value = `${currentYear}-${String(index + 1).padStart(2, "0")}`;
                                        return (
                                            <option key={value} value={value}>
                                                {month} {currentYear}
                                            </option>
                                        );
                                    })}
                                </select>
                            </section>
                        </div>
                    </div>
                )}
            </div>

            {selectedMonth && (
                <div className="mt-4 bg-white p-4 rounded-lg shadow-lg gap-6">
                    <div className="grid lg:grid-cols-8 md:grid-cols-4 sm:grid-cols-2 gap-6 px-4 py-6 rounded-lg border border-[#E6E6E6] items-center font-['Segoe_UI']">
                        <div className="h-25 w-25 rounded-lg overflow-hidden">
                            <img src={yoda} alt="yoda" className="h-full w-full object-fit" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[14px] text-[#696969] font-normal">
                                Student Name :
                            </span>
                            <span className="font-semibold text-[14px] font-[#1C1C1C]">
                                Baby Yoda
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[14px] text-[#696969] font-normal whitespace-nowrap">
                                Admission Number :
                            </span>
                            <span className="font-semibold text-[14px] font-[#1C1C1C]">
                                ADM0531
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[14px] text-[#696969] font-normal">
                                Student ID :
                            </span>
                            <span className="font-semibold text-[14px] font-[#1C1C1C]">
                                STU0531
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[14px] text-[#696969] font-normal">
                                Class :
                            </span>
                            <span className="font-semibold text-[14px] font-[#1C1C1C]">
                                Nurcessary
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[14px] text-[#696969] font-normal">
                                Father Name :
                            </span>
                            <span className="font-semibold text-[14px] font-[#1C1C1C]">
                                Chai Wala
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[14px] text-[#696969] font-normal">
                                Fee For Month :
                            </span>
                            <span className="font-semibold text-[14px] font-[#1C1C1C]">
                                25 Jan
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[14px] text-[#696969] font-normal">
                                Status :
                            </span>
                            <span className="px-2 py-1 bg-[#F8D7DA] text-[#C92131] w-fit rounded-md text-[12px] font-semibold">
                                Unpaid
                            </span>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
                        <div>
                            <section className="flex flex-col gap-2">
                                <label
                                    htmlFor="receiptno"
                                    className="text-[#1C1C1C] text-[14px] font-semibold font-['Segoe_UI']"
                                >
                                    Receipt Number
                                </label>

                                <input
                                    id="receiptno"
                                    type="text"
                                    className="rounded-2xl px-3 py-4 border border-[#E6E6E6] outline-none text-[16px] font-normal text-[#9C9C9C]"
                                    placeholder="RCP-2025-005"
                                    readOnly
                                />
                            </section>
                        </div>
                        <div>
                            <section className="flex flex-col gap-2">
                                <label
                                    htmlFor="date"
                                    className="text-[#1C1C1C] text-[14px] font-semibold"
                                >
                                    Date
                                </label>

                                <input
                                    id="date"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="rounded-2xl px-3 py-4 border border-[#E6E6E6] outline-none text-[16px] font-normal text-[#9C9C9C]"
                                />
                            </section>
                        </div>
                    </div>

                    <div className="mt-3 border-t border-[#1c1c1c] py-3 space-y-4">
                        <div className="grid grid-cols lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                            <div className="flex items-center gap-2">
                                <label htmlFor="" className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">Tution Fee(Monthly):</label>
                                <input
                                    type="text"
                                    className="bg-[#f2f2f2] rounded-xl border border-[#E6E6E6] px-4 py-3"
                                    placeholder="₹ 5000"
                                    readOnly
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <label htmlFor="" className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">Transport(Monthly):</label>
                                <input
                                    type="text"
                                    className="bg-[#f2f2f2] rounded-xl border border-[#E6E6E6] px-4 py-3"
                                    placeholder="₹ 5000"
                                    readOnly
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <label htmlFor="" className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">Library(Monthly):</label>
                                <input
                                    type="text"
                                    className="bg-[#f2f2f2] rounded-xl border border-[#E6E6E6] px-4 py-3"
                                    placeholder="₹ 5000"
                                    readOnly
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <label htmlFor="" className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">Activity (Monthly):</label>
                                <input
                                    type="text"
                                    className="bg-[#f2f2f2] rounded-xl border border-[#E6E6E6] px-4 py-3"
                                    placeholder="₹ 5000"
                                    readOnly
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <label htmlFor="" className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">Uniform Fee(Once):</label>
                                <input
                                    type="text"
                                    className="bg-[#f2f2f2] rounded-xl border border-[#E6E6E6] px-4 py-3"
                                    placeholder="₹ 5000"
                                    readOnly
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <label htmlFor="" className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">Exam Fee(Quaterly):</label>
                                <input
                                    type="text"
                                    className="bg-[#f2f2f2] rounded-xl border border-[#E6E6E6] px-4 py-3"
                                    placeholder="₹ 5000"
                                    readOnly
                                />
                            </div>
                        </div>
                        <span className="text-[#DC2626] text-[14px] font-semibold font-['Segoe_UI']">*Important Note: Once and Yearly particulars will not shown if deposited in the current Session.</span>
                    </div>

                    <div className="mt-3 border-t border-b border-[#1c1c1c] py-3 space-y-4">
                        <div className="grid grid-cols-[200px_1fr] items-center gap-3">
                            <span className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">
                                Total Amount:
                            </span>
                            <input
                                type="text"
                                className="bg-[#f2f2f2] rounded-xl border border-[#E6E6E6] px-4 py-3"
                                placeholder="₹ 5000"
                                readOnly
                            />
                        </div>

                        <div className="grid grid-cols-[200px_1fr] items-center gap-3">
                            <span className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">
                                Old Balance(+)
                            </span>
                            <input
                                type="text"
                                className="bg-[#f2f2f2] rounded-xl border border-[#E6E6E6] px-4 py-3"
                                placeholder="₹ 500"
                                readOnly
                            />
                        </div>

                        <div className="grid grid-cols-[200px_1fr] items-center gap-3">
                            <span className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">
                                Advanced(-)
                            </span>
                            <input
                                type="text"
                                className="bg-[#f2f2f2] rounded-xl border border-[#E6E6E6] px-4 py-3"
                                placeholder="₹ 200"
                                readOnly
                            />
                        </div>

                        <div className="grid grid-cols-[200px_1fr] items-center gap-3">
                            <span className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">
                                Discount(-)
                            </span>
                            <input
                                type="text"
                                className="bg-[#f2f2f2] rounded-xl border border-[#E6E6E6] px-4 py-3"
                                placeholder="₹ 200"
                                readOnly
                            />
                        </div>

                        <div className="grid grid-cols-[200px_1fr] items-center gap-3">
                            <span className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">
                                Other Discount(-)
                            </span>
                            <div className="w-full gap-2 flex items-center">
                                <input
                                    type="text"
                                    className="bg-[#FFFFFF] rounded-xl border border-[#E6E6E6] px-4 py-3 w-full"
                                    placeholder="₹ 200"
                                    readOnly
                                />
                                <span>or</span>
                                <input
                                    type="text"
                                    className="bg-[#FFFFFF] rounded-xl border border-[#E6E6E6] px-4 py-3 w-full"
                                    placeholder="₹ 200"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-[200px_1fr] items-center gap-3">
                            <span className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">
                                Late Fee Fine(+)
                            </span>
                            <input
                                type="text"
                                className="bg-[#FFFFFF] rounded-xl border border-[#E6E6E6] px-4 py-3"
                                placeholder="₹ 200"
                                readOnly
                            />
                        </div>
                        <div className="grid grid-cols-[200px_1fr] items-center gap-3">
                            <span className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">
                                Fine(+)
                            </span>
                            <input
                                type="text"
                                className="bg-[#FFFFFF] rounded-xl border border-[#E6E6E6] px-4 py-3"
                                placeholder="₹ 200"
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="mt-3 py-3 space-y-4">
                        <div className="grid grid-cols-[200px_1fr] items-center gap-3">
                            <span className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">
                                Grand Total:
                            </span>
                            <input
                                type="text"
                                className="bg-[#f2f2f2] rounded-xl border border-[#E6E6E6] px-4 py-3"
                                placeholder="₹ 5000"
                                readOnly
                            />
                        </div>

                        <div className="grid grid-cols-[200px_1fr] items-center gap-3">
                            <span className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">
                                Received Amount:
                            </span>
                            <input
                                type="text"
                                className=" rounded-xl border border-[#E6E6E6] px-4 py-3"
                                placeholder="₹ 200"

                            />
                        </div>

                        <div className="grid grid-cols-[200px_1fr] items-center gap-3">
                            <span className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">
                                Next Due Date:
                            </span>
                            <input
                                type="date"
                                className="bg-[#FFFFFF] rounded-xl border border-[#E6E6E6] px-4 py-3"
                                placeholder="Select Month"
                                readOnly
                            />
                        </div>

                        <div className="grid grid-cols-[200px_1fr] items-center gap-3">
                            <span className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">
                                Balance:
                            </span>
                            <input
                                type="text"
                                className="bg-[#FFFFFF] rounded-xl border border-[#E6E6E6] px-4 py-3"
                                placeholder="₹ 5000"
                                readOnly
                            />
                        </div>

                        <div className="grid grid-cols-[200px_1fr] items-center gap-3">
                            <span className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">
                                Payment Mode:
                            </span>
                            <input
                                type="text"
                                className="rounded-xl border border-[#E6E6E6] px-4 py-3"
                                placeholder="₹ 200"
                            />
                        </div>

                        <div className="grid grid-cols-[200px_1fr] items-center gap-3">
                            <span className="text-[16px] text-[#1C1C1C] font-semibold font-['Segoe_UI']">
                                Income Head:
                            </span>
                            <input
                                type="text"
                                className="bg-[#FFFFFF] rounded-xl border border-[#E6E6E6] px-4 py-3"
                                placeholder="₹ 200"
                                readOnly
                            />
                        </div>
                    </div>

                    <Link to="/receipt">
                        <div className="w-full flex justify-center items-center bg-[#0B3142] px-8 py-4 rounded-lg text-[white] font-semibold text-[18px] mt-3 font-['Segoe_UI']">
                            <button>Submit</button>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default CollectedFee