import toast, { Toaster } from 'react-hot-toast'
// import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Signup = () => {
    const router = useRouter()

    const [inputedUser, setInputedUser] = useState({
        id: "",
        username: "",
        lastname: "",
        firstname: "",
        email: "",
        password: "",
    })

    const handleSignUp = async (e) => {
        e.preventDefault() //on empêche le rechargement de la page
        if (!inputedUser.username || !inputedUser.email || !inputedUser.email.includes('@') || !inputedUser.password || !inputedUser.lastname || !inputedUser.firstname) {
            toast('Connexion échouée',
                {
                    icon: '❌',
                    style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    },
                }
                );
        }else{
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( //on transforme les données en JSON
                    inputedUser //on passe les données à la BDD
                ),
            });
            const data = await res.json(); //on récupère les données de la BDD
            if (res.ok) {
                toast('Utilisateur crée',
                {
                    icon: '✅',
                    style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    },
                }
                );
                router.push('/auth/signin')
            } else {
                toast('Erreur',
                {
                    icon: '❌',
                    style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    },
                }
                );
            }
        }
    }

    return(
        <>
        <Toaster position="bottom-center" reverseOrder={false}/>
        <h1>Inscription</h1>
        <form onSubmit={handleSignUp}>
            <input type="text" value={inputedUser.username || ""} placeholder='username' onChange={(e) => setInputedUser({ ...inputedUser, username:e.target.value })}/>
            <input type="text" value={inputedUser.lastname || ""} placeholder='lastname' onChange={(e) => setInputedUser({ ...inputedUser, lastname:e.target.value })}/>
            <input type="text" value={inputedUser.firstname || ""} placeholder='firstname' onChange={(e) => setInputedUser({ ...inputedUser, firstname:e.target.value })}/>
            <input type="text" value={inputedUser.email || ""} placeholder='email' onChange={(e) => setInputedUser({ ...inputedUser, email:e.target.value })}/>
            <input type="text" value={inputedUser.password || ""} placeholder='password' onChange={(e) => setInputedUser({ ...inputedUser, password:e.target.value })}/>
            <button type="submit">Submit</button>
        </form>
        </>

    )
}
export default Signup