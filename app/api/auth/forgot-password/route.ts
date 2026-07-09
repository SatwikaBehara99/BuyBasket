import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        message:
          "If an account exists with this email, a reset link has been generated.",
      });
    }

    const token = randomBytes(32).toString("hex");

    const expiry = new Date(Date.now() + 30 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiry: expiry,
      },
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    console.log("\n==============================");
    console.log("BUYBASKET PASSWORD RESET LINK");
    console.log(resetLink);
    console.log("==============================\n");

    return NextResponse.json({
      message: "Reset link generated successfully.",
      resetLink, // Development purpose only
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}