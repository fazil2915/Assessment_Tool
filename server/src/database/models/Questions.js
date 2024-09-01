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
    resources:{
     type:String
    },
    category:{
        type:String,
    },
    score:{
    type:Number,default:0
    },
    options:[{
        option:{type:String},
        is_Correct:{type:Boolean,default:false}
    }],
    answer: { 
        type:String
    },
    isReusable:{
        type:Boolean,default:true
    }
})

const Question=mongoose.model('Question',QuestionSchema)
export default Question