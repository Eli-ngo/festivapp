import Head from 'next/head'
import Post from "../../components/Post"
import { useCookies } from "react-cookie"
import { useState, useEffect } from "react";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router"
import toast, { Toaster } from "react-hot-toast";
import Link from 'next/link'
import Image from 'next/image'
import styled  from 'styled-components'

const PostDetailsStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;

    .mobile{
        &__title{
            font-family: 'Nexa-Bold';
            font-size: 2rem;
        }
        
        &__number{
            font-size: 1.4rem;
        }

        &__addcomment{
            background: #fff;
            padding: 10px 20px;
            border-radius: 10px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            &--input{
                border: none;
                width: 100%;
            }
        }
        &__displaycomments{
            border-radius: 10px;
            margin-top: 30px;

            &--infos{
                display: flex;
                align-items: center;
                gap: 10px;
            }

            &--box{
                margin-bottom: 30px;
                background: #fff;
                border-radius: 10px;
                padding: 10px;
            }

            &--avatar{
                border-radius: 50%;
                cursor: pointer;
            }

            &--content{
                word-wrap: break-word;
            }
        }
        &__delete{
            border: solid 1px #E20000;
            border-radius: 5px;
            padding: 5px 15px;
            color: #E20000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            margin-bottom: 30px;
        }
    }
