import mongoose, { Schema } from "mongoose";

const SubmissionSchema=new mongoose.Schema({
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

},{timestamps:true})

const Submission=mongoose.model('Submission',SubmissionSchema)
export default Submission