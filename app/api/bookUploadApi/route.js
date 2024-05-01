import dbConnect from "@/config/dbConnect"
import bookSchema from "@/schemas/bookstoreSchema/bookSchema";
import SignIn from "@/schemas/signinSchema/SignIn";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    await dbConnect()

    try {
        const body = await req.json();
        console.log("body",body);

        let user = null;
        if (body.userid) {
            user = await SignIn.findById(body.userid)
    console.log("user",user);

    if (!user) {
        throw new Error ("user is not found")
    }
        }

        if (body.userid && body.title && body.author && body.price && body.category && body.description && body.img) {
            const addBooks = await bookSchema.create({
                title: body.title,
                author : body.author,
                price : body.price,
                category : body.category,
                description: body.description,
                img : body.img,
                userid : body.userid
            })
            console.log("addBooks",addBooks);
            return NextResponse.json({message : "data successfully uploaded"})
        }
    } catch (error) {
        console.log("error",error);
        return NextResponse.json({message : "something went wrong to upload images uploaded"})
        
    }
}


export const GET = async (req) => {
    return NextResponse.json({message : "Get request called"})

}