import { useContext, useEffect, useState } from "react";
import myContext from "../../Context/MyContext";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../Firebase/FirebaseConfig";
import { FaRegClock, FaRegNewspaper } from "react-icons/fa";
import Loader from "../../Component/Loader/Loader";
import Post from "../../Component/Post/Post";

function PostDetail() {
    let { id } = useParams();
    const context = useContext(myContext);
    const { loading, setLoading, } = context;
    const [post, setPost] = useState('')
    const [progress, setProgress] = useState(0)

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

    // thanh tiến độ đọc ở đầu trang
    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // thời gian đọc ước tính (~200 từ/phút), tính từ nội dung HTML
    const readMinutes = Math.max(
        1,
        Math.ceil(
            (post?.content || "").replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length / 200
        )
    );

    return (
        <div className=" bg-gray-100 dark:bg-gray-900 dark:text-white duration-200 py-8 sm:py-12">
            <div
                aria-hidden="true"
                className="fixed top-0 left-0 z-[1000] h-1 bg-gradient-to-r from-primary to-secondary transition-[width] duration-150"
                style={{ width: `${progress}%` }}
            />
            <div className="container">
                {loading ? <div className="flex items-center justify-center">
                    <Loader></Loader>
                </div> : <div >
                    <article
                        data-aos="fade-up"
                        className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-primary/20 bg-white p-6 shadow-xl shadow-primary/10 dark:border-orange-400/20 dark:bg-gray-800/70 dark:shadow-black/30 sm:p-10"
                    >
                        {/* vệt sáng trang trí ở góc */}
                        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

                        <header className="relative pb-6">
                            <div className="flex flex-wrap items-center gap-3 pb-4 text-sm">
                                <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 font-medium text-primary">
                                    <FaRegNewspaper />
                                    Bài viết
                                </span>
                                <span className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-300">
                                    <FaRegClock />
                                    {readMinutes} phút đọc
                                </span>
                            </div>
                            <h1 className="font-bold text-2xl leading-snug text-gray-800 dark:text-gray-100 sm:text-2xl sm:leading-tight">
                                {post?.title}
                            </h1>
                            <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
                        </header>

                        <div
                            className="relative text-base leading-8 text-gray-600 dark:text-gray-200 sm:text-lg sm:leading-9
                                [&_p]:mb-4
                                [&_strong]:font-bold [&_strong]:text-gray-900 dark:[&_strong]:text-white
                                [&_b]:font-bold [&_b]:text-gray-900 dark:[&_b]:text-white
                                [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-800 dark:[&_h2]:text-gray-100
                                [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-800 dark:[&_h3]:text-gray-100
                                [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6
                                [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6
                                [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4
                                [&_img]:my-6 [&_img]:mx-auto [&_img]:block [&_img]:max-w-full [&_img]:!h-auto
                                [&_img]:rounded-2xl [&_img]:shadow-lg [&_img]:ring-1 [&_img]:ring-primary/20"
                            dangerouslySetInnerHTML={{ __html: post?.content }}
                        ></div>
                    </article>

                    <div className="mx-auto my-10 h-px max-w-3xl bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    <Post></Post>
                </div>}
            </div>
        </div>
    );
}

export default PostDetail;