import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import {GlobalContext} from '../../App'

const NavbarDropdown = () => {
    const navigate = useNavigate()
    const context = useContext(GlobalContext)

    function toggleTheme() {
        let theme = localStorage.getItem('theme')
        if (!theme) return
        if (theme === 'light-mode'){
            document.body.classList.toggle('light-mode')
            document.body.classList.toggle('dark-mode')
            localStorage.setItem('theme', 'dark-mode')
            return
        }
        document.body.classList.toggle('dark-mode')
        document.body.classList.toggle('light-mode')
        localStorage.setItem('theme', 'light-mode')
    }

    function userAccount(){
        localStorage.setItem('pvpk', context.user.id)
        navigate('/profile/'+context.user.username)
    }
    
    function logoutUser() {
        const theme = localStorage.getItem('theme')
        localStorage.clear()
        localStorage.setItem('theme', theme)

        context.updateTokens(null)
        navigate('/')
    }
    function dropDownDecorator(func) {
        func()
        context.setFocusState({
            ...context.state,
            dropDown: false
        })
    }
  return (
    <div className='navbar-dropdown box-shadow bg-color z-1'>
        <ul className='text-color d-flex flex-column align-items-end'>
            <li className='m-1 mt-0 mb-0 p-1'  onClick={()=>dropDownDecorator(userAccount)}>Profile</li>
            <li className='m-1 mb-0 p-1' onClick={()=>dropDownDecorator(toggleTheme)}>Settings</li>                                       
            <li className='m-1 mb-0 p-1' onClick={()=>dropDownDecorator(logoutUser)}>Logout</li>
            <li className='m-1 mb-0 p-1'>Help</li>
        </ul>
    </div>
  )
}

export default NavbarDropdown
