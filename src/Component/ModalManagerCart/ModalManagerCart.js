import { FaRegTrashAlt, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteDetailFromCart } from "../../redux/CartSlice";
import { notification } from "antd";
import Button from "../Button";

function ModalManagerCart({ isOpen, onClose, idUser }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const deleteCart = (item) => {
    dispatch(deleteDetailFromCart(item));
    notification.success({
      message: "Thành Công",
      description: "Xoá sản phẩm trong giỏ hàng thành công!",
    });
  };

  const cartTotal = cartItems
    .map(
      (item) =>
        parseInt((item.price || "0").toString().replace(/\./g, "")) *
        item.quantityOrder,
    )
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <>
      {/* overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />

      {/* sidebar */}
      <div
        className={`fixed top-0 right-0 w-[450px] sm:w-[500px] h-full flex flex-col
          bg-orange-50 dark:bg-[#0b0f1a] shadow-2xl z-50
          border-l border-orange-200 dark:border-white/10
          transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* header */}
        <div className="flex justify-between items-center border-b border-orange-200 dark:border-white/10 px-5 py-4">
          <h2 className="text-lg lg:text-xl font-bold text-gray-600 dark:text-gray-200">
            Giỏ Hàng Mua Sắm
            {cartItems?.length > 0 && (
              <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                ({cartItems.length} sản phẩm)
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-200 hover:text-black dark:hover:text-white text-3xl leading-none transition-all duration-200 hover:rotate-90"
          >
            &times;
          </button>
        </div>

        {/* danh sách sản phẩm (cuộn) */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          {cartItems?.length > 0 ? (
            cartItems?.map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl"
              >
                <div
                  className="flex w-[calc(100%+80px)]
                    transition-transform duration-300 ease-out
                    group-hover:-translate-x-[80px]"
                >
                  <div
                    className="flex flex-1 min-w-0 gap-4 p-3 rounded-xl
                      bg-white dark:bg-[#131a2a]
                      border border-orange-200 dark:border-white/10
                      group-hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="w-[96px] h-[96px] flex-shrink-0">
                      <img
                        src={
                          item?.imagesProduct
                            ? JSON.parse(item?.imagesProduct)[0]
                            : []
                        }
                        alt="product-image"
                        className="w-full h-full object-cover border-2 border-orange-100 dark:border-white/10 rounded-lg"
                      />
                    </div>

                    <div className="flex flex-col justify-center flex-1 overflow-hidden gap-2">
                      <h3
                        title={item?.name}
                        className="text-gray-600 dark:text-gray-200 font-medium text-base leading-snug line-clamp-2"
                      >
                        {item?.name}
                      </h3>

                      <div className="flex flex-col gap-1">
                        <p className="text-gray-600 dark:text-gray-200 font-normal text-sm">
                          Số lượng:{" "}
                          <span className="font-medium text-gray-600 dark:text-gray-200">
                            {item?.quantityOrder}
                          </span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-200 font-normal text-sm">
                          Giá:{" "}
                          <span className="font-medium text-gray-600 dark:text-gray-200">
                            {item?.price} vnđ
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* nút xoá (lộ ra khi card trượt sang trái) */}
                  <button
                    onClick={() => deleteCart(item)}
                    type="button"
                    aria-label="Xoá sản phẩm"
                    className="ml-2 w-[72px] shrink-0 flex flex-col items-center justify-center gap-1
                      rounded-xl bg-red-500 hover:bg-red-600 active:scale-95
                      transition-all duration-200"
                  >
                    <FaRegTrashAlt size={18} className="text-white" />
                    <span className="text-sm font-normal text-white">Xoá</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 h-full text-gray-600">
              <FaShoppingCart className="text-5xl opacity-30" />
              <p className="text-base">Chưa Có Sản Phẩm Trong Giỏ Hàng.</p>
            </div>
          )}
        </div>

        {/* footer cố định ở dưới */}
        <div className="border-t border-orange-200 dark:border-white/10 bg-white/60 dark:bg-white/5 px-5 py-4 flex flex-col gap-3">
          {cartItems?.length > 0 ? (
            <>
              <div className="flex justify-between items-center">
                <h4 className="text-base font-medium text-gray-600 dark:text-gray-200">
                  Tổng Cộng:
                </h4>
                <h4 className="text-lg font-bold text-gray-600 dark:text-gray-200">
                  {new Intl.NumberFormat("vi-VN").format(cartTotal)} vnđ
                </h4>
              </div>

              <NavLink
                to="/cartpage"
                onClick={onClose}
                className="w-full flex justify-end items-center"
              >
                <Button>Xem Giỏ Hàng</Button>
              </NavLink>
            </>
          ) : (
            <NavLink to={"/"} onClick={onClose}>
              <button className="w-full bg-orange-400 text-white py-2.5 text-base font-semibold rounded-full hover:bg-orange-500 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                Tiếp tục mua sắm?
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
}

export default ModalManagerCart;
