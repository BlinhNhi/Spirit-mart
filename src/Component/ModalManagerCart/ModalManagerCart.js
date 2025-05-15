import { NavLink } from "react-router-dom";

function ModalManagerCart({ isOpen, onClose, idUser }) {
    const hasValidOrder = false;
    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={onClose}
            />
            <div
                className={`fixed top-0 right-0 w-[250px] sm:w-[350px] h-full bg-white shadow-lg z-50 p-4 border-l transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-base lg:text-lg font-bold text-gray-400">Giỏ Hàng Mua Sắm</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black text-2xl">
                        &times;
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[400px] lg:max-h-[600px] pr-2">
                    <div className="mt-4 text-gray-600">
                        <p>Chưa Có Sản Phẩm Trong Giỏ Hàng.</p>
                    </div>
                </div>



                <div>
                    {hasValidOrder ? <div className="mt-4 border-t-2 border-gray-500">
                        <h4 className="text-sm font-bold text-gray-600 mt-2">
                            Tổng Tiền: 5000000 vnđ
                        </h4>
                        <div className="flexitems-center">
                            <button
                                onClick={onClose}

                                className="w-3/4 bg-gray-400 text-gray-50 hover:text-primary py-1 text-sm sm:text-base font-semibold rounded-full hover:bg-gray-600"
                            >
                                <NavLink to={'/cartpage'}> Xem Giỏ Hàng</NavLink>
                            </button>
                        </div>
                    </div> : <NavLink to={'/'}>
                        <button
                            onClick={onClose}
                            className="mt-4 w-1/2 bg-orange-400 text-gray-100 hover:text-gray-50 py-2 px-1 text-sm sm:text-base font-semibold rounded-lg hover:bg-orange-600"
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