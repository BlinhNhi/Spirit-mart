import { Button } from "antd";
import BannerImage from "../../assest/website/orange-pattern.jpg";
function Morals() {
    const bannerImg = {
        backgroundImage: `url(${BannerImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "300px",
        width: "100%",
    }
    return (
        <div data-aos="zoom-in" className="bg-gray-100 dark:bg-gray-800 text-white mb-10" style={bannerImg}>
            <div className="container backdrop-blur-sm py-10 ">
                <div className=" sm:text-left flex flex-col gap-4 items-center">
                    <h1 className="text-2xl sm:text-4xl font-semibold text-center">Ý nghĩa của đồ cúng</h1>
                    <h1 className="text-base sm:text-lg font-semibold text-center">Đồ cúng không chỉ là một phần của nghi lễ mà còn là biểu hiện của sự gắn kết tâm linh giữa con người với thế giới vô hình, mang lại sự bình an, may mắn cho gia đình và cuộc sống.</h1>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 border-orange-500  border-[3px] bg-gray-100 hover:bg-gray-200 text-orange-400 hover:text-orange-600 font-semibold rounded-lg text-lg font-bold">Khám Phá</button>
                        <button className="px-4 py-2 border-orange-500  border-[3px] bg-gray-100 hover:bg-gray-200 text-orange-400 hover:text-orange-600 font-semibold rounded-lg text-lg font-bold">Liên Hệ Ngay</button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Morals;