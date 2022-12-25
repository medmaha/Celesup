import { useEffect, useState, createContext } from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"

import Navbar from "./layouts/navbar/navbar"
import Create from "./layouts/create/post/create"

import MobileNavbarLinks from "./layouts/navbar/mobileNavbarLinks"

import { refreshAuthTokens } from "./axiosInstances"

import { AppStore } from "./redux/store"
import { updateAuthTokens, updateUserData } from "./redux/app"

// VIEWS
import Homepage from "./routes/homepage"
import { Login, Register, EmailVerification } from "./routes/auth"

// import Index from "./routes"
import PageNotFound from "./routes/pageNotFound"
import useWebSocketHook from "./hooks/useWebSocketHook"
import { Provider, useDispatch, useSelector } from "react-redux"

export const GlobalContext = createContext({})

function handleWebSocketCommunication(ev, updateUserTokens) {
    const data = JSON.parse(ev.data)
    if (data.type === "NOTIFY_USER") {
        setTimeout(updateUserTokens, 1000)
    }
    console.log(data)
}

function App() {
    //
    const [state, setFocusState] = useState(null)
    const { tokens, user, moods, dummy } = useSelector((state) => state.main)

    const { initWebSocket, socket: webSocketMaster } = useWebSocketHook()

    const navigate = useNavigate()
    const storeDispatch = useDispatch()

    useEffect(() => {
        if (!tokens.access && !moods.verification) {
            navigate("/login")
        }
    }, [tokens])

    function updateTokens(data) {
        storeDispatch(updateAuthTokens(data))
    }

    async function refreshTokens() {
        const data = await refreshAuthTokens()
        console.log("called")
        updateTokens(data)
    }

    const contextValues = {
        user: Object.keys(user).length ? user : null,
        tokens: Object.keys(tokens).length ? tokens : null,
        state: state,
        moods,
        dummy,
        updateTokens,
        refreshTokens,
        setFocusState,
        webSocketMaster,
    }

    // if (!Object.keys(user).length) {
    //     navigate("login")
    // }

    return (
        <div className="">
            <GlobalContext.Provider value={contextValues}>
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Homepage />} />

                    {/* <Route path={`/explore`} element={<ExplorePosts />} />
                    <Route path={`/messenger`} element={<Messenger />} />
                    <Route path={`/settings`} element={<Settings />} />
                    <Route path={`/:username`} element={<UserProfile />} />
                    <Route path={`/post/:postId`} element={<PostDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/login" self element={<Login />} />
                */}
                    <Route path="/signup" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/verify/email"
                        element={<EmailVerification />}
                    />

                    <Route path="*" element={<PageNotFound />} />
                </Routes>

                {state?.createPost && <Create />}

                <MobileNavbarLinks />
            </GlobalContext.Provider>
        </div>
    )
}

function AppWrapper() {
    return (
        <Provider store={AppStore}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    )
}

export default AppWrapper
