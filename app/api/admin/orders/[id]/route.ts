import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params, }: { params: Promise<{ id: string }> }
) {

  try {
    const { id } = await params;
    const { status } = await req.json();
    const order = await prisma.order.update({
      where: { id, },
      data: { status, },
    });
    return NextResponse.json(order);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update order", }, { status: 500, }
    );
  }
}