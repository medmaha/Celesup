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

const Dashboard = () => {
    const context = useContext(GlobalContext)
    const [posts, pending, error, sendAxiosRequest] = useAxiosRequest()

    async function getPosts(url = "/feeds") {
        await sendAxiosRequest({
            url: url,
            method: "GET",
        })
        context.setFocusState((prev) => {
            return {
                ...prev,
                reFetchPosts: getPosts,
            }
        })
    }

    useEffect(() => {
        if (!context.user) return

        return () => getPosts()
    }, [])

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
                        onClick={() => getPosts()}
                    >
                        again later
                    </span>
                </header>
            )}

            {!!pending && <h5>Loading...</h5>}

            {posts && !error && (
                <>
                    <div className="d-flex width justify-content-center">
                        <div className="width-100">
                            <ComposePost
                                context={context}
                                reFetchPosts={getPosts}
                            />
                        </div>
                    </div>
                    <span className="divider maxwidth-600-px"></span>
                    <PostsContainer data={posts} getPosts={getPosts} />
                </>
            )}

            {/* <Trending /> */}
        </main>
    )
}

export default Dashboard
