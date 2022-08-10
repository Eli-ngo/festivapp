import Head from 'next/head'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/dist/client/router'
import { useCookies } from 'react-cookie'
import { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'

export const SigninStyle = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;

    /* mobile version */

    .mobile{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: space-between;
        gap: 50px;
        width: 80%;

        @media only screen and (min-width: 425px){
            width: 60%;
        }

        @media only screen and (min-width: 768px){
            width: 50%;
            display: none;
        }

        &__top{
            &:nth-child(1){
                font-family: 'Nexa-Bold';
            }
        }

        &__form{
            &--box{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                margin-bottom: 20px;
            }
            &--forgotten{
                display: flex;
                justify-content: flex-end;
                text-decoration: underline;
            }
            &--suggestion{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;

                &__action{
                    font-weight: bold;
                    color: #FF961A;
                }
            }
            
            &--input{
                width: 100%;
                border: none;
                border-bottom: 2px solid  #000000;
                padding: 10px 10px;
            }
        }

        &__back{
            display: flex;
            justify-content: center;
            padding: 10px;
            border: solid 1px black;
            border-radius: 10px;
        }
    }

    /* desktop version */
    .desktop{
        display: none;

        @media only screen and (min-width: 768px){
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 100%;
        }

        .desktopLeft{
            width: 40%;
            background: url('/img/auth_bg.webp') no-repeat 0 0 / cover;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
        }

        .desktopRight{
            width: 60%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            &__container{
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 50px;
            }

            &__top{
                &:nth-child(1){
                    font-family: 'Nexa-Bold';
                }
                width: 70%;

                @media only screen and (min-width: 768px){
                    width: 50%;
                }
            }

            &__form{
                width: 70%;

                @media only screen and (min-width: 768px){
                    width: 50%;
                }

                &--box{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                    margin-bottom: 20px;
                }

                &--input{
                    width: 100%;
                    border: none;
                    border-bottom: 2px solid  #000000;
                    padding: 10px 10px;
                }

                &--forgotten{
                    display: flex;
                    justify-content: flex-end;
                    text-decoration: underline;
                }

                &--suggestion{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 50px;

                    &__action{
                        font-weight: bold;
                        color: #FF961A;
                    }
                }
            }
            
            &__back{
                display: flex;
                justify-content: center;
                padding: 10px;
                border: solid 1px black;
                border-radius: 10px;
            }

        }
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
            toast.loading('Connexion en cours...', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
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
                    maxAge: 259200, // Expire après 3 jours
                    sameSite: true,
                })
                toast.remove()
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
                <title>Festiv&apos;App | Connexion</title>
            </Head>

            <Toaster position="bottom-center" reverseOrder={false}/>
            <SigninStyle>

                {/* mobile version */}
                <div className="mobile">
                    <div className="mobile__top">
                        <h1>Bon retour</h1>
                        <h2>Qui va là ?</h2>
                    </div>

                    <form method='POST' onSubmit={handleSignIn} className='mobile__form'>
                            <div className="mobile__form--fieds">
                                <div className="mobile__form--box">
                                    <label>Pseudo</label>
                                    <input className='mobile__form--input' type="text" value={inputedUser.username || ""} placeholder='Pseudo' onChange={(e) => setInputedUser({ ...inputedUser, username:e.target.value })}/>
                                </div>
                                <div className="mobile__form--box">
                                    <label>Mot de passe</label>
                                    <input className='mobile__form--input' type="password"  value={inputedUser.password || ""} placeholder='Mot de passe' onChange={(e) => setInputedUser({ ...inputedUser, password:e.target.value })}/>
                                </div>
                            </div>
                            <p className='mobile__form--forgotten'>Mot de passe oublié ?</p>

                            <div className="mobile__form--suggestion">
                                <button type='submit' className='submitButton'>Se connecter</button>
                                <p>Vous n&apos;avez pas de compte ?</p>
                                <Link href="/auth/signup"><a className='mobile__form--suggestion__action'>Rejoignez-nous !</a></Link>
                            </div>

                    </form>

                    <div className="mobile__back">
                        <Link href="/"><a className='mobile__back--action'>Retour à l&apos;accueil</a></Link>
                    </div>
                </div>

                {/* desktop version */}

                <div className="desktop">
                    <div className="desktopLeft">
                        <Image src='/logo/festivapp_logo.svg' width={120} height={120} alt='festivapp logo' className='desktopLeft--logo'/>
                    </div>

                    <div className="desktopRight">
                        <div className="desktopRight__container">
                            <div className="desktopRight__top">
                                <h1>Bon retour</h1>
                                <h2>Qui va là ?</h2>
                            </div>

                            <form method='POST' onSubmit={handleSignIn} className='desktopRight__form'>
                                    <div className="desktopRight__form--fieds">
                                        <div className="desktopRight__form--box">
                                            <label>Pseudo</label>
                                            <input className='desktopRight__form--input' type="text" value={inputedUser.username || ""} placeholder='Pseudo' onChange={(e) => setInputedUser({ ...inputedUser, username:e.target.value })}/>
                                        </div>
                                        <div className="desktopRight__form--box">
                                            <label>Mot de passe</label>
                                            <input className='desktopRight__form--input' type="password"  value={inputedUser.password || ""} placeholder='Mot de passe' onChange={(e) => setInputedUser({ ...inputedUser, password:e.target.value })}/>
                                        </div>
                                    </div>
                                    <p className='desktopRight__form--forgotten'>Mot de passe oublié ?</p>

                                    <div className="desktopRight__form--suggestion">
                                        <button type='submit' className='submitButton'>Se connecter</button>
                                        <p>Vous n&apos;avez pas de compte ?</p>
                                        <Link href="/auth/signup"><a className='desktopRight__form--suggestion__action'>Rejoignez-nous !</a></Link>
                                    </div>

                            </form>

                            <div className="desktopRight__back">
                                <Link href="/"><a className='desktopRight__back--action'>Retour à l&apos;accueil</a></Link>
                            </div>
                        </div>
                    </div>
                </div>

            </SigninStyle>
        </>
    )
}

