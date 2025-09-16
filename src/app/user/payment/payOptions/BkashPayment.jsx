"use client";

import { useState } from "react";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import useCart from "../../../Hooks/useCart";
// import useMyAccount from "../../../Hooks/useMyAccount";

const BkashPayment = () => {
    // const axiosSecure = useAxiosSecure();
    // const [account] = useMyAccount();
    // const [cart, , isPending, isError] = useCart();
    const [loading, setLoading] = useState(false);
    const shippingCost = 60;

    const payWithBkash = () => {
        if (!isPending || !isError) {
            // setLoading(true);
            // const price = parseFloat((cart.cartTotalPrice + shippingCost) - cart.cartDiscount);
            // // const price = parseFloat(cart.cartTotalPrice);
            // axiosSecure.post("/create_payment", { price: price })
            //     .then(res => {
            //         // console.log(res.data);
            //         if (res.data.bkashURL && res.data.paymentID && res.data.statusMessage === "Successful") {
            //             window.location.href = res.data.bkashURL;
            //         };
            //     })
            //     .catch(error => {
            //         console.error(error.message);
            //         setLoading(false);
            //     })
        }
    };


    return (
        <section className='bg-white py-5 px-10 font-inter text-sm'>
            <div className="p-4">
                <h4 className="pb-3.5 font-semibold">-- Please Note.</h4>
                <ol className="list-decimal space-y-3.5 font-bold text-red-600">
                    <li>You have an activated bKash account </li>
                    <li>Ensure you have sufficient balance in your bKash account to cover the total cost of the order</li>
                    <li>Ensure you are able to receive your OTP (one-time-password) on your mobile and have bKash PIN</li>
                </ol>
            </div>
            {loading ?
                <button disabled className="my-4 w-full lg:w-fit bg-orange-400 text-white py-2.5 px-6 rounded text-sm">
                    Processing.. <span className="loading loading-spinner loading-sm"></span>
                </button>
                :
                <button onClick={payWithBkash} className="my-4 w-full lg:w-fit bg-orange-400 hover:bg-orange-500 duration-500 text-white py-2.5 px-6 rounded cursor-pointer text-sm">
                    Pay Now
                </button>
            }
        </section>
    );
};

export default BkashPayment;