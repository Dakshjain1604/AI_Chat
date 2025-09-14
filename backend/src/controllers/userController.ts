import express,{Request,Response} from "express";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const JWT_SECRET=process.env.JWT_SECRET as string;

export const SignupUser=async (req:Request,res:Response)=>{
        const email=req.body.email;
        const name=req.body.name;
        const password=req.body.password;
        if (!email || !name) {
            return res.status(400).json({ message: "Name and email are required" });
        }
        const foundUser=await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(foundUser){
            return res.status(400).json({
                message:"User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 3); 
        const user=await prisma.user.create({
            data:{
                name:name,
                email:email,
                password:hashedPassword,
            }
        })
        return res.status(200).json({
            message:"User Sucessfully created",
            id:user.id

        })   
};

export const SigninUser=async (req:Request,res:Response)=>{
    try{const email=req.body.email;
    const password=req.body.password;
    if(!email || !password){
        return res.status(400).json({
            message:"Email and Password Required"
        })
    }
    const foundUser=await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if(!foundUser){
        return res.status(400).json({
            message:"User Not Found! Check Credentials Or SignUp"
        })
    }
    const isMatch=await bcrypt.compare(password,foundUser.password)
    if(!isMatch){
        res.status(400).json({
            message:"Invalid Password"
        })
    }
    const token = jwt.sign(
        { id: foundUser.id, email: foundUser.email },
        JWT_SECRET,
      );

      return res.status(200).json({
        message: "Login successful",
        token
      });}

      catch(error){
            return res.status(500).json({
                message:"Server Error",
                error
            });
      }
}