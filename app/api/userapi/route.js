import dbConnect from "@/config/dbConnect";
import User from "@/schemas/userSchema/User";
import { NextResponse } from "next/server";


dbConnect()

export const GET = async (req) => {
    return NextResponse.json({ message: "get request called" })
}

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



// export const DELETE = async (req) => {
//     try {
//         let body = await req.json();
//         if(body.id){
//             await User.deleteone({
//                 _id:body.id
//             })
//             return NextResponse.json({ message: "Successful deleted" });
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         return NextResponse.json({ message: "Something went wrong", error })
//     }
// }

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




// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// const raw = JSON.stringify({
//   "id": "6603e3d1016259accf49c58a"
// });

// const requestOptions = {
//   method: "DELETE",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow"
// };

// fetch("http://localhost:3000/api/userapi", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));