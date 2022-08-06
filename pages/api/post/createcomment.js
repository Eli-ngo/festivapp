import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res){
    if(req.method === "POST"){
        const { content, post_id, user_id } = req.body
        const comment = await prisma.comment.create({
            data: {
                content,
                post_id,
                user_id
            }
        })
        res.status(200).json(comment)
    }else{
        res.status(500).json({
            message: "Method not allowed"
        })
    }
}