import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { FaShoppingCart } from "react-icons/fa";
import {
  LuUserRoundCheck,
  LuUserMinus,
  LuChevronDown,
  LuLogIn,
  LuLogOut,
  LuLayoutDashboard,
  LuUserRound,
} from "react-icons/lu";

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

  // bỏ focus để menu tự đóng sau khi bấm một mục
  const closeMenu = () => document.activeElement?.blur();

  const isCustomer = userLogin?.role === "user";
  const avatarLetter = (userLogin?.email || userLogin?.name || "U")
    .charAt(0)
    .toUpperCase();

  const logout = () => {
    localStorage.clear("user");
    window.location.href = "/login";
  };

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md dark:text-white duration-200">
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <span
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer group transition-all duration-300"
            >
              <div className="relative w-12 h-12">
                {/* vòng sáng cam – hồng xoay chậm quanh logo */}
                <span
                  aria-hidden="true"
                  className="absolute -inset-1 rounded-full opacity-70 blur-[2px]
          bg-[conic-gradient(from_0deg,theme(colors.orange.400),theme(colors.pink.400),theme(colors.orange.400))]
          animate-[spin_6s_linear_infinite] motion-reduce:animate-none
          group-hover:opacity-100 group-hover:blur-[4px] transition-all duration-300"
                />
                {/* hào quang thở nhẹ phía sau */}
                <span
                  aria-hidden="true"
                  className="absolute -inset-2 rounded-full bg-orange-300/40 blur-md animate-pulse motion-reduce:animate-none dark:bg-orange-400/30"
                />
                {/* Ảnh logo: chạm vào thì xoay một vòng và phóng nhẹ */}
                <img
                  src={Lotus}
                  alt="Logo"
                  className="relative w-full h-full rounded-full object-cover bg-white/90 p-0.5 dark:bg-gray-900
          transition-transform duration-700 ease-in-out
          group-hover:scale-110"
                />
              </div>

              <h1
                className="relative text-2xl sm:text-3xl font-bold italic tracking-wide
        bg-gradient-to-r 
        dark:from-orange-300 dark:via-pink-300 dark:to-orange-300 !text-primary
        bg-[length:200%_auto] bg-left group-hover:bg-right
        bg-clip-text text-transparent
        drop-shadow-[0_2px_6px_rgba(242,176,74,0.45)]
        transition-[background-position] duration-700"
              >
                ShopTamLinh
                {/* gạch chân gradient chạy ra khi chạm vào */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-orange-300 to-pink-200 transition-all duration-500 group-hover:w-full"
                />
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
                  maxLength={100}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-[200px] group-hover:w-[300px] focus:w-[300px]
        transition-all duration-300 ease-out
        rounded-full border border-primary py-1 pl-3 pr-10 text-ellipsis
        focus:border-primary focus:outline-none
        dark:bg-gray-800 dark:border-gray-500"
                />
                <button
                  type="submit"
                  aria-label="Tìm kiếm"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 group-hover:text-primary transition-colors duration-300"
                >
                  <ImSearch />
                </button>
              </form>
            </div>

            <DarkMode></DarkMode>
            {/* order btn */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Giỏ hàng"
              className="group flex items-center rounded-full py-1 px-4 text-white
    bg-gradient-to-r from-primary to-secondary
    hover:shadow-lg hover:shadow-primary/30 active:scale-95
    transition-all duration-300 focus:outline-none"
            >
              <span
                className="max-w-0 overflow-hidden whitespace-nowrap opacity-0
      transition-all duration-300 ease-out
      group-hover:max-w-[4rem] group-hover:opacity-100 group-hover:mr-3"
              >
                Order
              </span>
              <FaShoppingCart className="shrink-0 text-xl text-white drop-shadow-sm" />
            </button>

            <span>
              <ModalManagerCart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
              />
            </span>

            {userLogin !== null ? (
              <div className="group relative">
                {/* avatar */}
                <button
                  type="button"
                  aria-label="Tài khoản"
                  aria-haspopup="menu"
                  className="flex items-center gap-1.5 rounded-full bg-primary/20 py-1 pl-1 pr-2
        hover:bg-primary/40 group-focus-within:bg-primary/40
        transition-colors duration-300 focus:outline-none"
                >
                  <span
                    className="relative flex h-9 w-9 items-center justify-center rounded-full
        bg-gradient-to-br from-primary to-secondary text-base font-bold text-white
        shadow-md shadow-primary/30 ring-2 ring-white/70 dark:ring-white/20"
                  >
                    {avatarLetter}
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900" />
                  </span>
                  <LuChevronDown
                    className="text-sm text-gray-700 dark:text-gray-200 transition-transform duration-300
          group-hover:rotate-180 group-focus-within:rotate-180"
                  />
                </button>

                {/* menu thả xuống (pt-3 để di chuột xuống không bị mất hover) */}
                <div
                  role="menu"
                  className="absolute right-0 top-full z-[999] w-[270px] pt-3
        invisible opacity-0 translate-y-2
        group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
        group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0
        transition-all duration-300 ease-out"
                >
                  <div
                    className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#131a2a]
          border border-orange-200 dark:border-white/10 shadow-xl shadow-primary/20
          before:content-[''] before:absolute before:-top-1.5 before:right-5
          before:h-3 before:w-3 before:rotate-45 before:bg-white dark:before:bg-[#131a2a]
          before:border-l before:border-t before:border-orange-200 dark:before:border-white/10"
                  >
                    {/* đầu thẻ: thông tin người dùng */}
                    <div className="relative flex items-center gap-3 p-4">
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-r from-primary/20 via-primary/5 to-transparent" />
                      <div
                        className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full
            bg-gradient-to-br from-primary to-secondary text-xl font-bold text-white shadow-md shadow-primary/30"
                      >
                        {avatarLetter}
                      </div>
                      <div className="relative min-w-0">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Xin chào
                        </p>
                        <p className="truncate text-sm font-bold text-gray-600 dark:text-gray-100">
                          {userLogin?.email || userLogin?.name}
                        </p>
                        <span className="mt-1 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                          {isCustomer ? "Khách hàng" : "Quản trị viên"}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-orange-200 dark:border-white/10 p-2">
                      {isCustomer ? (
                        <NavLink
                          to="/system-account/my-account/"
                          onClick={closeMenu}
                          role="menuitem"
                          className="group/item flex items-center gap-3 rounded-xl px-3 py-2.5 text-base
                text-gray-600 dark:text-gray-200 transition-all duration-300
                hover:bg-primary/10 hover:text-primary hover:translate-x-1"
                        >
                          <span
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary
                transition-all duration-300 group-hover/item:bg-primary group-hover/item:text-white"
                          >
                            <LuUserRound />
                          </span>
                          Thông Tin Tài Khoản
                        </NavLink>
                      ) : (
                        <NavLink
                          to="/admin/category-mng"
                          onClick={closeMenu}
                          role="menuitem"
                          className="group/item flex items-center gap-3 rounded-xl px-3 py-2.5 text-base
                text-gray-600 dark:text-gray-200 transition-all duration-300
                hover:bg-primary/10 hover:text-primary hover:translate-x-1"
                        >
                          <span
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary
                transition-all duration-300 group-hover/item:bg-primary group-hover/item:text-white"
                          >
                            <LuLayoutDashboard />
                          </span>
                          Trang Quản Lý
                        </NavLink>
                      )}
                    </div>

                    {/* đăng xuất */}
                    <div className="border-t border-orange-200 dark:border-white/10 p-2">
                      <button
                        type="button"
                        onClick={logout}
                        role="menuitem"
                        className="group/item flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-base
              text-red-500 transition-all duration-300 hover:bg-red-500/10 hover:translate-x-1"
                      >
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10
              transition-all duration-300 group-hover/item:bg-red-500 group-hover/item:text-white"
                        >
                          <LuLogOut />
                        </span>
                        Đăng Xuất
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="group flex items-center gap-2 rounded-full py-1.5 pl-3 pr-3 sm:pr-4
      bg-gradient-to-r from-primary to-secondary text-white font-semibold
      hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:scale-95
      transition-all duration-300 focus:outline-none"
              >
                <LuLogIn className="text-xl transition-transform duration-300 group-hover:translate-x-0.5" />
                <span className="hidden sm:inline text-base">Đăng Nhập</span>
              </button>
            )}
          </div>
        </div>
      </div>
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
