import image from '../../assest/hero/chutieu.png'
import { GiLotus } from 'react-icons/gi';

const BackgroundImage = () => {
    return (
        <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-200 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200">

            {/* BG pattern */}
            <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 z-10"></div>

            {/* Hiệu ứng rơi */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {[...Array(15)].map((_, i) => (
                    <span
                        key={i}
                        className="absolute text-pink-500 text-3xl sm:text-6xl animate-fall"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                    >
                        <GiLotus />
                    </span>
                ))}
            </div>

            {/* Hero Section */}
            <div className="container pb-2 sm:pb-0 z-10">
                <div className="grid grid-cols-1 xl:grid-cols-2">
                    <div className="flex flex-col justify-center xl:items-start items-center mt-0 sm:mt-8 xl:mt-0 gap-4 pt-12 sm:pt-0 text-center xl:text-left order-2 xl:order-1 relative z-10">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">Nhang đèn giá tốt</h1>
                        <p className="text-lg font-semibold dark:text-white text-gray-500">Nhang đèn cúng phật</p>
                        <button className="bg-gradient-to-r w-52 from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full">
                            Đặt Hàng Ngay
                        </button>
                    </div>

                    <div className="order-1 xl:order-2">
                        <div className="relative">
                            <img
                                src={image}
                                alt=""
                                className="w-[200px] h-[200px] lg:h-[250px] xl:h-[350px] sm:w-[350px] sm:scale-125 lg:scale-120 object-contain mx-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BackgroundImage;
