import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import { useRouter } from 'next/router'
// import styled from 'styled-components'

const AddPost = () => {

    const router = useRouter()

    const [inputedPost, setInputedPost] = useState({
        id: "",
        image: "",
        description: "",
    })

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
                user_id: 23
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
            router.push('/feed')
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

    return(
        <>
        <h1>Créer un post</h1>
        <form onSubmit={handleCreatePost}>
            <input value={inputedPost.image} type="text" placeholder="image" onChange={(e) => setInputedPost({... inputedPost, image: e.target.value})}/>
            <input value={inputedPost.description} type="text" placeholder="description" onChange={(e) => setInputedPost({... inputedPost, description: e.target.value})}/>
            <button type="submit">Créer</button>
        </form>
        </>

    )
}
export default AddPost