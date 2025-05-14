import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { farfession } = await request.json();
    // no persistent store—just echo success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in submit-farfession API:", error);
    return NextResponse.error();
  }
}
