import React from 'react';
import NavigationPanel from '../components/NavigationPanel';
import { getServerSession } from 'next-auth';
import { LuShoppingCart } from 'react-icons/lu';
import { RxLoop } from "react-icons/rx";
import { FiTruck } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';
import Link from 'next/link';
const url = process.env.NEXTAUTH_URL;


const UserOrders = async () => {
    const session = await getServerSession();
    const orderRes = await fetch(`${url}/api/orders?email=${session?.user?.email}`, { cache: "force-cache" });
    const orders = await orderRes.json();

    const pendingOrders = orders?.filter(order => order.status === "Pending");
    const processingOrders = orders?.filter(order => order.status === "Processing");
    const deliveredOrders = orders?.filter(order => order.status === "Delivered");

    return (
        <div className="py-10">
            <section className="max-w-screen-2xl mx-auto px-3 lg:px-6 font-poppins">
                <section className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6 text-[#151515]">
                    {/* Navigation Panel */}
                    <NavigationPanel />

                    {/* Account Info */}
                    <div className="w-full lg:w-3/4 rounded">
                        <section className="bg-white text-[#151515]">
                            <section className="mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded font-inter">
                                <div>
                                    <h1 className="uppercase font-semibold text-xl mb-5">My Orders</h1>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                        <div className="border border-gray-200 p-4 rounded-md flex items-center gap-4">
                                            <p className="bg-red-200 text-red-600 p-4 rounded-full">
                                                <LuShoppingCart className="text-lg" />
                                            </p>
                                            <div>
                                                <h4 className="mb-2 text-sm font-medium leading-none text-gray-700">Total Orders.</h4>
                                                <h1 className="text-xl font-bold leading-none text-gray-800">{orders?.length || 0}</h1>
                                            </div>
                                        </div>
                                        <div className="border border-gray-200 p-4 rounded-md flex items-center gap-4">
                                            <p className="bg-orange-200 text-orange-600 p-4 rounded-full">
                                                <RxLoop className="text-lg" />
                                            </p>
                                            <div>
                                                <h4 className="mb-2 text-sm font-medium leading-none text-gray-700">Pending Orders.</h4>
                                                <h1 className="text-xl font-bold leading-none text-gray-800">{pendingOrders?.length || 0}</h1>
                                            </div>
                                        </div>
                                        <div className="border border-gray-200 p-4 rounded-md flex items-center gap-4">
                                            <p className="bg-indigo-200 text-indigo-600 p-4 rounded-full">
                                                <FiTruck className="text-lg" />
                                            </p>
                                            <div>
                                                <h4 className="mb-2 text-sm font-medium leading-none text-gray-700">Processing Orders.</h4>
                                                <h1 className="text-xl font-bold leading-none text-gray-800">{processingOrders?.length || 0}</h1>
                                            </div>
                                        </div>
                                        <div className="border border-gray-200 p-4 rounded-md flex items-center gap-4">
                                            <p className="bg-emerald-200 text-emerald-600 p-4 rounded-full">
                                                <FaCheck className="text-lg" />
                                            </p>
                                            <div>
                                                <h4 className="mb-2 text-sm font-medium leading-none text-gray-700">Delivered Orders.</h4>
                                                <h1 className="text-xl font-bold leading-none text-gray-800">{deliveredOrders?.length || 0}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <h1 className="font-semibold text-base mb-5">Recent Orders.</h1>
                                    <div className="my-3 overflow-x-auto">
                                        <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr className="bg-gray-100">
                                                    <th className="text-start text-xs font-semibold px-6 py-3 text-gray-700 uppercase tracking-wider">ID</th>
                                                    <th className="text-center text-xs font-semibold px-6 py-3 text-gray-700 uppercase tracking-wider">Order Time</th>
                                                    <th className="text-center text-xs font-semibold px-6 py-3 text-gray-700 uppercase tracking-wider">Method</th>
                                                    <th className="text-center text-xs font-semibold px-6 py-3 text-gray-700 uppercase tracking-wider">Status</th>
                                                    <th className="text-center text-xs font-semibold px-6 py-3 text-gray-700 uppercase tracking-wider">Total</th>
                                                    <th className="text-end text-xs font-semibold px-6 py-3 text-gray-700 uppercase tracking-wider">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                                {orders?.reverse()?.map((order, id) => <tr key={id}>
                                                    <th className="px-5 py-3.5 whitespace-nowrap font-normal text-start">{order.orderId.split("-")[1]}</th>
                                                    <td className="px-5 py-3.5 whitespace-nowrap font-normal text-center">{new Date(order.createdAt).toLocaleString("en-BD", {
                                                        month: "long",
                                                        day: "2-digit",
                                                        year: "numeric"
                                                    })}</td>
                                                    <td className="px-5 py-3.5 whitespace-nowrap text-center">{order.paymentMethod}</td>
                                                    <td className="px-5 py-3.5 whitespace-nowrap text-center">
                                                        {order.status === "Pending" && <span className="text-orange-600 font-semibold">Pending</span>}
                                                        {order.status === "Processing" && <span className="text-indigo-600 font-semibold">Processing</span>}
                                                        {order.status === "Delivered" && <span className="text-emerald-600 font-semibold">Delivered</span>}
                                                        {order.status === "Cancel" && <span className="text-red-600 font-semibold">Cancel</span>}
                                                    </td>
                                                    <td className="px-5 py-3.5 whitespace-nowrap font-bold text-center">${order.total.toFixed(2)}</td>
                                                    <td className="px-5 py-3.5 whitespace-nowrap text-end">
                                                        <Link
                                                            className="font-semibold text-xs bg-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white duration-500 px-3.5 py-1.5 rounded-full"
                                                            href={`/order/invoice/${order._id}`}>Details</Link>
                                                    </td>
                                                </tr>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>
                        </section>
                    </div>
                </section>
            </section>
        </div>
    );
};

export default UserOrders;