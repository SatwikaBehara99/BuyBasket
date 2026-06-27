import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/components/DeleteButton";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { variants: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto text-black dark:text-white">

      {/* TOP HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Manage Products
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Add, edit and manage all products
          </p>
        </div>

        {/* ADD PRODUCT BUTTON */}
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-5 py-3 rounded-lg transition"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* PRODUCT LIST */}
      <div className="flex flex-col gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm bg-white dark:bg-gray-900 text-black dark:text-white hover:shadow-md transition"
          >
            {/* TOP SECTION */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-5">

              {/* LEFT */}
              <div className="flex gap-5">

                {/* IMAGE */}
                {product.variants[0]?.image && (
                  <img
                    src={product.variants[0].image}
                    alt={product.name}
                    className="w-28 h-28 object-cover rounded-xl border"
                  />
                )}

                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-xl">
                    {product.description || "No description"}
                  </p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3">
                {/* EDIT */}
                <Link
                  href={`/admin/products/${product.id}`}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                >
                  <Pencil size={16} />
                  Edit
                </Link>

                {/* DELETE */}
                <DeleteButton id={product.id}>
                  <div className="flex items-center gap-2">
                    <Trash2 size={15} /> 
                  </div>
                </DeleteButton>
              </div>
            </div>

            {/* VARIANTS */}
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Variants
              </h3>

              <div className="space-y-3">
                {product.variants.map((v) => (
                  <div
                    key={v.id}
                    className="flex items-center justify-between border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                  >
                    {/* LEFT */}
                    <div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">
                        {v.name}
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="text-right">
                      <div className="font-bold text-lg dark:text-gray-200">
                        ₹{v.price}
                      </div>

                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Stock: {v.stock}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}