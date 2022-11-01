import Supcel from "./cssStyles/supcel-CSS/supcel"
import { useEffect, useState, createContext } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import jwtDecode from "jwt-decode"
import Navbar from "./layouts/navbar/navbar"
import MobileNavbarLinks from "./layouts/navbar/mobileNavbarLinks"

// route elements
import Login from "./routes/auth/signin/login"
import Register from "./routes/auth/register/register"

// VIEWS
import Index from "./routes"
import Dashboard from "./routes/feed/dashboard"
import UserProfile from "./routes/profile/userProfile"
import ExplorePosts from "./routes/explore/explorePosts"
import PageNotFound from "./routes/pageNotFound"
import CreateNewPost from "./routes/feed/posts/create/createPost"
import Modal from "./features/modal"

export const GlobalContext = createContext({})

function App() {
    const [user, setUser] = useState(null)
    const [focusStates, setFocusState] = useState(null)
    const [tokens, updateTokens] = useState({
        access: localStorage.getItem("access"),
        refresh: localStorage.getItem("refresh"),
    })

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

    function setUserTokens(newTokens) {
        // localStorage.setItem("access", newTokens.access)
        // localStorage.setItem("refresh", newTokens.refresh)

        updateTokens((prev) => {
            return {
                ...prev,
                newTokens,
            }
        })
        // const client = jwtDecode(localStorage.getItem("access"))
        // setUser(client)
    }

    const contextValues = {
        user,
        tokens,
        state: focusStates,
        setUser,
        updateTokens,
        setFocusState,
        setUserTokens,
        supcelLibrary: Supcel,
    }

    return (
        <div id="App blue">
            <GlobalContext.Provider value={contextValues}>
                {/* <Navbar /> */}
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" exact element={<Index />} />
                        <Route path={`/:username`} element={<UserProfile />} />
                        <Route path={`/explore`} element={<ExplorePosts />} />
                        <Route path={`/messager`} element={<>Messages</>} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Register />} />

                        <Route path="*" element={<PageNotFound />} />
                    </Routes>

                    {focusStates?.createPost && <CreateNewPost />}

                    <MobileNavbarLinks />
                </BrowserRouter>
            </GlobalContext.Provider>
        </div>
    )
}

export default App

