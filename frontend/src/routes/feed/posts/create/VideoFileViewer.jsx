import React, { useContext, useEffect, useRef } from "react"
import { useState } from "react"
import Modal from "../../../../features/Modal"
import Textarea from "../../../../features/TextArea"
import { PostContext } from "./createPost"

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"
import VideoPlayer from "../../../../components/VideoPlayer"
import VideoContainer from "../../../../components/videoContainer"
import AlertMessage from "../../../../features/AlertMessage"
const ffmpeg = createFFmpeg({ log: true })

export default function VideoFileViewer() {
    const videoPlayerRef = useRef()
    const { formData, error, updateFormData, handleModalActions } =
        useContext(PostContext)

    const [thumbnails, setThumbnails] = useState([])

    useEffect(() => {
        if (ffmpeg.isLoaded()) return

        async function loadFFmpeg() {
            await load()
            await generateThumbnails()
        }
        return () => loadFFmpeg()
    }, [])

    // useEffect(() => {
    //     if (!thumbnails.length) return
    //     return () =>
    //         updateFormData((prev) => {
    //             return {
    //                 ...prev,
    //                 thumbnail: thumbnails[0],
    //             }
    //         })
    // }, [thumbnails])

    async function load() {
        await ffmpeg.load()
        return true
    }

    const generateThumbnails = async () => {
        ffmpeg.FS("mkdir", "thumbnail")
        ffmpeg.FS(
            "writeFile",
            "test-video.mp4",
            await fetchFile(formData.video),
        )
        await ffmpeg.run(
            "-i",
            "test-video.mp4",
            "-vf",
            "fps=1/5,scale=800:-1",
            "-t",
            "15",
            "thumbnail/preview%d.jpg",
        )
        let files = ffmpeg.FS("readdir", "thumbnail")
        const data = []

        files.slice().forEach((fileName, idx) => {
            if (!!fileName.match(/preview/)) {
                const binaryData = ffmpeg.FS(
                    "readFile",
                    `thumbnail/${fileName}`,
                )
                const blob = new Blob([binaryData.buffer], {
                    type: "image/jpeg",
                })
                data.push(blob)
            }
        })

        updateFormData((prev) => {
            return {
                ...prev,
                VALID: true,
                thumbnail: data[0],
            }
        })
        setThumbnails(data)
        return true
    }

    return (
        <>
            <Modal
                title="Video details"
                action="next"
                options={{ maxWidth: true }}
                callBack={handleModalActions}
                children={
                    <>
                        {!thumbnails?.length ? (
                            <p>..loading</p>
                        ) : (
                            <div className="width-100 height-100 d-flex justify-content-center align-items-center pos-relative flex-column">
                                {error && (
                                    <AlertMessage
                                        message={error}
                                        asError={true}
                                    />
                                )}
                                <div
                                    style={{
                                        maxHeight: "var(--modal-max-height)",
                                    }}
                                    className="row width-100 px-__ align-items-center overflow-hidden overflow-y-auto justify-content-center"
                                >
                                    <div className="col-7-md flex-1 p-1 d-flex justify-content-center">
                                        <form
                                            action=""
                                            className="width-100 height-100"
                                        >
                                            <div className="input-field gap-10-px">
                                                <label htmlFor="title">
                                                    Title *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="title"
                                                    placeholder="video title"
                                                />
                                            </div>
                                            <div className="input-field gap-10-px mt-2">
                                                <label htmlFor="title">
                                                    Description
                                                </label>
                                                <Textarea
                                                    row={4}
                                                    onChange={() => {}}
                                                    onSubmit={() => {}}
                                                    placeholder="tell your viewers about your video"
                                                />
                                            </div>
                                            <div className="input-field gap-10-px mt-2">
                                                <label htmlFor="">
                                                    Thumbnails
                                                </label>
                                                <div
                                                    className="d-flex justify-content-between gap-5-px"
                                                    style={{
                                                        alignItems: "stretch",
                                                    }}
                                                >
                                                    <div
                                                        className="minwidth-100-px cursor-pointer center px-__
                                                        d-flex align-items-center flex-column gap-3-px justify-content-center
                                                        width-fit-content border border-style-dotted border-width-2 br-sm overflow-hidden
                                                    "
                                                    >
                                                        <span>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 48 48"
                                                            >
                                                                <path d="M42 38V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4zM17 27l5 6.01L29 24l9 12H10l7-9z" />
                                                            </svg>
                                                        </span>
                                                        <span className="font-sm">
                                                            upload thumbnail
                                                        </span>
                                                    </div>
                                                    {thumbnails.map(
                                                        (thumbnail, idx) => {
                                                            return (
                                                                <div
                                                                    key={idx}
                                                                    className="maxwidth-150-px height-100 cursor-pointer"
                                                                >
                                                                    <img
                                                                        src={URL.createObjectURL(
                                                                            thumbnail,
                                                                        )}
                                                                        alt=""
                                                                        width="100%"
                                                                    />
                                                                </div>
                                                            )
                                                        },
                                                    )}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-5-md">
                                        <VideoPlayer
                                            file={formData.video}
                                            thumbnail={thumbnails[0]}
                                            options={{
                                                maxWidth: true,
                                                CONTROLS: {
                                                    captionMode: false,
                                                    theaterMode: false,
                                                    miniPlayerMode: false,
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                }
            />
        </>
    )
}

function useGenerateThumbnail(video) {
    const [thumbnails, setThumbnails] = useState([])

    useEffect(() => {
        if (ffmpeg.isLoaded()) return
        load()
    }, [])

    async function load() {
        await ffmpeg.load()
        generateThumbnails()
    }

    const generateThumbnails = async () => {
        ffmpeg.FS("mkdir", "thumbnail")
        ffmpeg.FS("writeFile", "video.mp4", await fetchFile(video))
        await ffmpeg.run(
            "-i",
            "video.mp4",
            "-vf",
            "fps=1/5,scale=1000:-1",
            "-t",
            "15",
            "thumbnail/preview%d.jpg",
        )
        const data = ffmpeg.FS("readdir", "thumbnail")
        console.log(data)
        const blobs = []

        data.slice().forEach((f) => {
            if (!!f.match(/preview/)) {
                const d = ffmpeg.FS("readFile", `thumbnail/${f}`)
                const file = new Blob([d.buffer], { type: "image/jpg" })
                blobs.push(file)
            }
            console.log(f)
            console.log("loop", blobs)
        })
        console.log(blobs)
        setThumbnails(blobs)
        // ffmpeg.exit()
    }

    return { thumbnails }
}
