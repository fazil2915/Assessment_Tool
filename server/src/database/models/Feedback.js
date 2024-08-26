import mongoose, { Schema } from "mongoose";

const FeedbackSchema=new mongoose.Schema({
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
},{
    timestamps:true
})

const Feedback=mongoose.model('Feedback',FeedbackSchema)
export default Feedback