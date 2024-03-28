import { connectDB } from "@/db/dbConfig";
import User from "@/models/userModel";
import {NextRequest,NextResponse} from "next/server"
import bycryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDatafromToken";

connectDB()

export async function POST(req :NextRequest) {
  try {
    // extract data from token 
    const userId = await getDataFromToken(req);

    const user = User.findOne({_id:userId}).select("-password")

    // if()  condition for save side 
    return NextResponse.json({
      message : 'User found',
      data:user
    },{status : 200})
    

  }catch (error:any) 
  {
    console.log(error)
    return NextResponse.json({
      error: error.message
    },{status:500})
  }
}