import React, { useState, useEffect, useContext, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateForm, updatePages } from "../../../redux/createPost"
import PhotoEditor from "./PhotoEditor"
import { createFileFromDataUrl } from "./utils"

let Last_FILTER = ""

let I = 0

const ImageViewer = () => {
    const [edit, setEdit] = useState(true)
    const [file, setFile] = useState(null)
    const [image, setImage] = useState(null)
    const [canvas, setCanvas] = useState(null)
    const [canvasContext, setCanvasContext] = useState(null)

    const postImageViewer = useRef()

    const { form, pages } = useSelector((state) => state.createPost)
    const dispatch = useDispatch()

    useEffect(() => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = form.picture

        img.onload = imageLoaded
        dispatch(
            updatePages({
                prev: { from: null, value: "FORM" },
                current: { from: "FORM", value: "PHOTO" },
                next: { from: "PHOTO", value: "PREVIEW" },
            }),
        )
    }, [])

    // function previewPost(file) {
    //     console.log(file)
    //     if (!file) return
    //     updateForm({
    //         ...form,
    //         picture: URL.createObjectURL(file),
    //     })
    //     setTimeout(() => {
    //         let ev = new Event("previewPost")
    //         document.dispatchEvent(ev)
    //     }, 250)
    // }

    useEffect(() => {
        if (!canvasContext) return
        renderImage(null)
        return () => {
            dispatch(
                updatePages({
                    ...pages,
                }),
            )
        }
    }, [canvasContext])

    async function imageLoaded(ev) {
        await resetFilters()
        const _image = await resizeImage(ev.target)

        const canvas = document
            .getElementById("postImageViewer__")
            .querySelector("canvas")

        setImage(_image)
        setCanvas(canvas)
        setCanvasContext(canvas.getContext("2d"))
    }

    async function renderImage(filter) {
        canvas.width = image.width
        canvas.height = image.height
        if (filter || Last_FILTER) {
            canvasContext.filter = filter || Last_FILTER
            Last_FILTER = filter || Last_FILTER
        }
        canvasContext.drawImage(image, 0, 0, image.width, image.height)
        updateFile()
    }

    async function resizeImage(photo = Image) {
        const MAX_WIDTH = 650
        const MAX_HEIGHT = 500
        let computed = false

        if (photo.naturalWidth > MAX_WIDTH) {
            const ASPECT_RATIO = MAX_WIDTH / photo.width
            photo.width = MAX_WIDTH
            photo.height = photo.height * ASPECT_RATIO
            computed = true
        }

        if (computed) {
            if (photo.height > MAX_HEIGHT) {
                const ASPECT_RATIO = MAX_HEIGHT / photo.height
                photo.height = MAX_HEIGHT
                photo.width = photo.width * ASPECT_RATIO
            }
        }

        return photo
    }

    async function resetFilters() {
        document
            .querySelectorAll("#photoEditor [data-filter]")
            .forEach((node) => {
                const key = node.dataset.filter
                node.setAttribute(
                    "data-value",
                    `${defaultImageStyles[key].value}`,
                )
            })
        Last_FILTER = ""
    }

    function updateFile() {
        const MIME_TYPE = image.src.split(";")[0].split(":")[1]

        const dataURL = canvas.toDataURL(`${MIME_TYPE}`, 95)

        dispatch(updateForm({ picture: dataURL }))
    }

    return (
        <div
            id={"postImageViewer__"}
            ref={postImageViewer}
            className="minheight-400-px d-flex flex-column justify-content-between"
            data-photo-wrapper
        >
            <div
                className={`post__form__body__image flex-1 ${
                    canvas?.width < 300 ? "align-items-center" : ""
                }`}
            >
                <canvas
                    data-post-canvas
                    className="border height-100"
                    width={300}
                    height={300}
                ></canvas>
            </div>

            <div className="p-__">
                <PhotoEditor
                    photo={image}
                    canvas={canvas}
                    canvasContext={canvasContext}
                    renderImage={renderImage}
                />
            </div>
        </div>
    )
}

export default ImageViewer

var defaultImageStyles = {
    brightness: { value: 100, prefix: "%" },
    saturate: { value: 100, prefix: "%" },
    contrast: { value: 100, prefix: "%" },
    blur: { value: 0, prefix: "px" },
    sepia: { value: 0, prefix: "%" },
    grayscale: { value: 0, prefix: "%" },
    "hue-rotate": { value: 0, prefix: "deg" },
}
