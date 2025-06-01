import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { FaShoppingCart, FaAngleDown } from "react-icons/fa";
import { LuUserRoundCheck, LuUserMinus } from "react-icons/lu";

import ModalManagerCart from "../ModalManagerCart/ModalManagerCart";
import DarkMode from '../DarkMode/DarkMode';
import myContext from "../../Context/MyContext";

import { dataNavbar } from "../../utils/data/dataNavbar";

const userLogin = JSON.parse(localStorage.getItem('user'));

function Header() {
    const [search, setSearch] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const navigate = useNavigate();
    const { getAllCategories } = useContext(myContext);
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams({
            keyword: search,
            category: selectedCategory,
        }).toString();

        navigate(`/allproduct/search?${queryParams}`);
    };

    const logout = () => {
        localStorage.clear('user');
        window.location.href = "/login";
    }

    return (
        <div className='shadow-md  dark:bg-gray-900 dark:text-white duration-200 relative z-40'>
            <div className='bg-primary/40 py-2'>
                <div className='container flex justify-between items-center'>
                    <div>
                        <span
                            onClick={() => navigate('/')}
                            className="flex items-center gap-3 cursor-pointer group transition-all duration-300"
                        >
                            <div className="relative w-12 h-12">
                                {/* Ảnh logo */}
                                <img
                                    src="https://getdrawings.com/vectors/lotus-flower-vector-1.png"
                                    alt="Logo"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-semibold italic text-gray-400 dark:text-orange-200 group-hover:text-orange-500 transition-colors duration-300">
                                ShopTamLinh
                            </h1>
                        </span>
                    </div>

                    <div className='flex justify-between items-center gap-4 relative'>
                        <div className='group relative hidden md:block'>
                            <form onSubmit={handleSearch}>
                                <input
                                    type='text'
                                    placeholder='Search'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className='w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 
                         rounded-full border border-priamry px-2 py-1 focus:border-primary focus:outline-none focus:border-1 dark:bg-gray-800 dark:border-gray-500'
                                ></input>
                            </form>
                            <ImSearch className='text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3' />
                        </div>

                        <DarkMode></DarkMode>
                        {/* order btn */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white focus:outline-none py-1 px-4 rounded-full flex items-center gap-3 group"
                        >
                            <span className='group-hover:block hidden transition-all duration-200'>Order</span>
                            <FaShoppingCart className='text-xl text-white drop-shadow-sm cursor-pointer' />
                        </button>
                        <span
                        >
                            <ModalManagerCart isOpen={isCartOpen}
                                onClose={() => setIsCartOpen(false)} />
                        </span>


                        {
                            userLogin !== null ? <div
                                className="text-lg p-2 rounded-full bg-primary hover:cursor-pointer hover:bg-primary/80 flex items-center justify-center group "
                            >
                                <LuUserRoundCheck className=""></LuUserRoundCheck>
                                <div className="relative">
                                    <div className="w-[50px] bg-transparent z-10 absolute py-4 right-0 "></div>
                                    <ul className="absolute hidden group-hover:block  bg-white z-10
                                    shadow border border-gray-200 right-0 rounded-md mt-6 px-4 pb-4 text-left w-[200px]">
                                        {userLogin?.role === "user" ?
                                            <li className="text-base text-gray-600  hover:text-primary py-2">
                                                <NavLink to="/system-account/my-account/">Thông Tin Tài Khoản</NavLink>
                                            </li> : <li className="text-base text-gray-600  hover:text-primary py-2">
                                                <NavLink to="/admin/category-mng">Trang Quản Lý</NavLink>
                                            </li>
                                        }
                                        {userLogin && <li className="text-base text-gray-600 hover:text-primary   py-2">
                                            <button
                                                onClick={logout}
                                            >
                                                Đăng Xuất
                                            </button>
                                        </li>}
                                    </ul>
                                </div>
                            </div> : <div
                                onClick={() => { navigate('/login') }}
                                className="flex items-center justify-center cursor-pointer py-1 px-2 rounded-2xl gap-2 group bg-primary hover:bg-primary/80">
                                <span className="text-base font-semibold group-hover:block hidden transition-all duration-200 text-white">Đăng Nhập</span>
                                <span className="text-white"><LuUserMinus size={'20px'}></LuUserMinus></span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {/* lower Navbar */}
            <div className="flex justify-center">
                <ul className="sm:flex hidden items-center gap-4">
                    {dataNavbar?.map((data) => (
                        <li key={data.id}>
                            <span className="inline-block px-4 text-lg hover:text-primary duration-200 hover:no-underline hover:cursor-pointer" onClick={() => navigate(`${data.link}`)}>
                                {data.name}
                            </span>
                        </li>
                    ))}
                    <li className="group relative cursor-pointer">
                        <div className="flex items-center gap-[4px] text-lg py-2 hover:no-underline dark:hover:text-orange-400">
                            Danh Mục
                            <span>
                                <FaAngleDown className="transition-all duration-200 group-hover:rotate-180 " />
                            </span>
                        </div>
                        <div className="absolute z-[999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                            <ul>
                                {getAllCategories.map((data) => (
                                    <li key={data.id}>
                                        <span
                                            onClick={() => {
                                                setSelectedCategory(data.name);
                                                const queryParams = new URLSearchParams({
                                                    keyword: search,
                                                    category: data.name
                                                }).toString();
                                                navigate(`/allproduct/search?${queryParams}`);
                                            }}
                                            className="inline-block w-full text-lg rounded-md p-2 hover:bg-primary/20 hover:no-underline cursor-pointer"
                                        >
                                            {data.name}
                                        </span>
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </li>
                </ul>
            </div>

        </div>);
}

export default Header;