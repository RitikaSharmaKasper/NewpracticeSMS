import { Award } from "lucide-react";
import React from "react";
import { LuArrowDownUp } from "react-icons/lu";

// demo data
const studentPerformance = [
  {
    rank: 1,
    name: "Anushka Sharma",
    studentId: "STUD-0001",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    marks: 559,
    percentage: "93.17%",
    grade: "A+",
    status: "Pass",
  },
  {
    rank: 2,
    name: "Ranveer Singh",
    studentId: "STUD-0002",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    marks: 557,
    percentage: "92.83%",
    grade: "A+",
    status: "Pass",
  },
  {
    rank: 3,
    name: "Kareena Kapoor",
    studentId: "STUD-0003",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    marks: 493,
    percentage: "82.17%",
    grade: "A",
    status: "Pass",
  },
  {
    rank: 4,
    name: "Shraddha Kapoor",
    studentId: "STUD-0004",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    marks: 492,
    percentage: "82.00%",
    grade: "A",
    status: "Pass",
  },
  {
    rank: 5,
    name: "Hrithik Roshan",
    studentId: "STUD-0005",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
    marks: 419,
    percentage: "69.83%",
    grade: "B",
    status: "Pass",
  },
  {
    rank: 6,
    name: "Virat Kohli",
    studentId: "STUD-0006",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    marks: 417,
    percentage: "69.50%",
    grade: "B",
    status: "Pass",
  },
  {
    rank: 7,
    name: "Alia Bhatt",
    studentId: "STUD-0007",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    marks: 381,
    percentage: "63.50%",
    grade: "B",
    status: "Pass",
  },
  {
    rank: 8,
    name: "Pooja Hegde",
    studentId: "STUD-0008",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    marks: 343,
    percentage: "57.17%",
    grade: "C",
    status: "Pass",
  },
  {
    rank: 9,
    name: "Salman Khan",
    studentId: "STUD-0009",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    marks: 260,
    percentage: "43.33%",
    grade: "D",
    status: "Pass",
  },
  {
    rank: 10,
    name: "Deepika Padukone",
    studentId: "STUD-0010",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    marks: 258,
    percentage: "43.00%",
    grade: "D",
    status: "Pass",
  },
];

const StudentPerformance = () => {
  return (
    <div className="w-full overflow-x-auto border border-[#E6E6E6] rounded-xl bg-white">
      <table className="w-full text-sm">
        <thead className=" text-[#1C1C1C]">
          <tr>
            <th className="px-6 py-3 text-left font-semibold">
              <div className="flex items-center gap-1">
                <LuArrowDownUp className="text-[#9C9C9C] w-4 h-4" />
                Rank
              </div>
            </th>

            <th className="px-6 py-3 text-left font-semibold">
              <div className="flex items-center gap-1">
                <LuArrowDownUp className="text-[#9C9C9C] w-4 h-4" />
                Student
              </div>
            </th>

            <th className="px-6 py-3 text-center font-semibold">
              <div className="flex items-center justify-center gap-1">
                {/* <LuArrowDownUp className="text-[#9C9C9C] w-4 h-4" /> */}
                Marks
              </div>
            </th>

            <th className="px-6 py-3 text-center font-semibold">
              <div className="flex items-center justify-center gap-1">
                <LuArrowDownUp className="text-[#9C9C9C] w-4 h-4" />
                Percentage
              </div>
            </th>

            <th className="px-6 py-3 text-center font-semibold">
              <div className="flex items-center justify-center gap-1">
                {/* <LuArrowDownUp className="text-[#9C9C9C] w-4 h-4" /> */}
                Grade
              </div>
            </th>

            <th className="px-6 py-3 text-center font-semibold">
              <div className="flex items-center justify-center gap-1">
                {/* <LuArrowDownUp className="text-[#9C9C9C] w-4 h-4" /> */}
                Status
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {studentPerformance.map((item) => (
            <tr
              key={item.rank}
              className="border-t border-[#E6E6E6] hover:bg-[#FAFAFA] transition"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {item.rank === 1 ? (
                    <Award size={18} className="text-[#F4B400]" />
                  ) : item.rank === 2 ? (
                    <Award size={18} className="text-[#9AA0A6]" />
                  ) : item.rank === 3 ? (
                    <Award size={18} className="text-[#FF6B00]" />
                  ) : null}

                  <span className="text-[#1C1C1C] font-medium">
                    {item.rank <= 3 ? `${item.rank}` : `#${item.rank}`}
                  </span>
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div className="flex flex-col">
                    <span className="font-semibold text-[#12516E] text-sm">
                      {item.name}
                    </span>
                    <span className="text-xs text-[#9C9C9C]">
                      {item.studentId}
                    </span>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-center font-medium text-[#1C1C1C]">
                {item.marks}
              </td>

              <td className="px-6 py-4 text-center text-[#1C1C1C]">
                {item.percentage}
              </td>

              <td className="px-6 py-4 text-center">
                <span
                  className={`inline-flex min-w-[48px] justify-center px-3 py-1 rounded-md text-xs font-semibold text-white ${
                    item.grade === "A+"
                      ? "bg-[#009638]"
                      : item.grade === "A"
                        ? "bg-[#00B050]"
                        : item.grade === "B"
                          ? "bg-[#007BFF]"
                          : item.grade === "C"
                            ? "bg-[#FF6B00]"
                            : "bg-[#9C9C9C]"
                  }`}
                >
                  {item.grade}
                </span>
              </td>

              <td className="px-6 py-4 text-center">
                <span
                  className={`inline-flex min-w-[58px] justify-center px-3 py-1 rounded-md text-xs font-medium ${
                    item.status === "Pass"
                      ? "bg-[#D4F4DD] text-[#009638]"
                      : "bg-[#FFE2E2] text-[#FF0000]"
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentPerformance;
