import styled from 'styled-components'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router'

export const NavStyle = styled.nav`

width: 100%;
height: 60px;
background: black;
color: white;
display: flex;
justify-content: space-between;
align-items: center;

`;

const Navbar = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    const router = useRouter()

    const signout = (e) => {
        e.preventDefault()
        removeCookie("user")
        router.push("/")
        toast.success('Vous êtes déconnecté')
    }

    return ( 
        <NavStyle>
            <Toaster />
            <div className="logo">
                <h1>Festiv&apos;App</h1>
            </div>
            <div className="logout">
                <button onClick={(e) => signout(e)}>Se déconnecter</button>
            </div>
            <div className="auth">
                <Link href="/auth/signin"><a>Se connecter</a></Link>
                <Link href="/auth/signup"><a>Créer un compte</a></Link>
            </div>
        </NavStyle>
    );
}

export default Navbar;