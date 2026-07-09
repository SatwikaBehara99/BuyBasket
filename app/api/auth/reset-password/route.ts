import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        {
          error: "Missing required fields.",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid or expired reset link.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !user.resetTokenExpiry ||
      new Date() > user.resetTokenExpiry
    ) {
      return NextResponse.json(
        {
          error:
            "Reset link has expired.",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

      await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,

        // Clear reset token after successful reset
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return NextResponse.json({
      message:
        "Password reset successful.",
    });

  } catch (error) {

    console.error(
      "Reset Password Error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong.",
      },
      {
        status: 500,
      }
    );

  }
}