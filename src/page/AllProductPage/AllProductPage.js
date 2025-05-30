import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";

import myContext from "../../Context/MyContext";
import Loader from "../../Component/Loader/Loader";
import StarRating from "../../Component/StarRating/StarRating";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";

const AllProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, getAllProducts } = useContext(myContext);
    const cartItems = useSelector((state) => state.cart);

    const [filteredProducts, setFilteredProducts] = useState([]);

    const addCart = (item) => {
        const cleanItem = {
            ...item,
            quantityOrder: 1
        };
        dispatch(addToCart(cleanItem));
        notification.success({
            message: "Thành Công",
            description: "Thêm sản phẩm vào giỏ hàng thành công!",
        });
    };

    const deleteCart = (item) => {
        const cleanItem = {
            ...item,
            time: item.time?.toDate?.().toISOString?.() || item.time,
            quantityOrder: 0
        };
        dispatch(deleteFromCart(cleanItem));
        notification.success({
            message: "Thành Công",
            description: "Xoá sản phẩm trong giỏ hàng thành công!",
        });
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems) ?? []);
    }, [cartItems]);

    useEffect(() => {
        setFilteredProducts(getAllProducts);
    }, [getAllProducts]);

    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200 py-8">
            <div className="container">
                {/* Heading */}
                <div className="">
                    <h1 className="text-center mb-5 text-2xl font-semibold">Tất Cả Sản Phẩm</h1>
                </div>

                {/* Main content */}
                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        {loading ? (
                            <div className="flex justify-center">
                                <Loader />
                            </div>
                        ) : (
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Sidebar lọc */}
                                <div className="w-full h-[400px] lg:w-1/5 bg-white dark:bg-gray-100 p-4 rounded shadow">
                                    <h2 className="font-bold text-lg mb-4">Lọc sản phẩm</h2>
                                    <button
                                        onClick={() => {
                                            const sorted = [...getAllProducts].sort((a, b) => b.price - a.price);
                                            setFilteredProducts(sorted);
                                        }}
                                        className="w-full text-left py-2 px-4 mb-2 border rounded hover:bg-gray-300  text-gray-500"
                                    >
                                        Giá cao → thấp
                                    </button>
                                    <button
                                        onClick={() => {
                                            const sorted = [...getAllProducts].sort((a, b) => a.price - b.price);
                                            setFilteredProducts(sorted);
                                        }}
                                        className="w-full text-left py-2 px-4 mb-2 border rounded hover:bg-gray-300  text-gray-500"
                                    >
                                        Giá thấp → cao
                                    </button>
                                    <button
                                        onClick={() => {
                                            const sorted = [...getAllProducts].sort((a, b) => (b?.rate || 0) - (a?.rate || 0));
                                            setFilteredProducts(sorted);
                                        }}
                                        className="w-full text-left py-2 px-4 mb-2 border rounded hover:bg-gray-300  text-gray-500"
                                    >
                                        Đánh giá cao → thấp
                                    </button>
                                    <button
                                        onClick={() => {
                                            const sorted = [...getAllProducts].sort((a, b) => (a?.rate || 0) - (b?.rate || 0));
                                            setFilteredProducts(sorted);
                                        }}
                                        className="w-full text-left py-2 px-4 mb-2 border rounded hover:bg-gray-300  text-gray-500"
                                    >
                                        Đánh giá thấp → cao
                                    </button>
                                    <button
                                        onClick={() => setFilteredProducts(getAllProducts)}
                                        className="w-full text-left py-2 px-4 mt-2 border rounded  hover:bg-gray-300 text-gray-500 "
                                    >
                                        Đặt lại lọc
                                    </button>
                                </div>

                                {/* Danh sách sản phẩm */}
                                <div className="w-full lg:w-4/5 flex flex-wrap -m-4">
                                    {filteredProducts.map((item, index) => {
                                        const { id, imagesProduct, name, price, category } = item;
                                        const image = JSON.parse(imagesProduct)[0];
                                        return (
                                            <div key={index} className="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                                                <div
                                                    title={name}
                                                    data-aos="fade-up"
                                                    className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md hover:translate-y-4 duration-500 cursor-pointer"
                                                >
                                                    <img
                                                        onClick={() => navigate(`/productdetail/${id}`)}
                                                        className="lg:h-52 h-56 w-full object-cover"
                                                        src={image}
                                                        alt={name}
                                                    />
                                                    <div className="p-6">
                                                        <h1 className="title-font text-lg font-medium text-gray-900 dark:text-white mb-1 text-ellipsis overflow-hidden line-clamp-1">
                                                            {name}
                                                        </h1>
                                                        <h1 className="title-font text-lg font-medium text-gray-900 dark:text-white mb-1">
                                                            <p className="text-base font-normal">{price} vnđ</p>
                                                        </h1>
                                                        <h1 className="title-font text-lg font-medium text-gray-900 dark:text-white mb-1">
                                                            <p className="text-base font-normal">{category}</p>
                                                        </h1>
                                                        <StarRating rate={item?.rate} />
                                                        <div className="flex justify-center">
                                                            {cartItems?.some((p) => p.id === item.id) ? (
                                                                <button
                                                                    onClick={() => deleteCart(item)}
                                                                    className="bg-red-600 hover:bg-red-700 w-full text-white py-1 rounded-lg font-bold"
                                                                >
                                                                    Xoá Khỏi Giỏ Hàng
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => addCart(item)}
                                                                    className="bg-orange-500 hover:bg-orange-600 w-full text-white py-1 rounded-lg font-bold"
                                                                >
                                                                    Thêm Vào Giỏ Hàng
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AllProduct;
