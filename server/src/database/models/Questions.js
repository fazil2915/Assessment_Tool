import mongoose, { Schema } from "mongoose"

const Question =new mongoose.Schema({

    Quest_id:{
        type:String,
        required:true
    },
    Text:{
      type:String,
      required:true
    },
    Type:{
     type:String,
     enum:['Multiple','True/False','short Answer','Essay'],required:true
    },
    Difficulty:{
        type:String,
        enum:['Easy','Medium','Hard'],required:true
    },
    Subject:{
        type:String,
        required:true
    },
    Category:{
        type:String,
    },
    Score:{
    type:Number
    },
    Options:[{
        option:{type:string},
        Is_Correct:{type:Boolean,default:false}
    }],
    Answer: { 
        type: Schema.Types.Mixed, 
        required: function() { return this.Type !== 'Essay'; } 
        // Mixed type to handle different types of answers (string for short answer, boolean for true/false, etc.)
    },
    teacher:{
        type:Schema.Types.ObjectId,ref:"Teacher",required:true
    },
    IsReusable:{
        type:Boolean,default:true
    }
})

module.exports=mongoose.model('Question',Question)