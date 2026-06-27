import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function AdminOrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        include: {
          addresses: true,
        }
      },
      items: {
        include: {
          variant: true,
        },
      },
    },
  });

  if (!order) {
    return (
      <div className="p-10"> <h1 className="text-3xl font-bold"> Order not found </h1> </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-10 space-y-8 text-black dark:text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold"> Order Details </h1>
          <p className="text-gray-500 mt-2 dark:text-gray-400">  Order ID: {order.id} </p>
        </div>
        <Link href="/admin/orders" className="bg-black dark:bg-white dark:text-black text-white px-5 py-3 rounded" > Back </Link>
      </div>

      {/* CUSTOMER DETAILS */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-5"> Customer Details </h2>
        <div className="space-y-3">
          <div>
            <span className="font-semibold"> Name: </span>{" "}
            {order.user?.name || "Not Available"}
          </div>

          <div>
            <span className="font-semibold"> Email: </span>{" "}
            {order.user?.email}
          </div>

          <div>
            <span className="font-semibold"> Phone: </span>{" "}
            {order.user?.phone || "Not Available"}
          </div>

          <div>
            <span className="font-semibold"> Delivery Address: </span>
            <div className="mt-2 text-gray-700 dark:text-gray-300 leading-7">
              <div className="font-semibold"> {order.deliveryName} </div>
              <div> {order.deliveryArea}, {order.deliveryLocality} </div>
              <div> {order.deliveryCity}, {order.deliveryState} - {order.deliveryPincode} </div>
              <div> Phone: {order.deliveryPhone} </div>
              {order.deliveryLandmark && (
                <div> Landmark: {order.deliveryLandmark} </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ORDER INFO */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-5"> Order Information </h2>
        <div className="space-y-3">
          <div>  <span className="font-semibold"> Status: </span>{" "} {order.status} </div>
          <div>
            <span className="font-semibold"> Date: </span>{" "}
            {new Date(order.createdAt).toLocaleDateString(
              "en-IN",
              {
                day: "numeric", month: "long", year: "numeric",
              }
            )}
          </div>

          <div>
            <span className="font-semibold"> Total Amount: </span>{" "}
            ₹{order.amount}
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-6"> Ordered Products </h2>
        <div className="space-y-5">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-lg p-5"
            >
              <div className="flex gap-5 items-center">
                <Image
                  src={ item.variant?.image || "/spices.png" }
                  alt={item.name} width={90} height={90} className="rounded"
                />
                <div>
                  <h3 className="font-bold text-lg"> {item.name} </h3>
                  <p className="text-gray-500 dark:text-gray-400"> {item.variantName} </p>
                  <p> Quantity: {item.quantity} </p>
                </div>

              </div>

              <div className="text-xl font-bold">
                ₹
                {item.priceAtPurchase *
                  item.quantity}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}