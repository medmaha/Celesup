import { useEffect, useState, createContext } from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"

import Navbar from "./layouts/navbar/navbar"
import Create from "./layouts/create/post/create"

import MobileNavbarLinks from "./layouts/navbar/mobileNavbarLinks"

import { refreshAuthTokens } from "./axiosInstances"

import { AppStore } from "./redux/store"
import { updateAuthTokens, updateModes, updateActiveLink } from "./redux/app"

// VIEWS
import Homepage from "./routes/homepage"
import { Login, Register, EmailVerification } from "./routes/auth"

import { Discover } from "./routes/discover"
import { Settings } from "./routes/settings"
import { Messenger } from "./routes/messenger"
import { UserProfile } from "./routes/profile"

// import Index from "./routes"
import PageNotFound from "./routes/pageNotFound"
import useWebSocketHook from "./hooks/useWebSocketHook"
import { Provider, useDispatch, useSelector } from "react-redux"
import Alerts from "./features/Alerts"
import Loading from "./features/Loading"

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
    const { tokens, user, moods, dummy, activeLink } = useSelector(
        (state) => state.main,
    )

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
        updateTokens(data)
    }

    const contextValues = {
        user: Object.keys(user).length ? user : null,
        tokens: Object.keys(tokens).length ? tokens : null,
        state: state,
        moods: { ...moods, ...state },
        dummy,
        activeLink,
        updateModes,
        updateTokens,
        updateActiveLink,
        refreshTokens,
        setFocusState,
        storeDispatch,
        webSocketMaster,
    }

    return (
        <div className="pos-relative">
            <GlobalContext.Provider value={contextValues}>
                <Navbar />

                <Routes>
                    <Route path="/" exact element={<Homepage />} />

                    <Route path={`/messenger`} element={<Messenger />} />
                    <Route path={`/settings`} element={<Settings />} />
                    <Route path={`/:username`} element={<UserProfile />} />
                    <Route path={`/discover`} element={<Discover />} />
                    {/* 
                    <Route path={`/post/:postId`} element={<PostDetail />} />
                */}
                    <Route path="/signup" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/verify/email"
                        element={<EmailVerification />}
                    />

                    <Route path="*" element={<PageNotFound />} />
                </Routes>

                {moods?.createPost && <Create />}
                {moods.errorMessage && (
                    <Alerts type={"error"} message={moods.errorMessage} />
                )}
                {moods.successMessage && (
                    <Alerts type={"success"} message={moods.successMessage} />
                )}
                {moods.infoMessage && (
                    <Alerts type={"info"} message={moods.infoMessage} />
                )}
                {moods.loadingRequest && (
                    <Loading icon={moods.loadingRequest} />
                )}

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
