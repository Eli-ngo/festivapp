import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient() // on crée un nouveau client prisma

export default async function handler(req, res) {
    if(req.method === "POST"){
        const { createdAt, updatedAt, image, description, user_id } = req.body // on récupère les données du formulaire
        const post = await prisma.post.create({
            data: {
                createdAt,
                updatedAt,
                image,
                description,
                user_id
            }
        })
        res.status(200).json(post)
    }
}