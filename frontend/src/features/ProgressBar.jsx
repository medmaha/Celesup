import { useEffect, useRef } from "react"

const ProgressBar = ({ className, width, height, animationEnd = "100vw" }) => {
    const instance = useRef()

    useEffect(() => {
        instance.current.style["--animation-end"] = animationEnd
        console.log(instance.current.style["--animation-end"])
    })

    return (
        <>
            {!!animationEnd && (
                <div ref={instance} className={`loader-wrapper ${className}`}>
                    <span className="loader"></span>
                </div>
            )}
        </>
    )
}

export default ProgressBar
