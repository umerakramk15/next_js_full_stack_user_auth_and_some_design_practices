import  bycryptjs  from 'bcryptjs';

import User from "@/models/userModel";
import nodemailer from "nodemailer"



export const sendEmail = async ({email,emailType,userId}:any)=>{
  try {
    const hashedToken = await  bycryptjs.hash(userId.toString(),10)


    // TODO : Configure mail for usage 
    if(emailType === 'VERIFY'){
      await User.findByIdAndUpdate(userId,{VerifyToken:hashedToken,VerifyTokenExpiry:Date.now() + 3600000})
    }else if(emailType === 'RESET'){
      await User.findByIdAndUpdate(userId,{forgetPasswordToken:hashedToken,forgetPasswordTokenExpiry:Date.now() + 3600000})
    }


    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2446d2f879441c",
        pass: "ffc3dc8e92cd74"
      }
    });

    const mailOptions={
      from: 'umer.akramk15@gmail.com', 
    to: email, 
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset Your Password",
    html: emailType === "VERIFY" ? `<p>Click <a href = "${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to ${emailType==="VERIFY" ? "verify your email" : "reset your email"} or copy and paste the link below in your browser <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>` : `<p>Click <a href = "${process.env.DOMAIN}/resetpassword?token=${hashedToken}">Here</a> to ${emailType==="VERIFY" ? "verify your email" : "reset your email"} or copy and paste the link below in your browser <br> ${process.env.DOMAIN}/resetpassword?token=${hashedToken}</p>`, // html body
    }

    const mailRespose = await transport.sendMail(mailOptions)

    return mailRespose

  } catch (error:any) {
    throw new Error(error.message)
  }
}