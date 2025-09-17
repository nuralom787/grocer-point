import { getServerSession } from "next-auth";
import CartCouponApplyBtn from "../cart/components/CartCouponApplyBtn";
import { headers } from "next/headers";
import Link from "next/link";
import { MdOutlinePayments } from "react-icons/md";
import { IoBagHandle } from "react-icons/io5";
import Image from "next/image";
const url = process.env.NEXTAUTH_URL;
// const url = "http://localhost:3000";


const Checkout = async () => {
    const session = await getServerSession();
    const email = session?.user?.email;

    let cart = {};
    let account = {};


    if (session) {
        const acData = await fetch(`${url}/api/myAccount?email=${email}`);
        account = await acData.json();

        const cartRes = await fetch(`${url}/api/cart/${email}`, {
            headers: new Headers(await headers()),
            cache: "force-cache"
        });
        cart = await cartRes.json();
    };


    return (
        <div className="py-10">
            <section className="">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-3">
                    <div className="w-full lg:w-3/5 space-y-4 text-black">
                        {/* Shipping & Billing Options */}
                        <div className="bg-white px-4">
                            {
                                account?.addresses?.slice(0, 1).map(address => <div key={address._id} className="text-sm pt-4 pb-6">
                                    <div className="flex justify-between items-center gap-4 py-3">
                                        <h5 className="text-sm">Shipping & Billing</h5>
                                        <Link href={`/user/addresses/update/${address._id}`} className="text-sm text-cyan-500">EDIT</Link>
                                    </div>
                                    <p>
                                        <span className="pr-5 font-bold italic">{address.fullName}</span>
                                        <span>{address.phoneNumber}</span>
                                    </p>
                                    <p className="leading-10">{address.address}, {address.region}, {address.city}, {address.zone}.</p>
                                </div>)
                            }
                        </div>

                        {/* Selected Products For Checkout */}
                        {cart?.cart?.length ?
                            <ul className="space-y-2">
                                {
                                    cart?.cart?.map(product => <li
                                        key={product._id}
                                        className="flex flex-col md:flex-row justify-between items-center gap-6 text-black bg-white px-4 py-6"
                                    >
                                        <div className="flex flex-col md:flex-row justify-start items-center gap-6 w-full lg:w-4/6">
                                            <Image
                                                src={product.image}
                                                alt={product.title}
                                                width={80}
                                                height={80}
                                                loading="eager"
                                                className="w-20 h-20 rounded-full border-4 border-gray-300"
                                            />
                                            <h3 className="font-medium text-xl">{product.title}</h3>
                                        </div>
                                        <div className="text-center w-full lg:w-2/6">
                                            <p className="text-xl font-semibold text-[#00a63e]">${product.price.toFixed(2)}</p>
                                            {product.originalPrice > product.price && <p className="text-base line-through leading-7">${(product.originalPrice).toFixed(2)}</p>}
                                            {product.discount > 0 && <p className="text-base">-{Math.ceil(product.discount)}%</p>}
                                        </div>
                                        <div className="text-center w-full lg:w-2/6">
                                            <p><span className="text-gray-400">Qty:</span> {product.quantity}</p>
                                        </div>
                                    </li>)
                                }
                            </ul>
                            :
                            <div className="p-16 lg:p-32 font-inter bg-white text-center">
                                <IoBagHandle className="text-gray-500 text-7xl font-semibold mx-auto" />
                                <p className="text-gray-500 text-xl font-semibold leading-14">Your cart is empty!</p>
                            </div>
                        }
                    </div>
                    <div className="w-full lg:w-2/5 bg-white text-[#151515] p-6 sticky top-36">
                        <h1 className="text-xl font-semibold leading-8">Order Summery</h1>
                        <div className="divider before:bg-black after:bg-black my-2"></div>
                        <div className="">
                            <div className="flex justify-between items-center gap-2">
                                <p className="font-medium text-sm text-gray-600 leading-8">SubTotal <span>({cart?.cart?.length} Items)</span></p>
                                <p className="font-medium text-sm">${cart?.cartTotalPrice?.toFixed(2) || "00.00"}</p>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <p className="font-medium text-sm text-gray-600 leading-8">Shipping Fee</p>
                                <p className="font-medium text-sm">${(cart?.cartTotalPrice > 0 ? 60 : 0).toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <p className="font-medium text-sm text-gray-600 leading-8">Discount</p>
                                <p className="font-medium text-sm">${cart?.cartDiscount.toFixed(2)}</p>
                            </div>
                        </div>
                        {cart?.cartDiscount && cart?.appliedCoupon ?
                            <div className="bg-green-100 py-3 px-6 mt-5 mb-1.5 font-inter flex justify-between items-center">
                                <h2 className="text-sm text-green-600 font-bold">Coupon Applied</h2>
                                <span className="text-sm text-red-500 font-bold uppercase">{cart?.appliedCoupon}</span>
                            </div>
                            :
                            <CartCouponApplyBtn cart={cart} />
                        }
                        <div className="flex justify-between items-center gap-2">
                            <p className="font-bold text-xl text-[#151515] leading-12">Total</p>
                            <p className="font-bold text-xl text-red-600">${((cart?.cartTotalPrice + (cart?.cartTotalPrice > 0 ? 60 : 0)) - cart?.cartDiscount).toFixed(2) || "00.00"}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link
                                href="/user/payment"
                                className="w-full inline-flex items-center justify-center gap-1.5 bg-orange-400 hover:bg-orange-500 duration-300 text-white px-5 py-2.5 rounded font-semibold text-base mt-8 text-center">
                                PROCEED TO PAY <MdOutlinePayments className="text-xl" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Checkout;