import './searchPage.css';
import SearchSwiper from "./Components/SearchSwiper";
import SearchProducts from './Components/SearchProducts';

const SearchPage = () => {
    return (
        <section className="py-10">
            <section className="max-w-screen-2xl mx-auto px-4 lg:px-6 font-poppins">
                {/* Search Banner */}
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 font-poppins text-center text-white">
                    <div className="search1 bg-cover bg-center p-16 rounded-lg">
                        <h3 className="text-lg font-semibold">Taste of</h3>
                        <h1 className="text-2xl font-bold leading-8">Fresh & Natural</h1>
                        <p className="text-xs font-medium">Weekend discount offer</p>
                        <button className="text-xs font-semibold bg-green-900 px-4 py-1.5 my-1.5 rounded-full cursor-pointer">Shop Now</button>
                    </div>
                    <div className="search2 bg-cover bg-center p-16 rounded-lg">
                        <h3 className="text-lg font-semibold">Taste of</h3>
                        <h1 className="text-2xl font-bold leading-8">Fish & Meat</h1>
                        <p className="text-xs font-medium">Weekend discount offer</p>
                        <button className="text-xs font-semibold bg-green-900 px-4 py-1.5 my-1.5 rounded-full cursor-pointer">Shop Now</button>
                    </div>
                    <div className="search3 bg-cover bg-center p-16 rounded-lg">
                        <h3 className="text-lg font-semibold">Taste of</h3>
                        <h1 className="text-2xl font-bold leading-8">Bread & Bakery</h1>
                        <p className="text-xs font-medium">Weekend discount offer</p>
                        <button className="text-xs font-semibold bg-green-900 px-4 py-1.5 my-1.5 rounded-full cursor-pointer">Shop Now</button>
                    </div>
                </div>

                {/* Search Category Slider */}
                <SearchSwiper />

                {/* Search Products */}
                <SearchProducts />
            </section>
        </section>
    );
};

export default SearchPage;