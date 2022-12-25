import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { SignupContext } from "../register"
import SignupForm from "../signupForm"

const Register = () => {
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
            <div className="card center" style={{ maxWidth: "500px" }}>
                <h2 className="py-1">Signup For Free!!!</h2>
                <p className="typography p-__">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquam corporis error repellat rem officiis natus.
                </p>
                <h5 className="mt-1 pt-1">
                    <b>How would you want to use Celesup?</b>
                </h5>
                <div className="p-2 d-flex justify-content-around gap-1-rem">
                    <div
                        data-option="supporter"
                        onClick={handleChoiceSelection}
                        data-supporter
                        className="cursor-pointer s__type gap-5-px text-primary font-lg"
                    >
                        <span>As a</span>
                        <span>Supporter</span>
                    </div>
                    <div
                        data-option="celebrity"
                        data-celebrity
                        onClick={handleChoiceSelection}
                        className="cursor-pointer s__type gap-5-px text-secondary font-lg"
                    >
                        <span>I'm a</span>
                        <span>Celebrity</span>
                    </div>
                </div>
            </div>
            <div className="mt-1 p-__">
                <small>Already have an account? </small>
                <Link to={"/login"}>
                    <span className="text-secondary">Log in</span>
                </Link>
            </div>
        </div>
    )
}

export default Register
