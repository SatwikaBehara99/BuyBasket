import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function BlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-950 dark:to-black text-black dark:text-white">

      {/* HEADER */}
      <div className="bg-white dark:bg-gray-900 py-12 text-center border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <h1 className="text-4xl font-bold">Blogs</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Explore our latest stories
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid sm:grid-cols-2 md:grid-cols-3 gap-10">

        {blogs.map((blog) => (
          <Link href={`/blogs/${blog.id}`} key={blog.id}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">
              {/*  FIXED IMAGE */}
              <div className="w-full h-52 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-t-2xl">
                <img
                  src={blog.image || "/spices.png"}
                  alt={blog.title}
                  className="max-h-44 w-auto object-contain"
                />
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg dark:text-white">
                  {blog.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 line-clamp-3">
                  {blog.description ?? "No description"}
                </p>

                <p className="mt-4 text-sm font-medium text-black dark:text-white">
                  Read More →
                </p>
              </div>

            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}