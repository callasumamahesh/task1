import { NextResponse } from "next/server";
import users from "@/app/models/usermodel";
import connectToDatabase from "@/app/lib/database";

export async function POST(req){
    let {email,password} = await req.json();
    connectToDatabase()
    try {
        const isuser = await users.find({email}).limit(1);
        if(!isuser || isuser === null){

            return NextResponse.json({message:'User Not Found'})
        }
        else{
            if(isuser[0].password != password){
                return NextResponse.json({message:'check Your Password Once'})
            }
            else{
                return NextResponse.json({message:'user Go'})
            }
        }
    } catch (error) {
        return NextResponse.json({message:'Something Wrong'})
    }
}
