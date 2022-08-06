import Head from 'next/head'
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import Post from '../components/Post';
import { PrismaClient } from '@prisma/client';

export const getServerSideProps = async () => {
  const prisma = new PrismaClient()
  const datas = await prisma.post.findMany({
    select: {
      id: true,
      image:true,
      description:true,
      user:{
          select: {
              username: true,
              avatar: true,
          }
      },
      comments: {
          select: {
              id: true,
              content: true,
              user:{
                  select: {
                      username: true,
                      avatar: true,
                  }
              }
          }
      }
  },
  orderBy: {
      updatedAt: 'desc'
  }
  })
  
  return {
    props: {
      posts: datas
    }
  }
}

export default function Feed({ posts }) {

  const [ cookie ] = useCookies(['user']);

  const [user, setUser] = useState()

  useEffect(() => {
      if(cookie?.user){
        setUser(cookie?.user)
      }
  
  }, [cookie.user])

  return (
    <>
    <div>
      <Head>
        <title>Festivapp | Home</title>
        <meta name="description" content="“Festiv'App” est une application qui rassemble tous les adeptes de festivals de musique du monde entier." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>FEED</h1>
      {posts.map((elt, i) => (
        <Post post={elt} key={i} userUsername={user?.username} />
      ))}
      
    </div>
    </>
  )
}

