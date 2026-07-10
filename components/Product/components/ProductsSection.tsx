"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense,useEffect, useMemo, useState } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  Eye,
  BadgePercent,
} from "lucide-react";
import { categories } from "@/lib/categories";
import { useRouter } from "next/navigation";
import {useSearchParams} from "next/navigation";
import { useCart } from "@/context/CartContext";

type Variant = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image?: string | null;
};


type Product = {
  id: string;
  name: string;
  description: string | null;
  category?: string | null;
  subcategory?: string | null;
  subSubcategory?: string | null;
  brand:string | null;
  variants: Variant[];
};

interface Props {
  products: Product[];
}

function ProductsSectionContent({
  products,
}: Props) {
  const { addToCart } = useCart();

  const [message, setMessage] = useState("");

  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [search, setSearch] = useState("");

const [selectedCategory, setSelectedCategory] =
  useState("");

const [selectedSubcategory, setSelectedSubcategory] =
  useState("");

const [selectedChildCategory, setSelectedChildCategory] =
  useState("");

const [sortBy, setSortBy] = useState("newest");

  const [selectedVariant, setSelectedVariant] =
    useState<Record<string, string>>({});

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
      const category = searchParams.get("category") || "";
      const subcategory = searchParams.get("subcategory") || "";
      const childCategory = searchParams.get("childCategory") || "";

      setSelectedCategory(category);
      setSelectedSubcategory(subcategory);
      setSelectedChildCategory(childCategory);
    }, [searchParams]);

  useEffect(() => {
    async function loadWishlist() {
      try {
        const res = await fetch("/api/wishlist");

        if (!res.ok) return;

        const data = await res.json();

        setWishlistItems(
          data.map((item: any) => item.variant.id)
        );
      } catch (err) {
        console.log(err);
      }
    }

    loadWishlist();
  }, []);
const currentCategory = categories.find(
  (c) => c.name === selectedCategory
);

const currentSubcategory =
  currentCategory?.sub.find(
    (s) => s.name === selectedSubcategory
  );

const filteredProducts = useMemo(() => {
  let data = [...products];

  // Search
  if (search.trim()) {
    data = data.filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  // Category
  if (selectedCategory) {
    data = data.filter(
      (p) => p.category === selectedCategory
    );
  }

  // Subcategory
  if (selectedSubcategory) {
    data = data.filter(
      (p) => p.subcategory === selectedSubcategory
    );
  }

  // Child Category
  if (selectedChildCategory) {
    data = data.filter(
      (p) =>
        p.subSubcategory ===
        selectedChildCategory
    );
  }

  // Sorting
  switch (sortBy) {
    case "priceLow":
      data.sort(
        (a, b) =>
          a.variants[0].price -
          b.variants[0].price
      );
      break;

    case "priceHigh":
      data.sort(
        (a, b) =>
          b.variants[0].price -
          a.variants[0].price
      );
      break;

    case "name":
      data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;

    default:
      break;
  }

  return data;
}, [
  products,
  search,
  selectedCategory,
  selectedSubcategory,
  selectedChildCategory,
  sortBy,
]);

const totalProducts = filteredProducts.length;


  const handleAdd = (
    e: React.MouseEvent,
    product: Product,
    variant: Variant
  ) => {
    e.preventDefault();
    if (variant.stock === 0) {
      setMessage("Out of Stock");
      setTimeout(() => setMessage(""), 1800);
      return;
    }

    addToCart({
      variantId: variant.id,
      name: product.name,
      variant: variant.name,
      quantity:1,
      price: variant.price,
      mrp: variant.price + 20,
      rating: 4.5,
      image:
        product.variants.find((v) => v.image)?.image ??
        "/product-placeholder.png",
    });

    setMessage("Added to Cart ✅");

    setTimeout(() => {
      setMessage("");
    }, 1800);
  };

  const toggleWishlist = async (
    e: React.MouseEvent,
    variantId: string,
    isWishlisted: boolean
  ) => {
    e.preventDefault();

    try {
      if (!isWishlisted) {
        const res = await fetch("/api/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ variantId }),
        });

        if (res.status === 401) {
          setMessage("Please login first");

          setTimeout(() => setMessage(""), 1800);

          return;
        }

        setWishlistItems((prev) => [
          ...prev,
          variantId,
        ]);

        setMessage("Added to Wishlist ❤️");
      } else {
        await fetch("/api/wishlist", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ variantId }),
        });


        setWishlistItems((prev) =>
  prev.filter((id) => id !== variantId)
);
        setMessage("Removed from Wishlist");
      }

      setTimeout(() => {
        setMessage("");
      }, 1800);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section 
    id="products"
    className="max-w-7xl mx-auto px-5 py-10">

      <div className="mb-10">

  <h2 className="text-3xl font-bold">
    All Products
  </h2>

  <p className="text-gray-500 mt-2">
    {totalProducts} Products Found
  </p>

  <div className="grid md:grid-cols-5 gap-4 mt-8">

    {/* Search */}
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="md:col-span-2 border rounded-lg px-4 py-3 dark:bg-gray-900"
    />

    {/* Category */}
    <select
      value={selectedCategory}
      onChange={(e) => {
        setSelectedCategory(e.target.value);
        setSelectedSubcategory("");
        setSelectedChildCategory("");
      }}
      className="border rounded-lg px-4 py-3 dark:bg-gray-900"
    >
      <option value="">All Categories</option>

      {categories.map((cat) => (
        <option key={cat.id} value={cat.name}>
          {cat.name}
        </option>
      ))}
    </select>

    {/* Subcategory */}
    <select
      value={selectedSubcategory}
      onChange={(e) => {
        setSelectedSubcategory(e.target.value);
        setSelectedChildCategory("");
      }}
      className="border rounded-lg px-4 py-3 dark:bg-gray-900"
    >
      <option value="">
        All Subcategories
      </option>

      {currentCategory?.sub.map((sub) => (
        <option
          key={sub.id}
          value={sub.name}
        >
          {sub.name}
        </option>
      ))}
    </select>

    {/* Sort */}
    <select
      value={sortBy}
      onChange={(e) =>
        setSortBy(e.target.value)
      }
      className="border rounded-lg px-4 py-3 dark:bg-gray-900"
    >
      <option value="newest">
        Newest
      </option>

      <option value="priceLow">
        Price: Low → High
      </option>

      <option value="priceHigh">
        Price: High → Low
      </option>

      <option value="name">
        Name A-Z
      </option>
    </select>

  </div>

  {/* Child Category */}

  {currentSubcategory && (

    <div className="mt-4">

      <select
        value={selectedChildCategory}
        onChange={(e) =>
          setSelectedChildCategory(
            e.target.value
          )
        }
        className="border rounded-lg px-4 py-3 dark:bg-gray-900 w-full md:w-72"
      >
        <option value="">
          All Types
        </option>

        {currentSubcategory.sub.map(
          (child) => (
            <option
              key={child}
              value={child}
            >
              {child}
            </option>
          )
        )}
      </select>

    </div>

  )}

