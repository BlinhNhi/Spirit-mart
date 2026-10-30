import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaStickyNote,
  FaCheck,
  FaMoneyBillWave,
  FaArrowLeft,
} from "react-icons/fa";
import { IoSadSharp } from "react-icons/io5";

import myContext from "../../../Context/MyContext";
import Loader from "../../../Component/Loader/Loader";
import Button from "../../../Component/Button";
import { formatTime } from "../../../utils/format/formatTime";

// các bước hiển thị trên thanh tiến trình
const STEPS = [
  "Đang xử lý",
  "Chấp nhận",
  "Bàn giao vận chuyển",
  "Đã giao hàng",
];

// màu badge giữ như code cũ
const STATUS_BADGE = {
  'waiting': "bg-gray-500/10 text-gray-600 dark:text-gray-200",
  'accepted': "bg-primary/10 text-primary",
  'shipped': "bg-green-500/10 text-green-500",
  'in-transit': "bg-blue-500/10 text-blue-500",
  'delivered': "bg-red-500/10 text-red-500",
};

const STATUS_LABEL = {
  'waiting': "Đang xử lý",
  'accepted': "Chấp nhận",
  'shipped': "Bàn giao vận chuyển",
  'in-transit': "Đang vận chuyển",
  'delivered': "Đã giao hàng",
};

const cardClass =
  "rounded-2xl bg-white dark:bg-[#131a2a] border border-orange-200 dark:border-white/10 shadow-sm";

/* một dòng thông tin có icon */
function InfoRow({ Icon, label, children }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon size={14} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <div className="font-semibold text-sm md:text-base text-gray-600 dark:text-gray-200 break-words">
          {children}
        </div>
      </div>
    </div>
  );
}

