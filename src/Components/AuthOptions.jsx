"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { LuLock } from "react-icons/lu";

const AuthOptions = () => {
    const session = useSession();

    if (session?.status === "authenticated") {
        return <button onClick={() => signOut()} className="hover:text-[#28A745] font-poppins cursor-pointer duration-300 inline-flex items-center gap-1">
            <LuLock /> Logout
        </button>
    }

    return <Link href="/user/login" className="hover:text-[#28A745] font-poppins cursor-pointer duration-300 inline-flex items-center gap-1">
        <FiUser /> Login
    </Link>;
};

export default AuthOptions;