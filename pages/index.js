import Head from 'next/head'
import toast, { Toaster } from 'react-hot-toast'

export default function Home() {

  const notify = () => toast('Here is your toast');
  return (
    <>
    <div>
      <Head>
        <title>Festivapp | Home</title>
        <meta name="description" content="“Festiv'App” est une application qui rassemble tous les adeptes de festivals de musique du monde entier." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Festiv&apos;App | Accueil</h1>
      <button onClick={notify}> Make me a toast</button>
      <Toaster />
    </div>
    </>
  )
}
