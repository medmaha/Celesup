import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Spinner from "../../../features/Spinner"
import useAuthRequest from "../useAuthRequest"
import AlertMessage from "../../../features/AlertMessage"
import { useDispatch, useSelector } from "react-redux"
import { updateModes } from "../../../redux/app"
import { UseCookie } from "../../../hooks/useCookie"
import { celesupAuthApi } from "../../../axiosInstances"

let PREV_KEY = false

const EmailVerification = () => {
    const [data, pending, error, sendAuthRequest] = useAuthRequest()
    const [code, setCode] = useState("")
    const [changeEmail, setChangeEmail] = useState(false)

    const cookies = UseCookie()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { state } = useLocation()

    useEffect(() => {
        return () => {
            if (cookies.get("acid")) {
                const config = {
                    // withCredentials: true,
                    headers: {
                        Authorization: cookies.get("acid"),
                    },
                }
                celesupAuthApi
                    .get("/verify/email", config)
                    .then((res) => {
                        // console.log(res.data)
                        // cookies.set("acid", res.data.cookies_id, 1)
                        // cookies.set("dusr", JSON.stringify(res.data), 1)
                        // dispatch(
                        //     updateModes({
                        //         dummy: res.data,
                        //         verification: true,
                        //     }),
                        // )
                        // console.log("")
                        console.log(res.data)
                    })
                    .catch((err) => {
                        console.log(err.message)
                        // cookies.erase("acid")
                        // cookies.erase("dusr")
                        // updateModes({
                        //     dummy: null,
                        //     verification: false,
                        // })
                    })
            }
        }
    }, [])

    // useEffect(() => {
    //     if (!data) return
    // }, [data])

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

    return (
        <div className="d-flex mb-1 justify-content-center flex-column align-items-center px-__">
            <div className="mt-3"></div>
            {error && <AlertMessage asError={true} message={error.message} />}

            {!changeEmail ? (
                <div className="mt-1  d-flex flex-column gap-1-rem align-items-center justify-content-center maxwidth-500-px">
                    <h3 className="center">Account Verification</h3>
                    <p
                        className="typography center"
                        style={{ maxWidth: "35ch" }}
                    >
                        We've send a confirmation code to{" "}
                        {state.email.toLowerCase()}! Enter the code to continue
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
                    <div className="d-flex flex-column align-items-center gap-1-rem mt-1">
                        <div
                            className="text-secondary center mt-__ cursor-pointer"
                            onClick={() => {
                                setChangeEmail(!changeEmail)
                            }}
                        >
                            Change Email
                        </div>
                        <div className="typography d-flex align-items-center gap-10-px">
                            <small className="">Don't receive code?</small>
                            <small className="text-secondary cursor-pointer">
                                Resend Code
                            </small>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="card maxwidth-500-px mt-1">
                    <h4 className="center">Change Email Address</h4>
                    <form action="" className="px-__" id="">
                        <div className="input-field gap-10-px">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="email address"
                                style={{ padding: "1rem 0.5rem" }}
                            />
                        </div>
                        <div className="d-flex justify-content-right gap-10-px">
                            <button className="btn">Submit</button>
                            <button
                                className="btn invalid-bg"
                                onClick={() => setChangeEmail(!changeEmail)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default EmailVerification
