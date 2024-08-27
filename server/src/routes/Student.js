import express from "express"
import { Student_login,Student_register } from "../controller/auth.js";
import { getAssessment } from "../controller/Student.js";
import {verifyToken} from "../middleware/auth.js"
const router=express.Router()

router.post('/register',Student_register)
router.post('/login',Student_login)
router.get('/assessment/visibility/:id',verifyToken,getAssessment)

export default router;