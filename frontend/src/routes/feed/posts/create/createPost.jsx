import "./styles.css"
import { useState, useEffect, createContext, useContext, useRef } from "react"
import { celesupApi, CELESUP_BASE_URL } from "../../../../axiosInstances"
import { GlobalContext } from "../../../../App"
import PostForm from "./postForm"
import useAxiosRequest from "../../../../hooks/useAxiosRequest"
import Modal from "../../../../features/Modal"
import ImageViewer from "./ImageViewer"
import VideoFileViewer from "./VideoFileViewer"
import PostPreview from "./postPreview"

export const PostContext = createContext({})

function CreateNewPost() {
    const context = useContext(GlobalContext)
    // const [data, pending, error, sendAxiosRequest] = useAxiosRequest()
    const [formData, updateFormData] = useState({})
    const [previewPost, setPreviewPost] = useState(false)
    const [data, setData] = useState(null)
    const [pending, setPending] = useState(false)
    const [error, setError] = useState(undefined)

    useEffect(() => {
        if (!error) return

        const timeout = setTimeout(() => setError(undefined), 5000)

        return () => clearTimeout(timeout)
    }, [error])

    useEffect(() => {
        if (!data) return

        if (!context.state.reFetchPosts()) {
            if (window.location.href === "/") {
                window.location.reload()
            } else {
                window.location.href = "/"
            }
        } else {
            context.state.reFetchPosts()
            context.setFocusState(null)
        }
    }, [data])

    useEffect(() => {
        if (!!!formData)
            return () =>
                updateFormData({
                    ...formData,
                    VALID:
                        formData.caption?.length > 2 ||
                        formData.excerpt?.length > 2 ||
                        formData.picture ||
                        formData.video,
                })
    }, [formData])

    async function submitForm(ev) {
        if (!formData.VALID) return

        const form = new FormData()

        form.append("caption", formData.caption || "")
        form.append("excerpt", formData.excerpt || "")
        form.append("hashtags", formData.hashtags || "")

        if (formData.picture) {
            if (typeof formData === Blob) {
                formData.picture = new File(
                    [formData.picture],
                    `picture${formData.picture.size}`,
                    { type: formData.picture.type },
                )
            }
            form.append("picture", formData.picture)
        }
        if (formData.video) {
            form.append("video", formData.video)
        }
        if (formData.thumbnail) {
            formData.thumbnail = new File(
                [formData.thumbnail],
                `thumbnail${formData.thumbnail.size}.jpg`,
                { type: "image/jpg" },
            )
            form.append("thumbnail", formData.thumbnail)
        }

        console.log(formData)

        celesupApi
            .post("/posts/create", form, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(
                (res) => {
                    setData(res.data)
                },
                (err) => {
                    console.log(err)
                    setError(err.response?.data)
                },
            )
            .catch((err) => {
                console.log(err)
                setError(err.message)
            })

        // await sendAxiosRequest({
        //     axiosInstance: celesupApi,
        //     url: "/posts/create",
        //     method: "POST",
        //     form: form,
        //     options: { headers: { "Content-Type": "multipart/form-data" } },
        // })
    }

    function exitPostCreation() {
        context.setFocusState({
            ...context.state,
            createPost: null,
        })
    }

    function handleModalActions(exit, action) {
        if (exit) {
            exitPostCreation()
        } else if (action) {
            if (!formData.VALID)
                return setError(
                    "Ops! Post must either contain a caption excerpt or a file.",
                )
            else {
                setPreviewPost({
                    id: "aaaaaaaaaaaaaaaaaaaaaaaaaa",
                    author: {
                        ...context.user,
                        avatar: CELESUP_BASE_URL + context.user.avatar,
                    },
                    caption: formData.caption,
                    excerpt: formData.excerpt,
                    created_at: new Date().toUTCString(),
                    video:
                        formData.video && URL.createObjectURL(formData.video),
                    picture:
                        formData.picture &&
                        URL.createObjectURL(formData.picture),
                    thumbnail:
                        formData.thumbnail &&
                        URL.createObjectURL(formData.thumbnail),
                })
            }
        }
    }

    return (
        <>
            <PostContext.Provider
                value={{
                    error,
                    pending,
                    formData,
                    submitForm,
                    updateFormData,
                    handleModalActions,
                }}
            >
                {previewPost ? (
                    <PostPreview post={previewPost} />
                ) : (
                    <>
                        {formData.picture ? (
                            <ImageViewer />
                        ) : formData.video ? (
                            <VideoFileViewer />
                        ) : (
                            <Modal
                                title="Create post"
                                action="next"
                                children={<PostForm />}
                                // options={{ maxHeight: true }}
                                callBack={handleModalActions}
                            />
                        )}
                    </>
                )}
            </PostContext.Provider>
        </>
    )
}

export default CreateNewPost
