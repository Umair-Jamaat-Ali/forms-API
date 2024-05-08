import dbConnect from "@/config/dbConnect";
import bookSchema from "@/schemas/bookstoreSchema/bookSchema";
import { NextResponse } from "next/server";

export async function GET(request)  {

    await dbConnect()
    try {


        // let books = {
        //     title : 1,
            
        // }

        const books = await bookSchema.find()

        return NextResponse.json({message : "books are fetch",books})

    } catch (error) {
        console.log('error :>> ', error);
        return NextResponse.json({message : "books are not fetch",})

    }
}