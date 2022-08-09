import Head from 'next/head'
import styled from 'styled-components'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const SignupStyle = styled.main`
    width: 100%;
    background: #ffffff;
    /* display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff; */

    /* mobile version */
    .signupMobile{
        background: #ffffff;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 30px;
        padding: 40px 20px;

        @media only screen and (min-width: 768px) {
            width: 60%;
        }

        @media only screen and (min-width: 1024px) {
            display: none;
        }

        .signupMobileTop{
            width: 100%;
            font-family: 'Nexa-Bold';
            &__welcome{
                font-size: 1.875rem;
            }
        }

        .signupMobileBottom{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            &__form{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                &--box{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    margin-bottom: 22px;
                }
                &--input{
                    width: 280px;
                    border: none;
                    border-bottom: solid 2px black;
                    padding: 10px 0;

                    @media only screen and (min-width: 375px) {
                        width: 330px;
                    }

                    @media only screen and (min-width: 425px) {
                        width: 380px;
                    }

                }
                &--disclaimer{
                    font-size: 0.875rem;
                }
            }
            &__suggestion{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;

                &--action{
                    font-weight: bold;
                    color: #FF961A;
                }
            }

            &__back{
                &--action{
                    padding: 10px;
                    border: solid 1px black;
                    border-radius: 5px;
                }
            }
        }
    }

    /* desktop version */
    .signupDesktop{
        display: none;
        width: 100%;

        @media only screen and (min-width: 1024px) {
            display: flex;
            width: 100%;
            height: 100vh;
        }

        .signupDesktopLeft{
            width: 40%;
            background: url('/img/auth_bg.webp') no-repeat 0 0 / cover;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
                }

        .signupDesktopRightContainer{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 60%;
            height: 100vh;
            padding: 20px 160px;

            .signupDesktopRight{
                width: 50%;
            background: #ffffff;
            padding: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;

            &__top{
                font-family: 'Nexa-Bold';
                width: 100%;
            }

            &__bottom{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
            }

            &__form{
                display: flex;
                flex-direction: column;
                align-items: start;
                justify-content: flex-start;

                &--fullname{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    gap: 30px;

                }

                &--box{
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 22px;
                }

                &--input{
                    width: 380px;
                    border: none;
                    border-bottom: solid 2px black;
                    padding: 10px 0;

                    &__name{
                        width: 100%;
                        border: none;
                        border-bottom: solid 2px black;
                        padding: 10px 0;
                    }
                }
            }

            &__disclaimer{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            &__suggestion{
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-bottom: 40px;
                gap: 10px;

                &--action{
                    font-weight: bold;
                    color: #FF961A;
                }
            }

            &__back{
                &--action{
                    padding: 10px;
                    border: solid 1px black;
                    border-radius: 5px;
                }
            }
        }
        }
        
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

            <Toaster position="bottom-center" reverseOrder={false}/>
            <SignupStyle>

                {/* mobile version */}
                <div className="signupMobile">
                    <div className="signupMobileTop">
                        <h1 className='signupMobileTop__welcome'>Bienvenue <span>.</span></h1>
                        <h2 className='signupMobileTop__gettoknow'>Faisons connaissance !</h2>
                    </div>

                    <div className="signupMobileBottom">
                        <form onSubmit={handleSignUp} className='signupMobileBottom__form'>
                            <div className="signupMobileBottom__form--box">
                                <label>Pseudo</label>
                                <input type="text" value={inputedUser.username || ""} placeholder='Pseudo' onChange={(e) => setInputedUser({ ...inputedUser, username:e.target.value })} className='signupMobileBottom__form--input'/>
                            </div>
                            <div className="signupMobileBottom__form--box">
                                <label>Nom</label>
                                <input type="text" value={inputedUser.lastname || ""} placeholder='Nom' onChange={(e) => setInputedUser({ ...inputedUser, lastname:e.target.value })} className='signupMobileBottom__form--input'/>
                            </div>
                            <div className="signupMobileBottom__form--box">
                                <label>Prénom</label>
                                <input type="text" value={inputedUser.firstname || ""} placeholder='Prénom' onChange={(e) => setInputedUser({ ...inputedUser, firstname:e.target.value })} className='signupMobileBottom__form--input'/>
                            </div>
                            <div className="signupMobileBottom__form--box">
                                <label>Adresse email</label>
                                <input type="text" value={inputedUser.email || ""} placeholder='Adresse email' onChange={(e) => setInputedUser({ ...inputedUser, email:e.target.value })} className='signupMobileBottom__form--input'/>
                            </div>
                            <div className="signupMobileBottom__form--box">
                                <label>Mot de passe</label>
                                <input type="password" value={inputedUser.password || ""} placeholder='Mot de passe' onChange={(e) => setInputedUser({ ...inputedUser, password:e.target.value })} className='signupMobileBottom__form--input'/>
                            </div>
                            <p className='signupMobileBottom__form--disclaimer'>En continuant, j&apos;accepte les termes légaux, les conditions générales d&apos;utilisation et la politique de confidentialité de l&apos;application </p>
                            <button type="submit" className='submitButton'>s'inscrire</button>
                        </form>

                        <div className="signupMobileBottom__suggestion">
                            <p>Vous avez déjà un compte ? </p>
                            <Link href="/auth/signin"><a className='signupMobileBottom__suggestion--action'>Connectez-vous</a></Link>
                        </div>

                        <div className="signupMobileBottom__back">
                            <Link href="/"><a className='signupMobileBottom__back--action'>Retour à l'accueil</a></Link>
                        </div>
                    </div>
                </div>


                {/* desktop version */}
                <div className="signupDesktop">
                    <div className="signupDesktopLeft">
                        <Image src='/logo/festivapp_logo.svg' width={120} height={120} alt='festivapp logo' className='signupDesktopLeft__logo'/>
                    </div>
                    <div className="signupDesktopRightContainer">
                        <div className="signupDesktopRight">
                            {/* <div className="signupDesktopRight__top">
                                <h1 className='signupDesktopRight__top--welcome'>Bienvenue <span>.</span></h1>
                                <h2 className='signupDesktopRight__top--gettoknow'>Faisons connaissance !</h2>
                            </div> */}
                            <div className="signupDesktopRight__bottom">
                                <form onSubmit={handleSignUp} className='signupDesktopRight__form'>
                                    <div className="signupDesktopRight__form--fullname">
                                        <div className="signupDesktopRight__form--box">
                                            <label>Nom</label>
                                            <input type="text" value={inputedUser.lastname || ""} placeholder='Nom' onChange={(e) => setInputedUser({ ...inputedUser, lastname:e.target.value })} className='signupDesktopRight__form--input__name'/>
                                        </div>
                                        <div className="signupDesktopRight__form--box">
                                            <label>Prénom</label>
                                            <input type="text" value={inputedUser.firstname || ""} placeholder='Prénom' onChange={(e) => setInputedUser({ ...inputedUser, firstname:e.target.value })} className='signupDesktopRight__form--input__name'/>
                                        </div>
                                    </div>
                                    <div className="signupDesktopRight__form--box">
                                        <label>Pseudo</label>
                                        <input type="text" value={inputedUser.username || ""} placeholder='Pseudo' onChange={(e) => setInputedUser({ ...inputedUser, username:e.target.value })} className='signupDesktopRight__form--input'/>
                                    </div>
                                    <div className="signupDesktopRight__form--box">
                                        <label>Adresse email</label>
                                        <input type="text" value={inputedUser.email || ""} placeholder='Adresse email' onChange={(e) => setInputedUser({ ...inputedUser, email:e.target.value })} className='signupDesktopRight__form--input'/>
                                    </div>
                                    <div className="signupDesktopRight__form--box">
                                        <label>Mot de passe</label>
                                        <input type="password" value={inputedUser.password || ""} placeholder='Mot de passe' onChange={(e) => setInputedUser({ ...inputedUser, password:e.target.value })} className='signupDesktopRight__form--input'/>
                                    </div>
                                    <p className='signupMobileBottom__form--disclaimer'>En continuant, j&apos;accepte les termes légaux, les conditions générales d&apos;utilisation et la politique de confidentialité de l&apos;application </p>
                                    <button type="submit" className='submitButton'>s'inscrire</button>
                                </form>
                                <div className="signupDesktopRight__suggestion">
                                    <p>Vous avez déjà un compte ? </p>
                                    <Link href="/auth/signin"><a className='signupDesktopRight__suggestion--action'>Connectez-vous</a></Link>
                                </div>

                                <div className="signupDesktopRight__back">
                                    <Link href="/"><a className='signupDesktopRight__back--action'>Retour à l'accueil</a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SignupStyle>
        </>

    )
}
export default Signup


// import Head from 'next/head'
// import styled from 'styled-components'
// import toast, { Toaster } from 'react-hot-toast'
// // import styled from 'styled-components'
// import { useRouter } from 'next/router'
// import { useState } from 'react'

// export const SignupStyle = styled.main`
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

