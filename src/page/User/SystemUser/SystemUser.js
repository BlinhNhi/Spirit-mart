import { NavLink, Outlet } from "react-router-dom";
import SideBarUser from "../../../Component/SideBarUser/SideBarUser";

function SystemUser() {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <div className="container">
                <div className="py-10">
                    <div className=" mb-16 flex flex-col gap-2">
                        <h1 className="text-center font-bold text-2xl">Tài Khoản</h1>
                        <h1 className="text-center font-medium text-base"><NavLink to="/" >Home /</NavLink> Tài Khoản</h1>
                    </div>

                    <div className="grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
                        <SideBarUser></SideBarUser>
                        <div className="col-span-2 ml-6">
                            <Outlet></Outlet>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SystemUser;