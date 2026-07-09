import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/admin/components/logout-button";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  // protect admin
  if (!session || (session.user as any)?.role !== "admin") {
     redirect("/admin/login");
  }

  const email = session?.user?.email ?? "User";
  return (
    <div className="p-10 max-w-5xl mx-auto dark:text-white text-black">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold dark:text-white text-black"> Welcome, {email} </h1>

        <LogoutButton />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Link
          href="/admin/products/new" className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-10 rounded-lg shadow hover:shadow-lg transition text-center" >
          <h2 className="text-2xl font-semibold mb-2"> Add Product </h2>
          <p className="text-gray-500 dark:text-gray-400"> Create new product </p>
        </Link>

        <Link
          href="/admin/products" className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-10 rounded-lg shadow hover:shadow-lg transition text-center" >
          <h2 className="text-2xl font-semibold mb-2"> Manage Products </h2>
          <p className="text-gray-500 dark:text-gray-400"> View and delete products </p>
        </Link>

        <Link href="/admin/blogs/new" className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-10 rounded-lg shadow hover:shadow-lg transition text-center">
          <h2 className="text-2xl font-semibold mb-2"> Add Blogs </h2>
          <p className="text-gray-500 dark:text-gray-400"> Create new blog </p>
        </Link>

        <Link
          href="/admin/blogs" className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-10 rounded-lg shadow hover:shadow-lg transition text-center" >
          <h2 className="text-2xl font-semibold mb-2"> Manage Blogs </h2>
          <p className="text-gray-500 dark:text-gray-400"> View blogs </p>
        </Link>

        <Link
          href="/admin/orders" className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-10 rounded-lg shadow hover:shadow-lg transition text-center" >
          <h2 className="text-2xl font-semibold mb-2"> Manage Orders </h2>
          <p className="text-gray-500 dark:text-gray-400"> View and manage customer orders </p>
        </Link>
        
      </div>
    </div>
  );
}