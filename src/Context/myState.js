import { useEffect, useState } from "react";
import MyContext from './MyContext'
import { collection, onSnapshot, orderBy, doc, query, deleteDoc } from "firebase/firestore";
import { fireDB } from "../Firebase/FirebaseConfig";
import { notification } from "antd";

function MyState({ children }) {
    const [loading, setLoading] = useState(false);
    const [getAllCategories, setGetAllCategories] = useState([]);
    const [getAllProducts, setGetAllProducts] = useState([]);

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

    // Delete oder Function
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

    // Delete oder Function
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

    useEffect(() => {
        getAllCategoriesFunction();
        getAllProductsFunction()
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
            getAllProductsFunction
        }}>
            {children}
        </MyContext.Provider>
    );
}

export default MyState;