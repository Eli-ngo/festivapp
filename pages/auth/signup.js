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
            <Head>
                <title>Festivapp | Inscription</title>
                <meta name="description" content="“Festiv'App” est une application qui rassemble tous les adeptes de festivals de musique du monde entier." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <SignupStyle>
                <div className="container">
                <h1>Inscription</h1>
                <form onSubmit={handleSignUp}>
                    <input type="text" value={inputedUser.username || ""} placeholder='username' onChange={(e) => setInputedUser({ ...inputedUser, username:e.target.value })}/>
                    <input type="text" value={inputedUser.lastname || ""} placeholder='lastname' onChange={(e) => setInputedUser({ ...inputedUser, lastname:e.target.value })}/>
                    <input type="text" value={inputedUser.firstname || ""} placeholder='firstname' onChange={(e) => setInputedUser({ ...inputedUser, firstname:e.target.value })}/>
                    <input type="text" value={inputedUser.email || ""} placeholder='email' onChange={(e) => setInputedUser({ ...inputedUser, email:e.target.value })}/>
                    <input type="text" value={inputedUser.password || ""} placeholder='password' onChange={(e) => setInputedUser({ ...inputedUser, password:e.target.value })}/>
                    <button type="submit">Submit</button>
                </form>
                </div>
            </SignupStyle>
        </>

    )
}
export default Signup