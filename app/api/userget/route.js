import connectToDatabase from "@/app/lib/database";
import users from "@/app/models/usermodel";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDatabase();
    if(req.method === 'POST') {
        try {
            const {email,password} = await req.json();
            const newUser = await users.create({email,password,cart:[]})
            await newUser.save()
            return NextResponse.json({message:'User Created'},{status : 201})
        } catch (error) {
            return NextResponse.json({message : 'Internals Server Error'},{status : 500})
        }
    }
    else{
        return NextResponse.json({message:'Method Not Matched'})
    }
}
