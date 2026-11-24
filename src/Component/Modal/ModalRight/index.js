
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';

const RightModal = ({
    open,
    onClose,
    title,
    description,
    children,
    footer,
    width = 500,
}) => {
    const [isVisible, setIsVisible] = useState(open);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let timer;

        if (open) {
            setIsVisible(true);

            // Đợi DOM render rồi mới chạy animation mở
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsAnimating(true);
                });
            });
        } else {
            setIsAnimating(false);

            // Đợi animation đóng hoàn tất mới xóa DOM
            timer = setTimeout(() => {
                setIsVisible(false);
            }, 300);
        }

        return () => clearTimeout(timer);
    }, [open]);

    useEffect(() => {
        if (!isVisible) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose?.();
            }
        };

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex justify-end">
            {/* Overlay */}
            <div
                className={`
                    absolute inset-0 bg-black/50 backdrop-blur-[2px]
                    transition-opacity duration-300 ease-in-out
                    ${isAnimating ? 'opacity-100' : 'opacity-0'}
                `}
                onClick={onClose}
            />

            {/* Modal Right */}
            <div
                style={{ width: `min(${width}px, 100vw)` }}
                className={`
                    relative z-10 flex h-full max-w-full flex-col
                    bg-white shadow-2xl
                    border-l border-gray-200 dark:border-gray-700
                    dark:bg-gray-800
                    transform-gpu
                    transition-transform duration-300 ease-in-out
                    ${isAnimating ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                {/* Header */}
                <div className="
                    flex shrink-0 items-center justify-between gap-4
                    border-b border-gray-200 px-6 py-5
                    dark:border-gray-700
                ">
                    <div className="min-w-0">
                        <h2 className="
                            text-lg font-semibold text-gray-800
                            dark:text-gray-100
                        ">
                            {title}
                        </h2>

                        {description && (
                            <p className="
                                mt-1 text-sm text-gray-500
                                dark:text-gray-400
                            ">
                                {description}
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            flex h-9 w-9 shrink-0 items-center justify-center
                            rounded-lg text-gray-500 transition-all
                            hover:bg-gray-100 hover:text-gray-800
                            dark:text-gray-400 dark:hover:bg-gray-700
                            dark:hover:text-gray-100
                        "
                    >
                        <FaTimes size={16} />
                    </button>
                </div>

                {/* Content */}
                <div className="
                    min-h-0 flex-1 overflow-y-auto
                    px-6 py-5
                ">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="
                        shrink-0 border-t border-gray-200
                        bg-white px-6 py-4
                        dark:border-gray-700 dark:bg-gray-800
                    ">
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default RightModal;
