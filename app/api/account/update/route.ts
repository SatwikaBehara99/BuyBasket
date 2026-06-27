import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function PUT(req: Request) {
  console.log("UPDATING ACCOUNT...");
  try {
    const session = await getServerSession(authOptions);
    console.log("SESSION:", session);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const {
      name,
      gender,
      email,
      phone,
      addresses,
      currentPassword,
      newPassword,
    } = await req.json();

    console.log("SESSION EMAIL:", session.user.email);
    console.log("DATA:", {
      name,
      gender,
      email,
      phone,
      addresses,
    });

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    let hashedPassword;
    if (
      currentPassword &&
      newPassword
    ) {
      const validPassword =
        await bcrypt.compare(
          currentPassword,
          existingUser.password
        );

      if (!validPassword) {
        return NextResponse.json(
          {
            error:
              "Current password is incorrect",
          },
          { status: 400 }
        );
      }

      hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );
    }

    const updatedUser =
      await prisma.user.update({
        where: {
          email: session.user.email,
        },
        data: {
          name,
          gender,
          email,
          phone,
          addresses,
          ...(hashedPassword && {
            password: hashedPassword,
          }),
        },
      });

    console.log("UPDATED USER:", updatedUser);
    return NextResponse.json(updatedUser);

  } catch (error: any) {
    console.error("FULL ERROR:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update account", },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session =
      await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user =
      await prisma.user.findUnique({
        where: { email: session.user.email, },
        select: {
          name: true,
          gender: true,
          email: true,
          phone: true,
          addresses: true,
        },
      });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(user);

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, } ,
      { status: 500 }
    );
  }
}