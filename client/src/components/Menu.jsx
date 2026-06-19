// import React, { useState, useEffect } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar/Navbar";
// import Sidebar from "../components/Sidebar/Sidebar";

// function Menu() {
//   const [openSidebar, setOpenSidebar] = useState(false);
//   const { pathname } = useLocation();

//   // Close sidebar on route change
//   useEffect(() => {
//     setOpenSidebar(false);
//   }, [pathname]);

//   // Lock body scroll when sidebar open
//   useEffect(() => {
//     if (openSidebar) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => (document.body.style.overflow = "");
//   }, [openSidebar]);

//   return (
//     <div >
      
//       {/* Navbar */}
//       <div className="shadow">
//         <Navbar
//           onToggleSidebar={() => setOpenSidebar(v => !v)}
//           isSidebarOpen={openSidebar}
//         />
//       </div>

//       <div className="flex items-center relative">
        
//         {/* Sidebar */}
//          <aside className={`sidebar-left ${openSidebar ? "is-open" : ""}`}>
//           <Sidebar />
//         </aside>

//         {/* Backdrop */}
//         {openSidebar && (
//           <div
//             className="sidebar-backdrop"
//             onClick={() => setOpenSidebar(false)}
//           />
//         )}

//         {/* Content */}
//         <main className="sidebar-right">
//           <Outlet />
//         </main>

//       </div>
//     </div>
//   );
// }

// export default Menu;

import React, { useState, useEffect } from "react";
import { Outlet, useLocation,useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import api from "../config/axiosInstance";
import {useAuth} from "../context/AuthContext";

function Menu() {
   const navigate = useNavigate();
  const {logout} = useAuth();
  const [openSidebar, setOpenSidebar] = useState(false);
  const { pathname } = useLocation();
  const [showLogout, setShowLogout] = useState(false);


  useEffect(() => {
    setOpenSidebar(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = openSidebar ? "hidden" : "";
    return () => (document.body.style.overflow =  openSidebar ? " hidden" : "");
  }, [openSidebar]);

  const handleLogout = async () => {
  try {
    await logout(); // only this
    navigate("/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

  return (
    <div className="flex h-screen bg-gray-100">

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
          fixed lg:static z-50
          h-screen w-64 bg-white 
          transform transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <Sidebar onLogoutClick={() => setShowLogout(true)} />
      </aside>

      {/* ===== RIGHT AREA ===== */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* NAVBAR (STARTS AFTER SIDEBAR) */}
        <div className="sticky top-0 z-30 bg-white">
          <Navbar
            onToggleSidebar={() => setOpenSidebar(v => !v)}
            isSidebarOpen={openSidebar}
            onLogoutClick={() => setShowLogout(true)}
          />
        </div>

        {/* PAGE CONTENT */}
        <main className="
    flex-1 overflow-y-auto min-w-0
    px-3 py-4
    sm:px-4 sm:py-4
    md:px-6 md:py-6
  ">
          <Outlet />
        </main>
      </div>
      {/* logout */}
       {showLogout && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
    <div className="bg-white p-6 rounded-lg shadow-lg">
       <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: '100%'
                }}
              >
                <span
                  style={{
                    margin: 0,
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#1F2937",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Confirm Logout
                </span>
              </div>
      <p className="text-lg font-medium">Are you sure you want to logout?</p>

      <div className="flex gap-3 mt-4 justify-end">
        <button
          onClick={() => setShowLogout(false)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)}

      {/* ===== BACKDROP (MOBILE ONLY) ===== */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpenSidebar(false)}
        />
      )}
    </div>
  );
}

export default Menu;
