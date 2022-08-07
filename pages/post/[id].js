import Head from 'next/head'
import Post from "../../components/Post"
import { useCookies } from "react-cookie"
import { useState, useEffect } from "react";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router"
import toast, { Toaster } from "react-hot-toast";

export const getServerSideProps = async (context) => {
    const idpost = context.query.id
    const prisma = new PrismaClient()
    const details = await prisma.post.findUnique({
        where: {
            id: parseInt(idpost)
        },
        select: {
            id: true,
            image:true,
            description:true,
            user:{
                select: {
                    username: true,
                    avatar: true,
                }
            },
            comments: {
                select: {
                    id: true,
                    content: true,
                    user:{
                        select: {
                            username: true,
                            avatar: true,
                        }
                    },
                    post: {
                        select: {
                            id: true,
                        }
                    }
                },
                orderBy: {
                    updatedAt: 'desc'
                }
            }
        },
    })
    
    return {
        props: {
            postdetails: details
        }
    }
}

const Details = ({ postdetails }) => {

    const router = useRouter()
    
    const [ cookie ] = useCookies(['user']);
    const [user, setUser] = useState()

    const [inputedComment, setInputedComment] = useState({
        id: "",
        content: "",
        user_id: "",
        post_id: "",
    })

    const handleCreateComment = async (e) => {
        e.preventDefault()
        toast.loading('Chargement en cours...', {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            }
        })
        const res = await fetch('/api/post/createcomment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: inputedComment.id,
                content: inputedComment.content,
                user_id: user?.id,
                post_id: postdetails.id,
            })
        })
        if(!user){
            router.push('/auth/signin')
        }
        if(res.ok){
            router.replace(router.asPath)
            toast.remove()
            toast('Commentaire ajouté',
                {
                    icon: '✅',
                    style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    },
                }
            );
            setInputedComment({ id: "", content: "", user_id: "", post_id: "" }) //on réinitialise les inputs
        }else{
            toast.remove()
            toast('Veuillez vous connecter pour pouvoir commenter',
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

    useEffect(() => {
        if(cookie?.user){
            setUser(cookie?.user)
        }
    
    }, [cookie.user])

    return(
        <>
            <Head>
            <title>Festiv&apos;App | Page détails</title>
            </Head>
            <div key={postdetails.id}>
                <Post post={postdetails} user={user}/>
            </div>
            <form onSubmit={handleCreateComment}>
                <input value={inputedComment.content || ""} type="text" placeholder="Content" onChange={(e) => setInputedComment({... inputedComment, content: e.target.value})} />
                <button type="submit">Ajouter un commentaire</button>
            </form>
        </>
    )
}

export default Details