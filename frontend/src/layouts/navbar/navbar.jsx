import'./styles.css'
import { useContext, useState, useEffect, useRef} from "react"
import { Link, useNavigate } from "react-router-dom"

import { GlobalContext } from "../../App"
import NavbarDropdown from "./navbarDropdown"


const Navbar = () => {
    const navbar = useRef()
    const [isDropDown, setDropDown] = useState(false)
    const [createPost, seCreatePost] = useState(false)

    const navigate = useNavigate()
    const context = useContext(GlobalContext)

    context['setDropDown'] = setDropDown

    useEffect(()=>{
        if (!isDropDown) return
        navbar.current.classList.add('active')
    },[isDropDown])

    useEffect(()=>{
        if (!context.state?.createPost){
            seCreatePost(false)
        }
    },[context.state])



    function home({brand, homepage}) {
        if (brand){
            if (context.user){
                context.setFocusState(null)
                navigate(`/${context.user.username}`)
                return
            }
            window.location.reload()
        }
        if (homepage){
            if (!context.user) return
            context.setFocusState(null)
            navigate(`/${context.user.username}`)
        }
        window.scrollTo({top:0})
    }

    function explore(user) {
        navigate('/'+user.username+'/explore', {state:{user}})
    }

    function post(create) {
        seCreatePost(prev=>!prev)
        context.setFocusState({
            ...context.state,
            createPost: !create
        })
    }

    function dropdown(drop) {
        setDropDown(prev=>!prev)
        context.setFocusState({
            ...context.state,
            dropDown: !drop
        })
    }

    return (
        <nav ref={navbar} className="pos-sticky top-0 z-1-plus">
            <div className="container pos-relative">
                <h1 onClick={()=>home({brand:true})} className="brand">Celesup</h1>
                <form className="search-bar">
                    <input type="search" placeholder="Search Celesup" className="br-md"/>
                </form>
                { context.user ?
                <>
                    <ul className="nav-links ">
                        <li className="link" onClick={()=>home({homepage:true})}>
                            <svg className='' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z"/></svg>
                        </li>
                        <li className="link" onClick={()=>explore(context.user)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M306.7 325.1L162.4 380.6C142.1 388.1 123.9 369 131.4 349.6L186.9 205.3C190.1 196.8 196.8 190.1 205.3 186.9L349.6 131.4C369 123.9 388.1 142.1 380.6 162.4L325.1 306.7C321.9 315.2 315.2 321.9 306.7 325.1V325.1zM255.1 224C238.3 224 223.1 238.3 223.1 256C223.1 273.7 238.3 288 255.1 288C273.7 288 288 273.7 288 256C288 238.3 273.7 224 255.1 224V224zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>
                        </li>
                        <li className="link" onClick={()=>post(createPost)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M200 344V280H136C122.7 280 112 269.3 112 256C112 242.7 122.7 232 136 232H200V168C200 154.7 210.7 144 224 144C237.3 144 248 154.7 248 168V232H312C325.3 232 336 242.7 336 256C336 269.3 325.3 280 312 280H248V344C248 357.3 237.3 368 224 368C210.7 368 200 357.3 200 344zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z"/></svg>
                        </li>
                        <li className="link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z"/></svg>
                        </li>
                        <li className="link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 49.63 21.35 94.98 56.97 130.7c-12.5 50.37-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734C1.979 478.2 4.75 480 8 480c66.25 0 115.1-31.76 140.6-51.39C181.2 440.9 217.6 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32z"/></svg>
                        </li>
                    </ul>
                    <div className="nav-profile" onClick={()=>dropdown(isDropDown)}>
                        <img className='' src={`${context.user.avatar}`} alt="" />
                    </div>
                    {context.state?.dropDown ? < NavbarDropdown/> : ''}
                    

                </>
                    :
                <>
                    <ul className="nav-links">
                        <Link to='/login' className="link">
                            Signin
                        </Link>
                        <Link to='/signup' className="link">
                            Signup
                        </Link>
                    </ul>
                </>
                }
                
            </div>
        </nav>
    )
}

export default Navbar
