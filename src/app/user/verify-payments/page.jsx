"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsArrowRepeat } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import Hourglass from "../../../../public/Hourglass.gif";
import { toast } from "react-toastify";

const url = process.env.NEXT_PUBLIC_BASE_URL;

const VerifyPayments = ({ searchParams }) => {
    const { paymentID, status, trxID, transactionStatus, invoiceId } = React.use(searchParams);
    const session = useSession();
    const router = useRouter();
    const email = session?.data?.user?.email;
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState({});
    const [products, setProducts] = useState([]);
    const [account, setAccount] = useState({});
    const [cancel, setCancel] = useState(false);
    const [failed, setFailed] = useState(false);
    const shippingCost = 60;
    const newId = "#" + invoiceId;


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


    // Store Order Information In The Database.
    // This callback function use for bkash payments orders.
    useEffect(() => {
        if (paymentID && status === "cancel") {
            setCancel(true);
            setLoading(false);
        }
        else if (paymentID && status === "failure") {
            setFailed(true);
            setLoading(false);
        }

        // Make Order information and placed order.
        if (cart?.email && products.length) {
            if (paymentID && status === "success") {
                // setLoading(true);

                let newCart = [];
                for (let item of cart.cart) {
                    const newItem = products.find(product => product._id === item._id);
                    newItem.quantity = item.quantity;
                    newCart = [...newCart, newItem];
                };

                // create order information.
                const order_information = {
                    customerInfo: {
                        customer_name: account.displayName,
                        customer_phoneNumber: account.phoneNumber,
                        customer_email: account.email,
                        customer_uid: account.uid,
                        customer_id: account._id
                    },
                    cart: newCart,
                    sbAddress: account.addresses[0],
                    subtotal: cart.cartTotalPrice,
                    shippingCost: shippingCost,
                    discount: cart.cartDiscount,
                    appliedCoupon: cart.cartDiscount > 0 ? cart.appliedCoupon : null,
                    total: (cart.cartTotalPrice + shippingCost) - cart.cartDiscount,
                    paymentMethod: "BKASH",
                    paymentInfo: {
                        paymentID,
                        status,
                        trxID,
                        transactionStatus,
                        amount: (cart.cartTotalPrice + shippingCost) - cart.cartDiscount,
                        paymentType: "bkash"
                    },
                    invoice: newId
                };
                // console.log(order_information);


                // Fetch Placed Order API.
                fetch(`${url}/api/orders`, {
                    method: "POST",
                    body: JSON.stringify({ order_information })
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data.data);
                        if (data.result.insertedId && data.result.invoice) {
                            toast.success(`Your order ${data.result.orderId.split("-")[1]} has been pleased successfully. your invoice id is: ${data.result.invoice}.`, {
                                position: "top-center",
                                autoClose: 6000,
                                style: { fontWeight: "600", color: "#151515", width: "500px", padding: "20px" }
                            });
                            router.replace(`/order/invoice/${data.result.insertedId}`);
                            router.refresh();
                            setLoading(false);
                        };
                    })
                    .catch(err => {
                        console.log(err);
                        setLoading(false);
                    });
            }
        }
    }, [cart, products]);


    return (
        <div className="flex justify-center items-center my-20 text-center">
            {loading &&
                <div className="fixed inset-0 z-50 bg-black opacity-40 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            }
            {cancel &&
                <div className="space-y-4 bg-white py-20 px-44 rounded-md">
                    <FcCancel className="text-9xl mx-auto" />
                    <h1 className="font-medium text-6xl">Payment Cancelled!!</h1>
                    <p className="font-medium text-gray-500 text-lg">Your Payment Has Been Cancelled.</p>
                    <button
                        onClick={() => router.push("/user/payment")}
                        className="inline-flex items-center gap-3 duration-300 bg-blue-600 hover:bg-blue-800 text-white font-medium px-6 py-2 rounded cursor-pointer">
                        Try Again <BsArrowRepeat className="text-xl" />
                    </button>
                </div>
            }
            {failed &&
                <div className="space-y-4 bg-white py-20 px-44 rounded-md">
                    <FcCancel className="text-9xl mx-auto" />
                    <h1 className="font-medium text-6xl">Payment Failed!!</h1>
                    <p className="font-medium text-gray-500 text-lg">We ware unable to process your payment.</p>
                    <button
                        onClick={() => router.push("/user/payment")}
                        className="inline-flex items-center gap-3 duration-300 bg-blue-600 hover:bg-blue-800 text-white font-medium px-6 py-2 rounded cursor-pointer">
                        Try Again <BsArrowRepeat className="text-xl" />
                    </button>
                </div>
            }
            {status === "success" &&
                <div className="space-y-4 bg-white py-28 px-52 rounded-md">
                    <Image src={Hourglass} alt="" width={130} height={130} loading="eager" className="mx-auto" />
                    <h5 className="font-bold text-xl">Thank you. We are currently checking your data.</h5>
                    <p className="font-medium text-lg">The verification status will update automatically.</p>
                </div>
            }
        </div>
    );
};

export default VerifyPayments;