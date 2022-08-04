import Head from 'next/head'
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

export default function Profile() {

  const router = useRouter();

  const [ cookie, setCookie ] = useCookies(['user']);
  const [user, setUser] = useState()
  const [image, setImage] = useState('')
  const [previewImage, setpreviewImage] = useState();
  
  useEffect(() => {
    if(cookie.user){
      setUser(cookie.user)
    }

    // if(!cookie.user){
    //   router.push('/auth/signin')
    //   toast('Veuillez vous connecter pour accéder à cette page',
    //             {
    //                 icon: '❌',
    //                 style: {
    //                 borderRadius: '10px',
    //                 background: '#333',
    //                 color: '#fff',
    //                 },
    //             }
    //             );
    // }
  }, [cookie.user])

  const handleChange = (e) => {
    setImage(e.target.files[0])
    console.log(e.target.files[0])
    setpreviewImage(URL.createObjectURL(e.target.files[0]))
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
        maxAge: 1814400, // Expire après 3 semaines
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

      {previewImage ? (
          <img src={previewImage} alt="Preview" width={150} height={150}/>
      ) : (
          <>
          {user?.avatar? (
              <Image
                  src={`${user?.avatar}`}
                  alt="Photo de profil"
                  width={150}
                  height={150}
                  objectFit="cover"
              />
          ) : (
              <Image
                  src={'/default_avatar.jpg'}
                  alt="Photo de profil"
                  width={150}
                  height={150}
                  objectFit="cover"
              />
          )} 
          </>
      )}
                                        
      <form onSubmit={editImage}>
        <input type="file" accept='.jpg, .jpeg .png, .wepb, .gif' onChange={handleChange}/>
        <button type="submit">Modifier</button>
      </form>
      
    </div>
    </>
  )
}
