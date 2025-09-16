import { getServerSession } from "next-auth";
import PayMethod from "./components/PayMethod";
import { headers } from "next/headers";
// const url = process.env.NEXTAUTH_URL;
const url = "http://localhost:3000";

const Payment = async () => {
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
            <section className="">
                <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-6 lg:gap-3">
                    {/* {loading &&
                        <div className="fixed inset-0 z-50 bg-black opacity-40 flex items-center justify-center">
                            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    } */}
                    <div className="w-full lg:w-3/5 text-black">
                        <h3 className="font-semibold text-xl">Select your payment method.</h3>
                        <PayMethod />
                    </div>
                    <div className="w-full lg:w-2/5 bg-white text-[#151515] p-6 lg:sticky lg:top-36">
                        <h1 className="text-xl font-semibold leading-8 my-2">Order Summery</h1>
                        <div className="mb-6">
                            <div className="flex justify-between items-center gap-2">
                                <p className="font-medium text-sm text-gray-600 leading-8">SubTotal <span>({cart?.cart?.length} items and shipping fee included)</span></p>
                                <p className="font-medium text-sm">${(cart?.cartTotalPrice + 60).toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <p className="font-medium text-sm text-gray-600 leading-8">Discount</p>
                                <p className="font-medium text-sm">${cart?.cartDiscount?.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p className="font-bold text-xl text-[#151515] leading-12">Total Amount</p>
                            <p className="font-bold text-xl text-red-600">${((cart?.cartTotalPrice + 60) - cart?.cartDiscount).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Payment;