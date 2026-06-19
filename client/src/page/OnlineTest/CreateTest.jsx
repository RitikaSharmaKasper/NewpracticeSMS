import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { MdAutoFixHigh } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { FaRegFileLines } from "react-icons/fa6";
import { LuTrash2 } from "react-icons/lu";
import { SlidersHorizontal } from "lucide-react";
import api from "../../config/axiosInstance";

{
  /* ===========------ CUSTOM SELECT ------=========== */
}
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

{
  /* ================= MAIN COMPONENT ================= */
}
function CreateTest() {
  const { id } = useParams();
  const [selectedClass, setSelectedClass] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [addShowQuestion, setAddShowQuestion] = useState(false);
  const [autoAddQuestion, setAutoAddQuestion] = useState(false);
  const [chapter, setChapter] = useState("");
  const [topic, setTopic] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [selectedRules, setSelectedRules] = useState([]);

  // Dynamic options fetched from API
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  const chapterOptions = ["Chapter 1", "Chapter 2", "Chapter 3"];
  const topicOptions = ["Algebra", "Trigonometry", "Geometry"];
  const questionTypeOptions = ["MCQ", "Subjective", "True/False"];
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const examRules = [
    {
      id: 1,
      name: "Auto-Submit when time expires",
      description: "Automatically Submit the exam when the timer reaches zero",
    },
    {
      id: 2,
      name: "Require fullscreen mode",
      description:
        "Students must stay in fullscreen mode while taking the exam",
    },
    {
      id: 3,
      name: "Randomize question order",
      description: "Questions will appear in a random order for each student",
    },
    {
      id: 4,
      name: "Allow marks for review",
      description: "Students can mark questions to review later",
    },
  ];

  const [testData, setTestData] = useState({
    testName: "",
    testDate: "",
    startTime: "",
    endTime: "",
    duration: "",
  });

  const testSummary = [
    {
      title: "Test Name",
      detail: testData.testName,
    },
    {
      title: "Class",
      detail: selectedClass,
    },
    {
      title: "Subject",
      detail: subject,
    },
    {
      title: "Total Questions",
      detail: selectedQuestions.length,
    },
    {
      title: "Total Marks",
      detail: selectedQuestions.reduce(
        (total, question) => total + question.marks,
        0,
      ),
    },
    {
      title: "Test Date",
      detail: testData.testDate,
    },
    {
      title: "Start Time",
      detail: testData.startTime,
    },
    {
      title: "End Time",
      detail: testData.endTime,
    },
    {
      title: "Duration",
      detail: testData.duration,
    },
  ];

  const [addQuestion, setAddQuestion] = useState([]);

  useEffect(() => {
    fetchQuestions();
    fetchClasses();
    fetchSections();
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (id && addQuestion.length > 0) {
      fetchSingleTest();
    }
  }, [id, addQuestion]);

  // -------- Fetch Classes --------
  const fetchClasses = async () => {
    try {
      const response = await api.get("/classes");
      if (response.data.success) {
        const options = response.data.data.map((cls) => cls.className);
        setClassOptions([...new Set(options)]);
      }
    } catch (error) {
      console.log("Fetch Classes Error:", error);
    }
  };

  // -------- Fetch Sections --------
  const fetchSections = async () => {
    try {
      const response = await api.get("/classes");
      if (response.data.success) {
        const options = response.data.data.map((cls) => cls.section);
        setSectionOptions([...new Set(options)]);
      }
    } catch (error) {
      console.log("Fetch Sections Error:", error);
    }
  };

  // -------- Fetch Subjects --------
  const fetchSubjects = async () => {x`x`
    try {
      const response = await api.get("/subjects/AllSubjects");
      if (response.data.success) {
        const options = response.data.data.map((sub) => sub.subjectName);
        setSubjectOptions(options);
      }
    } catch (error) {
      console.log("Fetch Subjects Error:", error);
    }
  };

  const handleCreateTest = async (status) => {
    try {
      const payload = {
        testName: testData.testName,
        className: selectedClass,
        section: section,
        subject: subject,
        testDate: testData.testDate,
        startTime: testData.startTime,
        endTime: testData.endTime,
        duration: testData.duration,
        examRules: selectedRules,
        questions: selectedQuestions.map((q) => ({
          questionId: q.questionId,
          marks: q.marks,
        })),
        status: status,
      };

      console.log("Payload:", payload);

      const response = id
        ? await api.put(`/tests/${id}`, payload)
        : await api.post("/tests/create", payload);

      const data = response.data;

      console.log("Response:", data);

      if (data.success) {
        alert(
          status === "published"
            ? "Test Published Successfully"
            : "Draft Saved Successfully",
        );
        // RESET INPUTS
        setTestData({
          testName: "",
          testDate: "",
          startTime: "",
          endTime: "",
          duration: "",
        });

        // RESET SELECT FIELDS
        setSelectedClass("");
        setSection("");
        setSubject("");

        // RESET QUESTIONS
        setSelectedQuestions([]);

        // RESET RULES
        setSelectedRules([]);

        // RESET FILTERS
        setChapter("");
        setTopic("");
        setQuestionType("");

        setAddShowQuestion(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Create Test Error:", error);
      alert("Something went wrong");
    }
  };

  const handleRuleChange = (ruleName) => {
    setSelectedRules((prev) => {
      const exists = prev.find((rule) => rule.name === ruleName);

      if (exists) {
        return prev.filter((rule) => rule.name !== ruleName);
      }

      return [
        ...prev,
        {
          name: ruleName,
          enabled: true,
        },
      ];
    });
  };

  const fetchQuestions = async () => {
    try {
      const response = await api.get("/question/all");

      const data = await response.data;

      console.log("QUESTIONS:", data);

      if (data.success) {
        const formattedQuestions = [];

        data.data.forEach((item) => {
          item.questions.forEach((q) => {
            formattedQuestions.push({
              _id: q._id,
              question: q.questionText,
              questionType: q.questionType,
              subject: item.subject,
              marks: q.marks,
            });
          });
        });

        setAddQuestion(formattedQuestions);
      }
    } catch (error) {
      console.log("Fetch Question Error:", error);
    }
  };

  const fetchSingleTest = async () => {
    try {
      const response = await api.get(`/tests/${id}`);

      const data = response.data;

      if (data.success) {
        const test = data.data;

        setTestData({
          testName: test.testName || "",
          testDate: test.testDate ? test.testDate.split("T")[0] : "",
          startTime: test.startTime || "",
          endTime: test.endTime || "",
          duration: test.duration || "",
        });

        setSelectedClass(test.className || "");
        setSection(test.section || "");
        setSubject(test.subject || "");
        setSelectedRules(test.examRules || []);

        const formattedQuestions = test.questions.map((q) => {
          const matchedQuestion = addQuestion.find(
            (item) => item._id === q.questionId,
          );

          return {
            questionId: q.questionId,
            marks: q.marks,
            question: matchedQuestion?.question || "",
            questionType: matchedQuestion?.questionType || "",
            subject: matchedQuestion?.subject || "",
          };
        });

        setSelectedQuestions(formattedQuestions);
      }
    } catch (error) {
      console.log("Fetch Single Test Error:", error);
    }
  };

  const handleAddQuestion = (question) => {
    const exists = selectedQuestions.find(
      (item) => item.questionId === question._id,
    );

    if (exists) {
      return;
    }

    setSelectedQuestions((prev) => [
      ...prev,
      {
        questionId: question._id,
        marks: question.marks,
        question: question.question,
        questionType: question.questionType,
        subject: question.subject,
      },
    ]);
  };

  const handleGenerateQuestions = async () => {
    try {
      setIsGenerating(true);

      // fake loading for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // example auto generated questions
      const generatedQuestions = addQuestion.slice(0, 5);

      setSelectedQuestions((prev) => {
        const existingIds = prev.map((q) => q.questionId);

        const newQuestions = generatedQuestions
          .filter((q) => !existingIds.includes(q._id))
          .map((q) => ({
            questionId: q._id,
            question: q.question,
            questionType: q.questionType,
            subject: q.subject,
            marks: q.marks,
          }));

        return [...prev, ...newQuestions];
      });

      setAutoAddQuestion(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handelDeleteQuestion = (questionId) => {
    setSelectedQuestions((prev) =>
      prev.filter((item) => item.questionId !== questionId),
    );
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 text-[18px] text-[#696969] font-semibold">
        <Link to="/test-paper" className="flex items-center gap-2">
          <IoChevronBack />
          <span>Back</span>
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-6 items-start md:flex-row">
        <div className="md:w-full lg:w-[70%] w-full">
          <div className="w-full p-6 shadow-lg bg-white rounded-lg">
            <div className="flex flex-col">
              <span className="text-[#1C1C1C] font-semibold text-lg">
                Create Test
              </span>
              <span className="text-[16px] text-[#9C9C9C]">
                Create and manage test paper.
              </span>
            </div>
            <div className="text-[#1C1C1C] font-semibold text-lg mt-4">
              <span>Paper Details</span>
            </div>
            <div className="mt-4">
              <div className="flex gap-1 items-center">
                <label
                  htmlFor="Testname"
                  className="text-[#0A0A0A] font-regular mb-2"
                >
                  Test Name
                </label>
                <span className="text-[14px] font-regular text-red-500">*</span>
              </div>
              <input
                type="text"
                id="Testname"
                placeholder="Enter Your Test Name here...."
                value={testData.testName}
                onChange={(e) =>
                  setTestData({
                    ...testData,
                    testName: e.target.value,
                  })
                }
                className="w-full border border-[#E6E6E6] rounded-md py-3 px-4 outline-none"
              />
            </div>
            {/* CustomSelect */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6">
              {/* CLASS */}
              <div>
                <label className="text-sm text-gray-600">Class</label>
                <CustomSelect
                  options={classOptions}
                  value={selectedClass}
                  onChange={setSelectedClass}
                  placeholder="Select Class"
                />
              </div>

              {/* SECTION */}
              <div>
                <label className="text-sm text-gray-600">Section</label>
                <CustomSelect
                  options={sectionOptions}
                  value={section}
                  onChange={setSection}
                  placeholder="Select Section"
                />
              </div>

              {/* SUBJECT */}
              <div>
                <label className="text-sm text-gray-600">Subject</label>
                <CustomSelect
                  options={subjectOptions}
                  value={subject}
                  onChange={setSubject}
                  placeholder="Select Subject"
                />
              </div>
            </div>
          </div>

          <div className="w-full p-6 shadow-lg bg-white rounded-lg mt-4">
            <div className="text-[#1C1C1C] font-semibold text-lg">
              <span>Exam Rules</span>
            </div>
            <div className="mt-4"></div>
            <div className="text-[#1C1C1C] font-semibold text-lg mt-4">
              <span>Schedule Date & Time</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-2">
              <div>
                <div className="flex gap-2 items-center">
                  <label htmlFor="testDate">Test Date</label>
                  <span className="text-[14px] text-[#DC2626] font-regular">
                    *
                  </span>
                </div>
                <input
                  type="date"
                  id="testDate"
                  value={testData.testDate}
                  onChange={(e) =>
                    setTestData({
                      ...testData,
                      testDate: e.target.value,
                    })
                  }
                  className="w-full border border-[#E6E6E6] rounded-lg px-4 py-3 outline-none mt-1"
                />
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <label htmlFor="testTime">Start Time</label>
                  <span className="text-[14px] text-[#DC2626] font-regular">
                    *
                  </span>
                </div>
                <input
                  type="time"
                  id="testTime"
                  value={testData.startTime}
                  onChange={(e) =>
                    setTestData({
                      ...testData,
                      startTime: e.target.value,
                    })
                  }
                  className="w-full border border-[#E6E6E6] rounded-lg px-4 py-3 outline-none mt-1"
                />
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <label htmlFor="endTime">End Time</label>
                  <span className="text-[14px] text-[#DC2626] font-regular">
                    *
                  </span>
                </div>
                <input
                  type="time"
                  id="endTime"
                  value={testData.endTime}
                  onChange={(e) =>
                    setTestData({
                      ...testData,
                      endTime: e.target.value,
                    })
                  }
                  className="w-full border border-[#E6E6E6] rounded-lg px-4 py-3 outline-none mt-1"
                />
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <label htmlFor="duration">Duration</label>
                  <span className="text-[14px] text-[#DC2626] font-regular">
                    *
                  </span>
                </div>
                <input
                  type="number"
                  id="duration"
                  placeholder="Enter Duration in Minutes"
                  value={testData.duration}
                  onChange={(e) =>
                    setTestData({
                      ...testData,
                      duration: e.target.value,
                    })
                  }
                  className="w-full border border-[#E6E6E6] rounded-lg px-4 py-3 outline-none mt-1"
                />
              </div>
            </div>
          </div>

          <div className="w-full p-6 shadow-lg bg-white rounded-lg mt-4">
            <div className="text-[#1C1C1C] font-semibold text-lg">
              <span>Exam Rules & Settings</span>
            </div>
            {/* RULES */}
            {examRules.map((rule) => (
              <div className="flex flex-col mt-2">
                <div key={rule._id} className="flex gap-4 items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#0077AA] cursor-pointer"
                    checked={selectedRules.some(
                      (item) => item.name === rule.name,
                    )}
                    onChange={() => handleRuleChange(rule.name)}
                  />
                  <div className="flex flex-col">
                    <span className="text-[#1F1F1F] font-regular text-[16px]">
                      {rule.name}
                    </span>
                    <span className="text-[#6B7280] font-regular text-[14px]">
                      {rule.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full p-6 shadow-lg bg-white rounded-lg mt-4">
            <div className="flex items-center justify-between">
              <div className="text-[18px] text-[#1C1C1C] font-semibold">
                Questions
              </div>
              <div className="flex gap-4 items-center">
                <button
                  className="border border-[#9C9C9C] rounded-lg px-6 py-3"
                  onClick={() => setAddShowQuestion(true)}
                >
                  <span className="text-[#696969] text-[16px] font-semibold flex items-center gap-2">
                    <IoMdAdd size={18} />
                    Add Question
                  </span>
                </button>
                <button
                  className="border border-[#9C9C9C] rounded-lg px-6 py-3 bg-[#0B3142]"
                  onClick={() => setAutoAddQuestion(true)}
                >
                  <span className="text-white text-[16px] font-semibold flex items-center gap-2">
                    <MdAutoFixHigh size={18} />
                    Auto Generate
                  </span>
                </button>
              </div>
            </div>
            {selectedQuestions.length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-16">
                <div className="rounded-full bg-[#F3F4F6] flex items-center justify-center p-5">
                  <FaRegFileLines size={34} className="text-[#9CA3AF]" />
                </div>
                <span className="mt-5 text-[18px] font-semibold text-[#111827]">
                  No questions added yet
                </span>
                <p className="mt-2 text-[16px] text-[#4B5563]">
                  Start building your exam paper by adding questions
                </p>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-4 max-h-[420px] overflow-y-auto pr-2">
                {selectedQuestions.map((item, index) => (
                  <div
                    key={index}
                    className="border border-[#E6E6E6] rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-3">
                        <span className="text-[16px] font-semibold text-[#12516E]">
                          {item.question}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="bg-[#E6E6E6] rounded px-2 py-1 text-[#696969] uppercase">
                            {item.questionType}
                          </span>
                          <span className="bg-[#BEDBFF] rounded px-2 py-1 text-[#1447E6] capitalize">
                            {item.subject}
                          </span>
                          <span className="bg-[#E5E7EB] px-2 py-1 rounded text-[13px] text-[#696969]">
                            {item.marks} Marks
                          </span>
                        </div>
                      </div>
                      <div>
                        <button
                          className="cursor-pointer"
                          onClick={() => handelDeleteQuestion(item.questionId)}
                        >
                          <LuTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full sm:w-[30%] lg:w-[30%]">
          <div className="p-6 shadow-lg bg-white rounded-lg">
            <span className="text-[#1c1c1c] font-semibold text-[18px]">
              Paper Summary
            </span>
            <div>
              <div className="flex flex-col mt-4 gap-2">
                {testSummary.map((item, index) => (
                  <div
                    className="flex justify-between items-center border-b border-[#E6E6E6] px-5 py-3"
                    key={index}
                  >
                    <span className="text-[#1C1C1C] font-Semibold text-[14px]">
                      {item.title}
                    </span>
                    <span className="text-[14px] text-[#696969] font-regular">
                      {item.title === "Test Name"
                        ? testData.testName || "No Test Name"
                        : item.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 bg-white rounded-lg p-4 shadow-lg">
            <span className="text-[18px] font-semibold text-[#1C1C1C]">
              Actions
            </span>
            <div className="mt-4 flex flex-col gap-3">
              <button
                onClick={() => handleCreateTest("published")}
                className="w-full p-2 bg-[#0B3142] rounded-lg text-[#FFFFFF] font-medium text-[14px]"
              >
                Save & Publish
              </button>
              <button
                className="w-full p-2 border border-[#696969] rounded-lg text-[#696969] font-medium text-[14px]"
                onClick={() => handleCreateTest("draft")}
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

      {/* ===== ADD QUESTION MODAL ===== */}
      {addShowQuestion && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setAddShowQuestion(false);
            }
          }}
        >
          <div
            className="bg-white w-full max-w-4xl rounded-xl shadow-lg relative flex flex-col max-h-[90vh] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Select From Question Bank
              </h2>
              <button
                onClick={() => setAddShowQuestion(false)}
                className="text-gray-500 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="mt-2 w-full bg-[#EEEEEE] rounded-md py-2 px-4">
              <input type="search" placeholder="Search Questions..." />
            </div>

            <div className="mt-4 border border-[#E5E7EB] p-4 rounded-lg">
              <span className="flex items-center gap-2 text-[16px] font-semibold text-[#1C1C1C]">
                <IoFilterSharp /> Filter
              </span>
              <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-4 items-center mt-2">
                {/* Chapter */}
                <div>
                  <label className="text-sm text-gray-600">Chapter</label>
                  <CustomSelect
                    options={chapterOptions}
                    value={chapter}
                    onChange={setChapter}
                    placeholder="Select Chapter"
                  />
                </div>

                {/* Topic */}
                <div>
                  <label className="text-sm text-gray-600">Topic</label>
                  <CustomSelect
                    options={topicOptions}
                    value={topic}
                    onChange={setTopic}
                    placeholder="Select Topic"
                  />
                </div>

                {/* Question Type */}
                <div>
                  <label className="text-sm text-gray-600">Question Type</label>
                  <CustomSelect
                    options={questionTypeOptions}
                    value={questionType}
                    onChange={setQuestionType}
                    placeholder="Select Type"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 max-h-100 overflow-y-auto pr-2">
              <div className="flex flex-col gap-4">
                {addQuestion.map((item) => (
                  <div
                    key={item._id}
                    className="border border-[#E6E6E6] px-3 py-5 rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-4">
                        <span className="font-semibold text-[16px] text-[#12516E]">
                          {item.question}
                        </span>
                        <div className="flex items-center gap-4">
                          <span className="bg-[#E6E6E6] rounded px-2 py-1 text-[#696969] uppercase">
                            {item.questionType}
                          </span>
                          <span className="bg-[#BEDBFF] rounded px-2 py-1 text-[#1447E6] capitalize">
                            {item.subject}
                          </span>
                          <span className="text-[14px] font-semibold text-[#696969]">
                            {item.marks} Marks
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddQuestion(item)}
                        className={`rounded-full w-8 h-8 flex items-center justify-center text-white ${
                          selectedQuestions.some(
                            (question) => question.questionId === item._id,
                          )
                            ? "bg-green-500"
                            : "bg-[#007AFF]"
                        }`}
                      >
                        {selectedQuestions.some(
                          (question) => question.questionId === item._id,
                        ) ? (
                          <IoCheckmark />
                        ) : (
                          <IoMdAdd />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setAddShowQuestion(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => setAddShowQuestion(false)}
                className="px-4 py-2 bg-[#0B3142] text-white rounded-lg"
              >
                Add Questions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== AUTO GENERATE MODAL ===== */}
      {autoAddQuestion && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setAutoAddQuestion(false);
            }
          }}
        >
          <div
            className="bg-white w-full max-w-4xl rounded-xl shadow-lg relative flex flex-col max-h-[90vh] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span>
                <SlidersHorizontal size={16} />
              </span>
              <span className="font-[Segoe UI] font-semibold text-[16px] text-[#1C1C1C]">
                Filter
              </span>
            </div>

            {/* CustomSelect */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6">
              {/* CLASS */}
              <div>
                <label className="text-[14px] text-[#0A0A0A] font-[Segoe UI] font-regular">
                  Class
                </label>
                <CustomSelect
                  options={classOptions}
                  value={selectedClass}
                  onChange={setSelectedClass}
                  placeholder="Select Class"
                />
              </div>

              {/* SECTION */}
              <div>
                <label className="text-[14px] text-[#0A0A0A] font-[Segoe UI] font-regular">
                  Section
                </label>
                <CustomSelect
                  options={sectionOptions}
                  value={section}
                  onChange={setSection}
                  placeholder="Select Section"
                />
              </div>

              {/* SUBJECT */}
              <div>
                <label className="text-[14px] text-[#0A0A0A] font-[Segoe UI] font-regular">
                  Subject
                </label>
                <CustomSelect
                  options={subjectOptions}
                  value={subject}
                  onChange={setSubject}
                  placeholder="Select Subject"
                />
              </div>

              {/* Chapter */}
              <div>
                <label
                  htmlFor=""
                  className="text-[14px] text-[#0A0A0A] font-[Segoe UI] font-regular"
                >
                  Chapter
                </label>
                <CustomSelect
                  options={chapterOptions}
                  value={chapter}
                  onChange={setChapter}
                  placeholder="Select Chapter"
                />
              </div>

              {/* Question Type */}
              <div>
                <label
                  htmlFor=""
                  className="text-[14px] text-[#0A0A0A] font-[Segoe UI] font-regular"
                >
                  Question Type
                </label>
                <CustomSelect
                  options={["All", "MCQ", "True / False"]}
                  value={questionType}
                  onChange={setQuestionType}
                  placeholder="Select Type"
                />
              </div>

              {/* No. of Questions */}
              <div>
                <div className="flex gap-2 items-center">
                  <label
                    htmlFor="questionNo"
                    className="text-[14px] text-[#0A0A0A] font-[Segoe UI] font-regular"
                  >
                    No. of Question
                  </label>
                  <span className="text-[14px] text-[#DC2626] font-regular">
                    *
                  </span>
                </div>
                <input
                  type="number"
                  id="questionNo"
                  placeholder="Enter No. of Question"
                  className="w-full border border-[#E6E6E6] rounded-lg px-4 py-3 outline-none mt-1"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setAutoAddQuestion(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateQuestions}
                disabled={isGenerating}
                className="px-4 py-2 bg-[#0B3142] text-white rounded-lg min-w-[120px]"
              >
                {isGenerating ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateTest;