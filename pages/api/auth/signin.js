import { PrismaClient } from '@prisma/client'; // on utilise le client pour faire des requêtes à la base de données
import { compare } from 'bcryptjs'; // compare le mot de passe en BDD

const prisma = new PrismaClient(); // on crée un nouveau client prisma

export default async function signin(req, res) {
    if(req.method === 'POST'){
        const { username, password } = req.body; // on récupère les données du formulaire

        // on vérifie que les données sont valides
        if(!username || !password){
            res.status(422).json({ error: 'Données invalides' })
            return
        }

        // on vérifie que l'utilisateur existe
        const checkUser = await prisma.user.findUnique({
            where: {
                username,
            }
        })

        // si l'utilisateur n'existe pas, on renvoie une erreur
        if(!checkUser){
            res.status(500).json({ message: 'Utilisateur inexistant' })
            return
        }else{
            const checkPassword = await compare(password, checkUser.password);
            
            if(!checkPassword){ // si le mot de passe n'est pas bon, on renvoie une erreur
                res.status(422).json({message: 'Mot de passe incorrect'});
            }else{ // si le mot de passe est bon, on renvoie un token
                res.status(200).json({
                    username: checkUser.username,
                    email: checkUser.email,
                    firstname: checkUser.firstname,
                    lastname: checkUser.lastname,
                    id: checkUser.id,
                    avatar: checkUser.avatar,
                })
            }
        }
    }
}