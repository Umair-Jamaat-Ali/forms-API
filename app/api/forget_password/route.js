// forgetPassword.js

import dbConnect from "@/config/dbConnect";
import SignIn from "@/schemas/signinSchema/SignIn";
const nodemailer = require('nodemailer');
import moment from "moment";
import crypto from 'crypto';
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export const POST = async (req) => {
    try {
        await dbConnect();

        const body = await req.json();
        const userMail = body.email;
        console.log("userMail",userMail);

        if (!userMail) {
            throw new Error("Please enter a valid email");
        }
        const findUser = await SignIn.findOne({ email: userMail }).maxTimeMS(30000); // 30 seconds
        console.log("findUser",findUser);
        if (!findUser) {
            throw new Error("User not found. Please enter a valid email");
        }

        let resetToken = crypto.randomBytes(10).toString('hex');
        let resetTokenExpiration = moment().add(1, "hour").toDate();
        
        findUser.reset_token = resetToken;
        findUser.reset_token_expiration = resetTokenExpiration;
        console.log("Reset Token", resetToken);
        console.log("Reset token Expiration", resetTokenExpiration);
        await findUser.save();

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            connectionTimeout: 10000, // 10 seconds
            greetingTimeout: 5000, // 5 seconds
            socketTimeout: 45000 // 45 seconds
        });

        console.log("transporter",transporter);

        const resetLink = `${process.env.NEXTAUTH_URL}/reset_password/?token=${resetToken}`;
        console.log("resetLink",resetLink);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userMail,
            subject: "Password Reset",
            html: `Please click <a href="${resetLink}">here</a> to reset your password.`
        };

        console.log("mailOptions",mailOptions);

        const sent = await transporter.sendMail(mailOptions);
        console.log("send",send);

        if (!sent) {
            throw new Error("Mail not sent. Something went wrong");
        }

        return NextResponse.json({ message: "Mail successfully sent" });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Something went wrong" });
    }
};

export const GET = async (req) => {
    return NextResponse.json({ message: "GET request called" });
};


export const PUT = async (req) => {
    try {
        let body = await req.json();
        console.log("body",body);
        let newPassword = body.password;
        let reset_token = body.token;
        console.log("newPassword",newPassword);
        console.log("reset_token",reset_token);

        if (!newPassword) {
            throw new Error("please provide valid new password");
          }
      
          if (!reset_token) {
            throw new Error("reset token required please proceed again");
          }
      
          const hashedPassword = await bcrypt.hash(newPassword, 10);

          const userFound = await SignIn.findOne({
            reset_token,
            reset_token_expiration:{$gt : Date.now()},
          })

          console.log("userFound",userFound);

          if (!userFound) {
            throw new Error ("User not found")
          }
          if (!hashedPassword) {
            throw new Error("Something went wrong in password")
          }

          let changePassword = await SignIn.updateOne(
            {reset_token},
            {$set:{password : hashedPassword,
            reset_token: "",
            reset_token_expiration : ""
            }}
          )

          console.log(changePassword)
          if (!changePassword) {
            throw new Error("Something went wrong");
          }

    return NextResponse.json({ message: "password has been updated" });

    } catch (error) {
        console.log("Error", error);
        return NextResponse.json({message: "Something went wrong"})
    }
};
