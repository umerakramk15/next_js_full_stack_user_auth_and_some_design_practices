import { connectDB } from "@/db/dbConfig";
import User from "@/models/userModel";
import {NextRequest,NextResponse} from "next/server"
import bycryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";

connectDB()


export async function POST(request : NextRequest){
  try {
  const  reqBody = await request.json()
  const {username,email,password}  =  reqBody
  // validation
    console.log(reqBody);

    const user = await User.findOne({email})
    if(user){
      return NextResponse.json({error : "User Exsist"},{status : 400});
    }


    const salt = await bycryptjs.genSalt(10)
    const hasshedPassword = bycryptjs.hashSync(password,salt);

    const newUser =  new User({
      username,email,password:hasshedPassword
    })

    const savedUser = await newUser.save()


    console.log(savedUser);


    // send Verfication email

    await sendEmail({email,emailType : "VERIFY",userId : savedUser._id});

    return NextResponse.json({
      message : "User Register SuccessFully",
      success : true,
      savedUser,
    })


  } catch (error : any) {
    return NextResponse.json({error : error.message},{status : 500})
  }
}