import React from "react";
import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";

const PaginationProduct = ({ currentPage, totalCount, pageSize, onPageChange }) => {
    const totalPages = Math.ceil(totalCount / pageSize);
    if (totalPages === 1) return null;
    const getPageNumbers = () => {
        const maxPageButtons = 8;
        let start = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        let end = start + maxPageButtons - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - maxPageButtons + 1);
        }

        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="flex gap-2 justify-center items-center mt-4">
            <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-3 border text-lg rounded-lg bg-orange-400 text-white hover:bg-orange-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                <TbPlayerTrackPrev className="font-bold"></TbPlayerTrackPrev>
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-3 border rounded-lg text-sm 
                        ${currentPage === page
                            ? 'bg-orange-400 text-white'
                            : 'bg-gray-200 text-black hover:bg-gray-300'}`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-3 border text-lg rounded-lg  bg-orange-400 text-white hover:bg-orange-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                <TbPlayerTrackNext></TbPlayerTrackNext>
            </button>
        </div>
    );
};

export default React.memo(PaginationProduct);
