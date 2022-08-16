import'./styles.css';
import { useState, useEffect, createContext, useContext, useRef} from 'react'
import { celesupApi } from '../../../../axiosInstances'
import { GlobalContext } from '../../../../App';
import PostForm from './postForm'; 
import useAxiosRequest from '../../../../hooks/useAxiosRequest';

export const PostContext = createContext({})

const CreateNewPost = ({fetchPost: reFetchPosts}) => {
	const context = useContext(GlobalContext)
	const [data, pending, error, sendAxiosRequest] = useAxiosRequest()
	const [formData, updateFormData] = useState({caption: '', excerpt: '', hashtags: '', picture: null })
	const createPostContainer = useRef()

	
	function closePostWindow({currentTarget, target}){
		if (currentTarget === target)
		context.setFocusState(null)
	}

	useEffect(()=>{
		const modalWrapper = createPostContainer.current
		modalWrapper.addEventListener('click', closePostWindow)
		return ()=> modalWrapper.removeEventListener('click', closePostWindow)
		
		// eslint-disable-next-line
	},[])
	
	useEffect(()=> {
		if (!data) return
		context.setFocusState(null)
		reFetchPosts()
		// eslint-disable-next-line
	},[data])

	async function submitForm() {		
		if (formData.caption === '' && formData.picture === null) return

		const form = new FormData()
		form.append("caption", formData.caption)
		// form.append("excerpt", formData.excerpt)
		form.append("hashtags", formData.hashtags)
		form.append("picture", formData.picture)

		sendAxiosRequest({
			axiosInstance: celesupApi,
			url: '/posts/create',
			method: 'POST',
			form: form,
			options: {headers: {'Content-Type': 'multipart/form-data'}}
		})
	}

	return (
		<div ref={createPostContainer} className="create__post__container">
			{/* <h1>Render ME</h1> */}
			<div className="post__modal mt-4 mx-__">
				<PostContext.Provider value={{formData, updateFormData, submitForm, pending, error}}>
					<PostForm />
				</PostContext.Provider>
			</div>
		</div>
	)
}

export default CreateNewPost
