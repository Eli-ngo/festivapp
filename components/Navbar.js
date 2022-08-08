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

.toggle-icon{
    @media only screen and (min-width: 768px){
            display: none;
    }
        .toggle-container{
            display: flex;
            flex-direction: column;
            cursor: pointer;
            align-items: end;
            padding: 15px;
            width: 30px;
            position: absolute;
            right: 40px;
            top: 9px;

            &:hover .bar:first-child{
                transition-delay: 100ms;
                transform: scaleX(0);
            }
            
            &:hover .bar:nth-child(2){
                transition-delay: 200ms;
                transform: scaleX(0);
            }
            
            &:hover .bar:last-child{
                transition-delay: 300ms;
                transform: scaleX(0);
            } 
        }
    .bar{
            height: 1px;
            background-color: white;
            margin-top: 3px;
            margin-bottom: 2.5px;
            transition: all 0.3s ease;
            transform-origin: right;
            transform: scaleX(1);
            &:nth-child(1){
                width: 15px
            }
            &:nth-child(2){
                width: 20px
            }
            &:nth-child(3){
                width: 25px
            }
        }
}

.mobile{
    left: -100%;
    transition: left .6s ease-in-out;
    position: fixed; 
    opacity: 0;

    &.opened{
        left: 0;
        width: 100%;
        height: 100%;
        background: black;
        top: 0;
        z-index: 5;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        opacity: 1;

        .close{
            transition: left .6s ease-in-out;
            position: absolute;
            width: 50px;
            height: 50px;
            right: 40px;
            top: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 20;
            cursor: pointer;
            .closeline{
                width: 50%;
                height: 2px;
                background-color: #fff;
                transform: rotate(45deg) translate(11px, -10px);
                &:last-child{
                    transform: rotate(-45deg) translate(-7px, -7px);
                }
            }
        }

        .mobile__loggedIn{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            gap: 140px;

            &--profile{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            &--profilePic{
                border-radius: 50%;
            }
        }

        .mobile__loggedOut{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 160px;
            &--auth{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 20px;
            }
        }
    }
}

.logo{
    &__desktop{
        display: none;
        @media only screen and (min-width: 768px){
            display: flex;
        }
    }
    &__mobile{
        display: flex;
        @media only screen and (min-width: 768px){
            display: none;
        }
    }
}

.profileSection{
    display: none;
    @media only screen and (min-width: 768px){
        display: flex;
        align-items: center;
        gap: 30px;
    }

    .currentPic{
        border-radius: 50%;
    }
}

.auth {
    display: none; 
    @media only screen and (min-width: 768px){
        display: flex;
        align-items: center;
        gap: 30px;
        font-size: 0.875rem;
        font-family: 'Poppins', sans-serif;
    }

    &__signin{
        padding: 8px 52px;
        border: 1px solid white;
        border-radius: 10px;
        text-transform: uppercase;
        font-weight: bold;
    }
}

`;

const Navbar = () => {

    const router = useRouter()

    const [cookies, setCookie, removeCookie] = useCookies(["user"])
    const [user, setUser] = useState()

    const [isOpen, setIsOpen] = useState(false)

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
                    {/***** DESKTOP *****/}
                    <div className="logo">
                        <Link href="/">
                            <a className='logo__desktop'>
                                <h1>
                                    <Image src="/logo/festivapp_logo.svg" alt="Festivapp logo" width={90} height={90}/>
                                </h1>
                            </a>
                        </Link>
                        <Link href="/">
                            <a className='logo__mobile'>
                                <h1>
                                    <Image src="/logo/festivapp_logo_mobile.svg" alt="Festivapp logo" width={30} height={30}/>
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

                    {/***** MOBILE *****/}
                    {/* burger menu OFF */}
                    <div className="toggle-icon">
                        <div className="toggle-container" onClick={() => setIsOpen(!isOpen)}>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </div>
                    {/* burger menu ON */}
                    <div className={`mobile ${isOpen ? "opened" : ""}`}>
                        <div className="mobile__loggedIn">
                            <div className="mobile__loggedIn--profile">
                                {user?.avatar ? (
                                    <Link href={`/profile/${user?.username}`}>
                                        <a><Image
                                    src={`${user?.avatar}`}
                                    alt="Profile"
                                    width={180}
                                    height={180} className="mobile__loggedIn--profilePic"
                                    /></a>
                                    </Link>
                                ) : (
                                    <Link href={`/profile/${user?.username}`}>
                                        <a><Image
                                    src={`/default_avatar.jpg`}
                                    alt="Profile"
                                    width={180}
                                    height={180} className="mobile__loggedIn--profilePic"
                                    /></a>
                                    </Link>
                                )}
                                <p>Bonjour {user?.firstname}</p>
                            </div>

                            <button onClick={(e) => signout(e)}>
                                <Image src="/img/sign_out_icon.svg" alt="déconnexion" width={20} height={20} />
                            </button>

                            <Image src="/logo/festivapp_logo.svg" alt="Festivapp logo" width={90} height={90} />

                            <div className="close" onClick={() => setIsOpen(!isOpen)}>
                                <div className="closeline"></div>
                                <div className="closeline"></div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/***** DESKTOP *****/}
                    <div className="logo">
                        <Link href="/">
                            <a className='logo__desktop'>
                                <h1>
                                    <Image src="/logo/festivapp_logo.svg" alt="Festivapp logo" width={90} height={90} />
                                </h1>
                            </a>
                        </Link>
                        <Link href="/">
                            <a className='logo__mobile'>
                                <h1>
                                    <Image src="/logo/festivapp_logo_mobile.svg" alt="Festivapp logo" width={30} height={30}/>
                                </h1>
                            </a>
                        </Link>
                    </div>
                    
                    <div className="auth">
                        <Link href="/auth/signup"><a className='auth__signup'>Créer un compte</a></Link>
                        <Link href="/auth/signin"><a className='auth__signin'>Se connecter</a></Link>
                    </div>

                    {/***** MOBILE *****/}
                    {/* burger menu OFF */}
                    <div className="toggle-icon">
                        <div className="toggle-container" onClick={() => setIsOpen(!isOpen)}>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </div>

                    {/* burger menu ON */}
                    <div className={`mobile ${isOpen ? "opened" : ""}`}>
                        <div className="mobile__loggedOut">
                            <div className="mobile__loggedOut--auth">
                                <Link href="/auth/signup"><a className='auth__signup'>Créer un compte</a></Link>
                                <Link href="/auth/signin"><a className='auth__signin'>Se connecter</a></Link>
                            </div>

                            <Image src="/logo/festivapp_logo.svg" alt="Festivapp logo" width={90} height={90} />

                            <div className="close" onClick={() => setIsOpen(!isOpen)}>
                                <div className="closeline"></div>
                                <div className="closeline"></div>
                            </div>
                        </div>
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