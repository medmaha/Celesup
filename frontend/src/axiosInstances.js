import axios from "axios"
import jwtDecode from "jwt-decode"
import dayjs from "dayjs"

let baseURL = "http://mahamedtoure.pythonanywhere.com"

// baseURL = "https//mahamedtoure.pythonanywhere.com"

// if (!baseURL) {
// }

export async function refreshAuthTokens(updateTokens) {
    " function is called on the UI backend"

    const form = new FormData()
    form.append("refresh", localStorage.getItem("refresh"))

    const options = {
        headers: { "Content-Type": "application/json" },
    }

    const data = await axios
        .post(CELESUP_BASE_URL + "/refresh/user/tokens", form, options)
        .then(
            (res) => {
                localStorage.setItem("access", res.data.access)
                localStorage.setItem("refresh", res.data.refresh)

                updateTokens((prev) => {
                    return {
                        ...prev,
                        access: res.data.access,
                        refresh: res.data.refresh,
                    }
                })
            },
            (error) => {
                console.log(error)
            },
        )
    return data
}

export const celesupAuthApi = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization:
            "Celesup " + localStorage.getItem("access")?.toString() ||
            "access not available",
        // 'Content-type': 'application/json',
    },
})

export const celesupApi = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization:
            "Celesup " + localStorage.getItem("access")?.toString() ||
            "access not available",
        // 'Content-type': 'application/json',
    },
})

celesupApi.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("access")
    const refreshToken = localStorage.getItem("refresh")

    const controller = new AbortController()

    config.signal = controller.signal

    if (accessToken && refreshToken) {
        const decodedAccessToken = jwtDecode(accessToken)
        const authTokenIsExpired =
            dayjs.unix(decodedAccessToken.exp).diff(dayjs(), "seconds") < 1

        if (authTokenIsExpired) {
            return refreshRequestToken(config, refreshToken)
        }
    } else {
        controller.abort("not authorized for this request")
    }

    config.headers["Authorization"] = "Celesup " + accessToken
    return config
})

celesupApi.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
    },
    function (error) {
        if (error.response.status === 401) {
            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
        }
        return Promise.reject(error)
    },
)

function refreshRequestToken(config, refreshToken) {
    axios
        .post(
            baseURL + "/refresh/user/tokens",
            {
                refresh: refreshToken,
            },
            { "Content-Type": "application/json" },
        )
        .then(
            (resp) => {
                let data = resp.data
                localStorage.setItem("access", data.access)
                localStorage.setItem("refresh", data.refresh)
                config.headers["Authorization"] = "Celesup " + data.access
            },
            (err) => {
                if (err.response?.code >= 401) {
                    localStorage.removeItem("refresh")
                    localStorage.removeItem("access")
                }
            },
        )
    return config
}

export const CELESUP_BASE_URL = baseURL
