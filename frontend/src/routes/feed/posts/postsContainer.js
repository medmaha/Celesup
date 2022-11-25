// import "./style.css"
import { useEffect, useContext, useState, useMemo } from "react"
import { GlobalContext } from "../../../App"
import Post from "./post"
import PostPlaceholder from "./postPlaceholder"

import "./style.css"

import useAxiosRequest from "../../../hooks/useAxiosRequest"
import { celesupApi, CELESUP_BASE_URL } from "../../../axiosInstances"
import ComposePost from "./compose"
import { useRef } from "react"

function infiniteScrollIntersection(instance, response, updatePost) {
    const e = instance.querySelectorAll("section[data-post]")
    const elem = [...e][e.length - 1]

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (response.links.next) {
                    updatePost(response.links.next)
                }
                observer.unobserve(entry.target)
            }
        })
    })

    if (elem) {
        observer.observe(elem)
    }
}

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
    const [posts, setPosts] = useState({
        links: null,
        posts_count: null,
        data: [],
    })

    // const posts = useMemo(() => updatePost(response), [response])

    const postWrapperRef = useRef()

    useEffect(() => {
        if (!postWrapperRef.current) return
        if (postWrapperRef.current && posts.data.length) {
            infiniteScrollIntersection(
                postWrapperRef.current,
                response,
                reFetchPosts,
            )
        }
    }, [posts.data])

    useEffect(() => {
        return () => {
            document.title = "Celesup | Home"
            context.setFocusState((prev) => {
                return {
                    ...prev,
                    reFetchPosts: reFetchPosts,
                }
            })
        }
    }, [])

    useEffect(() => {
        return () => reFetchPosts()
    }, [])

    useEffect(() => {
        if (!response) return
        if (response.page_index > 1) {
            const data = [...posts.data, ...response.data]
            setPosts({ ...response, data: data })
        } else {
            setPosts(response)
        }
    }, [response])

    async function reFetchPosts(url = "/feeds") {
        await sendAxiosRequest({
            axiosInstance: celesupApi,
            url: url,
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
                className=""
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

                {/* create Post Card */}
                {!!posts.data && (
                    <div className="d-flex flex-column align-items-center width-100 maxwidth-550-px">
                        <div className="width-100">
                            <ComposePost
                                context={context}
                                reFetchPosts={reFetchPosts}
                            />
                        </div>
                        <span className="divider"></span>
                        <div
                            id="postsWrapper"
                            className="width-100 d-block maxwidth-600-px"
                            ref={postWrapperRef}
                        >
                            {posts.data?.map((post, idx) => {
                                return (
                                    <section
                                        data-post
                                        key={post.key}
                                        className="mt-__"
                                    >
                                        <Post
                                            post={post}
                                            response={response}
                                            updatePost={reFetchPosts}
                                        />
                                        {/* {posts.data.length !== idx + 1 && (
                                            <span className="divider mb-1"></span>
                                        )} */}
                                    </section>
                                )
                            })}
                        </div>
                        {!!pending && <h5>Loading...</h5>}
                    </div>
                )}
            </div>

            {/* Page Paginators */}
        </>
    )
}
export default PostsContainer
