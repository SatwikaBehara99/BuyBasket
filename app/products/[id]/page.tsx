import { prisma } from "@/lib/prisma";
import ProductClient from "./ProductClient";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | BuyBasket`,
    description:
      product.description ||
      `Buy ${product.name} online at the best price.`,
  };
}

export default async function ProductPage({
  params,
}: Props) {
  const { id } = await params;


  const product = await prisma.product.findFirst({
  where: {
    id,
    status: "ACTIVE",
  },
  include: {
    variants: true,
  },
});

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      status: "ACTIVE",
      NOT: {
        id: product.id,
      },
    },
    include: {
      variants: true,
    },
    take: 4,
  });

  return (
    <ProductClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}





