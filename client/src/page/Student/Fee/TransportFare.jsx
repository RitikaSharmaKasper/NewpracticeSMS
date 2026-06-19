import React, { useState } from "react";
import Pagination from "../../../components/Pagination";
{
  /* <<========================------- icons -------==========================>> */
}
import { FiEdit } from "react-icons/fi";

function TransportFare() {
  const [editIndex, setEditIndex] = useState(null);

  const [feeStructure, setFeeStructure] = useState([

    {
      Route: "Avengers Route",
      PickupPoint: "Stark Tower",
      Distance: "8 Km",
      TotalAmount: "₹2,500",
      MonthlyAmount: "₹210",
    },
    {
      Route: "Batman Route",
      PickupPoint: "Wayne Manor",
      Distance: "12 Km",
      TotalAmount: "₹3,200",
      MonthlyAmount: "₹267",
    },
    {
      Route: "Superman Route",
      PickupPoint: "Daily Planet",
      Distance: "10 Km",
      TotalAmount: "₹2,800",
      MonthlyAmount: "₹233",
    },
    {
      Route: "Spider-Man Route",
      PickupPoint: "Queens Station",
      Distance: "6 Km",
      TotalAmount: "₹2,000",
      MonthlyAmount: "₹167",
    },
    {
      Route: "Wonder Woman Route",
      PickupPoint: "Themyscira Gate",
      Distance: "15 Km",
      TotalAmount: "₹3,800",
      MonthlyAmount: "₹317",
    },
    {
      Route: "Flash Route",
      PickupPoint: "Central City",
      Distance: "4 Km",
      TotalAmount: "₹1,500",
      MonthlyAmount: "₹125",
    },
    {
      Route: "Green Lantern Route",
      PickupPoint: "Oa Junction",
      Distance: "18 Km",
      TotalAmount: "₹4,000",
      MonthlyAmount: "₹333",
    },
  ]);

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
      {/* <-------------====== Header ------------=======> */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
        {/* LEFT CONTENT */}
        <div>
          <p className="flex flex-col font-[Segoe UI]">
            <span className="text-[16px] md:text-[18px] text-[#1c1c1c] font-semibold">
              Transport Fare
            </span>
            <span className="text-sm text-[#696969] font-[Segoe UI]">
              Route & stop wise transport fare Configration
            </span>
          </p>
        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex gap-3">
          <button className="px-5 bg-[#ffffff]] font-semibold text-[#696969] text-[16px] border border-[#9C9C9C] rounded-lg font-[Segoe UI]">
            Cancel
          </button>

          <button className="flex items-center gap-2 px-6 py-3 bg-[#0B3142] text-white font-semibold text-[16px] border border-[#0B3142] rounded-lg font-[Segoe UI]">
            Update
          </button>
        </div>
      </div>

      {/* <-------------------------------------- search & filter ------------------------------> */}
      <div className="mt-6 flex items-center gap-28">
        {/* SEARCH */}
        <div className="flex-1">
          <span></span>
          <input
            type="search"
            placeholder="🔎︎ Search Student by name or admission Number..."
            className="w-full bg-[#EEEEEE] rounded-lg px-4 py-2"
          />
        </div>

        {/* FILTER BUTTONS */}
        {/* <div className="flex items-center gap-2">
          <label For="status"></label>
          <div className="bg-[#EFF2F2] rounded px-1 py-1">
            <select
              name=""
              id="status"
              className="bg-[#EFF2F2] rounded px-1 py-1 border-0 outline-0 text-[14px] font-normal text-[#1c1c1c]"
            >
              <option value="">Class</option>
              <option value="">Class 1</option>
              <option value="">Class 2</option>
              <option value="">Class 3</option>
              <option value="">Class 4</option>
              <option value="">Class 5</option>
              <option value="">Class 6</option>
              <option value="">Class 7</option>
              <option value="">Class 8</option>
              <option value="">Class 9</option>
              <option value="">Class 10</option>
              <option value="">Class 11</option>
              <option value="">Class 12</option>
            </select>
          </div>
        </div> */}
      </div>

      {/* <================================= Table ==================================> */}
      <div className="mt-8 border border-[#e6e6e6] rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e6e6e6]">
              <th className="px-5 py-4 text-left text-[14px] text-[#1c1c1c] font-semibold font-[Segoe UI]">
                Route
              </th>
              <th className="px-5 py-4 text-left text-[14px] text-[#1c1c1c] font-semibold font-[Segoe UI]">
                Pickup Point
              </th>
              <th className="px-5 py-4 text-left text-[14px] text-[#1c1c1c] font-semibold font-[Segoe UI]">
                Distance
              </th>
              <th className="px-5 py-4 text-left text-[14px] text-[#1c1c1c] font-semibold font-[Segoe UI]">
                Total Amount
              </th>
              <th className="px-5 py-4 text-left text-[14px] text-[#1c1c1c] font-semibold font-[Segoe UI]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {feeStructure.map((item, index) => (
              <tr key={index} className="border-b border-[#e6e6e6]">
                <td className="px-4 py-3 text-left font-normal text-[#12516E] text-[14px]">
                  {item.Route}
                </td>
                <td className="px-4 py-3 text-left font-normal text-[14px] text-[#1c1c1c]">
                  {item.PickupPoint}
                </td>
                <td className="px-4 py-3 text-left font-normal text-[14px] text-[#1c1c1c]">
                  {item.Distance}
                </td>
                <td className="px-4 py-3">
                  {editIndex === index ? (
                    <div className="border border-[#97A3D0] px-3 py-1 rounded-md bg-[#FAFBFF]">
                      <input
                        type="text"
                        value={item.TotalAmount}
                        onChange={(e) => {
                          const updated = [...feeStructure];
                          updated[index].TotalAmount = e.target.value;
                          setFeeStructure(updated);
                        }}
                        className="w-full outline-none border-none bg-transparent"
                      />
                    </div>
                  ) : (
                    <span>{item.TotalAmount}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-left flex gap-3">
                  <span onClick={() => setEditIndex(index)} className="cursor-pointer">
                    <FiEdit className="w-5 h-5 text-[#9C9C9C]" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <------------------------------------------- pagination ---------------------------------> */}
      <Pagination />
    </div>
  )
}

export default TransportFare