// const Signup = () => {
//     const router = useRouter()

//     const [inputedUser, setInputedUser] = useState({
//         id: "",
//         username: "",
//         lastname: "",
//         firstname: "",
//         email: "",
//         password: "",
//         avatar: "",
//     })

//     const handleSignUp = async (e) => {
//         e.preventDefault() //on empêche le rechargement de la page
//         if (!inputedUser.username || !inputedUser.email || !inputedUser.email.includes('@') || !inputedUser.password || !inputedUser.lastname || !inputedUser.firstname) {
//             toast('Erreur de saisie',
//                 {
//                     icon: '❌',
//                     style: {
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                     },
//                 }
//                 );
//         }else{
//             toast.loading('Création du compte en cours...', {
//                 style: {
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                 }
//             })
//             const res = await fetch('/api/auth/signup', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify( //on transforme les données en JSON
//                     inputedUser //on passe les données à la BDD
//                 ),
//             });
//             const data = await res.json(); //on récupère les données de la BDD
//             if (res.ok) {
//                 toast.remove()
//                 toast('Utilisateur crée',
//                 {
//                     icon: '✅',
//                     style: {
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                     },
//                 }
//                 );
//                 router.push('/auth/signin')
//             } else {
//                 toast.remove()
//                 toast('Erreur lors de la création du compte',
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
//                 <title>Festiv&apos;App | Inscription</title>
//             </Head>

//             <SignupStyle>
//                 <div className="container">
//                 <h1>Inscription</h1>
//                 <form onSubmit={handleSignUp}>
//                     <input type="text" value={inputedUser.username || ""} placeholder='Pseudo' onChange={(e) => setInputedUser({ ...inputedUser, username:e.target.value })}/>
//                     <input type="text" value={inputedUser.lastname || ""} placeholder='Nom' onChange={(e) => setInputedUser({ ...inputedUser, lastname:e.target.value })}/>
//                     <input type="text" value={inputedUser.firstname || ""} placeholder='Prénom' onChange={(e) => setInputedUser({ ...inputedUser, firstname:e.target.value })}/>
//                     <input type="text" value={inputedUser.email || ""} placeholder='Adresse email' onChange={(e) => setInputedUser({ ...inputedUser, email:e.target.value })}/>
//                     <input type="password" value={inputedUser.password || ""} placeholder='Mot de passe' onChange={(e) => setInputedUser({ ...inputedUser, password:e.target.value })}/>
//                     <button type="submit">Submit</button>
//                 </form>
//                 </div>
//             </SignupStyle>
//         </>

//     )
// }
// export default Signup