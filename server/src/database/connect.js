import mongoose from "mongoose";

const connectDb=(url)=>{
    mongoose.set("strictQuery",true);
    mongoose.connect(url)
    .then(()=>{
        console.log("database connected");
        
    }).catch((err)=>{
        console.log(err);
        console.log("database connection failed!!");
        
    })
}

export default connectDb;