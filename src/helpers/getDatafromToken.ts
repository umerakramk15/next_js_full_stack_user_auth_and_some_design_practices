import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const getDataFromToken = (req:NextRequest)=>{
  try {
    const token = req.cookies.get("token")?.value;
    if (!process.env.TOKEN_SECRET) {
      throw new Error('TOKEN_SECRET is not defined in the environment variables.');
    }
    
     const decodedToken:any = jwt.verify(token!, process.env.TOKEN_SECRET);

     return decodedToken.id


  } catch (error:any) {
    throw new Error("Error in Get data from token")  }

  
}