"use client";

import { IoWalletOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const CartCheckoutBtn = () => {
    return (
        <button
            onClick={() => toast.info("Please Complete Your Profile Information For Placed an Order!!", {
                position: "top-center",
                autoClose: 2500
            })}
            className="w-full inline-flex items-center justify-center gap-1.5 bg-orange-400 hover:bg-orange-500 duration-300 text-white px-5 py-2.5 rounded font-semibold text-base mt-3 md:mt-8 text-center cursor-pointer">
            PROCEED TO CHECKOUT <IoWalletOutline />
        </button>
    );
};

export default CartCheckoutBtn;