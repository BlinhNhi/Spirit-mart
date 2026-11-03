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
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header location={location} navigate={navigate} params={params} />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;