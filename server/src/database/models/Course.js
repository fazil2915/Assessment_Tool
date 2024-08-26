import mongoose, { Schema } from "mongoose"

const Course=new mongoose.Schema({
    id:{
        type:Schema.Types.ObjectId,
        required:true
    },
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
        type:String
    },
    teacher:{
        type:Schema.Types.ObjectId,ref:'Teacher',
        required:true
    },
    timestamps:true

})

module.exports=mongoose.model('Course',Course)