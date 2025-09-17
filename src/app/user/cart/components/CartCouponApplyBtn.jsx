"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const url = "https://grocerpoint.vercel.app";
// const url = "http://localhost:3000";

const CartCouponApplyBtn = ({ cart }) => {
    const session = useSession();
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);

    // Handle Apply Coupon Code.
    const applyCoupon = (couponData) => {
        if (!cart?.cartTotalPrice) {
            return toast.error("please add some product in your cart!!");
        };

        couponData.subtotal = cart?.cartTotalPrice;
        couponData.email = session?.data?.user?.email;
        couponData.action = "apply-coupon";

        // console.log(couponData);
        try {
            setLoading(true);
            fetch(`${url}/api/cart`, {
                method: "PATCH",
                body: JSON.stringify(couponData)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log("From Res: ", data);
                    if (data.error) {
                        toast.error(data.error, { position: "top-center", autoClose: 3500 })
                        setLoading(false);
                    }
                    if (data.result.modifiedCount > 0) {
                        router.refresh();
                        toast.success(`Coupon code "${couponData.couponCode}" applied successfully.`, {
                            position: "top-center",
                            autoClose: 3000
                        });
                        reset();
                        setLoading(false);
                    }
                })
        }
        catch (err) {
            // toast.error(err);
            console.log(err);
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit(applyCoupon)} className="grid grid-cols-4 mt-5 mb-1.5">
            {loading &&
                <div className="fixed inset-0 z-50 bg-black opacity-40 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            }
            <input
                {...register("couponCode", { required: true })}
                type="text"
                className="px-4 py-2 font-semibold text-base border border-e-0 border-gray-300 focus:border-cyan-500 duration-500 rounded-s-sm outline-0 col-span-3"
            />
            <button
                type="submit"
                className="uppercase font-semibold text-base text-white bg-[#25a5d8] hover:bg-cyan-700 duration-500 rounded-e-sm cursor-pointer col-span-1">
                Apply
            </button>
        </form>
    );
};

export default CartCouponApplyBtn;