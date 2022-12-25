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

function PostsContainer({ posts: data, getPosts }) {
    // const [paginatorLinks, setPaginatorLinks] = useState(posts.links)
    const context = useContext(GlobalContext)
    const [posts, setPosts] = useState({
        links: null,
        posts_count: null,
        data: [],
    })

    useEffect(() => {
        if (data?.posts_count) {
            setPosts(data)
        }
    }, [data])

    // const posts = useMemo(() => updatePost(response), [response])

    const postWrapperRef = useRef()

    useEffect(() => {
        if (!postWrapperRef.current) return
        if (postWrapperRef.current && !!posts.data.length) {
            infiniteScrollIntersection(
                postWrapperRef.current,
                data,
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
        if (!data) return
        if (data.page_index > 1) {
            const data = [...posts.data, ...data.data]
            setPosts({ ...data, data: data })
        } else {
            setPosts(data)
        }
    }, [data])

    async function reFetchPosts(url = "/feeds") {
        getPosts(url)
    }

    return (
        <>
            <div
                id="mainFeed"
                className=""
                style={postWrapperStyles}
                // className="post__container width-100_ maxwidth-600-px width-450-px"
            >
                <div className="d-flex flex-column align-items-center width-100 maxwidth-550-px">
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
                                        response={data}
                                        updatePost={reFetchPosts}
                                    />
                                    {/* {posts.data.length !== idx + 1 && (
                                            <span className="divider mb-1"></span>
                                        )} */}
                                </section>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
export default PostsContainer
