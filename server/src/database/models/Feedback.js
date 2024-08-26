import mongoose, { Schema } from "mongoose";

const Feedback=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    description:{
    type:String,
    required:true
    },
    Submission:{
        type:Schema.Types.ObjectId,ref:"Submission",
        required:true
    },
    Student:[
        {
            type:Schema.Types.ObjectId,ref:"Student",
            required:true
        }
    ]
})


module.exports=mongoose.model('Feedback',Feedback)