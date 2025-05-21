import { useContext, useEffect, useState } from "react";
import myContext from "../../Context/MyContext";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../Firebase/FirebaseConfig";
import Loader from "../../Component/Loader/Loader";
import Post from "../../Component/Post/Post";

function PostDetail() {
    let { id } = useParams();
    const context = useContext(myContext);
    const { loading, setLoading, } = context;
    const [post, setPost] = useState('')

    const getPostDetailData = async () => {
        setLoading(true)
        try {
            const productTemp = await getDoc(doc(fireDB, "posts", id))
            setPost(productTemp.data());
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getPostDetailData();
    }, [id])
    console.log(post);
    return (
        <div className=" bg-gray-100 dark:bg-gray-900 dark:text-white duration-200 py-8">
            <div className="container">
                {loading ? <div className="flex items-center justify-center">
                    <Loader></Loader>
                </div> : <div >
                    <div data-aos="fade-up" className="border-b-2 border-gray-400 pb-4">
                        <div className="">
                            <h1 className="font-bold pb-2 text-2xl text-gray-600 dark:text-gray-200 ">{post?.title}</h1>
                            <span className="text-gray-500 dark:text-gray-100 font-normal text-base" dangerouslySetInnerHTML={{ __html: post?.content }}></span>
                        </div>
                    </div>
                    <Post></Post>
                </div>}
            </div>
        </div>
    );
}

export default PostDetail;