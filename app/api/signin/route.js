import dbConnect from "@/config/dbConnect";
import SignIn from "@/schemas/signinSchema/SignIn";
import { NextResponse } from "next/server";

dbConnect()
export const  POST= async(req) => {
    try {
        const body = await req.json();
        console.log("Body", body);
        if (body.name && body.email && body.password) {
            const newData =await SignIn.create({
                name: body.name,
                email: body.email,
                password: body.password
            })
            console.log("newData",newData);
            return NextResponse.json({message: "User successfully added"})
        }
    } catch (error) {
        console.log("Error", error);
        return NextResponse.json({message: "someThing went wrong"})
        
    }
    

}