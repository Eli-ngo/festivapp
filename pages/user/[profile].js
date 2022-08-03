import Head from 'next/head'
import { useCookies } from 'react-cookie';

export default function Profile() {

  const [ cookie ] = useCookies(['user']);
  return (
    <>
    <div>
      <Head>
        <title>Festivapp | Profil</title>
        <meta name="description" content="“Festiv'App” est une application qui rassemble tous les adeptes de festivals de musique du monde entier." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{cookie?.user?.firstname}</h1>
      <p>{cookie?.user?.lastname}</p>
      <p>{cookie?.user?.username}</p>
      <p>{cookie?.user?.email}</p>
      
    </div>
    </>
  )
}
