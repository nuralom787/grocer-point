"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// const url = "https://grocerpoint.vercel.app";
const url = "http://localhost:3000";

const BkashPayment = () => {
    const router = useRouter();
    const session = useSession();
    const [cart, setCart] = useState({});
    const [products, setProducts] = useState([]);
    const [account, setAccount] = useState({});
    const [loading, setLoading] = useState(false);
    const shippingCost = 60;
    const email = session?.data?.user?.email;



    // Load Cart Data.
    useEffect(() => {
        fetch(`${url}/api/cart/${email}`)
            .then(res => res.json())
            .then(data => {
                setCart(data);
            })
    }, [email]);


    // Load Products Data.
    useEffect(() => {
        fetch(`${url}/api/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
            })
    }, []);


    // Load Account Data.
    useEffect(() => {
        fetch(`${url}/api/myAccount?email=${email}`)
            .then(res => res.json())
            .then(data => {
                setAccount(data);
            })
    }, [email]);




    const payWithBkash = () => {
        setLoading(true);
        const price = parseFloat((cart?.cartTotalPrice + shippingCost) - cart?.cartDiscount);
        const action = "create-bkash-payment";

        fetch(`${url}/api/payment`, {
            method: "POST",
            body: JSON.stringify({ price, action })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                router.push(data.result.bkashURL);
                setLoading(false);
            })
            .catch(error => {
                console.error(error.message);
                setLoading(false);
            })
    };


    return (
        <section className='bg-white py-5 px-10 font-inter text-sm'>
            {loading &&
                <div className="fixed inset-0 z-50 bg-black opacity-40 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            }
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