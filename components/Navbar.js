import styled from 'styled-components'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router'
import Image from 'next/image';
import { useState, useEffect } from 'react';

export const NavStyle = styled.nav`

width: 100%;
height: 70px;
background: black;
color: white;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 50px;

.profileSection{
    display: flex;
    align-items: center;
    gap: 30px;

    .currentPic{
        border-radius: 50%;
    }
}

.auth {
    display: flex;
    align-items: center;
    gap: 30px;
    font-size: 0.875rem;
    font-family: 'Poppins', sans-serif;

    &__signin{
        padding: 8px 52px;
        border: 1px solid white;
        border-radius: 10px;
        text-transform: uppercase;
        font-weight: bold;
        &:hover{

        }
    }
}

`;

const Navbar = () => {

    const router = useRouter()

    const [cookies, setCookie, removeCookie] = useCookies(["user"])
    const [user, setUser] = useState()

    const signout = (e) => {
        e.preventDefault()
        removeCookie("user", {path: '/'})
        setUser(null)
        router.push("/auth/signin")
        toast('Vous êtes déconnecté, à bientôt !',
        {
            icon: '👏',
            style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            },
        }
        );
    }

    useEffect(() => {
        if(cookies.user){
            setUser(cookies.user)
        }

        }, [cookies.user])

    return ( 
        <NavStyle>
            {user ? (
                <>
                    <div className="logo">
                        <Link href="/">
                            <a>
                                <h1>
                                    <Image src="/logo/festivapp_logo.svg" alt="Festivapp logo" width={90} height={90} />
                                </h1>
                            </a>
                        </Link>
                    </div>
                    <div className="profileSection">
                        <p>Bonjour {user?.firstname}</p>
                        {user?.avatar ? (
                            <Link href={`/profile/${user?.username}`}>
                                <a><Image
                            src={`${user?.avatar}`}
                            alt="Profile"
                            width={45}
                            height={45} className="currentPic"
                            /></a>
                            </Link>
                        ) : (
                            <Link href={`/profile/${user?.username}`}>
                                <a><Image
                            src={`/default_avatar.jpg`}
                            alt="Profile"
                            width={45}
                            height={45} className="currentPic"
                            /></a>
                            </Link>
                        )}
                        <button onClick={(e) => signout(e)}>
                            <Image src="/img/sign_out_icon.svg" alt="déconnexion" width={20} height={20} />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="logo">
                        <Link href="/">
                            <a>
                                <h1>
                                    <Image src="/logo/festivapp_logo.svg" alt="Festivapp logo" width={90} height={90} />
                                </h1>
                            </a>
                        </Link>
                    </div>
                    <div className="auth">
                        <Link href="/auth/signup"><a className='auth__signup'>Créer un compte</a></Link>
                        <Link href="/auth/signin"><a className='auth__signin'>Se connecter</a></Link>
                    </div>
                </>
            )
        }</NavStyle>
    );
}

export default Navbar;


// import styled from 'styled-components'
// import Link from 'next/link'
// import toast, { Toaster } from 'react-hot-toast'
// import { useCookies } from 'react-cookie';
// import { useRouter } from 'next/router'
// import Image from 'next/image';
// import { useState, useEffect } from 'react';

// export const NavStyle = styled.nav`

// width: 100%;
// height: 60px;
// background: black;
// color: white;
// display: flex;
// justify-content: space-between;
// align-items: center;

// `;

// const Navbar = () => {

//     const router = useRouter()

//     const [cookies, setCookie, removeCookie] = useCookies(["user"])
//     const [user, setUser] = useState()

//     const signout = (e) => {
//         e.preventDefault()
//         removeCookie("user", {path: '/'})
//         setUser(null)
//         router.push("/auth/signin")
//         toast('Vous êtes déconnecté, à bientôt !',
//         {
//             icon: '👏',
//             style: {
//             borderRadius: '10px',
//             background: '#333',
//             color: '#fff',
//             },
//         }
//         );
//     }

//     useEffect(() => {
//         if(cookies.user){
//             setUser(cookies.user)
//         }

//         }, [cookies.user])

//     return ( 
//         <NavStyle>
//             {user ? (
//                 <>
//                 <div className="logo">
//                 {/* <h1>Festiv&apos;App</h1> */}
//                 <Link href="/"><a>Festiv&apos;App</a></Link>
//                 </div>
//                 <div className="logout">
//                     <button onClick={(e) => signout(e)}>Se déconnecter</button>
//                 </div>
//                 <p>Bonjour {user?.firstname}</p>
//                 <div className="profilepic">
//                     {user?.avatar ? (
//                         <Link href={`/profile/${user?.username}`}>
//                             <a><Image
//                         src={`${user?.avatar}`}
//                         alt="Profile"
//                         width={60}
//                         height={60}
//                         /></a>
//                         </Link>
//                     ) : (
//                         <Link href={`/profile/${user?.username}`}>
//                             <a><Image
//                         src={`/default_avatar.jpg`}
//                         alt="Profile"
//                         width={60}
//                         height={60}
//                         /></a>
//                         </Link>
//                     )}
//                 </div>
//             </>
//             ) : (
//                 <>
//                 <div className="logo">
//                 {/* <h1>Festiv&apos;App</h1> */}
//                 <Link href="/"><a>Festiv&apos;App</a></Link>
//                 </div>
//             <div className="auth">
//                 <Link href="/auth/signin"><a>Se connecter</a></Link>
//                 <Link href="/auth/signup"><a>Créer un compte</a></Link>
//             </div>
//                 </>
//             )
//             }</NavStyle>
//     );
// }

// export default Navbar;