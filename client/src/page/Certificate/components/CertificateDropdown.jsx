import React, { useMemo, useState } from "react";

function CertificateDropdown({
  value,
  options,
  placeholder,
  onChange,
  disabled = false,
  getOptionLabel = (option) => option,
  getOptionValue = (option) => option,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = useMemo(() => {
    return options.find((option) => String(getOptionValue(option)) === String(value));
  }, [getOptionValue, options, value]);

  const selectedLabel = selectedOption ? getOptionLabel(selectedOption) : "";
  const showPlaceholder = !selectedLabel;

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((current) => !current);
  };

  const handleSelect = (option) => {
    onChange(getOptionValue(option));
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`w-full px-4 py-2.5 bg-white border border-[#E6E6E6] rounded-[9px] text-[14px] focus:outline-none transition-colors appearance-none flex justify-between items-center text-left ${
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        } ${showPlaceholder ? "text-[#858383]" : "text-[#1C1C1C]"}`}
      >
        <span className="truncate max-w-[90%]">
          {selectedLabel || placeholder}
        </span>
        <span className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="#696969"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 w-full mt-1 bg-white border border-[#E6E6E6] rounded-[9px] shadow-lg z-20 max-h-60 overflow-y-auto">
            {options.length ? (
              options.map((option) => {
                const optionValue = getOptionValue(option);
                const isSelected = String(optionValue) === String(value);
                return (
                  <button
                    type="button"
                    key={optionValue}
                    onClick={() => handleSelect(option)}
                    className={`w-full px-4 py-2.5 hover:bg-[#F8F9FA] text-[14px] cursor-pointer flex items-center justify-between transition-colors text-left ${
                      isSelected ? "bg-[#F0F7FF] text-[#0055D4]" : "text-[#1C1C1C]"
                    }`}
                  >
                    <span className="truncate">{getOptionLabel(option)}</span>
                    {isSelected && (
                      <svg
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 4.5L4.5 8L11 1"
                          stroke="#0055D4"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-2.5 text-[14px] text-[#858383]">
                No options found
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CertificateDropdown;
