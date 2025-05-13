import Loader from "../../Component/Loader/Loader";
import AllProduct from "../../Component/Product/Product";
import SliderPage from "../../Component/Slider/Slider";

function HomePage() {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <SliderPage></SliderPage>
            <AllProduct></AllProduct>
        </div>
    );
}

export default HomePage;