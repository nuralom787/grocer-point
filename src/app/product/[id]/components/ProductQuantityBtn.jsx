"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const localUrl = "https://grocerpoint.vercel.app";
// const localUrl = "http://localhost:3000";

const ProductQuantityBtn = ({ id, product }) => {
    const session = useSession();
    const router = useRouter();
    const [newQuantity, setNewQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setNewQuantity(1);
    }, [id]);

    // Handle Cart Quantity Minus.
    const handleQuantityMinus = () => {
        if (newQuantity !== 1) {
            const updateQuantity = newQuantity - 1;
            setNewQuantity(updateQuantity);
        };
    };

    // Handle Cart Quantity Plus.
    const handleQuantityPlus = () => {
        const updateQuantity = newQuantity + 1;
        setNewQuantity(updateQuantity);
    };

    // Product Add To Cart Function.
    const addToCart = async (product, newQuantity) => {
        if (session.status !== "authenticated") {
            router.push('/user/login');
        }
        else {
            try {
                setLoading(true);
                const email = session?.data?.user?.email;
                const item = {
                    _id: product._id,
                    image: product.image,
                    title: product.title,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    discount: product.discount,
                    quantity: newQuantity
                };
                const data = { email, item };
                const cartRes = await fetch(`${localUrl}/api/cart`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (cartRes.ok) {
                    const resData = await cartRes.json();
                    // console.log(resData);
                    toast.success("Item Added Successfully!", { position: "top-center" });
                    router.refresh();
                    setLoading(false);
                }
                else {
                    console.log(cartRes.status, cartRes.statusText);
                    setLoading(false);
                    // toast.success("Item Added Successfully!", { position: "top-center" });
                }
            }
            catch (error) {
                console.log(error)
                setLoading(false);
            }
        }
    };


    return (
        <>
            {loading &&
                <div className="fixed inset-0 z-50 bg-black opacity-40 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            }
            <div className='border-2 border-gray-300 rounded-md flex justify-between items-center'>
                <button className="px-4 py-4 border-r-2 border-gray-300 cursor-pointer"
                    onClick={handleQuantityMinus}
                >
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <p className="text-base font-semibold">{newQuantity}</p>
                <button className="px-4 py-4 border-l-2 border-gray-300 cursor-pointer"
                    onClick={handleQuantityPlus}
                >
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
            </div>
            <button
                className='px-4 py-4 bg-gray-800 hover:bg-gray-900 duration-500 cursor-pointer rounded-md text-sm font-extrabold text-white'
                onClick={() => addToCart(product, newQuantity)}
            >
                Add To Cart
            </button>
        </>
    );
};

export default ProductQuantityBtn;