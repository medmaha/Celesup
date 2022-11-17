import React, { useContext, useEffect, useRef } from "react"
import { useState } from "react"
import { GlobalContext } from "../../App"
import ThemeExample from "./subComponents/themeExample"
import ThemeModeWrapper from "./subComponents/themeModeWrapper"

import { celesupThemes } from "./themes"

export default function Appearance() {
    const context = useContext(GlobalContext)
    const instance = useRef("public-profile")

    const [theme, setTheme] = useState("system")

    return (
        <div className="d-flex flex-column width-100" ref={instance}>
            <div className="input-field">
                <p className="typography minwidth-200-px">
                    Choose how Celesup looks to you. Select a single theme, or
                    sync with your system and automatically switch between day
                    and night themes.
                </p>
            </div>
            <div className="input-field">
                <label htmlFor="theme-mode">Theme mode</label>
                <div className="d-flex flex-wrap align-items-center gap-1-rem">
                    <select
                        name=""
                        id="theme-mode"
                        onChange={(ev) => {
                            setTheme(ev.target.value)
                        }}
                    >
                        <option value="system">Sync with system</option>
                        <option value="custom">Single theme</option>
                    </select>
                    {theme === "system" && (
                        <p className="font-sm text-muted">
                            Celesup theme will match your system active settings
                        </p>
                    )}
                    {theme === "custom" && (
                        <p className="font-sm text-muted">
                            Celesup will use your selected theme
                        </p>
                    )}
                </div>
            </div>

            <div className="d-flex justify-content-center mt-2 flex-wrap gap-1-rem">
                {celesupThemes[theme]?.collections?.map((item) => (
                    <>
                        {theme === "system" && (
                            <span key={item.id}>
                                <ThemeModeWrapper theme={item} />
                            </span>
                        )}
                        {theme === "custom" && (
                            <span key={item.id}>
                                <ThemeExample theme={item} single={true} />
                            </span>
                        )}
                    </>
                ))}
            </div>
        </div>
    )
}
