import React from "react";
import { Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import HomePage from "./page/HomePage/HomePage";
import Layout from "./Component/Layout/Layout";
import ProductDetail from "./page/ProductDetail/ProductDetail";
import CartPage from "./page/CartPage/CartPage";
import NoPage from "./page/NoPage/NoPage";
import AllProduct from "./page/AllProductPage/AllProductPage";
import CategoryPage from "./page/CategoryPage/CategoryPage";
import AdminTemplate from "./Component/Layout/AdminTemplate";
import CategoryMng from "./page/Admin/CategoryManager/CategoryManager";
import CreateCategory from "./page/Admin/CategoryManager/CreateCategory";
import MyState from "./Context/myState";
import UpdateCategory from "./page/Admin/CategoryManager/UpdateCategory";
import ProductMng from "./page/Admin/ProductManager/ProductManager";
import CreateProduct from "./page/Admin/ProductManager/CreateProduct";
import UpdateProduct from "./page/Admin/ProductManager/UpdateProduct";
import PostMng from "./page/Admin/PostsManager/PostManager";
import CreatePost from "./page/Admin/PostsManager/CreatePost";
import UpdatePost from "./page/Admin/PostsManager/UpdatePost";
import PostDetail from "./page/PostPage/PostDetail";
import Post from "./Component/Post/Post";
import SignUp from "./page/RegistrationPage/SignUp";
import Login from "./page/RegistrationPage/Loign";
import ForgetPassword from "./page/RegistrationPage/ForgetPassword";
import SystemUser from "./page/User/SystemUser/SystemUser";
import UserDetailPage from "./page/User/UserManager/UserDetailPage/UserDetailPage";
import UserManager from "./page/User/UserManager/UserManager/UserManager";
import ProtectedRouteForUser from "./ProtectedRoute/ProtectedRouteForUser";


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
      <MyState>
        <Routes>
          {/* General */}
          <Route path="/" element={<Layout><HomePage></HomePage></Layout>} />
          <Route path="/productdetail/:id" element={<Layout><ProductDetail></ProductDetail></Layout>} />
          <Route path="/allproduct" element={<Layout><AllProduct></AllProduct></Layout>} />
          <Route path="/cartpage" element={<Layout><CartPage></CartPage></Layout>} />
          <Route path="/category/:categoryname" element={<Layout><CategoryPage></CategoryPage></Layout>}></Route>
          <Route path="/posts" element={<Layout><Post></Post></Layout>} />
          <Route path="/postdetail/:id" element={<Layout><PostDetail></PostDetail></Layout>} />
          <Route path="/signup" element={<Layout><SignUp></SignUp></Layout>} />
          <Route path="/login" element={<Layout><Login></Login></Layout>} />
          <Route path="/forgetpassword" element={<Layout><ForgetPassword></ForgetPassword></Layout>} />


          {/* <Route path="/*" element={<Layout></Layout> {NoPage} />} /> */}

          {/* User */}
          <Route path="/system-account/*" element={
            <ProtectedRouteForUser>
              <Layout>
                <SystemUser />
              </Layout>
            </ProtectedRouteForUser>
          }>
            <Route path="my-account" element={<UserManager />} />
            <Route path="profile" element={<UserDetailPage />} />
            <Route path="cart-shopping" element={<UserDetailPage />} />
            <Route path="view-order" element={<UserDetailPage />} />
          </Route>

          {/* Admin
          <Route path="/admin/category-mng" element={<AdminTemplate></Layout> {CategoryMng} />} />
          <Route path="/admin/category-mng/addcategory" element={<AdminTemplate></Layout> {CreateCategory} />} />
          <Route path="/admin/category-mng/edit/:id" element={<AdminTemplate></Layout> {UpdateCategory} />} /> 
          

          <Route path="/admin/product-mng" element={<AdminTemplate></Layout> {ProductMng} />} />
          <Route path="/admin/product-mng/addproduct" element={<AdminTemplate></Layout> {CreateProduct} />} />
          <Route path="/admin/product-mng/edit/:id" element={<AdminTemplate></Layout> {UpdateProduct} />} /> 
          <Route path="/admin/post-mng" element={<AdminTemplate></Layout> {PostMng} />} />
          <Route path="/admin/post-mng/addpost" element={<AdminTemplate></Layout> {CreatePost} />} />
          <Route path="/admin/post-mng/edit/:id" element={<AdminTemplate></Layout> {UpdatePost} />} /> */}
        </Routes>
      </MyState>
    </>
  );
}
export default App;
