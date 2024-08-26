import mongoose, { Schema } from "mongoose"

const CourseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    description:{
        type:String,
        default:'Title',
        max:100
    },
    resources:{
        type:String,
        max:50
    },
    teacher:{
        type:Schema.Types.ObjectId,ref:'Teacher',
        required:true
    },
    },
    {
    timestamps:true

})

const Course=mongoose.model('Course',CourseSchema)
export default Course