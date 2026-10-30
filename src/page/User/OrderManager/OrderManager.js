import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { IoSadSharp } from "react-icons/io5";

import myContext from "../../../Context/MyContext";
import Loader from "../../../Component/Loader/Loader";
import { formatTime } from "../../../utils/format/formatTime";
import Button from "../../../Component/Button";

const STATUS = {
  waiting: {
    label: "Đang xử lý",
    badge: "bg-gray-500/10 text-gray-600 dark:text-gray-200",
    dot: "bg-gray-500 dark:bg-gray-200",
  },
  accepted: {
    label: "Chấp nhận",
    badge: "bg-primary/10 text-primary",
    dot: "bg-primary",
  },
  shipped: {
    label: "Bàn giao vận chuyển",
    badge: "bg-green-500/10 text-green-500",
    dot: "bg-green-500",
  },
  "in-transit": {
    label: "Đang vận chuyển",
    badge: "bg-blue-500/10 text-blue-500",
    dot: "bg-blue-500",
  },
  delivered: {
    label: "Đã giao hàng",
    badge: "bg-red-500/10 text-red-500",
    dot: "bg-red-500",
  },
};

function ManagerOrder() {
  const { loading, getOrderByUserDetailFunction, userOrderDetail } =
    useContext(myContext);
  const user = JSON?.parse(localStorage.getItem("user") || []);

  useEffect(() => {
    getOrderByUserDetailFunction(user?.uid);
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((sum, item) => {
      const price = Number(String(item?.price ?? 0).replace(/\./g, ""));
      const quantity = Number(item?.quantityOrder ?? 0);
      return sum + price * quantity;
    }, 0);
  };

  const getStatus = (status) => STATUS[status] || STATUS[5];

  const orders = userOrderDetail || [];
  const grandTotal = orders.reduce(
    (sum, o) => sum + calculateTotalPrice(o?.cartItems || []),
    0,
  );
  const processingCount = orders.filter((o) => o?.status === 1).length;
  const deliveredCount = orders.filter(
    (o) => ![1, 2, 3, 4].includes(o?.status),
  ).length;

  return (
    <div>
      <style>{`
        @keyframes orderFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {loading ? (
        <div>
          <Loader></Loader>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* header */}
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold uppercase text-primary">
              Đơn hàng của bạn
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-100 ">
              Đơn hàng sẽ được xoá sau 2 tháng nếu không có vấn đề.
            </p>
          </div>

          {orders.length <= 0 ? (
            <div className="px-8 flex items-center justify-center flex-col gap-2">
              <IoSadSharp size={40} className="text-primary" />
              <h1 className="text-xl font-semibold text-primary">Oops!</h1>
              <h1 className="text-lg font-semibold text-primary">
                Không tìm thấy đơn hàng nào.
              </h1>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
              <div>
                <div className="hidden md:grid grid-cols-[1.1fr_1.3fr_1.5fr_auto] gap-4 px-6 pb-3 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  <span>Ngày</span>
                  <span>Trạng thái</span>
                  <span>Tổng</span>
                  <span className="w-[130px] text-right">Thao tác</span>
                </div>

                <div className="flex flex-col gap-4">
                  {orders.map((item, i) => {
                    const st = getStatus(item?.status);
                    return (
                      <div
                        key={item?.id ?? i}
                        style={{
                          animation: `orderFadeUp 0.45s ease-out ${i * 80}ms both`,
                        }}
                        className="group rounded-2xl p-4 sm:p-5
                          bg-white dark:bg-[#131a2a]
                          border border-orange-200 dark:border-white/10
                          shadow-sm hover:shadow-xl hover:shadow-primary/10
                          hover:-translate-y-1 hover:border-primary/60
                          transition-all duration-300"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.3fr_1.5fr_auto] gap-3 md:gap-4 md:items-center">
                          <div className="flex justify-between md:block">
                            <span className="md:hidden font-medium text-gray-500 dark:text-gray-400">
                              Ngày
                            </span>
                            <span className="font-medium text-gray-600 dark:text-gray-200">
                              {formatTime(item?.date)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center md:block">
                            <span className="md:hidden font-medium text-gray-500 dark:text-gray-400">
                              Trạng thái
                            </span>
                            <span
                              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm font-bold ${st.badge}`}
                            >
                              <span
                                className={`h-2 w-2 rounded-full ${st.dot} ${
                                  item?.status === 1 ? "animate-pulse" : ""
                                }`}
                              />
                              {st.label}
                            </span>
                          </div>

                          <div className="flex justify-between items-center md:block">
                            <span className="md:hidden font-medium text-gray-500 dark:text-gray-400">
                              Tổng
                            </span>
                            <div className="text-right md:text-left">
                              <p className="text-lg font-bold text-primary">
                                {calculateTotalPrice(
                                  item?.cartItems || [],
                                )?.toLocaleString("vi-VN")}{" "}
                                vnđ
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-200 opacity-80">
                                {item?.cartItems?.length} sản phẩm
                              </p>
                            </div>
                          </div>

                          <div className="flex md:justify-end">
                            <NavLink
                              to={`/orderDetail/${item?.id}`}
                              className="w-full md:w-[130px]"
                            >
                              <Button className="w-full">
                                <span className="flex items-center justify-center gap-2">
                                  Xem Thêm
                                  <FaArrowRight
                                    size={12}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                  />
                                </span>
                              </Button>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className="lg:sticky lg:top-4 rounded-3xl p-6 sm:p-7 shadow-xl
                  bg-white dark:bg-[#131a2a]
                  border border-transparent dark:border-white/10"
              >
                <h3 className="text-xl font-bold text-gray-600 dark:text-gray-100">
                  Tóm tắt đơn hàng
                </h3>

                <div className="mt-5 flex flex-col gap-3 text-gray-500 dark:text-gray-200">
                  <div className="flex justify-between">
                    <span className="opacity-80">Tổng số đơn</span>
                    <span className="font-semibold">{orders.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Đang xử lý</span>
                    <span className="font-semibold">{processingCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Đã giao hàng</span>
                    <span className="font-semibold">{deliveredCount}</span>
                  </div>
                </div>

                <div className="my-5 border-t border-white/15" />

                <div className="flex justify-between items-end">
                  <span className="font-semibold text-gray-500 dark:text-gray-200">
                    Tổng giá trị
                  </span>
                  <span className="text-lg font-extrabold text-primary">
                    {grandTotal.toLocaleString("vi-VN")} vnđ
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ManagerOrder;
