import Head from 'next/head'
import Post from "../../components/Post"
import { useCookies } from "react-cookie"
import { useState, useEffect } from "react";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router"
import toast, { Toaster } from "react-hot-toast";
import Image from 'next/image'
import Link from 'next/link'

export const getServerSideProps = async (context) => {
    const usernameUser = context.query.username
    const prisma = new PrismaClient()
    const details = await prisma.user.findUnique({
        where: {
            username: usernameUser
        },
        select: {
            id: true,
            lastname: true,
            firstname: true,
            username: true,
            email: true,
            avatar: true,
            posts: {
                select: {
                    id: true,
                    image: true,
                }
            }
        },
    })
    
    return {
        props: {
            profiledetails: details
        }
    }
}

const ProfileDetails = ({ profiledetails }) => {

    const router = useRouter()
    
    const [ cookie ] = useCookies(['user']);
    const [user, setUser] = useState()

    

    useEffect(() => {
        if(cookie?.user){
            setUser(cookie?.user)
        }
    
    }, [cookie.user])

    return(
        <>
            <Head>
            <title>Festiv&apos;App | {profiledetails.username}</title>
            </Head>
            
            <div key={profiledetails.id}>
                <h1>Pseudo : {profiledetails.username}</h1>
                <p>Prénom : {profiledetails.firstname}</p>
                <p>Nom : {profiledetails.lastname}</p>
                <p>Email : {profiledetails.email}</p>
                {profiledetails.avatar ? (
                    <Image src={profiledetails.avatar} width={80} height={80}/>
                ) : (
                    <Image src={"/default_avatar.jpg"} width={80} height={80}/>
                )}
                {user?.id === profiledetails.id ? (
                    <button><Link href="/profile/editavatar"><a>Modifier la photo</a></Link></button>
                ):(
                    <></>
                )}


                {!profiledetails.posts.length ? (
                    <p>Aucun post</p>
                ) : (
                    <>
                        {profiledetails.posts.map((elt, i) => (
                        <div key={elt.id}>
                            <Link href={`/post/${elt.id}`}>
                                <a>
                                    <Image src={elt.image} width={100} height={100}/>
                                </a>
                            </Link>
                        </div>
                        ))}
                    </>
                )}
            </div>
        </>
    )
}

export default ProfileDetails