"use client"
import { signIn } from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import SocialsAuth from "@/Components/SocialsAuth";

const LoginPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        try {
            const res = await signIn("credentials", { email, password, callbackUrl: "/", redirect: false });

            if (res.ok) {
                router.push("/");
                form.reset();
                // toast.success("Login Successfully", {
                //     position: "top-center",
                //     autoClose: 3500
                // })
                setLoading(false);
            } else {
                toast.error("Authentications Failed!! Please Try Again..", {
                    position: "top-center",
                    autoClose: 3500
                })
                setLoading(false);
            }
        } catch (error) {
            // console.log(error)
            toast.error("Authentication Failed!!");
            setLoading(false);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className='bg-white max-w-2xl mx-auto rounded-xl px-16 py-8 my-12 shadow-lg space-y-8'>
                <div className="text-center mt-6 mb-12 space-y-2">
                    <h1 className='font-extrabold text-4xl'>Login User</h1>
                    <p className="font-medium text-base">Login with email & password</p>
                </div>
                <div>
                    <label className='font-semibold text-lg ps-1.5'>Email</label>
                    <br />
                    <input className='w-full px-3 py-2.5 rounded-md outline-0 bg-white border border-gray-400'
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        required
                    />
                </div>
                <div>
                    <label className='font-semibold text-lg ps-1.5'>Password</label>
                    <br />
                    <input className='w-full px-3 py-2.5 rounded-md outline-0 bg-white border border-gray-400'
                        type="password"
                        name="password"
                        placeholder="Enter Your Password"
                        required
                    />
                </div>
                <span className='text-base font-medium hover:underline cursor-pointer'>Forget Password</span>
                <div className='my-3'>
                    {loading ?
                        <button type="button" disabled className='text-white font-semibold text-2xl bg-green-900 rounded-md w-full p-2.5 inline-flex justify-center items-center gap-4'>
                            <span className="loading loading-spinner loading-xl"></span>
                        </button>
                        :
                        <button type="submit" className='text-white font-semibold text-2xl bg-green-900 rounded-md w-full p-2.5 cursor-pointer inline-flex justify-center items-center gap-4'>
                            Login <FaArrowRight />
                        </button>
                    }
                </div>
                <br />
                <div className="text-center">
                    <span className="text-sm font-semibold">New Hare? Please <Link className="hover:underline text-green-900" href={"/register"}>Register</Link></span>
                </div>
                <div className="divider before:bg-black after:bg-black">OR</div>
                <SocialsAuth />
            </form>
        </div>
    );
};

export default LoginPage;