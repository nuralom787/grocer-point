import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { IoBagHandle, IoWalletOutline } from "react-icons/io5";
import { RiShoppingBasketLine } from "react-icons/ri";
import CartItemDelAndFabBtn from "./components/CartItemDelAndFabBtn";
import CartItemQuantityBtn from "./components/CartItemQuantityBtn";
import CartCouponApplyBtn from "./components/CartCouponApplyBtn";
import CartCheckoutBtn from "./components/CartCheckoutBtn";
import { headers } from "next/headers";
const url = process.env.NEXT_PUBLIC_BASE_URL;

const Cart = async () => {
    const session = await getServerSession();

    let cart = {};

    if (session) {
        const cartRes = await fetch(`${url}/api/cart/${session?.user?.email}`, {
            headers: new Headers(await headers()),
            cache: "force-cache"
        });
        cart = await cartRes.json();
    };


    return (
        <div className="py-10">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-2">
                {cart?.cartTotalItem > 0 ?
                    <ul className="w-full lg:w-3/5 space-y-2">
                        {
                            cart?.cart?.map(product => <li
                                key={product._id}
                                className="flex flex-col md:flex-row justify-between items-center gap-6 text-black bg-white px-4 py-6"
                            >
                                <div className="flex flex-col md:flex-row justify-start items-center gap-6 w-full lg:w-4/6">
                                    {/* <input
                                            type="checkbox"
                                            checked={selectedProducts.includes(product._id)}
                                            onChange={(e) => handleSelectProduct(e, product._id)}
                                            name={product.title} id={product._id}
                                            className="appearance-none w-4 h-4 bg-white checked:bg-green-500 border-2 border-gray-300 rounded cursor-pointer" /> */}
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        width={80}
                                        height={80}
                                        loading="eager"
                                        className="rounded-full border-4 border-gray-300"
                                    />
                                    <div>
                                        <h3 className="font-medium text-base">{product.title}</h3>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center w-full lg:w-2/6 space-y-2">
                                    <p className="text-xl font-semibold text-[#00a63e]">${product.price.toFixed(2)}</p>
                                    {product.originalPrice > product.price && <p className="text-base line-through leading-6">${(product.originalPrice).toFixed(2)}</p>}
                                    <CartItemDelAndFabBtn product={product} />
                                </div>
                                <div className="flex justify-end items-center gap-6 w-full lg:w-2/6">
                                    <CartItemQuantityBtn product={product} />
                                </div>
                            </li>)
                        }
                    </ul>
                    :
                    <div className="w-full p-16 lg:p-32 font-inter bg-white text-center">
                        <IoBagHandle className="text-gray-500 text-5xl lg:text-7xl font-semibold mx-auto" />
                        <p className="text-gray-500 text-xl font-semibold leading-14">Your cart is empty!</p>
                    </div>
                }
                <div className={`${cart?.cartTotalPrice ? "block" : "hidden"} w-full lg:w-2/5 bg-white text-[#151515] p-8 sticky top-36`}>
                    <h1 className="text-xl font-semibold leading-8">Order Summery</h1>
                    <div className="divider before:bg-black after:bg-black my-2"></div>
                    <div className="">
                        <div className="flex justify-between items-center gap-2">
                            <p className="font-medium text-sm text-gray-600 leading-8">SubTotal <span>({cart?.cart?.length} Items)</span></p>
                            <p className="font-medium text-sm">${cart?.cartTotalPrice?.toFixed(2) || "00.00"}</p>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p className="font-medium text-sm text-gray-600 leading-8">Shipping Fee</p>
                            <p className="font-medium text-sm">${(60).toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p className="font-medium text-sm text-gray-600 leading-8">Discount</p>
                            <p className="font-medium text-sm">${cart?.cartDiscount?.toFixed(2)}</p>
                        </div>
                    </div>
                    {cart?.cartDiscount && cart?.appliedCoupon ?
                        <div className="bg-green-100 py-3 px-6 mt-5 mb-1.5 font-inter flex justify-between items-center rounded">
                            <h2 className="text-sm text-green-700 font-bold">Coupon Applied</h2>
                            <span className="text-sm text-red-500 font-bold uppercase">{cart?.appliedCoupon}</span>
                        </div>
                        :
                        <CartCouponApplyBtn cart={cart} />
                    }
                    <div className="flex justify-between items-center gap-2">
                        <p className="font-bold text-xl text-[#151515] leading-12">Total</p>
                        <p className="font-bold text-xl text-red-600">${((cart?.cartTotalPrice + 60) - cart?.cartDiscount).toFixed(2) || "00.00"}</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-2">
                        <Link href="/" className="w-full inline-flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 duration-300 text-white px-5 py-2.5 rounded font-semibold text-base mt-3 md:mt-8 text-center">
                            CONTINUE SHOPPING <RiShoppingBasketLine />
                        </Link>
                        {session?.user?.email ?
                            <Link href={cart?.cart?.length ? "/user/checkout" : ""} className="w-full inline-flex items-center justify-center gap-1.5 bg-orange-400 hover:bg-orange-500 duration-300 text-white px-5 py-2.5 rounded font-semibold text-base mt-3 md:mt-8 text-center">
                                PROCEED TO CHECKOUT <IoWalletOutline />
                            </Link>
                            :
                            <CartCheckoutBtn />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;