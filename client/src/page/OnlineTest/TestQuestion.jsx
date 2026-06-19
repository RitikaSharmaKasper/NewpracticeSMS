import React from "react";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

const SCORE_COLORS = [{ min: 0, className: "text-[#009638]" }];

const getScoreColor = (score, maxScore) => {
  if (!maxScore || maxScore <= 0) return "text-gray-400";

  const percentage = (score / maxScore) * 100;

  return SCORE_COLORS.find((item) => percentage >= item.min)?.className;
};

const ScoreDisplay = ({ score = 0, maxScore = 0, showLabel = false }) => {
  return (
    <div className="flex items-center gap-2">
      {showLabel && (
        <span className="text-[#1C1C1C] font-semibold text-[18px]">
          Total Marks
        </span>
      )}

      <span className="text-[16px] font-semibold">
        <span className={`${getScoreColor(score, maxScore)} mr-1`}>
          {score}
        </span>
        <span className="text-gray-400 text-sm">/ {maxScore}</span>
      </span>
    </div>
  );
};

function TestQuestion() {
  const score = 15;
  const maxScore = 30;

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 text-[18px] text-[#696969] font-semibold">
        <Link to="/question-bank" className="flex items-center gap-2">
          <IoChevronBack />
          <span>Back</span>
        </Link>
      </div>

      {/* 📦 Card */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <span className="text-[18px] font-semibold text-[#1C1C1C]">
            Questions
          </span>

          {/* 🎯 Score */}
          <ScoreDisplay score={score} maxScore={maxScore} showLabel={true} />
        </div>

        <div className="mt-4">
          <div className="border px-3 py-5 border-[#E6E6E6] rounded-lg">
            <div className="flex items-center gap-2">
              <span className="bg-[#DBEAFE] rounded-full h-8 w-8 flex items-center justify-center text-[#1447E6] font-semibold text-sm">
                1
              </span>
              <span className="text-[#12516E] font-semibold text-[16px]">
                Which is not a fruit ?
              </span>
            </div>
            <div className="flex flex-col gap-2 ml-10 mt-2">
              <span className="flex items-center gap-2">
                <input type="checkbox" />
                Carrot
              </span>
              <span className="flex items-center gap-2">
                <input type="checkbox" />
                Tomato
              </span>
              <span className="flex items-center gap-2">
                <input type="checkbox" name="" id="" />
                Apple
              </span>
              <span className="flex items-center gap-2">
                <input type="checkbox" name="" id="" />
                Pea
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestQuestion;
