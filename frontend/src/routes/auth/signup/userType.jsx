import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { SignupContext } from "./register"

export default function UserType() {
    // const [userType, setUserType] = useState(false)

    const [userType, setUserType] = useState("")
    const registrationContext = useContext(SignupContext)

    useEffect(() => {
        if (!!userType) {
            registrationContext.updateState(userType)
        }
    }, [userType])

    function handleChoiceSelection({ currentTarget }) {
        setUserType(currentTarget.getAttribute("data-option"))
    }

    return (
        // TODO mobile responsive mood setup
        <div className="d-flex justify-content-center align-items-center flex-column">
            <div
                className="card_ center mt-1 pt-1"
                style={{ maxWidth: "500px" }}
            >
                <h2 className="py-1">Join the Celesup Community</h2>
                <p className="typography p-__">
                    Welcome to <span className="text-primary">Celesup</span> the
                    ultimate platform for connecting celebrities and their
                    supporters!
                </p>
                <h5 className="mt-1 pt-__">Select Your Profile Type</h5>
                <div className="p-2 d-flex justify-content-around gap-1-rem">
                    <div
                        data-option="supporter"
                        onClick={handleChoiceSelection}
                        data-supporter
                        className="cursor-pointer s__type gap-5-px text-primary font-lg"
                    >
                        <span>Supporter</span>
                    </div>
                    <div
                        data-option="star"
                        data-celebrity
                        onClick={handleChoiceSelection}
                        className="cursor-pointer s__type gap-5-px text-secondary font-lg"
                    >
                        <span>Celebrity</span>
                    </div>
                </div>
            </div>
            <span className="divider" style={{ maxWidth: "500px" }}></span>
            <div className="mt-1 p-__">
                <small>Already have an account? </small>
                <Link to={"/login"}>
                    <span className="text-secondary">Log in</span>
                </Link>
            </div>
        </div>
    )
}
