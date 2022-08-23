import { useEffect, useContext, useState} from 'react';
import {GlobalContext} from '../../../App';
import Post from './post'
import PostPlaceholder from './postPlaceholder';

import useAxiosRequest from '../../../hooks/useAxiosRequest'
import { celesupApi } from '../../../axiosInstances';
import NewPostCard from './newPostCard';

function PostsContainer () {
    // const [paginatorLinks, setPaginatorLinks] = useState(posts.links)
    const context = useContext(GlobalContext)
    const [postsData, pending, error, sendAxiosRequest] = useAxiosRequest()
    const [posts, setPosts] = useState()

    useEffect(()=>{
        document.title = 'Feed | CELESUP'
        localStorage.removeItem('pvpk')
    },[])

    useEffect(()=>{
        if ((posts || error) && pending) return
        sendAxiosRequest({
            axiosInstance: celesupApi,
            url: '/posts/list',
            method: 'GET'
        })
        context.reFetchPost  = reFetchPost()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        setPosts(postsData)
    },[postsData])
    
    function reFetchPost() {
        sendAxiosRequest({
            axiosInstance: celesupApi,
            url: '/posts/list',
            method: 'GET'
        })
    }

    return (
        <>
            <div className="post__container d-flex flex-column mb-2 mx-1">        

                {error && 
                    <div className='d-flex flex-column align-items-center my-3'>
                        <p className="text-center pb-1">
                            Something Went Wrong
                        </p>
                        <span className="btn-blue btn-small">Try again later</span>
                    </div>
                }
                {pending && <PostPlaceholder/>}


                {/* create Post Card */}
                {posts && 
                    <NewPostCard context={context}/>
                }
                {posts?.data?.map((post, idx)=>{
                    return  (
                        <div className="mb-__" key={post.key} data-aox="zoom">
                            <Post  post={post}/>
                        </div>
                    )
                })}
            </div>
        
            {/* Page Paginators */}
            {/* <div className="paginators d-flex justify-content-evenly mt-1 pb-2">
                <span className='mx-1 text-color' onClick={e=>postsPaginator(e.currentTarget, setPosts, setLoading)} data-href={posts.links.prev ? posts.links.prev : '/'}>
                    <svg className='teal'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z"/></svg>
                    <span>Prev</span>
                </span>
                <span className='mx-1 text-color' onClick={e=>postsPaginator(e.currentTarget, setPosts, setLoading)} data-href={posts.links.next}>
                    <svg className='teal ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M502.6 278.6l-128 128c-12.51 12.51-32.76 12.49-45.25 0c-12.5-12.5-12.5-32.75 0-45.25L402.8 288H32C14.31 288 0 273.7 0 255.1S14.31 224 32 224h370.8l-73.38-73.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l128 128C515.1 245.9 515.1 266.1 502.6 278.6z"/></svg>
                    <span>Next</span>
                </span>
            </div> */}
        </>
    )
}
export default PostsContainer;


// const postsPaginator = (target, setPosts, setLoading) => {
//     let PATH = target.getAttribute('data-href')
//     if (PATH === null) return

//     setLoading(false)
//     const params = PATH.split('?')
//     PATH = '/api/posts/?' +params[1]
   
//     const getPaginated = async ()=>{
//         let res = await axios.get('http://localhost:8000'+PATH,{
//             headers: {
//                 'Authorization': 'Celesup '+localStorage.getItem('access').toString()
//             }
//         })
//         .catch((err)=>{
//             console.log('err ranned');
//             if (err.response.status === 401){
//                 const resendPaginateAndRefreshTokens = async () => {
//                     let res = await axiosInstance.get(PATH)
//                     .catch((error)=>{
//                         console.log(error);
//                     })
//                     let data = await res.data
//                     setPosts(data)
//                     setLoading(true)
//                 }
//                 resendPaginateAndRefreshTokens()
//             }
//         })

//         if (res){
//             if (res.status === 200){
//                 let data = await res.data
//                 setPosts(data)
//                 setLoading(true)
//             }
//         }
//     }
//     getPaginated()
// }