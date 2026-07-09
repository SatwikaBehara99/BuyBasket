import { prisma } from "@/lib/prisma";
import ProductsHero from "@/components/Product/components/ProductsHero";
import ProductsList from "@/components/Product/components/ProductsSection";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
  where: {
    status: "ACTIVE",
  },
  include: {
    variants: true,
  },
  orderBy: {
    createdAt: "desc",
  },
});

  return (
    <>
      <ProductsHero />
      <ProductsList products={products} />
    </>
  );
}