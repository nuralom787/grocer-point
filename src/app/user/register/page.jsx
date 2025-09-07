"use client";

import RegisterUser from "@/app/actions/auth/RegisterUser";
import SocialsAuth from "@/Components/SocialsAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const RegistrationPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const payload = { name, email, password };
        // console.log(payload);

        try {
            const res = await RegisterUser(payload);
            if (res.insertedId) {
                toast.success("User Created Successfully. Please Login.", {
                    position: "top-center",
                    autoClose: 3500
                });
                router.push("/user/login");
                form.reset();
                setLoading(false);
            }
            else {
                toast.error(res.message, {
                    position: "top-center",
                    autoClose: 3500
                });
                setLoading(false);
            }
        }
        catch (error) {
            form.reset();
            toast.error(error, {
                position: "top-center",
                autoClose: 3500
            });
            setLoading(false);
        }
    };


    return (
        <div className="">
            <form onSubmit={handleSubmit} className='bg-white max-w-2xl mx-auto rounded-xl px-16 py-8 my-12 shadow-lg space-y-8'>
                <div className="text-center mt-6 mb-12 space-y-2">
                    <h1 className='font-extrabold text-4xl'>Register User</h1>
                    <p className="font-medium text-base">Create a New Account</p>
                </div>
                <div>
                    <label className='font-semibold text-lg ps-1.5'>Full Name</label>
                    <br />
                    <input className='w-full px-3 py-2.5 rounded-md outline-0 bg-white border border-gray-400'
                        type="text"
                        name="name"
                        placeholder="Enter Your Full Name"
                        required
                    />
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
                <div className='my-3'>
                    {loading ?
                        <button type="button" disabled className='text-white font-semibold text-2xl bg-green-900 rounded-md w-full p-2.5'>
                            <span className="loading loading-spinner loading-xl"></span>
                        </button>
                        :
                        <button type="submit" className='text-white font-semibold text-2xl bg-green-900 rounded-md w-full p-2.5 cursor-pointer inline-flex justify-center items-center gap-4'>
                            Register <FaArrowRight />
                        </button>
                    }
                </div>
                <br />
                <div className="text-center">
                    <span className="text-sm font-semibold">
                        Already Have an account? Please <Link className="hover:underline text-green-900" href={"/login"}>Login</Link>
                    </span>
                </div>
                <div className="divider before:bg-black after:bg-black">OR</div>
                <SocialsAuth />
            </form>
        </div>
    );
};

export default RegistrationPage;