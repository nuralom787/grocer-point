import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
const url = process.env.NEXTAUTH_URL;

const Categories = async () => {
    const res = await fetch(`${url}/api/categories`);
    const categories = await res.json();


    return (
        <div className="">
            <div className="text-center font-poppins">
                <h1 className="text-xl text-[#151515] font-semibold">Featured Categories</h1>
                <p className="text-sm text-gray-500 font-medium leading-6 lg:leading-10">Choose your necessary products from this feature categories.</p>
            </div>
            <div className="py-8 lg:py-14">
                <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0.5">
                    {
                        categories?.map(category => <Link
                            key={category?._id}
                            href={`/search?parent=${encodeURIComponent(category?.parent)}&id=${category?._id}`}
                            className="bg-white p-4 group"
                        >
                            <li className="flex items-center gap-3">
                                <Image src={category?.icon} alt={category?.parent} width={36} height={36} loading="lazy" />
                                <div className="font-poppins">
                                    <h3 className="text-sm text-[#151515] group-hover:text-[#8B4513]">{category?.parent}</h3>
                                    <ul className="">
                                        {
                                            category?.children?.slice(0, 3).map(item => <li key={item} className="text-gray-500 text-xs hover:text-[#8B4513] hover:ms-2 duration-300">
                                                <Link href={`/search?parent=${encodeURIComponent(category.parent)}&children=${encodeURIComponent(item)}`} className="flex items-center gap-0.5 py-0.5">
                                                    <IoIosArrowForward /> {item}
                                                </Link>
                                            </li>)
                                        }
                                    </ul>
                                </div>
                            </li>
                        </Link>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default Categories;