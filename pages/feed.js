import Head from 'next/head'
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

export default function Feed() {

  const [ cookie ] = useCookies(['user']);

  const [datas, setDatas] = useState([])

  const fetchData = async () => {
    const response = await fetch('/api/post/getpost')
    const json = await response.json()
    setDatas(json)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
    <div>
      <Head>
        <title>Festivapp | Feed</title>
        <meta name="description" content="“Festiv'App” est une application qui rassemble tous les adeptes de festivals de musique du monde entier." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Bonjour {cookie?.user?.firstname}</h1>

      <div>
        {datas.map((data, id) => {
          return (
            <div key={id}>
              <p>{data.image}</p>
              <p>{data.description}</p>
            </div>
          )
        })}
      </div>
      
    </div>
    </>
  )
}
