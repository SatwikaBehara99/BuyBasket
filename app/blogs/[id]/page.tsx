import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) return notFound();

  let blog;

  try {
    blog = await prisma.blog.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("DB ERROR:", error);
    return (
      <div className="p-10 text-center text-red-500 dark:text-red-400">
        Database connection failed
      </div>
    );
  }

  if (!blog) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-950 dark:to-black text-black dark:text-white">

      {/* HEADER */}
      <div className="bg-white dark:bg-gray-900 py-12 text-center border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto p-6">

        {/*  FIXED IMAGE (CENTER + FULL VIEW) */}
        <div className="w-full flex justify-center items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-xl mb-6">
          <img
            src={blog.image || "/spices.png"}
            alt={blog.title}
            className="max-h-96 w-auto object-contain"
          />
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          {blog.description || "No content available"}
        </p>

      </div>
    </div>
  );
}