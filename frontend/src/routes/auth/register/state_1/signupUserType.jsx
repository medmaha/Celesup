import { useState } from "react"
import SignupForm from "./signupForm"

const SignupUserType = () => {
    // const [userType, setUserType] = useState(false)

    const [userType, setUserType] = useState("Signup for free")

    if (userType) return <SignupForm userType={userType} />

    function handleChoiceSelection({ currentTarget }) {
        setUserType(currentTarget.getAttribute("data-option"))
    }

    return (
        // TODO mobile responsive mood setup
        <div className="d-flex justify-content-center">
            <div className="card center" style={{ maxWidth: "400px" }}>
                <h2 className="py-1">Signup For Free!!!</h2>
                <h5 className="">How would you want to use Celesup?</h5>
                <div className="p-2 d-flex justify-content-around signup-options">
                    <span
                        data-option="supporter"
                        onClick={handleChoiceSelection}
                        className="cursor-pointer blue py-__ px-2 d-flex flex-column align-items-center br-lg white-text font-lg"
                    >
                        <span>As a</span>
                        <span>Supporter</span>
                    </span>
                    <span
                        data-option="celebrity"
                        onClick={handleChoiceSelection}
                        className="ml-__ cursor-pointer green py-__ px-2 d-flex flex-column align-items-center br-lg white-text font-lg"
                    >
                        <span>I'm a</span>
                        <span>Celebrity</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SignupUserType
