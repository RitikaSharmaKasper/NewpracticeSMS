import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Expenses from "./Expenses";
import Revenue from "./Revenue";
import Accounts from "./Accounts";

/* GIF */
import Revenuegrowth from "../../../assets/GIF/revenuegrowth.gif";
import invoice from "../../../assets/GIF/invoicebill.gif";
import rate from "../../../assets/GIF/intrestrate.gif";

function Account() {
  const location = useLocation();

  const cardData = [
    {
      des: "Total revenue",
      number: "49,000",
      left: "",
      text: "this month",
      gif: Revenuegrowth,
    },
    {
      des: "Total Expenses",
      number: "12,500",
      left: "+ 2.1 % ",
      text: "From last month",
      gif: invoice,
    },
    {
      des: "Pending Fees",
      number: "12,500",
      left: "",
      text: "From 45 Students",
      gif: invoice,
    },
    {
      des: "Collection Rate",
      number: 10,
      progress: true,
      gif: rate,
    },
  ];

  const tabs = [
    { label: "Expenses", component: <Expenses /> },
    { label: "Revenue", component: <Revenue /> },
    { label: "Account Statement", component: <Accounts /> },
  ];

  // ✅ Set active tab from navigation state
  const [active, setActive] = useState(
    location.state?.tab || tabs[0].label
  );

  // ✅ Update tab if coming from back navigation
  useEffect(() => {
    if (location.state?.tab) {
      setActive(location.state.tab);
    }
  }, [location.state]);

  const activeTab = tabs.find((tab) => tab.label === active);

  return (
    <div>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((item, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-lg">
            <p className="font-medium text-[16px]">{item.des}</p>

            <div className="flex justify-between items-center mt-2">
              <span className="text-[28px] font-bold">
                {item.progress
                  ? `${item.number}%`
                  : index === 0
                  ? `₹ ${item.number}`
                  : item.number}
              </span>

              <img src={item.gif} className="w-12 h-12" />
            </div>

            {item.progress ? (
              <div className="mt-3 bg-gray-200 h-1 rounded-full">
                <div
                  className="h-1 bg-[#0B3142] rounded-full"
                  style={{ width: `${item.number}%` }}
                />
              </div>
            ) : (
              <p className="text-sm mt-1">
                <span className="text-green-600">{item.left}</span>{" "}
                {item.text}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="w-full bg-white rounded-full shadow-md mt-6">
        <div className="flex gap-2 px-3 py-1">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActive(tab.label)}
              className={`flex-1 py-2 rounded-full ${
                active === tab.label
                  ? "bg-[#0B3142] text-white "
                  : "text-gray-400 hover:bg-[#e6e6e6] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">{activeTab?.component}</div>
    </div>
  );
}

export default Account;