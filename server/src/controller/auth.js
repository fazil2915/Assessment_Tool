import {Teacher} from "../database/index.js"
import {Student} from "../database/index.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

//Teacher
//SignUp

export const register=async(req,res)=>{
    try {
        const{
            name,
            role,
            email,
            password
        }=req.body
        const salt=await bcrypt.genSalt();
        const hashedPassword=await bcrypt.hash(password,salt);

        const newTeacher=new Teacher({
        name,
        role,
        email,
        password:hashedPassword
        })
        const savedUser=await newTeacher.save();
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}

export const login=async (req,res)=>{
    try {
       const{email,password}=req.body; 
       const user=await Teacher.findOne({email:email});
       if(!user) return res.status(400).json({msg:"User doesnt exist"});
       
       const isMatch=await bcrypt.compare(password,user.password);
       if(!isMatch) return res.status(400).json({msg:"Invalid credential"});

       const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
       delete user.password;
       res.status(200).json({token,user});
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}

//student
//register
export const Student_register=async(req,res)=>{
    try {
        const{
            name,
            role,
            email,
            password
        }=req.body
        const salt=await bcrypt.genSalt();
        const hashedPassword=await bcrypt.hash(password,salt);

        const newTeacher=new Student({
        name,
        role,
        email,
        password:hashedPassword
        })
        const savedUser=await newTeacher.save();
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}

//login
export const Student_login=async (req,res)=>{
    try {
       const{email,password}=req.body; 
       const user=await Student.findOne({email:email});
       if(!user) return res.status(400).json({msg:"User doesnt exist"});
       
       const isMatch=await bcrypt.compare(password,user.password);
       if(!isMatch) return res.status(400).json({msg:"Invalid credential"});

       const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
       delete user.password;
       res.status(200).json({token,user});
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}