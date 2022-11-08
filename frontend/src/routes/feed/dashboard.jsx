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

    useEffect(() => {
        localStorage.removeItem("pvpk")
    }, [])

    return (
        <main
            id="feedsContainer"
            className="d-flex justify-content-center mb-2 width-100"
        >
            {/* <Activity /> */}
            <PostsContainer />
            {/* <Trending /> */}
        </main>
    )
}

export default Dashboard
