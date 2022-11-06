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
    callBack,
    children,
    options = { maxHeight: false },
}) {
    const instance = useRef()

    useEffect(() => {
        if (options.maxHeight) {
            instance.current.style.height = "100%"
        }
    }, [])
    return (
        <div className="modal__wrapper">
            <div className="modal__content">
                <div ref={instance} className="__modal card p-0 border">
                    <div className="modal__header d-flex justify-content-between align-items-center px-__">
                        <div className="d-flex gap-2 align-items-center">
                            <span
                                className="font-lg cursor-pointer on-text-hover-red"
                                onClick={() => callBack(true, undefined)}
                            >
                                &times;
                            </span>
                            <span>
                                <b>{title}</b>
                            </span>
                        </div>
                        <div className="d-flex">
                            <button
                                className="btn br-md"
                                onClick={() => callBack(undefined, true)}
                            >
                                {action}
                            </button>
                        </div>
                    </div>
                    <div className="__content">{children}</div>
                </div>
            </div>
        </div>
    )
}
