import { getServerSession } from "next-auth";
import PayMethod from "./components/PayMethod";
import { headers } from "next/headers";
const url = process.env.NEXTAUTH_URL;
// const url = "http://localhost:3000";

const Payment = async () => {
    // console.log(searchParams);
    // const {  } = new URL(req.url);
    // const paymentID = searchParams.get("paymentID");
    // const status = searchParams.get("status");
    // const trxID = searchParams.get("trxID");
    // const transactionStatus = searchParams.get("transactionStatus");
    // const invoiceId = searchParams.get("invoiceId");
    const session = await getServerSession();

    let cart = {};

    if (session) {
        const cartRes = await fetch(`${url}/api/cart/${session?.user?.email}`, {
            headers: new Headers(await headers())
        });
        cart = await cartRes.json();
    };


    // Store Order Information In The Database.
    // This callback function use for bkash payments orders.
    // useEffect(() => {
    //     // if (paymentID && status === "cancel") {
    //     //     // toast.info("payment was canceled! please try again.");
    //     //     console.log(paymentID, status, trxID, transactionStatus, invoiceId);
    //     // }
    //     // else if (paymentID && status === "failure") {
    //     //     // toast.info("payment was failed! please try again.")
    //     //     console.log(paymentID, status, trxID, transactionStatus, invoiceId);
    //     // }


    //     // Make Order information and placed order.
    //     // if (!cartPending && !cartError && !pPending && !pError) {
    //     //     if (paymentID && status === "success") {
    //     //         // console.log(paymentData);
    //     //         setLoading(true);

    //     //         let newCart = [];
    //     //         for (let item of cart.cart) {
    //     //             const newItem = products.products.find(product => product._id === item._id);
    //     //             newItem.quantity = item.quantity;
    //     //             newCart = [...newCart, newItem];
    //     //         };

    //     //         // create order information.
    //     //         const order_information = {
    //     //             customerInfo: {
    //     //                 customer_name: account.displayName,
    //     //                 customer_phoneNumber: account.phoneNumber,
    //     //                 customer_email: account.email,
    //     //                 customer_uid: account.uid,
    //     //                 customer_id: account._id
    //     //             },
    //     //             cart: newCart,
    //     //             sbAddress: account.addresses[0],
    //     //             subtotal: cart.cartTotalPrice,
    //     //             shippingCost: shippingCost,
    //     //             discount: cart.cartDiscount,
    //     //             appliedCoupon: cart.cartDiscount > 0 ? cart.appliedCoupon : null,
    //     //             total: (cart.cartTotalPrice + shippingCost) - cart.cartDiscount,
    //     //             paymentMethod: "BKASH",
    //     //             paymentInfo: {
    //     //                 paymentID,
    //     //                 status,
    //     //                 trxID,
    //     //                 transactionStatus,
    //     //                 amount: (cart.cartTotalPrice + shippingCost) - cart.cartDiscount,
    //     //                 paymentType: "bkash"
    //     //             },
    //     //             invoice: newId
    //     //         };
    //     //         // console.log(order_information);


    //     //         // 
    //     //         axiosSecure.post("/add-order", order_information)
    //     //             .then(res => {
    //     //                 // console.log(res.data);
    //     //                 if (res.data.insertedId) {
    //     //                     toast.success(`Your order ${res.data.orderId.split("-")[1]} has been pleased successfully. your invoice id is: ${res.data.invoice}.`, {
    //     //                         position: "top-center",
    //     //                         autoClose: 6000,
    //     //                         style: { fontWeight: "600", color: "#151515", width: "500px", padding: "20px" }
    //     //                     });
    //     //                     refetch();
    //     //                     navigate(`/order/invoice/${res.data.insertedId}`, { replace: true })
    //     //                     setLoading(false);
    //     //                 };
    //     //             })
    //     //             .catch(err => {
    //     //                 console.log(err);
    //     //                 setLoading(false);
    //     //             });
    //     //     }
    //     // }
    // }, []);


    return (
        <div className="py-10">
            <section className="">
                <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-6 lg:gap-3">
                    <div className="w-full lg:w-3/5 text-black">
                        <h3 className="font-semibold text-xl">Select your payment method.</h3>
                        <PayMethod />
                    </div>
                    <div className="w-full lg:w-2/5 bg-white text-[#151515] p-6 lg:sticky lg:top-36">
                        <h1 className="text-xl font-semibold leading-8 my-2">Order Summery</h1>
                        <div className="mb-6">
                            <div className="flex justify-between items-center gap-2">
                                <p className="font-medium text-sm text-gray-600 leading-8">SubTotal <span>({cart?.cart?.length} items and shipping fee included)</span></p>
                                <p className="font-medium text-sm">${(cart?.cartTotalPrice + (cart?.cartTotalPrice > 0 ? 60 : 0)).toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <p className="font-medium text-sm text-gray-600 leading-8">Discount</p>
                                <p className="font-medium text-sm">${cart?.cartDiscount?.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <p className="font-bold text-xl text-[#151515] leading-12">Total Amount</p>
                            <p className="font-bold text-xl text-red-600">${((cart?.cartTotalPrice + (cart?.cartTotalPrice > 0 ? 60 : 0)) - cart?.cartDiscount).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Payment;