import React, { useEffect, useRef, useState } from "react"
import { celesupApi } from "../../axiosInstances"
import useAxiosRequest from "../../hooks/useAxiosRequest"
import Post from "../feed/posts/post"

function paginatorIntersection(instance, response, updatePost) {
    const postElements = instance.querySelectorAll("section[data-post]")
    const lastPostElement = [...postElements][postElements.length - 1]

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

    if (lastPostElement) {
        observer.observe(lastPostElement)
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

        if (response?.page_index > 1) {
            paginatorIntersection(instanceRef.current, response, getExploit)
        }
    }, [posts])

    useEffect(() => {
        return () => getExploit()
    }, [])

    useEffect(() => {
        if (!response) return

        if (response.page_index > 1) {
            const data = [...posts.data, ...response.data]
            setPosts({ ...response, data: data })
            return
        }

        setPosts({ ...response })
    }, [response])

    return (
        <div
            ref={instanceRef}
            className="d-flex justify-content-center width-100"
        >
            <div className="maxwidth-600-px width-100 minwidth-100-px d-flex flex-column align-items-center">
                <div className="d-flex justify-content-right align-items-center mt-1 width-100 gap-10-px">
                    <span className="font-sm text-muted">filter - </span>
                    <select name="" id="">
                        <option value="">Most relevant</option>
                        <option value="">Most relevant</option>
                        <option value="">Most relevant</option>
                    </select>
                </div>
                <span className="divider"></span>
                <div className="maxwidth-550-px width-100">
                    {posts?.data.map((post) => {
                        return (
                            <section className="" key={post.key} data-post>
                                <Post post={post} />
                            </section>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
