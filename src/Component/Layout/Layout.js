import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout(props) {
    const { Component, ...restProps } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
    })

    return (
        <div>
            <Header location={location} navigate={navigate} params={params} ></Header>
            <Component location={location} navigate={navigate} params={params} />
            <Footer />
        </div>
    );
}

export default Layout;