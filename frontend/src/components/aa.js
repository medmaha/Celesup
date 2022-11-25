import { useEffect, useRef, useState } from "react"
import "./styles.css"

export default function VideoPlayer({ video, thumbnail = true, options = {} }) {
    const [streamingData, setStreamingData] = useState({})

    const videoRef = useRef()
    const videoContainerRef = useRef()

    const VIDEO_OPTIONS = {
        maxWidth: false,
        showControls: true,
        ...options,
        CONTROLS: {
            timelineMode: true,
            playPauseMode: true,
            volumeMode: true,
            durationMode: true,
            captionMode: true,
            theaterMode: true,
            miniPlayerMode: true,
            fullScreenMode: true,
            playbackSpeedMode: true,
            ...options.CONTROLS,
        },
    }

    useEffect(() => {
        console.log(VIDEO_OPTIONS)
        document.addEventListener("keydown", keyEvents)
        // document.addEventListener("fullscreenchange", toggleFullScreen)
        // document.addEventListener("keydown", keyEvents)
        return () => {
            document.removeEventListener("keydown", keyEvents)
            // document.removeEventListener("fullscreenchange", toggleFullScreen)
        }
    }, [])

    useEffect(() => {
        if (!videoRef.current) return
        const timelineContainer = videoContainerRef.current.querySelector(
            ".timeline-container",
        )

        videoRef.current.addEventListener("loadeddata", videoLoaded)
        videoRef.current.addEventListener("timeupdate", videoPlaying)
        videoRef.current.addEventListener("volumechange", videoVolumeChange)
        timelineContainer.addEventListener("mousemove", handleTimelineUpdate)

        return () => {
            if (!videoRef.current) return
            videoRef.current.removeEventListener("loadeddata", videoLoaded)
            videoRef.current.removeEventListener("timeupdate", videoPlaying)
            videoRef.current.removeEventListener(
                "volumechange",
                videoVolumeChange,
            )
            timelineContainer.removeEventListener(
                "mousemove",
                handleTimelineUpdate,
            )
        }
    }, [videoRef.current])

    function videoLoaded(ev) {
        let currentTime = "0:00"
        const totalTime = formattedDuration(videoRef.current.duration)

        updateTimestamp(currentTime, totalTime)
        videoContainerRef.current.tabIndex = "-1"
        videoContainerRef.current.focus()
    }

    function videoVolumeChange() {
        const volumeSlider = videoContainerRef.current.querySelector(
            ".controls .volume-container .volume-slider input",
        )

        volumeSlider.value = videoRef.current.volume
        let volumeLevel

        if (videoRef.current.muted || videoRef.current.volume === 0) {
            volumeLevel = "muted"
            volumeSlider.value = 0
        } else if (videoRef.current.volume > 0.5) {
            volumeLevel = "high"
        } else {
            volumeLevel = "low"
        }
        videoContainerRef.current.dataset.volumeLevel = volumeLevel
    }

    function handleTimelineUpdate(ev) {
        const timelineContainer = videoContainerRef.current.querySelector(
            ".timeline-container",
        )
        const rect = timelineContainer.getBoundingClientRect()
        const percent =
            Math.min(Math.max(0, ev.x - rect.x), rect.width) / rect.width
        timelineContainer.style.setProperty("--preview-position", percent)

        timelineContainer.addEventListener("click", (ev) => {
            const _percent =
                Math.min(Math.max(0, ev.x - rect.x), rect.width) / rect.width
            timelineContainer.style.setProperty("--preview-position", percent)
            videoRef.current.currentTime = _percent * videoRef.current.duration
        })
    }

    function videoPlaying() {
        const currentTime = formattedDuration(videoRef.current.currentTime)
        const totalTime = formattedDuration(videoRef.current.duration)
        updateTimestamp(currentTime, totalTime)

        const timelineContainer = videoContainerRef.current.querySelector(
            ".timeline-container",
        )
        const percent = videoRef.current.currentTime / videoRef.current.duration
        timelineContainer.style.setProperty("--progress-position", percent)
        // console.log(timelineContainer)
    }

    function keyEvents(ev) {
        const activeTagName = document.activeElement.tagName.toLowerCase()

        if (activeTagName !== videoContainerRef.current.tagName.toLowerCase())
            return
        switch (ev.key.toLowerCase()) {
            case " ":
                if (activeTagName === "button") return
            case "k":
                togglePlay()
                break
            case "t":
                toggleTheater()
                break
            case "i":
                toggleMiniPlayer()
                break
            case "f":
                toggleFullScreen()
                break
            case "m":
                toggleMuted()
                break

            default:
                break
        }
    }

    function toggleMuted(mute) {
        // Todo
        videoRef.current.muted = !videoRef.current.muted
    }

    function togglePlay() {
        videoRef.current.paused
            ? videoRef.current.play()
            : videoRef.current.pause()
        videoContainerRef.current.classList.toggle(
            "pause",
            videoRef.current.paused,
        )
    }

    function handleSliderInput(ev) {
        videoRef.current.volume = ev.target.value
        videoRef.current.muted = ev.target.value === 0
    }

    function updateTimestamp(currentTime, totalTime) {
        const currentTimeElement = videoContainerRef.current.querySelector(
            ".duration-container .current-time",
        )
        const totalTimeElement = videoContainerRef.current.querySelector(
            ".duration-container .total-time",
        )

        currentTimeElement.innerHTML = currentTime
        totalTimeElement.innerHTML = totalTime
    }

    function toggleCaption() {
        videoContainerRef.current.classList.toggle("caption")
    }

    function toggleMiniPlayer() {
        if (document.pictureInPictureEnabled) {
            if (document.pictureInPictureElement) {
                document.exitPictureInPicture()
            } else {
                videoRef.current.requestPictureInPicture()
            }
        }
    }

    function toggleTheater() {
        videoContainerRef.current.classList.toggle("theater")
    }

    function toggleFullScreen() {
        if (document.fullscreenEnabled) {
            if (document.fullscreenElement) {
                document.exitFullscreen()
            } else {
                videoContainerRef.current.requestFullscreen()
            }
        }
    }

    function changeVideoPlaybackRate() {
        const playbackElement = videoContainerRef.current.querySelector(
            ".playback-speed-container",
        )

        let newPlaybackRate = videoRef.current.playbackRate + 0.25

        if (newPlaybackRate > 2) newPlaybackRate = 0.25

        videoRef.current.playbackRate = newPlaybackRate

        playbackElement.textContent = newPlaybackRate + "x"
    }

    return (
        <div
            ref={videoContainerRef}
            className="video-container pause black"
            data-volume-level="high"
            style={{
                "--vp-width": VIDEO_OPTIONS.maxWidth ? "100%" : "90%",
                outline: "none",
            }}
        >
            {thumbnail && (
                <>
                    <div className="video-thumbnail-container">
                        <div className="video-thumbnail">
                            <img
                                src={require("./post-placeholder.png")}
                                alt="thumbnail"
                            />
                        </div>
                    </div>
                    {/* <div className="video-thumbnail-play-btn">
                        <span className="icon-wrapper">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                            </svg>
                        </span>
                    </div> */}
                </>
            )}
            {/* 
            <video
                onClick={togglePlay}
                ref={videoRef}
                src={URL.createObjectURL(video)}
            ></video> */}
            {VIDEO_OPTIONS.showControls && (
                <div className="video-controls-container pos-absolute left-0 right-0 bottom-5-px">
                    {VIDEO_OPTIONS["CONTROLS"].timelineMode && (
                        <div className="timeline-container">
                            <div className="timeline">
                                <div className="thumb-indicator"></div>
                            </div>
                        </div>
                    )}
                    <div className="controls d-flex gap-1-rem align-items-center">
                        {VIDEO_OPTIONS["CONTROLS"].playPauseMode && (
                            <span
                                onClick={togglePlay}
                                className="play-pause-btn svg-wrapper"
                            >
                                <svg
                                    className="play-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                <svg
                                    className="pause-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </svg>
                            </span>
                        )}
                        {VIDEO_OPTIONS["CONTROLS"].volumeMode && (
                            <div className="volume-container d-flex gap-5-px align-items-center d-inline-flex">
                                <span
                                    onClick={toggleMuted}
                                    className="volume-btn svg-wrapper cursor-pointer"
                                >
                                    <svg
                                        className="low-vol-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 18 18"
                                    >
                                        <path d="M4 7v4h3l4 4V3L7 7H4zm9-1v6c1.17-.49 2-1.65 2-3s-.83-2.51-2-3z" />
                                    </svg>
                                    <svg
                                        className="muted-vol-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 18 18"
                                    >
                                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                                    </svg>
                                    <svg
                                        className="high-vol-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 18 18"
                                    >
                                        <path d="M12.79 9c0-1.3-.72-2.42-1.79-3v6c1.06-.58 1.79-1.7 1.79-3zM2 7v4h3l4 4V3L5 7H2zm9-5v1.5c2.32.74 4 2.93 4 5.5s-1.68 4.76-4 5.5V16c3.15-.78 5.5-3.6 5.5-7S14.15 2.78 11 2z" />
                                    </svg>
                                </span>
                                <span className="volume-slider">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="any"
                                        value="1"
                                        onChange={handleSliderInput}
                                    />
                                </span>
                            </div>
                        )}
                        {VIDEO_OPTIONS["CONTROLS"].durationMode && (
                            <div className="duration-container d-flex gap-5-px flex-1 d-inline-flex">
                                <div className="current-time">0.00</div>
                                <div className="">/</div>
                                <div className="total-time">10:00</div>
                            </div>
                        )}
                        {VIDEO_OPTIONS["CONTROLS"].captionMode && (
                            <span
                                onClick={toggleCaption}
                                className="caption-btn svg-wrapper"
                            >
                                <svg
                                    className="caption-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 48 48"
                                >
                                    <path d="M38 8H10c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM22 22h-3v-1h-4v6h4v-1h3v2c0 1.1-.89 2-2 2h-6c-1.11 0-2-.9-2-2v-8c0-1.1.89-2 2-2h6c1.11 0 2 .9 2 2v2zm14 0h-3v-1h-4v6h4v-1h3v2c0 1.1-.89 2-2 2h-6c-1.11 0-2-.9-2-2v-8c0-1.1.89-2 2-2h6c1.11 0 2 .9 2 2v2z" />
                                </svg>
                            </span>
                        )}
                        {VIDEO_OPTIONS["CONTROLS"].miniPlayerMode && (
                            <span
                                onClick={toggleMiniPlayer}
                                className="mini-player-btn svg-wrapper"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z" />
                                </svg>
                            </span>
                        )}
                        {VIDEO_OPTIONS["CONTROLS"].theaterMode && (
                            <span
                                onClick={toggleTheater}
                                className="theater-btn svg-wrapper"
                            >
                                <svg
                                    className="theater-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H5V7h14v10z" />
                                </svg>
                            </span>
                        )}
                        {VIDEO_OPTIONS["CONTROLS"].fullScreenMode && (
                            <span
                                onClick={toggleFullScreen}
                                className="full-screen-btn svg-wrapper"
                            >
                                <svg
                                    className="full-screen-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 48 48"
                                >
                                    <path d="M14 28h-4v10h10v-4h-6v-6zm-4-8h4v-6h6v-4H10v10zm24 14h-6v4h10V28h-4v6zm-6-24v4h6v6h4V10H28z" />
                                </svg>
                            </span>
                        )}
                        {VIDEO_OPTIONS["CONTROLS"].playbackSpeedMode && (
                            <div
                                onClick={changeVideoPlaybackRate}
                                className="playback-speed-container cursor-pointer pr-__"
                            >
                                1x
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

function formattedDuration(duration) {
    const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
        minimumIntegerDigits: 2,
    })

    let _duration

    const fSec = Math.floor(duration % 60)
    const fMin = Math.floor(duration / 60) % 60
    const fHrs = Math.floor(duration / 3600)
    if (fHrs === 0) {
        _duration = `${fMin}:${leadingZeroFormatter.format(fSec)}`
    } else {
        _duration = `${fHrs}:${leadingZeroFormatter.format(
            fMin,
        )}:${leadingZeroFormatter.format(fSec)}`
    }
    return _duration
}
