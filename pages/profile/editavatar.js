import Head from 'next/head'
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import Link from 'next/link';

const EditavatarStyle = styled.div`
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

    .editAvatar{
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

            &--avatar, &--preview{
                border-radius: 50%;
            }

            &--submit{
                text-transform: uppercase;
                color: #ffffff;
                background: #000000;
                padding: 10px 30px;
                font-weight: bold;
                border-radius: 10px;
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
`;

export default function Profile() {

  const router = useRouter();

  const [ cookie, setCookie ] = useCookies(['user']);
  const [user, setUser] = useState()
  const [image, setImage] = useState('')
  const [previewImage, setPreviewImage] = useState();
  
  useEffect(() => {
    if(cookie.user){
      setUser(cookie.user)
    }

    // if(!user){
    //   router.push('/auth/signin')
    //   toast('Veuillez vous connecter pour accéder à cette page',
    //     {
    //         icon: '❌',
    //         style: {
    //         borderRadius: '10px',
    //         background: '#333',
    //         color: '#fff',
    //         },
    //     }
    //   );
    // }
  }, [cookie.user])

  const handleChange = (e) => {
    setImage(e.target.files[0])
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
  }

  const editImage = async (e) => {
    e.preventDefault()
    const retrieve = new FormData() //création d'un objet FormData pour récupérer les données d'un formulaire
    retrieve.append('image', image) //ajout de l'image dans l'objet
    toast.loading('Modification en cours...', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    })
    const res = await fetch(`/api/profile/${user.username}`, {
      method: 'POST',
      body: retrieve //on passe l'objet au serveur
    })
    const json = await res.json()
    if(res.ok){
      setCookie("user", JSON.stringify(json), {
        path: '/',
        maxAge: 259200, // Expire après 3 jours
        sameSite: true,
      })
      toast.remove()
      toast('Avatar modifié',
              {
                  icon: '✅',
                  style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                  },
              }
      );
      router.push(`/profile/${user?.username}`)
    }else{
      toast.remove()
      toast('Erreur lors de la modification',
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

  return (
    <>
      <Head>
        <title>Festiv&apos;App | Modifier l&apos;avatar</title>
      </Head>

      <EditavatarStyle>
        <h1 className='title'>Modifier l&apos;avatar</h1>
        <div className="editAvatar">
          <form onSubmit={editImage} className='editAvatar__form'>
            <div className="editAvatar__form--box">
              <input type="file" accept='.jpg, .jpeg .png, .wepb, .gif' onChange={handleChange}/>
            </div>
            
            <div className="editAvatar__form--box">
              {previewImage ? (
                  <Image src={previewImage} alt="Preview" width={250} height={250} className='editAvatar__form--preview' objectFit='cover'/>
              ) : (
                  <>
                  {user?.avatar? (
                      <Image
                          src={`${user?.avatar}`}
                          alt="Photo de profil"
                          width={250}
                          height={250}
                          objectFit="cover"
                          className='editAvatar__form--avatar'
                      />
                  ) : (
                    <Image
                        src={'/default_avatar.jpg'}
                        alt="Photo de profil"
                        width={250}
                        height={250}
                        objectFit="cover"
                        className='editAvatar__form--avatar'
                    />
                  )} 
                  </>
              )}
            </div>
            <div className="editAvatar__form--actions">
              <Link href={`/profile/${user?.username}`}><a className='editAvatar__form--back'>retour</a></Link>
              <button type="submit" className='editAvatar__form--submit'>Modifier</button>
            </div>
          </form>
        </div>
      </EditavatarStyle>
      
    </>
  )
}
