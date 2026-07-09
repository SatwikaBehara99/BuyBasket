import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-black px-4">
        <div className="bg-white shadow-xl rounded-3xl p-10 text-center max-w-md w-full border border-gray-100 dark:bg-gray-900">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white"> Please Login </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-3"> You need to login to view your orders </p>

          <Link href="/login">
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"> Login </button>
          </Link>
        </div>
      </div>
    );
  }

  const orders = await prisma.order.findMany({
    where: { userId, },
    include: { items: true, },
    orderBy: { createdAt: "desc", },
  });

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-black px-4">
        <div className="bg-white shadow-xl rounded-3xl p-10 text-center max-w-md w-full border border-gray-100 dark:bg-gray-900 dark:border-gray-700">
          <div className="text-6xl mb-4">📦</div>

          <h1 className="text-3xl font-bold text-gray-800 dark:text-white"> No Orders Yet </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-3"> Start shopping and your orders will appear here </p>

          <Link href="/products">
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"> Shop Now </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold dark:text-white text-gray-800"> 📦 My Orders </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1"> Track all your recent purchases </p>
          </div>
        </div>

        {/* ORDERS */}
        <div className="space-y-5">
          {orders.map((order) => {
            const statusColor =
  order.status === "DELIVERED"
    ? "bg-green-100 text-green-700 border border-green-200"

    : order.status === "SHIPPED"
    ? "bg-blue-100 text-blue-700 border border-blue-200"

    : order.status === "PROCESSING"
    ? "bg-orange-100 text-orange-700 border border-orange-200"

    : order.status === "PENDING"
    ? "bg-yellow-100 text-yellow-700 border border-yellow-200"

    : "bg-red-100 text-red-700 border border-red-200";

            return (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
              >
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer hover:-translate-y-1 hover:border-blue-500 hover:scale-[1.02] hover:shadow-blue-500/20">

                  {/* TOP */}
                  <div className="flex justify-between border border-gray-300 dark:border-gray-700 rounded-3xl items-start mb-5 p-4">
                    <div className="max-w-[70%]">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1"> Order ID </p>
                      <p className="font-semibold text-gray-800 dark:text-white break-all text-sm"> {order.id} </p>
                    </div>

                    <span className={`px-4 py-1 rounded-full text-xs font-bold ${statusColor}`} >
                      {order.status}
                    </span>
                  </div>

                  {/* DATE + ITEMS */}
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <p>
                      {new Date(order.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>

                    <p>
                      {order.items.length} item
                      {order.items.length > 1 ? "s" : ""}
                    </p>
                    <p className="text-blue-600 dark:text-blue-300 font-medium">
  {order.paymentMethod || "N/A"}
</p>
                  </div>

                  {/* PRICE */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400"> Total Amount </p>
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-300"> ₹{order.amount} </p>
                    </div>
                    <div className="text-blue-700 font-semibold text-sm dark:text-blue-300"> View Order → </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}