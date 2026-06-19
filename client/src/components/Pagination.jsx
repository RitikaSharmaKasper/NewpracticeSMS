import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Pagination({
  currentPage = 1,
  total = 0,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
}) {
  const totalPages = Math.ceil(total / itemsPerPage) || 1;
  const start = total === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, total);

  return (
    <div className="w-full flex items-center justify-between py-3 bg-white">
      <div className="flex items-center gap-3 ml-2">
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="px-3 py-1 text-sm text-[#696969] bg-[#F9F9F9] rounded border border-[#E6E6E6] outline-none"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>

        <p className="text-sm text-[#696969]">
          Showing <span className="text-[#1C1C1C]">{start}-{end}</span> of {total} results
        </p>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center gap-1 text-[#9C9C9C] disabled:opacity-50"
        >
          <IoIosArrowBack />
          Previous
        </button>

        <div className="flex items-center gap-2">
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-6 h-6 rounded text-xs ${
                  currentPage === page
                    ? "bg-[#12516E] text-white"
                    : "text-[#1C1C1C]"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center gap-1 text-[#1C1C1C] disabled:opacity-50"
        >
          Next
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}

export default Pagination;