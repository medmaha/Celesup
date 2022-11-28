import "./styles.css"
import {
    useState,
    useEffect,
    createContext,
    useContext,
    useRef,
    useReducer,
} from "react"

import { celesupApi } from "../../../axiosInstances"
import PostForm from "./postForm"
import Modal from "../../../features/Modal"
import ImageViewer from "./ImageViewer"
import VideoFileViewer from "./VideoFileViewer"
import PostPreview from "./postPreview"
import { GlobalContext } from "../../../App"

import {
    ACCEPTED_FILE_EXTENSIONS,
    fileUploader,
    PostModalHeader,
} from "./utils"

import PhotoEditor from "./PhotoEditor"
import useCreate from "./useCreate"

export const PostContext = createContext({})

export default function Create() {
    const context = useContext(GlobalContext)
    const [headerOptions, setHeaderOptions] = useState(
        getInitialHeaderOptions(exitPostCreation),
    )
    const {
        data,
        setData,
        error,
        setError,
        pending,
        setPending,
        form,
        updateForm,
        state,
        dispatch,
        postData,
        updatePostData,
        dispatcher,
    } = useCreate(setHeaderOptions)

    async function submitForm() {
        console.log(form)
        if (!form?.META?.VALID) return

        const _form = new FormData()

        _form.append("caption", form.caption || "")
        _form.append("excerpt", form.excerpt || "")
        _form.append("hashtags", form.hashtags || "")

        if (form.picture) {
            if (typeof form === Blob) {
                form.picture = new File(
                    [form.picture],
                    `picture${form.picture.size}`,
                    { type: form.picture.type },
                )
            }
            _form.append("picture", form.picture)
        }
        if (form.video) {
            _form.append("video", form.video)
        }
        if (form.thumbnail) {
            form.thumbnail = new File(
                [form.thumbnail],
                `thumbnail${form.thumbnail.size}.jpg`,
                { type: "image/jpg" },
            )
            _form.append("thumbnail", form.thumbnail)
        }

        celesupApi
            .post("/posts/create", _form, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(
                (res) => {
                    if (res.status === 201 && !context.state?.reFetchPosts) {
                        if (window.location.href === "/") {
                            window.location.reload()
                        } else {
                            window.location.href = "/"
                        }
                    } else if (res.status === 201) {
                        context.state.reFetchPosts()
                        context.setFocusState(null)
                    }
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

    const value = {
        error,
        setError,
        pending,
        setPending,
        postData,
        updatePostData,
        submitForm,
        setHeaderOptions,
        exitPostCreation,
        dispatcher,
    }

    return (
        <>
            <PostContext.Provider value={{ ...value }}>
                {state.currentJXS && (
                    <Modal
                        options={{
                            setHeader: (
                                <PostModalHeader options={headerOptions} />
                            ),
                        }}
                        children={state.currentJXS}
                    />
                )}
            </PostContext.Provider>
        </>
    )
}

function getInitialHeaderOptions(handleModalActions) {
    return {
        actionBtn: false,
        backBtn: false,
        editBtn: false,
        defaultBtn: false,
        closeBtn: true,
        METHODS: {
            onCloseBtnClicked: () => handleModalActions(true, null),
        },
    }
}
