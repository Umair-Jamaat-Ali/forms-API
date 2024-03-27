import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
    },
}, {timestamps: true})

export default mongoose.models.User || mongoose.model("User", userSchema)