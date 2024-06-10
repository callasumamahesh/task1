import { NextResponse } from "next/server";
import users from "@/app/models/usermodel";

export async function POST(req){
    if(req.method === 'POST'){
        try {
            const {userEmail,id,title,price, description, category, image,rating} = await req.json()
            console.log(userEmail,id,title,price, description, category, image,rating);
            let FindingUser = await users.findOne({email : userEmail}).limit(1)
            if (!FindingUser) {
                return NextResponse.json({ message: 'User not found' }, { status: 404 });
            }
            else{ 
                console.log(FindingUser) 
                await FindingUser.cart.push({id,title,price, description, category, image,rating})
                await FindingUser.save()
                console.log('Good'); 
                return NextResponse.json({message:'Product Added'})
            }
        } catch (error) {
            return NextResponse.json({message:'Product not added to the cart'})
        }
    }
    else{
        return NextResponse.json({message : 'Request is not matching'})
    }
}