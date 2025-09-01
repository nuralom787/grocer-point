import Image from "next/image";
import Link from "next/link";
import { FiTruck } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { PiCurrencyDollarDuotone } from "react-icons/pi";
import { IoRepeat } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import ProductQuantityBtn from "../components/ProductQuantityBtn";

const url = process.env.NEXTAUTH_URL;
// const url = "http://localhost:3000";

const SingleProduct = async ({ params }) => {
    const id = await params.id;
    const productRes = await fetch(`${url}/api/product/${id}`);
    const product = await productRes.json();
    const relatedProductRes = await fetch(`${url}/api/products?parent=${product.parent}`);
    const relatedProductJson = await relatedProductRes.json();
    const relatedProduct = relatedProductJson?.products?.filter(p => p._id !== product._id);


    return (
        <section className="py-10">
            <div>
                <div className="bg-white rounded-xl p-4 lg:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 font-poppins text-[#151515]">
                        <div>
                            <Image
                                src={product?.image}
                                alt={product?.title}
                                width={500}
                                height={500}
                                loading="eager"
                                className="mx-auto"
                            />
                        </div>
                        <div className="space-y-6">
                            <h1 className="font-bold text-3xl">{product?.title}</h1>
                            <p className="text-base text-gray-500 font-medium">SKU : {product?.sku}</p>
                            {product?.quantity > 0 ?
                                <p className="font-semibold text-sm bg-green-100 text-green-600 px-4 py-1 rounded-full w-fit">
                                    Stock : <span className="text-red-600">{product?.quantity}</span>
                                </p>
                                :
                                <p className="font-semibold text-sm bg-red-100 text-red-600 px-4 py-1 rounded-full w-fit">Stock Out</p>
                            }
                            <h1 className="font-bold text-3xl">${product?.price.toFixed(2)}</h1>
                            <p className="font-normal text-base text-gray-500">{product?.description}</p>
                            <div className='grid grid-cols-2 gap-2'>
                                <ProductQuantityBtn id={id} product={product} />
                            </div>
                            <div className="space-y-3">
                                <p className="font-medium text-sm">
                                    Category: <Link href={`/search?parent=${product?.parent}&id=${product?._id.toString()}`} className="text-[#151515] hover:text-green-700 underline cursor-pointer"> {product?.parent}</Link>
                                </p>
                                <ul className="flex items-center gap-3">
                                    {
                                        product?.tag.map(tg => <li key={tg}>
                                            <p className="bg-green-200 text-green-600 px-3 py-1 rounded-full text-xs">{tg}</p>
                                        </li>)
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg px-6 py-10">
                            <ul>
                                <li className="flex items-center gap-4 font-poppins py-4">
                                    <FiTruck className="text-gray-400 text-2xl" />
                                    <p className="text-sm font-light text-gray-600 text-start">Free shipping applies to all orders over shipping €100</p>
                                </li>
                                <li className="flex items-center gap-4 font-poppins py-4">
                                    <IoHomeOutline className="text-gray-400 text-2xl" />
                                    <p className="text-sm font-light text-gray-600 text-start">Home Delivery within 1 Hour</p>
                                </li>
                                <li className="flex items-center gap-4 font-poppins py-4">
                                    <PiCurrencyDollarDuotone className="text-gray-400 text-2xl" />
                                    <p className="text-sm font-light text-gray-600 text-start">Cash on Delivery Available</p>
                                </li>
                                <li className="flex items-center gap-4 font-poppins py-4">
                                    <IoRepeat className="text-gray-400 text-2xl" />
                                    <p className="text-sm font-light text-gray-600 text-start">7 Days returns money back guarantee</p>
                                </li>
                                <li className="flex items-center gap-4 font-poppins py-4">
                                    <MdOutlineWbSunny className="text-gray-400 text-2xl" />
                                    <p className="text-sm font-light text-gray-600 text-start">Guaranteed 100% organic from natural products.</p>
                                </li>
                                <li className="flex items-center gap-4 font-poppins py-4">
                                    <CiLocationOn className="text-gray-400 text-2xl" />
                                    <p className="text-sm font-light text-gray-600 text-start">Delivery from our pick point.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-14">
                    <h1 className="text-lg font-poppins text-[#151515] my-4 font-semibold">Related Products</h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                        {
                            relatedProduct?.slice(0, 18).map(product => <div className="bg-white rounded-md relative" key={product?._id}>
                                <Link className="group" href={`/product/${product?._id}`}>
                                    <p className="absolute top-2 left-2 bg-gray-200 px-3 py-1 rounded-full text-[#63e075] text-xs z-10">
                                        Stock: <span className="text-red-700">{product?.quantity}</span>
                                    </p>
                                    {product?.discount > 0 && <p className="absolute top-2 right-2 bg-orange-500 px-3 py-1 rounded-full text-white text-xs z-10">
                                        {product?.discount.toFixed(2)}% Off
                                    </p>}
                                    <div className="bg-white rounded-md p-2 flex">
                                        <Image
                                            src={product?.image}
                                            alt={product?.title}
                                            width={160}
                                            height={176}
                                            loading="eager"
                                            className="mx-auto grow scale-90 group-hover:scale-100 duration-300"
                                        />
                                    </div>
                                    <div className="font-poppins text-[#151515] px-4 pb-4">
                                        <h3 className="font-light text-sm group-hover:underline">{product?.title}</h3>
                                        <h1 className="font-semibold text-xl leading-10">
                                            ${product?.price.toFixed(2)} {product?.discount > 0 && <span className="text-sm text-gray-500 line-through">${product?.originalPrice.toFixed(2)}</span>}
                                        </h1>
                                    </div>
                                </Link>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SingleProduct;