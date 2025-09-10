const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const { User } = require('../Schema/db');
const zod= require('zod');



// const signupBody = zod.object({
//     username: zod.string().email(),
//     firstname: zod.string(),
//     lastname: zod.string(),
//     password: zod.string(),
//   });
exports.userRegister=async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;

    // const parsed = signupBody.safeParse(req.body);
    console.log(req.body.username,req.body.password,req.body.firstname,req.body.lastname)
    const findUser=await User.find({
        username:req.body.username
    })
    if(findUser){
        res.status(400).json({
            message:"email already taken "
        })
    }
    if(!findUser){
        const Hashedpassword=bcrypt.hash(password,3);
        const findUser=await User.create({
            username,
            Hashedpassword,
            firstname,
            lastname
        })
        res.status(200).json({
            message:"user Created Sucessfully",
            userId:findUser._id
        })
    }
    res.status(404).json({
        message:error.message
    })
}