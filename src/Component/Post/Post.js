import { useContext } from "react";
import myContext from "../../Context/MyContext";
import { useNavigate } from "react-router-dom";


export default function Post({ homePage }) {
    const { getAllPosts } = useContext(myContext);
    const navigate = useNavigate();
    const className = homePage
        ? "container mx-auto py-8"
        : "bg-gray-100 dark:bg-gray-900 dark:text-white duration-200 py-8 ";
    return (
        <div
            className={className}>
            <>
                {homePage ? <div data-aos="fade-up">
                    <p className="text-xl text-center font-medium text-gray-500 ">Bài Viết</p>
                    <h1 className="text-2xl text-center font-bold text-primary mb-6">Bài Viết Mới Nhất</h1>
                </div> : <h1 data-aos="fade-up" className="text-3xl text-center pb-4 font-semibold text-gray-500 dark:text-gray-100">Bài Viết</h1>}
            </>
            <div
                data-aos="fade-up"
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${homePage ? '' : 'container'}`}>
                {getAllPosts.map((post, index) => (
                    <div onClick={() => navigate(`/postdetail/${post?.id}`)} key={index} className="bg-white rounded-lg shadow hover:cursor-pointer hover:shadow-lg transition duration-300 h-[300px]  overflow-hidden">
                        <img src={post.imagePost} alt={post.title} className=" w-full h-48 object-cover rounded-t-lg transition-transform duration-300 transform hover:scale-105" />
                        <div className="p-4">
                            <h2 className="text-lg text-gray-600 font-semibold mb-2 text-ellipsis overflow-hidden line-clamp-2">{post.title}</h2>
                            <p className="text-sm text-gray-500 text-ellipsis overflow-hidden line-clamp-1">{post.title}</p>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}
