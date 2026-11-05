import { useNavigate } from "react-router-dom";
import BannerImage from "../../assest/website/orange-pattern.jpg";
import Button from "../Button";
function Morals() {
  const navigate = useNavigate();
  const bannerImg = {
    backgroundImage: `url(${BannerImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "300px",
    width: "100%",
  };
  return (
    <div
      data-aos="zoom-in"
      className="bg-gray-100 dark:bg-gray-800 text-white mb-10"
      style={bannerImg}
    >
      <div className="container backdrop-blur-sm py-10 ">
        <div className=" sm:text-left flex flex-col gap-4 items-center">
          <h1 className="text-2xl sm:text-4xl font-semibold text-center">
            Ý nghĩa của đồ cúng
          </h1>
          <h1 className="text-base sm:text-lg font-semibold text-center">
            Đồ cúng không chỉ là một phần của nghi lễ mà còn là biểu hiện của sự
            gắn kết tâm linh giữa con người với thế giới vô hình, mang lại sự
            bình an, may mắn cho gia đình và cuộc sống.
          </h1>
          <div className="flex gap-4">
            <Button
              width={170}
              from="rgba(26, 14, 11, 1)"
              to="rgba(92, 46, 22, 1)"
              style={{ color: "rgba(255, 243, 220, 1)" }}
              onClick={() => navigate("/allproduct")}
            >
              Khám Phá
            </Button>

            <Button
              width={170}
              from="rgba(255, 246, 230, 1)"
              to="rgba(255, 222, 160, 1)"
              style={{ color: "rgba(74, 36, 18, 1)" }}
              onClick={() => navigate("/introduce")}
            >
              Về Chúng Tôi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Morals;
