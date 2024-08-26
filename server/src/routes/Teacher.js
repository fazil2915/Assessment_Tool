import express from "express"
import {verifyToken} from "../middleware/auth.js"
import {register,login} from "../controller/auth.js"
import { createCourse } from "../controller/Teacher.js"
const router=express.Router()


router.post('/register',register);
router.post('/login',login)
router.post('/course',verifyToken,createCourse)


export default router;