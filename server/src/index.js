import express from "express";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import logger from "./utils/logger.js"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import connectDb from "./database/connect.js";
import TeacherRoutes from "./routes/Teacher.js"
import StudentRoutes from "./routes/Student.js"
//configuration
const app=express();
dotenv.config()

const corsOptions = {
  origin: process.env.frontend, 
  methods: ['GET', 'POST','PATCH','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

//Routes
const morganFormat = ":method :url :status :response-time ms";
app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );

app.use(express.json());
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
//api  
app.use('/api/teacher',TeacherRoutes)
app.use('/api/student',StudentRoutes)
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
    process.exit(1);
}
}
startServer()
