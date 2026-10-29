import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";

import { dataSideBarUser } from "../../utils/data/dataSideBarUser";
import myContext from "../../Context/MyContext";

function SideBarUser() {
  const { getOrderByUserDetailFunction, userOrderDetail } =
    useContext(myContext);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    getOrderByUserDetailFunction(user?.uid);
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const orderCount = userOrderDetail?.length ?? 0;

  return (
    <aside
      className="lg:sticky lg:top-4 self-start rounded-2xl p-3 lg:p-4
        bg-white dark:bg-[#131a2a]"
    >
      <h1
        className="font-bold text-xl px-4 pb-3 mb-3 text-center lg:text-left
          text-gray-600 dark:text-gray-100
          border-b border-orange-200 dark:border-white/10"
      >
        Tài Khoản
      </h1>

      {/* mobile: cuộn ngang, desktop: xếp dọc */}
      <nav className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible p-1">
        {dataSideBarUser.map((menu) => (
          <NavLink
            to={menu?.path}
            id={menu?.id}
            key={menu?.id}
            className={({ isActive }) =>
              `group relative flex items-center justify-between gap-3 whitespace-nowrap
               rounded-xl px-4 py-2.5 text-base font-semibold cursor-pointer
               transition-all duration-300 ease-out
               before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2
               before:w-[3px] before:rounded-full before:bg-primary before:transition-all before:duration-300
               hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20
               ${
                 isActive
                   ? "bg-primary/10 text-primary shadow-md shadow-primary/20 before:h-6"
                   : "text-gray-600 dark:text-gray-200 before:h-0 hover:before:h-4 hover:text-primary hover:bg-orange-50 dark:hover:bg-white/5"
               }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  {menu.name}
                </span>

                {menu.name === "Quản Lý Đơn Hàng" && (
                  <span
                    className={`flex h-6 min-w-[24px] items-center justify-center rounded-full px-2
                      text-xs font-bold transition-all duration-300 group-hover:scale-110
                      ${
                        isActive
                          ? "bg-primary text-white shadow-md shadow-primary/40"
                          : "bg-primary/15 text-primary group-hover:bg-primary group-hover:text-white"
                      }`}
                  >
                    {orderCount}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default SideBarUser;