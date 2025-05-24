import { useEffect, useState } from "react";
import MyContext from './MyContext'
import { collection, onSnapshot, doc, query, deleteDoc, getDoc } from "firebase/firestore";
import { fireDB } from "../Firebase/FirebaseConfig";
import { notification } from "antd";

function MyState({ children }) {
    const [loading, setLoading] = useState(false);
    const [getAllCategories, setGetAllCategories] = useState([]);
    const [getAllProducts, setGetAllProducts] = useState([]);
    const [getAllPosts, setGetAllPosts] = useState([]);
    const [userDetail, setUserDetail] = useState({})


    // CRUD categories 
    const getAllCategoriesFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "category"),
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let categoryArray = [];
                QuerySnapshot.forEach((doc) => {
                    categoryArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllCategories(categoryArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const deleteCategoryFunction = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'category', id))
            notification.success({
                closeIcon: true,
                message: 'Thành Công',
                description: (
                    <>Xoá Danh Mục Thành Công!</>
                ),
            });
            getAllCategoriesFunction();
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    // CRUD categories 
    const getAllProductsFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "products"),
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProducts(productArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const deleteProductFunction = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'products', id))
            notification.success({
                closeIcon: true,
                message: 'Thành Công',
                description: (
                    <>Xoá Sản Phẩm Thành Công!</>
                ),
            });
            getAllProductsFunction();
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const getAllPostsFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "posts"),
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let postArray = [];
                QuerySnapshot.forEach((doc) => {
                    postArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllPosts(postArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const deletePostFunction = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'posts', id))
            notification.success({
                closeIcon: true,
                message: 'Thành Công',
                description: (
                    <>Xoá Bài Viết Thành Công!</>
                ),
            });
            getAllPostsFunction();
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const getUserDetailFunction = async (id) => {
        console.log(id);
        setLoading(true);
        try {
            const userDetailTemp = await getDoc(doc(fireDB, "users", id));
            if (userDetailTemp.exists()) {
                const inforUser = userDetailTemp.data();
                console.log(inforUser);
                setUserDetail(inforUser);
            } else {
                console.warn("Không tìm thấy user với id:", id);
                setUserDetail({});
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    console.log(userDetail);

    useEffect(() => {
        getAllCategoriesFunction();
        getAllProductsFunction();
        getAllPostsFunction()
    }, []);

    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllCategories,
            deleteCategoryFunction,
            getAllCategoriesFunction,
            getAllProducts,
            deleteProductFunction,
            getAllProductsFunction,
            getAllPosts,
            deletePostFunction,
            getAllPostsFunction,
            userDetail,
            getUserDetailFunction,

        }}>
            {children}
        </MyContext.Provider>
    );
}

export default MyState;