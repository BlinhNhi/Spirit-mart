import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import myContext from "../Context/MyContext";

function ProtectedRouteForAdmin({ children }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const { getUserDetailFunction, userDetail } = useContext(myContext);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (user?.uid) {
                await getUserDetailFunction(user?.uid);
            }
            setIsChecking(false);
        };
        fetchUser();
    }, []);

    if (isChecking) return null;
    console.log(userDetail?.role);
    if (userDetail?.role === "admin") {
        return children;
    } else {
        return <Navigate to="/login" replace />;
    }
}

export default ProtectedRouteForAdmin;
