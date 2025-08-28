"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";

const ProfileImage = () => {
    const session = useSession();
    // console.log(session);

    // Set User Name First Letter as there image if image is null.
    const getInitial = () => {
        return session?.data?.user?.name ? session?.data?.user?.name.charAt(0).toUpperCase() : '?';
    };


    return (
        <li>
            <Link href="/user/my-account">
                {session?.status === "authenticated" ?
                    <div>
                        {session?.data?.user?.image ?
                            (<Image
                                src={session?.data?.user?.image}
                                alt={session?.data?.user?.name}
                                width={44}
                                height={44}
                                loading="lazy"
                                className="rounded-full object-cover"
                            />)
                            :
                            <div className="w-11 h-11 rounded-full bg-gray-300 flex items-center justify-center text-black text-xl font-bold">
                                {getInitial(name)}
                            </div>
                        }
                    </div>
                    :
                    <FaRegUser className="text-3xl" />
                }
            </Link>
        </li>
    );
};

export default ProfileImage;