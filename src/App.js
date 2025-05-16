import { Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import Layout from "./Component/Layout/Layout";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ProductDetail from "./page/ProductDetail/ProductDetail";
import CartPage from "./page/CartPage/CartPage";
import NoPage from "./page/NoPage/NoPage";
import AllProduct from "./page/AllProductPage/AllProductPage";
import CategoryPage from "./page/CategoryPage/CategoryPage";
import AdminTemplate from "./Component/Layout/AdminTemplate";
import CategoryMng from "./page/Admin/CategoryManager/CategoryManager";
import CreateCategory from "./page/Admin/CategoryManager/CreateCategory";


function App() {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout Component={HomePage} />} />
        <Route path="/productdetail/:id" element={<Layout Component={ProductDetail} />} />
        <Route path="/cartpage" element={<Layout Component={CartPage} />} />
        <Route path="/allproduct" element={<Layout Component={AllProduct} />} />
        <Route path="/category/:categoryname" element={<Layout Component={CategoryPage}></Layout>}></Route>
        <Route path="/*" element={<Layout Component={NoPage} />} />

        {/* Admin */}
        <Route path="/admin/category-mng" element={<AdminTemplate Component={CategoryMng} />} />
        <Route path="/admin/category-mng/addcategory" element={<AdminTemplate Component={CreateCategory} />} />

      </Routes>
    </>
  );
}
export default App;
