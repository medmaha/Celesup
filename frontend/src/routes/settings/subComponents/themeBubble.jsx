import React from "react"

export default function ThemeBubble({ bubble }) {
    return (
        <div className="d-flex flex-wrap width-100 height-100">
            <div
                className="width-50 height-50"
                style={{
                    backgroundColor: bubble.bg,
                }}
            ></div>
            <div
                className="width-50 height-50"
                style={{
                    backgroundColor: bubble.pr,
                }}
            ></div>
            <div
                className="width-50 height-50"
                style={{
                    backgroundColor: bubble.sec,
                }}
            ></div>
            <div
                className="width-50 height-50"
                style={{
                    backgroundColor: bubble.crd,
                }}
            ></div>
        </div>
    )
}
