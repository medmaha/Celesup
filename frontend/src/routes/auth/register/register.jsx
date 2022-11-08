// import'../../../cssStyles/authentication.css'
import SignupUserType from "./state_1/signupUserType"
import SignupEmailVerification from "./state_2/SignupEmailVerification"
import SignupExtraData from "./state_3/signupExtraData"

//  sn-st = signup state

const Register = () => {
    if (localStorage.getItem("sn-st") === "verification") {
        return <SignupEmailVerification />
    }

    if (localStorage.getItem("sn-st") === "information") {
        return <SignupExtraData />
    }

    return <SignupUserType />
}

export default Register
