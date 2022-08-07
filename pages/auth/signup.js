import Head from 'next/head'
import styled from 'styled-components'
import toast, { Toaster } from 'react-hot-toast'
// import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const SignupStyle = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .container{
        display: flex;
        flex-direction: column;
    }

    form{
        display: flex;
        flex-direction: column;
    }
`

const Signup = () => {
    const router = useRouter()

    const [inputedUser, setInputedUser] = useState({
        id: "",
        username: "",
        lastname: "",
        firstname: "",
        email: "",
        password: "",
        avatar: "",
    })

    const handleSignUp = async (e) => {
        e.preventDefault() //on empêche le rechargement de la page
        if (!inputedUser.username || !inputedUser.email || !inputedUser.email.includes('@') || !inputedUser.password || !inputedUser.lastname || !inputedUser.firstname) {
            toast('Erreur de saisie',
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
            toast.loading('Création du compte en cours...', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
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
                toast.remove()
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
                toast.remove()
                toast('Erreur lors de la création du compte',
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
            <Head>
                <title>Festiv&apos;App | Inscription</title>
            </Head>

            <SignupStyle>
                <div className="container">
                <h1>Inscription</h1>
                <form onSubmit={handleSignUp}>
                    <input type="text" value={inputedUser.username || ""} placeholder='Pseudo' onChange={(e) => setInputedUser({ ...inputedUser, username:e.target.value })}/>
                    <input type="text" value={inputedUser.lastname || ""} placeholder='Nom' onChange={(e) => setInputedUser({ ...inputedUser, lastname:e.target.value })}/>
                    <input type="text" value={inputedUser.firstname || ""} placeholder='Prénom' onChange={(e) => setInputedUser({ ...inputedUser, firstname:e.target.value })}/>
                    <input type="text" value={inputedUser.email || ""} placeholder='Adresse email' onChange={(e) => setInputedUser({ ...inputedUser, email:e.target.value })}/>
                    <input type="password" value={inputedUser.password || ""} placeholder='Mot de passe' onChange={(e) => setInputedUser({ ...inputedUser, password:e.target.value })}/>
                    <button type="submit">Submit</button>
                </form>
                </div>
            </SignupStyle>
        </>

    )
}
export default Signup