// services/userService.js

import prisma from "../prisma";


export const createUser=async(email)=>{
  return await prisma.user.create({
    data: { username },
  });
}

export const findUserById=async(id)=>{
  return await prisma.user.findUnique({
    where: { id },
  });
}


