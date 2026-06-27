import { prisma } from "@/lib/prisma";
import EditProductForm from "./EditProductForm";

export default async function Page(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { variants: true },
  });

  if (!product) {
    return (
      <div className="p-10 text-center text-red-500 dark:text-red-400">
        Product not found ❌
      </div>
    );
  }

  return <EditProductForm product={product} />;
}