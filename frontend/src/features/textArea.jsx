import { useRef } from "react"
import "./textArea.css"

export default function Textarea({
    placeholder,
    id,
    submitOnEnter,
    className,
}) {
    const instanceRef = useRef(`ref${id}`)

    function handleTextarea(ev) {
        if (ev.code === "Enter") {
            ev.preventDefault()
            checkSubmit(ev)
            return
        }
        ev.target.style.height = "2rem"
        const scrollHeight = ev.target.scrollHeight
        ev.target.style.height = `${scrollHeight}px`
    }

    function checkSubmit(ev) {
        if (ev.code === "Enter" && !!submitOnEnter) {
            const content = instanceRef.current.value
            submitOnEnter(content, id, cb)
        }

        function cb() {
            instanceRef.current.value = ""
            instanceRef.current.blur()
        }
    }

    return (
        <textarea
            data-id={id}
            ref={instanceRef}
            className={`border-0 outline-0` + className}
            onKeyDown={handleTextarea}
            data-sp-textarea=""
            placeholder={placeholder}
        ></textarea>
    )
}
