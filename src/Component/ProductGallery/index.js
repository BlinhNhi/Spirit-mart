import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function ProductGallery({ images = [], alt = "product" }) {
  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState({ active: false, x: 50, y: 50 });
  const touchStartX = useRef(null);
  const thumbRefs = useRef([]);

  const total = images.length;

  // đổi sản phẩm (danh sách ảnh đổi) thì quay về ảnh đầu
  useEffect(() => {
    setCurrent(0);
  }, [images.length, images[0]]); // eslint-disable-line react-hooks/exhaustive-deps

  // giữ ảnh nhỏ đang chọn luôn nằm trong vùng nhìn thấy
  useEffect(() => {
    thumbRefs.current[current]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [current]);

  const go = (next) => {
    if (total === 0) return;
    setCurrent((next + total) % total);
  };

  const handleKey = (e) => {
    if (e.key === "ArrowLeft") go(current - 1);
    if (e.key === "ArrowRight") go(current + 1);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) go(diff > 0 ? current - 1 : current + 1);
    touchStartX.current = null;
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({
      active: true,
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  if (total === 0) {
    return (
      <div className="flex h-[320px] items-center justify-center rounded-xl bg-orange-50 dark:bg-[#0b0f1a] text-gray-500 dark:text-gray-400">
        Chưa có hình ảnh
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-4 outline-none"
      tabIndex={0}
      onKeyDown={handleKey}
    >
      {/* ảnh lớn */}
      <div
        className="group relative aspect-square w-full overflow-hidden rounded-xl bg-white cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoom((z) => ({ ...z, active: false }))}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`${alt}-${i + 1}`}
            draggable={false}
            style={
              i === current && zoom.active
                ? {
                    transformOrigin: `${zoom.x}% ${zoom.y}%`,
                    transform: "scale(1.8)",
                  }
                : undefined
            }
            className={`absolute inset-0 h-full w-full object-contain select-none
              transition-all duration-500 ease-out
              ${i === current ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          />
        ))}

        {/* bộ đếm */}
        <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {current + 1}/{total}
        </span>

        {/* mũi tên */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(current - 1)}
              aria-label="Ảnh trước"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full
                bg-white/90 text-gray-600 shadow-lg backdrop-blur
                transition-all duration-300 hover:bg-primary hover:text-white active:scale-90
                opacity-100 md:opacity-0 md:-translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0"
            >
              <FaChevronLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => go(current + 1)}
              aria-label="Ảnh sau"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full
                bg-white/90 text-gray-600 shadow-lg backdrop-blur
                transition-all duration-300 hover:bg-primary hover:text-white active:scale-90
                opacity-100 md:opacity-0 md:translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0"
            >
              <FaChevronRight size={14} />
            </button>
          </>
        )}
      </div>

      {/* ảnh nhỏ */}
      {total > 1 && (
        <div className="flex gap-3 overflow-x-auto p-1 [scrollbar-width:thin]">
          {images.map((url, i) => (
            <button
              key={i}
              type="button"
              ref={(el) => (thumbRefs.current[i] = el)}
              onClick={() => setCurrent(i)}
              aria-label={`Xem ảnh ${i + 1}`}
              className={`h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg bg-white
                border-2 transition-all duration-300
                ${
                  i === current
                    ? "border-primary shadow-md shadow-primary/40 scale-105"
                    : "border-orange-200 dark:border-white/10 opacity-60 hover:opacity-100 hover:-translate-y-0.5"
                }`}
            >
              <img
                src={url}
                alt={`thumbnail-${i + 1}`}
                draggable={false}
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;