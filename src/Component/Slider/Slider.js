
import Image1 from '../../assest/hero/nike2.jpg'
import Image2 from '../../assest/hero/adidas.jpg'
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

import Slider from 'react-slick'
import { useRef } from 'react'
import { NavLink } from 'react-router-dom';


const ImageList = [
    {
        id: 1,
        image: Image1,
        title: "Nike",
        description: "Trải qua hơn 55 hình thành và phát triển, cùng với chất lượng và uy tín của mình, Nike đã trở thành một thương hiệu sản xuất giày và quần áo thể thao được ưa chuộng nhất trên thế giới."
    },
    {
        id: 2,
        image: Image2,
        title: "Adidas",
        description: "Adidas được thành lập vào năm 1948 với hình ảnh ba sọc ngang làm biểu tượng chính cho hãng. Ngày nay những sản phẩm của hãng đã trở nên phủ sóng và dần chiếm lấy tình cảm của giới trẻ."
    },
]

function CancelArrowSlider(props) {
    const { style } = props;
    return (
        <div
            style={{ ...style, display: "none", background: "red" }}
        />
    );
}

function SliderPage() {
    let sliderRef = useRef(null);
    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        nextArrow: <CancelArrowSlider />,
        prevArrow: <CancelArrowSlider />,
        pauseOnHover: false,
        pauseOnFocus: true
    };
    return (
        <div className='relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-200 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200'>
            {/*  bg pattern */}

            <div className='h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-9'>

            </div>
            {/* hero section */}
            <div className='container pb-2 sm:pb-0'>
                <Slider {...settings}>
                    {ImageList.map((data) => (
                        <div className='' key={data.id}>
                            <div className='grid grid-cols-1 xl:grid-cols-2'>
                                <div className='flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center xl:text-left order-2 xl:order-1 relative z-10'>
                                    <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold'>{data.title}</h1>
                                    <p className='text-sm'>{data?.description}</p>
                                    {data?.title === 'Cùng Chúng Tôi Mua Sắm?' ? '' : <NavLink to={`/search?searchCategory=${data?.title}&page=1`}>
                                        <button className='bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full'>
                                            Đặt Hàng Ngay
                                        </button>
                                    </NavLink>}
                                </div>
                                <div className='order-1 xl:order-2'>
                                    <div className='z-10 relative'>
                                        <img
                                            src={data?.image}
                                            alt=''
                                            className='w-[300px] h-[300px] sm:h-[450px] sm:w-[350px] sm:scale-125 lg:scale-120 object-contain mx-auto'
                                        >
                                        </img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

            </div>
        </div>
    );
}

export default SliderPage;