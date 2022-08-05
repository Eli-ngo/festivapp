import styled from "styled-components";
import Image from "next/image";
import { useCookies } from 'react-cookie';
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const PostStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    .postCard{
        width: 300px;
        height: 400px;
        background: lightblue;
        margin-bottom: 30px;
    }
`

const Post = ({ posts }) => {

    const router = useRouter();

    const [ cookie ] = useCookies(['user']);

    const [user, setUser] = useState()

    // DELETE A POST
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
        router.replace(router.asPath)
    }

    useEffect(() => {
    // fetchData()
        if(cookie.user){
        setUser(cookie.user)
        }
    
    }, [cookie.user])

    return(
        <PostStyle>
            <div className="container">
                {posts.map((post) => (
                    <div key={post.id} className="postCard">
                        <Image src={post.image} alt={post.description} height={120} width={120} />
                        <p>{post.description}</p>
                        <p>{post.user.username}</p>
                        <Image src={post.user.avatar} height={50} width={50}/>
                        {user?.username === post.user.username ? <button onClick={() => handleDeletePost(post.id)}>Supprimer</button> : null}
                        
                    </div>
                ))}
            </div>
        </PostStyle>
    )
}

export default Post;

{/* <div>
        {datas.map((data, id) => {
          return (
            <div key={id}>
              <Image src={data.image} height={80} width={80}/>
              <p>{data.description}</p>
              <p>{data.user.username}</p> 
              {user?.username === data.user.username ? <button onClick={() => handleDeletePost(data.id)}>Supprimer</button> : null}
            </div>
          )
        })}
      </div> */}