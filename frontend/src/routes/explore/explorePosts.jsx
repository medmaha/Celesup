import React, { useEffect, useState } from "react"
import { celesupApi } from "../../axiosInstances"
import useAxiosRequest from "../../hooks/useAxiosRequest"
import Post from "../feed/posts/post"

const ExplorePosts = () => {
    const [posts, setPosts] = useState([])
    const [response, pending, error, sendRequest] = useAxiosRequest()

    function getExploit() {
        sendRequest({
            url: "/posts",
            method: "GET",
        })
    }

    useEffect(() => {
        getExploit()
    }, [])

    useEffect(() => {
        if (!response) return
        setPosts(response.data)
    }, [response])

    return (
        <div className="d-flex justify-content-center">
            <div className="maxwidth-550-px">
                {posts?.map((post) => {
                    return (
                        <span key={post.key}>
                            <Post post={post} />
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

export default ExplorePosts
