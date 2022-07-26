import { PrismaClient } from "@prisma/client"
// import { getImage } from "../../../configfiles/formidable"
import { uploadImage } from "../../../configfiles/cloudinary"
import { IncomingForm } from "formidable";

const prisma = new PrismaClient() // on crée un nouveau client prisma

export const config = {api: {
    bodyParser: false, // ne transforme pas en objet les données
}}

export default async function handler(req, res) {

    const cloud = await new Promise(function (resolve, reject) {
        const form = new IncomingForm({ keepExtensions: true });
        form.parse(req, function (err, fields, files) {
        if (err) return reject(err);
        resolve({ fields, files });
        });
    });

    const retrieveImage = cloud.files.image // on récupère l'image
    const { user_id, description } = cloud.fields // on récupère l'id de l'utilisateur et la description
    const foundUser = await prisma.user.findUnique({ // on récupère l'utilisateur
        where: {
            id: parseInt(user_id)
        }
    })
    
    if(foundUser){
        if(retrieveImage){
            const uploadedImage = await uploadImage(retrieveImage.filepath)
            const newPost = await prisma.post.create({
                data: {
                    image: uploadedImage.url, //on va créer un post avec l'image qui a été uploadé sur Cloudinary. On récupère son url
                    description,
                    user_id: foundUser.id,
                }
            })
            res.status(200).json({
                image: newPost.image,
                description: newPost.description,
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