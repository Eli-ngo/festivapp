import Post from "../../components/Post"
import { useCookies } from "react-cookie"
import { useState, useEffect } from "react";

const Details = () => {
    
    const [ cookie ] = useCookies(['user']);
    const [user, setUser] = useState()

    useEffect(() => {
        if(cookie?.user){
            setUser(cookie?.user)
        }
    
    }, [cookie.user])

    return(
        <>
        <h1>Salut</h1>
        </>
    )
}

export default Details