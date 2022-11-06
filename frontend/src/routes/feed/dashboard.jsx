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

const Dashboard = () => {
    const context = useContext(GlobalContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!context.tokens.access || !context.tokens.refresh) {
            navigate("/login")
        }
    })

    useEffect(() => {
        localStorage.removeItem("pvpk")
    }, [])

    return (
        <main
            id="feedsContainer"
            className="p-1 gap-3 d-flex justify-content-center container"
        >
            {/* <Activity /> */}
            <PostsContainer />
            {/* <Trending /> */}
        </main>
    )
}

export default Dashboard
