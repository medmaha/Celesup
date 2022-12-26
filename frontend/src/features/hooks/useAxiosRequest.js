import { useEffect, useState } from "react"
import { celesupApi } from "../axiosInstances"

const useAxiosRequest = () => {
    const [response, setResponse] = useState(null)
    const [pending, setPending] = useState(false)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState({})
    const [controller, setController] = useState()

    useEffect(() => {
        if (!controller) return
        options.signal = controller.signal
        return () => controller?.abort("request already made")
    }, [controller])

    async function sendAxiosRequest({
        url,
        method,
        form,
        options,
        axiosInstance = celesupApi,
    }) {
        setPending(true)
        setError(null)
        setController(new AbortController())

        options = { ...options, ...options }

        if (method.toLowerCase() === "get") {
            const data = await axiosInstance[method.toLowerCase()](url).then(
                (res) => {
                    setResponse(res.data)
                    setPending(false)
                },
                (error) => {
                    const errorMsg = error.message
                    setError(errorMsg)
                    setPending(false)
                },
            )
            return data
        }

        if (
            method.toLowerCase() === "post" ||
            method.toLowerCase() === "put" ||
            method.toLowerCase() === "delete"
        ) {
            const data = await axiosInstance[method.toLowerCase()](
                url,
                form,
                options,
            )
                .then(
                    (res) => {
                        setResponse(res.data)
                        setPending(false)
                        setError(false)
                    },
                    (error) => {
                        const errorMsg = error.message

                        setError(errorMsg)
                        setPending(false)
                    },
                )
                .catch((error) => {
                    setError(error)
                    setPending(false)
                })
            return data
        }
    }
    return [response, pending, error, sendAxiosRequest]
}

export default useAxiosRequest
