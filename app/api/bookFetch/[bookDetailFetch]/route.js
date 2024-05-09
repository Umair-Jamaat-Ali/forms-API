import dbConnect from "@/config/dbConnect";
import bookSchema from "@/schemas/bookstoreSchema/bookSchema";
import { NextResponse } from "next/server";

export async function GET(params, content)  {

    await dbConnect()
    try {

        const body = content.params.bookDetailFetch;
        // console.log('body', body);

        const books = await bookSchema.find({_id:body})
        // console.log(books)

        return NextResponse.json({"result" : books, success: true}, {status: 200})

    } catch (error) {
        console.log('error :>> ', error);
        return NextResponse.json({message : "books are not fetch", success:false}, {status: 400})
    }
}