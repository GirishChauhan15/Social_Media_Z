import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        clerkId:{
            type:String,
            required:true,
            unique:true
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        image:{
            type:String,
        }
    },
    {
        timestamps:true
    }
)

export const User = mongoose.model("User", userSchema)