import { useState, useEffect } from "react"

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"

const ffmpeg = createFFmpeg({ log: true })

export default function App() {
    const [ready, setReady] = useState(false)
    const [video, setVideo] = useState(null)
    const [gif, setGif] = useState(null)
    const [thumbnails, setThumbnail] = useState(null)
    async function load() {
        await ffmpeg.load()
        setReady(true)
    }

    useEffect(() => {
        return () => load()
    }, [])

    const generateThumbnails = async () => {
        ffmpeg.FS("mkdir", "thumbnail")
        ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video))
        await ffmpeg.run(
            "-i",
            "test.mp4",
            "-vf",
            "fps=1/3,scale=1000:-1",
            "-t",
            "10",

            "thumbnail/preview%d.jpg",
        )
        const data = ffmpeg.FS("readdir", "thumbnail")
        const blobs = []

        data.forEach((f) => {
            if (!!f.match(/preview/)) {
                const d = ffmpeg.FS("readFile", `thumbnail/${f}`)
                const file = new Blob([d.buffer], { type: "image/jpg" })
                blobs.push(file)
            }
        })
        console.log(blogs)
        setThumbnail(blobs)
    }

    const convertToGif = async () => {
        ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video))

        await ffmpeg.run(
            "-i",
            "test.mp4",
            "-t",
            "2.5",
            "-ss",
            "2.0",
            "-f",
            "gif",
            "out.gif",
        )

        const data = ffmpeg.FS("readFile", "out.gif")

        const url = URL.createObjectURL(
            new Blob([data.buffer], { type: "image/gif" }),
        )
        setGif(url)
    }

    return (
        <div className="d-flex justify-content-center pt-3 width-100">
            {ready ? (
                <div className="my-2">
                    <div>
                        <input
                            type="file"
                            onChange={(e) => setVideo(e.target.files.item(0))}
                        />
                    </div>
                    {video && (
                        <>
                            <video
                                controls
                                width="250"
                                src={URL.createObjectURL(video)}
                            ></video>
                            <div onClick={convertToGif} className="mt-2 btn">
                                convert to gif
                            </div>
                            <div
                                onClick={generateThumbnails}
                                className="mt-2 btn"
                            >
                                generate thumbnail
                            </div>
                        </>
                    )}
                    <div className="mt-2">
                        {!!gif && <img width="250" src={gif} />}
                        {thumbnails?.map((th, i) => {
                            return (
                                <span className="d-block" key={i}>
                                    <img src={URL.createObjectURL(th)} />
                                </span>
                            )
                        })}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
