import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, deleteDetailFromCart, incrementQuantity } from "../../redux/CartSlice";
import { notification } from "antd";
import BuyNowModal from "../../Component/ModalBuyNow/ModalBuyNow";
import { Navigate } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDB } from "../../Firebase/FirebaseConfig";


const CartPage = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart);

    const user = JSON.parse(localStorage.getItem('user'));
    // Buy Now Function
    const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        province: "",
        district: "",
        ward: "",
        mobileNumber: "",
        note: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }),
    });

    const buyNowFunction = () => {
        if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.mobileNumber === "") {
            return notification.error({
                message: "Lỗi",
                description: "Các trường không được để trống",
            });
        }

        // Order Info 
        const orderInfo = {
            cartItems,
            addressInfo,
            email: user.email,
            userid: user.uid,
            status: 1,
            time: Timestamp.now(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }
        try {
            const orderRef = collection(fireDB, 'order');
            addDoc(orderRef, orderInfo);
            setAddressInfo({
                name: "",
                address: "",
                pincode: "",
                mobileNumber: "",
            })
            notification.success({
                message: "Thành Công",
                description: "Mua Hàng Thành Công",
            });
        } catch (error) {
            console.log(error)
        }

    }

    const deleteCart = (item) => {
        dispatch(deleteDetailFromCart(item));
        notification.success({
            message: "Thành Công",
            description: "Xoá sản phẩm trong giỏ hàng thành công!",
        });
    }

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        console.log(id);
        dispatch(decrementQuantity(id));
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])
    const cartItemTotal = cartItems.map(item => item.quantityOrder).reduce((prevValue, currValue) => prevValue + currValue, 0);

    const cartTotal = cartItems
        .map(item => parseInt((item.price || "0").toString().replace(/\./g, "")) * item.quantityOrder)
        .reduce((prev, curr) => prev + curr, 0);
    console.log(cartItems);

    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200 py-8">
            <div className={`container mx-auto max-w-7xl px-2 ${cartItems?.length > 0 ? 'pb-0' : 'pb-80'} lg:px-0`}>
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-3xl">
                        Giỏ Hàng
                    </h1>
                    <form className="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>
                            <ul className="divide-y divide-gray-200 p-2">
                                {cartItems.length > 0 ? <>{cartItems.map((product, i) => {
                                    const { id, name, price, imagesProduct, quantityOrder, category } = product
                                    const image = JSON.parse(imagesProduct)[0];
                                    return (
                                        <div key={id} className="">
                                            <li className="flex py-6 sm:py-6 ">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={image}
                                                        alt={name}
                                                        className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                        <div>
                                                            <div className="flex justify-between">
                                                                <h3 className="text-sm">
                                                                    <a href={'/'} className="font-semibold text-black flex gap-2 items-center">
                                                                        Danh mục: <span className="font-medium text-gray-500">{category}</span>
                                                                    </a>
                                                                </h3>
                                                            </div>
                                                            <div className="flex justify-between mt-1">
                                                                <h3 className="text-sm">
                                                                    <a href={'/'} className="font-semibold text-black">
                                                                        Tên Sản Phẩm: <span className="font-medium text-gray-500">{name}</span>
                                                                    </a>
                                                                </h3>
                                                            </div>
                                                            <div className="mt-1 flex items-end">
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    Giá: <span className="font-medium text-gray-500">{price} vnđ</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <div className="mb-2 flex">
                                                <div className="min-w-24 flex text-gray-500">
                                                    <button
                                                        onClick={() => handleIncrement(id)}
                                                        type="button" className="h-7 w-7">
                                                        +
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="mx-1 h-7 w-9 rounded-md border text-center"
                                                        value={quantityOrder}
                                                        readOnly

                                                    />
                                                    <button
                                                        onClick={() => handleDecrement(id)}
                                                        type="button" className="flex h-7 w-7 items-center justify-center">
                                                        -
                                                    </button>
                                                </div>
                                                <div className="ml-6 flex text-sm">
                                                    <button onClick={() => deleteCart(product)} type="button" className="flex items-center space-x-1 px-2 py-1 pl-0">
                                                        <FaRegTrashAlt size={12} className="text-red-500" />
                                                        <span className="text-xs font-medium text-red-500">Xoá </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}</> : <h1 className="dark:text-gray-600 text-gray-500 font-bold text-lg p-4 ">Chưa có sản phẩm trong giỏ hàng.</h1>}

                            </ul>
                        </section>
                        {/* Order summary */}
                        {cartItems?.length > 0 ? <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
                        >
                            <h2
                                id="summary-heading"
                                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                            >
                                Đơn Hàng
                            </h2>
                            <div>
                                <dl className=" space-y-1 px-2 py-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-800">Giá tiền ({cartItemTotal} sản phẩm)</dt>
                                        <dd className="text-sm font-medium text-gray-900">{new Intl.NumberFormat('vi-VN').format(cartTotal)} vnđ</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="flex text-sm text-gray-800">
                                            <span>Phương thức thanh toán</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">Thanh toán sau khi nhận hàng.</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                                        <dt className="text-base font-medium text-gray-900">Tổng Cộng</dt>
                                        <dd className="text-base font-medium text-gray-900"> {new Intl.NumberFormat('vi-VN').format(cartTotal)} vnđ</dd>
                                    </div>
                                </dl>
                                <div className="px-2 pb-4 font-medium text-green-700">
                                    <div className="flex gap-4 mb-6">
                                        {user
                                            ? <BuyNowModal
                                                addressInfo={addressInfo}
                                                setAddressInfo={setAddressInfo}
                                                buyNowFunction={buyNowFunction}
                                            /> : <Navigate to={'/login'} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </section> : <div></div>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CartPage;