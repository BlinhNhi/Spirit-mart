import { useState } from "react";
import Slider from "react-slick";
import RelatedProducts from "../../Component/RelatedProducts/RelatedProducts";
const product = {
    id: 1,
    productImageUrl: ["https://assets.adidas.com/images/w_1880,f_auto,q_auto/3f485688d0ab4f16a363ac79770a882a_9366/IH4823_01_standard.jpg", "https://assets.adidas.com/images/w_1880,f_auto,q_auto/506681c25cee4ece9a6aaf500104dbb2_9366/HQ8708_02_standard_hover.jpg", "https://assets.adidas.com/images/w_1880,f_auto,q_auto/f69bab3bbd3446a29b05a60bc2cea3a7_9366/JI1984_01_standard.jpg", "https://assets.adidas.com/images/w_1880,f_auto,q_auto/3f485688d0ab4f16a363ac79770a882a_9366/IH4823_01_standard.jpg", "https://assets.adidas.com/images/w_1880,f_auto,q_auto/506681c25cee4ece9a6aaf500104dbb2_9366/HQ8708_02_standard_hover.jpg", "https://assets.adidas.com/images/w_1880,f_auto,q_auto/f69bab3bbd3446a29b05a60bc2cea3a7_9366/JI1984_01_standard.jpg",],
    title: "SL 72 RS Shoes",
    price: "5000",
    description: "SL 72 RS Shoes Casual shoes with a sporty back story. Rediscover a legend from the archives. The adidas SL 72 shoes were originally released in 1972 to give runners an edge on the track. Decades later, their design still turns heads. This version features a nylon upper with suede overlays that provides retro style. Your feet stay cushioned thanks to an EVA midsole while a grippy outsole keeps you grounded."
}
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
    customPaging: function (i) {
        return (
            <div className="custom-thumb border rounded-sm border-gray-300">
                <img
                    src={product?.productImageUrl[i]}
                    alt={`thumbnail-${i}`}
                />
            </div>
        );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />,
};

function ProductDetail() {

    const [numberProduct, setNumberProduct] = useState(1);

    const handleChangeQuantity = (type) => {
        let newNumberProduct;
        // if (type === 'increase') {
        //     newNumberProduct = numberProduct + 1;
        // } else if (type === 'decrease' && numberProduct > 1) {
        //     newNumberProduct = numberProduct - 1;
        // }
        // const newPriceProduct = newNumberProduct * (productDetailForUser?.priceProduct);
        // setNumberProduct(newNumberProduct);
        // setSavePrice(newPriceProduct);
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <div className="container py-8">
                <section className="py-5 lg:py-16">
                    <>
                        <div className="max-w-6xl px-4 mx-auto">
                            <div className="flex flex-wrap mb-24 -mx-4">
                                <div className="w-full px-4 mb-12  md:w-1/2 md:mb-0">
                                    <Slider{...settings} >
                                        {product?.productImageUrl.map((url, index) => (
                                            <div className=" h-full" key={index}>
                                                <img
                                                    className=" w-full lg:h-[39em] rounded-md dark:rounded-sm"
                                                    src={url} alt={`slide-${index}`}

                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                                <div className="w-full px-4 md:w-1/2">
                                    <div className="lg:pl-20">
                                        <div className="mb-2 md:mb-4">
                                            <h2 className="max-w-xl text-xl font-bold leading-loose tracking-wide mb-2 md:mb-4 text-gray-700 md:text-2xl dark:text-gray-300">
                                                {product?.title}
                                            </h2>
                                            {/* star */}
                                            {/* <div className="flex flex-wrap items-center mb-6">
                                                <ul className="flex mb-4 mr-2 lg:mb-0">
                                                    <li>
                                                        <a href="/">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width={16}
                                                                height={16}
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width={16}
                                                                height={16}
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width={16}
                                                                height={16}
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width={16}
                                                                height={16}
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div> */}
                                            <p className="inline-block text-lg font-semibold text-gray-500 dark:text-gray-100">
                                                Giá tiền: <span className="text-primary">{product?.price} vnđ</span>
                                            </p>
                                        </div>
                                        <div className="mb-2 md:mb-4">
                                            <h2 className="mb-1 text-lg font-semibold text-gray-500 dark:text-gray-100">
                                                Mô tả:
                                            </h2>
                                            <p>{product?.description}</p>
                                        </div>
                                        {/* Select number */}
                                        <div
                                            className="
flex-col
 md:flex-row lg:flex-row xl:flex-row 2xl:flex-row
md:items-center lg:items-center xl:items-center 2xl:items-center
flex items-start mt-3 gap-4 mb-5
"
                                        >
                                            <h2 className="font-semibold text-gray-500 dark:text-gray-100 text-lg">Số Lượng: </h2>
                                            <div className="flex gap-2 items-center border-4 border-gray-300 bg-gray-50 dark:border-gray-300">
                                                <button
                                                    onClick={() => {
                                                        setNumberProduct(numberProduct + 1);
                                                        handleChangeQuantity('increase');
                                                    }}
                                                    className="text-base font-bold
     sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl
     px-3 py-1 dark:bg-gray-100 dark:text-gray-600 border-gray-200 border-r-4 hover:bg-gray-400 dark:hover:bg-gray-400"
                                                >
                                                    +
                                                </button>

                                                <p
                                                    className="text-base font-medium
     sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl
     py-1 px-14 bg-gray-50 dark:text-gray-600"
                                                >
                                                    {numberProduct}
                                                </p>

                                                <button
                                                    onClick={() => {
                                                        setNumberProduct(numberProduct - 1);
                                                        handleChangeQuantity('decrease');
                                                    }}
                                                    disabled={numberProduct <= 1}
                                                    className={`text-base font-bold hover:bg-gray-400 dark:hover:bg-gray-400
            sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl
            px-4 py-1 dark:bg-gray-100 dark:text-gray-600 border-gray-200 border-l-4
            ${numberProduct <= 1
                                                            ? "opacity-50 cursor-not-allowed dark:bg-gray-400 dark:text-gray-600 border-l-4 border-gray-300 bg-gray-400"
                                                            : ""
                                                        }`}
                                                >
                                                    -
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mb-2 md:mb-4" />
                                        <div className="flex flex-wrap items-center mb-6">
                                            <button
                                                // onClick={() => addCart(product)}
                                                className="w-full px-4 py-3 text-center text-orange-600 bg-orange-100 border border-orange-600  hover:bg-orange-600 hover:text-gray-100  rounded-xl"
                                            >
                                                Thêm Vào Giỏ Hàng
                                            </button>
                                            {/* {cartItems.some((p) => p.id === product.id)
                                                ?
                                                <button
                                                    onClick={() => deleteCart(product)}
                                                    className="w-full px-4 py-3 text-center text-white bg-red-500 border border--600  hover:bg-red-600 hover:text-gray-100  rounded-xl"
                                                >
                                                    Delete To Cart
                                                </button>
                                                :
                                                <button
                                                    onClick={() => addCart(product)}
                                                    className="w-full px-4 py-3 text-center text-orange-600 bg-orange-100 border border-orange-600  hover:bg-orange-600 hover:text-gray-100  rounded-xl"
                                                >
                                                    Add to Cart
                                                </button>
                                            } */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                </section>
                <RelatedProducts></RelatedProducts>
            </div>
        </div>

    );
}

export default ProductDetail;