import { useContext, useEffect, useRef, useState } from "react";
import RelatedProducts from "../../Component/RelatedProducts/RelatedProducts";
import { useParams } from "react-router-dom";
import {
  FaShoppingCart,
  FaMoneyBillWave,
  FaMedal,
  FaPhoneAlt,
  FaCheck,
} from "react-icons/fa";
import myContext from "../../Context/MyContext";
import Loader from "../../Component/Loader/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/CartSlice";
import { notification } from "antd";
import { formatPrice } from "../../utils/format/formatToPrice";
import Comment from "../../Component/Comment/Comment";
import Button from "../../Component/Button";
import ProductGallery from "../../Component/ProductGallery";

const cardClass =
  "rounded-2xl bg-white dark:bg-[#131a2a] border border-orange-200 dark:border-white/10 shadow-sm";

const PERKS = [
  {
    Icon: FaMoneyBillWave,
    title: "Thanh toán COD",
    desc: "Nhận hàng rồi mới trả tiền",
  },
  { Icon: FaMedal, title: "Uy tín hơn 30 năm", desc: "Tại Chợ Lớn, Sài Gòn" },
  { Icon: FaPhoneAlt, title: "Hỗ trợ nhanh", desc: "Gọi 0917023265" },
];

function ProductDetail() {
  let { id } = useParams();
  const context = useContext(myContext);
  const dispatch = useDispatch();
  const descRef = useRef(null);
  const timer = useRef(null);
  const { loading, getProductDetailFunction, productDetail } = context;
  const [quantityProduct, setQuantityProduct] = useState(1);
  const [openDesc, setOpenDesc] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [added, setAdded] = useState(false);
  const [showBelow, setShowBelow] = useState(false);

  useEffect(() => {
    getProductDetailFunction(id);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const addCart = (item) => {
    const cleanItem = {
      ...item,
      quantityOrder: quantityProduct,
    };
    dispatch(addToCart(cleanItem));
    notification.success({
      message: "Thành Công",
      description: "Thêm sản phẩm vào giỏ hàng thành công!",
    });
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleAdd = () => {
    if (added) return; // đang chạy animation thì bỏ qua lần bấm thêm
    addCart(productDetail);
    setAdded(true);
    timer.current = setTimeout(() => setAdded(false), 2000);
  };

  const handleChangeQuantity = (type) => {
    if (type === "increase") {
      setQuantityProduct((q) => q + 1);
    } else if (type === "decrease") {
      setQuantityProduct((q) => (q > 1 ? q - 1 : q));
    }
  };

  const parsedImagesProduct = productDetail?.imagesProduct
    ? JSON.parse(productDetail.imagesProduct || "[]")
    : [];

  const unitPrice =
    Number(String(productDetail?.price ?? 0).replace(/\./g, "")) || 0;
  const subTotal = unitPrice * quantityProduct;

  useEffect(() => {
    const element = descRef.current;

    if (!element) return;

    const checkDescription = () => {
      const lineHeight = parseFloat(
        window.getComputedStyle(element).lineHeight,
      );

      const maxHeight = lineHeight * 3;

      setShowMore(element.scrollHeight > maxHeight + 1);
    };

    checkDescription();

    const observer = new ResizeObserver(checkDescription);
    observer.observe(element);

    return () => observer.disconnect();
  }, [productDetail?.description]);

  useEffect(() => {
    setShowBelow(false);

    if (loading || !productDetail) return;

    let firstFrame;
    let secondFrame;

    firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        setShowBelow(true);
      });
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [loading, productDetail, id]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
      <style>{`
        @keyframes productFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="container py-8">
        {loading ? (
          <div className="flex items-center justify-center h-[calc(100vh-64px)]">
            <Loader></Loader>
          </div>
        ) : (
          <section className="py-5 lg:pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-6 items-start">
              {/* ảnh sản phẩm */}
              <div
                style={{ animation: "productFadeUp 0.45s ease-out both" }}
                className={`${cardClass} p-4 sm:p-5 min-w-0 lg:sticky lg:top-4`}
              >
                <ProductGallery
                  images={parsedImagesProduct}
                  alt={productDetail?.name}
                />
              </div>

              {/* thông tin sản phẩm */}
              <div
                style={{ animation: "productFadeUp 0.45s ease-out 120ms both" }}
                className={`${cardClass} p-5 sm:p-7 min-w-0`}
              >
                <div className="flex flex-col gap-3">
                  {productDetail?.category && (
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary w-fit">
                      {productDetail?.category}
                    </span>
                  )}

                  <h2 className="text-lg md:text-3xl font-extrabold leading-snug text-gray-600 dark:text-gray-100">
                    {productDetail?.name}
                  </h2>

                  {/* giá */}
                  <div className="rounded-xl bg-primary/10 px-5 py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-200 opacity-80">
                      Giá tiền
                    </p>
                    <p className="text-lg md:text-3xl font-extrabold text-primary">
                      {formatPrice(productDetail?.price)} vnđ
                    </p>
                  </div>

                  {/* mô tả */}
                  <div>
                    <h3 className="mb-2 text-base font-bold text-gray-600 dark:text-gray-100">
                      Mô tả sản phẩm
                    </h3>

                    <div
                      ref={descRef}
                      className={`text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-200 ${
                        openDesc ? "" : "line-clamp-3"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: productDetail?.description,
                      }}
                    />

                    {showMore && (
                      <button
                        type="button"
                        onClick={() => setOpenDesc((o) => !o)}
                        className="mt-1 text-sm font-medium text-primary hover:underline"
                      >
                        {openDesc ? "Thu gọn" : "Xem thêm"}
                      </button>
                    )}
                  </div>
                </div>

                <div className="my-6 border-t border-orange-200 dark:border-white/10" />

                <div className="flex flex-col gap-5">
                  {/* số lượng */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <h2 className="text-base md:text-lg font-semibold text-gray-600 dark:text-gray-100">
                        Số Lượng:
                      </h2>
                      <div className="inline-flex items-center overflow-hidden rounded-full border border-orange-200 dark:border-white/10 bg-orange-50/60 dark:bg-[#0b0f1a]">
                        <button
                          type="button"
                          onClick={() => handleChangeQuantity("decrease")}
                          disabled={quantityProduct <= 1}
                          aria-label="Giảm số lượng"
                          className="group h-10 w-10 flex items-center justify-center text-gray-600 dark:text-gray-200
        transition-colors duration-200
        hover:bg-primary/15 hover:text-primary
        active:bg-primary/25
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                        >
                          <span className="inline-block text-xl font-bold transition-transform duration-150 ease-out group-active:scale-75">
                            -
                          </span>
                        </button>

                        <span className="min-w-[48px] px-2 text-center text-lg font-bold text-gray-600 dark:text-gray-100">
                          {quantityProduct}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleChangeQuantity("increase")}
                          aria-label="Tăng số lượng"
                          className="group h-10 w-10 flex items-center justify-center text-gray-600 dark:text-gray-200
        transition-colors duration-200
        hover:bg-primary/15 hover:text-primary
        active:bg-primary/25"
                        >
                          <span className="inline-block text-xl font-bold transition-transform duration-150 ease-out group-active:scale-75">
                            +
                          </span>
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-200">
                      Tạm tính:{" "}
                      <span className="text-lg font-bold text-primary">
                        {subTotal.toLocaleString("vi-VN")} vnđ
                      </span>
                    </p>
                  </div>

                  <div className="">
                    <Button
                      onClick={handleAdd}
                      className="w-[300px] !py-3 text-base"
                    >
                      <span className="relative inline-flex items-center gap-2">
                        {/* icon giỏ: món hàng rơi vào rồi giỏ nảy lên */}
                        <span className="relative inline-flex">
                          <FaShoppingCart
                            className={
                              added
                                ? "animate-cart-bump motion-reduce:animate-none"
                                : ""
                            }
                          />
                          {added && (
                            <span
                              aria-hidden="true"
                              className="absolute -top-1 left-1/2 h-2 w-2 rounded-sm bg-white animate-item-drop motion-reduce:animate-none"
                            />
                          )}
                        </span>

                        {/* hai dòng chữ xếp chồng, đổi qua lại bằng trượt + mờ */}
                        <span className="inline-grid" aria-live="polite">
                          <span
                            className={`col-start-1 row-start-1 transition-all duration-300 ${
                              added
                                ? "-translate-y-full opacity-0"
                                : "opacity-100"
                            }`}
                          >
                            Thêm vào giỏ hàng
                          </span>
                          <span
                            className={`col-start-1 row-start-1 inline-flex items-center gap-1.5 transition-all duration-300 ${
                              added
                                ? "opacity-100"
                                : "translate-y-full opacity-0"
                            }`}
                          >
                            Đã thêm vào giỏ <FaCheck />
                          </span>
                        </span>
                      </span>
                    </Button>
                  </div>
                  {/* cam kết */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {PERKS.map(({ Icon, title, desc }) => (
                      <div
                        key={title}
                        className="flex items-center gap-3 rounded-xl border border-dashed border-orange-200 dark:border-white/15 bg-orange-50/50 dark:bg-white/5 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon size={14} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-600 dark:text-gray-100">
                            {title}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-200 opacity-70">
                            {desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {!loading && showBelow && (
          <>
            <Comment />
            <RelatedProducts />
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
