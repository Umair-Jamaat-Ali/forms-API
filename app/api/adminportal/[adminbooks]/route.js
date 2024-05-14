import dbConnect from "@/config/dbConnect";
import bookSchema from "@/schemas/bookstoreSchema/bookSchema";

import { NextResponse } from "next/server";

const ImageKit = require("imagekit");



const imageKit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATEKEY,
  urlEndpoint: process.env.URLENDPOINT,
});


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


// export async function DELETE  (req)  {
// await dbConnect()

// try {
//     const body = await req.json();
//     console.log('body :>> ', body);
//     const id = body.id;
//     console.log('id :>> ', id);

//     const deleteBook = await bookSchema.findByIdAndDelete({_id : id}) 
//     console.log(deleteBook)
//     if(deleteBook){
//         const res = await imageKit.deleteFile({imgs_url : id});
//         console.log('res :>> ', res);
//     }

//     return NextResponse.json({message: "Book are delete", deleteBook})
// } catch (error) {
//     console.log('error :>> ', error);
//     return NextResponse.json({message: "Book are not delete"})
    
// }
// }

export async function DELETE(req) {
    await dbConnect();

    try {
        const body = await req.json();
        const id = body.id;

        const deleteBook = await bookSchema.findByIdAndDelete({_id: id});
        
        // if (!deleteBook) {
        //     return NextResponse.json({ message: "Book not found", success: false }, { status: 404 });
        // }

        // Delete image from ImageKit
        const res = await imageKit.deleteFile({ fileId: id }); // Assuming file_id is the correct parameter
        console.log('res :>> ', res);

        return NextResponse.json({ message: "Book deleted successfully", success: true });
    } catch (error) {
        console.log('error :>> ', error);
        return NextResponse.json({ message: "An error occurred while deleting the book", success: false });
    }
}


