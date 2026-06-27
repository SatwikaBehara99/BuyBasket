import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" }, { status: 401 }
      );
    }

    const { id } = await params;
    const {
      name, phone, pincode, locality, area, city, state, landmark, alternatePhone, addressType,
    } = await req.json();

    const updatedAddress = await prisma.address.update({
      where: {
        id,
      },
      data: {
        name, phone, pincode, locality, area, city, state, landmark, alternatePhone, addressType,
      },
    });
    return NextResponse.json(updatedAddress);

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update address" }, { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" }, { status: 401 }
      );
    }

    const { id } = await params;
    await prisma.address.delete({
      where: { id, },
    });
    return NextResponse.json({ message: "Address deleted", });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete address" }, { status: 500 }
    );
  }
}