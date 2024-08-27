import express from "express"
import {verifyToken} from "../middleware/auth.js"
import {register,login} from "../controller/auth.js"
import { createCourse,
         createAsessment,
         upddateAssessment,
         addResource,
         getAssessment,
         createQuestion,
          } from "../controller/Teacher.js"
const router=express.Router()


router.post('/register',register);
router.post('/login',login)
router.post('/course',verifyToken,createCourse)
router.post("/assessment/:id",verifyToken,createAsessment)
router.put('/assessment/:id/addresource',verifyToken,addResource)
router.put('/assessment/:id/update',verifyToken,upddateAssessment)
router.get('/assessment/:id/getassessment',verifyToken,getAssessment)
router.post('/assessment/createQuestion',verifyToken,createQuestion)
export default router;