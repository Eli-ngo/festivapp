import Head from 'next/head'
import { useCookies } from 'react-cookie';

export default function Feed() {

  const [ cookie ] = useCookies(['user']);
  return (
    <>
    <div>
      <Head>
        <title>Festivapp | Home</title>
        <meta name="description" content="“Festiv'App” est une application qui rassemble tous les adeptes de festivals de musique du monde entier." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Bonjour {cookie?.user?.firstname}</h1>
      
    </div>
    </>
  )
}
