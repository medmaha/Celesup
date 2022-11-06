import { useState, useEffect, useContext, useRef } from "react"
import { GlobalContext } from "../../../../App"
import { CELESUP_BASE_URL } from "../../../../axiosInstances"
import { PostContext } from "./createPost"
import { TextAreaLarge } from "../../../../features/TextArea"

import ImageViewer from "./ImageViewer"
import HashtagField from "../../../../features/HashtagField"

const PostForm = () => {
    const { formData, updateFormData, submitForm } = useContext(PostContext)
    const [fileSelected, setFileSelected] = useState(false)
    const [addHashtag, setAddHashTag] = useState(false)
    const postData = useRef()
    const context = useContext(GlobalContext)

    useEffect(() => {
        if (localStorage.getItem("openFile")) {
            uploadFile()
            localStorage.removeItem("openFile")
            return
        } else {
            postData.current.children[0].focus()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!addHashtag) return
        postData.current.parentNode.scrollTo({ top: 100 })
    }, [addHashtag])

    function uploadFile() {
        const hiddenFileInput = document.createElement("input")
        hiddenFileInput.setAttribute("type", "file")
        hiddenFileInput.click()
        hiddenFileInput.addEventListener("change", ({ target }) => {
            if (target.files && target.files[0]) {
                const ev = {
                    target: { name: "picture", value: target.files[0] },
                }
                handleFormChange(ev)
                setFileSelected(true)
            }
        })
    }

    function handleFormChange({ target }) {
        updateFormData({
            ...formData,
            [target.name]: target.value,
            valid:
                formData.caption.length > 2 ||
                formData.excerpt.length > 2 ||
                formData.picture,
        })
    }

    function backToPostForm() {
        setFileSelected((prev) => !prev)
    }

    return (
        <div className="z-index-1-plus">
            {fileSelected ? (
                <ImageViewer backToPostForm={backToPostForm} />
            ) : (
                <span className="d-block height-100">
                    <div className="header  px-1 pos-relative pb-__">
                        <h3 className="center">Create A Post</h3>
                        <div
                            onClick={() => context.setFocusState(null)}
                            className="br-full p-__ pos-absolute right-5-px top-0"
                        >
                            <span className="icon-wrapper cursor-pointer on-text-hover-red">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <span
                        className="divider"
                        style={{ backgroundColor: "grey" }}
                    ></span>

                    <div className="post__form__body">
                        <div className="author pt-1 d-flex align-items-center px-1">
                            <div className="profile-img width-4-rem height-4-rem">
                                <img
                                    src={CELESUP_BASE_URL + context.user.avatar}
                                    alt=""
                                />
                            </div>
                            <div className="pl-__ d-flex flex-column">
                                <div
                                    className="pb-__"
                                    style={{ marginBottom: "2px" }}
                                >
                                    {context.user?.full_name ? (
                                        <span>{context.user.full_name}</span>
                                    ) : (
                                        <span>@{context.user.username}</span>
                                    )}
                                </div>
                                <div className="d-flex align-items-center justify-content-between width-100  bg-color br-sm p-__ px-1">
                                    <span className="font-sm">Public</span>
                                    <svg
                                        className="width-10-px height-10-px"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 384 512"
                                    >
                                        <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div
                            ref={postData}
                            className="px-1 d-flex flex-column gap-1-rem"
                        >
                            <span>
                                <input
                                    type="text"
                                    name="caption"
                                    autoComplete="off"
                                    spellCheck={false}
                                    aria-label="Post Caption"
                                    placeholder={`What's on your mind, ${
                                        context.user.first_name
                                            ? context.user.first_name
                                            : context.user.username
                                    }?`}
                                    onChange={handleFormChange}
                                />
                            </span>

                            <span>
                                <TextAreaLarge
                                    name="excerpt"
                                    placeholder="Add a Description"
                                    row={6}
                                    onChange={handleFormChange}
                                />
                            </span>
                            <span>
                                <button
                                    className="btn blue br-lg"
                                    onClick={() =>
                                        setAddHashTag((prev) => !prev)
                                    }
                                >
                                    {!addHashtag ? (
                                        "Add hashtags"
                                    ) : (
                                        <>
                                            {formData.hashtags?.split(",")
                                                .length > 1
                                                ? "Hashtags"
                                                : "Hashtag"}
                                        </>
                                    )}
                                </button>
                            </span>

                            <span>
                                {addHashtag && (
                                    <HashtagField
                                        name="hashtags"
                                        placeholder="Add hashtags! separated by comma"
                                        onChange={handleFormChange}
                                    />
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="pos-absolute d-flex justify-content-center  flex-column bottom-8-px left-0 height-4-rem width-100">
                        <span
                            className="divider"
                            style={{ backgroundColor: "grey" }}
                        ></span>
                        <div className="d-flex justify-content-between align-items-center height-100 mx-1">
                            <div className="d-flex justify-content-center align-items-start">
                                <span
                                    className="icon-wrapper cursor-pointer"
                                    title="Image"
                                    onClick={uploadFile}
                                >
                                    <svg
                                        className="_blue-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M447.1 32h-384C28.64 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM111.1 96c26.51 0 48 21.49 48 48S138.5 192 111.1 192s-48-21.49-48-48S85.48 96 111.1 96zM446.1 407.6C443.3 412.8 437.9 416 432 416H82.01c-6.021 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.334-16.68l70-96C142.1 290.4 146.9 288 152 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C293.7 194.7 298.7 192 304 192s10.35 2.672 13.31 7.125l128 192C448.6 396 448.9 402.3 446.1 407.6z" />
                                    </svg>
                                </span>
                                <span
                                    className="icon-wrapper cursor-pointer ml-__"
                                    title="Video"
                                >
                                    <svg
                                        className="_green-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path d="M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z" />
                                    </svg>
                                </span>
                                <span
                                    className="icon-wrapper cursor-pointer ml-__"
                                    title="Events"
                                >
                                    <svg
                                        className="_orange-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path d="M160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32zM0 192H448V464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192zM64 304C64 312.8 71.16 320 80 320H112C120.8 320 128 312.8 128 304V272C128 263.2 120.8 256 112 256H80C71.16 256 64 263.2 64 272V304zM192 304C192 312.8 199.2 320 208 320H240C248.8 320 256 312.8 256 304V272C256 263.2 248.8 256 240 256H208C199.2 256 192 263.2 192 272V304zM336 256C327.2 256 320 263.2 320 272V304C320 312.8 327.2 320 336 320H368C376.8 320 384 312.8 384 304V272C384 263.2 376.8 256 368 256H336zM64 432C64 440.8 71.16 448 80 448H112C120.8 448 128 440.8 128 432V400C128 391.2 120.8 384 112 384H80C71.16 384 64 391.2 64 400V432zM208 384C199.2 384 192 391.2 192 400V432C192 440.8 199.2 448 208 448H240C248.8 448 256 440.8 256 432V400C256 391.2 248.8 384 240 384H208zM320 432C320 440.8 327.2 448 336 448H368C376.8 448 384 440.8 384 432V400C384 391.2 376.8 384 368 384H336C327.2 384 320 391.2 320 400V432z" />
                                    </svg>
                                </span>
                                <span
                                    className="icon-wrapper cursor-pointer ml-__"
                                    title="Article"
                                >
                                    <svg
                                        className="_red-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M0 32C0 14.33 14.33 0 32 0H160C177.7 0 192 14.33 192 32V416C192 469 149 512 96 512C42.98 512 0 469 0 416V32zM128 64H64V128H128V64zM64 256H128V192H64V256zM96 440C109.3 440 120 429.3 120 416C120 402.7 109.3 392 96 392C82.75 392 72 402.7 72 416C72 429.3 82.75 440 96 440zM224 416V154L299.4 78.63C311.9 66.13 332.2 66.13 344.7 78.63L435.2 169.1C447.7 181.6 447.7 201.9 435.2 214.4L223.6 425.9C223.9 422.7 224 419.3 224 416V416zM374.8 320H480C497.7 320 512 334.3 512 352V480C512 497.7 497.7 512 480 512H182.8L374.8 320z" />
                                    </svg>
                                </span>
                                <div className="ml-1">
                                    <span>Attach a file</span>
                                </div>
                            </div>

                            <button
                                className={`theme-primary px-2 py-__ br-lg opacity-2 ${
                                    !formData.valid ? "disabled" : ""
                                }`}
                                onClick={submitForm}
                            >
                                Publish
                            </button>
                        </div>
                    </div>
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
                </span>
            )}
        </div>
    )
}

export default PostForm
