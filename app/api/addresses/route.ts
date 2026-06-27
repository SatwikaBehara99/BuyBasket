import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" }, { status: 401 }
      );
    }

    const addresses = await prisma.address.findMany({
      where: { userId: (session.user as any).id, },
      orderBy: { createdAt: "desc", },
    });
    return NextResponse.json(addresses);

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch addresses" }, { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" }, { status: 401 }
      );
    }

    const {
      name, phone, pincode, locality, area, city, state, landmark, alternatePhone, addressType,
    } = await req.json();

    const address = await prisma.address.create({
      data: {
        userId: (session.user as any).id,
        name, phone, pincode, locality, area, city, state, landmark, alternatePhone, addressType,
      },
    });
    return NextResponse.json(address);

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add address" }, { status: 500 }
    );
  }
}