import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import logo from "../../public/logo.jpg";
import Image from "next/image";
import SearchForm from "./forms/SearchForm";
import ProfileImage from "./user/ProfileImage";
import { getServerSession } from "next-auth";
const url = process.env.NEXT_PUBLIC_BASE_URL;


const Header = async () => {
    const session = await getServerSession();
    const categoryRes = await fetch(`${url}/api/categories`);
    const categories = await categoryRes.json();

    let cart = {};

    if (session) {
        const cartRes = await fetch(`${url}/api/cart/${session?.user?.email}`);
        if (cartRes.ok) {
            cart = await cartRes.json();
        }
    };

    return (
        <div className='header sticky top-0 z-20'>
            {/* Header */}
            <div className="bg-green-900">
                <div className="container-width px-2 lg:px-6 text-[#151515] py-4 grid grid-cols-1 lg:grid-cols-10 gap-10">
                    <Image className="col-span-2 hidden lg:block" src={logo} alt="Grocer Point Logo" width={50} height={50} loading="eager" />
                    <SearchForm />
                    <ul className="col-span-2 hidden lg:flex justify-end items-center gap-10 text-white text-3xl">
                        <li>
                            <Link href="/user/cart" className="relative">
                                <FiShoppingCart className="text-4xl" />
                                <p className="absolute -top-2 -right-2 inline-flex items-center justify-center bg-red-600 text-white text-sm p-3 h-5 w-5 rounded-full">
                                    {cart.cartTotalQuantity ? cart?.cartTotalQuantity : 0}
                                </p>
                            </Link>
                        </li>
                        <ProfileImage />
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
                            <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[9999] min-w-max max-h-[500] overflow-y-auto p-2 pt-3 mt-2 shadow-sm grid grid-cols-2 gap-2">
                                {categories?.map(category => <li key={category._id}>
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
                                }
                            </ul>
                        </div>
                        <Link className="hover:text-green-900 duration-300" href="/about-us">About Us</Link>
                        <Link className="hover:text-green-900 duration-300" href="/contact-us">Contact Us</Link>
                        <Link className="hover:text-green-900 duration-300" href="/trams&conditions">Trams & Conditions</Link>
                        <Link className="text-red-600 bg-red-200 relative px-3 py-1 rounded" href="/offers">
                            Offers
                            <div className="absolute -top-1 -right-1 inline-grid *:[grid-area:1/1]">
                                <div className="status h-2.5 w-2.5 bg-red-600 animate-ping"></div>
                                <div className="status h-2.5 w-2.5 bg-red-600"></div>
                            </div>
                        </Link>
                    </div>
                    <div className="space-x-6 font-semibold font-poppins text-sm">
                        <Link className="hover:text-green-900 duration-300" href="/privacy-policy">Privacy Policy</Link>
                        <Link className="hover:text-green-900 duration-300" href="/refound-policy">Refound Policy</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;