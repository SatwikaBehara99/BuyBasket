import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { ProductVariant } from "@prisma/client";



export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Please login to place order", }, { status: 401, }
      );
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const items = body.items;
    const addressId = body.addressId;
    const paymentMethod = body.paymentMethod;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty", }, { status: 400, }
      );
    }

    // FETCH VARIANTS
    const variantIds = items.map( (item: any) => item.variantId );
    const variants = await prisma.productVariant.findMany({
      where: {
        id: { in: variantIds, },
      },
    });

    // STOCK CHECK
    for (const item of items) {
      const variant = variants.find(
        (v: ProductVariant) => v.id === item.variantId
      );

      if (!variant) {
        return NextResponse.json(
          { error: "Variant not found", }, { status: 400, }
        );
      }

      if (variant.stock < item.quantity) {
        return NextResponse.json(
          { error: `${variant.name} is out of stock`, }, { status: 400, }
        );
      }
    }

    // TOTAL
    const amount = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity, 0
    );


    const address = await prisma.address.findFirst({
  where: {
    id: addressId,
    userId,
  },
});

if (!address) {
  return NextResponse.json(
    { error: "Invalid address" },
    { status: 400 }
  );
}
    // CREATE ORDER FIRST
    const order = await prisma.order.create({
      data: {
        amount,
        status: "PENDING",
        userId,
        paymentMethod,

    deliveryName: address?.name,
    deliveryPhone: address?.phone,
    deliveryPincode: address?.pincode,
    deliveryLocality: address?.locality,
    deliveryArea: address?.area,
    deliveryCity: address?.city,
    deliveryState: address?.state,
    deliveryLandmark: address?.landmark,
  },
});

    

    // CREATE ORDER ITEMS + UPDATE STOCK
    await Promise.all(
      items.map(async (item: any) => {
        const variant = variants.find(
          (v: ProductVariant) => v.id === item.variantId
        );

        if (!variant) return;
        // CREATE ORDER ITEM
        await prisma.orderItem.create({
          data: {
            orderId: order.id,
            variantId: variant.id,
            name: item.name,
            variantName: item.variant,
            quantity: item.quantity,
            priceAtPurchase: item.price,
          },
        });

        // UPDATE STOCK
        await prisma.productVariant.update({
          where: { id: variant.id, },
          data: { stock: { decrement: item.quantity, },
          },
        });
      })
    );
    return NextResponse.json({
      success: true, order,
    });

  } catch (error) {
    console.error( "🔥 ORDER API ERROR:", error );
    return NextResponse.json(
      { error: "Order failed", }, { status: 500, }
    );
  }
}