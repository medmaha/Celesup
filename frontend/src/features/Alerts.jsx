import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updateModes } from "../redux/app"

export default function Alerts({ type, message }) {
    const [colors, setColors] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        switch (type) {
            case "error":
                setColors({ text: "white-text", bg: "invalid-bg" })
                break

            case "success":
                setColors({ text: "black-text", bg: "success-bg" })
                break

            case "info":
                setColors({ text: "", bg: "bg-secondary" })
                break

            default:
                break
        }
        const timeout = setTimeout(deActivate, 5000)
        return () => clearTimeout(timeout)
    }, [])

    function deActivate() {
        dispatch(
            updateModes({
                errorMessage: null,
                successMessage: null,
                infoMessage: null,
            }),
        )
    }

    return (
        <div className="pos-absolute top-0 left-0 width-100 d-flex justify-content-center typography">
            <div
                className={`
                ${colors.bg} ${colors.text}
                minheight-2-rem width-80 d-flex align-items-center
                py-1 br-sm justify-content-center`}
            >
                {message}
            </div>
        </div>
    )
}
