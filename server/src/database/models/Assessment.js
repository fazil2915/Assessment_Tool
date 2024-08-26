import mongoose, { Schema } from "mongoose"

const AssessmentSchema=new mongoose.Schema({
    ass_id:{
        type:String,
        requied:true
    },
    title:{
        type:String,
        required:true
    },
    instructuion:{
        type:String,
        required:true
    },
    tags:{
        type:String, enum:['quiz','Assignment','Excersise'], 
        required:true
    },
    grading_options: {
        type: { type: String, enum: ['Automated', 'Manual'], required: true },
        Criteria: { type: String } // Specific criteria for grading
    },
    question_bank:
        {
            type:Schema.Types.ObjectId, ref:'Question_bank',
            required:true
        }
    ,
    course:{
        type:Schema.Types.ObjectId, ref:'Course',
        required:true
    },
    visibility:[
        {
            type:Schema.Types.ObjectId,ref:'Student',
            required:true
        }
    ],
   
    status:{
        type:String,
        enum:['Draft','Published'],default:'Draft'
    },
    attempt:{
        type:Number,
        default:1
    },
    feedback:{
     type:Schema.Types.ObjectId,ref:"Feedback",
     type:String ,enum:['Immediate','Delayed','None'], default:'Immediate',
     required:true
    },
    recent_Activities:{
    acion:{type:String,enum:['Submission','FeedbackGiven']},
    timestamp:true,
    performed_by:{type:Schema.Types.ObjectId,ref:"User"}
    },
    sheduled_at:Date,
    Due:Date,
    Time_limit:Number,  
    timestamps:true,
})

const Assessment=mongoose.model('Assessment',AssessmentSchema);