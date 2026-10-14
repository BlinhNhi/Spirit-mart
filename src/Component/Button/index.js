const toSize = (v) => (typeof v === "number" ? `${v}px` : v);


const BG_TECH = /^bg-(gradient|none|left|right|center|top|bottom|clip|origin|repeat|no-repeat|cover|contain|fixed|local|scroll|blend|opacity|\[(length|position|size|url|image))/;
const isCustomBg = (t) => t.startsWith("bg-") && !BG_TECH.test(t);

const Button = ({
  children = "Click me",
  width,
  height,
  from,
  to,
  darkFrom,
  darkTo,
  pulse, // nuốt prop này để không bị đẩy xuống thẻ <button>
  type = "button",
  disabled = false,
  className = "",
  style,
  ...rest
}) => {
  const tokens = className.split(/\s+/).filter(Boolean);
  const customBg = tokens.some(isCustomBg);
  const customW = tokens.some((t) => /^w-/.test(t));

  const vars = {};
  if (!customBg && from) {
    vars["--btn-from"] = from;
    vars["--btn-to"] = to ?? from;
  }
  if (!customBg && darkFrom) {
    vars["--btn-from-dark"] = darkFrom;
    vars["--btn-to-dark"] = darkTo ?? darkFrom;
  }

  const sizeStyle = {};
  if (width !== undefined) sizeStyle.width = toSize(width);
  if (height !== undefined) {
    sizeStyle.height = toSize(height);
    sizeStyle.fontSize = `calc(${toSize(height)} * 0.34)`; // chữ to theo chiều cao
  }

  let background;
  if (customBg) {
    // màu nền đến từ className của người dùng, component không chen vào
    background = "transition-[background-color,transform] duration-300";
  } else {
    const gradient = from
      ? "from-[var(--btn-from)] via-[var(--btn-to)] to-[var(--btn-from)]"
      : "from-primary via-secondary to-primary";
    const darkGradient = darkFrom
      ? "dark:from-[var(--btn-from-dark)] dark:via-[var(--btn-to-dark)] dark:to-[var(--btn-from-dark)]"
      : "";
    background = [
      "bg-gradient-to-r bg-[length:200%_100%] bg-left hover:bg-right",
      gradient,
      darkGradient,
      "transition-[background-position,transform] duration-500 ease-out",
    ].join(" ");
  }

  return (
    <button
      type={type}
      disabled={disabled}
      style={{ ...vars, ...sizeStyle, ...style }}
      className={[
        // overflow-hidden: mọi hiệu ứng bị cắt gọn trong nút, không tràn ra ngoài
        "relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap",
        background,
        width === undefined && !customW ? "w-52" : "",
        height === undefined ? "py-2 px-4" : "px-[0.6em]",
        "text-white font-semibold rounded-full",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]",
        "hover:scale-105 active:scale-95 active:duration-100",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <style>{`
        @keyframes tl-btn-shine {
          0%   { transform: translateX(-100%) skewX(-20deg); }
          55%  { transform: translateX(300%) skewX(-20deg); }
          100% { transform: translateX(300%) skewX(-20deg); }
        }
      `}</style>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-[2px] animate-[tl-btn-shine_3s_ease-in-out_infinite] motion-reduce:animate-none"
      />
      <span className="relative">{children}</span>
    </button>
  );
};

export default Button;