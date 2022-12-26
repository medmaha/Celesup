import { useContext, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { SignupContext } from "./register"

import ProgressBar from "../../../features/loader"
import AlertMessage from "../../../features/AlertMessage"
import useAuthRequest from "../useAuthRequest"

import PasswordField from "./component/passwordField"
import { UseCookie } from "../../../hooks/useCookie"
import RegistrationForm from "./component/RegistrationForm"

const SignupForm = ({ userType }) => {
    const [formData, updateFormData] = useState({})

    const [data, pending, error, sendAuthRequest] = useAuthRequest()
    const cookies = UseCookie()

    const registrationContext = useContext(SignupContext)

    const navigate = useNavigate()

    function handleFormChange({ target }) {
        updateFormData((prev) => {
            return {
                ...prev,
                [target.name]: target.value.trim(),
            }
        })
    }

    function submitForm(e) {
        e.preventDefault()

        if (formHasErrors(formData)) return

        const form = new FormData()

        form.append("email", formData.email.trim())
        form.append("username", formData.username.trim())
        form.append("password", formData.password1.trim())
        form.append("user_type", userType?.trim())

        sendAuthRequest({
            url: "/signup",
            form: form,
        })
    }

    useEffect(() => {
        if (!data) return
        cookies.set("acid", data.cookie_id, 1)
        cookies.set("dusr", JSON.stringify(data), 1)
        navigate("/verify/email", { state: data, replace: true })
    }, [data])

    return (
        <>
            <div className="d-flex justify-content-center flex-wrap pb-2">
                <div className="pb-0 flex d-flex justify-content center align-items-center maxwidth-500-px">
                    <h3
                        className="px-__ center typography pb-__"
                        style={{ letterSpacing: "1px", lineHeight: "30px" }}
                    >
                        <IntroComponent userType={userType} />
                    </h3>
                </div>
                <div className="flex d-flex justify-content-center flex-column align-items-center width-max-content p-__ maxwidth-500-px">
                    <div className="card br-md pos-relative width-100 minwidth-350-px">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <div
                                className="cursor-pointer p-__"
                                title="go back"
                                onClick={() => {
                                    registrationContext.updateState("initial")
                                }}
                            >
                                <span className="text-secondary font-lg">
                                    &larr;
                                </span>
                            </div>
                            <h2 className="light-text center">
                                {userType.toUpperCase()}
                            </h2>
                        </div>
                        <RegistrationForm
                            submitForm={submitForm}
                            updateFormData={updateFormData}
                            handleFormChange={handleFormChange}
                        />
                    </div>
                    <div className="d-flex justify-content-center align-items-center gap-10-px my-__ cursor-pointer">
                        <small>Already a member?</small>
                        <Link to="/login">
                            <span className="text-secondary text-hover-blue">
                                Log in
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

function IntroComponent({ userType }) {
    const [intro, setIntro] = useState(introductions[userType]?.data[0] || "")

    useEffect(() => {
        const interval = setInterval(updateIntro, 10000)
        return () => clearInterval(interval)
    }, [])

    function updateIntro() {
        const currentIntro = introductions[userType]

        if (!currentIntro) return
        const data = currentIntro.data

        let text

        if (data[currentIntro.currentIdx + 1]) {
            currentIntro.currentIdx++
            text = data[currentIntro.currentIdx]
            setIntro(text)
            return
        }
        currentIntro.currentIdx = 0
        text = data[currentIntro.currentIdx]
        setIntro(text)
    }

    return <p className="">{intro}</p>
}

function formHasErrors(form) {
    if (form.email && form.username && form.password1) return
    return true
}

const introductions = {
    star: {
        currentIdx: 0,
        data: [
            <>
                Get discovered on <span className="text-primary">Celesup</span>{" "}
                and share your talents and achievements with your fans.
            </>,
            //
            <>
                <span className="text-primary">Celesup!</span> Sign up now and
                access a range of tools and features to help you connect with
                your supporters.
            </>,
            <>
                Become a influencer on{" "}
                <span className="text-primary">Celesup</span> and showcase your
                talents and achievements to a global audience.
            </>,
            <>
                Simply fill out this form to get started and become a part of{" "}
                <span className="text-primary">Celesup</span> community today.
            </>,
            //
            <>
                <span className="text-primary">Celesup</span> brings together
                like-minded individuals from around the world.
            </>,
            <>
                Whether you're a celebrity looking for support or a supporter
                looking to show your love{" "}
                <span className="text-primary">Celesup</span> got you
            </>,
        ],
    },
    supporter: {
        currentIdx: 0,
        data: [
            <>
                Join the <span className="text-primary">Celesup</span> community
                and become a part of your favorite stars' inner circle.
            </>,

            <>
                <span className="text-primary">Celesup</span> Give you the VIP
                treatment and connects you to your favorite celebrities like
                never before with your idols.
            </>,
            <>
                Get behind-the-scenes access to your favorite celebrities on{" "}
                <span className="text-primary">Celesup</span>
            </>,
            <>
                Connect with your favorite celebrities and be a part of their
                journey all few clicks on{" "}
                <span className="text-primary">Celesup</span>.
            </>,
            <>
                Whether you're a celebrity looking for support or a supporter
                looking to show your love{" "}
                <span className="text-primary">Celesup</span> got you
            </>,
        ],
    },
}

export default SignupForm
