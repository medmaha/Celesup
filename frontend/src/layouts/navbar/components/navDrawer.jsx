import { useEffect, useState } from "react"

const NavDrawerWrapper = () => {
    const [isActive, setActive] = useState()

    useEffect(() => {
        document
            .querySelector("nav .nav-drawer-toggler")
            .addEventListener("click", toggleDrawer)
        return () =>
            document
                .querySelector("nav .nav-drawer-toggler")
                .removeEventListener("click", toggleDrawer)
    })

    useEffect(() => {}, [isActive])

    function toggleDrawer() {
        setActive((prev) => !prev)
    }

    return (
        <div
            className={`nav-drawer-container ${isActive && "active"}`}
            id="navDrawerContainer"
        >
            <div className="nav-drawer">
                <div className="nav-drawer-exit" onClick={toggleDrawer}>
                    &times;
                </div>
            </div>
        </div>
    )
}

export default NavDrawerWrapper
