import { PrismaClient } from "@prisma/client"
import { getImage } from "../../../utils/formidable"
import { uploadImage } from "../../../utils/cloudinary"
import { IncomingForm } from "formidable";

const prisma = new PrismaClient() // on crée un nouveau client prisma

export const config = {api: {
    bodyParser: false, // ne transforme pas en objet les données
}}

export default async function handler(req, res) {

    const data = await new Promise(function (resolve, reject) {
        const form = new IncomingForm({ keepExtensions: true });
        form.parse(req, function (err, fields, files) {
        if (err) return reject(err);
        resolve({ fields, files });
        });
    });

    const retrieveImage = data.files.image // on récupère l'image
    const {user_id} = data.fields // on récupère l'id de l'utilisateur
    const {description} = data.fields // on récupère la description
    const foundUser = await prisma.user.findUnique({ // on récupère l'utilisateur
        where: {
            id: parseInt(user_id)
        }
    })
    
    if(foundUser){
        if(retrieveImage){
            const uploadedImage = await uploadImage(retrieveImage.filepath)
            const modifyUser = await prisma.post.create({
                data: {
                    image: uploadedImage.url,
                    description: description,
                    user_id: foundUser.id,
                }
            })
            res.status(200).json({
                image: modifyUser.image,
                description: modifyUser.description,
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

// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient() // on crée un nouveau client prisma

// export default async function handler(req, res) {
//     if(req.method === "POST"){
//         const { createdAt, updatedAt, image, description, user_id } = req.body // on récupère les données du formulaire
//         const post = await prisma.post.create({
//             data: {
//                 createdAt,
//                 updatedAt,
//                 image,
//                 description,
//                 user_id
//             }
//         })
//         res.status(200).json(post)
//     }
// }