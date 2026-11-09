import React from "react";
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from "react-icons/lu";

const PaginationProduct = ({ currentPage, totalCount, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  if (totalPages <= 1) return null;

  // danh sách số trang: luôn có trang đầu, trang cuối, và vài trang quanh trang hiện tại
  const getPages = () => {
    const pages = new Set([1, totalPages]);
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i >= 1 && i <= totalPages) pages.add(i);
    }
    const sorted = [...pages].sort((a, b) => a - b);

    const result = [];
    sorted.forEach((p, i) => {
      if (i > 0 && p - sorted[i - 1] > 1) result.push("...");
      result.push(p);
    });
    return result;
  };

  const go = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) onPageChange(page);
  };

  const navBtn =
    "flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-200 " +
    "bg-white dark:bg-[#131a2a] border border-orange-200 dark:border-white/10 " +
    "text-gray-600 dark:text-gray-200 hover:border-primary hover:text-primary hover:-translate-y-0.5 active:scale-90 " +
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:border-orange-200 disabled:hover:text-gray-600";

  return (
    <nav aria-label="Phân trang" className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => go(1)}
        disabled={currentPage === 1}
        aria-label="Trang đầu"
        className={`${navBtn} hidden sm:flex`}
      >
        <LuChevronsLeft />
      </button>
      <button
        type="button"
        onClick={() => go(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Trang trước"
        className={navBtn}
      >
        <LuChevronLeft />
      </button>

      {getPages().map((page, i) =>
        page === "..." ? (
          <span key={`dots-${i}`} className="px-1 text-gray-500 dark:text-gray-400 select-none">
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => go(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`h-10 min-w-[40px] rounded-full px-3 text-sm font-semibold transition-all duration-200 active:scale-90
              ${
                currentPage === page
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/40 scale-110"
                  : "bg-white dark:bg-[#131a2a] border border-orange-200 dark:border-white/10 text-gray-600 dark:text-gray-200 hover:border-primary hover:text-primary hover:-translate-y-0.5"
              }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => go(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Trang sau"
        className={navBtn}
      >
        <LuChevronRight />
      </button>
      <button
        type="button"
        onClick={() => go(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Trang cuối"
        className={`${navBtn} hidden sm:flex`}
      >
        <LuChevronsRight />
      </button>
    </nav>
  );
};

export default React.memo(PaginationProduct);