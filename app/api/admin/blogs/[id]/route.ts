import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } //  FIX HERE
) {
  try {
    const { id } = await context.params; //  IMPORTANT

    if (!id) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    console.log("Deleting blog with id:", id); //  debug

    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deleted successfully" });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}