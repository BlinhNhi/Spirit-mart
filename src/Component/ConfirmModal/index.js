import { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FaTrashAlt,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import Button from "../Button";

const TYPES = {
  danger: {
    Icon: FaTrashAlt,
    iconBox: "bg-red-100 text-red-500 dark:bg-red-500/15",
    confirmBtn: "bg-red-500 hover:bg-red-600",
  },
  warning: {
    Icon: FaExclamationTriangle,
    iconBox: "bg-orange-100 text-orange-400 dark:bg-orange-400/15",
    confirmBtn: "bg-orange-400 hover:bg-orange-500",
  },
  success: {
    Icon: FaCheckCircle,
    iconBox: "bg-green-100 text-green-500 dark:bg-green-500/15",
    confirmBtn: "bg-orange-400 hover:bg-orange-500",
  },
};

function ConfirmModal({
  isOpen,
  title = "Bạn có chắc chắn?",
  message,
  type = "danger",
  confirmText = "Xác nhận",
  cancelText = "Huỷ",
  onConfirm,
  onCancel,
  loading = false,
}) {
  const { Icon, iconBox, confirmBtn } = TYPES[type] || TYPES.danger;

  // đóng bằng phím Esc
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => e.key === "Escape" && onCancel?.();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onCancel]);

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-60"
        onClick={onCancel}
      />

      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full max-w-sm sm:max-w-md rounded-2xl p-6 sm:p-8 text-center flex flex-col gap-4
          bg-white dark:bg-[#131a2a]
          border border-orange-200 dark:border-white/10 shadow-2xl
          transition-all duration-300 ease-out ${
            isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
      >
        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl ${iconBox}`}
        >
          <Icon />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-gray-600 dark:text-gray-200">
          {title}
        </h3>

        {message && (
          <p className="text-sm sm:text-base font-normal text-gray-600 dark:text-gray-200">
            {message}
          </p>
        )}

        <div className="flex flex-col-reverse sm:flex-row gap-3">
         
          <Button className="w-full" onClick={onCancel} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`w-full text-whitedisabled:opacity-50 disabled:cursor-not-allowed ${confirmBtn}`}
          >
            {loading ? "Đang xử lý..." : confirmText}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ConfirmModal;
