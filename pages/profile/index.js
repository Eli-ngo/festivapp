import Head from 'next/head'
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Profile() {

  const [ cookie, setCookie ] = useCookies(['user']);
  const [user, setUser] = useState()
  const [image, setImage] = useState('')
  
  useEffect(() => {
    if(cookie.user){
      setUser(cookie.user)
    }
  }, [cookie.user])
  const handleChange = (e) => {
    setImage(e.target.files[0])
    console.log(e.target.files[0])
  }

  const editImage = async (e) => {
    e.preventDefault()
    const retrieve = new FormData() //création d'un objet FormData pour récupérer les données d'un formulaire
    retrieve.append('image', image) //ajout de l'image dans l'objet
    const res = await fetch(`/api/profile/${cookie.user.username}`, {
      method: 'POST',
      body: retrieve //on passe l'objet au serveur
    })
    const json = await res.json()
    if(res.ok){
      setCookie("user", JSON.stringify(json), {
        path: '/',
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
    })
    }
  }

  return (
    <>
    <div>
      <Head>
        <title>Festivapp | Profil</title>
        <meta name="description" content="“Festiv'App” est une application qui rassemble tous les adeptes de festivals de musique du monde entier." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Bonjour {user?.firstname}</h1>
      {user?.avatar ? (
        <Image
          src={`${user?.avatar}`}
          alt="Profile"
          width={90}
          height={90}
        />
      ) : (
        'Aucune photo'
      )}
      <form onSubmit={editImage}>
        <input type="file" accept='.jpg, .jpeg .png, .wepb' onChange={handleChange}/>
        <button type="submit">Modifier</button>
      </form>
      
    </div>
    </>
  )
}
