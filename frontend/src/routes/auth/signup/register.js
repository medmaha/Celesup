import "./ztyle.css"
import { createContext, useState } from "react"
import SignupForm from "./signupForm"
import UserType from "./userType"

export const SignupContext = createContext()

export default function Register() {
    const [state, setState] = useState(<UserType />)

    function updateState(payload) {
        switch (payload.toLowerCase()) {
            case "celebrity":
            case "star":
            case "supporter":
                setState(<SignupForm userType={payload.toLowerCase()} />)
                break
            case "initial":
                setState(<UserType />)
                break
            default:
                break
        }
    }

    return (
        <SignupContext.Provider value={{ state, updateState }}>
            {state}
        </SignupContext.Provider>
    )
}
