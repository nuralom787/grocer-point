"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const SearchForm = () => {
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm();


    const onSubmit = (data) => {
        if (data.search === "") {
            router.push('/');
        }
        else {
            router.push(`/search?search=${encodeURIComponent(data.search)}`);
        }
        // reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="ps-3 lg:ps-6 col-span-6 w-full bg-white rounded-md inline-flex justify-between items-center">
            <label className="grow">
                <input
                    {...register("search")}
                    className="w-full px-3 lg:px-6 py-2 rounded-md outline-0 bg-white text-[#151515] font-semibold"
                    type="search"
                    placeholder="Search for any products..."
                />
            </label>
            <button type="submit" className="px-3 lg:px-6 py-2 cursor-pointer">
                <svg stroke="currentColor" fill="#151515" strokeWidth="0" viewBox="0 0 512 512" height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" strokeMiterlimit="10" strokeWidth="32" d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"></path>
                    <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"></path>
                </svg>
            </button>
        </form>
    );
};

export default SearchForm;