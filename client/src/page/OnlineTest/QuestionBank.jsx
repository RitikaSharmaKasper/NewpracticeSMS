import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { Plus } from "lucide-react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { Pencil, Trash2 } from "lucide-react";
import api from "../../config/axiosInstance";

/* ================= CUSTOM SELECT ================= */
const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      {/* SELECT BOX */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="border border-[#D9D9D9] rounded-lg px-3 py-2 flex justify-between items-center cursor-pointer bg-white"
      >
        <span className={value ? "text-black" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <MdOutlineArrowDropDown size={22} />
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute mt-1 w-full bg-white border rounded-lg shadow z-50 max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer rounded-md ${
                value === opt
                  ? "bg-[#92D5FF] text-[#007AFF] border-l-4 border-[#007AFF]"
                  : "bg-white hover:bg-gradient-to-r hover:from-[#F1F5F9] hover:to-[#92D5FF] hover:text-[#696969] hover:border-l-4 hover:border-[#007AFF]"
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

function QuestionBank() {
  const [chapter, setChapter] = useState("");
  const [type, setType] = useState("");
  const [showQuestionList, setShowQuestionList] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  // Edit state
  const [editingQuestion, setEditingQuestion] = useState(null); // { documentId, questionIndex }
  const [editText, setEditText] = useState("");

  // Dropdown data
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [sections, setSections] = useState([]);

  // Selected filter values
  const [selectedClass, setSelectedClass] = useState("");
  const [subject, setSubject] = useState("");
  const [section, setSection] = useState("");

  /* -------- fetch on mount -------- */
  useEffect(() => {
    fetchClasses();
    fetchSubjects();
    fetchSections();
  }, []);

  const response = api.put(`/question/update/${documentId}`, {
    questions: updatedQuestions,
  });

  /* ================= API CALLS ================= */

  const fetchClasses = async () => {
    try {
      const response = await api.get("/classes");
      if (response.data.success) {
        const classOptions = response.data.data.map(
          (cls) => `${cls.className}`,
        );
        setClasses(["All Classes", ...classOptions]);
      }
    } catch (error) {
      console.error("Class Fetch Error:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await api.get("/subjects/AllSubjects");
      if (response.data.success) {
        const subjectOptions = response.data.data.map((sub) => sub.subjectName);
        setSubjects(["All Subjects", ...subjectOptions]);
      }
    } catch (error) {
      console.error("Subject Fetch Error:", error);
    }
  };

  // const fetchSections = async () => {
  //   try {
  //     const response = await api.get("/question/all");

  // const fetchQuestion = async () => {
  //   try {
  //     const response = await api.get("/question/all");
  //     const data = response.data;
  //     if (data.success) {
  //       setQuestionList(data.data);
  //       setShowQuestionList(true);
  //     }
  //   } catch (error) {
  //     console.error("Fetch Question Error:", error);
  //   }
  // };
  const fetchSections = async () => {
  try {
    const response = await api.get("/question/all");

    if (response.data.success) {
      const uniqueSections = [
        ...new Set(
          response.data.data
            .map((item) => item.section)
            .filter(Boolean)
        ),
      ];

      setSections(["All Sections", ...uniqueSections]);
    }
  } catch (error) {
    console.error("Section Fetch Error:", error);
  }
};

const fetchQuestion = async () => {
  try {
    const response = await api.get("/question/all");
    const data = response.data;

    if (data.success) {
      setQuestionList(data.data);
      setFilteredList(data.data); // initial display
      setShowQuestionList(true);
    }
  } catch (error) {
    console.error("Fetch Question Error:", error);
  }
};

  /* ================= FILTERS ================= */

  const applyFilters = (list) => {
    let result = [...list];

    if (subject && subject !== "All Subjects") {
      result = result.filter(
        (q) => q.subject?.toLowerCase() === subject.toLowerCase(),
      );
    }

    if (section && section !== "All Sections") {
      result = result.filter(
        (q) => q.section?.toLowerCase() === section.toLowerCase(),
      );
    }

    if (selectedClass && selectedClass !== "All Classes") {
      result = result.filter(
        (q) => q.className?.toLowerCase() === selectedClass.toLowerCase(),
      );
    }

    if (chapter) {
      result = result.filter(
        (q) => q.chapter?.toLowerCase() === chapter.toLowerCase(),
      );
    }

    if (type) {
      result = result.filter(
        (q) => q.type?.toLowerCase() === type.toLowerCase(),
      );
    }

    setFilteredList(result);
  };

  /* ================= DELETE ================= */

  const handleDeleteQuestion = async (documentId, questionIndex) => {
    try {
      const selectedQuestion = questionList.find((q) => q._id === documentId);

      if (!selectedQuestion) return;

      const updatedQuestions = selectedQuestion.questions.filter(
        (_, index) => index !== questionIndex,
      );

    if (!document) return;

    // const updatedQuestions = document.questions.filter(
    //   (_, index) => index !== questionIndex
    // );

    const response = await api.put(`/question/update/${documentId}`, {
      questions: updatedQuestions,
    });

    if (response.data.success) {
      fetchQuestion();
    }
  } catch (error) {
    console.error("Delete Question Error:", error);
  }
};

  // const handleDeleteQuestion = async (documentId, questionIndex) => {
  //   try {
  //     const response = await api.put(
  //       `/question/update/${editingQuestion.documentId}`,
  //       {
  //         questions: questionList
  //           .find((q) => q._id === editingQuestion.documentId)
  //           .questions.map((q, i) =>
  //             i === editingQuestion.questionIndex
  //               ? {
  //                   ...q,
  //                   questionText: editText,
  //                 }
  //               : q,
  //           ),
  //       },
  //     );

  //     const response = await api.put(`/question/update/${documentId}`, {
  //       questions: updatedQuestions,
  //     });

  //     if (response.data.success) {
  //       fetchQuestion();
  //     }
  //   } catch (error) {
  //     console.error("Delete Question Error:", error);
  //   }
  // };

  /* ================= INLINE EDIT ================= */

  const startEditing = (documentId, questionIndex, currentText) => {
    setEditingQuestion({ documentId, questionIndex });
    setEditText(currentText);
  };

  const cancelEditing = () => {
    setEditingQuestion(null);
    setEditText("");
  };

  const handleUpdateQuestion = async () => {
    try {
      const { documentId, questionIndex } = editingQuestion;

      const updatedQuestions = questionList
        .find((q) => q._id === documentId)
        .questions.map((q, i) =>
          i === questionIndex ? { ...q, questionText: editText } : q,
        );

      const response = await api.put(`/question/update/${documentId}`, {
        questions: updatedQuestions,
      });

      if (response.data.success) {
        fetchQuestion();
        cancelEditing();
      }
    } catch (error) {
      console.error("Update Question Error:", error);
    }
  };

  /* ================= RENDER ================= */

  return (
    <div className="p-4">
      {/* BACK */}
      <div className="flex items-center gap-2 text-[18px] text-[#696969] font-semibold">
        <Link to="/test-paper" className="flex items-center gap-2">
          <IoChevronBack />
          <span>Back</span>
        </Link>
      </div>

      {/* CARD */}
      <div className="mt-6 bg-white rounded-xl shadow p-4">
        <div className="border border-[#e6e6e6] p-4 rounded-lg">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[#1C1C1C] font-semibold text-lg font-[Segoe UI]">
                Question Bank
              </span>
              <p className="text-[#9C9C9C] text-sm font-[Segoe UI]">
                Manage And Organize All Your Exam Questions In One Place
              </p>
            </div>
            <Link to="/create-question">
              <div className="font-[Segoe UI] flex gap-2 border items-center px-6 py-3 rounded-lg border-none bg-[#0B3142] text-white cursor-pointer">
                <Plus size={18} />
                <span>Create Question</span>
              </div>
            </Link>
          </div>

          {/* FILTERS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
            {/* CLASS */}
            <div>
              <label className="text-sm text-gray-600 font-[Segoe UI]">
                Class
              </label>
              <CustomSelect
                options={classes}
                value={selectedClass}
                onChange={setSelectedClass}
                placeholder="Select Class"
              />
            </div>

            {/* SECTION */}
            <div>
              <label className="text-sm text-gray-600 font-[Segoe UI]">
                Section
              </label>
              <CustomSelect
                options={sections}
                value={section}
                onChange={setSection}
                placeholder="Select Section"
              />
            </div>

            {/* SUBJECT */}
            <div>
              <label className="text-sm text-gray-600 font-[Segoe UI]">
                Subject
              </label>
              <CustomSelect
                options={subjects}
                value={subject}
                onChange={setSubject}
                placeholder="Select Subject"
              />
            </div>

            {/* CHAPTER */}
            <div>
              <label className="text-sm text-gray-600 font-[Segoe UI]">
                Chapter
              </label>
              <CustomSelect
                options={["Chapter 1", "Chapter 2", "Chapter 3"]}
                value={chapter}
                onChange={setChapter}
                placeholder="Select Chapter"
              />
            </div>

            {/* TYPE */}
            <div>
              <label className="text-sm text-gray-600 font-[Segoe UI]">
                Type
              </label>
              <CustomSelect
                options={["MCQ", "Subjective", "True/False"]}
                value={type}
                onChange={setType}
                placeholder="Select Type"
              />
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <div className="mt-6">
            <button
              className="flex gap-2 border items-center px-6 py-3 rounded-lg border-none bg-[#0B3142] text-white"
              onClick={fetchQuestion}
            >
              <IoSearchOutline size={16} />
              <span className="font-[Segoe UI] text-[16px] font-semibold">
                Search
              </span>
            </button>
          </div>
        </div>

        {/* QUESTION LIST */}
        {showQuestionList && (
          <div className="mt-6 flex flex-col gap-4">
            {filteredList.length === 0 ? (
              <div className="text-center text-[#9C9C9C] py-10">
                No questions found for the selected filters.
              </div>
            ) : (
              filteredList.map((q) =>
                q.questions.map((question, index) => (
                  <div
                    key={`${q._id}-${index}`}
                    className="border border-[#D9D9D9] p-4 rounded-lg"
                  >
                    {/* QUESTION HEADER */}
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        {editingQuestion &&
                        editingQuestion.documentId === q._id &&
                        editingQuestion.questionIndex === index ? (
                          <div className="flex flex-col gap-2">
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="border border-[#D9D9D9] rounded px-3 py-1 w-full outline-none focus:border-[#007AFF]"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={handleUpdateQuestion}
                                className="px-4 py-1 bg-[#0B3142] text-white rounded text-sm"
                              >
                                Save
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="px-4 py-1 bg-gray-200 text-gray-700 rounded text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span className="font-semibold text-[16px] text-[#000000]">
                            {question.questionText}
                          </span>
                        )}
                      </div>

                      {/* ACTION BUTTONS */}
                      {!(
                        editingQuestion &&
                        editingQuestion.documentId === q._id &&
                        editingQuestion.questionIndex === index
                      ) && (
                        <div className="flex items-center gap-3 shrink-0">
                          <button
                            className="text-[#9C9C9C] hover:text-[#0B3142] transition-colors"
                            onClick={() =>
                              startEditing(q._id, index, question.questionText)
                            }
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className="text-[#DC2626] hover:text-red-800 transition-colors"
                            onClick={() => handleDeleteQuestion(q._id, index)}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* OPTIONS */}
                    {question.options && question.options.length > 0 && (
                      <div className="border-b border-[#E6E6E6] p-2">
                        <ol className="list-[lower-alpha] list-inside mt-2 text-[#696969]">
                          {question.options.map((opt, i) => (
                            <li
                              key={i}
                              className={`${
                                opt === question.correctAnswer
                                  ? "text-[#009638] font-semibold"
                                  : ""
                              }`}
                            >
                              {opt}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* FOOTER */}
                    <div className="flex justify-between items-center p-2 mt-1">
                      <div className="flex items-center gap-2 text-[14px] text-[#696969] flex-wrap">
                        {q.subject && <span>• {q.subject}</span>}
                        {q.chapter && <span>• {q.chapter}</span>}
                        {q.topic && <span>• {q.topic}</span>}
                      </div>

                      <span
                        className={`py-0.5 px-2 rounded font-semibold text-[14px] ${
                          q.status === "published"
                            ? "bg-[#E6F5EC] text-[#009638]"
                            : "bg-[#FEEADC] text-[#F97316]"
                        }`}
                      >
                        {q.status === "published" ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                )),
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionBank;
