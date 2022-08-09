import Head from 'next/head'
import { useCookies } from "react-cookie"
import { useState, useEffect } from "react";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router"
import toast, { Toaster } from "react-hot-toast";
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components';

const ProfileStyle = styled.div`
    padding: 30px;
    .mobile{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 5px;

        &__infos{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #ffffff;
            border-radius: 10px;
            padding: 10px 20px;

            &--username{
                color: #FF961A;
                font-weight: bold;
            }

            &--avatar{
                border-radius: 50%;
            }

            &--name{
                font-size: 1.625rem;
            }

            &--editbutton{
                background: linear-gradient(90.32deg, #FF951A 8.05%, #7E3500 82.81%);
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
                border-radius: 10px;
                padding: 8px 40px;
                color: #ffffff;
            }
        }

        &__title{
            display: flex;
            align-items: flex-start;
            font-family: 'Nexa-Bold';
            font-size: 0.8rem;
        }

        &__posts{
            padding: 10px;
            background: #ffffff;
            border-radius: 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
        }
    }
`;

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
                },
                orderBy: {
                    createdAt: "desc"
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
            <title>Festiv&apos;App | {profiledetails?.username}</title>
            </Head>
            
            <ProfileStyle>
                {/* mobile */}
                <div key={profiledetails?.id} className="mobile">
                    <div className="mobile__infos">
                        <p className="mobile__infos--username">@{profiledetails?.username}</p>

                        {profiledetails?.avatar ? (
                        <Image src={profiledetails?.avatar} width={200} height={200} alt='photo de profil' className='mobile__infos--avatar'/>
                        ) : (
                            <Image src={"/default_avatar.jpg"} width={200} height={200} alt='photo de profil' className='mobile__infos--avatar'/>
                        )}

                        <p className="mobile__infos--name">{profiledetails?.firstname} {profiledetails?.lastname}</p>

                        {user?.id === profiledetails?.id ? (
                        <button className='mobile__infos--editbutton'><Link href="/profile/editavatar"><a>Modifier l&apos;avatar</a></Link></button>
                        ):(
                            <></>
                        )}
                    </div>
                    <div className="mobile__title">
                        <h1>Publications ({profiledetails?.posts.length})</h1>
                    </div>
                    <div className="mobile__posts">
                        {!profiledetails?.posts.length ? (
                            <p>Aucun post</p>
                        ) : (
                            <>
                                {profiledetails?.posts.map((elt, i) => (
                                <div key={elt.id}>
                                    <Link href={`/post/${elt.id}`}>
                                        <a>
                                            <Image src={elt.image} width={120} height={120}/>
                                        </a>
                                    </Link>
                                </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>

                {/* <div key={profiledetails?.id}>
                    <h1>Pseudo : {profiledetails?.username}</h1>
                    <p>Prénom : {profiledetails?.firstname}</p>
                    <p>Nom : {profiledetails?.lastname}</p>
                    <p>Email : {profiledetails?.email}</p>
                    {profiledetails?.avatar ? (
                        <Image src={profiledetails?.avatar} width={80} height={80}/>
                    ) : (
                        <Image src={"/default_avatar.jpg"} width={80} height={80}/>
                    )}
                    {user?.id === profiledetails?.id ? (
                        <button><Link href="/profile/editavatar"><a>Modifier la photo</a></Link></button>
                    ):(
                        <></>
                    )}


                    {!profiledetails?.posts.length ? (
                        <p>Aucun post</p>
                    ) : (
                        <>
                            {profiledetails?.posts.map((elt, i) => (
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
                </div> */}
            </ProfileStyle>
        </>
    )
}

export default ProfileDetails


// import Head from 'next/head'
// import Post from "../../components/Post"
// import { useCookies } from "react-cookie"
// import { useState, useEffect } from "react";
// import { PrismaClient } from "@prisma/client";
// import { useRouter } from "next/router"
// import toast, { Toaster } from "react-hot-toast";
// import Image from 'next/image'
// import Link from 'next/link'

// export const getServerSideProps = async (context) => {
//     const usernameUser = context.query.username
//     const prisma = new PrismaClient()
//     const details = await prisma.user.findUnique({
//         where: {
//             username: usernameUser
//         },
//         select: {
//             id: true,
//             lastname: true,
//             firstname: true,
//             username: true,
//             email: true,
//             avatar: true,
//             posts: {
//                 select: {
//                     id: true,
//                     image: true,
//                 },
//                 orderBy: {
//                     createdAt: "desc"
//                 }
//             }
//         },
//     })
    
//     return {
//         props: {
//             profiledetails: details
//         }
//     }
// }

// const ProfileDetails = ({ profiledetails }) => {

//     const router = useRouter()
    
//     const [ cookie ] = useCookies(['user']);
//     const [user, setUser] = useState()

    

//     useEffect(() => {
//         if(cookie?.user){
//             setUser(cookie?.user)
//         }
    
//     }, [cookie.user])

//     return(
//         <>
//             <Head>
//             <title>Festiv&apos;App | {profiledetails?.username}</title>
//             </Head>
            
//             <div key={profiledetails?.id}>
//                 <h1>Pseudo : {profiledetails?.username}</h1>
//                 <p>Prénom : {profiledetails?.firstname}</p>
//                 <p>Nom : {profiledetails?.lastname}</p>
//                 <p>Email : {profiledetails?.email}</p>
//                 {profiledetails?.avatar ? (
//                     <Image src={profiledetails?.avatar} width={80} height={80}/>
//                 ) : (
//                     <Image src={"/default_avatar.jpg"} width={80} height={80}/>
//                 )}
//                 {user?.id === profiledetails?.id ? (
//                     <button><Link href="/profile/editavatar"><a>Modifier la photo</a></Link></button>
//                 ):(
//                     <></>
//                 )}


//                 {!profiledetails?.posts.length ? (
//                     <p>Aucun post</p>
//                 ) : (
//                     <>
//                         {profiledetails?.posts.map((elt, i) => (
//                         <div key={elt.id}>
//                             <Link href={`/post/${elt.id}`}>
//                                 <a>
//                                     <Image src={elt.image} width={100} height={100}/>
//                                 </a>
//                             </Link>
//                         </div>
//                         ))}
//                     </>
//                 )}
//             </div>
//         </>
//     )
// }

// export default ProfileDetails