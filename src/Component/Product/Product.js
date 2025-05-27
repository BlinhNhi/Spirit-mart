import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

import myContext from "../../Context/MyContext";
import StarRating from "../StarRating/StarRating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import { notification } from "antd";

const Product = () => {
    const navigate = useNavigate();
    const { getFourProduct } = useContext(myContext);
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

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
    }

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
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems) ?? []);
    }, [cartItems]);

    return (
        <div className="container py-8">
            {/* Heading  */}
            <div className="">
                <h1
                    className="text-left mb-5 text-2xl text-primary font-bold"
                    data-aos="fade-up"
                    data-aos-delay={300}
                >Sản Phẩm Mới</h1>
            </div>

            {/* main  */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 lg:px-0 py-5 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {getFourProduct.map((item, index) => {
                            const { imagesProduct, name, price, category } = item
                            const image = JSON.parse(imagesProduct)[0];
                            return (
                                <div
                                    key={index}
                                    data-aos="fade-up"
                                    data-aos-delay={300}
                                    className="p-4 w-full md:w-1/2 xl:w-1/4"
                                >
                                    <div
                                        title={name}
                                        className="h-full border border-gray-300 rounded-xl overflow-hidden 
                                    hover:translate-y-1 duration-500 shadow-md cursor-pointer">
                                        <img
                                            onClick={() => navigate(`/productdetail/${item?.id}`)}
                                            className="lg:h-80  h-64 w-full"
                                            src={image}
                                            alt="blog"
                                        />
                                        <div className="p-6">
                                            <h1
                                                className="title-font text-lg font-medium text-gray-900 dark:text-white mb-2 text-ellipsis overflow-hidden line-clamp-1">
                                                {name}
                                            </h1>
                                            <h1 className="title-font text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                                Giá Tiền: <p className="text-base font-normal">{price} vnđ</p>
                                            </h1>
                                            <h1 className="title-font text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                                Danh mục: <p className="text-base font-normal">{category}</p>
                                            </h1>
                                            <StarRating rate={item?.rate}></StarRating>
                                            <div className="flex justify-center ">
                                                {cartItems?.some((p) => p.id === item.id)

                                                    ?
                                                    <button
                                                        onClick={() => deleteCart(item)}
                                                        className=" bg-red-600 hover:bg-red-700 w-full text-white py-[4px] rounded-lg font-bold">
                                                        Xoá Khỏi Giỏ Hàng
                                                    </button>

                                                    :

                                                    <button
                                                        onClick={() => addCart(item)}
                                                        className=" bg-orange-500 hover:bg-orange-600 w-full text-white py-[4px] rounded-lg font-bold">
                                                        Thêm Vào Giỏ Hàng
                                                    </button>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Product;