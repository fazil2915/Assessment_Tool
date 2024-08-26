import mongoose from "mongoose"

const StudentSchema= new mongoose.Schema({
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
const Student=mongoose.model('Student',StudentSchema);
export default Student