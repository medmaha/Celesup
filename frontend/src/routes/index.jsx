import "./index.css"
import { useEffect } from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { GlobalContext } from "../App"
import Dashboard from "./feed/dashboard"
import Login from "./auth/signin/login"

const Index = () => {
    const { user, tokens } = useContext(GlobalContext)

    if (!user && !tokens) {
        return <Login />
    }

    return <Dashboard />
}

export default Index
