import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import logo from "../../public/logo.jpg";
import Image from "next/image";
import SearchForm from "./forms/SearchForm";


const Header = () => {

    return (
        <div className='header sticky top-0 z-20'>
            {/* Header */}
            <div className="bg-green-900">
                <div className="container-width px-2 lg:px-6 text-[#151515] py-4 grid grid-cols-1 lg:grid-cols-10 gap-10">
                    <Image className="col-span-2 hidden lg:block" src={logo} alt="Grocer Point Logo" width={50} height={50} loading="lazy" />
                    <SearchForm />
                    <ul className="col-span-2 hidden lg:flex justify-end items-center gap-10 text-white text-3xl">
                        <li>
                            <Link href="/user/cart" className="relative">
                                <FiShoppingCart className="text-4xl" />
                                <p className="absolute -top-2 -right-2 inline-flex items-center justify-center bg-red-600 text-white text-sm p-3 h-5 w-5 rounded-full">
                                    {0}
                                </p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/user/my-account">
                                {/* {user?.email ?
                                        <div>
                                            {user?.photoURL ?
                                                (<img
                                                    src={user.photoURL}
                                                    alt={user.displayName}
                                                    className="w-11 h-11 rounded-full object-cover"
                                                />)
                                                :
                                                <div className="w-11 h-11 rounded-full bg-gray-300 flex items-center justify-center text-black text-xl font-bold">
                                                    {getInitial(name)}
                                                </div>
                                            }
                                        </div>
                                        : */}
                                <FaRegUser className="text-3xl" />
                                {/* } */}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="bg-white hidden lg:block">
                <div className="container-width px-2 lg:px-6 text-[#151515] py-4 flex justify-between items-center">
                    <div className="space-x-6 font-semibold font-poppins text-sm">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="hover:text-green-900 cursor-pointer inline-flex items-center gap-2">
                                Category
                                <IoIosArrowDown />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu flex-nowrap bg-white rounded-box z-1 min-w-max max-h-screen overflow-y-auto p-2 pt-3 mt-2 shadow-sm">
                                {/* {categories?.categories?.map(category => <li key={category._id}>
                                    <Link
                                        href={`/search?category=${encodeURIComponent(category.parent)}&_id=${category._id}`}
                                        className="inline-flex justify-between items-center gap-4 my-1 hover:text-green-900"
                                    >
                                        <div className="inline-flex items-center gap-4 hover:text-green-900">
                                            <img className="w-5 h-5 rounded-full" src={category.icon} alt="" />
                                            <span className="text-sm font-poppins font-medium">{category.parent}</span>
                                        </div>
                                        <IoIosArrowForward className="text-end" />
                                    </Link>
                                </li>)
                                } */}
                            </ul>
                        </div>
                        <Link className="hover:text-green-900 duration-300" href="/">About Us</Link>
                        <Link className="hover:text-green-900 duration-300" href="/">Contact Us</Link>
                        <Link className="hover:text-green-900 duration-300" href="/">Trams & Conditions</Link>
                        <Link className="text-red-600 bg-red-200 relative px-3 py-1 rounded" href="/">
                            Offers
                            <div className="absolute -top-1 -right-1 inline-grid *:[grid-area:1/1]">
                                <div className="status h-2.5 w-2.5 bg-red-600 animate-ping"></div>
                                <div className="status h-2.5 w-2.5 bg-red-600"></div>
                            </div>
                        </Link>
                    </div>
                    <div className="space-x-6 font-semibold font-poppins text-sm">
                        <Link className="hover:text-green-900 duration-300" href="/">Privacy Policy</Link>
                        <Link className="hover:text-green-900 duration-300" href="/">Refound Policy</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;