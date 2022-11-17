import "./style.css"
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import PasswordField from "./passwordField"
import AlertMessage from "../../../../features/AlertMessage"
import Spinner from "../../../../features/Spinner"
import SignupEmailVerification from "../state_2/SignupEmailVerification"
import useAuthRequest from "../../useAuthRequest"
import ProgressBar from "../../../../features/loader"

const SignupForm = ({ userType }) => {
    const [formData, updateFormData] = useState({})
    const [data, pending, error, sendAuthRequest] = useAuthRequest()
    const [validation, setValidation] = useState(false)

    const navigate = useNavigate()

    function handleFormChange({ target }) {
        updateFormData((prev) => {
            return {
                ...prev,
                [target.name]: target.value.trim(),
            }
        })
    }

    function gotoLoginRoute() {
        navigate("/login")
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
            url: "/signup/user",
            form: form,
        })
    }

    useEffect(() => {
        if (!data) return
        localStorage.setItem("sn-st", "verification")
        localStorage.setItem("code", data.code)
        setValidation(true)
    }, [data])

    if (validation) {
        return <SignupEmailVerification />
    }

    return (
        <>
            <form
                className="px-__ d-flex flex-column align-items-center width-100"
                id="registrationForm"
            >
                <div className="" style={{ maxWidth: "450px" }}>
                    {error && (
                        <AlertMessage asError={true} message={error.message} />
                    )}
                </div>
                <div
                    className="card mt-1 p-2 br-sm pos-relative"
                    style={{ maxWidth: "450px" }}
                >
                    {!!pending && (
                        <ProgressBar
                            endPos={"450px"}
                            height="5px"
                            disableComponent={true}
                        />
                    )}
                    <h2 className="light-text center mb-2">
                        {userType.toUpperCase()}
                    </h2>
                    <div className="input-field">
                        <input
                            className="br-m"
                            required
                            type="email"
                            name="email"
                            placeholder="email/phone"
                            autoComplete="off"
                            onChange={handleFormChange}
                            style={{
                                padding: "14px .5rem",
                                width: "100%",
                                minWidth: "270px",
                                // maxWidth: "350px",
                            }}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            className="br-md"
                            required
                            type="text"
                            name="username"
                            placeholder="username"
                            autoComplete="Off"
                            onChange={handleFormChange}
                            style={{
                                padding: "14px .5rem",
                                width: "100%",
                                minWidth: "270px",
                                // maxWidth: "350px",
                            }}
                        />
                    </div>
                    <PasswordField
                        updateFormData={updateFormData}
                        fieldName={"password1"}
                    />
                    <PasswordField
                        updateFormData={updateFormData}
                        fieldName={"password2"}
                        placeholder="confirm password"
                    />

                    <div className="d-flex justify-content-center mt-1">
                        <button
                            className="btn-primary btn-large"
                            onClick={submitForm}
                        >
                            <span>Signup</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 512"
                            >
                                <path d="M223.1 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 223.1 256zM274.7 304H173.3C77.61 304 0 381.7 0 477.4C0 496.5 15.52 512 34.66 512h286.4c-1.246-5.531-1.43-11.31-.2832-17.04l14.28-71.41c1.943-9.723 6.676-18.56 13.68-25.56l45.72-45.72C363.3 322.4 321.2 304 274.7 304zM371.4 420.6c-2.514 2.512-4.227 5.715-4.924 9.203l-14.28 71.41c-1.258 6.289 4.293 11.84 10.59 10.59l71.42-14.29c3.482-.6992 6.682-2.406 9.195-4.922l125.3-125.3l-72.01-72.01L371.4 420.6zM629.5 255.7l-21.1-21.11c-14.06-14.06-36.85-14.06-50.91 0l-38.13 38.14l72.01 72.01l38.13-38.13C643.5 292.5 643.5 269.7 629.5 255.7z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
            <div className="d-flex justify-content-center font-md my-2 cursor-pointer">
                Already a member?
                <Link to="/login">
                    <span className="teal-text-lighten-2 pl-__ hint-text  text-hover-blue-lighten-3">
                        Login
                    </span>
                </Link>
            </div>
        </>
    )
}

function formHasErrors(form) {
    if (form.email && form.username && form.password1) return
    return true
}

export default SignupForm
