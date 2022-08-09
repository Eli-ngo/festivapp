import Head from 'next/head'
import Post from "../../components/Post"
import { useCookies } from "react-cookie"
import { useState, useEffect } from "react";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router"
import toast, { Toaster } from "react-hot-toast";
import Link from 'next/link'
import Image from 'next/image'

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

    // DELETE A POST
    const handleDeletePost = async (id) => {
        toast.loading('Suppression en cours...', {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            }
        })
        const response = await fetch(`/api/post/deletepost`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ id }),
        })
        const json = await response.json()
        console.log(json)
        toast.remove()
        toast('Votre post a été supprimé',
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
                {user?.username === postdetails.user.username ? (
                    <button onClick={() => handleDeletePost(postdetails.id)}>Supprimer</button>
                ): (
                    <></>
                )}

                <div className="comments">
                {!postdetails?.comments.length ? (
                    <p>Aucun commentaire</p>
                    ) : (
                        <>
                        {postdetails?.comments?.map((comment, i) => (
                            <div key={comment.id}>
                                <p>{comment.content}</p>
                                <p>par <Link href={`/profile/${comment.user?.username}`}><a>{comment.user?.username}</a></Link></p>
                                {comment.user?.avatar ? (
                                <Image src={comment.user?.avatar} height={30} width={30}/>
                            ) : (
                                'aucune photo'
                            )}
                            </div>
                        ))}
                        </>
                    )
                }
                </div>

            </div>
            <form onSubmit={handleCreateComment}>
                <input value={inputedComment.content || ""} type="text" placeholder="Content" onChange={(e) => setInputedComment({... inputedComment, content: e.target.value})} />
                <button type="submit">Ajouter un commentaire</button>
            </form>
        </>
    )
}

export default Details