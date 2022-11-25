import React from "react"

export default function VideoContainer({ video }) {
    return (
        <div className="video-container">
            <video src={URL.createObjectURL(video)}></video>
        </div>
    )
}
