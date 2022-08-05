import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res){
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            image:true,
            description:true,
            user:{
                select: {
                    username:true,
                }
            }
        },
        orderBy: {
            updatedAt: 'desc'
        }
    })
    res.status(200).json(posts)
}