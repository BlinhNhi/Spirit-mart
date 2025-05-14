import BackgroundImage from "../../Component/BackgroundImage/BackgroundImage";
import FeaturedProducts from "../../Component/FeaturedProducts/FeaturedProducts";
import Morals from "../../Component/Morals/Morals";
import Post from "../../Component/Post/Post";
import AllProduct from "../../Component/Product/Product";

function HomePage() {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <BackgroundImage></BackgroundImage>
            <FeaturedProducts></FeaturedProducts>
            <AllProduct></AllProduct>
            <Morals></Morals>
            <Post></Post>
        </div>
    );
}

export default HomePage;