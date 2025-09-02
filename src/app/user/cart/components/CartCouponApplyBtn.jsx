"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CartCouponApplyBtn = ({ cart }) => {
    const session = useSession();
    const { register, handleSubmit, reset } = useForm();

    // Handle Apply Coupon Code.
    const applyCoupon = (data) => {
        if (!cart?.cartTotalPrice) {
            return toast.error("please add some product in your cart!!");
        };

        data.subtotal = cart?.cartTotalPrice;
        data.email = session?.data?.user?.email;

        console.log(data);

        // Validate Coupon Code.
        // axiosSecure.post("/apply-coupon", data)
        //     .then(res => {
        //         // console.log(res.data);
        //         if (res.data.modifiedCount > 0) {
        //             refetch();
        //             toast.success(`Coupon code "${data.couponCode}" applied successfully.`, { position: "top-center", autoClose: 5000 });
        //             reset();
        //         }
        //     })
        //     .catch(err => {
        //         toast.error(err.response.data.message);
        //     })
    };


    return (
        <form onSubmit={handleSubmit(applyCoupon)} className="grid grid-cols-4 mt-5 mb-1.5">
            <input {...register("couponCode", { required: true })} type="text" className="px-4 py-2 font-semibold text-base border border-e-0 border-gray-300 focus:border-cyan-500 duration-500 rounded-s-sm outline-0 col-span-3" />
            <button type="submit" className="uppercase font-semibold text-base text-white bg-[#25a5d8] hover:bg-cyan-700 duration-500 rounded-e-sm cursor-pointer col-span-1">Apply</button>
        </form>
    );
};

export default CartCouponApplyBtn;