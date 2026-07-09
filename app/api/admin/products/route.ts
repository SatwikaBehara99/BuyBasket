import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { variants: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const name: string = body.name;
    const description: string | null = body.description || null;
    const category: string | null = body.category || null;
     const subcategory: string | null = body.subcategory || null;
  const subSubcategory: string | null = body.subSubCategory || null;
    const brand: string | null = body.brand || null;
    const featured: boolean = body.featured || false;
    const status: string = body.status || "ACTIVE";
    const variants = body.variants;

    if (!name || !variants || variants.length === 0) {
      return NextResponse.json(
        { error: "Invalid data" },
        { status: 400 }
      );
    }

    //  STRONG VALIDATION + IMAGE FIX
    
    const cleanVariants = variants.map((v: any, i: number) => ({
  name: v.name || `Variant ${i + 1}`,

  sku: v.sku || null,
  color: v.color || null,
  size: v.size || null,

  price: Number(v.price) || 0,
  stock: Number(v.stock) || 0,

  image:
    typeof v.image === "string" && v.image.trim() !== ""
      ? v.image
      : "/product-placeholder.png",
}));

    const product = await prisma.product.create({
      data: {
        name,
        description,
        category,
        subcategory,
        subSubcategory,
        brand,
        featured,
        status,
        variants: {
          create: cleanVariants,
        },
      },
      include: { variants: true },
    });

    //  BLOG SAFE IMAGE
    await prisma.blog.create({
      data: {
        title: `New Product: ${product.name}`,
        description:
          description || `We just launched ${product.name}. Check it out!`,
        image:
          product.variants[0]?.image || "/spices.png",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("POST ERROR FULL:", error);

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}