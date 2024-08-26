import mongoose, { Schema } from "mongoose";

const Question_bankSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    questions:[{
        type:Schema.Types.ObjectId, ref:'Question',
        required:true
    }],


},{
    timestamps:true
})


const Question_bank=mongoose.model('Question_bank',Question_bankSchema);
export default Question_bank