import Head from 'next/head'
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import Post from '../components/Post';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import styled from 'styled-components';

const HomeStyle = styled.div`
    width: 100%;
    padding: 30px;

    .feed__container{
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .home__title{
      font-family: 'Nexa-Bold';
      text-align: left;
    }

    .home__description{
      margin-bottom: 80px;
    }
`

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
    <HomeStyle>
      <Head>
        <title>Festiv&apos;App | Feed</title>
      </Head>

      <div className="feed__container">
        <h1 className='home__title'>Feed</h1>
        {user ? (
          <Link href="/post/addpost"><a><button className='defaultButton'>+ ajouter un post</button></a></Link>
        ):(
          <>
          </>
        )}
      </div>
      <p className='home__description'>Bienvenue sur le feed des posts dédiés aux festivals de musique du monde entier. Partagez vos moments de bonheur.</p>

      {posts.map((elt, i) => (
        <Post post={elt} key={i} userUsername={user?.username} />
      ))}    
    </HomeStyle>
    </>
  )
}

