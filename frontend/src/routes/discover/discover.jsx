import React, { useEffect, useRef, useState } from "react"
import { celesupApi } from "../../axiosInstances"
import useAxiosRequest from "../../hooks/useAxiosRequest"
import Post from "../feed/posts/post"

function paginatorIntersection(instance, response, updatePost) {
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

export default function Discover() {
    const [posts, setPosts] = useState({ data: [] })
    const [response, pending, error, sendRequest] = useAxiosRequest()
    const instanceRef = useRef("explorer")

    function getExploit(url = "/explore") {
        sendRequest({
            url: url,
            method: "GET",
        })
    }

    useEffect(() => {
        if (!posts) return

        if (instanceRef.current) {
            paginatorIntersection(instanceRef.current, response, getExploit)
        }
        console.log(posts)
    }, [posts])

    useEffect(() => {
        return () => getExploit()
    }, [])

    useEffect(() => {
        if (!response) return
        const data = [...posts.data, ...response.data]
        setPosts({ ...response, data: data })
    }, [response])

    return (
        <div ref={instanceRef} className="d-flex justify-content-center">
            <div className="maxwidth-550-px">
                {posts?.data.map((post) => {
                    return (
                        <section key={post.key} data-post>
                            <Post post={post} />
                        </section>
                    )
                })}
            </div>
        </div>
    )
}
