import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
    //only POST method is accepted
    if(req.method === "POST"){
        const { id, image, description } = req.body
        const post = await prisma.post.update({
            where: {
                id,
            },
            data: {
                createdAt,
                updatedAt,
                image,
                description,
            }
        })
        res.status(200).json(post)
    }
}