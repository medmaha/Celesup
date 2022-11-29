import { useEffect, useContext, useReducer, useState } from "react"
import { GlobalContext } from "../../../App"
import {
    ACCEPTED_FILE_EXTENSIONS,
    checkValid,
    fileUploader,
    getCurrentJsx,
} from "./utils"

import PostForm from "./postForm"
import ImageViewer from "./ImageViewer"
import VideoFileViewer from "./VideoFileViewer"
import PostPreview from "./postPreview"
import PhotoEditor from "./PhotoEditor"

export default function useCreate(setHeaderOptions) {
    const context = useContext(GlobalContext)
    const [postData, updatePostData] = useState(getPostDataObject())
    const [form, updateForm] = useState({})

    const [data, setData] = useState(null)
    const [pending, setPending] = useState(false)
    const [error, setError] = useState(undefined)

    const [state, dispatch] = useReducer(reducer, {})

    useEffect(() => {
        const createAction = context.state.createPost?.toLowerCase()

        return () => {
            switch (createAction) {
                case "video":
                case "photo":
                    fileUploader(
                        updatePostData,
                        dispatcher,
                        createAction,
                        ACCEPTED_FILE_EXTENSIONS[createAction],
                    )
                    break
                default:
                    dispatcher("FORM")
            }
        }
    }, [])

    useEffect(() => {
        // updatePostData((prev) => {
        //     return {
        //         ...prev,
        //         ...form,
        //         META: null,
        //     }
        // })
    }, [state])

    useEffect(() => {
        if (!error) return

        const timeout = setTimeout(() => setError(undefined), 5000)

        return () => clearTimeout(timeout)
    }, [error])

    useEffect(() => {
        updateForm({
            ...postData,

            META: {
                FILES: !!postData.picture || !!postData.video,
                TEXTS:
                    !!postData.caption ||
                    !!postData.excerpt ||
                    !!postData.hashtags,
                VALID:
                    checkValid(postData.caption) ||
                    checkValid(postData.excerpt) ||
                    checkValid(postData.hashtags) ||
                    checkValid(postData.picture, "F") ||
                    checkValid(postData.video, "F"),

                TEXTS:
                    checkValid(postData.caption, "T") ||
                    checkValid(postData.excerpt, "T") ||
                    checkValid(postData.hashtags, "T"),

                FILES:
                    checkValid(postData.picture, "F") ||
                    checkValid(postData.video, "F"),
            },
        })
    }, [postData])

    useEffect(() => {
        setHeaderOptions((prev) => {
            return {
                ...prev,
                actionBtn: !!form?.META?.VALID,
            }
        })
        // console.log(form)
        // console.log(postData)
    }, [form])

    function dispatcher(type = "") {
        console.log(type)
        dispatch({
            type: type.toUpperCase(),
        })
    }

    return {
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
    }
}

function reducer(state, action) {
    switch (action.type) {
        case "FORM":
            return {
                currentJXS: getCurrentJsx(PostForm),
            }
        case "PHOTO":
            return {
                currentJXS: getCurrentJsx(ImageViewer),
            }
        case "VIDEO":
            return {
                currentJXS: getCurrentJsx(VideoFileViewer),
            }
        case "EDITOR":
            return {
                currentJXS: getCurrentJsx(PhotoEditor),
            }
        case "PREVIEW":
            return {
                currentJXS: getCurrentJsx(PostPreview),
            }
        default:
            return { ...state }
    }
}

function getPostDataObject() {
    return {
        caption: null,
        excerpt: null,
        hashtags: null,
        video: null,
        picture: null,
        thumbnail: null,
    }
}
