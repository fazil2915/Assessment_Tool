import express from "express"
import {verifyToken} from "../middleware/auth.js"
import {register,login} from "../controller/auth.js"
import { createCourse,
         createAsessment,
         updateAssessment,
         deleteAssessment,
         addResource,
         getAssessment,
         createQuestion,
         getQuestions
          } from "../controller/Teacher.js"
const router=express.Router()


router.post('/register',register);
router.post('/login',login)
router.post('/course',verifyToken,createCourse)
router.post("/assessment/:id",verifyToken,createAsessment)
router.put('/assessment/:id/addresource',verifyToken,addResource)
router.put('/assessment/:id/update',verifyToken,updateAssessment)
router.delete("/assessment/:id/delete",verifyToken,deleteAssessment)
router.get('/assessment/:id/getassessment',verifyToken,getAssessment)
router.post('/assessment/:id/createQuestion',verifyToken,createQuestion)
router.get("/assessment/getAllQuestion",verifyToken,getQuestions)
export default router;