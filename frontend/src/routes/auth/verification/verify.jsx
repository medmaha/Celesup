import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuthRequest from "../useAuthRequest"
import { useDispatch } from "react-redux"
import { updateModes } from "../../../redux/app"
import { UseCookie } from "../../../hooks/useCookie"
import { celesupAuthApi } from "../../../axiosInstances"
import { useContext } from "react"
import { GlobalContext } from "../../../App"

let PREV_KEY = false

const COOKIES = UseCookie()

const EmailVerification = () => {
    const { data, pending, error, setError, setPending, sendRequest } =
        useVerifyRequest()
    const [code, setCode] = useState("")
    const [state, setState] = useState({})
    const [changeEmail, setChangeEmail] = useState(false)

    const context = useContext(GlobalContext)
    const navigate = useNavigate()
    const storeDispatch = useDispatch()

    useEffect(() => {
        const dummyData = COOKIES.get("dusr")
        if (dummyData) {
            setState(JSON.parse(dummyData))
        }

        return () => sendRequest()
    }, [])

    useEffect(() => {
        if (!data) return
        if (data.access) {
            COOKIES.erase("acid")
            COOKIES.erase("dusr")
            storeDispatch(
                updateModes({
                    successMessage: "Email validated",
                    verification: false,
                }),
            )
            context.updateTokens(data)
            navigate("/")
        }
    }, [data])

    useEffect(() => {
        if (!error) return
        storeDispatch(updateModes({ errorMessage: error }))
        setError(false)
    }, [error])

    useEffect(() => {
        if (!pending) {
            storeDispatch(updateModes({ loadingRequest: null }))
            return
        }
        storeDispatch(updateModes({ loadingRequest: "spin" }))
    }, [pending])

    useEffect(() => {
        if (!code) return
        submitCode()
    }, [code])

    function handleKeyUp(ev) {
        const CODE = ev.target.value
        if (CODE?.length > 5) {
            setCode(CODE.toString())
        }
    }

    function handleKeyDown(ev) {
        if (ev.key === "Backspace") {
            return
        } else if (!!Number(ev.key)) {
            if (ev.target.value.length > 5) return
            return
        } else if (ev.code.match(/Key./) && !PREV_KEY) {
            ev.preventDefault()
        } else if (ev.key === "Control") {
            PREV_KEY = true
        } else {
            PREV_KEY = false
        }
    }

    async function resendCode() {
        setPending(true)
        celesupAuthApi
            .post("/verify/email", { "resend-code": true })
            .then(
                (res) => {
                    if (res.data.message) {
                        setPending(false)
                        storeDispatch(
                            updateModes({ infoMessage: res.data.message }),
                        )
                    }
                },
                (err) => {
                    setPending(false)
                    storeDispatch(
                        updateModes({
                            errorMessage:
                                err.response?.data?.message || err.message,
                        }),
                    )
                },
            )
            .catch((err) => {
                setPending(false)
                storeDispatch(
                    updateModes({
                        errorMessage:
                            err.response?.data?.message || err.message,
                    }),
                )
            })
    }

    async function submitCode() {
        const form = new FormData()
        form.append("code", code)

        // await sendAuthRequest({
        //     url: "signup/user/verification",
        //     form: form,
        // })
        sendRequest({ form: form, method: "post" })
        setCode("")
    }

    return (
        <>
            {!pending && (
                <div className="d-flex mb-1 justify-content-center flex-column align-items-center px-__">
                    <div className="mt-3"></div>
                    {!changeEmail ? (
                        <div className="mt-1  d-flex flex-column gap-1-rem align-items-center justify-content-center maxwidth-500-px">
                            <h3 className="center">
                                Verify Your Email Address
                            </h3>
                            <p
                                className="typography center"
                                style={{ maxWidth: "50ch" }}
                            >
                                Email Verification Required to Complete
                                Registration! enter the code we emailed to{" "}
                                <b className="link">
                                    {state.email?.toLowerCase()}
                                </b>
                            </p>
                            <div className="code__field mt-1 mb-2">
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

                            <span
                                className="divider"
                                style={{ maxWidth: "45ch" }}
                            ></span>
                            <div className="d-flex flex-column align-items-center gap-1-rem ">
                                <div
                                    className="text-secondary center cursor-pointer"
                                    onClick={() => {
                                        setChangeEmail(!changeEmail)
                                    }}
                                >
                                    Change Email
                                </div>
                                <div className="typography d-flex align-items-center gap-10-px">
                                    <small className="">
                                        Don't receive code?
                                    </small>
                                    <small
                                        className="text-secondary cursor-pointer"
                                        onClick={resendCode}
                                    >
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
                                        onClick={() =>
                                            setChangeEmail(!changeEmail)
                                        }
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

function useVerifyRequest() {
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [pending, setPending] = useState()

    async function sendRequest(
        options = {
            url: "/verify/email",
            method: "get",
            form: {},
            config: {},
        },
    ) {
        options = {
            url: "/verify/email",
            method: "get",
            form: {},
            config: {},
            ...options,
        }

        if (!COOKIES.get("acid")) return

        setPending(true)
        await celesupAuthApi(options.url, {
            method: options.method,
            data: options.form,
            headers: options.config,
        })
            .then(
                (res) => {
                    setData(res.data)
                    setError(null)
                    setPending(false)
                },
                (err) => {
                    setData(null)
                    setError(err.response?.data?.message || err.message)
                    setPending(false)
                },
            )
            .catch((err) => {
                setData(null)
                setError(err.response?.data?.message || err.message)
                setPending(false)
            })
    }

    return { data, setData, error, setError, pending, setPending, sendRequest }
}

export default EmailVerification
