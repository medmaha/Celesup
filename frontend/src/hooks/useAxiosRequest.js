import { useState } from 'react'

const useAxiosRequest = () => {
	const [response, setResponse] = useState(null)
	const [pending, setPending] = useState(false)
	const [error, setError] = useState(null)

	async function sendAxiosRequest({ axiosInstance, url, method, form, options }) {
		setPending(true)
		setError(null)
		if (method.toLowerCase() === 'get') {
			const data = await axiosInstance[method.toLowerCase()](url).then(
				(res) => {
					setResponse(res.data)
					setPending(false)
				},
				(error) => {
					const errorMsg = error.response.data?.detail || error.response.data?.email || error.response.data?.avatar || error.message
					setError(errorMsg)
					setPending(false)
				},
			)
			return data
		}

		if (method.toLowerCase() === 'post' || method.toLowerCase() === 'put' || method.toLowerCase() === 'delete') {
			const data = await axiosInstance[method.toLowerCase()](url, form, options).then(
				(res) => {
					setResponse(res.data)
					setPending(false)
				},
				(error) => {
					const errorMsg = error.response.data?.detail || error.response.data?.email || error.response.data?.avatar || error.message
					setError(errorMsg)
					setPending(false)
				},
			)
			return data
		}
	}
	return [response, pending, error, sendAxiosRequest]
}

export default useAxiosRequest
