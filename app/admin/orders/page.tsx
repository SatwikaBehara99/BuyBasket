import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import UpdateStatus from "./UpdateStatus";
import FilterOrders from "./FilterOrders";
import SearchOrders from "./SearchOrders";
import Link from "next/link";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    search?: string;
  }>;
}) {
  const { status, search } = await searchParams;

  const orders = await prisma.order.findMany({
    where: {
      ...(status &&
        status !== "ALL" && {
          status: status as any,
        }),

      ...(search && {
        OR: [
          {
            id: {
              contains: search,
              mode: "insensitive",
            },
          },

          {
            user: {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        ],
      }),
    },

    include: {
      items: true,
      user: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const processingOrders = orders.filter(
    (order) =>
      order.status.toString() ===
      "PROCESSING"
  ).length;

  const shippedOrders = orders.filter(
    (order) =>
      order.status.toString() ===
      "SHIPPED"
  ).length;

  const deliveredOrders = orders.filter(
    (order) =>
      order.status.toString() ===
      "DELIVERED"
  ).length;

  const cancelledOrders = orders.filter(
    (order) =>
      order.status.toString() ===
      "CANCELLED"
  ).length;

  const totalRevenue = orders
    .filter(
      (order) =>
        order.status.toString() ===
        "DELIVERED"
    )
    .reduce(
      (sum, order) =>
        sum + order.amount,
      0
    );

  return (
    <div className="p-10 text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6">
        Manage Orders
      </h1>

      <Suspense fallback={null}>
        <SearchOrders />
      </Suspense>

      <Suspense fallback={null}>
        <FilterOrders />
      </Suspense>

      {/* STATS */}
      <div className="grid md:grid-cols-5 gap-4 mb-8">

        <div className="bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100 p-5 rounded-xl shadow">
          <h2 className="font-semibold"> Processing </h2>
          <p className="text-3xl font-bold"> {processingOrders} </p>
        </div>

        <div className="bg-blue-100 dark:bg-blue-900 dark:text-blue-100 p-5 rounded-xl shadow">
          <h2 className="font-semibold"> Shipped </h2>
          <p className="text-3xl font-bold"> {shippedOrders} </p>
        </div>

        <div className="bg-green-100 dark:bg-green-900 dark:text-green-100 p-5 rounded-xl shadow">
          <h2 className="font-semibold"> Delivered </h2>
          <p className="text-3xl font-bold"> {deliveredOrders} </p>
        </div>

        <div className="bg-red-100 dark:bg-red-900 dark:text-red-100 p-5 rounded-xl shadow">
          <h2 className="font-semibold"> Cancelled </h2>
          <p className="text-3xl font-bold"> {cancelledOrders} </p>
        </div>

        <div className="bg-purple-100 dark:bg-purple-900 dark:text-purple-100 p-5 rounded-xl shadow">
          <h2 className="font-semibold"> Revenue </h2>
          <p className="text-3xl font-bold"> ₹{totalRevenue} </p>
        </div>

      </div>

      {/* ORDERS */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6" >
            <div className="flex justify-between mb-4">

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400"> Order ID </p>
                <p className="font-semibold break-all"> {order.id} </p>
                <p className="text-sm text-gray-500 mt-3 dark:text-gray-400"> Customer </p>
                <p> {order.user?.email || "Guest"} </p>
                <p className="text-sm text-gray-500 mt-3 dark:text-gray-400"> Date </p>
                <p> {new Date(order.createdAt).toLocaleDateString()} </p>
              </div>

              <div className="flex flex-col gap-3">
                <UpdateStatus
                  id={order.id}
                  currentStatus={
                    order.status
                  }
                />

                <Link href={`/admin/orders/${order.id}`} className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded text-center" > View Details </Link>
              </div>
            </div>

            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 dark:border-gray-700 rounded p-3 flex justify-between bg-gray-50 dark:bg-gray-800"
                >
                  <div>
                    <p className="font-medium"> {item.name} </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400"> {item.variantName} </p>
                    <p className="text-sm">
                      Qty:
                      {" "}
                      {item.quantity}
                    </p>
                  </div>

                  <div className="font-bold">
                    ₹
                    {item.priceAtPurchase *
                      item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right mt-4 font-bold text-lg">
              Total: ₹{order.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

