import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";

import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import myContext from "../../Context/MyContext";
import Loader from "../../Component/Loader/Loader";
import StarRating from "../../Component/StarRating/StarRating";
import Pagination from "../../Component/Pagination/Pagination";
import FilterPanel from "../../Component/FilterPanel/FilterPanel";

const AllProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, getPaginatedProducts } = useContext(myContext);
    const cartItems = useSelector((state) => state.cart);

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [sortType, setSortType] = useState("");
    const productPerPage = 8;

    const fetchProducts = async () => {
        const res = await getPaginatedProducts(currentPage, productPerPage, sortType);
        setProducts(res.products || []);
        setTotalCount(res.totalCount || 0);
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage, sortType]);

    const addCart = (item) => {
        const cleanItem = { ...item, quantityOrder: 1 };
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
            quantityOrder: 0,
        };
        dispatch(deleteFromCart(cleanItem));
        notification.success({
            message: "Thành Công",
            description: "Xoá sản phẩm trong giỏ hàng thành công!",
        });
    };

    const handleOnChangeSort = (e) => {
        setSortType(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200 py-8">
            <div className="container">
                <h1 className="text-center mb-5 text-2xl font-semibold">Tất Cả Sản Phẩm</h1>

                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        {loading ? (
                            <div className="flex justify-center">
                                <Loader />
                            </div>
                        ) : (
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Bộ lọc */}
                                <FilterPanel sortType={sortType} onSortChange={handleOnChangeSort}></FilterPanel>

                                {/* Danh sách sản phẩm */}
                                <div className="w-full lg:w-3/5 xl:w-4/5 flex flex-wrap -m-4">
                                    {products.map((item, index) => {
                                        const { id, imagesProduct, name, price, category } = item;
                                        const image = JSON.parse(imagesProduct)[0];
                                        return (
                                            <div key={index} className="p-4 w-full md:w-1/2 xl:w-1/4">
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
                                                        <h1 className="title-font text-lg font-medium text-gray-900 dark:text-white mb-1 line-clamp-1">
                                                            {name}
                                                        </h1>
                                                        <p className="text-base font-normal">{price} vnđ</p>
                                                        <p className="text-base font-normal">{category}</p>
                                                        <StarRating rate={item?.rate} />
                                                        <div className="flex justify-center mt-2">
                                                            {cartItems.some((p) => p.id === item.id) ? (
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

            {/* Phân trang */}
            <div className="flex items-center justify-center mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalCount={totalCount}
                    pageSize={productPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default AllProduct;
