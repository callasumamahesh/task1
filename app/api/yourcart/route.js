import { NextResponse } from "next/server";
import users from "@/app/models/usermodel";
import connectToDatabase from "@/app/lib/database";

export async function POST(req) {
  try {
    await connectToDatabase();

    if (req.method !== 'POST') {
      return NextResponse.json({ message: 'Invalid Request' }, { status: 405 });
    }

    const { userEmail } = await req.json();
    const user = await users.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const cartItems = user.cart;
    return NextResponse.json({ cartItems });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}