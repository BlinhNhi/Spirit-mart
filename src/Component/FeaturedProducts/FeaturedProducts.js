import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import myContext from "../../Context/MyContext";
import StarRating from '../../Component/StarRating/StarRating'
import { formatPrice } from "../../utils/format/formatToPrice";

function FeaturedProducts() {
    const { getTopRateProduct } = useContext(myContext);

    function SampleArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "orange",
                    color: "white",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.6)",
                }}
                onClick={onClick}
            />
        );
    }
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        nextArrow: <SampleArrow />,
        prevArrow: <SampleArrow />,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]
    };
    const navigate = useNavigate()
    return (
        <div className="py-8" data-aos="fade-up">
            <div className="container">
                <p className="text-xl text-center font-medium text-gray-500 ">Sản Phẩm</p>
                <h1 className="text-2xl font-bold text-primary text-center">
                    Sản Phẩm Nổi Bật
                </h1>

                <div className="w-full">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        <div className="slider-container w-full mx-auto">
                            <Slider {...settings}>
                                {getTopRateProduct.map((item, index) => (
                                    <div
                                        title={item?.name}
                                        key={index}
                                        className="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
                                        data-aos="zoom-in"
                                    >
                                        <NavLink to={`/productdetail/${item?.id}`}>
                                            <div className="h-full border rounded-xl shadow-md overflow-hidden group">
                                                <img
                                                    onClick={() => navigate(`/productdetail/${item?.id}`)}
                                                    className="w-full h-64 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                                                    src={JSON.parse(item?.imagesProduct)[0]}
                                                    alt={item.name}
                                                />
                                                <div className="p-4">
                                                    <h1
                                                        className="title-font text-lg font-medium text-gray-900 dark:text-white mb-2 text-ellipsis overflow-hidden line-clamp-1">
                                                        {item?.name}
                                                    </h1>
                                                    <h1 className="title-font text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                                        Giá Tiền: <p className="text-base font-normal">{formatPrice(item?.price)} vnđ</p>
                                                    </h1>
                                                    <h1 className="title-font text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                                        Danh Mục: <p className="text-base font-normal">{item?.category}</p>
                                                    </h1>
                                                    <StarRating rate={item?.rate}></StarRating>
                                                    <button className="mt-2 w-full bg-orange-500 text-lg text-white py-1 rounded-lg hover:bg-orange-600 font-bold">
                                                        Xem Chi Tiết
                                                    </button>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeaturedProducts;