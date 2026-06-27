import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      description: body.description,
      image: body.image,
    },
  });

  return NextResponse.json(blog);
}

export async function GET() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(blogs);
}