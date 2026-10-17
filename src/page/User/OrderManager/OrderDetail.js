import React, { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import myContext from "../../../Context/MyContext";
import Loader from "../../../Component/Loader/Loader";
import { IoSadSharp } from "react-icons/io5";

function OrderDetail() {
    let { id } = useParams();
    const { loading, orderDetail, getOrderDetailFunction } = useContext(myContext);

    useEffect(() => {
        getOrderDetailFunction(id)
    }, [])
    console.log(orderDetail);
    const calculateTotalPrice = (cartItems) => {
        return cartItems?.reduce((sum, item) => {
            const price = parseFloat(item.price.replace(/\./g, ''));
            const quantity = Number(item.quantityOrder);
            return sum + price * quantity;
        }, 0);
    };
    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <div className="container">
                {loading ? <div className="p-20"><Loader></Loader></div> :
                    <div>
                        {orderDetail > 0 ? <div className="py-10">
                            <h1 className="text-lg md:text-2xl font-bold mb-4">Chi tiết đơn hàng</h1>
                            <h4 className="text-xs md:text-base">Đơn hàng #<span className="font-semibold text-xs md:text-base">
                                {orderDetail?.id}
                            </span> đã được đặt lúc <span className="font-bold text-xs md:text-base">{orderDetail?.date}</span> và hiện tại là
                                <span className="font-bold text-xs md:text-base">
                                    {orderDetail.status === 1 ? ' Đang xử lý' : orderDetail.status === 2 ?
                                        <span className="font-bold text-xs md:text-base text-primary"> Chấp nhận</span>
                                        : orderDetail.status === 3 ?
                                            <span className="font-bold text-xs md:text-base text-green-500"> Bàn giao vận chuyển</span>
                                            :
                                            <span className="font-bold text-xs md:text-base text-red-500"> Đã giao hàng</span>}
                                </span>.
                            </h4>
                            <h2 className="text-base md:text-xl font-bold mt-4">SẢN PHẨM</h2>
                            <div className="overflow-x-auto w-full block py-2">
                                <table className="table-auto w-full mt-2 border-collapse border border-gray-300 ">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-300 px-4 py-2 text-sm font-semibold sm:text-lg">Tên sản phẩm</th>
                                            <th className="border border-gray-300 px-4 py-2 text-sm font-semibold sm:text-lg">Danh Mục</th>
                                            <th className="border border-gray-300 px-4 py-2 text-sm font-semibold sm:text-lg">Mô Tả Sản Phẩm</th>
                                            <th className="border border-gray-300 px-4 py-2 text-sm font-semibold sm:text-lg">Số lượng</th>
                                            <th className="border border-gray-300 px-4 py-2 text-sm font-semibold sm:text-lg">Giá / Sản phẩm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orderDetail?.cartItems?.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="border border-gray-300 px-4 py-2 text-sm sm:text-lg">{item?.name}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-sm sm:text-lg">{item?.category}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-sm sm:text-lg"><p className="text-ellipsis overflow-hidden line-clamp-3" dangerouslySetInnerHTML={{ __html: item?.description }}></p></td>
                                                    <td className="border border-gray-300 px-4 py-2 text-sm sm:text-lg">{item?.quantityOrder}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-sm sm:text-lg">{item?.price?.toLocaleString('vi-VN')} vnd</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-4 font-bold text-base md:text-lg flex gap-2 items-center">Tổng hoá đơn: <p className="text-primary font-bold">{calculateTotalPrice(orderDetail?.cartItems)?.toLocaleString('vi-VN')} vnđ</p></p>
                            <p className="text-sm md:text-base  font-semibold">Phương thức thanh toán: Thanh toán khi nhận hàng (COD)</p>
                            <div className="flex flex-col gap-2 sm:gap-1">
                                <h2 className="text-sm md:text-base font-bold mt-4">ĐỊA CHỈ THANH TOÁN</h2>
                                <p className="font-semibold text-xs md:text-base ">Tên Khách Hàng: {orderDetail?.addressInfo?.name}</p>
                                <p className="font-semibold text-xs md:text-base  flex items-center gap-2">
                                    Địa Chỉ Khách Hàng: <p className="text-primary font-bold">{orderDetail?.addressInfo?.address}</p>
                                </p>
                                <p className="font-semibold text-xs md:text-base flex items-center gap-2">
                                    Thành Phố/Tỉnh , Quận/Huyện, Phường/Xã:  <p className="text-primary font-bold">{orderDetail?.addressInfo?.province}, {orderDetail?.addressInfo?.district}, {orderDetail?.addressInfo?.ward}</p>
                                </p>

                                <p className="font-semibold text-xs md:text-base ">Số Điện Thoại Khách Hàng: {orderDetail?.addressInfo?.mobileNumber}</p>
                                <h4 className="font-semibold text-xs md:text-base">Ghi Chú Sản Phẩm:</h4>
                                <div className="px-2 flex gap-2 py-3 border-2 border-gray-300 dark:border-gray-100 rounded-md w-full sm:w-2/4">
                                    <span className="text-xs md:text-base font-semibold italic" dangerouslySetInnerHTML={{ __html: orderDetail?.addressInfo?.note }}></span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button
                                    className="bg-orange-400 text-white hover:bg-orange-500 hover:text-gray-100 p-2 font-semibold rounded-md"
                                >
                                    Đã nhận hàng
                                </button>
                            </div>
                        </div> : <div className="h-[500px] px-8 flex items-center justify-center flex-col gap-2 ">
                            <IoSadSharp size={40} className="text-primary" />
                            <h1 className="text-xl font-semibold text-primary">Opps!</h1>
                            <h1 className="text-lg font-semibold text-primary">Không tìm thấy đơn hàng.</h1>
                        </div>}
                    </div>
                }
            </div>
        </div>
    );
}

export default OrderDetail;
