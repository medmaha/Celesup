import React, { useEffect, useState } from "react"
import { celesupApi } from "../../axiosInstances"
import Post from "../feed/posts/post"

const ExplorePosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        celesupApi
            .get("/posts")
            .then((res) => setPosts(res.data.data))
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className="d-flex justify-content-center">
            <div className="maxwidth-550-px">
                {posts?.map((post) => {
                    return <Post post={post} />
                })}
            </div>
        </div>
    )
}

export default ExplorePosts
