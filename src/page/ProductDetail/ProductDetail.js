import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import RelatedProducts from "../../Component/RelatedProducts/RelatedProducts";
import { useParams } from "react-router-dom";
import myContext from "../../Context/MyContext";
import Loader from "../../Component/Loader/Loader";
import { useDispatch, } from "react-redux";
import { addToCart, } from "../../redux/CartSlice";
import { notification } from "antd";

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


function ProductDetail() {
    let { id } = useParams();
    const context = useContext(myContext);
    const dispatch = useDispatch()
    const { loading, getProductDetailFunction, productDetail } = context;
    const [quantityProduct, setQuantityProduct] = useState(1);

    useEffect(() => {
        getProductDetailFunction(id);
    }, [id])

    const addCart = (item) => {
        const cleanItem = {
            ...item,
            quantityOrder: quantityProduct
        };
        dispatch(addToCart(cleanItem));
        notification.success({
            message: "Thành Công",
            description: "Thêm sản phẩm vào giỏ hàng thành công!",
        });
    }

    const handleChangeQuantity = (type) => {
        let newNumberProduct;
        if (type === 'increase') {
            newNumberProduct = quantityProduct + 1;
        } else if (type === 'decrease' && quantityProduct > 1) {
            newNumberProduct = quantityProduct - 1;
        }
        setQuantityProduct(newNumberProduct);

    };

    const parsedImagesProduct = productDetail?.imagesProduct ? JSON.parse(productDetail.imagesProduct || '[]') : [];
    const settings = {
        customPaging: function (i) {
            return (
                <div className="custom-thumb border rounded-sm border-gray-300">
                    <img
                        src={parsedImagesProduct[i]}
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
    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <div className="container py-8">
                {loading ? <div><Loader></Loader></div> : <section className="py-5 lg:py-16">
                    <>
                        <div className="max-w-6xl">
                            <div className="flex flex-wrap mb-24 ">
                                <div className="w-full  mb-12  md:w-1/2 md:mb-0">
                                    <Slider{...settings} >
                                        {parsedImagesProduct?.map((url, index) => (
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
                                                {productDetail?.name}
                                            </h2>

                                            <p className="inline-block text-lg font-semibold text-gray-500 dark:text-gray-100">
                                                Giá tiền: <span className="text-primary">{productDetail?.price} vnđ</span>
                                            </p>
                                        </div>
                                        <div className="mb-2 md:mb-4">

                                            <p dangerouslySetInnerHTML={{ __html: productDetail?.description }}></p>
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
                                                        setQuantityProduct(quantityProduct + 1);
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
                                                    {quantityProduct}
                                                </p>

                                                <button
                                                    onClick={() => {
                                                        setQuantityProduct(quantityProduct - 1);
                                                        handleChangeQuantity('decrease');
                                                    }}
                                                    disabled={quantityProduct <= 1}
                                                    className={`text-base font-bold hover:bg-gray-400 dark:hover:bg-gray-400
            sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl
            px-4 py-1 dark:bg-gray-100 dark:text-gray-600 border-gray-200 border-l-4
            ${quantityProduct <= 1
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
                                                onClick={() => addCart(productDetail)}
                                                className="w-full px-4 py-2 text-center text-orange-600 font-semibold bg-orange-100 border border-orange-600  hover:bg-orange-600 hover:text-gray-100  rounded-xl"
                                            >
                                                Thêm vào giỏ hàng
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                </section>}
                <RelatedProducts></RelatedProducts>
            </div>
        </div>

    );
}

export default ProductDetail;