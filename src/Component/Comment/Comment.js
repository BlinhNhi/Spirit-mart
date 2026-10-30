import { useNavigate } from "react-router-dom";
import Button from "../Button";

function Comment() {
    const navigate = useNavigate();
    const userLogin = JSON.parse(localStorage.getItem("user"));
    return (
        <div className="p-10 bg-gray-200 rounded-2xl">
            <h1 className="text-2xl text-center pb-4 font-bold text-primary">Bình luận</h1>
            <div className="flex flex-col gap-1 pb-10">
                <h2 className="text-base text-center font-medium text-gray-600 ">
                    Khách hàng nói gì về chúng tôi?
                </h2>
            </div>
            <div className="flex flex-col gap-4 max-h-72 overflow-y-auto py-2">
                <div className="flex items-start gap-2 w-full ">
                    <img src="https://tse4.mm.bing.net/th?id=OIP.eGHa3HgHxIlTHmcvKNDs7AHaGe&pid=Api&P=0&h=220" alt="user"
                        className="w-10 h-6 sm:w-15 sm:h-10  rounded-full object-cover">
                    </img>
                    <div className="flex flex-col  px-4 bg-gray-200/80 rounded-xl">
                        <h3 className="text-sm sm:text-base font-medium text-gray-500 ">Nguyễn Văn B</h3>
                        <p className="text-xs text-gray-500 ">
                            Sản phẩm chất lượng, giao hàng nhanh chóng!
                            Tôi rất hài lòng với dịch vụ của ShopTamLinh. Sản phẩm đẹp, chất lượng tốt và giao hàng nhanh chóng.
                            Tôi sẽ tiếp tục ủng hộ shop trong tương lai!
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-2 w-full ">
                    <img src="https://tse4.mm.bing.net/th?id=OIP.eGHa3HgHxIlTHmcvKNDs7AHaGe&pid=Api&P=0&h=220" alt="user"
                        className="w-10 h-6 sm:w-15 sm:h-10  rounded-full object-cover">
                    </img>
                    <div className="flex flex-col  px-4 bg-gray-200/80 rounded-xl">
                        <h3 className="text-sm sm:text-base font-medium text-gray-500 ">Nguyễn Văn B</h3>
                        <p className="text-xs text-gray-500 ">
                            Sản phẩm chất lượng, giao hàng nhanh chóng!
                            Tôi rất hài lòng với dịch vụ của ShopTamLinh. Sản phẩm đẹp, chất lượng tốt và giao hàng nhanh chóng.
                            Tôi sẽ tiếp tục ủng hộ shop trong tương lai!
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-2 w-full ">
                    <img src="https://tse4.mm.bing.net/th?id=OIP.eGHa3HgHxIlTHmcvKNDs7AHaGe&pid=Api&P=0&h=220" alt="user"
                        className="w-10 h-6 sm:w-15 sm:h-10  rounded-full object-cover">
                    </img>
                    <div className="flex flex-col  px-4 bg-gray-200/80 rounded-xl">
                        <h3 className="text-sm sm:text-base font-medium text-gray-500 ">Nguyễn Văn B</h3>
                        <p className="text-xs text-gray-500 ">
                            Sản phẩm chất lượng, giao hàng nhanh chóng!
                            Tôi rất hài lòng với dịch vụ của ShopTamLinh. Sản phẩm đẹp, chất lượng tốt và giao hàng nhanh chóng.
                            Tôi sẽ tiếp tục ủng hộ shop trong tương lai!
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-2 w-full ">
                    <img src="https://tse4.mm.bing.net/th?id=OIP.eGHa3HgHxIlTHmcvKNDs7AHaGe&pid=Api&P=0&h=220" alt="user"
                        className="w-10 h-6 sm:w-15 sm:h-10  rounded-full object-cover">
                    </img>
                    <div className="flex flex-col  px-4 bg-gray-200/80 rounded-xl">
                        <h3 className="text-sm sm:text-base font-medium text-gray-500 ">Nguyễn Văn B</h3>
                        <p className="text-xs text-gray-500 ">
                            Sản phẩm chất lượng, giao hàng nhanh chóng!
                            Tôi rất hài lòng với dịch vụ của ShopTamLinh. Sản phẩm đẹp, chất lượng tốt và giao hàng nhanh chóng.
                            Tôi sẽ tiếp tục ủng hộ shop trong tương lai!
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end mt-8">
                {userLogin ? <Button>Thêm bình luận</Button> : <Button
                    onClick={() => navigate("/login")}
                    c>
                    Đăng nhập để bình luận
                </Button>}
            </div>
        </div>);
}

export default Comment;