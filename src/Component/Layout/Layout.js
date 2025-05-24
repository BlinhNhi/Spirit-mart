import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
    })

    return (
        <div>
            <Header location={location} navigate={navigate} params={params} ></Header>
            {children}
            <Footer />
        </div>
    );
}

export default Layout;