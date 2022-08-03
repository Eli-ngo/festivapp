import { PrismaClient } from "@prisma/client"
import { getImage } from "../../../utils/formidable"
import { uploadImage } from "../../../utils/cloudinary"

const prisma = new PrismaClient()

export const config = {api:{
    bodyParser: false,
}}

export default async function handler (req, res) {
    const retrieveImage = await getImage(req)
    console.log(retrieveImage)
    const user = await req.query.username
    const foundUser = await prisma.user.findUnique({
        where: {
            username: user,
        }
    })

    if(foundUser){
        if(retrieveImage){
            const uploadedImage = await uploadImage(retrieveImage.filepath)
            const modifyUser = await prisma.user.update({
                where:{
                    username: foundUser.username,
                },
                data: {
                    avatar: uploadedImage.url,
                }
            })
            res.status(200).json({
                username: modifyUser.username,
                lastname: modifyUser.lastname,
                firstname: modifyUser.firstname,
                email: modifyUser.email,
                avatar: modifyUser.avatar,
            })
        }else{
            res.status(500).json({
                error: 'Image not found'
            })
        }
    }else{
        res.status(500).json({
            message: "User not found"
        })
    }
}