import { useState, useEffect } from "react"
import { celesupAuthApi } from "../../axiosInstances"

function useAuthRequest() {
    const [data, setData] = useState(null)
    const [pending, setPending] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!error) return
        const timeout = setTimeout(() => {
            setError(null)
        }, 5000)
        return () => clearTimeout(timeout)
    }, [error])

    function sendAuthRequest({ url, form, options = {} }) {
        setPending(true)
        celesupAuthApi
            .post(url, form, options)

            .then(
                (res) => {
                    setData(res.data)
                },
                (error) => {
                    let errorMsg = {
                        message: "An error occurred",
                    }

                    if (error.code === "ERR_NETWORK") {
                        errorMsg.message = "Unable to connect to celesup server"
                    } else if (error.code === "ERR_BAD_REQUEST") {
                        errorMsg = error.response.data
                    }
                    setError(errorMsg)
                },
            )
            .finally(setPending(false))
    }

    return [data, pending, error, sendAuthRequest, setError]
}

export default useAuthRequest
