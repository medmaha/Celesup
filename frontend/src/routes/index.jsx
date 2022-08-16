import { useEffect } from 'react'
import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {GlobalContext} from '../App'

const Index = () => {
  const navigate = useNavigate()
  const {user, tokens} = useContext(GlobalContext)

  useEffect(()=>{
    if (!user || !tokens) return
    navigate('/'+user.username)
  },[user, tokens, navigate])
  return (
    <div>
      Welcome to celesup
    </div>
  )
}

export default Index;
