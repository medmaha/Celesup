import'./style.css'
import { useState, useEffect} from 'react'
import PendingSpinner from '../../../../features/pendingSpinner'
import SignupExtraData from '../state_3/signupExtraData'
import useAuthRequest from '../../useAuthRequest'

const SignupEmailVerification = () => {
    
    const [data, pending, error, sendAuthRequest] = useAuthRequest()
    const [code, setCode] = useState('')

    useEffect(()=>{
        if (code.length < 7) return
        submitCode()
        // eslint-disable-next-line
    },[code])
    
    useEffect(()=>{
        localStorage.setItem('sn-st', 'information')
        localStorage.setItem('code', code)
        // eslint-disable-next-line
    },[data])

    useEffect(()=>{
        if (!error) return
        setCode('')
        // eslint-disable-next-line
    },[error])

    function handleCodeChange({target}){
        if (target.value.length > 6){
            target.blur()
        }
        setCode(target.value)
    }

    function submitCode(){
        const form = new FormData();
        form.append('code', code?.trim())
        
        sendAuthRequest({
            url: '/signup/user/verification',
            form: form
        })
    }
    
    return (
        <>
            {data ?
                <SignupExtraData /> 
                    :
                <>
                    <div className='d-flex flex-column align-items-center mt-3'>
                        <div className="verificdation" style={{maxWidth: '400px'}}>
                            <h5 className='text-center'>Account Verification</h5>
                            {error && 
                                <div className="mt-1 d-flex justify-content-center">
                                    <span className="red-lighten-3 white-text px-1 py-__ br-sm" style={{fontSize: '.9rem'}}>
                                        Invalid Code
                                    </span>
                                </div>
                            }
                            <p className="px-3 py-1 text-center">
                                We've send a confirmation code to the email you provided,  Enter the code to continue
                            </p>
                            <div className="code__field">
                                <input onChange={handleCodeChange} value={code} disabled={pending}
                                type="number" autoComplete='off' name="code" className='br-sm'  placeholder='CODE'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-1 d-flex justify-content-center">
                        {pending && <PendingSpinner large={true}/>}
                    </div>
                </>
            }
        </>
    )
}

export default SignupEmailVerification
