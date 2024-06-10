import { NextResponse } from "next/server";
import users from "@/app/models/usermodel";
import connectToDatabase from "@/app/lib/database";

export async function POST(req){
    let {email,password} = await req.json();
    connectToDatabase()
    try {
        const isuser = await users.find({email}).limit(1);
        console.log('Good',isuser);
        if(!isuser || isuser === null){
            console.log('user not found')
            return NextResponse.json({message:'User Not Found'})
        }
        else{
            console.log(isuser[0].password,password)
            if(isuser[0].password != password){
                console.log('password incorrect');
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
