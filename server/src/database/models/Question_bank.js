import mongoose, { Schema } from "mongoose";

const Question_bank=new mongoose.Schema({
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
    
    timestamps:true

})


module.exports=mongoose.model('Question_bank',Question_bank);