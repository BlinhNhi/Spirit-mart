import { NavLink } from "react-router-dom";

import { dataSideBarUser } from "../../utils/data/dataSideBarUser"

function SideBarUser() {
    return (
        <div className="">
            <div>
                <h1 className="font-bold text-xl border-b-2 border-gray-300 px-4 py-1
                text-center  lg:text-left xl:text-left 2xl:text-left
                ">Tài Khoản</h1>
                <div className="flex flex-col items-center justify-center gap-4 mt-3
                lg:items-start xl:items-start 2xl:items-start
                ">
                    {
                        dataSideBarUser.map(menu => {
                            return (
                                <NavLink
                                    to={menu?.path}
                                    id={menu?.id}
                                    key={menu?.id}
                                >
                                    <h3 className="
                text-base dark:text-gray-400 text-gray-600 hover:text-primary rounded-md
                font-semibold dark:hover:text-gray-500 cursor-pointer hover:bg-gray-200 px-4 py-1">
                                        {menu.name}</h3>
                                </NavLink>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}
export default SideBarUser;