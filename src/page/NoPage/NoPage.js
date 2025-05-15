import React from "react";
import { Link } from "react-router-dom";
import { FaRegFaceSadTear } from "react-icons/fa6";

const NoPage = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200 ">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="text-center">
                    <div className="flex justify-center mb-6 flex-col gap-4 items-center animate-bounce">
                        <FaRegFaceSadTear className="text-orange-500 text-6xl" />
                        <h1 className="text-2xl font-bold text-gray-500 dark:text-gray-200">404</h1>
                    </div>
                    <p className="text-lg text-gray-500 dark:text-gray-200 mb-6">
                        Oops! Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
                    </p>
                    <Link
                        to="/"
                        className="inline-block px-2 py-2 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition duration-300"
                    >
                        Quay về Trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NoPage;