export default Signin

// import Head from 'next/head'
// import toast, { Toaster } from 'react-hot-toast'
// import { useRouter } from 'next/dist/client/router'
// import { useCookies } from 'react-cookie'
// import { useState } from 'react'
// import styled from 'styled-components'

// export const SigninStyle = styled.main`
//     width: 100%;
//     height: 100vh;
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     .container{
//         display: flex;
//         flex-direction: column;
//     }

//     form{
//         display: flex;
//         flex-direction: column;
//     }
// `

// const Signin = () => {

//     const [cookie, setCookie] = useCookies(['user'])

//     const router = useRouter()

//     const [inputedUser, setInputedUser] = useState({
//         email: "",
//         password: "",
//     })

//     const handleSignIn = async (e) => {
//         e.preventDefault()

//         if(!inputedUser.username || !inputedUser.password){
//             toast('Connexion échouée',
//                 {
//                     icon: '❌',
//                     style: {
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                     },
//                 }
//                 );
//             return
//         }else{
//             toast.loading('Connexion en cours...', {
//                 style: {
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                 }
//             })
//             const res = await fetch('/api/auth/signin', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     username: inputedUser.username,
//                     password: inputedUser.password,
//                 }),
//             })

//             const data = await res.json();

//             if(res.ok){
//                 setCookie("user", JSON.stringify(data), {
//                     path: "/", //nous passons 3 arguments à la méthode setCookie(). Le premier est le nom du cookie, le second est la valeur du cookie, le troisième permet d'accéder au cookie sur toutes les pages.
//                     maxAge: 259200, // Expire après 3 jours
//                     sameSite: true,
//                 })
//                 toast.remove()
//                 toast('Bonjour ' + data.firstname,
//                 {
//                     icon: '✅',
//                     style: {
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                     },
//                 }
//                 );
//                 router.push('/')
//             }else{
//                 toast('Connexion échouée',
//                 {
//                     icon: '❌',
//                     style: {
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                     },
//                 }
//                 );
//             }
//         }

//     }

//     return(
//         <>
//             <Head>
//                 <title>Festiv&apos;App | Connexion</title>
//             </Head>

//             <Toaster position="bottom-center" reverseOrder={false}/>
//             <SigninStyle>
//                 <div className="container">
//                     <h1>Se connecter</h1>
//                     <form method='POST' onSubmit={handleSignIn}>
//                             <input type="text" value={inputedUser.username || ""} placeholder='Pseudo' onChange={(e) => setInputedUser({ ...inputedUser, username:e.target.value })}/>
//                             <input type="password"  value={inputedUser.password || ""} placeholder='Mot de passe' onChange={(e) => setInputedUser({ ...inputedUser, password:e.target.value })}/>
//                             <button type='submit'>Se connecter</button>
//                     </form>
//                 </div>
//             </SigninStyle>
//         </>
//     )
// }

// export default Signin