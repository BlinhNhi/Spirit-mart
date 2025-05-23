import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { FaShoppingCart, FaAngleDown } from "react-icons/fa";
import { LuUserRoundCheck, LuUserMinus } from "react-icons/lu";

import ModalManagerCart from "../ModalManagerCart/ModalManagerCart";
import DarkMode from '../DarkMode/DarkMode';
import Logo from '../../assest/logo.png'

const Menu = [
    {
        id: 1,
        name: "Trang Chủ",
        link: "/"
    },
    {
        id: 2,
        name: "Tin Tức",
        link: "/posts"
    },
    {
        id: 3,
        name: "Giới Thiệu",
        link: "/"
    },
]

const DropdownLinks = [
    {
        id: 1,
        name: "Quần Áo",
        link: "/category/quanao"
    },
    {
        id: 2,
        name: "Giày Dép",
        link: "/category/giaydep"
    },
    {
        id: 3,
        name: "Sách Vở",
        link: "/category/sachvo"
    }
]

const searchData = [
    {
        name: 'Fashion',
        image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg'
    },
    {
        name: 'Shirt',
        image: 'https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg'
    },
    {
        name: 'Jacket',
        image: 'https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg'
    },
    {
        name: 'Mobile',
        image: 'https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg'
    },
    {
        name: 'Laptop',
        image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg'
    },
    {
        name: 'Home',
        image: 'https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg'
    },
    {
        name: 'book',
        image: 'https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg'
    },
]
const userLogin = JSON.parse(localStorage.getItem('user'));

function Header() {
    const [search, setSearch] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const navigate = useNavigate();

    // Filter Search Data
    const filterSearchData = searchData.filter((obj) => obj.name?.toLowerCase().includes(search?.toLocaleLowerCase())).slice(0, 8);
    const logout = () => {
        localStorage.clear('user');
        window.location.reload();
    }
    return (
        <div className='shadow-md  dark:bg-gray-900 dark:text-white duration-200 relative z-40'>
            <div className='bg-primary/40 py-2'>
                <div className='container flex justify-between items-center'>
                    <div>
                        <span onClick={() => { navigate('/') }} className="font-bold text-2xl sm:text-3xl flex gap-2 hover:cursor-pointer hover:no-underline hover:text-gray-400 dark:hover:text-orange-200">
                            <img src={Logo} className="w-10 uppercase" alt='Logo'></img>ShopSy
                        </span>
                    </div>

                    <div className='flex justify-between items-center gap-4 relative'>
                        <div className='group relative hidden md:block'>
                            <input
                                type='text'
                                placeholder='Search'
                                onChange={(e) => setSearch(e.target.value)}
                                className='w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 
                         rounded-full border border-priamry px-2 py-1 focus:border-primary focus:outline-none focus:border-1 dark:bg-gray-800 dark:border-gray-500'
                            ></input>
                            <ImSearch className='text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3' />
                        </div>
                        <div className="">
                            {search && <div className="block absolute top-8 left-0 bg-gray-200 w-96 md:w-96 lg:w-96 z-5 my-1 rounded-lg px-2 py-2">
                                {filterSearchData.length > 0 ?
                                    <>
                                        {filterSearchData.map((item, index) => {
                                            return (
                                                <div key={index} className="py-2 px-2">
                                                    <div className="flex items-center gap-2 text-gray-500 font-normal">
                                                        <img className="w-10" src={item.image} alt="" />
                                                        {item.name}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </>
                                    :

                                    <>
                                        <div className="flex flex-col justify-center items-center gap-2">
                                            <img className=" w-20" src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" alt="img" />
                                            <p className="text-gray-500 font-semibold text-lg ">Không tìm thấy sản phẩm</p>
                                        </div>
                                    </>}
                            </div>
                            }
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
                                        <li className="text-base text-gray-600  hover:text-primary py-2">
                                            <NavLink to="/system-account/my-account/">Thông Tin Tài Khoản</NavLink>
                                        </li>
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
                    {Menu.map((data) => (
                        <li key={data.id}>
                            <span className="inline-block px-4 text-lg hover:text-primary duration-200 hover:no-underline hover:cursor-pointer" onClick={() => navigate(`${data.link}`)}>
                                {data.name}
                            </span>
                        </li>
                    ))}
                    <li className="group relative cursor-pointer">
                        <div className="flex items-center gap-[4px] py-2 hover:no-underline dark:hover:text-orange-400">
                            Danh Mục
                            <span>
                                <FaAngleDown className="transition-all duration-200 group-hover:rotate-180 " />
                            </span>
                        </div>
                        <div className="absolute z-[999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                            <ul>
                                {DropdownLinks.map((data) => (
                                    <li key={data.id} >
                                        <NavLink to={data.link} className="inline-block w-full text-lg rounded-md p-2 hover:bg-primary/20 hover:no-underline">{data.name}</NavLink>
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