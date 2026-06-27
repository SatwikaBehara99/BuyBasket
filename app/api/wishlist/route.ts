import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json([]);
  }

  const userId = (session.user as any).id;

  const wishlist = await prisma.wishlist.findFirst({
    where: { userId },
    include: {
      items: {
        include: {
          variant: {
            include: { product: true },
          },
        },
      },
    },
  });

  return NextResponse.json(wishlist?.items || []);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const { variantId } = await req.json();

  let wishlist = await prisma.wishlist.findFirst({
    where: { userId },
  });

  if (!wishlist) {
    wishlist = await prisma.wishlist.create({
      data: { userId },
    });
  }

  try {
    await prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        variantId,
      },
    });
  } catch {
    return NextResponse.json({ message: "Already saved" });
  }

  return NextResponse.json({ message: "Saved" });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const { variantId } = await req.json();

  const wishlist = await prisma.wishlist.findFirst({
    where: { userId },
  });

  if (!wishlist) return NextResponse.json({});

  await prisma.wishlistItem.deleteMany({
    where: {
      wishlistId: wishlist.id,
      variantId,
    },
  });

  return NextResponse.json({ message: "Removed" });
}