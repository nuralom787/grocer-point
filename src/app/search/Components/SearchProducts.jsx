"use client";

import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import noFound from '../../../../public/notFound.svg';
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
const url = process.env.NEXT_PUBLIC_BASE_URL;

const SearchProducts = () => {
    const [matchProduct, setMatchProduct] = useState([]);
    const [visibleCount, setVisibleCount] = useState(18);
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState(null);

    const searchParams = useSearchParams();
    const _id = searchParams.get("id");
    const search = searchParams.get("search");
    const parent = searchParams.get("parent");
    const children = searchParams.get("children");


    useEffect(() => {
        fetch(`${url}/api/products?search=${search}&parent=${parent}&children=${children}&price=${price}&id=${_id}`, { cache: "force-cache" })
            .then(res => res.json())
            .then(data => {
                setMatchProduct(data.products);
                // console.log(data);
                setVisibleCount(18)
                setLoading(false);
            })
    }, [search, parent, children, price]);


    // Sort Products.
    const sortData = (value) => {
        setPrice(value);
    };

    // Load More Function.
    const loadMore = () => {
        setVisibleCount((prev) => prev + 10);
    };


    return (
        <div className="my-10">
            <div className="bg-orange-100 py-3 px-5 rounded-md font-poppins flex justify-between items-center gap-2 text-[#151515] text-sm">
                <h2>Total <span>{matchProduct.length || 0}</span> Item Found</h2>
                <select onChange={(e) => sortData(e.target.value)} className="outline-0">
                    <option value="" hidden>Sort By Price</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>
            </div>
            <div className="mt-4">
                {loading ?
                    <div className="flex justify-center items-center my-32">
                        <ScaleLoader
                            color={"#63e075"}
                            loading={true}
                            size={500}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                    :
                    <div>
                        {!matchProduct.length ?
                            <div className="text-center font-poppins my-14">
                                <Image
                                    src={noFound}
                                    alt="Product Not Fount"
                                    width={320}
                                    height={320}
                                    loading='lazy'
                                    className="mx-auto"
                                />
                                <h1 className="text-[#151515] text-xl font-medium">Sorry, we can not find any product 😞</h1>
                            </div>
                            :
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                                {
                                    matchProduct?.slice(0, visibleCount).map(product => <div
                                        className="bg-white rounded-md relative"
                                        key={product._id}
                                    >
                                        <Link className="group" href={`/product/${product._id}`}>
                                            <p className="absolute top-2 left-2 bg-gray-200 px-3 py-1 rounded-full text-[#63e075] text-xs z-10">
                                                Stock: <span className="text-red-700">{product.quantity}</span>
                                            </p>
                                            {product.discount > 0 && <p className="absolute top-2 right-2 bg-orange-500 px-3 py-1 rounded-full text-white text-xs z-10">
                                                {product.discount.toFixed(2)}% Off
                                            </p>}
                                            <div className="bg-white rounded-md p-2 flex">
                                                <Image
                                                    src={product.image}
                                                    alt={product.title}
                                                    width={160}
                                                    height={176}
                                                    loading='lazy'
                                                    className="mx-auto grow scale-90 group-hover:scale-100 duration-300"
                                                />
                                            </div>
                                            <div className="font-poppins text-[#151515] px-4 pb-4">
                                                <h3 className="font-light text-sm group-hover:underline">{product.title}</h3>
                                                <h1 className="font-semibold text-xl leading-10">
                                                    ${product.price.toFixed(2)} <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                                                </h1>
                                            </div>
                                        </Link>
                                    </div>)
                                }
                            </div>
                        }
                        {visibleCount < matchProduct?.length &&
                            <div className="text-center font-poppins my-10 text-white">
                                <button
                                    className="px-6 py-3 rounded-md bg-green-700 hover:bg-green-900 duration-300 font-semibold text-lg cursor-pointer"
                                    onClick={() => loadMore()}>
                                    Load More
                                </button>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default SearchProducts;