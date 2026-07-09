

import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Deals from "@/components/home/Deals";
import WhyChooseUs from "@/components/home/WhyChooseUs";





export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Deals />
      <WhyChooseUs />
    </main>
  );
}


