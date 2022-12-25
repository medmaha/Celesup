import React from "react"
import ReactDOM from "react-dom/client"
import AppWrapper from "./App"

import "./cssStyles/index.css"

const root = ReactDOM.createRoot(document.getElementById("root"))

// if (window.screen.width < 480) {
//     alert("checkout our mobile")
// }

root.render(
    <React.StrictMode>
        <AppWrapper />
    </React.StrictMode>,
)

if (localStorage.getItem("theme")) {
    let theme = localStorage.getItem("theme")
    document.body.classList.add(theme)
} else {
    localStorage.setItem("theme", "dark-mode")
    document.body.classList.add(localStorage.getItem("theme"))
}
