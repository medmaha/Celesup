// export default function Modal({ header, children }) {
//     return (
//         <div className="modal__wrapper">
//             <div className="modal__content">
//                 <div className="__modal card p-0 border">
//                     <div>{children}</div>
//                 </div>
//             </div>
//         </div>
//     )
// }

import { useEffect, useRef } from "react"

export default function Modal({
    title,
    action,
    callBack = (exit = Boolean, data = Boolean) => {},
    children,
    options = {},
}) {
    const instance = useRef()
    const OPTIONS = {
        maxHeight: undefined,
        maxWidth: undefined,
        setHeader: undefined,
        ...options,
    }

    useEffect(() => {
        if (OPTIONS.maxHeight) {
            instance.current.style.setProperty(
                "--modal-body-height",
                "var(--modal-wrapper-height)",
            )
        }
        if (OPTIONS.maxWidth) {
            instance.current.style.setProperty(
                "--modal-body-width",
                "var(--modal-body-widthMAX)",
            )
        }
    }, [])

    useEffect(() => {
        document.body.style.setProperty("overflow", "hidden")
        return () => {
            document.body.style.setProperty("overflow-y", "auto")
        }
    }, [])
    return (
        <div className="modal__wrapper">
            <div className="modal__content">
                <div ref={instance} className="__modal card p-0 border">
                    {OPTIONS.setHeader ? (
                        <>{OPTIONS.setHeader}</>
                    ) : (
                        <div className="modal__header pull-content d-flex justify-content-between align-items-center px-__">
                            <div className="d-flex gap-2 align-items-center">
                                <button
                                    aria-label="Close Panel"
                                    className="font-lg cursor-pointer on-text-hover-red rm-default"
                                    onClick={() => callBack(true, undefined)}
                                >
                                    &times;
                                </button>
                                <span>
                                    <b>{title}</b>
                                </span>
                            </div>
                            <div className="d-flex">
                                <button
                                    aria-label="Next"
                                    className="btn br-md"
                                    onClick={() => callBack(undefined, true)}
                                >
                                    {action}
                                </button>
                            </div>
                        </div>
                    )}
                    {/* <span className="divider"></span> */}
                    <div className="__content">{children}</div>
                </div>
            </div>
        </div>
    )
}
