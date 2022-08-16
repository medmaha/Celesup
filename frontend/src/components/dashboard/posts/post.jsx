import'./style.css';
import React from 'react';
import { useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {celesupApi} from '../../../axiosInstances'
import { GlobalContext } from '../../../App';
import { useContext } from 'react';
import { useEffect } from 'react';

const Post = ({post}) => {
    const [postData, setPosts] = useState(post)
    const [likedBy, setLikedBy] = useState(post.liked_by_users)
    const [iLikeThis, setLikeThis] = useState(post.me)

    const postMenu = useRef()
    const [dropdownMenu, setDropdownMenu] = useState(false)
        
    const navigate = useNavigate()
    const context = useContext(GlobalContext)
    
    useEffect(()=>{
        if(!dropdownMenu) return
        const menu = postMenu.current.querySelector(`[data-menu-id="${post.key.toString()}"]`)
        menu.children[0]?.classList.toggle('active')
        // eslint-disable-next-line
    },[dropdownMenu])

    function visitAuthorProfile() {
        console.log(post.author, post.post_author);
        localStorage.setItem('pvpk', post.author.id)
        navigate(`/profile/${postData.post_author}`)
        
    }

    function togglePostMenu(dropdown) {
        setDropdownMenu(prev=>!prev)
        context.setFocusState({
            ...context.state,
            'postMenu': !dropdown
        })
    }

    async function likePost() {
        const form = new FormData()
        form.append('post_key', postData.key)
        
        celesupApi
        .post('/posts/like', form)
        .then(res=>{
            setPosts(res.data.post)
            setLikedBy(res.data.liked_by_users)
            setLikeThis(res.data.me)
            console.log(res.data.liked_by_users);
        })
    }
    

    return (
        <div ref={postMenu} className="post border-bottom-1 pos-relative">
            {/* author */}
            <div className="d-flex align-items-center pos-relative p-1">
                <div onClick={visitAuthorProfile} className="d-flex align-items-center">
                    <div className="profile-img">
                        <img src={postData.author.avatar} alt="" className='' />
                    </div>
                    <span className='username px-1'>@<b>{postData.post_author}</b></span>
                </div>
                <div onClick={()=>togglePostMenu(dropdownMenu)} className="post__menu__btn pos-absolute top-25 right-0 d-flex">
                    <span className="dot br-full inverse-bg-color"></span>
                    <span className="dot br-full inverse-bg-color"></span>
                    <span className="dot br-full inverse-bg-color"></span>
                </div>
            </div>
            <span  data-menu-id={post.key.toString()}>
                {context.state?.postMenu && 
                    <div className='post__menu__wrapper pos-absolute right-5 py-2 px-4 pl-2 br-sm box-shadow bg-color'>
                        <span className="d-block cursor-pointer py-1">Follow</span>
                        <span className="d-block cursor-pointer py-1">Unfollow</span>
                        <span className="d-block cursor-pointer py-1">Report Post</span>
                        <span className="d-block cursor-pointer py-1">Not Interested</span>
                    </div>
                }
            </span>

            
            {/* caption */}
            <span className="post__caption mx-1">
                {/* <h3>{postData.title}</h3> */}
                <span className='' style={{fontSize:'23px'}}>Lorem ipsum dolor sit.</span>
            </span>
            {/* excerpt */}
            <span className="post__excerpt">
                <p className='mx-1' style={{fontSize:'12px'}}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, ullam cumque nam architecto culpa atque accusantium pariatur dolorum laborum aut!
                    {postData.caption}
                </p>
            </span>

            {/* picture / video */}
            <span className="picture d-flex justify-content-center mt-2">
                <span className="post-image">
                    { postData.picture &&
                        <img src={`${postData.picture}`} alt="" className="responsive" />
                    }
                </span>
            </span>
             
                <div className="post__interactions my-1 ">
                {likedBy.length >= 5 &&
                    <div className="recent__likes ml-3">
                        {likedBy.map(user=>{
                            return(
                            <div className="liked__by__users d-flex pos-relative">
                                <div key={user.id} className="user width-30-px height-30-px br-full pos-absolute">
                                    <img className='responsive br-full' src={user.avatar} alt='' />
                                </div>
                            </div>
                            )
                        })}

                        {!iLikeThis ?
                            <p className='__text light-text'>
                                liked by 25 others
                            </p>
                                :
                            <p className='__text light-text'>
                                you and 123 others like this post
                            </p>  
                        }
                
                    </div>
                }
                <div className="interact d-flex justify-content-evenly align-items-center">
                    <div className="d-flex flex-column align-items-center likes">
                        <span className="icon-wrapper">
                            {iLikeThis ?
                                <svg onClick={likePost} className="red-icon cursor-pointer"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"/></svg>
                                    :
                                <svg onClick={likePost} className="grey-icon cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"/></svg>
                        
                            }
                        </span>
                        <span className='font-sm'>{postData.post_likes}</span>
                    </div>
                    <div className="d-flex flex-column align-items-center share">
                        <span className="icon-wrapper">
                            <svg className="grey-icon cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M18,14a4,4,0,0,0-3.08,1.48l-5.1-2.35a3.64,3.64,0,0,0,0-2.26l5.1-2.35A4,4,0,1,0,14,6a4.17,4.17,0,0,0,.07.71L8.79,9.14a4,4,0,1,0,0,5.72l5.28,2.43A4.17,4.17,0,0,0,14,18a4,4,0,1,0,4-4ZM18,4a2,2,0,1,1-2,2A2,2,0,0,1,18,4ZM6,14a2,2,0,1,1,2-2A2,2,0,0,1,6,14Zm12,6a2,2,0,1,1,2-2A2,2,0,0,1,18,20Z"/></svg>
                        </span>
                        <span className='font-sm'>10+</span>
                    </div>
                    <div className="d-flex flex-column align-items-center comment">
                        <span className="icon-wrapper">
                            <svg className="grey-icon cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z"/></svg>
                        </span>
                        <span className='font-sm'>20+</span>
                    </div>
                    <div className="d-flex flex-column align-items-center bookmark">
                        <span className="icon-wrapper">
                            <svg className="grey-icon cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path d="M336 0h-288C21.49 0 0 21.49 0 48v431.9c0 24.7 26.79 40.08 48.12 27.64L192 423.6l143.9 83.93C357.2 519.1 384 504.6 384 479.9V48C384 21.49 362.5 0 336 0zM336 452L192 368l-144 84V54C48 50.63 50.63 48 53.1 48h276C333.4 48 336 50.63 336 54V452z"/></svg>
                        </span>
                        <span className='font-sm'>5</span>
                    </div>
                </div>
            </div>
       
        </div>
    )
}

export default Post
