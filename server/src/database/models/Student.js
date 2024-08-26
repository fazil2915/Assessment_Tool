import mongoose from "mongoose"

const StudentSchema= new mongoose.Schema({
id:{
    type:String,
    required:true
},
name:{
    type:String,
    required:true,
    max:50
},
Role:{
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
module.exports=mongoose.model('Student',StudentSchema);