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
    }
    

},{timestamps:true})

const Submission=mongoose.model('Submission',SubmissionSchema)
export default Submission