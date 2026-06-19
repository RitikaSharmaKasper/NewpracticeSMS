import { NavLink, Outlet } from "react-router-dom";

const tabs = [
  {
    name: "Class Timetable",
    path: "class",
  },
  {
    name: "Teacher Timetable",
    path: "teacher",
  },
  {
    name: "Substitution",
    path: "substitution",
  },
  {
    name: "Settings",
    path: "settings",
  },
];

const Timetable = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* HEADER */}
      <div>
        <h2 className="text-[28px] font-semibold text-[#1C1C1C]">
          Timetable Management
        </h2>

        <p className="text-[#9C9C9C] mt-1">
          Manage class schedules, teacher timetables, and substitutions
        </p>
      </div>

      {/* TABS */}
      <div className="mt-6 bg-[#FFFFFF]  rounded-full p-1 flex gap-2 px-1 py-1 scrollbar-hide sm:overflow-visible sm:justify-between shadow-[0_0_8px_rgba(0,0,0,0.15)]">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `flex-1 text-center py-2 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#0B3142] text-white"
                  : "text-[#9EA1A1] hover:bg-[#e6e6e6]"
              }`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>

      {/* PAGE CONTENT */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Timetable;
