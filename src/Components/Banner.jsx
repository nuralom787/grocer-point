"use client";
import Countdown from "react-countdown";
import { Carousel } from "react-responsive-carousel";
import { ScaleLoader } from "react-spinners";
import slider1 from '../../public/Slider/slider-1.png'
import slider2 from '../../public/Slider/slider-2.png'
import slider3 from '../../public/Slider/slider-3.png'
import Image from "next/image";
import { useEffect, useState } from "react";
const url = process.env.NEXT_PUBLIC_BASE_URL;

const Banner = () => {
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        fetch(`${url}/api/coupons`, {
            cache: "force-cache"
        })
            .then(res => res.json())
            .then(data => setCoupons(data))
    }, []);


    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return (
                <p className='space-x-1.5'>
                    <span className='text-red-600 text-xs font-extrabold font-poppins bg-[#ffc7c7] py-0.5 px-2.5 rounded-xs'>0{days}</span>
                    <span>:</span>
                    <span className='text-red-600 text-xs font-extrabold font-poppins bg-[#ffc7c7] py-0.5 px-2.5 rounded-xs'>0{hours}</span>
                    <span>:</span>
                    <span className='text-red-600 text-xs font-extrabold font-poppins bg-[#ffc7c7] py-0.5 px-2.5 rounded-xs'>0{minutes}</span>
                    <span>:</span>
                    <span className='text-red-600 text-xs font-extrabold font-poppins bg-[#ffc7c7] py-0.5 px-2.5 rounded-xs'>0{seconds}</span>
                </p>
            );
        }
        else {
            return (
                <p className='space-x-1.5'>
                    <span className='text-green-900 text-xs font-extrabold font-poppins bg-[#c7f3c7] py-0.5 px-2.5 rounded-xs'>{days}</span>
                    <span>:</span>
                    <span className='text-green-900 text-xs font-extrabold font-poppins bg-[#c7f3c7] py-0.5 px-2.5 rounded-xs'>{hours}</span>
                    <span>:</span>
                    <span className='text-green-900 text-xs font-extrabold font-poppins bg-[#c7f3c7] py-0.5 px-2.5 rounded-xs'>{minutes}</span>
                    <span>:</span>
                    <span className='text-green-900 text-xs font-extrabold font-poppins bg-[#c7f3c7] py-0.5 px-2.5 rounded-xs'>{seconds}</span>
                </p>
            );
        }
    };

    return (
        <div className="mt-0.5 lg:mt-6">
            <div className="flex flex-col xl:flex-row justify-between items-start gap-6 text-[#151515] py-2">
                <div className='w-fit xl:w-3/5'>
                    <Carousel
                        autoPlay={true}
                        showArrows={false}
                        transitionTime={1000}
                        interval={2500}
                        infiniteLoop={true}
                        showStatus={false}
                        emulateTouch={true}
                        showThumbs={false}
                    >
                        <div className='relative'>
                            <div className="font-poppins w-5/6 md:w-3/6 absolute top-1/4 left-5 lg:left-14 text-start space-y-1 md:space-y-2 lg:space-y-4">
                                <h1 className='font-extrabold text-base lg:text-3xl text-[#151515] line-clamp-1 lg:line-clamp-none'>The Best Quality Products Guaranteed!</h1>
                                <p className='text-gray-700 text-xs md:text-sm line-clamp-1 md:line-clamp-2 lg:line-clamp-3'>Intrinsicly fashion performance based products rather than accurate benefits...</p>
                                <button className='font-semibold text-sm text-white px-3.5 lg:px-6 py-1.5 lg:py-3 rounded-full lg:rounded-md bg-green-900 cursor-pointer mt-3 lg:mt-0'>Shop Now</button>
                            </div>
                            <Image
                                src={slider1}
                                alt="Grocer Point Banner 1 Logo"
                                loading="eager"
                                width={950}
                                height={400}
                            />
                        </div>
                        <div className='relative'>
                            <div className="font-poppins w-5/6 md:w-3/6 absolute top-1/4 left-5 lg:left-14 text-start space-y-1 md:space-y-2 lg:space-y-4">
                                <h1 className='font-extrabold text-base lg:text-3xl text-[#151515] line-clamp-1 lg:line-clamp-none'>Best Different Type of Grocery Store</h1>
                                <p className='text-gray-700 text-xs md:text-sm line-clamp-1 md:line-clamp-2 lg:line-clamp-3'>Intrinsicly fashion performance based products rather than accurate benefits...</p>
                                <button className='font-semibold text-sm text-white px-3.5 lg:px-6 py-1.5 lg:py-3 rounded-full lg:rounded-md bg-green-900 cursor-pointer mt-3 lg:mt-0'>Shop Now</button>
                            </div>
                            <Image
                                src={slider2}
                                alt="Grocer Point Banner 2 Logo"
                                loading="eager"
                                width={950}
                                height={400}
                            />
                        </div>
                        <div className='relative'>
                            <div className="font-poppins w-5/6 md:w-3/6 absolute top-1/4 left-5 lg:left-14 text-start space-y-1 md:space-y-2 lg:space-y-4">
                                <h1 className='font-extrabold text-base lg:text-3xl text-[#151515] line-clamp-1 lg:line-clamp-none'>Best Different Type of Grocery Store</h1>
                                <p className='text-gray-700 text-xs md:text-sm line-clamp-1 md:line-clamp-2 lg:line-clamp-3'>Intrinsicly fashion performance based products rather than accurate benefits...</p>
                                <button className='font-semibold text-sm text-white px-3.5 lg:px-6 py-1.5 lg:py-3 rounded-full lg:rounded-md bg-green-900 cursor-pointer mt-3 lg:mt-0'>Shop Now</button>
                            </div>
                            <Image
                                src={slider3}
                                alt="Grocer Point Banner 3 Logo"
                                loading="eager"
                                width={950}
                                height={400}
                            />
                        </div>
                    </Carousel>
                </div>
                <div className='hidden lg:block w-full xl:w-2/5 border-2 border-[#8B4513] hover:border-green-600 rounded-lg'>
                    <h1 className='font-poppins font-semibold text-xl bg-orange-200 p-4 text-center rounded-ss-lg rounded-se-lg'>
                        Latest Offer Discount Codes.
                    </h1>
                    <div>
                        {!coupons.length ?
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
                            <div className='grid grid-cols-2 xl:grid-cols-1'>
                                {coupons?.slice(0, 2).map(coupon => <div
                                    key={coupon._id}
                                    className='flex justify-between items-center my-3.5 mx-2 bg-white rounded-lg'
                                >
                                    <div className='relative border-r-2 border-dashed border-gray-600 w-full flex items-center gap-4 p-3.5 font-poppins'>
                                        <Image
                                            src={coupon.logo}
                                            alt="Coupon Logo"
                                            width={100}
                                            height={100}
                                            loading="eager"
                                            className='w-16 xl:w-24'
                                        />
                                        <div className='space-y-2'>
                                            <div className='inline-flex items-center'>
                                                <p><span className='text-red-700 text-xl font-bold'>{coupon.discountPercentage}%</span> Off</p>
                                                {Date.now() >= new Date(coupon.endTime) ?
                                                    <p className='text-red-600 text-xs bg-[#fee2e2] py-1.5 px-3.5 ml-3.5 rounded-full'> Inactive</p>
                                                    :
                                                    <p className='text-green-600 text-xs bg-[#d1fae5] py-1.5 px-3.5 ml-3.5 rounded-full'> Active</p>
                                                }
                                            </div>
                                            <p className='text-base xl:text-xl font-semibold'>{coupon.title}</p>
                                            <div className=''>
                                                {Date.now() >= new Date(coupon.endTime) ?
                                                    <Countdown renderer={renderer} date={Date.now() + (new Date(coupon.endTime) - Date.now())} />
                                                    :
                                                    <Countdown renderer={renderer} date={Date.now() + (new Date(coupon.endTime) - Date.now())} />
                                                }
                                            </div>
                                        </div>
                                        <div className='bg-gray-100 w-7 h-7 rounded-b-full absolute -top-2 -right-3.5 z-10'></div>
                                        <div className='bg-gray-100 w-7 h-7 rounded-t-full absolute -bottom-2 -right-3.5 z-10'></div>
                                    </div>
                                    <div className='text-center space-y-2'>
                                        <button
                                            className='bg-[#d1fae5] text-[#059669] font-poppins font-medium text-xs xl:text-sm border border-dashed border-green-700 py-1.5 px-4 rounded-lg'>
                                            {coupon.couponCode}
                                        </button>
                                        <p className='text-xs'>* This coupon apply when shopping more then ${coupon.minimumAmount}</p>
                                    </div>
                                </div>)
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='bg-[#ffedd5] my-3 md:my-6 px-4 py-6 md:p-8 rounded-lg font-poppins flex flex-col md:flex-row justify-between items-center gap-4'>
                <div className='w-4/6 text-center md:text-start'>
                    <h1 className='text-lg md:text-xl font-bold text-green-600'>100% Natural Quality Organic Product</h1>
                    <p className='font-medium text-sm text-gray-500'>See Our latest discounted products from here and get a special discount product</p>
                </div>
                <button className='font-semibold text-sm text-white bg-green-900 px-5 py-2 rounded-full cursor-pointer'>
                    Shop Now
                </button>
            </div>
        </div>
    );
};

export default Banner;