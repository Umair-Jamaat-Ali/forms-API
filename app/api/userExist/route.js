import dbConnect from "@/config/dbConnect";
import SignIn from "@/schemas/signinSchema/SignIn";
import { NextResponse } from "next/server";




export async function POST (req) {
    try {
        await dbConnect()
        const {email} = await req.json();
       const existUser = await SignIn.findOne({email}).select("_id");
        console.log("existUser",existUser);
        return NextResponse.json({existUser})
    } catch (error) {
        console.log("error".error);
    }
}
 export async function GET() {
    return NextResponse.json({message:"get post called"})
 }