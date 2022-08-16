import { useState } from 'react'
import SignupForm from './signupForm';


const SignupUserType = () => {

    const [userType, setUserType] = useState(false)

    if (userType) return <SignupForm userType={userType}/>

    function handleChoiceSelection({currentTarget}) {
        setUserType(currentTarget.getAttribute('data-option'))
    }

    return (
        <div className='d-flex justify-content-center mt-3'>
            <div className="card" style={{maxWidth:'400px'}}>
                <h1 className='text-center py-1'>Signup For Free!!!</h1>
                <h5 className='text-center'>How would you want to use Celesup?</h5>
                <div className='p-2 d-flex justify-content-around signup-options'>
                    <span  data-option='supporter' onClick={handleChoiceSelection}
                            className="cursor-pointer teal py-__ px-2 d-flex flex-column align-items-center br-lg white-text-darken-1">
                        <span >As a</span>
                        <span>Supporter</span>
                    </span>
                    <span data-option='celebrity' onClick={handleChoiceSelection}
                        className="cursor-pointer blue py-__ px-2 d-flex flex-column align-items-center br-lg white-text-darken-1">
                        <span>I'm a</span> 
                        <span>Celebrity</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SignupUserType
