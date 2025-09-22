import { getServerSession } from "next-auth";
import logo from '../../../../../public/logo-with-title.jpg';
import Image from "next/image";
import PrintAndDownloadBtn from "./Components/PrintAndDownloadBtn";

const url = process.env.NEXT_PUBLIC_BASE_URL;

const OrderInvoice = async ({ params }) => {
    const session = await getServerSession();
    const { orderId } = await params;
    const email = session?.user?.email;

    const ordersRes = await fetch(`${url}/api/orders/invoice?email=${email}&id=${orderId}`, { next: { revalidate: 60 } });
    const order = await ordersRes.json();

    return (
        <div className="py-8 lg:py-16 print:py-0">
            <section className="print:px-0 font-inter text-[#151515]">
                <div className="">
                    <div className="invoice-head bg-emerald-100 px-8 py-6 mb-8 rounded-md">
                        <p className="font-semibold">
                            Thank you <span className="font-bold text-emerald-600">{order?.customerInfo?.customer_name}.</span> Your order have been received.
                        </p>
                    </div>
                    <section className="invoice">
                        <div className="bg-indigo-50 print:bg-transparent p-5 lg:p-8 rounded-t-xl">
                            <div className="flex flex-col md:flex-row print:flex-row justify-between items-start md:items-center gap-2 md:gap-6 border-b border-gray-50 pb-2 md:pb-4">
                                <div>
                                    <h1 className="uppercase text-2xl font-bold">Invoice</h1>
                                    {order?.status === "Pending" && <p className="leading-9 text-gray-800">Status: <span className="text-orange-500 uppercase text-sm font-semibold">{order?.status}</span></p>}
                                    {order?.status === "Processing" && <p className="leading-9 text-gray-800">Status: <span className="text-indigo-500 uppercase text-sm font-semibold">{order?.status}</span></p>}
                                    {order?.status === "on-the-way" && <p className="leading-9 text-gray-800">Status: <span className="text-purple-500 uppercase text-sm font-semibold">{order?.status}</span></p>}
                                    {order?.status === "Delivered" && <p className="leading-9 text-gray-800">Status: <span className="text-emerald-500 uppercase text-sm font-semibold">{order?.status}</span></p>}
                                    {order?.status === "Cancel" && <p className="leading-9 text-gray-800">Status: <span className="text-red-500 uppercase text-sm font-semibold">{order?.status}</span></p>}
                                </div>
                                <div>
                                    <Image
                                        src={logo}
                                        alt="Brand Logo"
                                        width={80}
                                        height={80}
                                        // className="w-14 md:w-20 h-6 md:h-20"
                                        loading="eager"
                                    />
                                    <p className="leading-9 text-sm text-gray-700">{order?.sbAddress.city}, {order?.sbAddress.region}, Bangladesh.</p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:gap-6 pt-2 md:pt-4">
                                <div className="text-sm text-gray-500">
                                    <h4 className="uppercase text-gray-600 text-sm font-bold leading-7">Date</h4>
                                    <p>{new Date(order?.createdAt).toLocaleString("en-BD", {
                                        month: "long",
                                        day: "2-digit",
                                        year: "numeric"
                                    })}</p>
                                </div>
                                <div className="text-sm text-gray-500">
                                    <h4 className="uppercase text-gray-600 text-sm font-bold leading-7">Invoice No</h4>
                                    <p>{order?.invoice}</p>
                                </div>
                                <div className="text-start md:text-end text-sm text-gray-500">
                                    <h4 className="uppercase text-gray-600 text-sm font-bold leading-7">Invoice To</h4>
                                    <p>{order?.sbAddress.fullName}</p>
                                    <p>{order?.customerInfo.customer_email}, {order?.sbAddress.phoneNumber}</p>
                                    <p>{order?.sbAddress.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white px-5 lg:px-8 py-10">
                            <div className="-my-2 overflow-x-auto">
                                <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr className="text-xs bg-gray-100">
                                            <th scope="col" className="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left">Sr.</th>
                                            <th scope="col" className="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left">Product Name</th>
                                            <th scope="col" className="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center">Quantity</th>
                                            <th scope="col" className="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center">Item Price</th>
                                            <th scope="col" className="font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100 text-sm">
                                        {order?.cart.map((item, id) => <tr key={id}>
                                            <th className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 text-left">{id + 1}</th>
                                            <td className="px-6 py-1 whitespace-nowrap font-normal text-gray-500">{item.title}</td>
                                            <td className="px-6 py-1 whitespace-nowrap font-bold text-center">{item.quantity}</td>
                                            <td className="px-6 py-1 whitespace-nowrap font-bold text-center font-DejaVu">${item.price.toFixed(2)}</td>
                                            <td className="px-6 py-1 whitespace-nowrap text-right font-bold font-DejaVu k-grid text-red-500">${(item.price * item.quantity).toFixed(2)}</td>
                                        </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="border-t border-b border-gray-100 p-5 lg:p-10 bg-emerald-50 print:bg-transparent print:border-0">
                            <div className="flex lg:flex-row md:flex-row flex-col justify-between print:grid print:grid-cols-2 pt-4">
                                <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col sm:flex-wrap">
                                    <span className="mb-1 font-bold text-sm uppercase text-gray-600 block">Payment Method</span>
                                    <span className="text-sm text-gray-500 font-semibold block">{order?.paymentMethod}</span>
                                </div>
                                <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col sm:flex-wrap">
                                    <span className="mb-1 font-bold text-sm uppercase text-gray-600 block">Shipping Cost</span>
                                    <span className="text-sm text-gray-500 font-semibold block">${order?.shippingCost.toFixed(2)}</span>
                                </div>
                                <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col sm:flex-wrap">
                                    <span className="mb-1 font-bold text-sm uppercase text-gray-600 block">Discount</span>
                                    <span className="text-sm text-gray-500 font-semibold block">${order?.discount.toFixed(2)}</span>
                                </div>
                                <div className="flex flex-col sm:flex-wrap">
                                    <span className="mb-1 font-bold text-sm uppercase text-gray-600 block">Total Amount</span>
                                    <span className="text-2xl font-bold text-red-500 block">${order?.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <PrintAndDownloadBtn />
                </div>
            </section>
        </div>
    );
};

export default OrderInvoice;