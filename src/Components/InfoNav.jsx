import Link from "next/link";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { LuLock } from "react-icons/lu";
import { FiUser } from "react-icons/fi";

const InfoNav = () => {
    return (
        <div className="info-nav hidden lg:block">
            <section className="container-width px-6 text-[#151515] py-2 flex justify-between items-center">
                <span className="inline-flex items-center gap-1 text-xs">
                    <MdOutlinePhoneInTalk /> We are available 24/7, Need help? <a href="tel:+880123456789" className="text-[#28A745] font-semibold hover:underline">+880 12345-6789</a>
                </span>
                <ul className="flex items-center gap-2 text-xs">
                    <li className="hover:text-[#28A745] font-poppins cursor-pointer duration-300">
                        <Link href="/">About Us</Link>
                    </li>
                    <span>|</span>
                    <li className="hover:text-[#28A745] font-poppins cursor-pointer duration-300">
                        <Link href="/">Contact Us</Link>
                    </li>
                    <span>|</span>
                    <li className="hover:text-[#28A745] font-poppins cursor-pointer duration-300">
                        <Link href="/user/my-account">My Account</Link>
                    </li>
                    <span>|</span>
                    {/* {user?.email ?
                        <button onClick={handleLogout} className="hover:text-[#28A745] font-poppins cursor-pointer duration-300 inline-flex items-center gap-1">
                            <LuLock /> Logout
                        </button>
                        : */}
                    <Link href="/user/login" className="hover:text-[#28A745] font-poppins cursor-pointer duration-300 inline-flex items-center gap-1">
                        <FiUser /> Login
                    </Link>
                    {/* } */}
                </ul>
            </section>
        </div>
    );
};

export default InfoNav;