import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";

import FooterImage from '../../assest/website/footer.jpg'
import logo from '../../assest/logo.png'


const footerImg = {
    backgroundImage: `url(${FooterImage})`,
    backgroundPosition: "center bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
}

const footerLinks = [
    {
        title: "Home",
        link: '/'
    },
    {
        title: "About Us",
        link: '/'
    },
    {
        title: "Contact",
        link: '/'
    },
    {
        title: "Blog",
        link: '/'
    },
]
function Footer() {
    return (
        <div>
            <div className='text-white  pb-44' style={footerImg}>
                <div className='container'>
                    <div className='grid md:grid-cols-3 pt-5' data-aos="zoom-in">
                        <div className='py-8 px-4'>
                            <h1 className='sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3'>
                                <img src={logo} alt='logo' className='max-w-[50px]'></img>
                                Shopsy
                            </h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum in beatae ea recusandae blanditiis veritatis.</p>
                        </div>

                        <div className='grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10'>
                            <div>
                                <div className='py-8 px-4'>
                                    <h1 className='sm:text-xl text-xl font-bold sm:text-left text-justify mb-3'>Important Links</h1>
                                    <ul className='flex flex-col gap-3'>
                                        {footerLinks.map((data) => (
                                            <li className='cursor-pointer hover:text-yellow-500 hover:translate-x-1 duration-300  text-gray-200' key={data.title}>
                                                <span>{data?.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>

                            <div>
                                <div className='py-8 px-4'>
                                    <h1 className='sm:text-xl text-xl font-bold sm:text-left text-justify mb-3'>Link</h1>
                                    <ul className='flex flex-col gap-3'>
                                        {footerLinks.map((data) => (
                                            <li className='cursor-pointer hover:text-yellow-500 hover:translate-x-1 duration-300  text-gray-200' key={data.title}>
                                                <span>{data?.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <div className='flex items-center gap-3 mt-6'>
                                    <a href='/' className="hover:text-yellow-400">
                                        <FaInstagram className="text-3xl"></FaInstagram>
                                    </a>
                                    <a href='/' className="hover:text-yellow-400">
                                        <FaFacebook className="text-3xl"></FaFacebook>
                                    </a>
                                    <a href='/' className="hover:text-yellow-400">
                                        <FaLinkedin className="text-3xl"></FaLinkedin>
                                    </a>
                                </div>
                                <div className="mt-6 flex flex-col gap-3">
                                    <div className="flex items-center gap-3 hover:cursor-pointer">
                                        <MdLocationOn className="text-xl"></MdLocationOn>
                                        <p>Noida, Uttar Pradesh</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FaMobileAlt className="text-xl"></FaMobileAlt>
                                        <a className="hover:cursor-pointer hover:text-white" href="tel:+91 1233312312">+91 1233312312</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;