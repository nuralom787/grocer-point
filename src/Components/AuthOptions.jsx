"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

const AuthOptions = () => {
    const session = useSession();

    if (session?.status === "authenticated") {
        return <button onClick={() => signOut()} className="hover:text-red-700 font-poppins cursor-pointer duration-300 inline-flex items-center gap-1">
            <FaSignOutAlt /> Logout
        </button>
    }

    return <Link href="/user/login" className="hover:text-green-900 font-poppins cursor-pointer duration-300 inline-flex items-center gap-1">
        <FiUser /> Login
    </Link>;
};

export default AuthOptions;