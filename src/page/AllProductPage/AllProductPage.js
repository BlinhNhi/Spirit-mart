import { useContext } from "react";
import { useNavigate } from "react-router";
import myContext from "../../Context/MyContext";
import Loader from "../../Component/Loader/Loader";
import StarRating from "../../Component/StarRating/StarRating";




const AllProduct = () => {
    const { loading, getAllProducts, } = useContext(myContext);
    const navigate = useNavigate();
    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200 py-8">
            <div className="container">
                {/* Heading  */}
                <div className="">
                    <h1 className=" text-center mb-5 text-2xl font-semibold">Tất Cả Sản Phẩm</h1>
                </div>
                {/* main  */}
                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        {
                            loading ? <div className="flex justify-center">
                                {loading && <Loader></Loader>}
                            </div> : <div className="flex flex-wrap -m-4">
                                {getAllProducts.map((item, index) => {
                                    const { id, imagesProduct, name, price, category } = item
                                    const image = JSON.parse(imagesProduct)[0];
                                    return (
                                        <div key={index} className="p-4 w-full md:w-1/4">
                                            <div
                                                title={name}
                                                data-aos="fade-up"
                                                className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md  hover:translate-y-4 duration-500 cursor-pointer">
                                                <img
                                                    onClick={() => navigate(`/productdetail/${id}`)}
                                                    className="lg:h-80  h-96 w-full object-cover"
                                                    src={image}
                                                    alt="blog"
                                                />
                                                <div className="p-6">
                                                    <h1
                                                        className="title-font text-lg font-medium text-gray-900 dark:text-white mb-2 text-ellipsis overflow-hidden line-clamp-1">
                                                        {name}
                                                    </h1>
                                                    <h1 className="title-font text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                                        Giá Tiền: <p className="text-base font-normal">{price} vnđ</p>
                                                    </h1>
                                                    <h1 className="title-font text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                                        Danh mục: <p className="text-base font-normal">{category}</p>
                                                    </h1>
                                                    <StarRating rate={item?.rate}></StarRating>
                                                    <div className="flex justify-center ">
                                                        <button className=" bg-orange-500 hover:bg-orange-600 w-full text-white py-[4px] rounded-lg font-bold">
                                                            Thêm Vào Giỏ Hàng
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AllProduct;