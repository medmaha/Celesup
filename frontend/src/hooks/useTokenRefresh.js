import axios from "axios";
import { useEffect, useState } from "react";
import { CELESUP_BASE_URL } from "../axiosInstances";



const useTokenRefresh = () => {
    const [tokens, setTokens] = useState()
    const controller = new AbortController()

    useEffect(()=>{
        if (!tokens) return 
        console.log(tokens);
        return(()=>{
            controller.abort()
        })
        // eslint-disable-next-line
    },[tokens])

    async function refreshUserTokens(){
        const config = {headers: {'Content-Type': 'application/json'}, signal: controller.signal}
        const form = new FormData()
        form.append('refresh', localStorage.getItem('refresh'))

        axios.post(CELESUP_BASE_URL+'/refresh/user/tokens', form, config)

        .then(res=>{
            setTokens(res.data)
        })
        return tokens
    }
    return {newTokens: tokens, refreshUserTokens}
}


export default useTokenRefresh


