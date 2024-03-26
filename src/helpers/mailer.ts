
import nodemailer from "nodemailer"



export const sendEmail = async ({email,emailType,userId}:any)=>{
  try {
    // TODO : Configure mail for usage 
    


    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOptions={
      from: 'umer.akramk15@gmail.com', 
    to: email, 
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset Your Password",
    html: "<b>Hello world?</b>", // html body
    }

    const mailRespose = await transporter.sendMail(mailOptions)

    return mailRespose

  } catch (error:any) {
    throw new Error(error.message)
  }
}