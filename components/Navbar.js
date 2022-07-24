import styled from 'styled-components'
import Link from 'next/link'

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

    return ( 
        <NavStyle>
            <div className="logo">
                <h1>Festiv&apos;App</h1>
            </div>
            <div className="auth">
                <Link href="/auth/signup"><a>Créer un compte</a></Link>
            </div>
        </NavStyle>
    );
}

export default Navbar;