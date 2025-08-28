"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";


const SocialsAuth = () => {
    const router = useRouter();
    const session = useSession();

    const handleSocialAuth = (providerName) => {
        signIn(providerName);
    };

    useEffect(() => {
        if (session?.status == "authenticated") {
            router.push("/");
            toast.success("User Login Successfully ✅", {
                position: "top-center",
                autoClose: 2500
            })
        }
    }, [session?.status]);


    return (
        <div className="mb-6">
            <section className="space-y-4">
                <button
                    type="button"
                    onClick={() => handleSocialAuth("google")}
                    className="btn btn-outline text-xl font-semibold inline-flex justify-center items-center gap-6 w-full p-6 rounded-md"
                >
                    <FcGoogle /> Google
                </button>
                <button
                    type="button"
                    onClick={() => handleSocialAuth("github")}
                    className="btn btn-outline text-xl font-semibold inline-flex justify-center items-center gap-6 w-full p-6 rounded-md"
                >
                    <FaGithub /> Github
                </button>
            </section>
        </div>
    );
};

export default SocialsAuth;