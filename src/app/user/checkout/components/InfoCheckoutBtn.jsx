"use client";

import Link from "next/link";
import { MdOutlinePayments } from "react-icons/md";
import { toast } from "react-toastify";

const InfoCheckoutBtn = () => {
    return (
        <Link
            href=""
            onClick={() => toast.error("Please complete your profile & address information before placed an order!!", {
                position: "top-center",
                autoClose: 5000,
                style: { width: "500px", fontWeight: 600, color: "red" }
            })}
            className="w-full inline-flex items-center justify-center gap-1.5 bg-orange-400 hover:bg-orange-500 duration-300 text-white px-5 py-2.5 rounded font-semibold text-base mt-8 text-center">
            PROCEED TO PAY <MdOutlinePayments className="text-xl" />
        </Link>
    );
};

export default InfoCheckoutBtn;