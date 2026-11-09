import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { FaRegSadTear, FaTrashAlt, FaShoppingCart } from "react-icons/fa";

import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import myContext from "../../Context/MyContext";
import Loader from "../../Component/Loader/Loader";
import StarRating from "../../Component/StarRating/StarRating";
import FilterPanel from "../../Component/FilterPanel/FilterPanel";
import PaginationProduct from "../../Component/PaginationProduct/PaginationProduct";
import Button from "../../Component/Button";
import { formatPrice } from "../../utils/format/formatToPrice";

const AllProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, getPaginatedProducts } = useContext(myContext);
  const cartItems = useSelector((state) => state.cart);
  const [searchParams] = useSearchParams();
  const keywordOfProduct = searchParams.get("keyword");
  const category = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortType, setSortType] = useState("");
  const productPerPage = 8;
  const listRef = useRef(null);

  const [listKey, setListKey] = useState(0);

  const fetchProducts = async () => {
    const res = await getPaginatedProducts(
      currentPage,
      productPerPage,
      sortType,
      keywordOfProduct,
      category,
    );
    setProducts(res.products || []);
    setTotalCount(res.totalCount || 0);
    setListKey((k) => k + 1); // mỗi lần có dữ liệu mới, tạo lại lưới để chạy lại hiệu ứng
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortType, keywordOfProduct, category]); // eslint-disable-line react-hooks/exhaustive-deps

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
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200 py-8 lg:py-12">
      <style>{`
  @keyframes productCardIn {
    from { opacity: 0; transform: translateY(24px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .product-card-in {
    animation: productCardIn 0.5s ease-out both;
    animation-delay: var(--d, 0ms);
  }
  @media (prefers-reduced-motion: reduce) {
    .product-card-in { animation: none; }
  }
`}</style>
      <div className="container">
        {/* tiêu đề */}
        <div className="text-center">
          <h1 className="mt-2 text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Tất Cả Sản Phẩm
          </h1>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />
          {(keywordOfProduct || category) && (
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-200 opacity-80">
              {category && (
                <>
                  Danh mục:{" "}
                  <span className="font-semibold text-primary">{category}</span>
                </>
              )}
              {category && keywordOfProduct && " · "}
              {keywordOfProduct && (
                <>
                  Từ khoá:{" "}
                  <span className="font-semibold text-primary">
                    {keywordOfProduct}
                  </span>
                </>
              )}
            </p>
          )}
        </div>

        <section ref={listRef} className="mt-8 scroll-mt-28">
          {loading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : products?.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* bộ lọc */}
              <FilterPanel
                sortType={sortType}
                onSortChange={handleOnChangeSort}
              />

              <div className="w-full min-w-0 flex-1">
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-200 opacity-80">
                  Hiển thị{" "}
                  <span className="font-bold text-primary">
                    {products.length}
                  </span>{" "}
                  / {totalCount} sản phẩm
                </p>

                <div
                  key={listKey}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
                >
                  {products.map((item, index) => {
                    const { id, imagesProduct, name, price, category } = item;
                    const image = JSON.parse(imagesProduct)[0];
                    const inCart = cartItems.some((p) => p.id === item.id);

                    return (
                      <div
                        key={id ?? index}
                        data-aos="flip-left"
                        className="h-full"
                      >
                        <div
                          title={name}
                          className="group flex h-full flex-col overflow-hidden rounded-2xl
                            bg-white dark:bg-[#131a2a]
                            border border-orange-200 dark:border-white/10 shadow-sm
                            transition-all duration-300
                            hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/60"
                        >
                          {/* ảnh */}
                          <div
                            onClick={() => navigate(`/productdetail/${id}`)}
                            className="relative h-56 lg:h-52 cursor-pointer overflow-hidden bg-white"
                          >
                            <img
                              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                              src={image}
                              alt={name}
                            />
                            {category && (
                              <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-white shadow-md">
                                {category}
                              </span>
                            )}
                          </div>

                          {/* nội dung */}
                          <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                            <h2
                              onClick={() => navigate(`/productdetail/${id}`)}
                              className="cursor-pointer text-base sm:text-lg font-bold leading-snug line-clamp-2 min-h-[3rem]
                                text-gray-600 dark:text-gray-100 transition-colors duration-300 hover:text-primary"
                            >
                              {name}
                            </h2>

                            <p className="text-lg font-extrabold text-primary">
                              {formatPrice(price)} vnđ
                            </p>

                            <StarRating rate={item?.rate} />

                            <div className="mt-auto pt-3">
                              {inCart ? (
                                <button
                                  type="button"
                                  onClick={() => deleteCart(item)}
                                  className="flex w-full items-center justify-center gap-2 rounded-full bg-red-500 py-2 text-sm font-semibold text-white
                                    shadow-md transition-all duration-200 hover:bg-red-600 hover:shadow-lg active:scale-95"
                                >
                                  <FaTrashAlt size={13} />
                                  Xoá Khỏi Giỏ Hàng
                                </button>
                              ) : (
                                <Button
                                  onClick={() => addCart(item)}
                                  className="w-full !py-2 text-sm"
                                >
                                  <FaShoppingCart />
                                  Thêm Vào Giỏ Hàng
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div
              className="mx-auto flex max-w-xl flex-col items-center justify-center gap-2 rounded-3xl py-20 px-6 text-center
              bg-white dark:bg-[#131a2a] border border-orange-200 dark:border-white/10 shadow-sm"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary text-4xl">
                <FaRegSadTear />
              </div>
              <h1 className="mt-2 text-xl font-extrabold text-gray-600 dark:text-gray-100">
                Opps !!!
              </h1>
              <h3 className="text-base font-medium text-gray-600 dark:text-gray-200 opacity-80">
                Không Tìm Được Sản Phẩm Theo Yêu Cầu Của Bạn.
              </h3>
            </div>
          )}
        </section>

        {/* phân trang */}
        <div className="mt-10 flex items-center justify-center">
          <PaginationProduct
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={productPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
