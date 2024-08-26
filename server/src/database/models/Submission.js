import mongoose, { Schema } from "mongoose";

const Submission=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    assessment:{
        type:Schema.Types.ObjectId,ref:"Assessment",required:true
    },
    student_id:{
        type:Schema.Types.ObjectId,ref:"Student",
        required:true
    },

})

module.exports=mongoose.model('Submission',Submission)