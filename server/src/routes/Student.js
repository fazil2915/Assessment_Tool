import express from "express"
import { Student_login,Student_register } from "../controller/auth.js";
const router=express.Router()

router.post('/register',Student_register)
router.post('/login',Student_login)
export default router;