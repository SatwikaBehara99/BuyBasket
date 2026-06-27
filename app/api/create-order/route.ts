import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

export async function POST(req: Request) {
  const body = await req.json();
  const order = await razorpay.orders.create({
    amount: body.amount * 100,
    currency: "INR",
  });

  return NextResponse.json(order);
}