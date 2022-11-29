import ThemeExample from "./themeExample"

import ThemeBubble from "./themeBubble"
import { useState } from "react"

const activeClassBg = {
    backgroundColor: "rgba(13, 75, 185, .4)",
}
const activeClassBorder = {
    border: "1px solid rgba(13, 75, 185, .4)",
}

export default function ThemeModeWrapper({ theme }) {
    //
    const [currentTheme, setCurrentTheme] = useState(
        document.body.classList.contains("light-mode")
            ? "light-mode"
            : "dark-mode",
    )
    const [isActive, setActive] = useState(currentTheme === theme.class)

    function handleThemeChange(ev, cb) {
        setCurrentTheme(toggleTheme())
    }

    return (
        <div
            style={isActive ? activeClassBorder : {}}
            className={`${
                !theme.active && "border"
            } bg-neutral br-sm overflow-hidden width-100 minwidth-150-px maxwidth-250-px pb-1 d-block`}
        >
            <div
                style={isActive ? activeClassBg : {}}
                className="p-1 d-flex justify-content-between"
            >
                <div className="d-flex gap-5-px align-items-center justify-content-between width-100">
                    <div className="d-flex gap-5-px align-items-center">
                        <span>
                            {theme.class === "dark-mode" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <g>
                                        <path d="M0,0h24v24H0V0z" fill="none" />
                                    </g>
                                    <g>
                                        <g>
                                            <g>
                                                <path d="M14,2c1.82,0,3.53,0.5,5,1.35C16.01,5.08,14,8.3,14,12s2.01,6.92,5,8.65C17.53,21.5,15.82,22,14,22C8.48,22,4,17.52,4,12 S8.48,2,14,2z" />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 2048 2048"
                                >
                                    <path d="M960 384q119 0 224 45.5T1367 553t123.5 183 45.5 224-45.5 224-123.5 183-183 123.5-224 45.5-224-45.5T553 1367t-123.5-183T384 960t45.5-224T553 553t183-123.5T960 384zm0 128q-93 0-174.5 35.5t-142 96-96 142T512 960q0 85 30 161 38 16 79 23.5t83 7.5q93 0 174.5-35t142.5-96 96-142.5 35-174.5q0-42-7.5-83t-23.5-79q-77-30-161-30zm64-256H896V0h128v256zM896 1664h128v256H896v-256zm1024-768v128h-256V896h256zM256 1024H0V896h256v128zm161-517L236 326l90-90 181 181zm1086 906l181 181-90 90-181-181zm-1086 0l90 90-181 181-90-90zm1086-906l-90-90 181-181 90 90z" />
                                </svg>
                            )}
                        </span>
                        <span>{theme.label}</span>
                    </div>
                    {!!isActive && (
                        <div title="active theme">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 92 92"
                            >
                                <path
                                    d="M34.4,72c-1.2,0-2.3-0.4-3.2-1.3L11.3,50.8c-1.8-1.8-1.8-4.6,0-6.4c1.8-1.8,4.6-1.8,6.4,0l16.8,16.7
                                l39.9-39.8c1.8-1.8,4.6-1.8,6.4,0c1.8,1.8,1.8,4.6,0,6.4l-43.1,43C36.7,71.6,35.6,72,34.4,72z"
                                />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
            {!theme.active && (
                <span
                    style={{
                        padding: "0",
                        margin: "0",
                    }}
                    className="divider"
                ></span>
            )}

            <p className="font-sm text-muted p-1">
                This theme will be active when your system is set to “
                {theme.class.split("-")[0]} mode”
            </p>
            <ThemeExample theme={theme} />
            <div className="d-flex mt-__ mx-1 justify-content-center gap-1-rem">
                {theme.bubbles?.map((bubble) => {
                    return (
                        <div
                            key={bubble.id}
                            style={{
                                width: "2.5rem",
                                height: "2.5rem",
                                border: bubble.bc,
                            }}
                            onClick={(ev) => {
                                handleThemeChange(ev, bubble.onClick)
                            }}
                            className="cursor-pointer overflow-hidden br-full border d-flex justify-content-center align-items-center"
                        >
                            <ThemeBubble bubble={bubble} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function toggleTheme() {
    let theme = localStorage.getItem("theme")
    if (!theme) {
        document.body.classList.add("light-mode")
        return ""
    }
    if (theme === "light-mode") {
        document.body.classList.toggle("light-mode")
        document.body.classList.toggle("dark-mode")
        localStorage.setItem("theme", "dark-mode")
        return "dark-mode"
    }
    document.body.classList.toggle("dark-mode")
    document.body.classList.toggle("light-mode")
    localStorage.setItem("theme", "light-mode")
    return "light-mode"
}
