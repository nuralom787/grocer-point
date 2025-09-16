"use client";

import { useSession } from "next-auth/react";
import CardComponent from "./CardComponent";
import BkashPayment from "../payOptions/BkashPayment";
import NagadPayment from "../payOptions/NagadPayment";
import card from '../../../../../public/credit-card.png';
import bkash from '../../../../../public/bkash.png';
import nagad from '../../../../../public/nagad.png';
import doller from '../../../../../public/dollar.png';
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
// const url = "https://grocerpoint.vercel.app";
const url = "http://localhost:3000";

const PayMethod = () => {
    const session = useSession();
    const email = session?.data?.user?.email;
    const [cart, setCart] = useState({});
    const [loading, setLoading] = useState(false);
    const [method, setMethod] = useState("");

    useEffect(() => {
        fetch(`${url}/api/cart/${email}`)
            .then(res => res.json())
            .then(data => {
                setCart(data)
            })
    }, [email]);


    // Change Payment Method Function. 
    const handleMethod = (e) => {
        if (e.target.value === "card") {
            setMethod("card");
        } else if (e.target.value === "bkash") {
            setMethod("bkash");
        } else if (e.target.value === "nagad") {
            setMethod("nagad");
        } else {
            setMethod("cod");
        }
    };


    return (
        <div>
            {cart?.cart?.length ?
                <div>
                    <div className="hidden lg:grid grid-cols-4 pt-5">
                        <button onClick={() => setMethod("card")} className={`text-center cursor-pointer p-6 ${method === "card" ? "bg-white" : "bg-transparent"}`}>
                            <Image
                                src={card}
                                alt="Payment Logo card"
                                width={64}
                                height={64}
                                loading="eager"
                                className="mx-auto"
                            />
                            <h5 className="text-sm font-medium leading-9">Credit/Debit Card</h5>
                        </button>
                        <button onClick={() => setMethod("bkash")} className={`text-center cursor-pointer p-6 ${method === "bkash" ? "bg-white" : "bg-transparent"}`}>
                            <Image
                                src={bkash}
                                alt="Payment Logo bkash"
                                width={64}
                                height={64}
                                loading="eager"
                                className="mx-auto"
                            />
                            <h5 className="text-sm font-medium leading-9">Bkash</h5>
                        </button>
                        <button disabled onClick={() => setMethod("nagad")} className={`text-center cursor-pointer p-6 grayscale ${method === "nagad" ? "bg-white" : "bg-transparent"}`}>
                            <Image
                                src={nagad}
                                alt="Payment Logo nagad"
                                width={64}
                                height={64}
                                loading="eager"
                                className="mx-auto"
                            />
                            <h5 className="text-sm font-medium leading-9">Nagad</h5>
                        </button>
                        <button onClick={() => setMethod("cod")} className={`text-center cursor-pointer p-6 ${method === "cod" ? "bg-white" : "bg-transparent"}`}>
                            <Image
                                src={doller}
                                alt="Payment Logo doller"
                                width={64}
                                height={64}
                                loading="eager"
                                className="mx-auto"
                            />
                            <h5 className="text-sm font-medium leading-9">Cash on Delivery</h5>
                        </button>
                    </div>
                    <select
                        className="blok lg:hidden w-full border border-base-200 outline-0 rounded my-4 py-1.5 px-3 mx-auto"
                        onChange={handleMethod}
                    >
                        <option value="" hidden>Select an Payment Method</option>
                        <option value="card">Card</option>
                        <option value="bkash">Bkash</option>
                        <option value="nagad" disabled>Nagad</option>
                        <option value="cod">Cash On Delivery</option>
                    </select>
                </div>
                :
                <div className="grid grid-cols-4 pt-5">
                    <button
                        onClick={() => toast.error("Your cart is empty! please add some product to your cart and try to make a payment again.", { style: { width: "500px", padding: "25px", color: "red", fontWeight: "600" } })}
                        className={`text-center p-6 grayscale`}
                    >
                        <Image
                            src={card}
                            alt="Payment Method Logo"
                            width={64}
                            height={64}
                            className="mx-auto"
                        />
                        <h5 className="text-sm font-medium leading-9">Credit/Debit Card</h5>
                    </button>
                    <button
                        onClick={() => toast.error("Your cart is empty! please add some product to your cart and try to make a payment again.", { style: { width: "500px", padding: "25px", color: "red", fontWeight: "600" } })}
                        className={`text-center p-6 grayscale`}
                    >
                        <Image
                            src={bkash}
                            alt="Payment Method Logo"
                            width={64}
                            height={64}
                            className="mx-auto"
                        />
                        <h5 className="text-sm font-medium leading-9">Bkash</h5>
                    </button>
                    <button
                        onClick={() => toast.error("Your cart is empty! please add some product to your cart and try to make a payment again.", { style: { width: "500px", padding: "25px", color: "red", fontWeight: "600" } })}
                        className={`text-center p-6 grayscale`}
                    >
                        <Image
                            src={nagad}
                            alt="Payment Method Logo"
                            width={64}
                            height={64}
                            className="mx-auto"
                        />
                        <h5 className="text-sm font-medium leading-9">Nagad</h5>
                    </button>
                    <button
                        onClick={() => toast.error("Your cart is empty! please add some product to your cart and try to make a payment again.", { style: { width: "500px", padding: "25px", color: "red", fontWeight: "600" } })}
                        className={`text-center p-6 grayscale`}
                    >
                        <Image
                            src={doller}
                            alt="Payment Method Logo"
                            width={64}
                            height={64}
                            className="mx-auto"
                        />
                        <h5 className="text-sm font-medium leading-9">Cash on Delivery</h5>
                    </button>
                </div>
            }
            {method === "card" &&
                <CardComponent />
            }
            {method === "bkash" &&
                <BkashPayment />
            }
            {method === "nagad" &&
                <NagadPayment />
            }
            {method === "cod" &&
                <div className="bg-white p-5 lg:p-10">
                    <ul className="space-y-2 text-sm">
                        <li>- You may pay in cash to our courier upon receiving your parcel at the doorstep</li>
                        <li>- Before agreeing to receive the parcel, check if your delivery status has been updated to 'Out for Delivery'</li>
                        <li>- Before receiving, confirm that the airway bill shows that the parcel is from G-Shop</li>
                        <li>- Before you make payment to the courier, confirm your order number, sender information and tracking number on the parcel</li>
                    </ul>
                    {loading ?
                        <button
                            disabled
                            className="w-full lg:w-fit bg-orange-400 text-white px-12 py-2.5 mt-8 rounded font-semibold text-base">
                            Processing.. <span className="loading loading-spinner loading-sm"></span>
                        </button>
                        :
                        <button
                            onClick={confirmOrder}
                            className="w-full lg:w-fit bg-orange-400 hover:bg-orange-500 duration-300 text-white px-12 py-2.5 mt-8 rounded font-semibold text-base cursor-pointer inline-flex justify-center items-center gap-4">
                            Confirm Order <FaArrowRight />
                        </button>
                    }
                </div>
            }
        </div>
    );
};

export default PayMethod;