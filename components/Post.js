import styled from "styled-components";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";

const PostStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    /* card mobile */
    .postCard{
        width: 260px;
        background: #ffffff;
        margin-bottom: 50px;
        padding: 20px 20px 10px 20px;
        border-radius: 20px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

        @media only screen and (min-width: 375px) {
            width: 320px;
        }

        @media only screen and (min-width: 425px) {
            width: 370px;
        }

        @media only screen and (min-width: 768px) {
            display: none;
        }

        &__author{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30px;

            &--infos{
                display: flex;
                align-items: center;
                justify-content: start;
                gap: 15px;
            }

            &--avatar{
                border-radius: 50%;
                cursor: pointer;
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

        &__description{
            cursor: pointer;
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

                &__icon, 
                &__text{
                    cursor: pointer;
                }
            }
        }

        &__options{
            display: flex;
            align-items: center;
            justify-content: space-between;

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
                font-size: 0.75rem;

                @media only screen and (min-width: 375px) {
                    font-size: 0.875rem;
                }
            }
        }
    } 
    /* end postCard */

    /* card desktop */
    .postCardDesktop{
        display: none;
        @media only screen and (min-width: 768px) {
            display: flex;
            background: #ffffff;
            margin-bottom: 100px;
            padding: 20px 20px 10px 20px;
            border-radius: 20px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            gap: 30px;
        }

        .postCardDesktopLeft{
            width: 400px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            &__infos{
                display: flex;
                align-items: center;
                justify-content: space-between;
                
                &--stats{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;

                    &__likes{
                        display: flex;
                    }
                    &__comments{
                        display: flex;

                        &--icon{
                            cursor: pointer;
                        }
                    }
                }

                &--author{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;

                    &__avatar{
                        border-radius: 50%;
                        cursor: pointer;
                    }
                }
            }

            &__actions{
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            &__description{
                &--text{
                    cursor: pointer;
                }
            }
        }
        .postCardDesktopRight{
            &__image{
                @media only screen and (min-width: 768px) {
                    border-radius: 50px 0 50px 0;
                    cursor: pointer;
                    width: 240px;
                    height: 240px;
                }
                @media only screen and (min-width: 1024px) {

                    width: 500px;
                    height: 500px;
                }
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
            {/* card mobile */}
            <div key={post?.id} className="postCard">
                <div className="postCard__author">
                    <div className="postCard__author--infos">
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
                {userUsername === post?.user.username ? <button onClick={() => handleDeletePost(post.id)} className='postCard__options--delete'>Supprimer</button> : null}
                </div>
            
                <Link href={'/post/' + post?.id}><p className="postCard__description">{post?.description}</p></Link>

                <div className="postCard__stats">
                    <div className="postCard__stats--likes">
                        <Image src={'/img/likes_icon.svg'} width={30} height={30}/>
                        <p>26</p>
                    </div>
                    <div className="postCard__stats--comments">
                        <Link href={'/post/' + post?.id}><Image src={'/img/comments_icon.svg'} width={30} height={30} className="postCard__stats--comments__icon"/></Link>
                        <Link href={'/post/' + post?.id}><p className="postCard__stats--comments__text">{post?.comments.length}</p></Link>
                    </div>
                </div>

                <Link href={'/post/' + post?.id}><img src={post?.image} alt={post?.description} className='postCard__image'/></Link>

                <div className="postCard__options">
                    <div className="postCard__options--actions">
                        <Image src={'/img/fav_icon.svg'} width={30} height={30}/>
                        <Image src={'/img/share_icon.svg'} width={30} height={30}/>
                    </div>
                </div>

                {/* <div className="postCard__options--details">
                        <Link href={'/post/' + post?.id}><a className="postCard__options--comments">Voir les commentaires</a></Link>
                </div>     */}
                
            </div>
            {/* end card mobile */}


            {/* card desktop */}
            <div className="postCardDesktop">
                <div className="postCardDesktopLeft">
                    <div className="postCardDesktopLeft__infos">
                        <div className="postCardDesktopLeft__infos--author">
                            {post.user.avatar ? (
                            <Link href={`/profile/${post?.user.username}`}>
                                <Image src={post.user.avatar} height={47} width={47} alt="photo de profil auteur" className='postCardDesktopLeft__infos--author__avatar'/>
                            </Link>
                            ) : (
                                <Link href={`/profile/${post?.user.username}`}>
                                    <Image src={`/default_avatar.jpg`} height={47} width={47} alt="photo de profil auteur par défaut" className='postCardDesktopLeft__infos--author__avatar'/>
                                </Link>
                            )}

                            <Link href={`/profile/${post?.user.username}`}><a>{post?.user.username}</a></Link>
                        </div>

                        <div className="postCardDesktopLeft__infos--stats">
                            <div className="postCardDesktopLeft__infos--stats__likes">
                                <Image src={'/img/likes_icon.svg'} width={30} height={30}/>
                                <p>26</p>
                            </div>
                            <div className="postCardDesktopLeft__infos--stats__comments">
                                <Link href={'/post/' + post?.id}><Image src={'/img/comments_icon.svg'} width={30} height={30} className='postCardDesktopLeft__infos--stats__comments--icon'/></Link>
                                <Link href={'/post/' + post?.id}><p className='postCardDesktopLeft__infos--stats__comments--icon'>{post?.comments.length}</p></Link>
                            </div>
                        </div>
                    </div>
                    <div className="postCardDesktopLeft__description">
                        <Link href={'/post/' + post?.id}><p className="postCardDesktopLeft__description--text">{post?.description}</p></Link>
                    </div>
                    <div className="postCardDesktopLeft__actions">
                        <div className="postCardDesktopLeft__actions--options">
                            <Image src={'/img/fav_icon.svg'} width={30} height={30}/>
                            <Image src={'/img/share_icon.svg'} width={30} height={30}/>
                        </div>
                        {userUsername === post?.user.username ? <button onClick={() => handleDeletePost(post.id)} className='postCard__options--delete'>Supprimer</button> : null}
                    </div>
                </div>
                <div className="postCardDesktopRight">
                    <Link href={'/post/' + post?.id}><img src={post?.image} alt={post?.description} className='postCardDesktopRight__image'/></Link>
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