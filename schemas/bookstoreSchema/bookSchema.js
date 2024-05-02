import mongoose from "mongoose";
import { model } from "mongoose";
const BookInfo= new mongoose.Schema({
    // bookinfo: {
    //     title: { type: String, required: [true,"Title is required"] },
    //     author: { type: String, required: [true,"Author name is required"] },
    //     description: { type: String, required:[true, "Please write description of book"] },
    //     // Add other relevant book information fields here
    //   },
    title:{
        type:String,
        required:[true,"Title is required"],
        maxLength: [200, "Too much length"],
        trim:true
    },
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:'users',
        required:[true,"user is required"]
    },
    author:{
        type:String,
        maxLength: [200, "Too much length"],
        trim:true,
        required:[true,"Author name is required"]
    },
    price:{
        type:Number,
        required:[true,"Price is required"],
        max: [200000000000000000, "Too much price"],
        trim:true
    },
    // slug:{

    // },
    category:{
        type:String,
        required:[true,"Please select category"],
        maxLength: [200, "Too much length"],
        trim:true
    },
    description:{
        type:String,
        required:[true, "Please write description of book"],
        maxLength: [200000, "Too much length"],
        trim:true
    },
    imgs_url:{
            type:String,
            default:[],
            required:[true, "Please add images"]
        },
     
},{ timestamps: true })

export default mongoose.models.books || mongoose.model("books",BookInfo);