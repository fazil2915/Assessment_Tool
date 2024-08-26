import mongoose from "mongoose"

const TeacherSchema= new mongoose.Schema({

name:{
    type:String,
    required:true,
    max:50
},
role:{
    required:true,
    type:String,
},
email:{
    type:String,
    required:true,
    max:50
},
password:{
type:String,
min:5
}

})
const Teacher=mongoose.model('Teacher',TeacherSchema);
export default Teacher;