import "./dashboard.css"
// import { useContext, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// #import { GlobalContext } from '../App'

import PostsContainer from "./posts/postsContainer"
import { useEffect, useContext } from "react"
import { GlobalContext } from "../../App"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { CELESUP_BASE_URL } from "../../axiosInstances"
import useAxiosRequest from "../../hooks/useAxiosRequest"
import ComposePost from "./posts/compose"
import { UseCookie } from "../../hooks/useCookie"

const COOKIES = UseCookie()

const Dashboard = () => {
    const context = useContext(GlobalContext)
    const [data, pending, error, sendAxiosRequest] = useAxiosRequest()

    const [posts, setPosts] = useState({ data: [] })

    useEffect(() => {
        if (!context.user) return
        return () => getPostFeeds()
    }, [])

    useEffect(() => {
        if (!data?.page_index) return
        document.addEventListener("addToPostFeeds", addToPostFeeds)
        return () => {
            document.removeEventListener("addToPostFeeds", addToPostFeeds)
            setPosts(data)
        }
    }, [data])

    function addToPostFeeds() {
        const post = JSON.parse(COOKIES.get("post") || "{}")
        // setPosts((prev) => {
        //     return {
        //         ...prev,
        //         data: [post, ...prev.data],
        //     }
        // })
        getPostFeeds()
    }

    async function getPostFeeds(url = "/feeds") {
        await sendAxiosRequest({
            url: url,
            method: "GET",
        })
        context.setFocusState((prev) => {
            return {
                ...prev,
                addToPosts: addToPostFeeds,
            }
        })
    }

    return (
        <main
            id="feedsContainer"
            className="d-flex justify-content-center flex-column align-items-center mb-2 width-100"
        >
            {/* <Activity /> */}

            {!!error && (
                <header className="d-flex flex-column align-items-center my-3">
                    <p className="text-center pb-1">Something Went Wrong</p>
                    <span
                        className="btn-blue btn br-lg"
                        onClick={() => getPostFeeds()}
                    >
                        again later
                    </span>
                </header>
            )}

            {!!pending && <h5>Loading...</h5>}

            {posts && (
                <>
                    <div className="d-flex width-100 justify-content-center maxwidth-600-px">
                        <div className="width-100">
                            <ComposePost
                                context={context}
                                reFetchPosts={getPostFeeds}
                            />
                        </div>
                    </div>
                    <span className="divider maxwidth-600-px"></span>
                    <PostsContainer data={data} getPosts={getPostFeeds} />
                </>
            )}

            {/* <Trending /> */}
        </main>
    )
}

export default Dashboard
