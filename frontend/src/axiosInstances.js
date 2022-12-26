import axios from "axios"
import jwtDecode from "jwt-decode"
import dayjs from "dayjs"
import { UseCookie } from "./hooks/useCookie"

// TODO

let baseURL = "http://127.0.0.1:8000"

export const CELESUP_BASE_URL = baseURL

// baseURL = "https//mahamedtoure.pythonanywhere.com"

// if (!baseURL) {
// }
const cookies = UseCookie()

export const celesupApi = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization:
            "Celesup " + localStorage.getItem("ata")?.toString() ||
            "access not available",
        // 'Content-type': 'application/json',
    },
})

celesupApi.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem("ata")
    const refreshToken = localStorage.getItem("atr")

    const controller = new AbortController()

    config.signal = controller.signal
    config.headers["Authorization"] = "Celesup " + accessToken

    if (accessToken && refreshToken) {
        const decodedAccessToken = jwtDecode(accessToken)
        const authTokenIsExpired =
            dayjs.unix(decodedAccessToken.exp).diff(dayjs(), "seconds") < 1

        if (authTokenIsExpired) {
            const data = await refreshAuthTokens()
            if (data.access) {
                config.headers["Authorization"] = "Celesup " + data.access
                localStorage.setItem("ata", data.access)
                localStorage.setItem("atr", data.refresh)
            }
        }
    } else {
        controller.abort("unauthorized for the request")
    }

    return config
})

celesupApi.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
    },
    function (error) {
        if (error.response?.status === 401) {
            clearTokenCached()
        }
        return Promise.reject(error)
    },
)

export async function refreshAuthTokens() {
    /**
     * * Request a refresh token and return back a promise of tokens
     */

    const access = localStorage.getItem("ata")
    const refresh = localStorage.getItem("atr")

    if (!access || !refresh) return new Promise.resolve()

    const user = jwtDecode(access).data
    const uri = CELESUP_BASE_URL + "/refresh/user/tokens"
    const form = { refresh: refresh, user_id: user.id }
    const config = { "Content-Type": "application/json" }

    return new Promise((resolve, reject) => {
        axios
            .post(uri, form, config)
            .then(
                (res) => {
                    return resolve(res.data)
                },
                (error) => {
                    if (error.response?.status === 401) {
                        clearTokenCached()
                    }
                    return reject(error.message || "")
                },
            )
            .catch((err) => {
                return reject(err.message || "")
            })
    })
}
function clearTokenCached() {
    localStorage.removeItem("ata")
    localStorage.removeItem("atr")

    if (window.location.href === "/") {
        window.location.reload()
    } else {
        window.location.href = "/"
    }
}

/** 
/*
    ? a Separate axios instance for user authentication state,
    ? so it would share any interceptors
*/

export const celesupAuthApi = axios.create({
    baseURL: CELESUP_BASE_URL,
    // withCredentials: true,
    // headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     Cookie: "acid=" + cookies.get("acid"),
    // },
})

celesupAuthApi.interceptors.request.use((config) => {
    const cookieID = cookies.get("acid")

    if (cookieID) {
        config.headers["Authorization"] = `Celesup ${cookieID}`
    }
    return config
})

celesupAuthApi.interceptors.response.use(
    (response) => {
        // console.log(response.status)
        return Promise.resolve(response)
    },
    (error) => {
        let msg = "Connection Error"
        if (error.code === "ERR_NETWORK") {
            msg = "Unable to connect to the Celesup server"
            // return { message: msg }
            error.message = msg
        }
        return Promise.reject(error)
    },
)
