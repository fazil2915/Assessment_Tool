import mongoose, { Schema, trusted } from "mongoose";

const AssessmentSchema = new mongoose.Schema({
    teacher_id:{
    type:Schema.Types.ObjectId,
    required:true
    },
    title: {
        type: String,
        required: true
    },
    instruction: { // Fixed typo from 'instructuion' to 'instruction'
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['quiz', 'Assignment', 'Exercise'], // Fixed typo from 'Excersise' to 'Exercise'
        required: true
    },
    grading_options: {
        type: { type: String, enum: ['Automated', 'Manual'], required: true },
        Criteria: { type: String } // Specific criteria for grading
    },
    question_bank: [{
        type: Schema.Types.ObjectId,
        ref: 'Question',
        
    }],
    attachment: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        
    },
    visibility: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true
        }
    ],
    status: {
        type: String,
        enum: ['Draft', 'Published'],
        default: 'Draft'
    },
    attempt: {
        type: Number,
        default: 1
    },
    feedback: { // Corrected the feedback field
        type: String,
        enum: ['Immediate', 'Delayed', 'None'],
        default: 'Immediate',
        required: true
    },
    recent_Activities: { // Fixed the structure here
        action: { type: String, enum: ['Submission', 'FeedbackGiven'] },
        timestamp: { type: Date, default: Date.now },
        performed_by: { type: Schema.Types.ObjectId, ref: "User" }
    },
    scheduled_at: { type: Date, default: null },
    due: { type: Date },
    isArchived:{type:Boolean,default:false},
    time_limit: Number,
}, {
    timestamps: true 
});

const Assessment = mongoose.model('Assessment', AssessmentSchema);
export default Assessment;
