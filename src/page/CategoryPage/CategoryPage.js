import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";

import myContext from "../../Context/MyContext";
import { formatText } from "../../utils/format/formatText";
import StarRating from "../../Component/StarRating/StarRating";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import { IoSadSharp } from "react-icons/io5";
import { formatPrice } from "../../utils/format/formatToPrice";


const CategoryPage = () => {
    const { getAllProducts } = useContext(myContext)
    const dispatch = useDispatch();
    console.log(getAllProducts);
    const { categoryname } = useParams();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart);
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

    const filterProduct = getAllProducts.filter((obj) => formatText(obj.category).includes(categoryname));
    console.log(filterProduct);
    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200 py-8">
            {/* Heading  */}
            <div className="container">
                {
                    filterProduct.length > 0 ? <div className="">
                        <h1 className=" text-center mb-5 text-2xl font-bold">Tìm Theo Danh Mục: {filterProduct[0]?.category}.</h1>
                    </div> : <div></div>
                }

                <section className="text-gray-600 body-font">
                    {/* main 2 */}
                    <div className="container px-5 py-5 mx-auto">
                        {/* main 3  */}
                        <div className="">
                            {filterProduct.length > 0 ?
                                <div className="flex flex-wrap">
                                    {filterProduct?.map((item, index) => {
                                        const { id, imagesProduct, name, price, category } = item
                                        const image = JSON.parse(imagesProduct)[0];
                                        return (
                                            <div key={index} className="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                                                <div
                                                    title={name}
                                                    data-aos="fade-up"
                                                    className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md  hover:translate-y-4 duration-500 cursor-pointer">
                                                    <img
                                                        onClick={() => navigate(`/productdetail/${id}`)}
                                                        className="lg:h-80  h-96 w-full object-cover"
                                                        src={image}
                                                        alt="blog"
                                                    />
                                                    <div className="p-6">
                                                        <h1
                                                            className="title-font text-lg font-medium text-gray-900 dark:text-white mb-2 text-ellipsis overflow-hidden line-clamp-1">
                                                            {name}
                                                        </h1>
                                                        <h1 className="title-font text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                                            Giá Tiền: <p className="text-base font-normal">{formatPrice(price)} vnđ</p>
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
                                :
                                <div className="px-8 flex items-center justify-center flex-col gap-2 h-[500px]">
                                    <IoSadSharp size={40} className="text-primary" />
                                    <h1 className="text-xl font-semibold text-primary">Oops!</h1>
                                    <h1 className="text-lg font-semibold text-primary">Không tìm thấy sản phẩm.</h1>
                                </div>
                            }

                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default CategoryPage;