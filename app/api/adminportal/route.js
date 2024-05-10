// import dbConnect from "@/config/dbConnect";
// import bookSchema from "@/schemas/bookstoreSchema/bookSchema";
// import { NextResponse } from "next/server";

// export async function GET(req,con)  {

//     await dbConnect()
//     try {
//         const body = con.params;
//         console.log('body :>> ', body);
//         const userId = body.userId; 
//         console.log('userId :>> ', userId);
//        const  books = await bookSchema.find({userid : userId})

//         return NextResponse.json({message : "books are fetch",books})

//     } catch (error) {
//         console.log('error :>> ', error);
//         return NextResponse.json({message : "books are not fetch",})

//     }
// }

// pages/api/books/[userId].js

import dbConnect from "@/config/dbConnect";
import bookSchema from "@/schemas/bookstoreSchema/bookSchema";
import { NextResponse } from "next";

export async function GET(req) {
    await dbConnect();
    try {
        const userId = req.query.userId; // Access userId from query string
        console.log('userId :>> ', userId);
        if (!userId) {
            return NextResponse.json({ message: "User ID is missing in the request" });
        }
        const books = await bookSchema.find({ userid: userId });
        return NextResponse.json({ message: "Books fetched", books });
    } catch (error) {
        console.log('Error:', error);
        return NextResponse.json({ message: "Books could not be fetched" });
    }
}
