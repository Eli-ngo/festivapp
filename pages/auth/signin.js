import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/dist/client/router'
import { useCookies } from 'react-cookie'
import { useState } from 'react'

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
                    maxAge: 3600, // Expire après 1 heure
                    sameSite: true,
                })
                toast('Connexion réussie',
                {
                    icon: '✅',
                    style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    },
                }
                );
                router.push('/feed')
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
        <Toaster position="bottom-center" reverseOrder={false}/>
        <h1>Se connecter</h1>
        <form method='POST' onSubmit={handleSignIn}>
                <label>Pseudo</label>
                <input type="text" value={inputedUser.username || ""} placeholder='Pseudo' onChange={(e) => setInputedUser({ ...inputedUser, username:e.target.value })}/>
                <input type="password"  value={inputedUser.password || ""} placeholder='Mot de passe' onChange={(e) => setInputedUser({ ...inputedUser, password:e.target.value })}/>
                <button type='submit'>Se connecter</button>
        </form>
        </>
    )
}

export default Signin