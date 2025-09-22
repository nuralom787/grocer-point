import Image from "next/image";
import logo1 from '../../public/logo1.svg';
import logo5 from '../../public/logo5.svg';
import appStore from '../../public/app-store.svg';
import playStore from '../../public/play-store.svg';
import Link from "next/link";


const Advertisement = () => {
    return (
        <div className='advertisement container-width px-3 lg:px-6'>
            <div className="max-w-screen-2xl mx-auto px-4 xl:px-6 py-10 xl:py-24">
                <div className="flex justify-center lg:justify-between items-center gap-10">
                    <Image className='hidden lg:block' src={logo1} alt="Advertisement Logo" width={400} height={200} loading="eager" />
                    <div className='w-full md:w-4/6 font-poppins text-[#151515] text-center space-y-6'>
                        <h1 className='text-lg lg:text-xl xl:text-3xl font-bold'>Get Your Daily Needs From Our KachaBazar Store</h1>
                        <p>There are many products you will find in our shop, Choose your daily necessary product from our G-shop and get some special offers.</p>
                        <div className='flex justify-center items-center gap-5'>
                            <Link href={"https://play.google.com/store"} target="_blank"><Image src={appStore} alt="Advertisement Logo" width={150} height={100} loading="eager" /></Link>
                            <Link href={"https://www.apple.com/app-store"} target="_blank"><Image src={playStore} alt="Advertisement Logo" width={150} height={100} loading="eager" /></Link>
                        </div>
                    </div>
                    <Image className='hidden lg:block' src={logo5} alt="Advertisement Logo" width={400} height={200} loading="eager" />
                </div>
            </div>
        </div>
    );
};

export default Advertisement;