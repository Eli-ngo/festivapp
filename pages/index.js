import Head from 'next/head'
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import Post from '../components/Post';
import Link from 'next/link';
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
        <title>Festiv&apos;App | Feed</title>
      </Head>

      <h1>FEED</h1>
      {user ? (
        <Link href="/post/addpost"><a><button>Ajouter un post</button></a></Link>
      ):(
        <>
        </>
      )}
      {posts.map((elt, i) => (
        <Post post={elt} key={i} userUsername={user?.username} />
      ))}
      
    </div>
    </>
  )
}

