import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { FaShoppingCart,  } from "react-icons/fa";
import { LuUserRoundCheck, LuUserMinus, LuChevronDown } from "react-icons/lu";

import ModalManagerCart from "../ModalManagerCart/ModalManagerCart";
import DarkMode from "../DarkMode/DarkMode";
import myContext from "../../Context/MyContext";

import { dataNavbar } from "../../utils/data/dataNavbar";
import Lotus from "../../assest/website/lotus.png";

const userLogin = JSON.parse(localStorage.getItem("user"));

function Header() {
  const { pathname } = useLocation();
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
    localStorage.clear("user");
    window.location.href = "/login";
  };

  return (
    <div className="shadow-md  dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <span
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer group transition-all duration-300"
            >
              <div className="relative w-12 h-12">
                {/* Ảnh logo */}
                <img
                  src={Lotus}
                  alt="Logo"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold italic text-gray-400 dark:text-orange-200 group-hover:text-orange-500 transition-colors duration-300">
                ShopTamLinh
              </h1>
            </span>
          </div>

          <div className="flex justify-between items-center gap-4 relative">
            <div className="group relative hidden md:block">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 
                         rounded-full border border-priamry px-2 py-1 focus:border-primary focus:outline-none focus:border-1 dark:bg-gray-800 dark:border-gray-500"
                ></input>
              </form>
              <ImSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>

            <DarkMode></DarkMode>
            {/* order btn */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white focus:outline-none py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Order
              </span>
              <FaShoppingCart className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>
            <span>
              <ModalManagerCart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
              />
            </span>

            {userLogin !== null ? (
              <div className="text-lg p-2 rounded-full bg-primary hover:cursor-pointer hover:bg-primary/80 flex items-center justify-center group ">
                <LuUserRoundCheck className=""></LuUserRoundCheck>
                <div className="relative">
                  <div className="w-[50px] bg-transparent z-10 absolute py-4 right-0 "></div>
                  <ul
                    className="absolute hidden group-hover:block  bg-white z-10
                                    shadow border border-gray-200 right-0 rounded-md mt-6 px-4 pb-4 text-left w-[200px]"
                  >
                    {userLogin?.role === "user" ? (
                      <li className="text-base text-gray-600  hover:text-primary py-2">
                        <NavLink to="/system-account/my-account/">
                          Thông Tin Tài Khoản
                        </NavLink>
                      </li>
                    ) : (
                      <li className="text-base text-gray-600  hover:text-primary py-2">
                        <NavLink to="/admin/category-mng">
                          Trang Quản Lý
                        </NavLink>
                      </li>
                    )}
                    {userLogin && (
                      <li className="text-base text-gray-600 hover:text-primary   py-2">
                        <button onClick={logout}>Đăng Xuất</button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  navigate("/login");
                }}
                className="flex items-center justify-center cursor-pointer py-1 px-2 rounded-2xl gap-2 group bg-primary hover:bg-primary/80"
              >
                <span className="text-base font-semibold group-hover:block hidden transition-all duration-200 text-white">
                  Đăng Nhập
                </span>
                <span className="text-white">
                  <LuUserMinus size={"20px"}></LuUserMinus>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* lower Navbar */}
    {/* lower Navbar */}
<div className="bg-gradient-to-r from-white via-primary/10 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b border-primary/20">
  <ul className="sm:flex hidden items-center justify-center gap-8 py-2">
    {dataNavbar?.map((data) => {
      const isActive = pathname === data.link;
      return (
        <li key={data.id}>
          <span
            onClick={() => navigate(`${data.link}`)}
            className={`relative inline-block py-1 text-lg font-medium cursor-pointer
              transition-colors duration-300 hover:text-primary
              after:content-[''] after:absolute after:left-1/2 after:-bottom-0.5 after:h-[2px]
              after:-translate-x-1/2 after:rounded-full
              after:bg-gradient-to-r after:from-primary after:to-secondary
              after:transition-all after:duration-300 after:ease-out
              hover:after:w-full
              ${
                isActive
                  ? "text-primary after:w-full"
                  : "text-gray-700 dark:text-gray-200 after:w-0"
              }`}
          >
            {data.name}
          </span>
        </li>
      );
    })}

    {/* Danh Mục */}
    <li className="group relative cursor-pointer">
      <div
        className="relative flex items-center gap-2 py-1 text-lg font-medium
          text-gray-700 dark:text-gray-200 transition-colors duration-300 group-hover:text-primary
          after:content-[''] after:absolute after:left-1/2 after:-bottom-0.5 after:h-[2px] after:w-0
          after:-translate-x-1/2 after:rounded-full
          after:bg-gradient-to-r after:from-primary after:to-secondary
          after:transition-all after:duration-300 after:ease-out
          group-hover:after:w-full"
      >
        Danh Mục
        <span
          className="flex items-center justify-center w-5 h-5 rounded-full
            bg-primary/15 text-primary
            transition-all duration-300
            group-hover:bg-primary group-hover:text-white group-hover:rotate-180"
        >
         <LuChevronDown className="text-sm" />
        </span>
      </div>

      {/* wrapper pt-3 để di chuột xuống dropdown không bị mất hover */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-full z-[999] pt-3 w-[220px]
          invisible opacity-0 translate-y-3
          group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-300 ease-out"
      >
        <ul
          className="relative rounded-xl bg-white dark:bg-gray-800 p-2 shadow-xl shadow-primary/20 border border-primary/20
            before:content-[''] before:absolute before:-top-1.5 before:left-1/2 before:-translate-x-1/2
            before:w-3 before:h-3 before:rotate-45 before:bg-white dark:before:bg-gray-800
            before:border-l before:border-t before:border-primary/20"
        >
          {getAllCategories.map((data) => (
            <li key={data.id}>
              <span
                onClick={() => {
                  setSelectedCategory(data.name);
                  const queryParams = new URLSearchParams({
                    keyword: search,
                    category: data.name,
                  }).toString();
                  navigate(`/allproduct/search?${queryParams}`);
                }}
                className="relative block w-full text-base rounded-lg px-4 py-2 cursor-pointer
                  text-gray-700 dark:text-gray-200
                  transition-all duration-300
                  before:content-[''] before:absolute before:left-1 before:top-1/2 before:-translate-y-1/2
                  before:h-0 before:w-[3px] before:rounded-full before:bg-primary
                  before:transition-all before:duration-300
                  hover:before:h-5 hover:pl-6 hover:text-primary hover:bg-primary/10"
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
    </div>
  );
}

export default Header;
