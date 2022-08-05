import { PrismaClient } from "@prisma/client" // on utilise le client pour faire des requêtes à la base de données
import { getImage } from "../../../utils/formidable" // on utilise la fonction getImage pour récupérer les images
import { uploadImage } from "../../../utils/cloudinary" // on utilise la fonction uploadImage pour uploader les images

const prisma = new PrismaClient()

export const config = {api:{
    bodyParser: false, //ne transforme pas en objet les données
}}

export default async function handler (req, res) {
    const retrieveImage = await getImage(req) // on récupère l'image
    console.log(retrieveImage)
    const user = await req.query.username // on récupère le nom d'utilisateur
    const foundUser = await prisma.user.findUnique({ // on récupère l'utilisateur
        where: {
            username: user, // on récupère le nom d'utilisateur
        }
    })

    if(foundUser){ // si l'utilisateur existe
        if(retrieveImage){ // si l'image est présente
            const uploadedImage = await uploadImage(retrieveImage.filepath) // on upload l'image sur Cloudinary
            const modifyUser = await prisma.user.update({ // on modifie l'utilisateur
                where:{
                    username: foundUser.username, // on récupère le nom d'utilisateur
                },
                data: {
                    avatar: uploadedImage.url, // on récupère l'url de l'image
                }
            })
            res.status(200).json({  // on renvoie un message de succès
                username: modifyUser.username, 
                lastname: modifyUser.lastname,
                firstname: modifyUser.firstname,
                email: modifyUser.email,
                avatar: modifyUser.avatar,
                id: parseInt(modifyUser.id),
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