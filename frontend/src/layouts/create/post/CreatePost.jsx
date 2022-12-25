import "./styles.css"
import { useContext, useReducer, useState } from "react"
import { GlobalContext } from "../../../App"

// ? Post Components
import PostForm from "./postForm"
import PhotoEditor from "./PhotoEditor"
import PostPreview from "./postPreview"
import ImageViewer from "./ImageViewer"
import VideoFileViewer from "./VideoFileViewer"
import { useEffect, createContext } from "react"

import { useSelector, useDispatch } from "react-redux"
import { updateForm, updatePages } from "../../../redux/createPost"
import fileUploader from "./uploader"
import PostModalHeader from "./PostModalHeader"

export const PostContext = createContext({})

export default function CreatePost({ setConfig }) {
    const context = useContext(GlobalContext)
    const [state, dispatch] = useReducer(reducer, {})
    const [imgViewed, setImgViewed] = useState(null)

    const { form, pages } = useSelector((state) => state.createPost)
    const storeDispatch = useDispatch()

    useEffect(() => {
        setConfig((prev) => {
            return {
                ...prev,
                header: <PostModalHeader dispatcher={dispatcher} />,
            }
        })
        return () => {
            switch (context.state?.createPost) {
                case "photo":
                case "video":
                    uploader()

                case "form":
                    dispatcher()
                    break

                default:
                    break
            }
            // storeDispatch(updateForm({ dispatch: true }))
        }
    }, [])

    async function uploader() {
        const [filetype, file] = await fileUploader(context.state?.createPost)
        storeDispatch(
            updateForm({
                [filetype]: file,
            }),
        )
        dispatcher("PHOTO")
    }

    function dispatcher(type = "FORM") {
        dispatch({
            type: type.toUpperCase(),
        })
    }

    return (
        <PostContext.Provider value={{ dispatcher }}>
            {state.currentJXS}
        </PostContext.Provider>
    )
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

export function getCurrentJsx(Element) {
    return <Element />
}
