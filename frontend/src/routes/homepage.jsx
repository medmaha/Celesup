import "./index.css"
import { useEffect } from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { GlobalContext } from "../App"
import Dashboard from "./feed/dashboard"
import Login from "./auth/signin/login"

const Homepage = () => {
    const { user, tokens } = useContext(GlobalContext)

    // if (!user && !tokens) {
    //     return <Login />
    // }

    if (user?.id) {
        return <Dashboard />
    }

    return (
        <div className="d-flex justify-content-center align-items-center height-100">
            <p className="typography">WelCome To Celesup</p>
        </div>
    )
}

export default Homepage
