// import dbConnect from "@/config/dbConnect"
// import SignIn from "@/schemas/signinSchema/SignIn"

import dbConnect from "@/config/dbConnect"
import SignIn from "@/schemas/signinSchema/SignIn";
import  NextResponse  from "next/server";
import moment from "moment";
import crypto from 'crypto'




// export const POST = async (req) => {

//     try {

//         dbConnect()


//     const body = req.json();

//     let userMail = body.mail;

//     if (!userMail) {
//         throw new Error("please enter a valid email");

//     }

//     let findUser = await SignIn.findOne({ mail: userMail })
//     if (!findUser) {
//         throw new Error("user not found, please enter a valid email");
//     }

//     let resetToken = crypto.randomBytes(10).toString('hex');
//     let resetTokenExpiration = moment().add(1, "hour").toDate();

//     resetToken = findUser.reset_token;
//     resetTokenExpiration = findUser.reset_token_expiration;

//     await findUser.save()

//     let transporter = nodemailer.createTransport({
//         host: process.env.EMAIL_HOST,
//         port: process.env.EMAIL_PORT,
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIl_PASS,
//         }
//     })

//     let resetLink = `${process.env.NEXTAUTH_URL}/forget_password/?token=${resetToken}`

//     let mailOptions = {
//         from : process.env.EMAIL_USER,
//         to: userMail,
//         subject : "Password Reset",
//         html: `Please click <a href="${resetLink}">here</a> to reset your password.`
//     }

//     const sended = await transporter.sendMail(mailOptions);

//     if (!sended) {
//         throw new Error("Mail not send, something went wrong")
//     }

//     return NextResponse.json({message: "mail successfully sended"})

// } catch (error) {
//     console.log("Error", error);
//     return NextResponse.json({message: "something went wrong"})
// }


// }

// export const GET = async (req) => {
//     return NextResponse.json({message:"get post called"})
// }


// forgetPassword.js

// import dbConnect from "@/config/dbConnect";
// import SignIn from "@/schemas/signinSchema/SignIn";
// import nodemailer from 'nodemailer';
// import moment from "moment";
// import crypto from 'crypto';
// import NextResponse from "next/server";

// export const POST = async (req) => {
//     try {
//         await dbConnect();

//         const body = await req.json();
//         const userMail = body.email;

//         if (!userMail) {
//             throw new Error("Please enter a valid email");
//         }

//         const findUser = await SignIn.findOne({ email: userMail });
//         if (!findUser) {
//             throw new Error("User not found. Please enter a valid email");
//         }

//         let resetToken = crypto.randomBytes(10).toString('hex');
//         let resetTokenExpiration = moment().add(1, "hour").toDate();

//         resetToken = findUser.reset_token;
//         resetTokenExpiration = findUser.reset_token_expiration;
//         await findUser.save();

//         const transporter = nodemailer.createTransport({
//             host: process.env.EMAIL_HOST,
//             port: process.env.EMAIL_PORT,
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             }
//         });

//         const resetLink = `${process.env.NEXTAUTH_URL}/forget_password/?token=${resetToken}`;

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: userMail,
//             subject: "Password Reset",
//             html: `Please click <a href="${resetLink}">here</a> to reset your password.`
//         };

//         const sent = await transporter.sendMail(mailOptions);

//         if (!sent) {
//             throw new Error("Mail not sent. Something went wrong");
//         }

//         return NextResponse.json({ message: "Mail successfully sent" });
//     } catch (error) {
//         console.error("Error:", error);
//         return NextResponse.json({ message: "Something went wrong" });
//     }
// };

// export const GET = async (req) => {
//     return NextResponse.json({ message: "GET request called" });
// };


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
       const passwordResetExpi = Date.now() + 3600000;
       
       existUser.reset_token = passwordResetToken;
       existUser.reset_token_expiration = passwordResetExpi;

       const resetUrl = `${process.env.NEXTAUTH_URL}/forget_password/?token=${resetToken}`


       console.log(resetUrl);



    } catch (error) {
        
    }
}