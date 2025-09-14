import prisma from "../prisma";

export const saveMessage=async(userId,room,message)=>{
    return await prisma.message.create({
        data:{
            userId,
            room,
            text:message
        },
    });
}



export const getMessage=async (room)=>{
    return await prisma.message.findMany({
        where:{room},
        orderBy:{createdAt:"asc"},
    })
}


