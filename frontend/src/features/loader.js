import { useEffect, useRef } from "react"
import "./loader.css"

export const ProgressBar = ({
    className,
    startPos,
    endPos,
    width,
    height = "10px",
    identifier,
    disableComponent = false,
}) => {
    const instance = useRef(identifier)

    useEffect(() => {
        if (!instance.current) return
        setStyles()
    }, [instance.current])

    function setStyles() {
        if (startPos) {
            instance.current.style.setProperty("--startPos", startPos)
        }
        if (endPos) {
            instance.current.style.setProperty("--endPos", endPos)
        }
        if (width) {
            instance.current
                ?.querySelector(".animator")
                .style.setProperty("--animator-width", width)
        }
        if (height) {
            instance.current
                .querySelector(".animator")
                .style.setProperty("--animator-height", height)
        }
    }

    return (
        <>
            <div ref={instance} className={`lOADER progress-bar`}>
                <div className="animator"></div>
            </div>
            {!!disableComponent && (
                <div
                    className="pos-absolute disabled z-index-1-plus left-0 width-100 height-100"
                    style={{
                        backgroundColor: "rgba(0,0,0,.2)",
                        top: height,
                    }}
                ></div>
            )}
        </>
    )
}

export default ProgressBar
