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
        const retrieve = new FormData() 
        retrieve.append('image', image)
        retrieve.append('description', inputedPost.description)
        retrieve.append('user_id', user.id)
        toast.loading('Chargement en cours...', {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            }
        })
        const res = await fetch(`/api/post/createpost`, {
        method: 'POST',
        body: retrieve
        })
        const json = await res.json()
        
        if (res.ok) {
            toast.remove()
            toast('Votre post a été publié',
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
            toast.remove()
            toast('Erreur lors de la création du post',
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

        // if(!user){
        //     router.push('/auth/signin')
        //     toast('Veuillez vous connecter pour accéder à cette page',
        //         {
        //             icon: '❌',
        //             style: {
        //             borderRadius: '10px',
        //             background: '#333',
        //             color: '#fff',
        //             },
        //         }
        //         );
        // }

    }, [cookie.user])

    return(
        <>
            <Head>
                <title>Festiv&apos;App | Ajouter un post</title>
            </Head>

            <AddpostStyle>
                <div className="container">
                <h1>Créer un post</h1>
                    <form onSubmit={handleCreatePost}>
                        <input value={inputedPost.description} type="text" placeholder="description" onChange={(e) => setInputedPost({... inputedPost, description: e.target.value})}/>
                        <input type="file" accept='.jpg, .jpeg, .png, .webp, .gif' onChange={handleImage}/>
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
// import React from 'react'
// import toast, { Toaster } from 'react-hot-toast'
// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
// import { useCookies } from 'react-cookie'
// import Image from 'next/image'

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

//     const [ cookie, setCookie ] = useCookies(['user']);
//     const [user, setUser] = useState()
//     const [image, setImage] = useState('')
//     const [post, setPost] = useState()
//     const [previewImage, setpreviewImage] = useState();

//     const [inputedPost, setInputedPost] = useState({
//         id: "",
//         image: "",
//         description: "",
//     })
    

//     const handleImage = (e) => {
//         setImage(e.target.files[0])
//         console.log(e.target.files[0])
//         setpreviewImage(URL.createObjectURL(e.target.files[0]))
//     }

//     const handleCreatePost = async (e) => {
//         e.preventDefault()
//         const retrieve = new FormData() 
//         retrieve.append('image', image)
//         retrieve.append('description', inputedPost.description)
//         retrieve.append('user_id', user.id)
//         toast.loading('Chargement en cours...', {
//             style: {
//                 borderRadius: '10px',
//                 background: '#333',
//                 color: '#fff',
//             }
//         })
//         const res = await fetch(`/api/post/createpost`, {
//         method: 'POST',
//         body: retrieve
//         })
//         const json = await res.json()
        
//         if (res.ok) {
//             toast.remove()
//             toast('Votre post a été publié',
//                 {
//                     icon: '✅',
//                     style: {
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                     },
//                 }
//             );
//             router.push('/')
//         }else{
//             toast.remove()
//             toast('Erreur lors de la création du post',
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

//     useEffect(() => {
//         if(cookie.user){
//             setUser(cookie.user)
//         }

//         // if(!user){
//         //     router.push('/auth/signin')
//         //     toast('Veuillez vous connecter pour accéder à cette page',
//         //         {
//         //             icon: '❌',
//         //             style: {
//         //             borderRadius: '10px',
//         //             background: '#333',
//         //             color: '#fff',
//         //             },
//         //         }
//         //         );
//         // }

//     }, [cookie.user])

//     return(
//         <>
//             <Head>
//                 <title>Festiv&apos;App | Ajouter un post</title>
//             </Head>

//             <AddpostStyle>
//                 <div className="container">
//                 <h1>Créer un post</h1>
//                     <form onSubmit={handleCreatePost}>
//                         <input value={inputedPost.description} type="text" placeholder="description" onChange={(e) => setInputedPost({... inputedPost, description: e.target.value})}/>
//                         <input type="file" accept='.jpg, .jpeg, .png, .webp, .gif' onChange={handleImage}/>
//                         {previewImage ? (
//                         <img src={previewImage} alt="Preview" width={150} height={150}/>
//                     ) : (
//                         <>
//                         {post?.image? (
//                             <Image
//                                 src={`${post?.image}`}
//                                 alt="Photo de post"
//                                 width={150}
//                                 height={150}
//                                 objectFit="cover"
//                             />
//                         ) : (
//                             <Image
//                                 src={'/default_avatar.jpg'}
//                                 alt="Photo de post"
//                                 width={150}
//                                 height={150}
//                                 objectFit="cover"
//                             />
//                         )} 
//                         </>
//                     )}
//                         <button type="submit">Créer</button>
//                     </form>
//                 </div>
//             </AddpostStyle>
//         </>

//     )
// }
// export default AddPost