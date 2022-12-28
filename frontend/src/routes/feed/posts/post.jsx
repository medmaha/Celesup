import { useState, useEffect, useContext, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { celesupApi } from "../../../axiosInstances"
import { GlobalContext } from "../../../App"
import Dropdown from "../../../features/Dropdown"
import PostComments from "./postComments"
import PostStatistics from "./postStatistics"

import useWebSocketHook from "../../../hooks/useWebSocketHook"

import DateTime from "../../../hooks/getDateTime"
import PostHEADER from "./subComponent/PostHEADER"
import PostTEXTS from "./subComponent/PostTEXTS"
import PostFILES from "./subComponent/PostFILES"
import PostINTERACTIONS from "./subComponent/PostINTERACTIONS"

function lazyLoadIntersection(element, post) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const fileWrapperTag = entry.target.querySelector(".post-file")
                const fileSrcTag =
                    fileWrapperTag.querySelector("[data-post-file]")
                const fileSrc = fileWrapperTag.getAttribute("data-picture-src")

                if (fileWrapperTag) {
                    fileSrcTag.src = fileSrc

                    if (fileSrcTag.tagName === "VIDEO") {
                    }
                }
                observer.unobserve(entry.target)
            }
        })
    })

    if (element) {
        observer.observe(element)
    }
}

export default function Post({
    post,
    postWebSocket,
    response,
    updatePost,
    options = {},
}) {
    const [postData, setPostData] = useState(post)
    const [viewComments, setViewComments] = useState(false)

    const context = useContext(GlobalContext)
    const navigate = useNavigate()
    const instance = useRef("ref_" + postData?.key)

    const { initWebSocket, socket: postWS } = useWebSocketHook()

    const OPTIONS = {
        interactions: true,
        ...options,
    }

    useEffect(() => {
        if (!instance.current) return
        return () => {
            if (postData.picture || postData.video) {
                lazyLoadIntersection(instance.current, postData)
            }
        }
    }, [instance.current])

    // useEffect(() => {
    //     const wsURL = `/ws/post/monitor?id=${post.key}`
    //     if (context.user && !postWebSocket) {
    //         initWebSocket({
    //             url: wsURL,
    //             onMessage: (ev) => {
    //                 const data = JSON.parse(ev.data)
    //                 if (data.type === "POST_ACTIVITY") {
    //                     getPostData("posts/retrieve" + `?id=${postData.key}`)
    //                 }
    //             },
    //             onConnect: (ev) => {
    //                 // console.log("ws connected")
    //             },
    //             onDisconnect: () => {
    //                 console.log("ws disconnected")
    //             },
    //         })
    //     }
    // }, [])

    useEffect(() => {
        if (!post) setPostData(post)
    }, [post])

    async function likePost() {
        await getPostData("/posts/like", "post", "post_key")
        // postWS.send(JSON.stringify({ type: "POST_LIKE" }))

        // if (postData.author.id !== context.user.id) {
        //     context.webSocketMaster.send(
        //         JSON.stringify({
        //             type: "NOTIFY_USER",
        //             payload: {
        //                 user_id: postData.author.id,
        //             },
        //         }),
        //     )
        // }
    }

    async function getPostData(url, method = "get", identifier = "key") {
        const form = new FormData()
        form.append(identifier, postData.key)

        celesupApi[method](url, form).then((res) => {
            setPostData(res.data)
            // console.log(res.data)
        })
    }

    return (
        <article
            className="post width-100 pos-relative"
            key={postData.key}
            data-remove={postData.author.username}
            data-interest={`${postData.key}__not-interested`}
            ref={instance}
        >
            {/* author */}
            <div className="d-flex align-items-center justify-content-between pb-__">
                <PostHEADER
                    context={context}
                    postData={postData}
                    likePost={likePost}
                    setPostData={setPostData}
                />
            </div>

            <section className="pl-1" style={{ marginLeft: "40px" }}>
                <PostTEXTS postData={postData} />

                {/* picture / video */}
                {postData.music ||
                    postData.video ||
                    (postData.picture && (
                        <Link
                            to={`/post/${postData.key}`}
                            state={{ post: postData }}
                        >
                            <PostFILES postData={postData} />
                        </Link>
                    ))}

                {/* Post Interaction/activities */}
                {OPTIONS["interactions"] && (
                    <div className="post__interactions">
                        {/* <PostStatistics post={postData} />s */}
                        <PostINTERACTIONS
                            context={context}
                            postData={postData}
                            likePost={likePost}
                            setViewComments={setViewComments}
                        />

                        {/* Comment Form */}
                        {viewComments && <PostComments post={post} />}
                        <span className="divider"></span>
                    </div>
                )}
            </section>
        </article>
    )
}
