import { NavLink, useNavigate } from "react-router-dom";
import Slider from "react-slick";

const productData = [
    {
        id: 1,
        image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg',
        title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
        desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
        price: 150,
        trendingProductName: 'Featured',
        quantity: 1,
    },
    {
        id: 2,
        image: 'https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg',
        title: 'Kaushalam kalash Copper Pot',
        desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
        price: 120,
        trendingProductName: 'Featured',
        quantity: 1,
    },
    {
        id: 3,
        image: 'https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg',
        title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
        desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
        price: 130,
        trendingProductName: 'Featured',
        quantity: 1,
    },
    {
        id: 4,
        image: 'https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg',
        title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
        desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
        price: 120,
        trendingProductName: 'Featured',
        quantity: 1,
    },
    {
        id: 5,
        image: 'https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg',
        title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
        desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
        price: 130,
        trendingProductName: 'Featured',
        quantity: 1,
    },
];
function RelatedProducts() {

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
                    width: "22px",
                    height: "22px",
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
                <h1 className="text-2xl font-bold text-primary text-start">
                    Sản Phẩm Liên Quan
                </h1>

                <div className="w-full">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        <div className="slider-container w-full mx-auto">
                            <Slider {...settings}>
                                {productData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
                                        data-aos="zoom-in"
                                    >
                                        <NavLink to={`/productdetail/${item?.id}`}>
                                            <div className="h-full border rounded-xl shadow-md overflow-hidden group">
                                                <img
                                                    onClick={() => navigate('/productinfo')}
                                                    className="w-full h-45 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                                                    src={item.image}
                                                    alt={item.title}
                                                />
                                                <div className="p-4">
                                                    <h1 className="text-base md:text-lg  font-medium text-gray-900 dark:text-gray-100">
                                                        {item.title.substring(0, 25)}
                                                    </h1>
                                                    <p className="text-base md:text-lg  text-orange-500 font-semibold">₹{item.price}</p>
                                                    <button className="mt-2 w-full bg-orange-500 text-white py-2  text-base md:text-lg rounded-lg hover:bg-orange-600">
                                                        Thêm Vào Giỏ Hàng
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

export default RelatedProducts;