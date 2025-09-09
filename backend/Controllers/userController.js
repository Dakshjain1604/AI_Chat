const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const { User } = require('../Schema/db');


exports.userRegister=async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    console.log(username,password,firstname,lastname)
    const findUser=await User.find({
        username:req.body.username
    })
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