import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";


export default async function OrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  // ✅ VERY IMPORTANT
  const { id } = await params;

  console.log("ORDER ID:", id);

  // ❌ INVALID ID
  if (!id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-black py-10 px-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center border border-blue-100 dark:bg-gray-900">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold text-blue-600 dark:text-white"> Invalid Order ID </h1>
          <Link href="/orders">
            <button className="mt-6 px-6 py-3 bg-blue-600 dark:bg-white text-white dark:text-black rounded-xl font-semibold"> Back to Orders </button>
          </Link>
        </div>
      </div>
    );
  }


  // ✅ FETCH ORDER
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      items: {
        include: {
          variant: true,
        },
      },
    },
  });
  console.log("ORDER:", order);

  // ❌ ORDER NOT FOUND
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-black py-10 px-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center border border-blue-100 dark:bg-gray-900">
          <div className="text-6xl mb-4">😢</div>
          <h1 className="text-3xl font-bold text-blue-600 dark:text-white"> Order not found </h1>
          <Link href="/orders">
            <button className="mt-6 px-6 py-3 bg-blue-600 dark:bg-white text-white dark:text-black rounded-xl font-semibold"> Back to Orders </button>
          </Link>
        </div>
      </div>
    )
  }

  // 🎨 STATUS STYLE
  

      const statusStyles =
  order.status === "DELIVERED"
    ? "bg-green-600 text-white"

    : order.status === "SHIPPED"
    ? "bg-blue-600 text-white"

    : order.status === "PROCESSING"
    ? "bg-orange-500 text-white"

    : order.status === "PENDING"
    ? "bg-yellow-400 text-black"

    : "bg-red-600 text-white";


      const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0
        }).format(amount);
      };

  // 🚚 DELIVERY DATE
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white"> 📦 Order Details </h1>
            <p className="text-gray-500 mt-1 dark:text-gray-400"> Track your order information </p>
          </div>

          <Link href="/orders">
            <button className="text-green-700 dark:text-blue-300 font-semibold hover:underline"> ← Back to Orders </button>
          </Link>
        </div>

        {/* SUMMARY */}
        <div className="bg-white dark:bg-[#071225] rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 mb-6">

          <div className="flex justify-between items-start mb-5">
            <div className="max-w-[75%]">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1"> Order ID </p>
              <p className="font-semibold text-gray-800 dark:text-white break-all text-sm"> {order.id} </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
  Ordered on{" "}
  {new Date(order.createdAt).toLocaleString("en-IN")}
</p>
            </div>

            <span className={`px-4 py-1 rounded-full text-xs font-bold ${statusStyles}`} > {order.status} </span>
          </div>

          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">

  <p>
    {new Date(order.createdAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}
  </p>

  <div className="text-right">
    <p>
      {order.items.length} item
      {order.items.length > 1 ? "s" : ""}
    </p>

    <p className="font-medium text-blue-600 dark:text-blue-300">
      {order.paymentMethod || "N/A"}
    </p>
  </div>

</div>

          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400"> Total Amount </p>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-400"> ₹{order.amount} </p>
          </div>
        </div>

        {/* ITEMS */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4"> 🛒 Ordered Items </h2>
        <div className="space-y-5">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#071225] rounded-3xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-100 cursor-pointer hover:-translate-y-1 hover:border-blue-500 hover:scale-[1.02] dark:hover:border-blue-800 dark:hover:shadow-blue-500/20"
            >
              <div className="flex gap-5 items-center">

                {/* IMAGE */}
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center border">
                  <Image
                    src={item.variant?.image || "/spices.png"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white"> {item.name} </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1"> {item.variantName} </p>

                  <div className="flex gap-4 mt-3 text-sm">
                    <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300"> Qty: {item.quantity} </span>
                    <span className="bg-blue-100 dark:bg-gray-700 px-3 py-1 rounded-full text-blue-700 dark:text-blue-300 font-semibold"> ₹{item.priceAtPurchase} each </span>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400"> Total </p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white"> ₹{item.priceAtPurchase * item.quantity} </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DELIVERY */}
        <div className="bg-white dark:bg-[#071225] rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 mt-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3"> 🚚 Delivery Status </h3>
          <p className="text-gray-600 dark:text-gray-400"> Expected delivery by{" "}
            <span className="font-bold text-gray-800 dark:text-white">
              {deliveryDate.toLocaleDateString("en-IN", {
                weekday: "short", day: "numeric", month: "short",
              })}
            </span>
          </p>

          <div className="mt-4">
            {order.status === "SHIPPED" && (
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                📦 Order Confirmed
              </div>
            )}

            {order.status === "PENDING" && (
              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
                ⚙️ Preparing your order
              </div>
            )}

            {order.status === "FAILED" && (
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold"> 
                ❌ Payment Failed
              </div>
            )}


          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 mt-6">

<h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">📍 Delivered To </h2>

<div className="space-y-2 text-gray-700 dark:text-gray-400">
<p className="font-bold text-gray-800 dark:text-white"> {order.deliveryName} </p>
<p> {order.deliveryArea}, {order.deliveryLocality} </p>
<p> {order.deliveryCity}, {order.deliveryState} - {order.deliveryPincode} </p>
<p> Phone : {order.deliveryPhone}</p>
{order.deliveryLandmark && (
<p> Landmark : {order.deliveryLandmark} </p>
)}

</div>
</div>
        </div>
      </div>
    </div>
  );
}