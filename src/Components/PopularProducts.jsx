import Image from "next/image";
import Link from "next/link";
import delivery from '../../public/delivery.svg';
const url = process.env.NEXTAUTH_URL;

const PopularProducts = async () => {
    const res = await fetch(`${url}/api/popularProducts`);
    const popularProducts = await res.json();


    return (
        <div className="">
            <div className=" text-center">
                <h2 className="text-2xl text-[#151515] font-semibold leading-10">Popular Products for Daily Shopping</h2>
                <p className="text-base text-gray-500 font-medium">
                    See all our popular products in this week. You can choose your daily needs <br /> products from this list and get some special offer with free shipping
                </p>
            </div>
            <div className="py-14">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                    {
                        popularProducts?.slice(0, 18)?.map(product => <div
                            className="bg-white rounded-md relative"
                            key={product?._id}
                        >
                            <Link className="group" href={`/product/${product?._id}`}>
                                <p className="absolute top-2 left-2 bg-gray-200 px-3 py-1 rounded-full text-green-900 text-xs z-10">
                                    Stock: <span className="text-red-700">{product?.quantity}</span>
                                </p>
                                {product?.discount > 0 && <p className="absolute top-2 right-2 bg-orange-500 px-3 py-1 rounded-full text-white text-xs z-10">
                                    {product?.discount?.toFixed(2)}% Off
                                </p>}
                                <div className="bg-white rounded-md p-2 flex">
                                    <Image
                                        className="mx-auto grow scale-90 group-hover:scale-100 duration-300"
                                        src={product?.image}
                                        alt={product?.title}
                                        width={100}
                                        height={100}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="text-[#151515] px-4 pb-4">
                                    <h3 className="font-light text-sm group-hover:underline">{product?.title}</h3>
                                    <h1 className="font-semibold text-xl leading-10">
                                        ${product?.price?.toFixed(2)} {product?.discount > 0 && <span className="text-sm text-gray-500 line-through">${product?.originalPrice?.toFixed(2)}</span>}
                                    </h1>
                                </div>
                            </Link>
                        </div>)
                    }
                </div>
            </div>
            <div className="bg-green-900 p-7 lg:p-14 rounded-lg">
                <div className="bg-white p-5 lg:p-14 rounded-lg flex justify-between items-center gap-14">
                    <div className="w-full md:w-2/4 text-[#151515] space-y-2">
                        <h3 className="text-base lg:text-lg">Organic Products and Food</h3>
                        <h1 className="text-xl lg:text-2xl font-bold">Quick Delivery to Your Home</h1>
                        <p className="text-sm">
                            There are many products you will find in our shop, Choose your daily necessary product from our G-shop
                            and get some special offers. See Our latest discounted products from here and get a special discount.
                        </p>
                        <button className="bg-green-900 text-white font-semibold text-xs px-6 py-2 mt-3 lg:mt-6 rounded-full cursor-pointer">Download App</button>
                    </div>
                    <Image className="w-2/4 hidden md:block" src={delivery} alt="Delivery Logo" loading="lazy" />
                </div>
            </div>
        </div>
    );
};

export default PopularProducts;