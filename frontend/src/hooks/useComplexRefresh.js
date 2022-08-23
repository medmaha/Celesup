import { useState } from 'react'

const useComplexAxiosRequests = () => {
	const [response, setResponse] = useState(null)
	const [pending, setPending] = useState(false)
	const [error, setError] = useState(null)

	async function sendAxiosRequest({
		axiosInstance,
		url,
		method,
		form,
		options = {},
		subsequentRequests = { arguments: [], func: null },
	}) {
		setPending(true)
		if (method.toLowerCase() === 'get') {
			axiosInstance[method.toLowerCase()](url).then(
				(res) => {
					setResponse(res.data)
					setPending(false)

					if (res.status >= 200 && subsequentRequests.arguments?.length > 0) {
						subsequentRequests.func(...subsequentRequests.arguments)
					}
				},
				(error) => {
					const errorMsg =
						error.response.data?.detail ||
						error.response.data?.email ||
						error.response.data?.avatar ||
						error.message
					setError(errorMsg)
					setPending(false)
				},
			)
		} else if (
			method.toLowerCase() === 'post' ||
			method.toLowerCase() === 'put' ||
			method.toLowerCase() === 'delete'
		) {
			axiosInstance[method.toLowerCase()](url, form, options).then(
				(res) => {
					setResponse(res.data)
					setPending(false)

					if (res.status >= 200 && subsequentRequests.arguments?.length > 0) {
						subsequentRequests.func(...subsequentRequests.arguments)
					}
				},
				(error) => {
					const errorMsg =
						error.response.data?.detail ||
						error.response.data?.email ||
						error.response.data?.avatar ||
						error.message
					setError(errorMsg)
					setPending(false)
				},
			)
		}
	}

	return [response, pending, error, sendAxiosRequest]
}

export default useComplexAxiosRequests
