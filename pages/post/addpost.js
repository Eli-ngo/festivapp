import Head from 'next/head'
import styled from 'styled-components'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import Image from 'next/image'

export const AddpostStyle = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .container{
        display: flex;
        flex-direction: column;
    }

    form{
        display: flex;
        flex-direction: column;
    }
`

const AddPost = () => {

    const router = useRouter()

    const [ cookie, setCookie ] = useCookies(['user']);
    const [user, setUser] = useState()
    const [image, setImage] = useState('')
    const [post, setPost] = useState()
    const [previewImage, setpreviewImage] = useState();

    const [inputedPost, setInputedPost] = useState({
        id: "",
        image: "",
        description: "",
    })

    const handleImage = (e) => {
        setImage(e.target.files[0])
        console.log(e.target.files[0])
        setpreviewImage(URL.createObjectURL(e.target.files[0]))
    }

    const handleCreatePost = async (e) => {
        e.preventDefault()
        
        const res = await fetch(`/api/post/createpost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // id: inputedPost.id,
                image: inputedPost.image,
                description: inputedPost.description,
                user_id: cookie.user.id,
            }),
        })
        const json = await res.json()
        setInputedPost({ id: "", image: "", description: "" }) //on réinitialise les inputs
        if (res.ok) {
            toast('Post crée',
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
        }else{
            toast('Erreur',
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
        if(cookie.user){
            setUser(cookie.user)
        }

        if(!cookie.user){
        router.push('/auth/signin')
        toast('Veuillez vous connecter pour accéder à cette page',
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
    }, [cookie.user])

    return(
        <>
            <Head>
                <title>Festivapp | Home</title>
                <meta name="description" content="“Festiv'App” est une application qui rassemble tous les adeptes de festivals de musique du monde entier." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <AddpostStyle>
                <div className="container">
                <h1>Créer un post</h1>
                    <form onSubmit={handleCreatePost}>
                        <input value={inputedPost.image} type="text" placeholder="image" onChange={(e) => setInputedPost({... inputedPost, image: e.target.value})}/>
                        <input value={inputedPost.description} type="text" placeholder="description" onChange={(e) => setInputedPost({... inputedPost, description: e.target.value})}/>
                        <input type="file" accept='.jpg, .jpeg, .png, .webp' onChange={handleImage}/>
                        {previewImage ? (
                        <img src={previewImage} alt="Preview" width={150} height={150}/>
                    ) : (
                        <>
                        {post?.image? (
                            <Image
                                src={`${post?.image}`}
                                alt="Photo de post"
                                width={150}
                                height={150}
                                objectFit="cover"
                            />
                        ) : (
                            <Image
                                src={'/default_avatar.jpg'}
                                alt="Photo de post"
                                width={150}
                                height={150}
                                objectFit="cover"
                            />
                        )} 
                        </>
                    )}
                        <button type="submit">Créer</button>
                    </form>
                </div>
            </AddpostStyle>
        </>

    )
}
export default AddPost


// import Head from 'next/head'
// import styled from 'styled-components'
// import toast, { Toaster } from 'react-hot-toast'
// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
// import { useCookies } from 'react-cookie';

// export const AddpostStyle = styled.main`
//     width: 100%;
//     height: 100vh;
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     .container{
//         display: flex;
//         flex-direction: column;
//     }

//     form{
//         display: flex;
//         flex-direction: column;
//     }
// `

// const AddPost = () => {

//     const router = useRouter()

//     const [user, setUser] = useState()
//     const [ cookie, setCookie ] = useCookies(['user']);


//     const [inputedPost, setInputedPost] = useState({
//         id: "",
//         image: "",
//         description: "",
//     })

//     const handleCreatePost = async (e) => {
//         e.preventDefault()
//         const res = await fetch(`/api/post/createpost`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 // id: inputedPost.id,
//                 image: inputedPost.image,
//                 description: inputedPost.description,
//                 user_id: cookie.user.id,
//             }),
//         })
//         const json = await res.json()
//         setInputedPost({ id: "", image: "", description: "" }) //on réinitialise les inputs
//         if (res.ok) {
//             toast('Post crée',
//                 {
//                     icon: '✅',
//                     style: {
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                     },
//                 }
//                 );
//             router.push('/')
//         }else{
//             toast('Erreur',
//                 {
//                     icon: '❌',
//                     style: {
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                     },
//                 }
//                 );
//         }
//     }

//     useEffect(() => {
//             if(cookie.user){
//                 setUser(cookie.user)
//             }
    
//             if(!cookie.user){
//             router.push('/auth/signin')
//             toast('Veuillez vous connecter pour accéder à cette page',
//                         {
//                             icon: '❌',
//                             style: {
//                             borderRadius: '10px',
//                             background: '#333',
//                             color: '#fff',
//                             },
//                         }
//                         );
//             }
//         }, [cookie.user])
        

//     return(
//         <>
//         <Head>
//             <title>Festivapp | Home</title>
//             <meta name="description" content="“Festiv'App” est une application qui rassemble tous les adeptes de festivals de musique du monde entier." />
//             <link rel="icon" href="/favicon.ico" />
//         </Head>

//         <AddpostStyle>
//             <div className="container">
//                 <h1>Créer un post</h1>
//                 <form onSubmit={handleCreatePost}>
//                     <input value={inputedPost.image} type="text" placeholder="image" onChange={(e) => setInputedPost({... inputedPost, image: e.target.value})}/>
//                     <input value={inputedPost.description} type="text" placeholder="description" onChange={(e) => setInputedPost({... inputedPost, description: e.target.value})}/>
//                     <button type="submit">Créer</button>
//                 </form>
//             </div>
//         </AddpostStyle>
//         </>

//     )
// }
// export default AddPost