</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {filteredProducts.map((product) => {
          const currentVariant =
            product.variants.find(
              (v) => v.id === selectedVariant[product.id]
            ) || product.variants[0];

          const isWishlisted = wishlistItems.includes(currentVariant.id);

          const productImage =
            currentVariant.image ||
            product.variants.find((v) => v.image)?.image ||
            "/product-placeholder.png";

          const mrp = currentVariant.price + 20;

          const discount = Math.round(
            ((mrp - currentVariant.price) / mrp) * 100
          );

          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
            >

              <div className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">

                {/* Wishlist */}

                <button
                  onClick={(e) =>
                    toggleWishlist(
                      e,
                      currentVariant.id,
                      isWishlisted
                    )
                  }
                  className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow flex items-center justify-center"
                >
                  <Heart
                    size={18}
                    className={
                      isWishlisted
                        ? "text-red-500 fill-red-500"
                        : "text-gray-500"
                    }
                  />
                </button>

                {/* Discount */}

                <div className="absolute top-4 left-4 z-20 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                  <BadgePercent size={12} />
                  {discount}% OFF
                </div>
                {product.brand && (
  <div className="absolute left-4 top-14 z-20 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
    {product.brand}
  </div>
)}

                {/* Image */}

                <div className="bg-gray-50 dark:bg-gray-950 h-64 flex items-center justify-center p-6 overflow-hidden">
                  <Image
                    src={productImage}
                    alt={product.name}
                    width={220}
                    height={220}
                    className="object-contain h-52 w-auto transition duration-300 group-hover:scale-110"
                  />
                  {currentVariant.stock === 0 && (
  <div className="absolute bottom-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
    Out of Stock
  </div>
)}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg line-clamp-2 min-h-[56px]">
                    {product.name}
                  </h3>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mt-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={15}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">
                      4.5 • 120+
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      ₹{currentVariant.price}
                    </span>
                    <span className="line-through text-gray-400">
                      ₹{mrp}
                    </span>
                  </div>

                  <p className="text-green-600 text-sm font-medium mt-1">
                    Free Delivery
                  </p>

                  {/* Variant Dropdown */}
                  <div className="mt-4">
                    <select
                      value={currentVariant.id}
                      onClick={(e) => e.preventDefault()}
                      onChange={(e) =>
                        setSelectedVariant((prev) => ({
                          ...prev,
                          [product.id]: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm"
                    >
                      {product.variants.map((variant) => (
                        <option
                          key={variant.id}
                          value={variant.id}
                        >
                          {variant.name} — ₹{variant.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex gap-3">

                    

                    <button
  disabled={currentVariant.stock === 0}
  onClick={(e) =>
    handleAdd(e, product, currentVariant)
  }
  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg py-2.5 flex items-center justify-center gap-2"
>
  <ShoppingCart size={18} />
  {currentVariant.stock === 0 ? "Out of Stock" : "Add"}
</button>

                    <button
                      onClick={(e) => {
  e.preventDefault();
  router.push(`/products/${product.id}`)
  }}
                      className="px-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
                    >
                      <Eye size={18} />
                    </button>

                  </div>
                </div>

              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            No Products Found
          </h2>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Products will appear here once the admin adds them.
          </p>
        </div>
      )}

      {/* Toast */}
      {message && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-blue-600 px-5 py-3 text-white shadow-xl">
          {message}
        </div>
      )}

    </section>
  );
}

export default function ProductsSection({ products }: Props) {
  return (
    <Suspense fallback={<div></div>}>
      <ProductsSectionContent products={products} />
    </Suspense>
  );
}

