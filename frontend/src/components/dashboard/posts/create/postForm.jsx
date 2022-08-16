import { useState, useEffect, useContext, useRef} from 'react';
import { GlobalContext } from '../../../../App';
import { PostContext } from './createPost'

import ImageViewer from './ImageViewer';

const PostForm = () => {
	
    const {formData, updateFormData, submitForm } = useContext(PostContext)
	const [fileSelected, setFileSelected] = useState(false)
    const postModal = useRef()
    const postExcerpt = useRef()
    const hiddenFileInput = useRef()
    const context = useContext(GlobalContext)

    useEffect(()=>{
        if (localStorage.getItem('openFile')){
            uploadFile()
            localStorage.removeItem('openFile')
            return
        }
        else{
            postExcerpt.current.children[0].focus()
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
	function uploadFile (){
		hiddenFileInput.current.click()
		hiddenFileInput.current.addEventListener('change', ({target})=>{
            if (target.files && target.files[0]){
                updateFormData({
                    ...formData,
                    picture: target.files[0],
                })
                setFileSelected(true)
            }
		})
	}

    function handleFormChange({target}) {
        updateFormData({
            ...formData,
			[target.name] :target.value
		})
	}

    function backToPostForm() {
        setFileSelected(prev=>!prev)
    }

    return (
       <div ref={postModal} className="d-flex justify-content-center pos-relative height-100 width-100">
            {fileSelected ? 
                <ImageViewer formData={formData} updateFormData={updateFormData} backToPostForm={backToPostForm} submitForm={submitForm}/> 
                    : 
                <div className="card br-md p-0">
                    <div className="header border-bottom-1 p-1 pos-relative">
                        <h4 className='text-center py-__'>Create A Post</h4>
                        <div onClick={()=>context.setFocusState(null)} className="br-full p-__ inverse-bg-color pos-absolute hover-grey" style={{right: '10px', top: '15px'}}>
                            <span className="icon-wrapper cursor-pointer">
                                <svg className='' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                            </span>
                        </div>
                    </div>

                    <div className="author pt-1 d-flex align-items-center px-1">
                        <div className="profile-img width-4-rem height-4-rem">
                            <img src={context.user.avatar} alt="" />
                        </div>
                        <div className="pl-1 d-flex flex-column">
                            <div className='' style={{marginBottom: '2px'}}>
                                {context.user?.full_name ? 
                                    <span>{context.user.full_name}</span>
                                        :
                                    <span>@{context.user.username}</span>
                                }
                            </div>
                            <div className="d-flex align-items-center justify-content-between width-100 box-shadow bg-color br-sm p-__ px-1">
                                <span className="font-sm">
                                    Public
                                </span>
                                <svg  className='width-10-px height-10-px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div ref={postExcerpt} className="input-field px-1">
                        <textarea rows={5} name='caption' onChange={handleFormChange}
                            placeholder={`What's on your mind, ${context.user.first_name? context.user.first_name : context.user.username}?`}
                            autoComplete='Off'>
                        </textarea>
                    </div>

                    {/* <div className="input-field px-1">
                        <input value={formData.hashtags} type="text" onChange={handleFormChange} name="hashtags" className='br-md' placeholder="Add hashtags..." autoComplete='Off'/>
                    </div> */}

                    {/* <div className="mx-1 inverse-bg-color hover-dimgrey br-sm" title='Add Photo or Video'>
                        <input ref={hiddenFileInput} type="file" accept='image/*' hidden/>

                        <span onClick={uploadFile} className="cursor-pointer py-1 d-flex justify-content-center align-items-center">
                            <span className='icon-wrapper'>
                                <svg className='black-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path d="M512 32H160c-35.35 0-64 28.65-64 64v224c0 35.35 28.65 64 64 64H512c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM528 320c0 8.822-7.178 16-16 16h-16l-109.3-160.9C383.7 170.7 378.7 168 373.3 168c-5.352 0-10.35 2.672-13.31 7.125l-62.74 94.11L274.9 238.6C271.9 234.4 267.1 232 262 232c-5.109 0-9.914 2.441-12.93 6.574L176 336H160c-8.822 0-16-7.178-16-16V96c0-8.822 7.178-16 16-16H512c8.822 0 16 7.178 16 16V320zM224 112c-17.67 0-32 14.33-32 32s14.33 32 32 32c17.68 0 32-14.33 32-32S241.7 112 224 112zM456 480H120C53.83 480 0 426.2 0 360v-240C0 106.8 10.75 96 24 96S48 106.8 48 120v240c0 39.7 32.3 72 72 72h336c13.25 0 24 10.75 24 24S469.3 480 456 480z"/></svg>
                            </span>
                            <span className='mx-1 black-text' >/</span>
                            <span className='icon-wrapper'>
                                <svg className='black-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path d="M384 112v288c0 26.51-21.49 48-48 48h-288c-26.51 0-48-21.49-48-48v-288c0-26.51 21.49-48 48-48h288C362.5 64 384 85.49 384 112zM576 127.5v256.9c0 25.5-29.17 40.39-50.39 25.79L416 334.7V177.3l109.6-75.56C546.9 87.13 576 102.1 576 127.5z"/></svg>
                            </span>
                        </span>
                    </div> */}

                    {/* Submit Button */}
                    {formData.caption && formData.caption.length > 3 &&
                        <div className="px-1 d-flex justify-content-right mt-3">
                            <span onClick={submitForm} className="btn btn-outline-teal">Post </span>
                        </div>
                    }
                </div>
            }
		</div>
    )
}

export default PostForm
