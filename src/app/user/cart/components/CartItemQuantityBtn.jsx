"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const url = "https://grocerpoint.vercel.app";
// const url = "http://localhost:3000";

const CartItemQuantityBtn = ({ product }) => {
    const router = useRouter()
    const session = useSession();
    const [loading, setLoading] = useState(false);

    // Handle Product Quantity.
    const handleQuantity = (e, id) => {
        const email = session?.data?.user?.email;
        const data = { email, item: id };
        data.action = "update-quantity";

        if (e === "-1") {
            setLoading(true);
            // console.log(e, data);
            fetch(`${url}/api/cart?quantity=-1`, {
                method: "PATCH",
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    router.refresh()
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                })
        }
        else {
            setLoading(true);
            // console.log(e, data);
            fetch(`${url}/api/cart?quantity=+1`, {
                method: "PATCH",
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    router.refresh();
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                })
        }
    };


    return (
        <div className='border-2 border-gray-300 rounded-md flex justify-between items-center w-full'>
            {loading &&
                <div className="fixed inset-0 z-50 bg-black opacity-40 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            }
            <button
                disabled={product.quantity === 1 && true}
                className={`px-4 py-4 border-r-2 border-gray-300 ${product.quantity === 1 ? 'cursor-not-allowed' : 'cursor-pointer'} hover:text-red-700`}
                onClick={() => handleQuantity("-1", product._id)}>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </button>
            <p className="text-base font-semibold">{product.quantity}</p>
            <button
                className="px-4 py-4 border-l-2 border-gray-300 hover:text-green-700 cursor-pointer"
                onClick={() => handleQuantity("+1", product._id)}>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </button>
        </div>
    );
};

export default CartItemQuantityBtn;