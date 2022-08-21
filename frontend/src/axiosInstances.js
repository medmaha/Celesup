import axios from 'axios'
import jwtDecode from 'jwt-decode'
import dayjs from 'dayjs'

const baseURL = 'http://localhost:8000'

export const CELESUP_BASE_URL = baseURL


export const celesupApi = axios.create({
    baseURL: baseURL,
    headers: {
        'Authorization': 'Celesup '+ localStorage.getItem('access')?.toString() || 'access not available',
        'Content-type': 'application/json',
    }
})


celesupApi.interceptors.request.use((config)=>{
    const accessToken = localStorage.getItem('access')
    const refreshToken = localStorage.getItem('refresh')

    if (accessToken && refreshToken){
        const decodedAccessToken = jwtDecode(accessToken)
        const authTokenIsExpired = dayjs.unix(decodedAccessToken.exp).diff(dayjs(), 'seconds') < 1

        if (authTokenIsExpired){
            return refreshAuthTokens(config, refreshToken)
        }
    }


    config.headers['Authorization'] = 'Celesup ' +accessToken
    return config
})


celesupApi.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    if (error.response.status === 401){ 
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
    }
    return Promise.reject(error);
});

const refreshAuthTokens = (config, refreshToken)=>{
    axios.post(baseURL+'/refresh/user/tokens', {
        refresh: refreshToken
        },{'Content-Type': 'application/json'}
        )
        .then((resp)=>{
            let data = resp.data
            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh', data.refresh)
            config.headers['Authorization'] = 'Celesup '+data.access
        },(err)=>{
            if (err.response?.code >= 401){
                localStorage.removeItem('refresh')
                localStorage.removeItem('access')
            }
        })
    return config
}
