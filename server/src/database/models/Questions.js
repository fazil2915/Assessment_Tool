import mongoose, { Schema } from "mongoose"

const QuestionSchema =new mongoose.Schema({

    
    text:{
      type:String,
      required:true
    },
    type:{
     type:String,
     enum:['Multiple','True/False','short Answer','Essay'],required:true
    },
    difficulty:{
        type:String,
        enum:['Easy','Medium','Hard'],required:true
    },
    subject:{
        type:String,
        required:true
    },
    category:{
        type:String,
    },
    score:{
    type:Number
    },
    options:[{
        option:{type:String},
        is_Correct:{type:Boolean,default:false}
    }],
    answer: { 
        type:String
    },
    teacher_id:{
        type:Schema.Types.ObjectId,ref:"Teacher",required:true
    },
    isReusable:{
        type:Boolean,default:true
    }
})

const Question=mongoose.model('Question',QuestionSchema)
export default Question