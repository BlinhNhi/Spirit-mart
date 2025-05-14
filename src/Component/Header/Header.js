import { ImSearch } from "react-icons/im";
import { FaShoppingCart } from "react-icons/fa";

import Logo from '../../assest/logo.png'
import DarkMode from '../DarkMode/DarkMode';
import { FaAngleDown } from "react-icons/fa";

const Menu = [
    {
        id: 1,
        name: "Home",
        link: "/"
    },
    {
        id: 2,
        name: "Top Rate",
        link: "/"
    },
    {
        id: 3,
        name: "Kids Wear",
        link: "/"
    },
    {
        id: 4,
        name: "Mens Wear",
        link: "/"
    },
    {
        id: 5,
        name: "Womens Wear",
        link: "/"
    },
]

const DropdownLinks = [
    {
        id: 1,
        name: "Trending Products",
        link: "/"
    },
    {
        id: 2,
        name: "Best Selling",
        link: "/"
    },
    {
        id: 3,
        name: "Top Rated",
        link: "/"
    }
]

function Header() {
    return (
        <div className='shadow-md  dark:bg-gray-900 dark:text-white duration-200 relative z-40'>
            {/* upper Navbar */}
            <div className='bg-primary/40 py-2'>
                <div className='container flex justify-between items-center'>
                    <div>
                        <a href='/' className="font-bold text-2xl sm:text-3xl flex gap-2 hover:no-underline hover:text-gray-400 dark:hover:text-orange-200"><img src={Logo} className="w-10 uppercase" alt='Logo'></img>ShopSy</a>
                    </div>
                    {/* search bar and order btn */}
                    <div className='flex justify-between items-center gap-4'>
                        <div className='group relative hidden sm:block'>
                            <input
                                type='text'
                                placeholder='Search'
                                className='w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 
                         rounded-full border border-priamry px-2 py-1 focus:border-primary focus:outline-none focus:border-1 dark:bg-gray-800 dark:border-gray-500'
                            ></input>
                            <ImSearch className='text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3' />
                        </div>
                        {/* order btn */}
                        <button
                            onClick={() => alert("Ordering not available yet")}
                            className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white focus:outline-none py-1 px-4 rounded-full flex items-center gap-3 group"
                        >
                            <span className='group-hover:block hidden transition-all duration-200'>Order</span>
                            <FaShoppingCart className='text-xl text-white drop-shadow-sm cursor-pointer' />
                        </button>

                        {/* Dark Mode Switch */}
                        <DarkMode></DarkMode>
                    </div>
                </div>
            </div>
            {/* lower Navbar */}
            <div className="flex justify-center">
                <ul className="sm:flex hidden items-center gap-4">
                    {Menu.map((data) => (
                        <li key={data.id}>
                            <a className="inline-block px-4 text-lg hover:text-primary duration-200 hover:no-underline" href={data.link}>{data.name}</a>
                        </li>
                    ))}
                    <li className="group relative cursor-pointer">
                        <a href="/" className="flex items-center gap-[4px] py-2 hover:no-underline dark:hover:text-orange-400">
                            Trending Products
                            <span>
                                <FaAngleDown className="transition-all duration-200 group-hover:rotate-180 " />
                            </span>
                        </a>
                        <div className="absolute z-[999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                            <ul>
                                {DropdownLinks.map((data) => (
                                    <li key={data.id} >
                                        <a href={data.link} className="inline-block w-full text-lg rounded-md p-2 hover:bg-primary/20 hover:no-underline">{data.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>

        </div>);
}

export default Header;