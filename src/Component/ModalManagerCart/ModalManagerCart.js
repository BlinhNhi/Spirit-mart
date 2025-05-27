import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteDetailFromCart } from "../../redux/CartSlice";
import { notification } from "antd";

function ModalManagerCart({ isOpen, onClose, idUser }) {
    const dispatch = useDispatch();


    const cartItems = useSelector((state) => state.cart);

    const deleteCart = (item) => {
        dispatch(deleteDetailFromCart(item));
        notification.success({
            message: "Thành Công",
            description: "Xoá sản phẩm trong giỏ hàng thành công!",
        });
    }

    const cartTotal = cartItems
        .map(item => parseInt((item.price || "0").toString().replace(/\./g, "")) * item.quantityOrder)
        .reduce((prev, curr) => prev + curr, 0);
    console.log(cartTotal);
    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={onClose}
            />
            <div
                className={`fixed top-0 right-0 w-[350px] sm:w-[450px] h-full bg-white shadow-lg z-50 p-4 border-l transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-base lg:text-lg font-bold text-gray-400">Giỏ Hàng Mua Sắm</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black text-2xl">
                        &times;
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[400px] pt-2 lg:max-h-[600px] pr-2">
                    {
                        cartItems?.length > 0 ? (
                            cartItems?.map((item, i) => (
                                <div
                                    key={i}
                                    title={item?.name}
                                    className="mt-2 flex gap-4 min-h-[100px]"
                                >
                                    <div className="w-[100px] h-[100px] flex-shrink-0">
                                        <img
                                            src={item?.imagesProduct ? JSON.parse(item?.imagesProduct)[0] : []}
                                            alt="product-image"
                                            className="w-full h-full object-cover border-2 rounded-lg"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-around flex-1 overflow-hidden">
                                        <h3 className="text-gray-500 font-medium text-sm text-ellipsis overflow-hidden line-clamp-2">
                                            {item?.name}
                                        </h3>
                                        <p className="text-gray-500 font-normal text-xs">
                                            Số lượng: <span className="font-medium text-gray-500">{item?.quantityOrder}</span>
                                        </p>
                                        <p className="text-gray-500 font-normal text-xs">
                                            Giá: <span className="font-medium text-gray-500">{item?.price} vnđ</span>
                                        </p>
                                        <div className="flex text-sm">
                                            <button
                                                onClick={() => deleteCart(item)}
                                                type="button"
                                                className="flex items-center gap-1 bg-red-500 p-1 rounded-md"
                                            >
                                                <FaRegTrashAlt size={12} className="text-white" />
                                                <span className="text-xs font-normal text-white">Xoá</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            )
                            )
                        ) : (
                            <div className="mt-4 text-gray-600">
                                <p>Chưa Có Sản Phẩm Trong Giỏ Hàng.</p>
                            </div>
                        )
                    }
                </div>

                <div className="">
                    {cartItems?.length > 0 ? <div className="mt-4 border-t-2 border-gray-500 flex flex-col gap-2">
                        <h4 className="text-base font-bold text-gray-500 mt-2">
                            Tổng Cộng: {new Intl.NumberFormat('vi-VN').format(cartTotal)} vnđ
                        </h4>
                        <div className="">
                            <button
                                onClick={onClose}

                                className="w-1/2 bg-orange-400 text-white py-1 text-sm sm:text-base font-semibold rounded-full hover:bg-orange-500"
                            >
                                <NavLink to={'/cartpage'}> Xem Giỏ Hàng</NavLink>
                            </button>
                        </div>
                    </div> : <NavLink to={'/'}>
                        <button
                            onClick={onClose}
                            className="w-1/2 bg-orange-400 text-white py-1 text-sm sm:text-base font-semibold rounded-full hover:bg-orange-500 mt-4"
                        >
                            Tiếp tục mua sắm?
                        </button>
                    </NavLink>
                    }
                </div>
            </div>
        </>
    );
}

export default ModalManagerCart;