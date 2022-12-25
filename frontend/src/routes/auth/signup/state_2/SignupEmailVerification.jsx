import "./style.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Spinner from "../../../../features/Spinner"
import SignupExtraData from "../state_3/signupExtraData"
import useAuthRequest from "../../useAuthRequest"
import AlertMessage from "../../../../features/AlertMessage"

let PREV_KEY = false

const SignupEmailVerification = ({ signupContext }) => {
    const [data, pending, error, sendAuthRequest] = useAuthRequest()
    const [code, setCode] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (!data) return
        localStorage.setItem("sn-st", "info")
    }, [data])

    useEffect(() => {
        if (!code) return
        submitCode()
    }, [code])

    function handleKeyUp(ev) {
        const CODE = ev.target.value
        if (CODE?.length > 6) {
            setCode(CODE.toString())
        }
    }

    function handleKeyDown(ev) {
        console.log(ev.code)
        console.log(ev.key)
        if (ev.key === "Backspace") {
            return
        } else if (!!Number(ev.key)) {
            if (ev.target.value.length > 6) return
            return
        } else if (ev.code.match(/Key./) && !PREV_KEY) {
            ev.preventDefault()
        } else if (ev.key === "Control") {
            PREV_KEY = true
        } else {
            PREV_KEY = false
        }
    }

    function submitCode() {
        const form = new FormData()
        form.append("code", code)

        sendAuthRequest({
            url: "signup/user/verification",
            form: form,
        })
        setCode("")
    }

    function changeEmail() {
        localStorage.removeItem("sn-st")
        navigate("/signup")
    }

    if (data) return <SignupExtraData />

    return (
        <div className="d-flex mb-1 justify-content-center flex-column align-items-center px-__">
            <div className="mt-3"></div>
            {error && <AlertMessage asError={true} message={error.message} />}

            <div className="mt-1 card d-flex flex-column gap-2-rem align-items-center justify-content-center maxwidth-500-px">
                <h3 className="center">Account Verification</h3>
                <p className="typography center" style={{ maxWidth: "35ch" }}>
                    We've send a confirmation code to the email you provided,
                    Enter the code to continue
                </p>
                <div className="code__field mt-1">
                    <input
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleKeyUp}
                        disabled={pending}
                        maxLength={7}
                        type="number"
                        autoComplete="off"
                        name="code"
                        className="br-sm"
                        placeholder="CODE"
                    />
                </div>

                <div className="d-flex justify-content-center">
                    {pending && <Spinner large={true} />}
                </div>
            </div>

            <div
                className="text-secondary center mt-__ cursor-pointer"
                onClick={changeEmail}
                style={{ borderBottom: "1px solid", padding: "5px 5px" }}
            >
                Change Email
            </div>
        </div>
    )
}

export default SignupEmailVerification
