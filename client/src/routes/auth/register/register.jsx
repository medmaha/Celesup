// import'../../../cssStyles/authentication.css'
import { createContext, useState } from "react"
import SignupUserType from "./state_1/signupUserType"
import SignupEmailVerification from "./state_2/SignupEmailVerification"
import SignupExtraData from "./state_3/signupExtraData"

//  sn-st = signup state

export const SignupContext = createContext()

const Register = () => {
    const [context, setContext] = useState()

    if (localStorage.getItem("sn-st") === "code") {
        return <SignupEmailVerification />
    }

    if (localStorage.getItem("sn-st") === "info") {
        return <SignupExtraData />
    }

    return (
        <SignupContext.Provider value={{}}>
            <SignupUserType />
        </SignupContext.Provider>
    )
}

export default Register
