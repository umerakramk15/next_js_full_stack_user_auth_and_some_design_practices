import { connectDB } from "@/db/dbConfig";
import User from "@/models/userModel";
import {NextRequest,NextResponse} from "next/server"



connectDB()

export async function POST(req : NextRequest){
  try {
    const reqBody = await req.json()
    const {token} = reqBody;

    console.log(token)

    const user = await User.findOne({VerifyToken:token,VerifyTokenExpiry:{$gt:Date.now()}});

    if(!user){
      return NextResponse.json({
        error: "Invalid token detail"
      },{status:400})
    }

    console.log(user);

    user.isVerified = true
    user.VerifyToken = undefined
    user.VerifyTokenExpiry = undefined

    await user.save()

    return NextResponse.json({
      message : "Email Verified Successfully",
      success:true,

    },{status:200})

  } catch (error:any) {
    console.log(error)
    return NextResponse.json({
      error: error.message
    },{status:500})
  }
}

