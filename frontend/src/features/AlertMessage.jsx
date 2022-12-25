import { useRef } from "react"

export default function AlertMessage({ asError, asSuccess, message }) {
    const alertWrapper = useRef()

    if (asError)
        return (
            <div
                ref={alertWrapper}
                className={`alert-msg z-index-1-plus px-__ m-0`}
            >
                <p className="p-__ center invalid-text br-md d-flex flex-column gap-2-px m-0">
                    <span className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                        </svg>
                    </span>
                    <span>{message}</span>
                </p>
            </div>
        )

    if (asSuccess)
        return (
            <div ref={alertWrapper} className={`alert-msg my-__`}>
                <p className="p-__ center success-text br-md mx-1">{message}</p>
            </div>
        )
}
