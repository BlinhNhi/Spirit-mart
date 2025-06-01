import { useEffect, useState } from "react";
import MyContext from './MyContext'
import { collection, onSnapshot, doc, query, deleteDoc, getDoc, limit, orderBy, getDocs, where } from "firebase/firestore";
import { fireDB } from "../Firebase/FirebaseConfig";
import { notification } from "antd";

function MyState({ children }) {
    const [loading, setLoading] = useState(false);
    const [getAllCategories, setGetAllCategories] = useState([]);
    const [getAllProducts, setGetAllProducts] = useState([]);
    const [getFourProduct, setGetFourProducts] = useState([]);
    const [getTopRateProduct, setGetTopRateProduct] = useState([]);
    const [getAllPosts, setGetAllPosts] = useState([]);
    const [productDetail, setProductDetail] = useState({});
    const [userDetail, setUserDetail] = useState({});
    const [userOrderDetail, setUserOrderDetail] = useState([]);
    const [orderDetail, setOrderDetail] = useState({});

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

    // CRUD Product 
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

    const getProductDetailFunction = async (id) => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id))
            const product = {
                id: productTemp.id,
                ...productTemp.data(),
            };
            setProductDetail(product)
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getFourProductFunction = async () => {
        setLoading(true);
        try {
            // Thêm limit(6) vào query
            const q = query(
                collection(fireDB, "products"),
                limit(4)
            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let productArray = [];
                querySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetFourProducts(productArray);
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getTopRatedProductFuntion = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "products"),
                orderBy("rate", "desc"),
                limit(8)
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const productArray = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setGetTopRateProduct(productArray);
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getPaginatedProducts = async (page, limit, sortType = "", nameProduct, category) => {
        try {
            const productRef = collection(fireDB, "products");
            const conditions = [];

            // Thêm điều kiện sắp xếp
            switch (sortType) {
                case "highest-price":
                    conditions.push(orderBy("price", "desc"));
                    break;
                case "low-price":
                    conditions.push(orderBy("price", "asc"));
                    break;
                case "highest-star":
                    conditions.push(orderBy("rate", "desc"));
                    break;
                case "low-star":
                    conditions.push(orderBy("rate", "asc"));
                    break;
                default:
                    break;
            }

            // Lấy tất cả sản phẩm theo điều kiện sắp xếp
            const q = query(productRef, ...conditions);
            const snapshot = await getDocs(q);
            let allProducts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            const normalizedName = nameProduct?.trim().toLowerCase();
            const normalizedCategory = category?.trim().toLowerCase();

            allProducts = allProducts.filter((product) => {
                const nameMatch = normalizedName
                    ? product.name.toLowerCase().includes(normalizedName)
                    : true;

                const categoryMatch = normalizedCategory
                    ? product.category.toLowerCase() === normalizedCategory
                    : true;

                return nameMatch && categoryMatch;
            });

            const startIndex = (page - 1) * limit;
            const paginatedProducts = allProducts.slice(startIndex, startIndex + limit);
            return {
                products: paginatedProducts,
                totalCount: allProducts.length, // tổng sản phẩm thỏa điều kiện
            };
        } catch (error) {
            console.error("Lỗi khi fetch sản phẩm:", error);
            return {
                products: [],
                totalCount: 0,
            };
        }
    };


    // Post
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
    // User
    const getUserDetailFunction = async (id) => {
        setLoading(true);
        try {
            const userDetailTemp = await getDoc(doc(fireDB, "users", id));
            if (userDetailTemp.exists()) {
                const inforUser = userDetailTemp.data();
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
    // Order
    const getOrderByUserDetailFunction = async (userId) => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, "order"), where("userid", "==", userId));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const ordersUseDetail = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUserOrderDetail(ordersUseDetail);
                setLoading(false);
            } else {
                console.warn("Không tìm thấy order nào với userId:", userId);
                setUserOrderDetail([]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getOrderDetailFunction = async (id) => {
        setLoading(true);
        try {
            const orderTemp = await getDoc(doc(fireDB, "order", id))
            const order = {
                id: orderTemp.id,
                ...orderTemp.data(),
            };
            setOrderDetail(order)
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllCategoriesFunction();
        getAllProductsFunction();
        getFourProductFunction();
        getTopRatedProductFuntion();
        getAllPostsFunction()
    }, []);

    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllCategories,
            deleteCategoryFunction,
            getAllCategoriesFunction,
            getProductDetailFunction,
            productDetail,
            getAllProducts,
            getFourProduct,
            getTopRateProduct,
            deleteProductFunction,
            getAllProductsFunction,
            getAllPosts,
            deletePostFunction,
            getAllPostsFunction,
            userDetail,
            getUserDetailFunction,
            getOrderByUserDetailFunction,
            userOrderDetail,
            getOrderDetailFunction,
            orderDetail,
            getPaginatedProducts
        }}>
            {children}
        </MyContext.Provider>
    );
}

export default MyState;