const express=require("express");
const { userRegister } = require("../Controllers/userController");
const router=express.Router();


router.post('/signup',userRegister);



module.exports=router;