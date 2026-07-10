import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "Payment feature is coming soon.",
    },
    {
      status: 501,
    }
  );

}