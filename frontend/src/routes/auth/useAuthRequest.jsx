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
                    const errorMsg =
                        error.response.data?.detail ||
                        error.response.data?.email ||
                        error.response.data?.avatar ||
                        error.message
                    setError(errorMsg)
                },
            )
            .finally(setPending(false))
    }

    return [data, pending, error, sendAuthRequest, setError]
}

export default useAuthRequest
