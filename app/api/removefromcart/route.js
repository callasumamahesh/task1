import { NextResponse } from "next/server";
import users from "@/app/models/usermodel";

export async function POST(req){
    try {
        if(req.method === 'POST'){
            const { id, userEmail } = await req.json();
            
            const IsUser = await users.findOne({ email: userEmail });
            if (!IsUser) {
                return NextResponse.json({ message: 'User not found' });
            }

            const updatedUser = await users.updateOne(
                { email: userEmail },
                { $pull: { cart: { id: id } } }
            );

            if (updatedUser.modifiedCount === 0) {
                return NextResponse.json({ message: 'Item not found in cart' });
            }
            return NextResponse.json({ message: 'Item Removed' });
        } else {
            return NextResponse.json({ message: 'Invalid Method' });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Error removing item' });
    }
}
