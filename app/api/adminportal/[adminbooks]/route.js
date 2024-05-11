import dbConnect from "@/config/dbConnect";
import bookSchema from "@/schemas/bookstoreSchema/bookSchema";
import { NextResponse } from "next/server";

export async function GET(req,con)  {

    await dbConnect()
    try {
        const id = con.params.adminbooks;
        
        
        // console.log('body :>> ', body);
        // const userId = body.userId; 
        // console.log('userId :>> ', userId);
        const  books = await bookSchema.find({userid : id})
        
        return NextResponse.json({message : "books are fetch", body: books, success: true} , {status: 200})
        
    } catch (error) {
        console.log('error :>> ', error);
        return NextResponse.json({message : "books are not fetch",})

    }
}


