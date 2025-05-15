import { useNavigate, useParams } from "react-router";

const getAllProduct = [{
    id: 1,
    image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg',
    title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
    desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
    price: 150,
    trendingProductName: 'Featured',
    quantity: 1,
    category: "quanao"
},
{
    id: 2,
    image: 'https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg',
    title: 'Kaushalam kalash Copper Pot',
    desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
    price: 120,
    trendingProductName: 'Featured',
    quantity: 1,
    category: "quanao"
},
{
    id: 3,
    image: 'https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg',
    title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
    desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
    price: 130,
    trendingProductName: 'Featured',
    quantity: 1,
    category: "quanao"
},
{
    id: 4,
    image: 'https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg',
    title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
    desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
    price: 120,
    trendingProductName: 'Featured',
    quantity: 1,
    category: "quanao"
},
{
    id: 1,
    image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg',
    title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
    desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
    price: 150,
    trendingProductName: 'Featured',
    quantity: 1,
    category: "quanao"
},
{
    id: 2,
    image: 'https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg',
    title: 'Kaushalam kalash Copper Pot',
    desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
    price: 120,
    trendingProductName: 'Featured',
    quantity: 1,
    category: "quanao"
},
{
    id: 3,
    image: 'https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg',
    title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
    desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
    price: 130,
    trendingProductName: 'Featured',
    quantity: 1,
    category: "quanao"
},
{
    id: 4,
    image: 'https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg',
    title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
    desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
    price: 120,
    trendingProductName: 'Featured',
    quantity: 1,
    category: "quanao"
}]
const CategoryPage = () => {
    const { categoryname } = useParams();
    const navigate = useNavigate();

    // filter product 
    const filterProduct = getAllProduct.filter((obj) => obj.category.includes(categoryname));
    console.log(filterProduct)
    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200 py-8">
            {/* Heading  */}
            <div className="">
                <h1 className=" text-center mb-5 text-2xl font-bold first-letter:uppercase">Giày Dép</h1>
            </div>

            <section className="text-gray-600 body-font">
                {/* main 2 */}
                <div className="container px-5 py-5 mx-auto">
                    {/* main 3  */}
                    <div className="flex flex-wrap -m-4 justify-center">
                        {filterProduct.length > 0 ?
                            <>
                                {filterProduct.map((item, index) => {
                                    const { id, title, price, image } = item;
                                    return (
                                        <div key={index} className="p-4 w-full md:w-1/4">
                                            <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                                <img
                                                    onClick={() => navigate(`/productdetail/${id}`)}
                                                    className="lg:h-80  h-96 w-full"
                                                    src={image}
                                                    alt="img"
                                                />
                                                <div className="p-6">
                                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                        {title.substring(0, 25)}
                                                    </h1>
                                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                        {price} vnđ
                                                    </h1>

                                                    <div className="flex justify-center">
                                                        <button className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                                                            Thêm Vào Giỏ Hàng
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>

                            :

                            <div>
                                <div className="flex justify-center">
                                    <img className=" mb-2" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="" />
                                </div>
                                <h1 className=" text-black text-xl">No {categoryname} product found</h1>
                            </div>
                        }

                    </div>
                </div>
            </section>
        </div>
    );
}

export default CategoryPage;