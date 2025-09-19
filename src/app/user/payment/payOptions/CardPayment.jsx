"use client";

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import visa from '../../../../../public/visa.png';
import masterCard from '../../../../../public/masterCard.png';
import americanExpress from '../../../../../public/americanExpress.png';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
const url = process.env.NEXT_PUBLIC_BASE_URL;

const CardPayment = () => {
    const session = useSession();
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState({});
    const [products, setProducts] = useState([]);
    const [account, setAccount] = useState({});
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


    // Load Client Secret.
    useEffect(() => {
        const data = { price: parseFloat((cart.cartTotalPrice + shippingCost) - cart.cartDiscount), action: "create-payment-intent" };

        fetch(`${url}/api/payment`, {
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setClientSecret(data.result.clientSecret);
                // console.log(data.result.clientSecret);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [cart])


    // Make Payment Function.
    const onSubmit = async (e) => {
        e.preventDefault();


        if (!elements || !stripe) {
            return;
        };

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        };

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                email: account.email,
                name: account.addresses[0].fullName,
                phone: account.addresses[0].phoneNumber,
                address: {
                    state: account.addresses[0].region,
                    city: account.addresses[0].city,
                    line1: account.addresses[0].address
                }
            }
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
            setError("");
        };

        setLoading(true);
        // Confirm Payment.
        const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: account.email,
                    name: account.addresses[0].fullName,
                    phone: account.addresses[0].phoneNumber,
                    address: account.addresses[0].address,
                }
            }
        });


        if (paymentError) {
            // console.log('Payment error', paymentError);
            setError(error.message);
            setLoading(false);
        }
        else {
            // console.log('Payment Intent', paymentIntent);
            setError("");
            if (paymentIntent.status === "succeeded") {
                //--------------------------------------- 
                //          Store Order Information. 
                // --------------------------------------


                // create cart for order information.
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
                    paymentMethod: "Card",
                    paymentInfo: {
                        paymentMethod,
                        paymentIntent
                    }
                };

                // console.log(order_information);

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
                            router.push(`/order/invoice/${data.result.invoice.split("#")[1]}`);
                            router.refresh();
                            setLoading(false);
                        };
                    })
                    .catch(err => {
                        console.log(err);
                        setLoading(false);
                    });
            };
        };
    };


    return (
        <div>
            {loading &&
                <div className="fixed inset-0 z-50 bg-black opacity-40 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            }
            <form onSubmit={onSubmit} className='bg-white p-5 lg:p-10'>
                <div className="flex items-center gap-4">
                    <Image
                        src={visa}
                        alt="Payment Options Logo"
                        className="h-10 w-10"
                        loading='eager'
                    />
                    <Image
                        src={masterCard}
                        alt="Payment Options Logo"
                        className="h-10 w-10"
                        loading='eager'
                    />
                    <Image
                        src={americanExpress}
                        alt="Payment Options Logo"
                        className="h-10 w-10"
                        loading='eager'
                    />
                </div>
                <div className="border border-gray-400 rounded py-2.5 px-4 mt-5 mb-2">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <div>
                    <p className="text-sm text-red-500 font-semibold leading-6">{error}</p>
                </div>
                <div className="my-6">
                    {loading ?
                        <button
                            className="w-full lg:w-fit bg-orange-500 text-white py-2.5 px-6 rounded text-sm"
                            type="submit" disabled>
                            Processing.. <span className="loading loading-spinner loading-sm"></span>
                        </button>
                        :
                        <button
                            className="w-full lg:w-fit bg-orange-400 hover:bg-orange-500 duration-500 text-white py-2.5 px-6 rounded cursor-pointer text-sm"
                            type="submit" disabled={!stripe || !clientSecret}>
                            Pay Now
                        </button>
                    }
                </div>
            </form>
        </div>
    );
};

export default CardPayment;