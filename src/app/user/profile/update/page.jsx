"use client";

import { BsCloudArrowUp } from "react-icons/bs";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import NavigationPanel from "../../components/NavigationPanel";
import { useForm } from "react-hook-form";
const url = "https://grocerpoint.vercel.app";
// const url = "http://localhost:3000";

const UserProfileUpdate = () => {
    const session = useSession();
    const router = useRouter();
    const [account, setAccount] = useState({});
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        fetch(`${url}/api/myAccount?email=${session?.data?.user?.email}`, { cache: "force-cache" })
            .then(res => res.json())
            .then(data => {
                setAccount(data)
            })
    }, [])


    const onSubmit = (data) => {
        data.displayName = data.displayName ? data.displayName : account.displayName;
        data.email = data.email ? data.email : account.email;
        data.phoneNumber = data.phoneNumber ? data.phoneNumber : account.phoneNumber;
        data.dob = data.dob ? new Date(data.dob) : new Date(account.dob);
        data.gender = data.gender ? data.gender : account.gender;
        // console.log(data);

        Swal.fire({
            title: "Are you sure?",
            text: "You want to update your profile information?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Update"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true);
                    fetch(`${url}/api/myAccount?email=${account.email}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.modifiedCount > 0) {
                                Swal.fire({
                                    title: "Updated!",
                                    text: "Your profile has been updated Successfully.",
                                    icon: "success"
                                });
                                router.push("/user/profile");
                                router.refresh();
                                setLoading(false);
                            }
                        })
                        .catch(err => {
                            setLoading(false);
                            console.log(err);
                        })
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    };


    return (
        <div className="py-10">
            <section className="max-w-screen-2xl mx-auto px-3 lg:px-6 font-poppins">
                <section className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6 text-[#151515]">
                    {/* Navigation Panel */}
                    <NavigationPanel />

                    {/* Account Update Info */}
                    <div className="w-full lg:w-3/4 rounded">
                        <div className="bg-white p-4 rounded font-inter">
                            <h3 className="mb-2 font-semibold text-[#151515] text-lg">Edit Profile</h3>
                            <div className='divider before:bg-black after:bg-black my-2'></div>
                            {loading &&
                                <div className="fixed inset-0 z-50 bg-black opacity-40 flex items-center justify-center">
                                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            }
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                                    <div className='m-3 space-y-1.5'>
                                        <p className='text-xs'>Full Name</p>
                                        <input
                                            {...register("displayName")}
                                            className="w-full border border-gray-600 px-5 py-1 outline-0 font-semibold text-sm leading-7"
                                            defaultValue={account?.displayName}
                                            placeholder="Please Enter Your Full-Name"
                                            type="text"
                                        />
                                    </div>
                                    <div className='m-3 space-y-1.5'>
                                        <p className='text-xs'>Email Address</p>
                                        <input
                                            {...register("email")}
                                            className="w-full border border-gray-600 px-5 py-1 outline-0 font-semibold text-sm leading-7 cursor-not-allowed text-gray-500"
                                            defaultValue={account?.email && account?.email?.split('@')[0].slice(0, 2) + '*'.repeat(account?.email?.split('@')[0].length - 2) + '@' + account?.email?.split('@')[1]}
                                            // defaultValue={account?.email}
                                            disabled
                                            type="text"
                                        />
                                    </div>
                                    <div className='m-3 space-y-1.5'>
                                        <p className='text-xs'>Mobile</p>
                                        <input
                                            {...register("phoneNumber")}
                                            className="w-full border border-gray-600 px-5 py-1 outline-0 font-semibold text-sm leading-7"
                                            defaultValue={account?.phoneNumber}
                                            placeholder="Please Enter Your Phone Number"
                                            type="number"
                                        />
                                    </div>
                                    <div className='m-3 space-y-1.5'>
                                        <p className='text-xs'>Birthday</p>
                                        <input
                                            {...register("dob")}
                                            className="w-full border border-gray-600 px-5 py-1 outline-0 font-semibold text-sm leading-7 cursor-pointer"
                                            defaultValue={account?.dob && new Date(account?.dob).toISOString().split("T")[0]}
                                            placeholder="Please Enter Your Date-of-birth"
                                            type="date"
                                        />
                                    </div>
                                    <div className='m-3 space-y-1.5'>
                                        <p className='text-xs'>Gender</p>
                                        <select
                                            {...register("gender")}
                                            className="w-full border border-gray-600 px-5 py-2 outline-0 font-semibold text-sm cursor-pointer"
                                        >
                                            {account?.gender && <option value={account?.gender}>{account?.gender}</option>}
                                            <option value="Male" hidden={account?.gender === "Male" ? true : false}>Male</option>
                                            <option value="Female" hidden={account?.gender === "Female" ? true : false}>Female</option>
                                            <option value="Others" hidden={account?.gender === "Others" ? true : false}>Others</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='py-6 mx-3'>
                                    <button type="submit" className='inline-flex items-center gap-3 duration-300 uppercase bg-orange-400 text-white px-6 py-2.5 rounded font-semibold text-sm cursor-pointer'>
                                        Update Profile <BsCloudArrowUp className="font-extrabold text-lg" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
};

export default UserProfileUpdate;