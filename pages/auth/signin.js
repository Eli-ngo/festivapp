import Head from 'next/head'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/dist/client/router'
import { useCookies } from 'react-cookie'
import { useState } from 'react'
import styled from 'styled-components'

export const SigninStyle = styled.main`
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

const Signin = () => {

    const [cookie, setCookie] = useCookies(['user'])

    const router = useRouter()

    const [inputedUser, setInputedUser] = useState({
        email: "",
        password: "",
    })

    const handleSignIn = async (e) => {
        e.preventDefault()

        if(!inputedUser.username || !inputedUser.password){
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
            return
        }else{
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: inputedUser.username,
                    password: inputedUser.password,
                }),
            })

            const data = await res.json();

            if(res.ok){
                setCookie("user", JSON.stringify(data), {
                    path: "/", //nous passons 3 arguments à la méthode setCookie(). Le premier est le nom du cookie, le second est la valeur du cookie, le troisième permet d'accéder au cookie sur toutes les pages.
                    maxAge: 1814400, // Expire après 3 semaines
                    sameSite: true,
                })
                toast('Bonjour ' + data.firstname,
                {
                    icon: '✅',
                    style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    },
                }
                );
                router.push('/')
            }else{
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
            }
        }

    }

    return(
        <>
            <Head>
                <title>Festivapp | Connexion</title>
                <meta name="description" content="“Festiv'App” est une application qui rassemble tous les adeptes de festivals de musique du monde entier." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <SigninStyle>
                <div className="container">
                    <h1>Se connecter</h1>
                    <form method='POST' onSubmit={handleSignIn}>
                            <input type="text" value={inputedUser.username || ""} placeholder='Pseudo' onChange={(e) => setInputedUser({ ...inputedUser, username:e.target.value })}/>
                            <input type="password"  value={inputedUser.password || ""} placeholder='Mot de passe' onChange={(e) => setInputedUser({ ...inputedUser, password:e.target.value })}/>
                            <button type='submit'>Se connecter</button>
                    </form>
                </div>
            </SigninStyle>
        </>
    )
}

export default Signin