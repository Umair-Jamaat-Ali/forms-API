import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const signInSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        maxLength: [200, "Too much length"],
        minLength: [5, "Too short length"],
        trim:true
    },
    email:{
        type: String,
        required:true,
        maxLength:[200, "Too much length"],
        minLength: [15, "Too short length"],
        trim:true,
        unique:true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email",
        ],
        lowercase: true
    },
    password: {
        type: String,
        maxLength: [200, "Too much length"],
        trim: true,
        required: [true, "password is required"],
      },
},{timestamps:true})

signInSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });

  export default mongoose.models.signIn || mongoose.model("signIn", signInSchema);