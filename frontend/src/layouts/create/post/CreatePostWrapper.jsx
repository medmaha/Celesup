import "./styles.css"
import {
    useState,
    useEffect,
    createContext,
    useContext,
    useRef,
    useReducer,
} from "react"
import { celesupApi, CELESUP_BASE_URL } from "../../../axiosInstances"
import PostForm from "./postForm"
import useAxiosRequest from "../../../hooks/useAxiosRequest"
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
import { PostContext } from "./create"
import PhotoEditor from "./PhotoEditor"

let PREV_PAGE = null

export function CreatePostWrapper() {
    const mainContext = useContext(GlobalContext)
    const postContext = useContext(PostContext)
    const { formData, updateFormData, setError, handleModalActions } =
        postContext

    const [headerOptions, setHeaderOptions] = useState(
        getInitialHeaderOptions(handleModalActions),
    )
    const [post, setPost] = useState(formData)
    const [state, dispatch] = useReducer(reducer, {})

    useEffect(() => {
        console.log("post changed")
        updateFormData(() => {
            return {
                ...formData,

                FILES: !!formData.picture || !!formData.video,
                TEXTS:
                    !!formData.caption ||
                    !!formData.excerpt ||
                    !!formData.hashtags,
                VALID:
                    checkValid(post.caption) ||
                    checkValid(post.excerpt) ||
                    checkValid(post.hashtags) ||
                    checkValid(post.picture, "F") ||
                    checkValid(post.video, "F"),

                TEXTS:
                    checkValid(post.caption, "T") ||
                    checkValid(post.excerpt, "T") ||
                    checkValid(post.hashtags, "T"),

                FILES:
                    checkValid(post.picture, "F") ||
                    checkValid(post.video, "F"),
            }
            function checkValid(field, lookup = "L") {
                switch (lookup) {
                    case "L":
                        if (field?.length > 4) return true
                        return false
                    case "F":
                        if (!!field) return true
                        return false
                    case "T":
                        if (!!field) return true
                        return false
                    default:
                        return false
                }
            }
        })
    }, [post])

    useEffect(() => {
        console.log("form changed")
        setHeaderOptions((prev) => {
            return {
                ...prev,
                actionBtn: !!formData.VALID,
            }
        })
    }, [formData])

    // useEffect(() => {
    //     updateFormData((prev) => {
    //         return {
    //             ...prev,
    //             FILES: post.FILES,
    //             TEXTS: post.TEXTS,
    //             VALID: post.VALID,
    //         }
    //     })
    // }, [headerOptions])

    return (
        <>
            {state.currentJXS && (
                <Modal
                    options={{
                        setHeader: <PostModalHeader options={headerOptions} />,
                    }}
                    children={state.currentJXS}
                />
            )}
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
