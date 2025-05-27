import { FaCartArrowDown } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { RiAccountCircleLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

function UserManager() {
    const inforUser = JSON?.parse(localStorage.getItem('user'));
    console.log(inforUser);
    return (
        <div>
            <h3 className="font-semibold  text-xl font-sans text-gray-500 dark:text-gray-200 ">Xin chào: {inforUser?.email}</h3>
            <p className="font-semibold text-lg text-gray-500 dark:text-gray-200">Từ trang quản lý tài khoản bạn có thể xem đơn hàng, và sửa mật khẩu và thông tin tài khoản của mình.</p>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 mt-6">
                <NavLink to="/system-account/profile">
                    <div className="py-8 border-2 shadow-lg border-gray-300 rounded-md flex flex-col gap-2 items-center hover:bg-gray-200
                 hover:cursor-pointer hover:border-gray-400 text-gray-400  hover:text-gray-600 dark:hover:bg-primary dark:hover:text-gray-200 
                 dark:hover:border-gray-200 transition-transform duration-300 transform hover:scale-105 active:scale-95
                 ">
                        <RiAccountCircleLine className="text-4xl font-semibold "></RiAccountCircleLine>
                        <h3 className="font-semibold text-xl  ">Tài Khoản</h3>
                    </div>
                </NavLink>
                <NavLink to="/cartpage">
                    <div className="py-8 border-2 shadow-lg border-gray-300 rounded-md flex flex-col gap-2 items-center hover:bg-gray-200
                 hover:cursor-pointer hover:border-gray-40 text-gray-400 hover:text-gray-600 dark:hover:bg-primary dark:hover:text-gray-200 
                 dark:hover:border-gray-200 transition-transform duration-300 transform hover:scale-105 active:scale-95
                 ">
                        <FaCartArrowDown className="text-4xl font-semibold "></FaCartArrowDown>
                        <h3 className="font-semibold text-xl">Giỏ Hàng</h3>
                    </div>
                </NavLink>
                <button
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = '/login';
                    }}
                    className="py-8 border-2 shadow-lg border-gray-300 rounded-md flex flex-col gap-2 items-center hover:bg-gray-200
                 hover:cursor-pointer hover:border-gray-40 text-gray-400 hover:text-gray-600 dark:hover:bg-primary dark:hover:text-gray-200 
                 dark:hover:border-gray-200 transition-transform duration-300 transform hover:scale-105 active:scale-95
                 ">
                    <IoMdLogOut className="text-4xl font-semibold "></IoMdLogOut>
                    <h3 className="font-semibold text-xl">Đăng Xuất</h3>
                </button>

            </div>
        </div>
    );
}

export default UserManager;