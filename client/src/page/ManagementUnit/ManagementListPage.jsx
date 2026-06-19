import React, { useMemo, useState,useRef,useEffect } from "react";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";
import ManagementDeleteModal from "./ManagementDeleteModal";
import deleteIcon from "../../assets/images/delete-2.png";
import viewMessage from "../../assets/images/viewmessage.png";
const readStoredList = (storageKey, fallbackData) => {
  try {
    const storedValue = localStorage.getItem(storageKey);
    if (storedValue === null) {
      localStorage.setItem(storageKey, JSON.stringify(fallbackData));
      return fallbackData;
    }
    const parsedValue = JSON.parse(storedValue);
    if (Array.isArray(parsedValue)) return parsedValue;
    localStorage.setItem(storageKey, JSON.stringify(fallbackData));
    return fallbackData;
  } catch {
    localStorage.setItem(storageKey, JSON.stringify(fallbackData));
    return fallbackData;
  }
};



const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const initialFormState = (fields) =>
  fields.reduce((form, field) => ({ ...form, [field.name]: field.defaultValue || "" }), {});

const ManagementListPage = ({
  storageKey,
  defaultItems,
  formTitle,
  listTitle,
  primaryField,
  fields,
  columns,
  createLabel = "Create",
}) => {
  const emptyForm = useMemo(() => initialFormState(fields), [fields]);
  const [items, setItems] = useState(() => readStoredList(storageKey, defaultItems));
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
const [openDropdowns, setOpenDropdowns] = useState({});
  const dropdownRefs = useRef({});
  const persistItems = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem(storageKey, JSON.stringify(nextItems));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, String(value).trim()])
    );

    if (!trimmedData[primaryField]) return;

    if (editingId) {
      persistItems(
        items.map((item) => (item.id === editingId ? { ...item, ...trimmedData } : item))
      );
    } else {
      persistItems([{ id: createId(), ...trimmedData }, ...items]);
    }

    resetForm();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData(
      fields.reduce(
        (nextForm, field) => ({ ...nextForm, [field.name]: item[field.name] || "" }),
        {}
      )
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    persistItems(items.filter((item) => item.id !== deleteTarget.id));
    if (editingId === deleteTarget.id) resetForm();
    setDeleteTarget(null);
  };
  useEffect(() => {
    function handleClickOutside(event) {
      Object.keys(dropdownRefs.current).forEach((fieldName) => {
        if (
          dropdownRefs.current[fieldName] &&
          !dropdownRefs.current[fieldName].contains(event.target)
        ) {
          setOpenDropdowns((prev) => ({ ...prev, [fieldName]: false }));
        }
      });
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (fieldName) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const handleSelectOption = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    setOpenDropdowns((prev) => ({ ...prev, [fieldName]: false }));
  };
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(320px,520px)_1fr] gap-2 md:gap-3">
        <section className="bg-white p-3 rounded-xl shadow-md overflow-visible md:p-4  h-fit">
          <h1 className="text-[18px] font-semibold text-[#1C1C1C] mb-3 font-[600]">
            {editingId ? formTitle.replace("Create", "Update") : formTitle}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-[14px] font-semibold text-[#1C1C1C] mb-1">
                  {field.label}
                </label>

              {field.type === "select" ? (
  <div
    className="relative"
    ref={(el) => (dropdownRefs.current[field.name] = el)}
  >
    <button
      type="button"
      onClick={() => toggleDropdown(field.name)}
      className="w-full h-[44px] px-4 bg-white border border-[#E6E6E6] rounded-[12px] text-left outline-none transition flex justify-between items-center cursor-pointer"
    >
      <span className={formData[field.name] ? "text-[#1C1C1C] text-[14px]" : "text-[#9C9C9C] text-[14px]"}>
        {formData[field.name] ? formData[field.name] : `Select ${field.label.toLowerCase()}`}
      </span>
      <ChevronDown
        size={16}
        className={`text-[#9C9C9C] transition-transform duration-200 pointer-events-none ${
          openDropdowns[field.name] ? "rotate-180" : ""
        }`}
      />
    </button>

    {openDropdowns[field.name] && (
      <div className="absolute left-0 right-0 z-50 mt-1 bg-white border border-[#E6E6E6] rounded-[12px] shadow-lg overflow-hidden py-1 max-h-[240px] overflow-y-auto">
        {field.options?.map((option) => {
          const isSelected = formData[field.name] === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelectOption(field.name, option)}
              className={`w-full text-left px-4 py-3 text-sm transition-colors flex justify-between items-center cursor-pointer ${
                isSelected
                  ? "bg-[#F5F5F5] text-[#1C1C1C] font-medium"
                  : "text-[#4A4A4A] hover:bg-[#F9F9F9] hover:text-[#1C1C1C]"
              }`}
            >
              <span className="text-[14px]">{option}</span>
              {isSelected && (
                <svg className="w-4 h-4 text-[#0B3142]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    )}
  </div>
) : (
                  <input
                    type="text"
                    value={formData[field.name]}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, [field.name]: event.target.value }))
                    }
                    placeholder={field.placeholder}
                    className="w-full h-[44px] rounded-[12px] border border-[#E6E6E6] bg-white px-5 text-[14px] text-[#1C1C1C] placeholder:text-[#9C9C9C] outline-none"
                  />
                )}
              </div>
            ))}

            <div className="flex flex-wrap gap-3 pt-1 pb-2">
              <button
                type="button"
                onClick={resetForm}
                className="h-[40px] min-w-[96px] rounded-[8px] border border-[#9C9C9C] bg-white px-4 text-[16px] font-semibold text-[#696969] 0"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-[40px] min-w-[95px] rounded-[8px] bg-[#0B3142] px-5 text-[16px] font-semibold text-white hover:bg-[#15465c]"
              >
                {editingId ? "Update" : createLabel}
              </button>
            </div>
          </form>
        </section>

        <section className="bg-white rounded-xl shadow-md overflow-visible p-4 md:pt-3 pb-4 pl-3 pr-4">
          <h2 className="text-[16px] font-semibold text-[#1C1C1C] mb-3">{listTitle}</h2>

          <div className="overflow-x-auto rounded-[12px] border border-[#E6E6E6]">
            <table className="w-full min-w-[620px]">
              <thead className="border-b border-[#EEEEEE]">
                <tr className="text-left">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={`px-5 py-2 text-[14px] font-semibold text-[#1C1C1C] ${column.className || ""}`}
                    >
                      {column.label}
                    </th>
                  ))}
                  <th className="px-5 py-3 text-[14px] font-semibold text-[#1C1C1C] text-center w-[170px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-[#EEEEEE] last:border-b-0 hover:bg-[#F9FAFC]">
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-5 py-4 text-[14px] font-normal text-[#1C1C1C] text-[regular] ${column.className || ""}`}
                      >
                        {item[column.key]}
                      </td>
                    ))}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-3">
                        {/* <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="text-[#9C9C9C] hover:text-[#0B3142]"
                          aria-label={`Edit ${item[primaryField]}`}
                          title="Edit"
                        >
                          <Pencil size={20} strokeWidth={1.8} />
                        </button> */}
                   
