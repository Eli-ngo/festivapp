import Head from 'next/head'
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast'
import Image from 'next/image';
import Post from '../components/Post';

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3000/api/post/getpost');
  const datas = await response.json()
  
  return {
    props: {
      posts: datas
    }
  }
}

export default function Feed({ posts }) {

  const [ cookie ] = useCookies(['user']);

  const [user, setUser] = useState()

  // const [datas, setDatas] = useState([])

  // const fetchData = async () => {
  //   const response = await fetch('/api/post/getpost')
  //   const json = await response.json()
  //   setDatas(json)
  // }

  // //DELETE A POST
  // const handleDeletePost = async (id) => { //deletes the data based on the id
  //   const response = await fetch(`/api/post/deletepost`, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({ id }),
  //   })
  //   const json = await response.json()
  //   console.log(json)
  //   toast('Votre post a été supprimé',
  //               {
  //                   icon: '✅',
  //                   style: {
  //                   borderRadius: '10px',
  //                   background: '#333',
  //                   color: '#fff',
  //                   },
  //               }
  //               );
  //   fetchData()
  // }

  useEffect(() => {
    // fetchData()
      if(cookie.user){
        setUser(cookie.user)
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
      <h1>Bonjour {user?.firstname}</h1>

      <h2>FEED</h2>
      <Post posts={posts}/>
      
    </div>
    </>
  )
}




// import Head from 'next/head'
// import { useCookies } from 'react-cookie';
// import { useState, useEffect } from 'react';
// import toast, { Toaster } from 'react-hot-toast'
// import Image from 'next/image';

// export default function Feed() {

//   const [ cookie ] = useCookies(['user']);

//   const [user, setUser] = useState()

//   const [datas, setDatas] = useState([])

//   const fetchData = async () => {
//     const response = await fetch('/api/post/getpost')
//     const json = await response.json()
//     setDatas(json)
//   }

//   //DELETE A POST
//   const handleDeletePost = async (id) => { //deletes the data based on the id
//     const response = await fetch(`/api/post/deletepost`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ id }),
//     })
//     const json = await response.json()
//     console.log(json)
//     toast('Votre post a été supprimé',
//                 {
//                     icon: '✅',
//                     style: {
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                     },
//                 }
//                 );
//     fetchData()
//   }

//   useEffect(() => {
//     fetchData()
//       if(cookie.user){
//         setUser(cookie.user)
//       }
  
//   }, [cookie.user])

//   return (
//     <>
//     <div>
//       <Head>
//         <title>Festivapp | Home</title>
//         <meta name="description" content="“Festiv'App” est une application qui rassemble tous les adeptes de festivals de musique du monde entier." />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <h1>Bonjour {user?.firstname}</h1>

//       <h2>FEED</h2>
//       <div>
//         {datas.map((data, id) => {
//           return (
//             <div key={id}>
//               <Image src={data.image} height={80} width={80}/>
//               <p>{data.description}</p>
//               <p>{data.user.username}</p> 
//               {user?.username === data.user.username ? <button onClick={() => handleDeletePost(data.id)}>Supprimer</button> : null}
//             </div>
//           )
//         })}
//       </div>
      
//     </div>
//     </>
//   )
// }
