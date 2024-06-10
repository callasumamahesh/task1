// import { NextResponse } from "next/server";
// import users from "@/app/models/usermodel";
// import connectToDatabase from "@/app/lib/database";

// export async function POST(req){
//     try {
//         await connectToDatabase();
//         if(req.method === 'POST'){
//             const {userEmail} = await req.json();
//             let FindingUser = await users.find({email : userEmail}).limit(1)
//             console.log(FindingUser[0].cart);
//             if (FindingUser) {
//                 console.log('else from')
//                 cartItems = FindingUser[0].cart;
//                 console.log(FindingUser[0].cart);
//                 return NextResponse.json({cartItems});
//             }
//             else{ 
//                 return NextResponse.json({ message: 'User not found' }, { status: 404 });
//             }
//         }
//         else{
//             console.log('else from else')
//             return NextResponse.json({message:'Invalid Request'})
//         }
        
//     } catch (error) {
//         return NextResponse.json({message:'Somethingss Wrong'})
//     }
// }

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
    console.log(cartItems);
    return NextResponse.json({ cartItems });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}