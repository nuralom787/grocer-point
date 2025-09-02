"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const url = "https://grocerpoint.vercel.app";
// const url = "http://localhost:3000";

const CartItemDelAndFabBtn = ({ product }) => {
    const router = useRouter();
    const [fab, setFab] = useState(false);
    const [loading, setLoading] = useState(false);

    // handle Fab.
    const handleFab = () => {
        setFab(!fab);
    };

    // Handle Product Delete.
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Item(s) will be removed from cart",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);

                try {
                    // Fetch Delete Api.
                    const itemDelRes = await fetch(`${url}/api/cart/${id}`, {
                        method: "DELETE",
                    })
                    const resData = await itemDelRes.json();

                    if (resData.acknowledged && resData.modifiedCount > 0) {
                        // toast.success("", {
                        //     position: "top-center",
                        //     autoClose: 2500
                        // });
                        Swal.fire({
                            title: "Deleted!",
                            text: "Product Remove From Cart",
                            icon: "success"
                        });
                        setLoading(false);
                        router.refresh();
                    } else {
                        toast.error("Somethings Want Wrong!!")
                        setLoading(false)
                    }
                }
                catch (err) {
                    toast.error(err.message, {
                        position: "top-center",
                        autoClose: 2500
                    });
                    setLoading(false);
                }
            }
        });
    };


    return (
        <div className="inline-flex justify-end items-center gap-4 text-2xl">
            {loading &&
                <div className="fixed inset-0 z-50 bg-black opacity-40 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            }
            {fab ?
                <button onClick={handleFab} className="outline-0 cursor-pointer text-red-500"><FaHeart /></button>
                :
                <button onClick={handleFab} className="outline-0 cursor-pointer text-gray-500 hover:text-red-500 duration-300"><FaRegHeart /></button>
            }
            <button onClick={() => handleDelete(product._id)} className="outline-0 cursor-pointer text-gray-500 hover:text-red-500 duration-300">
                <RiDeleteBin5Line />
            </button>
        </div>
    );
};

export default CartItemDelAndFabBtn;