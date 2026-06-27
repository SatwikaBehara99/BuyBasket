import { prisma } from "@/lib/prisma";
import ProductClient from "./ProductClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { variants: true },
  });

  if (!product) {
    return (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
    <div className="text-2xl font-bold text-gray-800 dark:text-white">
      Product not found
    </div>
  </div>
);
  }

  return <ProductClient product={product} />;
}