{/* 
  <span
    role="button"
    tabIndex={0}
     onClick={() => handleEdit(item)}
  
    className="material-symbols-outlined text-[#9C9C9C]  font-[300] text-[21px] cursor-pointer inline-flex items-center justify-center  rounded-full  transition-all"
  >
    edit
  </span> */}    <img
                            src={viewMessage}
                            alt="viewmessage"
                            onClick={() => handleEdit(item)}
                            className="h-5 w-5 cursor-pointer [image-rendering:-webkit-optimize-contrast]"
                          />
             
                            <img
                              src={deleteIcon}
                              alt="delete"
                                   onClick={() => setDeleteTarget(item)}
                              className="h-5.5 w-5.5 cursor-pointer [image-rendering:-webkit-optimize-contrast]"
                            />
                         
                        
                      </div>
                    </td>
                  </tr>
                ))}

                {items.length === 0 && (
                  <tr>
                    <td
                      colSpan={columns.length + 1}
                      className="px-5 py-12 text-center text-[14px] text-[#9C9C9C]"
                    >
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <ManagementDeleteModal
        isOpen={Boolean(deleteTarget)}
        title={`Delete ${listTitle.replace(" List", "")}`}
        itemName={deleteTarget?.[primaryField] || ""}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default ManagementListPage;
