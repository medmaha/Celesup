import "./styles.css"
import { useContext, useEffect, useRef } from "react"
import { useState } from "react"
import PublicProfile from "./PublicProfile"
import Account from "./Account"
import Appearance from "./Appearance"
import Accessibility from "./Accessibility"
import Notifications from "./Notifications"

export default function Settings() {
    const settingMenu = useRef("settingMenu")

    const [state, setState] = useState({
        component: <PublicProfile />,
        title: "Public Profile",
    })

    function setActiveState(ev) {
        const element = ev.target
        element.parentNode.querySelectorAll("li").forEach((elem) => {
            elem.classList.remove("active")
        })
        element.classList.add("active")

        setRenderState(element, setState)
    }

    return (
        <div
            ref={settingMenu}
            className="px-__  d-flex justify-content-center pb-3 container"
        >
            <div
                className="mt-2 d-flex justify-content-center flex-column"
                id="settingWrapper"
            >
                <div
                    id="settingLinks"
                    className="minwidth-200-px shrink d-flex"
                >
                    <ul className="d-flex flex-column gap-5-px settingsLinks width-100">
                        <li
                            className="active"
                            data-state="profile"
                            onClick={setActiveState}
                        >
                            Public profile
                        </li>
                        <li
                            className=""
                            data-state="account"
                            onClick={setActiveState}
                        >
                            Account
                        </li>
                        <li
                            className=""
                            data-state="appearance"
                            onClick={setActiveState}
                        >
                            Appearance
                        </li>
                        <li
                            className=""
                            onClick={setActiveState}
                            data-state="accessibility"
                        >
                            Accessibility
                        </li>
                        <li
                            className=""
                            onClick={setActiveState}
                            data-state="notifications"
                        >
                            Notifications
                        </li>
                    </ul>
                </div>
                <div
                    id="settingMenu"
                    className="px-1 minwidth-350-px width-100"
                >
                    <div className="maxwidth-600-px">
                        <h3>
                            <b>{state.title}</b>
                        </h3>
                        <span className="divider"></span>
                        {state.component}
                    </div>
                </div>
            </div>
        </div>
    )
}

function setRenderState(element, setState) {
    switch (element.getAttribute("data-state")) {
        case "profile":
            return setState({
                component: <PublicProfile />,
                title: "Public Profile",
            })
        case "account":
            return setState({
                component: <Account />,
                title: "Account",
            })
        case "appearance":
            return setState({
                component: <Appearance />,
                title: "Theme preferences",
            })
        case "accessibility":
            return setState({
                component: <Accessibility />,
                title: "Accessibility",
            })
        case "notifications":
            return setState({
                component: <Notifications />,
                title: "Notifications",
            })

        default:
            break
    }
}
