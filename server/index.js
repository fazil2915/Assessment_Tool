import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/connect.js";


//configuration
const app=express();
dotenv.config()

//server
const startServer=()=>{
    try{
connectDb(process.env.Mongo_url);
app.listen(process.env.PORT||5000,()=>{
    console.log(`server running on http://localhost:${process.env.PORT}`);
})
}
catch (error){
    console.log(err);
}
}
startServer()