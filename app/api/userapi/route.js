import dbConnect from "@/config/dbConnect";
import User from "@/schemas/userSchema/User";
import { NextResponse } from "next/server";


dbConnect()

export const POST = async (req) => {


    try {
        let body = await req.json();
        console.log("body", body);
        if (body.name && body.lastname) {
            let newUsers = new User(body);
            await newUsers.save();
            return NextResponse.json({ message: "Successful upload" });
        }
        return NextResponse.json({ message: "all params are required" })

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Something went wrong", error });
    }
}


export const GET = async (req) => {
    try {
        
        const users = await User.find();

        
        return NextResponse.json({ users });
    } catch (error) {
        console.error("Error:", error);
        
        return NextResponse.json({ message: "Something went wrong", error });
    }
};

export const DELETE = async (req) => {
    try {
        let body = await req.json();
        if (body.id) {
            await User.deleteOne({
                _id: body.id
            });
            return NextResponse.json({ message: "Successfully deleted" });
        } else {
            return NextResponse.json({ message: "ID is required for deletion" });
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Something went wrong", error });
    }
};




export const PUT = async (req) => {
    try {
        let body = await req.json();
        if (body.name && body.lastname) {
            const result = await User.findByIdAndUpdate({_id:body.id}, { 
                name: body.name, 
                lastname: body.lastname 
            });
            console.log(result);
            return NextResponse({message:"Successfully updated"})
        }
    } catch (error) {
        console.log("Error",error);
        return NextResponse({message:"something went wrong in update function"})

    }
}



