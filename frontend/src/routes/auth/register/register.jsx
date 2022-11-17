// import'../../../cssStyles/authentication.css'
import { useState } from "react"
import SignupUserType from "./state_1/signupUserType"
import SignupEmailVerification from "./state_2/SignupEmailVerification"
import SignupExtraData from "./state_3/signupExtraData"

//  sn-st = signup state

const Register = () => {
    const [context, setContext] = useState()

    if (localStorage.getItem("sn-st") === "code") {
        return <SignupEmailVerification />
    }

    if (localStorage.getItem("sn-st") === "info") {
        return <SignupExtraData />
    }

    return <SignupUserType />
}

export default Register
