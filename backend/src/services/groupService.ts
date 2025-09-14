import prisma from "../prisma";


// Create a new group
export async function createGroup(name: string) {
  return await prisma.group.create({
    data: { name },
  });
}

// Add a user to a group
export async function addUserToGroup(groupId: number, userId: number) {
  return await prisma.groupMember.create({
    data: { groupId, userId },
  });
}

// Get all members of a group
export async function getGroupMembers(groupId: number) {
  return await prisma.groupMember.findMany({
    where: { groupId },
    include: { user: true }, // assuming groupMember has relation with User
  });
}
