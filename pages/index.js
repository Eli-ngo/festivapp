import Head from 'next/head'

export default function Home() {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
  }
  return (
    <>
      <Head>
        <title>Festivapp | Home</title>
        <meta name="description" content="“Festiv'App” est une application qui rassemble tous les adeptes de festivals de musique du monde entier." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Bienvenue sur Festiv&apos;App</h1>
    </>
  )
}
