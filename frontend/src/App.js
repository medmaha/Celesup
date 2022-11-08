import Supcel from "./cssStyles/supcel-CSS/supcel"
import { useEffect, useState, createContext } from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import jwtDecode from "jwt-decode"
import Navbar from "./layouts/navbar/navbar"
import MobileNavbarLinks from "./layouts/navbar/mobileNavbarLinks"

// route elements
import Login from "./routes/auth/signin/login"
import Register from "./routes/auth/register/register"

// VIEWS
import Index from "./routes"
import UserProfile from "./routes/profile/userProfile"
import ExplorePosts from "./routes/explore/explorePosts"
import PageNotFound from "./routes/pageNotFound"
import CreateNewPost from "./routes/feed/posts/create/createPost"
import Messager from "./routes/messager/Messager"
import useWebSocketHook from "./hooks/useWebSocketHook"
import { celesupApi, refreshAuthTokens } from "./axiosInstances"

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
        // eslint-disable-next-line
    }, [])

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
        <div className="d-flex justify-content-center">
            <GlobalContext.Provider value={contextValues}>
                {/* <Navbar /> */}

                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Index />} />
                    <Route path={`/explore`} element={<ExplorePosts />} />
                    <Route path={`/messager`} element={<Messager />} />
                    <Route path={`/:username`} element={<UserProfile />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />

                    <Route path="*" element={<PageNotFound />} />
                </Routes>

                {focusStates?.createPost && <CreateNewPost />}

                <MobileNavbarLinks />
            </GlobalContext.Provider>
        </div>
    )
}

export default App

