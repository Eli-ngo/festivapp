import Head from 'next/head'
import { useCookies } from 'react-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

export default function Profile() {

  const router = useRouter();

  const [ cookie ] = useCookies(['user']);
  const [user, setUser] = useState()


  useEffect(() => {
    if(cookie.user){
      setUser(cookie.user)
    }

  }, [cookie.user])

  return (
    <>
    <div>
      <Head>
        <title>Festivapp | Profil</title>
        <meta name="description" content="“Festiv'App” est une application qui rassemble tous les adeptes de festivals de musique du monde entier." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Pseudo : {user?.username}</h1>
      <p>Pseudo : {user?.firstname}</p>
      <p>Nom de famille : {user?.lastname}</p>
      <p>Email : {user?.email}</p>
      {user?.avatar ? (
        <Image src={user?.avatar} width={80} height={80}/>
      ) : (
        <Image src={"/default_avatar.jpg"} width={80} height={80}/>
      )}
      <button><Link href="/profile/editavatar"><a>Modifier la photo</a></Link></button>
      
    </div>
    </>
  )
}
