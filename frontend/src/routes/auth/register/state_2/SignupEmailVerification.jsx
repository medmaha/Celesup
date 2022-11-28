import "./style.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Spinner from "../../../../features/Spinner"
import SignupExtraData from "../state_3/signupExtraData"
import useAuthRequest from "../../useAuthRequest"
import AlertMessage from "../../../../features/AlertMessage"

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
        if (ev.key !== "Backspace") {
            if (ev.target.value.length === 7) {
                ev.preventDefault()
            }
        }
        if (ev.target.value) {
            if (Number(ev.target.value) === NaN) {
                ev.preventDefault()
            }
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
                className="typography center mt-1 cursor-pointer"
                onClick={changeEmail}
            >
                Change Email
            </div>
        </div>
    )
}

export default SignupEmailVerification
