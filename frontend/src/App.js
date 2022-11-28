import Supcel from "./cssStyles/supcel-CSS/supcel"
import { useEffect, useState, createContext } from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import jwtDecode from "jwt-decode"

import Navbar from "./layouts/navbar/navbar"
import Create from "./layouts/create/post/create"

import MobileNavbarLinks from "./layouts/navbar/mobileNavbarLinks"

import { celesupApi, refreshAuthTokens } from "./axiosInstances"

// route elements
import Login from "./routes/auth/signin/login"
import Register from "./routes/auth/register/register"

// VIEWS
import Index from "./routes"
import UserProfile from "./routes/profile/userProfile"
import ExplorePosts from "./routes/explore/explorePosts"
import PageNotFound from "./routes/pageNotFound"
import Messenger from "./routes/messenger/Messenger"
import useWebSocketHook from "./hooks/useWebSocketHook"
import Settings from "./routes/settings/Settings"
import PostDetail from "./routes/feed/posts/postDetail"

export const GlobalContext = createContext({})

function handleWebSocketCommunication(ev, updateUserTokens) {
    const data = JSON.parse(ev.data)
    if (data.type === "NOTIFY_USER") {
        setTimeout(updateUserTokens, 1000)
    }
    console.log(data)
}

function App() {
    const [user, setUser] = useState(null)
    const [focusStates, setFocusState] = useState(null)

    const [tokens, updateTokens] = useState({
        access: localStorage.getItem("access"),
        refresh: localStorage.getItem("refresh"),
    })
    const { initWebSocket, socket: webSocketMaster } = useWebSocketHook()
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (!tokens.access || !tokens.refresh) {
    //         navigate("/login")
    //     }
    // }, [])

    // useEffect(() => {
    //     if (!user) return
    //     initWebSocket({
    //         url: "/ws/master?user=" + user.id,
    //         onMessage: (ev) =>
    //             handleWebSocketCommunication(ev, updateUserTokens),
    //         onConnect: (ev) => {
    //             console.log("ws conn")
    //         },
    //     })
    // }, [user])

    useEffect(() => {
        if (
            !localStorage.getItem("access") ||
            !localStorage.getItem("refresh")
        ) {
            setUser(null)
            updateTokens(null)
        }
        // window.addEventListener("beforeunload", alertUser)

        return () => {
            window.removeEventListener("beforeunload", alertUser)
        }

        // eslint-disable-next-line
    }, [])

    const alertUser = (e) => {
        e.preventDefault()
        e.returnValue = ""
        // return "We strongly recommends NOT closing this window yet."
    }

    useEffect(() => {
        if (!user) return
        // console.log(user)
    }, [user])

    useEffect(() => {
        if (!tokens?.access || !tokens?.refresh) {
            localStorage.removeItem("refresh")
            localStorage.removeItem("access")
            setUser(null)
            return
        }
        if (tokens.access && tokens.refresh) {
            localStorage.setItem("access", tokens.access)
            localStorage.setItem("refresh", tokens.refresh)
            const client = jwtDecode(tokens.access)
            setUser(client)
        }
        return () => {}
        // eslint-disable-next-line
    }, [tokens])

    async function updateUserTokens() {
        await celesupApi
            .post(
                "/refresh/user/tokens",
                { user_id: user.id },
                (Headers = { "content-type": "application/json" }),
            )
            .then((res) => {
                updateTokens(res.data)
            })

        // await refreshAuthTokens(updateTokens)
    }

    const contextValues = {
        user,
        tokens,
        state: focusStates,
        setUser,
        updateTokens,
        setFocusState,
        supcelLibrary: Supcel,
        webSocketMaster,
        updateUserTokens,
    }

    return (
        <div className="">
            <GlobalContext.Provider value={contextValues}>
                {/* <Navbar /> */}

                <Navbar />

                <Routes>
                    <Route path="/" exact element={<Index />} />

                    {!!user && (
                        <>
                            <Route
                                path={`/explore`}
                                element={<ExplorePosts />}
                            />
                            <Route
                                path={`/messenger`}
                                element={<Messenger />}
                            />
                            <Route path={`/settings`} element={<Settings />} />
                            <Route
                                path={`/:username`}
                                element={<UserProfile />}
                            />
                            <Route
                                path={`/post/:postId`}
                                element={<PostDetail />}
                            />
                        </>
                    )}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />

                    <Route path="*" element={<PageNotFound />} />
                </Routes>

                {focusStates?.createPost && <Create />}

                <MobileNavbarLinks />
            </GlobalContext.Provider>
        </div>
    )
}

export default App
