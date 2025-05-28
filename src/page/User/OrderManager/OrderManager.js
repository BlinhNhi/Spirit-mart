import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

import myContext from "../../../Context/MyContext";
import Loader from "../../../Component/Loader/Loader";

function ManagerOrder() {
    const { loading, getOrderDetailFunction, userOrderDetail } = useContext(myContext);
    const user = JSON?.parse(localStorage.getItem('user') || [])

    useEffect(() => {
        getOrderDetailFunction(user?.uid);
    }, [])
    const calculateTotalPrice = (cartItems) => {
        return cartItems.reduce((sum, item) => {
            const price = parseFloat(item.price.replace(/\./g, ''));
            const quantity = Number(item.quantityOrder);
            return sum + price * quantity;
        }, 0);
    };

    return (
        <div>

            {loading ?
                <div><Loader></Loader>
                </div> : <div className="">
                    <h2 className="font-semibold text-lg text-gray-600 dark:text-gray-100">Quản lý đơn hàng</h2>
                    <h2 className="font-bold text-base text-gray-500 dark:text-primary italic">
                        Lưu ý: Vui lòng kiểm tra đơn hàng, nếu có sai sót hãy liên hệ
                        với chúng tôi qua số điện thoại: <a href="tel:0917023265">0917023265</a>, nếu không có vấn đề đơn hàng của bạn sẽ bị xoá sau 2 tháng. Cảm ơn vì sự hợp tác của bạn.
                    </h2>

                    {userOrderDetail?.length <= 0 ? <h2 className="font-bold text-gray-500 text-lg text-center mt-3 dark:text-primary">Không có đơn hàng.</h2> : <div>
                        <div className="hidden sm:block overflow-x-auto w-full mt-2">
                            <table className="table-auto w-full items-center">
                                <thead className="text-center ">
                                    <tr>
                                        <th className="px-6 py-6 align-middle border-2 border-gray-400  border-solid text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-bold">Ngày</th>
                                        <th className="px-6 py-6 align-middle border-2 border-gray-400  border-solid text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-bold">Trạng thái</th>
                                        <th className="px-6 py-6 align-middle border-2 border-gray-400  border-solid text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-bold">Tổng</th>
                                        <th className="px-6 py-6 align-middle border-2 border-gray-400  border-solid text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-bold">Các thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center ">
                                    {userOrderDetail?.map((item, i) => {
                                        return <tr key={i}>
                                            <td className="px-6 py-6">{item?.date}</td>
                                            <td className="px-6 py-6 font-semibold text-base">
                                                <span className="font-bold text-xs md:text-base">
                                                    {item?.status === 1 ? ' Đang xử lý.' : item?.status === 2 ?
                                                        <span className="font-bold text-xs md:text-base text-primary"> Chấp nhận.</span>
                                                        : item?.status === 3 ?
                                                            <span className="font-bold text-xs md:text-base text-green-500"> Bàn giao vận chuyển.</span>
                                                            : item?.status === 4 ?
                                                                <span className="font-bold text-xs md:text-base text-blue-500"> Đang vận chuyển.</span>
                                                                :
                                                                <span className="font-bold text-xs md:text-base text-red-500"> Đã giao hàng.</span>}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 flex  md:flex-col lg:flex-col xl:flex-row 2xl:flex-row gap-1"><p className="font-semibold text-base">
                                                {calculateTotalPrice(item?.cartItems)?.toLocaleString('vi-VN')} vnđ</p> cho
                                                <p className="font-semibold text-base">{item?.cartItems?.length} sản phẩm</p></td>
                                            <td><NavLink
                                                to={`/orderDetail/${item?.id}`}
                                            >
                                                <button
                                                    className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md font-medium">
                                                    Xem Thêm...
                                                </button>
                                            </NavLink></td>
                                        </tr>
                                    })}

                                </tbody>
                            </table>


                        </div>

                        <div className="sm:hidden w-full mt-4">
                            <div className="border-2 border-gray-400 rounded-md p-4 mb-4">
                                {userOrderDetail?.length > 0 ? <div>
                                    {userOrderDetail?.map((item, i) => {
                                        return (
                                            <div className={`${i !== 0 ? "border-t-2 mt-2" : ""} p-2 flex flex-col gap-2`} key={1}>
                                                <div className="flex justify-between mb-2">
                                                    <span className="font-medium">Ngày</span>
                                                    <span>{item?.date}</span>
                                                </div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="font-medium">Trạng thái</span>
                                                    <span className="font-bold text-base">
                                                        {item?.status === 1 ? ' Đang xử lý.' : item?.status === 2 ?
                                                            <span className="font-bold text-xs md:text-base text-primary"> Chấp nhận.</span>
                                                            : item?.status === 3 ?
                                                                <span className="font-bold text-xs md:text-base text-green-500"> Bàn giao vận chuyển.</span>
                                                                : item?.status === 4 ?
                                                                    <span className="font-bold text-xs md:text-base text-blue-500"> Đang vận chuyển.</span>
                                                                    :
                                                                    <span className="font-bold text-xs md:text-base text-red-500"> Đã giao hàng.</span>}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="font-medium">Tổng: </span>
                                                    <span className="ml-2">
                                                        {calculateTotalPrice(item?.cartItems)?.toLocaleString('vi-VN')} vnđ
                                                        cho
                                                        <p className="font-semibold text-base">{item?.cartItems?.length} sản phẩm</p>
                                                    </span>
                                                </div>
                                                <div className="flex justify-end">
                                                    <NavLink to={`/orderDetail/${item?.id}`}>
                                                        <button className="bg-orange-400 hover:bg-orange-500 dark:hover:text-gray-100 text-white px-2 py-1 rounded-md font-normal">
                                                            Xem Thêm...
                                                        </button>
                                                    </NavLink>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div> : <h1 className="text-lg font-semibold text-primary">Không tìm thấy đơn hàng</h1>}
                            </div>
                        </div>
                    </div>}


                </div>}
        </div>
    );
}

export default ManagerOrder;