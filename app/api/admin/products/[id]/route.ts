import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/* ================= DELETE ================= */
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID missing" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await prisma.cartItem.deleteMany({
      where: {
        variant: {
          productId: id,
        },
      },
    });

    await prisma.wishlistItem.deleteMany({
      where: {
        variant: {
          productId: id,
        },
      },
    });

    await prisma.orderItem.deleteMany({
      where: {
        variant: {
          productId: id,
        },
      },
    });

    await prisma.productVariant.deleteMany({
      where: {
        productId: id,
      },
    });

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}

/* ================= EDIT (PUT) ================= */
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID missing" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    // delete old variants
    await prisma.productVariant.deleteMany({
      where: {
        productId: id,
      },
    });

    // IMPORTANT FIX
    const cleanVariants = body.variants.map((v: any, i: number) => ({
      name: v.name || `Variant ${i + 1}`,
      price: Number(v.price) || 0,
      stock: Number(v.stock) || 0,

      // IMAGE SAVE FIX
      image:
        typeof v.image === "string" && v.image.trim() !== ""
          ? v.image
          : "/spices.png",
    }));

    // update product
    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },

      data: {
        name: body.name,
        description: body.description,

        variants: {
          create: cleanVariants,
        },
      },

      include: {
        variants: true,
      },
    });

    return NextResponse.json(updatedProduct);

  } catch (error) {
    console.error("PUT ERROR:", error);

    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}