import { useState, useContext, useEffect } from "react";
import { useNavigate, } from "react-router-dom";
import { GlobalContext } from "../../../App";
import DisplayAlertMessage from "../../../features/displayAlertMessage";
import PendingSpinner from "../../../features/pendingSpinner";
import useAuthRequest from "../useAuthRequest";


const Login = () => {
    
    const {user, updateTokens} = useContext(GlobalContext)
    const [data, pending, error , sendAuthRequest] = useAuthRequest()

    const [formData, updateFormData] = useState({}) 
    const [showPassword, setShowPassword] = useState(false) 
    const navigate = useNavigate() 
    
    useEffect(()=>{
        if (!user) return
        navigate(`/${user.username}`,{replace:true})
        // eslint-disable-next-line 
    },[user])
    
    useEffect(()=>{
        if (!data) return
        updateTokens({
            access: data.access,
            refresh: data.refresh
        })
    // eslint-disable-next-line 
    },[data])

    function handleFormChange({ target }) {
        updateFormData({
            ...formData,
            [target.name.trim()]: target.value.trim()
        })
    }

    function toggleShowPassword({currentTarget}) {
        if (!formData.password || (formData.password?.length === 0)) return
        const input = currentTarget.parentNode.querySelector('input')
        setShowPassword(prev=>!prev)
        if (!showPassword === true){
            input.setAttribute('type', 'text')
        }else{
            input.setAttribute('type', 'password')
        }
    }

    function submitForm (e){
        e.preventDefault()
        
        if (!formData.email || !formData.password) return
        const form = new FormData(e.target)
        form['email'] = formData.email
        form['password'] = formData.password

        sendAuthRequest({
            url:'/obtain/user/tokens',
            form: form
        })

    }

    function gotoRegisterRoute() {
        return navigate('/signup')
    }

    return (
        <>
            <div className="d-flex justify-content-center mt-3">
                <div className="card mx-__" style={{maxWidth: '300px'}}>
                    <h3 className="text-center">
                        Welcome To Celesup
                    </h3>
                    <h5 className="text-center py-__ " style={{letterSpacing: '2px'}}>
                        LOGIN
                    </h5>
                    {error && <DisplayAlertMessage asError={true} message={error}/>}
                    <form onSubmit={submitForm}>
                        <div className='input-field'>
                            <input name="email" type="email" placeholder='Email Address'  autoComplete='off' onChange={handleFormChange}/>
                        </div>
                        <div className='input-field'>
                            <input name="password" type="password" placeholder='Password' autoComplete='off' onChange={handleFormChange} />
                            {formData.password?.length > 0 &&
                                <span className="show-password" onClick={toggleShowPassword}>
                                    { showPassword ?
                                        <>
                                            <svg className="disable" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                                <path d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM189.8 123.5L235.8 159.5C258.3 139.9 287.8 128 320 128C390.7 128 448 185.3 448 256C448 277.2 442.9 297.1 433.8 314.7L487.6 356.9C521.1 322.8 545.9 283.1 558.6 256C544.1 225.1 518.4 183.5 479.9 147.7C438.8 109.6 385.2 79.1 320 79.1C269.5 79.1 225.1 97.73 189.8 123.5L189.8 123.5zM394.9 284.2C398.2 275.4 400 265.9 400 255.1C400 211.8 364.2 175.1 320 175.1C319.3 175.1 318.7 176 317.1 176C319.3 181.1 320 186.5 320 191.1C320 202.2 317.6 211.8 313.4 220.3L394.9 284.2zM404.3 414.5L446.2 447.5C409.9 467.1 367.8 480 320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L120.8 191.2C102.1 214.5 89.76 237.6 81.45 255.1C95.02 286 121.6 328.5 160.1 364.3C201.2 402.4 254.8 432 320 432C350.7 432 378.8 425.4 404.3 414.5H404.3zM192 255.1C192 253.1 192.1 250.3 192.3 247.5L248.4 291.7C258.9 312.8 278.5 328.6 302 333.1L358.2 378.2C346.1 381.1 333.3 384 319.1 384C249.3 384 191.1 326.7 191.1 255.1H192z"/></svg>
                                        </> 
                                            :
                                        <>
                                            <svg className="enable" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                <path d="M160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256zM288 336C332.2 336 368 300.2 368 256C368 211.8 332.2 176 288 176C287.3 176 286.7 176 285.1 176C287.3 181.1 288 186.5 288 192C288 227.3 259.3 256 224 256C218.5 256 213.1 255.3 208 253.1C208 254.7 208 255.3 208 255.1C208 300.2 243.8 336 288 336L288 336zM95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6V112.6zM288 80C222.8 80 169.2 109.6 128.1 147.7C89.6 183.5 63.02 225.1 49.44 256C63.02 286 89.6 328.5 128.1 364.3C169.2 402.4 222.8 432 288 432C353.2 432 406.8 402.4 447.9 364.3C486.4 328.5 512.1 286 526.6 256C512.1 225.1 486.4 183.5 447.9 147.7C406.8 109.6 353.2 80 288 80V80z"/></svg>
                                        </>
                                    }
                                </span>
                            }
                        </div>
                        <div className='input-field d-flex justify-content-right'>
                            {pending ?
                                < PendingSpinner small={true}/>
                                    :
                                <button className='btn-outline-teal btn p-1'>
                                    <span>login</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path d="M560 448H512V113.5c0-27.25-21.5-49.5-48-49.5L352 64.01V128h96V512h112c8.875 0 16-7.125 16-15.1v-31.1C576 455.1 568.9 448 560 448zM280.3 1.007l-192 49.75C73.1 54.51 64 67.76 64 82.88V448H16c-8.875 0-16 7.125-16 15.1v31.1C0 504.9 7.125 512 16 512H320V33.13C320 11.63 300.5-4.243 280.3 1.007zM232 288c-13.25 0-24-14.37-24-31.1c0-17.62 10.75-31.1 24-31.1S256 238.4 256 256C256 273.6 245.3 288 232 288z"/></svg>
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
            <div className="d-flex justify-content-center font-md mt-2">
                New to Celesup?
                <span className='teal-text-lighten-2 pl-1 cursor-pointer text-hover-blue-lighten-3'
                    onClick={gotoRegisterRoute}>
                    Signup
                </span>
            </div>
        </>
    )
}

export default Login;