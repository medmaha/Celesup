import "./style.css"
import { useState, useEffect, useContext, useRef, useReducer } from "react"
import { useNavigate } from "react-router-dom"
import Spinner from "../../../../features/Spinner"
import AlertMessage from "../../../../features/AlertMessage"
import { GlobalContext } from "../../../../App"
import useAuthRequest from "../../useAuthRequest"

function toggleGender(state, action) {
    switch (action.type) {
        case "male":
            return {
                male: true,
                female: false,
            }
        case "female":
            return {
                male: false,
                female: true,
            }
        default:
            return state
    }
}

// send extra more information to the server from the signing up user
const SignupExtraData = () => {
    const [gender, dispatch] = useReducer(toggleGender, {
        male: false,
        female: false,
    })
    const [formData, updateFormData] = useState({})

    const [data, error, pending, sendAuthRequest] = useAuthRequest()

    const { user, updateTokens } = useContext(GlobalContext)
    const navigate = useNavigate()

    const avatar = useRef()

    useEffect(() => {
        if (!user) return

        localStorage.removeItem("sn-st")
        localStorage.removeItem("code")
        navigate(`/${user.username.toLowerCase()}`)

        // eslint-disable-next-line
    }, [user])

    useEffect(() => {
        if (!data) return

        const timeout = setTimeout(function () {
            updateTokens({
                access: data.tokens.access,
                refresh: data.tokens.refresh,
            })
        }, 1000)
        return () => clearTimeout(timeout)
        // eslint-disable-next-line
    }, [data])

    function handleFormChange({ target }) {
        updateFormData({
            ...formData,
            [target.name]: target.value.trim(),
        })
    }

    function handleGenderChange({ target }) {
        dispatch({ type: target.name })
        updateFormData({
            ...formData,
            gender: target.name,
        })
    }

    function handleAvatarChange() {
        // const image = currentTarget.parentNode.querySelector('img')
        const fileSelector = document.createElement("input")
        fileSelector.setAttribute("type", "file")
        fileSelector.click()
        fileSelector.addEventListener("change", () => {
            if (fileSelector.files.length > 0) {
                updateFormData({
                    ...formData,
                    avatar: fileSelector.files[0],
                })

                const reader = new FileReader()
                reader.readAsDataURL(fileSelector.files[0])
                reader.onload = () => {
                    avatar.current.src = reader.result
                }
                return
            }
            updateFormData({
                ...formData,
                avatar: null,
            })
        })
    }

    function submitForm() {
        if (!formData.full_name) return

        const form = new FormData()
        form.append("gender", formData.gender || "Unspecified")
        form.append("biography", formData.biography || null)
        form.append("city", formData.city || null)
        form.append("full_name", formData.full_name)
        form.append("code ", localStorage.getItem("code"))

        if (formData.avatar) {
            form.append("avatar", formData.avatar)
        }
        sendAuthRequest({
            url: "/signup/user/informations",
            form: form,
            options: { headers: { "Content-Type": "multipart/form-data" } },
        })
    }

    return (
        <div className="signup__extra__info pt-2 height-100 d-flex justify-content-center">
            <div className="card mx-__" style={{ maxWidth: "350px" }}>
                <h5 className="text-center m1-2">A Little More About You</h5>

                {error && <AlertMessage asError={true} message={error} />}
                {data && (
                    <AlertMessage
                        asSuccess={true}
                        message={"Successfully Registered your account"}
                    />
                )}

                <div className="input-field">
                    <input
                        onChange={handleFormChange}
                        type="text"
                        name="full_name"
                        placeholder="full name"
                        autoComplete="off"
                    />
                </div>
                <div className="input-field">
                    <textarea
                        onChange={handleFormChange}
                        name="biography"
                        placeholder="biography (optional)"
                        autoComplete="off"
                    ></textarea>
                </div>

                <div className="input-field">
                    <input
                        onChange={handleFormChange}
                        type="text"
                        name="city"
                        placeholder="city (optional)"
                        autoComplete="off"
                    />
                </div>
                <div className="px-__">
                    <span className="" style={{ letterSpacing: "1px" }}>
                        Gender?
                    </span>
                    <div className="pl-1 py-__">
                        <label>
                            <input
                                name="male"
                                type="checkbox"
                                checked={gender.male}
                                onChange={handleGenderChange}
                            />
                            <span className="px-__">Male</span>
                        </label>
                        <label className="ml-1">
                            <input
                                name="female"
                                type="checkbox"
                                checked={gender.female}
                                onChange={handleGenderChange}
                            />
                            <span className="px-__">Female</span>
                        </label>
                    </div>
                </div>
                <div
                    className={
                        formData.full_name?.length > 3
                            ? "pt-1 d-flex align-items-center justify-content-between"
                            : "pt-1 d-flex align-items-center justify-content-center"
                    }
                >
                    <div
                        onClick={handleAvatarChange}
                        className="default__avater cursor-pointer  pos-relative"
                    >
                        <img
                            ref={avatar}
                            src={require("./default.png")}
                            className="responsive br-full border"
                            alt="File Not Supported"
                        />
                        <span
                            onClick={handleAvatarChange}
                            className="cursor-pointer pos-absolute px-__ bottom-10 right-minus-20"
                        >
                            <span
                                onClick={handleAvatarChange}
                                className="icon-wrapper br-full"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z" />
                                </svg>
                            </span>
                        </span>
                    </div>
                    {formData.full_name?.length > 3 && (
                        <>
                            {pending ? (
                                <Spinner small={true} />
                            ) : (
                                <button
                                    className="btn-outline-teal btn"
                                    onClick={submitForm}
                                >
                                    <span>Register</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 512"
                                    >
                                        <path d="M223.1 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 223.1 256zM274.7 304H173.3C77.61 304 0 381.7 0 477.4C0 496.5 15.52 512 34.66 512h286.4c-1.246-5.531-1.43-11.31-.2832-17.04l14.28-71.41c1.943-9.723 6.676-18.56 13.68-25.56l45.72-45.72C363.3 322.4 321.2 304 274.7 304zM371.4 420.6c-2.514 2.512-4.227 5.715-4.924 9.203l-14.28 71.41c-1.258 6.289 4.293 11.84 10.59 10.59l71.42-14.29c3.482-.6992 6.682-2.406 9.195-4.922l125.3-125.3l-72.01-72.01L371.4 420.6zM629.5 255.7l-21.1-21.11c-14.06-14.06-36.85-14.06-50.91 0l-38.13 38.14l72.01 72.01l38.13-38.13C643.5 292.5 643.5 269.7 629.5 255.7z" />
                                    </svg>
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

// resizes the changed profile image of the user
// eslint-disable-next-line no-lone-blocks
{
    /* function resizeProfileImg(image, reader) {
    image.src = reader.result    
    image.addEventListener('load',()=>{
        if (image.naturalWidth > 130){
            const maxWidth = 150
            const scaleSize = image.width / maxWidth
            const maxHeight = image.height * scaleSize

            image.style.aspectRatio = '1.05'
            image.width = maxWidth
            image.height = maxHeight
        }
    })
    return image.src
} */
}

export default SignupExtraData
