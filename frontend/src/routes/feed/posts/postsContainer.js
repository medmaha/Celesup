// import "./style.css"
import { useEffect, useContext, useState, useMemo } from "react"
import { GlobalContext } from "../../../App"
import Post from "./post"
import PostPlaceholder from "./postPlaceholder"

import useAxiosRequest from "../../../hooks/useAxiosRequest"
import { celesupApi, CELESUP_BASE_URL } from "../../../axiosInstances"
import ComposePost from "./compose"

const postWrapperStyles = {
    width: "100%",
    minWidth: "100vw",
    display: "flex",
    justifyContent: "center",
    padding: "0 5px",
    overflow: "hidden",
}

function PostsContainer({}) {
    // const [paginatorLinks, setPaginatorLinks] = useState(posts.links)
    const context = useContext(GlobalContext)
    const [response, pending, error, sendAxiosRequest] = useAxiosRequest()
    // const [posts, setPosts] = useState([])

    const posts = useMemo(() => updatePost(response), [response])

    useEffect(() => {
        document.title = "Celesup | Home"
        context.setFocusState((prev) => {
            return {
                ...prev,
                reFetchPosts: reFetchPosts,
            }
        })
    }, [])

    useEffect(() => {
        reFetchPosts()
        return () => {}
    }, [])

    useEffect(() => {
        updatePost()
    }, [response])

    function updatePost(response) {
        return response
    }

    async function reFetchPosts() {
        await sendAxiosRequest({
            axiosInstance: celesupApi,
            url: "/posts/list",
            method: "GET",
        })
        context.setFocusState((prev) => {
            return {
                ...prev,
                reFetchPosts: reFetchPosts,
            }
        })
    }

    return (
        <>
            <div
                id="mainFeed"
                style={postWrapperStyles}
                // className="post__container width-100_ maxwidth-600-px width-450-px"
            >
                {!!error && (
                    <header className="d-flex flex-column align-items-center my-3">
                        <p className="text-center pb-1">Something Went Wrong</p>
                        <span
                            className="btn-blue btn br-lg"
                            onClick={() => reFetchPosts()}
                        >
                            again later
                        </span>
                    </header>
                )}
                {/* {pending && <PostPlaceholder />} */}
                {!!pending && <h1>Loading...</h1>}

                {/* create Post Card */}
                {!!posts?.data && (
                    <>
                        <div>
                            {/* <ComposePost
                                context={context}
                                reFetchPosts={reFetchPosts}
                            /> */}
                        </div>
                        <div
                            id="postsWrapper"
                            className="width-100 d-block maxwidth-600-px"
                        >
                            {posts?.data?.map((post, idx) => {
                                return (
                                    <section key={post.key} className="mt-__">
                                        <Post post={post} />
                                        {/* {posts.data.length !== idx + 1 && (
                                            <span className="divider mb-1"></span>
                                        )} */}
                                    </section>
                                )
                            })}
                        </div>
                    </>
                )}
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
export default PostsContainer
