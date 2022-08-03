import { PrismaClient } from '@prisma/client'; // on utilise le client pour faire des requêtes à la base de données
import { hash } from 'bcryptjs'; // hash le mot de passe en BDD

export default async function signup(req, res) {

    const prisma = new PrismaClient(); // on crée un nouveau client prisma

    // seul POST est autorisé
    if(req.method === 'POST'){
        const { username, lastname, firstname, email, password } = req.body; // on récupère les données du formulaire
        // on vérifie que les données sont valides
        if(!username || !email || !email.includes('@') || !password || !lastname || !firstname){
            res.status(422).json({ error: 'Données invalides' })
            return
        }

        // on vérifie que l'utilisateur n'existe pas déjà
        const checkEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })
        // on vérifie que l'utilisateur n'existe pas déjà
        const checkUsername = await prisma.user.findUnique({
            where: {
                username
            }
        })

        // si l'utilisateur existe déjà, on renvoie une erreur
        if(checkEmail){
            res.status(500).json({ message: 'Utilisateur déjà existant' })
            return
        }

        // si l'utilisateur existe déjà, on renvoie une erreur
        if(checkUsername){
            res.status(500).json({ message: 'Utilisateur déjà existant' })
            return
        }
        //si toutes les données sont valides, on crée un nouvel utilisateur dans la BDD
        const createUser = await prisma.user.create({
            data: {
                username,
                lastname,
                firstname,
                email,
                password: await hash(password, 12),
            }
        })
        
        // on renvoie un message de succès
        res.status(201).json({ message: 'Utilisateur créé' })
    } else {
        res.status(500).json({ message: 'Chemin invalide' })
    }
}