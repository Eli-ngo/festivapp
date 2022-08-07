import styled from "styled-components";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";

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

const Post = ({ post, userUsername }) => {

    const router = useRouter();

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

    console.log(post)

    return(
        <PostStyle>
            <div className="container">
                <div key={post?.id} className="postCard">
                    <Link href={'/post/' + post?.id}><Image src={post?.image} alt={post?.description} height={120} width={120} /></Link>
                    <p>{post?.description}</p>
                    <p>{post?.user.username}</p>
                    <p>{post?.comments.length} commentaire{post?.comments.length > 1 ? 's' : ''}</p>
                    {!post.comments.length ? (
                        <p>Aucun commentaire</p>
                        ) : (
                            <>
                            {post.comments?.map((comment, i) => (
                                <div key={comment.id}>
                                    <p>{comment.content}</p>
                                    <p>par {comment.user?.username}</p>
                                    {comment.user?.avatar ? (
                                    <Image src={comment.user?.avatar} height={30} width={30}/>
                                ) : (
                                    'aucune photo'
                                )}

                                </div>
                            ))}
                            </>
                        )
                    }
                    {post.user.avatar ? (
                        <Image src={post.user.avatar} height={50} width={50}/>
                    ) : (
                        'aucune photo'
                    )}
                    {userUsername === post?.user.username ? <button onClick={() => handleDeletePost(post.id)}>Supprimer</button> : null}
                    
                </div>
            </div>
        </PostStyle>
    )
}

export default Post;