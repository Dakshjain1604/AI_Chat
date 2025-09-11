const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const { User } = require('../Schema/db');
const zod= require('zod');

const signupBody = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string(),
  });
  exports.signupUser = async (req, res) => {
    // const parsed = signupBody.safeParse(req.body);
    // if (!parsed.success) {
  
    //   return res.status(411).json({
    //     message: "Incorrect inputs",
    //   });
    // }
    const username=req.body.username;
    const password=req.body.password;
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;

    const existingUser = await User.findOne({ username: username });
    console.log(existingUser)
    if (existingUser) {
      return res.status(411).json({
        message: "Email already taken",
      });
    }


    console.log(hashedPassword)
    
    const hashedPassword = await bcrypt.hash(password, 3);
    const createdUser = await User.create({
        username: username,
        password: hashedPassword,
        firstname: firstname,
        lastname: lastname,
    });
    
    console.log(createdUser)
  
    res.status(200).json({
      message: "User created successfully",
    });
  
  };