"use client";
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
const localUrl = "https://grocerpoint.vercel.app";


const SearchSwiper = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${localUrl}/api/categories`)
            .then(res => res.json())
            .then(data => setCategories(data))
    }, []);

    return (
        <div className="my-8">
            {!categories.length ?
                <>
                </>
                :
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 10,
                        },
                        1280: {
                            slidesPerView: 8,
                            spaceBetween: 10,
                        }
                    }}
                    autoplay={{
                        delay: 3000,
                    }}
                    loop={true}
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                >
                    {
                        categories?.map(category => <SwiperSlide
                            key={category._id}
                            className="cursor-pointer p-4 bg-white rounded-lg font-poppins text-[#151515]"
                        >
                            <Link
                                href={`/search?parent=${encodeURIComponent(category.parent)}&id=${category._id}`}
                                className="text-center hover:underline hover:text-[#00a63e] duration-300"
                            >
                                <Image
                                    src={category.icon}
                                    alt={category.parent}
                                    width={24}
                                    height={24}
                                    loading='eager'
                                    className="mx-auto"
                                />
                                <p className="text-xs font-normal leading-8">{category.parent}</p>
                            </Link>
                        </SwiperSlide>)
                    }
                </Swiper>
            }
        </div>
    );
};

export default SearchSwiper;