`;


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
            router.replace({
                pathname: router.asPath},
                undefined, {
                    scroll: false
                }
            )
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

            <PostDetailsStyle>
                {/* mobile version */}
                <div className="mobile">
                    <h1 className="mobile__title">Détails du post</h1>
                    {user?.username === postdetails.user.username ? (
                        <button onClick={() => handleDeletePost(postdetails.id)} className='mobile__delete'>Supprimer</button>
                    ): (
                        <></>
                    )}
                    <Post post={postdetails} user={user}/>
                    <form onSubmit={handleCreateComment} className='mobile__addcomment'>
                        <input className='mobile__addcomment--input' value={inputedComment.content || ""} type="text" placeholder="Ajouter un commentaire" onChange={(e) => setInputedComment({... inputedComment, content: e.target.value})} />
                        <button type="submit"><Image src='/img/send_icon.svg' width={30} height={30} alt='bouton ajouter commentaires' /></button>
                    </form>

                    <h2 className='mobile__number'>Commentaires ({postdetails?.comments?.length})</h2>
                    <div className="mobile__displaycomments">
                        {!postdetails?.comments.length ? (
                            <p>Aucun commentaire</p>
                            ) : (
                                <>
                                {postdetails?.comments?.map((comment, i) => (
                                    <div key={comment.id} className='mobile__displaycomments--box'>
                                        <div className="mobile__displaycomments--infos">
                                            {comment.user?.avatar ? (
                                                <Link href={`/profile/${comment.user?.username}`}><Image src={comment.user?.avatar} height={40} width={40} className='mobile__displaycomments--avatar'/></Link>
                                            ) : (
                                                <Image src='/img/default_avatar.svg' height={40} width={40} className='mobile__displaycomments--avatar'/>
                                            )}
                                            <Link href={`/profile/${comment.user?.username}`}><a className='mobile__displaycomments--username'>{comment.user?.username}</a></Link>
                                        </div>
                                        <p className='mobile__displaycomments--content'>{comment.content}</p>
                                    </div>
                                ))}
                                </>
                            )
                        }
                    </div>
                </div>



                {/* <div key={postdetails.id}>
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
                </form> */}
            </PostDetailsStyle>
        </>
    )
}

export default Details

// import Head from 'next/head'
// import Post from "../../components/Post"
// import { useCookies } from "react-cookie"
// import { useState, useEffect } from "react";
// import { PrismaClient } from "@prisma/client";
// import { useRouter } from "next/router"
// import toast, { Toaster } from "react-hot-toast";
// import Link from 'next/link'
// import Image from 'next/image'

// export const getServerSideProps = async (context) => {
//     const idpost = context.query.id
//     const prisma = new PrismaClient()
//     const details = await prisma.post.findUnique({
//         where: {
//             id: parseInt(idpost)
//         },
//         select: {
//             id: true,
//             image:true,
//             description:true,
//             user:{
//                 select: {
//                     username: true,
//                     avatar: true,
//                 }
//             },
//             comments: {
//                 select: {
//                     id: true,
//                     content: true,
//                     user:{
//                         select: {
//                             username: true,
//                             avatar: true,
//                         }
//                     },
//                     post: {
//                         select: {
//                             id: true,
//                         }
//                     }
//                 },
//                 orderBy: {
//                     updatedAt: 'desc'
//                 }
//             }
//         },
//     })
    
//     return {
//         props: {
//             postdetails: details
//         }
//     }
// }

// const Details = ({ postdetails }) => {

//     const router = useRouter()
    
//     const [ cookie ] = useCookies(['user']);
//     const [user, setUser] = useState()

//     const [inputedComment, setInputedComment] = useState({
//         id: "",
//         content: "",
//         user_id: "",
//         post_id: "",
//     })

//     const handleCreateComment = async (e) => {
//         e.preventDefault()
//         toast.loading('Chargement en cours...', {
//             style: {
//                 borderRadius: '10px',
//                 background: '#333',
//                 color: '#fff',
//             }
//         })
//         const res = await fetch('/api/post/createcomment', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 id: inputedComment.id,
//                 content: inputedComment.content,
//                 user_id: user?.id,
//                 post_id: postdetails.id,
//             })
//         })
//         if(!user){
//             router.push('/auth/signin')
//         }
//         if(res.ok){
//             router.replace(router.asPath)
//             toast.remove()
//             toast('Commentaire ajouté',
//                 {
//                     icon: '✅',
//                     style: {
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                     },
//                 }
//             );
//             setInputedComment({ id: "", content: "", user_id: "", post_id: "" }) //on réinitialise les inputs
//         }else{
//             toast.remove()
//             toast('Veuillez vous connecter pour pouvoir commenter',
//                 {
//                     icon: '❌',
//                     style: {
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                     },
//                 }
//             );
//         }
//     }

//     // DELETE A POST
//     const handleDeletePost = async (id) => {
//         toast.loading('Suppression en cours...', {
//             style: {
//                 borderRadius: '10px',
//                 background: '#333',
//                 color: '#fff',
//             }
//         })
//         const response = await fetch(`/api/post/deletepost`, {
//         method: "POST",
//         headers: {
//             "Content-type": "application/json",
//         },
//         body: JSON.stringify({ id }),
//         })
//         const json = await response.json()
//         console.log(json)
//         toast.remove()
//         toast('Votre post a été supprimé',
//                     {
//                         icon: '✅',
//                         style: {
//                         borderRadius: '10px',
//                         background: '#333',
//                         color: '#fff',
//                         },
//                     }
//                     );
//         router.push('/')
//     }

//     useEffect(() => {
//         if(cookie?.user){
//             setUser(cookie?.user)
//         }
    
//     }, [cookie.user])

//     return(
//         <>
//             <Head>
//             <title>Festiv&apos;App | Page détails</title>
//             </Head>
//             <div key={postdetails.id}>
//                 <Post post={postdetails} user={user}/>
//                 {user?.username === postdetails.user.username ? (
//                     <button onClick={() => handleDeletePost(postdetails.id)}>Supprimer</button>
//                 ): (
//                     <></>
//                 )}

//                 <div className="comments">
//                 {!postdetails?.comments.length ? (
//                     <p>Aucun commentaire</p>
//                     ) : (
//                         <>
//                         {postdetails?.comments?.map((comment, i) => (
//                             <div key={comment.id}>
//                                 <p>{comment.content}</p>
//                                 <p>par <Link href={`/profile/${comment.user?.username}`}><a>{comment.user?.username}</a></Link></p>
//                                 {comment.user?.avatar ? (
//                                 <Image src={comment.user?.avatar} height={30} width={30}/>
//                             ) : (
//                                 'aucune photo'
//                             )}
//                             </div>
//                         ))}
//                         </>
//                     )
//                 }
//                 </div>

//             </div>
//             <form onSubmit={handleCreateComment}>
//                 <input value={inputedComment.content || ""} type="text" placeholder="Content" onChange={(e) => setInputedComment({... inputedComment, content: e.target.value})} />
//                 <button type="submit">Ajouter un commentaire</button>
//             </form>
//         </>
//     )
// }

// export default Details