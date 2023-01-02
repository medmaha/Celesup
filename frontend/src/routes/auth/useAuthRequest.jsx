import { useState, useEffect } from "react"
import { celesupAuthApi } from "../../axiosInstances"

function useAuthRequest() {
    const [data, setData] = useState(null)
    const [pending, setPending] = useState(false)
    const [error, setError] = useState(null)

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
                (err) => {
                    setError(err.response?.data?.message || err.message)
                },
            )
            .catch((err) =>
                setError(err.response?.data?.message || err.message),
            )
            .finally(setPending(false))
    }

    return [data, pending, error, sendAuthRequest, setError]
}

export default useAuthRequest
