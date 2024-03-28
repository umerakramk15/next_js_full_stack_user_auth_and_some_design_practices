import { connectDB } from "@/db/dbConfig";
import User from "@/models/userModel";
import {NextRequest,NextResponse} from "next/server"
import bycryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connectDB()

export async function POST(req :NextRequest) {
  try {
    const  reqBody = await req.json()
  const {email,password}  =  reqBody
  // validation
    console.log(reqBody);

    const user = await User.findOne({email})
    if(user){
      return NextResponse.json({error : "User Exsist"},{status : 400});
    }

    console.log("User Exsist")

    const validPassword = await bycryptjs.compare(password,user.password)

    if(!validPassword){
      return NextResponse.json({error : "User Password wrong "},{status : 400});
    }


    const tokenData = {
      id:user._id,
      username:user.username,
      email:user.email,
    }

    if (!process.env.TOKEN_SECRET) {
      throw new Error('TOKEN_SECRET is not defined in the environment variables.');
    }
    
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET,{expiresIn : '1d'});

    const response = NextResponse.json({
      message : 'Logged in Successsfull',
      success:true
    })

    response.cookies.set("token", token,{
      httpOnly : true
    })

    return response
    

  } catch (error:any) 
  {
    console.log(error)
    return NextResponse.json({
      error: error.message
    },{status:500})
  }
}