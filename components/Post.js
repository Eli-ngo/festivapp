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
        width: 260px;
        background: #ffffff;
        margin-bottom: 50px;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

        @media only screen and (min-width: 375px) {
            width: 320px;
        }

        @media only screen and (min-width: 425px) {
            width: 370px;
        }

        &__author{
            display: flex;
            align-items: center;
            justify-content: start;
            gap: 15px;
            margin-bottom: 30px;

            &--avatar{
                border-radius: 50%;
            }
        }

        &__image{
            border-radius: 50px 0 50px 0;
            cursor: pointer;
            width: 220px;
            height: 220px;

            @media only screen and (min-width: 375px) {
                width: 280px;
                height: 280px;
            }

            @media only screen and (min-width: 425px) {
                width: 330px;
                height: 330px;
            }
        }

        &__stats{
            display: flex;
            align-items: center;
            justify-content: end;
            gap: 30px;
            margin-bottom: 20px;

            &--likes{
                display: flex;
                gap: 5px;
            }

            &--comments{
                display: flex;
                gap: 5px;
            }
        }

        &__options{
            &--comments{
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 30px 0;
            }

            &--details{
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-direction: column;
            }
            &--delete{
                border: solid 1px #E20000;
                border-radius: 5px;
                padding: 5px 15px;
                color: #E20000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

    }
`

const Post = ({ post, userUsername }) => {

    const router = useRouter();

    // DELETE A POST
    const handleDeletePost = async (id) => { //deletes the data based on the id
        toast.loading('Suppression en cours...', {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            }
        })
        const response = await fetch(`/api/post/deletepost`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ id }),
        })
        const json = await response.json()
        console.log(json)
        toast.remove()
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
                    <div className="postCard__author">
                        {post.user.avatar ? (
                            <Link href={`/profile/${post?.user.username}`}>
                                <Image src={post.user.avatar} height={47} width={47} alt="photo de profil auteur" className='postCard__author--avatar'/>
                            </Link>
                        ) : (
                            <Link href={`/profile/${post?.user.username}`}>
                                <Image src={`/default_avatar.jpg`} height={47} width={47} alt="photo de profil auteur par défaut" className='postCard__author--avatar'/>
                            </Link>
                        )}

                        <Link href={`/profile/${post?.user.username}`}><a>{post?.user.username}</a></Link>
                    </div>
                    <p>{post?.description}</p>

                    <div className="postCard__stats">
                        <div className="postCard__stats--likes">
                            <Image src={'/img/likes_icon.svg'} width={30} height={30}/>
                            <p>26</p>
                        </div>
                        <div className="postCard__stats--comments">
                            <Image src={'/img/comments_icon.svg'} width={30} height={30}/>
                            <p>{post?.comments.length}</p>
                        </div>
                    </div>

                    <Link href={'/post/' + post?.id}><img src={post?.image} alt={post?.description} className='postCard__image'/></Link>

                    <div className="postCard__options">
                        <div className="postCard__options--actions">
                            <Image src={'/img/fav_icon.svg'} width={30} height={30}/>
                            <Image src={'/img/share_icon.svg'} width={30} height={30}/>
                        </div>
                        <div className="postCard__options--details">
                            <Link href={'/post/' + post?.id}><a className="postCard__options--comments">Voir les commentaires</a></Link>
                            {userUsername === post?.user.username ? <button onClick={() => handleDeletePost(post.id)} className='postCard__options--delete'>Supprimer</button> : null}
                        </div>
                    </div>
                
                    
                </div>
            </div>
        </PostStyle>
    )
}

export default Post;

// import styled from "styled-components";
// import Image from "next/image";
// import toast, { Toaster } from "react-hot-toast";
// import { useRouter } from "next/router";
// import Link from "next/link";

// const PostStyle = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
    
//     .postCard{
//         width: 90%;
//         height: 400px;
//         background: #ffffff;
//         margin-bottom: 30px;
//     }
// `

// const Post = ({ post, userUsername }) => {

//     const router = useRouter();

//     // DELETE A POST
//     const handleDeletePost = async (id) => { //deletes the data based on the id
//         toast.loading('Suppression en cours...', {
//             style: {
//                 borderRadius: '10px',
//                 background: '#333',
//                 color: '#fff',
//             }
//         })
//         const response = await fetch(`/api/post/deletepost`, {
//         method: "POST",
//         headers: {
//             "Content-type": "application/json",
//         },
//         body: JSON.stringify({ id }),
//         })
//         const json = await response.json()
//         console.log(json)
//         toast.remove()
//         toast('Votre post a été supprimé',
//                     {
//                         icon: '✅',
//                         style: {
//                         borderRadius: '10px',
//                         background: '#333',
//                         color: '#fff',
//                         },
//                     }
//                     );
//         router.replace(router.asPath)
//     }

//     console.log(post)

//     return(
//         <PostStyle>
//             <div className="container">
//                 <div key={post?.id} className="postCard">
//                     <Link href={'/post/' + post?.id}><Image src={post?.image} alt={post?.description} height={120} width={120} /></Link>
//                     <p>{post?.description}</p>
//                     <Link href={`/profile/${post?.user.username}`}><a>{post?.user.username}</a></Link>
//                     <p>{post?.comments.length} commentaire{post?.comments.length > 1 ? 's' : ''}</p>
//                     {/* {!post.comments.length ? (
//                         <p>Aucun commentaire</p>
//                         ) : (
//                             <>
//                             {post.comments?.map((comment, i) => (
//                                 <div key={comment.id}>
//                                     <p>{comment.content}</p>
//                                     <p>par <Link href={`/profile/${comment.user?.username}`}><a>{comment.user?.username}</a></Link></p>
//                                     {comment.user?.avatar ? (
//                                     <Image src={comment.user?.avatar} height={30} width={30}/>
//                                 ) : (
//                                     'aucune photo'
//                                 )}

//                                 </div>
//                             ))}
//                             </>
//                         )
//                     } */}
//                     {post.user.avatar ? (
//                         <Image src={post.user.avatar} height={50} width={50}/>
//                     ) : (
//                         'aucune photo'
//                     )}
//                     {userUsername === post?.user.username ? <button onClick={() => handleDeletePost(post.id)}>Supprimer</button> : null}
                    
//                 </div>
//             </div>
//         </PostStyle>
//     )
// }

// export default Post;