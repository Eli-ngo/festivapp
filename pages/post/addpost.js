import Head from 'next/head'
import styled from 'styled-components'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import Image from 'next/image'
import Link from 'next/link'

export const AddpostStyle = styled.main`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 20px;

    .title{
        font-size: 1.625rem;
        font-family: 'Nexa-Bold'
    }

    .addPost{
        background: #ffffff;
        border-radius: 20px;
        padding: 20px;

        &__form{
            display: flex;
            flex-direction: column;
            align-items: flex-start;    
            justify-content: center;

            &--box{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin-bottom: 30px;
                gap: 10px;
            }

            &--preview{
                width: 250px;
                height: 66px;
                border: dashed 2px grey;
            }

            &--submit{
                text-transform: uppercase;
                color: #ffffff;
                background: #000000;
                padding: 10px 30px;
                font-weight: bold;
                border-radius: 10px;
            }

            &--description{
                width: 250px;
                height: 150px;
                border-radius: 10px;
                padding: 10px;
                border: solid 1px grey;
            }

            &--actions{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                gap: 25px;

            }
            
            &--back{
                    display: flex;
                    justify-content: center;
                    padding: 10px 20px;
                    border: solid 1px black;
                    border-radius: 10px;
            }
        }
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
                <h1 className='title'>Ajouter un post</h1>
                <div className="addPost">
                    <form onSubmit={handleCreatePost} className='addPost__form'>
                            <div className="addPost__form--box">
                                <label>Fichier</label>
                                <input className='addPost__form--upload' type="file" accept='.jpg, .jpeg, .png, .webp, .gif' onChange={handleImage}/>
                            </div>
                            <div className="addPost__form--box">
                                <label>Aperçu</label>
                                {previewImage ? (
                                <img src={previewImage} alt="Preview" width={250} height={250} objectFit="cover"/>
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
                                        <div className="addPost__form--preview">

                                        </div>
                                    )} 
                                </>
                                )}
                            </div>
                        <div className="addPost__form--box">
                            <label>Description</label>
                            <textarea className='addPost__form--description' value={inputedPost.description} type="text" placeholder="description" onChange={(e) => setInputedPost({... inputedPost, description: e.target.value})}/>
                        </div>

                        <div className="addPost__form--actions">
                            <Link href="/"><a className='addPost__form--back'>retour</a></Link>
                            <button type="submit" className='addPost__form--submit'>ajouter</button>
                        </div>
                    </form>
                </div>
            </AddpostStyle>
        </>

    )
}
export default AddPost