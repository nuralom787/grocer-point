import Banner from "@/Components/Banner";
import Categories from "@/Components/Categories";
import DiscountProducts from "@/Components/DiscountProducts";
import PopularProducts from "@/Components/PopularProducts";

export default function Home() {
  return (
    <div className="space-y-8 md:space-y-16">
      <Banner />
      <Categories />
      <PopularProducts />
      <DiscountProducts />
    </div>
  );
}
