import dbConnect from "@/config/dbConnect"
import SignIn from "@/schemas/signinSchema/SignIn";
import  {NextResponse}  from "next/server";
import moment from "moment";
import crypto from 'crypto'


export const POST = async (req) => {
    try {
       await dbConnect();
        let {email} = await req.json()

       let existUser = await SignIn.findOne({email})
       console.log(existUser);

       if (!existUser) {
            return NextResponse.json({message:"user don't exist", status : 400})
       }

       const resetToken = crypto.randomBytes(20).toString('hex');
       const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
       const passwordResetExpiry = Date.now() + 3600000;
       
       existUser.reset_token = passwordResetToken;
       existUser.reset_token_expiration = passwordResetExpiry;

       const resetUrl = `${process.env.NEXTAUTH_URL}/forget_password/?token=${passwordResetToken}`


       console.log(resetUrl);

       const body = "Reset password by clicking on following url" + resetUrl;

       const msg = {
        to: email,
        from: process.env.EMAIL_USER,
        subject: "Reset Password",
        text: body
       }


    return NextResponse.json({message:"post request call"})

    } catch (error) {
        
    }
}

export const GET = async (req) => {
    return NextResponse.json({message:"get request call"})
}
