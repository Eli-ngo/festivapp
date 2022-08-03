import Head from 'next/head'
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast'

export default function Feed() {

  const [ cookie ] = useCookies(['user']);

  const [datas, setDatas] = useState([])

  const fetchData = async () => {
    const response = await fetch('/api/post/getpost')
    const json = await response.json()
    setDatas(json)
  }

  //DELETE A POST
  const handleDeletePost = async (id) => { //deletes the data based on the id
    const response = await fetch(`/api/post/deletepost`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
    const json = await response.json()
    console.log(json)
    toast('Votre post a été supprimé',
                {
                    icon: '✅',
                    style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    },
                }
                );
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
    <div>
      <Head>
        <title>Festivapp | Home</title>
        <meta name="description" content="“Festiv'App” est une application qui rassemble tous les adeptes de festivals de musique du monde entier." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Bonjour {cookie?.user?.firstname}</h1>

      <h2>FEED</h2>
      <div>
        {datas.map((data, id) => {
          return (
            <div key={id}>
              <p>{data.image}</p>
              <p>{data.description}</p>
              <p>{data.user_id}</p>
              <button onClick={() => handleDeletePost(data.id)}>Delete Data</button>
            </div>
          )
        })}
      </div>
      
    </div>
    </>
  )
}
