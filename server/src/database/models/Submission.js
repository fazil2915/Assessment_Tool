import mongoose, { Schema } from "mongoose";

const SubmissionSchema=new mongoose.Schema({
    student_id:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    grade:{
        type:Number
    },
    answer:[{
        questionId:{type:String},
        selectedOption:{type:String}
    }],
    assessment:{
        type:Schema.Types.ObjectId,ref:"Assessment",required:true
    }
    

},{timestamps:true})

const Submission=mongoose.model('Submission',SubmissionSchema)
export default Submission