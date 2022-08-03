import Head from 'next/head'

export default function Home() {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
  }
  return (
    <>
    <div>
      <Head>
        <title>Festivapp | Home</title>
        <meta name="description" content="“Festiv'App” est une application qui rassemble tous les adeptes de festivals de musique du monde entier." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Festiv'app | Accueil</h1>
      

      <form  onSubmit={handleSubmit}>
        <input type="file" accept=".jpg, .png, .gif, .jpeg" name="file"/>
        <button>Valider</button>
      </form>
    </div>
    </>
  )
}
