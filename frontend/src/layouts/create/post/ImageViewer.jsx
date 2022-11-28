import React, { useState, useEffect, useContext, useRef } from "react"
import Modal from "../../../features/Modal"
import { PostContext } from "./create"
import PhotoEditor from "./PhotoEditor"
import PostForm from "./postForm"

let CALLBACK
let Last_FILTER = ""

const ImageViewer = () => {
    const [edit, setEdit] = useState(true)
    const [photo, setPhoto] = useState(null)
    const [canvas, setCanvas] = useState(null)
    const [canvasContext, setCanvasContext] = useState(null)

    const mainWrapperRef = useRef()

    const {
        postData,
        updatePostData,
        exitPostCreation,
        setHeaderOptions,
        dispatcher,
    } = useContext(PostContext)

    useEffect(() => {
        const img = new Image()
        img.crossOrigin = "anonymous"

        img.src = URL.createObjectURL(postData.picture)

        setHeaderOptions((prev) => {
            return {
                ...prev,
                closeBtn: false,
                backBtn: true,
                textTitle: "Preview image",
                METHODS: {
                    ...prev.METHODS,
                    onBackBtnClicked: () => {
                        dispatcher("FORM")
                    },
                },
            }
        })
        img.onload = imageLoaded
    }, [])

    useEffect(() => {
        if (!canvasContext) return

        renderImage(null)
    }, [canvasContext])

    async function imageLoaded(ev) {
        await resetFilters()
        const image = await resizeImage(ev.target)

        document.getElementById("postImageViewer")
        const canvas = document
            .getElementById("postImageViewer")
            .querySelector("canvas")
        setPhoto(image)
        setCanvas(canvas)
        setCanvasContext(canvas.getContext("2d"))
    }

    async function renderImage(filter) {
        canvas.width = photo.width
        canvas.height = photo.height
        if (filter || Last_FILTER) {
            canvasContext.filter = filter || Last_FILTER
            Last_FILTER = filter || Last_FILTER
        }
        canvasContext.drawImage(photo, 0, 0, photo.width, photo.height)

        await prepareFormData()
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
        CALLBACK = null
    }

    // async function handleModalEvent(exit, action) {
    //     await resetFilters()
    //     if (exit) {
    //         handleModalActions(exit, null)
    //     } else if (action) {
    //         await handleModalActions(null, true)
    //     }
    // }

    async function prepareFormData() {
        const MIME_TYPE = postData.picture.type
        const dataURL = canvas.toDataURL(`${MIME_TYPE}`, 95)

        const ascii_Char = atob(dataURL.split(",")[1])
        const ascii_CodeArray = new Uint8Array(ascii_Char.length)

        let i = ascii_Char.length
        while (i--) {
            ascii_CodeArray[i] = ascii_Char.charCodeAt(i)
        }

        const _file = new File(
            [ascii_CodeArray],
            `photo-${ascii_CodeArray.byteLength}e.${MIME_TYPE.split("/")[1]}`,
            {
                type: MIME_TYPE,
            },
        )

        updatePostData((prev) => {
            return {
                ...prev,
                picture: _file,
            }
        })
    }

    return (
        <div id={"postImageViewer"} className="" data-photo-wrapper>
            <div className="post__form__body__image">
                <canvas
                    data-post-canvas
                    className="border height-100"
                    width={300}
                    height={300}
                ></canvas>
            </div>

            <div className="">
                <PhotoEditor
                    photo={photo}
                    canvas={canvas}
                    canvasContext={canvasContext}
                    renderImage={renderImage}
                    prepareFormData={prepareFormData}
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
