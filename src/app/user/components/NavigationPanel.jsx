import Link from "next/link";

const NavigationPanel = () => {
    return (
        <div className="bg-white w-full lg:w-1/4 p-6 rounded lg:sticky lg:top-36 navigation font-inter">
            <Link href="/user/my-account" className="font-semibold text-lg">My Account</Link>
            <ul className="ms-5 my-2">
                <li className="text-sm text-gray-500 leading-7 hover:text-cyan-600 w-fit">
                    <Link href="/user/profile">My Profile</Link>
                </li>
                <li className="text-sm text-gray-500 leading-7 hover:text-cyan-600 w-fit">
                    <Link href="/user/addresses">Address Book</Link>
                </li>
            </ul>
            <Link href="/user/orders" className="font-semibold text-lg">My Orders</Link>
            <Link href="/user/change-password" className="font-semibold text-lg block w-fit my-1.5">Change Password</Link>
        </div>
    );
};

export default NavigationPanel;