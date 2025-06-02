import React, { useState } from "react";
import { FaDownload, FaEnvelope, FaTimes, FaPlus } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { BsMessenger } from "react-icons/bs";
import { LuPhoneOutgoing } from "react-icons/lu";

const FloatingContact = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleContact = () => setIsOpen(!isOpen);

    return (
        <div className="fixed right-9 sm:right-4 top-1/3 z-50 flex flex-col items-end gap-3">
            {/* Các icon liên hệ */}
            <div
                className={`flex flex-col items-end gap-3 transition-all duration-500 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
            >
                <button className="bg-red-600 p-2 text-sm sm:text-base sm:p-3 rounded-full text-white shadow-lg hover:scale-110 transition">
                    <LuPhoneOutgoing />
                </button>
                <button className="bg-blue-500 p-2 text-sm sm:text-base sm:p-3 rounded-full text-white shadow-lg hover:scale-110 transition">
                    <BsMessenger />
                </button>
                <button className="bg-blue-600 p-2 text-sm sm:text-base sm:p-3 rounded-full text-white shadow-lg hover:scale-110 transition">
                    <SiZalo />
                </button>
                <button className="bg-yellow-600 p-2 text-sm sm:text-base sm:p-3 rounded-full text-white shadow-lg hover:scale-110 transition">
                    <FaDownload />
                </button>
                <button className="bg-green-600 p-2 text-sm sm:text-base sm:p-3 rounded-full text-white shadow-lg hover:scale-110 transition">
                    <FaEnvelope />
                </button>
            </div>

            {/* Nút toggle hiển thị/ẩn */}
            <button
                onClick={toggleContact}
                className="bg-primary p-2 text-sm sm:text-base sm:p-3  rounded-full text-white shadow-lg hover:rotate-90 transition-all duration-300"
            >
                {isOpen ? <FaTimes /> : <FaPlus />}
            </button>
        </div>
    );
};

export default FloatingContact;




