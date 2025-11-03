import Image from "next/image";
import Link from "next/link";
const url = process.env.NEXT_PUBLIC_BASE_URL;

const DiscountProducts = async () => {
    const res = await fetch(`${url}/api/discountProducts`);
    const products = await res.json();


    return (
        <div>
            <div className="font-poppins text-center">
                <h2 className="text-2xl text-[#151515] font-semibold leading-10">Latest Discounted Products</h2>
                <p className="text-base text-gray-500 font-medium">
                    See Our latest discounted products below. Choose your daily needs from here <br /> and get a special discount with free shipping.
                </p>
            </div>
            <div className="py-4 lg:py-14">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                    {
                        products?.slice(0, 18).map(product => <div className="bg-white rounded-md relative" key={product?._id}>
                            <Link className="group" href={`/product/${product?._id.toString()}`}>
                                <p className="absolute top-2 left-2 bg-gray-200 px-3 py-1 rounded-full text-green-700 text-xs font-bold z-10">
                                    Stock: <span className="text-red-500">{product?.quantity}</span>
                                </p>
                                {product?.discount > 0 && <p className="absolute top-2 right-2 bg-orange-500 px-3 py-1 rounded-full text-white text-xs z-10">
                                    {product?.discount?.toFixed(2)}% Off
                                </p>}
                                <div className="bg-white rounded-md p-2 flex">
                                    <Image
                                        className="mx-auto grow scale-90 group-hover:scale-100 duration-300"
                                        src={product.image}
                                        alt={product?.title}
                                        width={100}
                                        height={100}
                                        loading="eager"
                                    />
                                </div>
                                <div className="font-poppins text-[#151515] px-4 pb-4">
                                    <h3 className="font-light text-sm group-hover:underline">{product?.title}</h3>
                                    <h1 className="font-semibold text-xl leading-10">
                                        ${product?.price?.toFixed(2)} <span className="text-sm text-gray-500 line-through">${product?.originalPrice?.toFixed(2)}</span>
                                    </h1>
                                </div>
                            </Link>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default DiscountProducts;