import express from "express"
import { SigninUser, SignupUser } from "../controllers/userController";
const router=express.Router();



router.post('/signup',SignupUser);
router.post('/signin',SigninUser);

export default router;
