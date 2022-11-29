import { useRef, useEffect, useState } from "react"

export default function Textarea({
    row = 1,
    name = "",
    value = null,
    children = "",
    className = "",
    placeholder = "",
    childrenClassName = "",
    id = `random-${Math.random()}`,
    onSubmit = (ev = EventTarget) => {},
    onChange = (ev = EventTarget) => {},
}) {
    const instanceRef = useRef(`ref${id}`)
    const height = 2

    useEffect(() => {
        if (!instanceRef.current) return
        instanceRef.current.style.height = `${height * row}rem`
    }, [instanceRef.current])

    function handleTextarea(ev) {
        if (ev.code === "Enter") {
            ev.preventDefault()
            checkSubmit(ev)
            return
        }
        ev.target.style.height = `${height * row}rem`
        const scrollHeight = ev.target.scrollHeight
        ev.target.style.height = `${scrollHeight}px`
    }

    function checkSubmit(ev) {
        if (ev.code === "Enter" && !!onSubmit) {
            const content = instanceRef.current.value
            onSubmit(content, cb, id)
        }

        function cb() {
            instanceRef.current.value = ""
            instanceRef.current.blur()
        }
    }

    return (
        <span className="pos-relative width-100">
            {value ? (
                <textarea
                    name={name}
                    data-id={id}
                    ref={instanceRef}
                    className={`border-0 outline-0 ` + className}
                    onKeyDown={handleTextarea}
                    data-sp-textarea=""
                    placeholder={placeholder}
                    value={value}
                    onChange={(ev) => {
                        onChange(ev)
                    }}
                ></textarea>
            ) : (
                <textarea
                    name={name}
                    data-id={id}
                    ref={instanceRef}
                    className={`border-0 outline-0 ` + className}
                    onKeyDown={handleTextarea}
                    data-sp-textarea=""
                    placeholder={placeholder}
                    onChange={(ev) => {
                        onChange(ev)
                    }}
                ></textarea>
            )}
            <span className={`pos-absolute ${childrenClassName}`}>
                {children}
            </span>
        </span>
    )
}

const TextAreaLarge = (props) => {
    const {
        row,
        name,
        onChange,
        placeholder,
        spellCheck = false,
        autoComplete = "off",
        autoCorrect = "off",
    } = props
    const instance = useRef()

    const normalHeight = "calc(var(--baseFontSize--) * 2.1"
    const [scrollHeight, setScrollHeight] = useState(null)

    useEffect(() => {
        if (!scrollHeight) return
        const maxHeight = 174
        if (scrollHeight >= maxHeight) {
            instance.current.style.setProperty("overflow-y", "auto")
        } else {
            instance.current.style.setProperty("overflow-y", "hidden")
        }
    }, [scrollHeight])

    useEffect(() => {
        if (row && instance?.current) instance.current.style.height = "auto"
        // eslint-disable-next-line
    }, [])

    useEffect(() => {})

    function handleInputChange(e) {
        if (instance.current.classList.contains("supcel-textarea")) {
            instance.current.style.height = normalHeight
            const scrollHeight = e.target.scrollHeight
            instance.current.style.height = `${scrollHeight}px`
            setScrollHeight(scrollHeight)
            onChange(e)
            return
        }
        onChange(e)
    }

    return (
        <>
            {/* prettierignore  */}
            {row ? (
                <textarea
                    ref={instance}
                    name={name}
                    onKeyUp={handleInputChange}
                    placeholder={placeholder}
                    rows={row}
                    spellCheck={spellCheck}
                    autoComplete={autoComplete}
                    autoCorrect={autoCorrect}
                ></textarea>
            ) : (
                <textarea
                    ref={instance}
                    onKeyUp={handleInputChange}
                    name={name}
                    placeholder={placeholder}
                    spellCheck={spellCheck}
                    autoComplete={autoComplete}
                    autoCorrect={autoCorrect}
                ></textarea>
            )}
        </>
    )
}

export { TextAreaLarge }
