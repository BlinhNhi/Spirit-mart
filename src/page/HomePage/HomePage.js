import BackgroundImage from "../../Component/BackgroundImage/BackgroundImage";
import FeaturedProducts from "../../Component/FeaturedProducts/FeaturedProducts";
import Morals from "../../Component/Morals/Morals";
import Post from "../../Component/Post/Post";
import Product from "../../Component/Product/Product";

function HomePage() {
    const homePage = 'homePage'
    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <BackgroundImage></BackgroundImage>
            <Product></Product>
            <FeaturedProducts></FeaturedProducts>
            <Morals></Morals>
            <Post homePage={homePage}></Post>
        </div>
    );
}

export default HomePage;