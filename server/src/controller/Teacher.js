import {Course, Teacher} from "../database/index.js"


export const createCourse=async (req,res)=>{
    try {
      const{
        title,
        description,
        resources,
        teacher
      } =req.body 
      const newCourse=await new Course({
        title,
        description,
        resources,
        teacher
      });
      const savedCourse= await newCourse.save()

      res.status(201).json(savedCourse);
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}