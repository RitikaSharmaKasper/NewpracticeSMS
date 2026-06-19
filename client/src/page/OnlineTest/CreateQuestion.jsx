import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Plus, CircleAlert } from "lucide-react";
import { FileInput, UserPlus, Calendar, Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import api from '../../config/axiosInstance'

/* ================= CUSTOM SELECT ================= */
const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {/* SELECT BOX */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="w-full bg-[#ffffff] border border-[#E6E6E6] rounded-xl px-4 py-3 flex justify-between items-center cursor-pointer"
      >
        <span className={value ? "text-[#1C1C1C]" : "text-[#9C9C9C]"}>
          {value || placeholder}
        </span>

        <MdOutlineArrowDropDown
          size={20}
          className={`text-[#9C9C9C] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border rounded-xl shadow z-50 max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`px-4 py-3 cursor-pointer ${
                value === opt
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

/* ================= MAIN COMPONENT ================= */

function CreateQuestion() {
  const [questionType, setQuestionType] = useState("");
  const [exam, setExam] = useState("");
  const [selected, setSelected] = useState(null);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      questionText: "",
      questionType: "",
      marks: "",
      selected: null,
      options: ["", "", "", ""],
    },
  ]);

  const [classValue, setClassValue] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [topic, setTopic] = useState("");
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      fetchSingleQuestion();
    }
  }, [id]);

  const handleAddOption = (index) => {
    const updated = [...questions];

    if (updated[index].options.length >= 6) return;

    updated[index].options.push(`Option ${updated[index].options.length + 1}`);

    setQuestions(updated);
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        questionText: "",
        questionType: "",
        marks: "",
        selected: null,
        options: ["", "", "", ""],
      },
    ]);
  };
  const fetchSingleQuestion = async () => {
    try {
      const response = await api.get(`/question/${id}`);

      const data = await response.data;

      console.log("SINGLE QUESTION:", data);

      if (data.success) {
        const questionData = data.data;

        setClassValue(questionData.classValue);
        setSection(questionData.section);
        setSubject(questionData.subject);
        setChapter(questionData.chapter);
        setTopic(questionData.topic);

        setQuestions(
          questionData.questions.map((q, index) => ({
            id: index + 1,
            questionText: q.questionText,
            questionType: q.questionType,
            marks: q.marks,
            options: q.options,
            selected:
              q.questionType === "Multiple Choice"
                ? q.options.findIndex((opt) => opt === q.correctAnswer)
                : q.correctAnswer,
          })),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveQuestion = async (statusType) => {
    try {
      const formattedQuestions = questions.map((q) => ({
        questionText: q.questionText,
        questionType: q.questionType,
        marks: Number(q.marks),
        options:
          q.questionType === "Multiple Choice" ? q.options : ["True", "False"],

        correctAnswer:
          q.questionType === "Multiple Choice"
            ? q.options[q.selected]
            : q.selected,
      }));

      const payload = {
        classValue,
        section,
        subject,
        chapter,
        topic,
        questions: formattedQuestions,
        status: statusType,
      };

      console.log("PAYLOAD:", payload);

      const response = await api.get(
        id
          ? `/question/update/${id}`
          : "/question/create",
      );

      const data = await response.data;

      console.log(data);
      if (data.success) {
        alert(
          id
            ? "Question Updated Successfully"
            : statusType === "published"
              ? "Question Published Successfully"
              : "Question Saved as Draft",
        );

        resetForm();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const resetForm = () => {
    setClassValue("");
    setSection("");
    setSubject("");
    setChapter("");
    setTopic("");

    setQuestions([
      {
        id: 1,
        questionText: "",
        questionType: "",
        marks: "",
        selected: null,
        options: ["", "", "", ""],
      },
    ]);
  };

  return (
    <div className="p-4">
      {/* BACK */}
      <div className="flex items-center gap-2 text-[18px] text-[#696969] font-semibold">
        <Link to="/question-bank" className="flex items-center gap-2">
          <IoChevronBack />
          <span>Back</span>
        </Link>
      </div>

      {/* LAYOUT */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 items-start">
        {/* LEFT SIDE */}
        <div className="w-full sm:w-[70%] p-6 shadow-lg bg-white rounded-lg">
          {/* HEADER */}
          <div className="flex flex-col gap-1">
            <span className="text-[18px] font-semibold text-[#1C1C1C]">
              Create New Question
            </span>
            <span className="text-[16px] text-[#9C9C9C]">
              Fill in the details below to create a new question
            </span>
          </div>

          {/* QUESTION */}
          {questions.map((q, index) => (
            <div key={q.id} className="mt-3">
              <span className="text-[18px] font-semibold text-[#1C1C1C]">
                Question {index + 1}
              </span>

              <div className="flex justify-between items-centermt-2">
                <div className="flex gap-1 items-center ">
                  <label className="text-[16px] text-[#9C9C9C]">
                    Question Text
                  </label>
                  <span className="text-red-500">*</span>
                </div>
                {index !== 0 && (
                  <div
                    className="text-[#DC2626] cursor-pointer"
                    onClick={() => {
                      const updated = questions.filter((_, i) => i !== index);
                      setQuestions(updated);
                    }}
                  >
                    <Trash2 size={16} />
                  </div>
                )}
              </div>

              <textarea
                value={q.questionText}
                onChange={(e) => {
                  const updated = [...questions];
                  updated[index].questionText = e.target.value;
                  setQuestions(updated);
                }}
                placeholder="Enter Your Question Here..."
                className="h-24 resize-none border border-[#E6E6E6] rounded-md px-4 py-2 w-full outline-none mt-1"
              />

              {/* SELECTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="flex gap-2 items-center">
                    <label htmlFor="chapter">Question type</label>
                    <span className="text-[14px] text-[#DC2626] font-regular">
                      *
                    </span>
                  </div>
                  <CustomSelect
                    options={["Multiple Choice", "True/False"]}
                    value={q.questionType}
                    onChange={(val) => {
                      const updated = [...questions];
                      updated[index].questionType = val;
                      updated[index].selected = null;
                      setQuestions(updated);
                    }}
                    placeholder="Select Question Type"
                  />
                </div>

                <div>
                  <div className="flex gap-2 items-center">
                    <label htmlFor="marks">Marks</label>
                    <span className="text-[14px] text-[#DC2626] font-regular">
                      *
                    </span>
                  </div>
                  <input
                    type="number"
                    value={q.marks}
                    onChange={(e) => {
                      const updated = [...questions];
                      updated[index].marks = e.target.value;
                      setQuestions(updated);
                    }}
                    className="w-full border border-[#E6E6E6] rounded-lg px-4 py-3 outline-none mt-1"
                    id="marks"
                    placeholder="Enter Marks"
                  />
                </div>
              </div>

              {/* OPTIONS */}
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <span className="text-[18px] text-[#1C1C1C] font-semibold">
                    Answer Option
                  </span>
                  <button
                    onClick={() => handleAddOption(index)}
                    disabled={q.options.length >= 6}
                    className={`flex items-center gap-2 ${
                      q.options.length >= 6
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-[#007AFF]"
                    }`}
                  >
                    <Plus size={16} />
                    Add Option
                  </button>
                </div>
                <div className="flex flex-col gap-3 mt-3">
                  {/* MCQ */}
                  {q.questionType === "Multiple Choice" &&
                    q.options.map((opt, optIndex) => (
                      <div
                        key={optIndex}
                        className={`flex items-center gap-3 border rounded-xl px-4 py-3 ${
                          q.selected === optIndex
                            ? "border-blue-500 bg-blue-50"
                            : "bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          className="accent-blue-500"
                          checked={q.selected === optIndex}
                          onChange={() => {
                            const updated = [...questions];
                            updated[index].selected = optIndex;
                            setQuestions(updated);
                          }}
                        />

                        <input
                          type="text"
                          value={opt}
                          placeholder={`Option ${optIndex + 1}`}
                          onChange={(e) => {
                            const updated = [...questions];
                            updated[index].options[optIndex] = e.target.value;
                            setQuestions(updated);
                          }}
                          className="flex-1 bg-transparent outline-none"
                        />
                      </div>
                    ))}

                  {/* TRUE / FALSE */}
                  {q.questionType === "True/False" &&
                    ["True", "False"].map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer ${
                          q.selected === opt
                            ? "border-blue-500 bg-white"
                            : "bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          checked={q.selected === opt}
                          onChange={() => {
                            const updated = [...questions];
                            updated[index].selected = opt;
                            setQuestions(updated);
                          }}
                        />
                        {opt}
                      </label>
                    ))}
                </div>
              </div>
            </div>
          ))}

          <div className="w-full p-2 bg-[#EFF6FF] border border-[#BEDBFF] mt-4 rounded-lg text-[#1E40AF] font-medium text-[14px] flex items-center gap-2">
            <span className="flex items-center gap-2">
              <CircleAlert size={16} />
              Select the radio Button next to the correct answer option
            </span>
          </div>
          <div className="mt-4 w-full p-2 bg-[#0B3142] rounded-lg text-[#FFFFFF] font-medium text-[14px]">
            <span
              className="flex justify-center gap-2 cursor-pointer"
              onClick={handleAddQuestion}
            >
              <Plus size={22} />
              Add More Question
            </span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full sm:w-[30%]">
          <div className="shadow-lg bg-white rounded-lg p-4">
            <span className="font-semibold">Academic Mapping</span>

            <div className="mt-4 flex flex-col gap-4">
              <div>
                <div className="flex gap-2 items-center">
                  <label htmlFor="class">Class</label>
                  <span className="text-[14px] text-[#DC2626] font-regular">
                    *
                  </span>
                </div>
                <CustomSelect
                  options={["10th", "11th", "12th"]}
                  value={classValue}
                  onChange={setClassValue}
                  placeholder="Select class"
                />
              </div>

              <div>
                <div className="flex gap-2 items-center">
                  <label htmlFor="section">Section</label>
                  <span className="text-[14px] text-[#DC2626] font-regular">
                    *
                  </span>
                </div>
                <CustomSelect
                  options={["A", "B", "C", "D"]}
                  value={section}
                  onChange={setSection}
                  placeholder="Select section"
                />
              </div>

              <div>
                <div className="flex gap-2 items-center">
                  <label htmlFor="chapter">Subject</label>
                  <span className="text-[14px] text-[#DC2626] font-regular">
                    *
                  </span>
                </div>
                <CustomSelect
                  options={["Science", "Commerce"]}
                  value={subject}
                  onChange={setSubject}
                  placeholder="Select stream"
                />
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <label htmlFor="chapter">Chapter</label>
                  {/* <span className="text-[14] text-[#DC2626] font-regular">
                    *
                  </span> */}
                </div>
                <input
                  type="text"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  placeholder="Enter Chapter Name"
                  className="w-full border border-[#E6E6E6] rounded-lg px-4 py-3 outline-none mt-1"
                />
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <label htmlFor="chapter">Topic</label>
                  {/* <span className="text-[14] text-[#DC2626] font-regular">
                    *
                  </span> */}
                </div>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter Topic Name"
                  className="w-full border border-[#E6E6E6] rounded-lg px-4 py-3 outline-none mt-1"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 bg-white rounded-lg p-4 shadow-lg">
            <span className="text-[18px] font-semibold text-[#1C1C1C]">
              Actions
            </span>
            <div className="mt-4 flex flex-col gap-3">
              <button
                onClick={() => handleSaveQuestion("published")}
                className="w-full p-2 bg-[#0B3142] rounded-lg text-[#FFFFFF] font-medium text-[14px]"
              >
                Save & Publish
              </button>
              <button
                onClick={() => handleSaveQuestion("draft")}
                className="w-full p-2 border border-[#696969] rounded-lg text-[#696969] font-medium text-[14px]"
              >
                Save as Draft
              </button>
              <button className="w-full p-2 bg-[#E6E6E6] rounded-lg text-[#1C1C1C] font-medium text-[14px]">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateQuestion;
