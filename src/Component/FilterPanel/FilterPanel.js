import React from "react";
import { FaSlidersH, FaUndo, FaSortAmountDown, FaSortAmountUp, FaStar } from "react-icons/fa";

const OPTIONS = [
  { value: "", label: "Trở về mặc định", Icon: FaUndo },
  { value: "highest-price", label: "Giá từ cao đến thấp", Icon: FaSortAmountDown },
  { value: "low-price", label: "Giá từ thấp đến cao", Icon: FaSortAmountUp },
  { value: "highest-star", label: "Sao từ cao đến thấp", Icon: FaStar },
  { value: "low-star", label: "Sao từ thấp đến cao", Icon: FaStar },
];

function FilterPanel({ sortType, onSortChange }) {
  return (
    <aside
      className="w-full lg:w-[260px] lg:shrink-0 lg:sticky lg:top-28 rounded-2xl p-4
        bg-white dark:bg-[#131a2a]
        border border-orange-200 dark:border-white/10 shadow-sm"
    >
      <h3 className="mb-3 flex items-center gap-2 border-b border-orange-200 dark:border-white/10 pb-3 text-base font-bold text-gray-600 dark:text-gray-100">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          <FaSlidersH size={14} />
        </span>
        Lọc sản phẩm theo:
      </h3>

      {/* mobile: chip xếp ngang, desktop: danh sách dọc */}
      <div role="radiogroup" className="flex flex-wrap lg:flex-col gap-2">
        {OPTIONS.map(({ value, label, Icon }) => {
          const active = sortType === value;
          return (
            <label
              key={value || "default"}
              className={`group flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-sm font-medium
                transition-all duration-300 hover:-translate-y-0.5
                ${
                  active
                    ? "border-primary bg-primary/10 text-primary shadow-md shadow-primary/20"
                    : "border-orange-200 dark:border-white/10 text-gray-600 dark:text-gray-200 hover:border-primary/60 hover:text-primary"
                }`}
            >
              <input
                type="radio"
                name="sortType"
                value={value}
                checked={active}
                onChange={onSortChange}
                className="sr-only"
              />
              {/* vòng chọn */}
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300
                  ${active ? "border-primary" : "border-gray-300 dark:border-white/30 group-hover:border-primary"}`}
              >
                <span
                  className={`h-2 w-2 rounded-full bg-primary transition-transform duration-300 ${
                    active ? "scale-100" : "scale-0"
                  }`}
                />
              </span>
              <Icon
                size={12}
                className={`shrink-0 ${value === "low-star" ? "rotate-180" : ""}`}
              />
              <span className="whitespace-nowrap">{label}</span>
            </label>
          );
        })}
      </div>
    </aside>
  );
}

export default React.memo(FilterPanel);