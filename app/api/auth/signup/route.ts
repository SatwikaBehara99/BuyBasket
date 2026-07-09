import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();
    const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

if (!passwordRegex.test(password)) {
  return NextResponse.json(
    {
      error:
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
    },
    { status: 400 }
  );
}

  const phoneRegex = /^[6-9]\d{9}$/;
  const isPhoneValid = phoneRegex.test(phone);

  if (!isPhoneValid) {
    return NextResponse.json(
      { error: "Invalid phone number" },
      { status: 400 }
    );
  }

  const emailRegex =
/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const isEmailValid = emailRegex.test(email);

  if (!isEmailValid) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  const nameRegex = /^[A-Za-z ]{3,40}$/;
const isNameValid = nameRegex.test(name);

if (!isNameValid) {
  return NextResponse.json(
    { error: "Name must be at least 3 characters" },
    { status: 400 }
  );
}

    // check existing
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // check existing phone
    const existingPhone = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingPhone) {
      return NextResponse.json({ error: "Phone number already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone: phone, // temporary (since phone required in schema)
      },
    });

    return NextResponse.json({ message: "User created" });

  } catch (error) {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}