/* card sản phẩm, mô tả thu gọn / mở rộng */
function ProductCard({ item, index }) {
  const [open, setOpen] = useState(false);
  const price = Number(String(item?.price ?? 0).replace(/\./g, "")) || 0;
  const qty = Number(item?.quantityOrder) || 0;

  return (
    <div
      style={{
        animation: `orderDetailFadeUp 0.45s ease-out ${index * 80}ms both`,
      }}
      className={`${cardClass} p-4 sm:p-5 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/60 transition-all duration-300`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-base md:text-lg font-bold text-gray-600 dark:text-gray-100">
          {item?.name}
        </h3>
        {item?.category && (
          <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
            {item?.category}
          </span>
        )}
      </div>

      <div className="mt-2">
        <p
          className={`text-sm text-gray-600 dark:text-gray-200 opacity-80 ${
            open ? "" : "line-clamp-2"
          }`}
          dangerouslySetInnerHTML={{ __html: item?.description }}
        />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="mt-1 text-sm font-medium text-primary hover:underline"
        >
          {open ? "Thu gọn" : "Xem thêm"}
        </button>
      </div>

      <div className="mt-4 flex items-end justify-between border-t border-orange-200 dark:border-white/10 pt-3">
        <p className="text-sm text-gray-600 dark:text-gray-200">
          {price.toLocaleString("vi-VN")} vnđ
          <span className="mx-2 opacity-50">x</span>
          <span className="font-bold">{qty}</span>
        </p>
        <p className="text-lg font-bold text-primary">
          {(price * qty).toLocaleString("vi-VN")} vnđ
        </p>
      </div>
    </div>
  );
}

function OrderDetail() {
  let { id } = useParams();
  const { loading, orderDetail, getOrderDetailFunction } =
    useContext(myContext);

  useEffect(() => {
    getOrderDetailFunction(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const calculateTotalPrice = (cartItems) => {
    return (
      cartItems?.reduce((sum, item) => {
        const price = Number(String(item?.price ?? 0).replace(/\./g, ""));
        const quantity = Number(item?.quantityOrder) || 0;
        return sum + (Number.isFinite(price) ? price : 0) * quantity;
      }, 0) ?? 0
    );
  };

  // vị trí bước hiện tại (status 4 "Đang vận chuyển" nằm cùng bước bàn giao)
  const status = orderDetail?.status;
  const currentStep =
    status === 1 ? 0 : status === 2 ? 1 : status === 3 || status === 4 ? 2 : 3;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
      <style>{`
        @keyframes orderDetailFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="container">
        {loading ? (
          <div className="p-20">
            <Loader></Loader>
          </div>
        ) : (
          <div>
            {orderDetail ? (
              <div className="py-10">
                {/* header */}
                <NavLink
                  to="/system-account/manager-order/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-200 hover:text-primary transition-colors"
                >
                  <FaArrowLeft size={12} />
                  Quay lại đơn hàng
                </NavLink>

                <div
                  style={{ animation: "orderDetailFadeUp 0.45s ease-out both" }}
                  className={`${cardClass} relative overflow-hidden mt-4 p-5 sm:p-7`}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-primary/25 via-primary/10 to-transparent" />

                  <div className="relative flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold uppercase text-primary">
                        Chi tiết đơn hàng
                      </p>
                      {/* <h1 className="mt-1 text-lg sm:text-2xl font-extrabold text-gray-600 dark:text-gray-100 break-all">
                        #{orderDetail?.id}
                      </h1> */}
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-200 opacity-80">
                        Đặt lúc{" "}
                        <span className="font-bold">{formatTime(orderDetail?.date)}</span>
                      </p>
                    </div>
                    <span
                      className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold ${
                        STATUS_BADGE[status] || STATUS_BADGE[5]
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full bg-current ${
                          status === 1 ? "animate-pulse" : ""
                        }`}
                      />
                      {STATUS_LABEL[status] || STATUS_LABEL[5]}
                    </span>
                  </div>

                  {/* thanh tiến trình */}
                  <div className="relative mt-7 flex items-start">
                    {STEPS.map((step, i) => {
                      const done = i <= currentStep;
                      return (
                        <div
                          key={step}
                          className="relative flex flex-1 flex-col items-center text-center"
                        >
                          {/* đường nối sang bước trước */}
                          {i > 0 && (
                            <div
                              className={`absolute right-1/2 top-4 h-1 w-full -translate-y-1/2 rounded-full transition-colors duration-500 ${
                                i <= currentStep
                                  ? "bg-primary"
                                  : "bg-gray-200 dark:bg-white/10"
                              }`}
                            />
                          )}
                          <div
                            className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ${
                              done
                                ? "bg-primary text-white shadow-md shadow-primary/40"
                                : "bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400"
                            } ${i === currentStep ? "ring-4 ring-primary/25" : ""}`}
                          >
                            {i < currentStep ? <FaCheck size={12} /> : i + 1}
                          </div>
                          <p
                            className={`mt-2 px-1 text-xs sm:text-sm font-medium ${
                              done
                                ? "text-primary"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {step}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* nội dung chính */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
                  {/* trái: sản phẩm + địa chỉ */}
                  <div className="flex flex-col gap-6 min-w-0">
                    <div>
                      <h2 className="mb-3 text-base md:text-xl font-bold text-gray-600 dark:text-gray-100">
                        Sản phẩm{" "}
                        <span className="text-gray-400 dark:text-gray-500">
                          ({orderDetail?.cartItems?.length || 0})
                        </span>
                      </h2>
                      <div className="flex flex-col gap-4">
                        {orderDetail?.cartItems?.map((item, index) => (
                          <ProductCard key={index} item={item} index={index} />
                        ))}
                      </div>
                    </div>

                    <div
                      style={{
                        animation:
                          "orderDetailFadeUp 0.45s ease-out 200ms both",
                      }}
                      className={`${cardClass} p-5 sm:p-6`}
                    >
                      <h2 className="mb-5 text-base md:text-xl font-bold text-gray-600 dark:text-gray-100">
                        Địa chỉ giao hàng
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <InfoRow Icon={FaUser} label="Tên khách hàng">
                          {orderDetail?.addressInfo?.name}
                        </InfoRow>
                        <InfoRow Icon={FaPhoneAlt} label="Số điện thoại">
                          {orderDetail?.addressInfo?.mobileNumber}
                        </InfoRow>
                        <div className="sm:col-span-2">
                          <InfoRow Icon={FaMapMarkerAlt} label="Địa chỉ">
                            <span className="text-primary">
                              {orderDetail?.addressInfo?.address}
                            </span>
                            <span className="block text-sm font-medium text-gray-600 dark:text-gray-200 opacity-80">
                              {orderDetail?.addressInfo?.ward},{" "}
                              {orderDetail?.addressInfo?.district},{" "}
                              {orderDetail?.addressInfo?.province}
                            </span>
                          </InfoRow>
                        </div>
                      </div>

                      <div className="mt-5 rounded-xl border border-dashed border-orange-200 dark:border-white/15 bg-orange-50/50 dark:bg-white/5 p-4">
                        <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-200">
                          <FaStickyNote className="text-primary" />
                          Ghi chú sản phẩm
                        </p>
                        <p
                          className="text-sm md:text-base font-medium italic text-gray-600 dark:text-gray-200"
                          dangerouslySetInnerHTML={{
                            __html: orderDetail?.addressInfo?.note,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* phải: tổng kết (sticky) */}
                  <div
                    style={{
                      animation: "orderDetailFadeUp 0.45s ease-out 300ms both",
                    }}
                    className="lg:sticky lg:top-4 rounded-3xl p-6 sm:p-7 shadow-xl bg-gray-800 dark:bg-[#131a2a] border border-transparent dark:border-white/10"
                  >
                    <h3 className="text-xl font-bold text-gray-100">
                      Tổng kết đơn hàng
                    </h3>

                    <div className="mt-5 flex flex-col gap-3 text-gray-200">
                      <div className="flex justify-between">
                        <span className="opacity-80">Số sản phẩm</span>
                        <span className="font-semibold">
                          {orderDetail?.cartItems?.length || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="opacity-80">Thanh toán</span>
                        <span className="flex items-center gap-2 font-semibold text-right">
                          <FaMoneyBillWave className="text-primary" />
                          COD
                        </span>
                      </div>
                    </div>

                    <p className="mt-2 text-xs text-gray-200 opacity-60">
                      Thanh toán khi nhận hàng.
                    </p>

                    <div className="my-5 border-t border-white/15" />

                    <div className="flex items-end justify-between">
                      <span className="font-semibold text-gray-200">
                        Tổng hoá đơn
                      </span>
                      <span className="text-2xl font-extrabold text-primary">
                        {calculateTotalPrice(
                          orderDetail?.cartItems,
                        )?.toLocaleString("vi-VN")}{" "}
                        vnđ
                      </span>
                    </div>

                    <div className="mt-6 w-full">
                      <Button className="w-full">  Đã nhận hàng</Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[500px] px-8 flex items-center justify-center flex-col gap-2 ">
                <IoSadSharp size={40} className="text-primary" />
                <h1 className="text-xl font-semibold text-primary">Opps!</h1>
                <h1 className="text-lg font-semibold text-primary">
                  Không tìm thấy đơn hàng.
                </h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderDetail;
