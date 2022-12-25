import { useRef, useEffect, useState } from "react"

function setStyles(content, options) {
    if (options.left) {
        content.current.style.setProperty("left", options.left)
    }
    if (options.top) {
        content.current.style.setProperty("--Top", options.top)
    }
    if (options.right) {
        content.current.style.setProperty("right", options.right)
    }
    if (options.bottom) {
        content.current.style.setProperty("bottom", options.bottom)
    }
    if (options.animationDuration) {
        content.current.style.setProperty(
            "--transition-duration",
            options.animationDuration,
        )
    }
    if (options.startCoordinateX) {
        content.current.style.setProperty(
            "--starting-point-Xcor",
            options.startCoordinateX,
        )
    }
    if (options.startCoordinateY) {
        content.current.style.setProperty(
            "--starting-point-Ycor",
            options.startCoordinateY,
        )
    }
    if (options.endCoordinateX) {
        content.current.style.setProperty(
            "--ending-point-Xcor",
            options.endCoordinateX,
        )
    }
    if (options.endCoordinateY) {
        content.current.style.setProperty(
            "--ending-point-Ycor",
            options.endCoordinateY,
        )
    }

    // if (options.boxShadow === false) {
    // 	content.current.style.setProperty('box-shadow', 'none')
    // }
}

function Dropdown({
    button,
    onDropped,
    identifier = "",
    btnParentClass = "",
    items = [],
    jsxContent = undefined,
    options = {
        left: null,
        top: null,
        right: null,
        bottom: null,
        animationDuration: null,
        startCoordinateY: null,
        endCoordinateY: null,
        startCoordinateX: null,
        endCoordinateX: null,
    },
}) {
    const [isActive, setActive] = useState(false)
    const content = useRef(identifier)

    useEffect(() => {
        // setStyles()
        if (!isActive) return
        document.addEventListener("click", awaitExitEvent)

        setStyles(content, options)

        return () => document.removeEventListener("click", awaitExitEvent)

        // eslint-disable-next-line
    }, [isActive])

    function awaitExitEvent({ target }) {
        const currentDropdown = target.closest("[data-dropdown]")
        if (!currentDropdown) {
            setActive(false)
            return
        }
        document
            .querySelectorAll("[data-dropdown].active")
            .forEach((dropdown) => {
                if (dropdown === currentDropdown) return
                dropdown.classList.remove("active")
            })
    }

    function toggleDropDown() {
        if (!onDropped === undefined) {
            console.log(onDropped)
            // onDropped()
        }
        setActive((prev) => !prev)
    }

    function handleItemClicked(ev, item) {
        item.onClicked(ev)
        setActive(false)
    }

    return (
        <span
            id={identifier}
            data-dropdown
            className={isActive ? " dropdown active" : "dropdown"}
        >
            <span className={btnParentClass} onClick={toggleDropDown}>
                {button}
            </span>
            <div ref={content} className="dropdown-menu border">
                {items.map((item, idx) => (
                    <span key={idx}>
                        {item && (
                            <div
                                className="dropdown-item"
                                onClick={(ev) => handleItemClicked(ev, item)}
                            >
                                <span>{item.text}</span>
                                <span>{item.icon}</span>
                            </div>
                        )}
                    </span>
                ))}
                {!!isActive && (
                    <>
                        {!items.length && !!jsxContent && (
                            <div className="dropdown-item_">{jsxContent}</div>
                        )}
                    </>
                )}
            </div>
        </span>
    )
}

export default Dropdown
