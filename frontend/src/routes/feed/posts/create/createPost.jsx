import './styles.css'
import { useState, useEffect, createContext, useContext, useRef } from 'react'
import { celesupApi } from '../../../../axiosInstances'
import { GlobalContext } from '../../../../App'
import PostForm from './postForm'
import useAxiosRequest from '../../../../hooks/useAxiosRequest'

export const PostContext = createContext({})

function CreateNewPost() {
	const context = useContext(GlobalContext)
	const [data, pending, error, sendAxiosRequest] = useAxiosRequest()
	const [formData, updateFormData] = useState({ caption: '', excerpt: '', hashtags: '', picture: '' })
	const createPostContainer = useRef()

	function closePostWindow({ currentTarget, target }) {
		// TODO
		if (currentTarget === target) context.setFocusState(null)
	}

	useEffect(() => {
		const modalWrapper = createPostContainer.current
		modalWrapper.addEventListener('click', closePostWindow)
		return () => modalWrapper.removeEventListener('click', closePostWindow)

		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (!data) return
		context.state.reFetchPosts()
		context.setFocusState(null)
		// reFetchPosts()
		// eslint-disable-next-line
	}, [data])

	async function submitForm() {
		if (formData.caption === '' && formData.picture === null && formData.excerpt === '') return

		const form = new FormData()

		form.append('caption', formData.caption)
		form.append('excerpt', formData.excerpt)
		form.append('hashtags', formData.hashtags)
		form.append('picture', formData.picture)

		await sendAxiosRequest({
			axiosInstance: celesupApi,
			url: '/posts/create',
			method: 'POST',
			form: form,
			options: { headers: { 'Content-Type': 'multipart/form-data' } },
		})
		// if (!formData.valid) return

		// const form = new FormData()

		// form.append('caption', formData.caption)
		// form.append('excerpt', formData.excerpt)
		// form.append('hashtags', formData.hashtags)
		// form.append('picture', formData.picture)

		// if (formData.picture) {
		// 	form.append('picture', formData.picture, formData.picture.name)
		// }

		// sendAxiosRequest({
		// 	axiosInstance: celesupApi,
		// 	url: '/posts/create',
		// 	method: 'POST',
		// 	form: form,
		// 	options: {
		// 		headers: { 'Content-Type': 'Application/json' },
		// 	},
		// })

		// if (!formData.picture) {
		// 	const postDataJson = {
		// 		caption: formData.caption,
		// 		excerpt: formData.excerpt,
		// 		hashtags: formData.hashtags,
		// 	}
		// 	sendAxiosRequest({
		// 		axiosInstance: celesupApi,
		// 		url: '/posts/create',
		// 		method: 'POST',
		// 		form: JSON.stringify(postDataJson),
		// 		options: { headers: { 'Content-Type': 'application/json' } },
		// 	})
		// 	return 0
		// } else if (formData.picture) {
		// 	const postDataMultiPart = {
		// 		picture: formData.picture,
		// 	}
		// 	sendAxiosRequest({
		// 		axiosInstance: celesupApi,
		// 		url: '/posts/create',
		// 		method: 'POST',
		// 		form: JSON.stringify(postDataMultiPart),
		// 		options: { headers: { 'Content-Type': 'application/json' } },
		// 	})
		// }
	}

	return (
		<div ref={createPostContainer} className='create__post__container pt-1'>
			-{/* <h1>Render ME</h1> */}
			<div className='post__modal mx-__ card p-0 pos-relative'>
				<PostContext.Provider value={{ formData, updateFormData, submitForm, pending, error }}>
					<PostForm />
				</PostContext.Provider>
			</div>
		</div>
	)
}

export default CreateNewPost
