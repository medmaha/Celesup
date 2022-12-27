import "./styles.css"
import { useContext, useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { GlobalContext } from "../../App"
import {
    celesupApi,
    celesupAuthApi,
    CELESUP_BASE_URL,
} from "../../axiosInstances"

import "./components/styles.css"
import Dropdown from "../../features/Dropdown"
import SearchBar from "./components/searchBar"
import NavDrawerWrapper from "./components/navDrawer"
import NavLinks from "./components/navLinks"
import { UseCookie } from "../../hooks/useCookie"
import { updateModes } from "../../redux/app"

const Navbar = () => {
    const navbar = useRef()
    const [navbarDropdown, setNavDropDown] = useState(false)
    const [isDropDown, setDropDown] = useState(false)
    const [onlineStatus, setOnlineStatus] = useState(false)

    const navigate = useNavigate()
    const context = useContext(GlobalContext)
    const params = useParams()
    const cookie = UseCookie()
    function toggleNavDropdown() {}

    // useEffect(() => {
    // 	context.supcelLibrary.SearchBarToggler().init()
    // }, [])
    function brand() {
        if (window.location.pathname === "/") {
            window.location.reload()
        } else {
            window.location.href = `/`
        }
    }

    function dropdown(drop) {
        // setDropDown((prev) => !prev)
        // context.setFocusState({
        // 	...context.state,
        // 	dropDown: !drop,
        // })
        toggleNavDropdown()
    }

    function toggleTheme() {
        let theme = localStorage.getItem("theme")
        if (!theme) return
        if (theme === "light-mode") {
            document.body.classList.toggle("light-mode")
            document.body.classList.toggle("dark-mode")
            localStorage.setItem("theme", "dark-mode")
            return
        }
        document.body.classList.toggle("dark-mode")
        document.body.classList.toggle("light-mode")
        localStorage.setItem("theme", "light-mode")
    }

    function userAccount() {
        navigate(`/${context.user.username.toLowerCase()}`)
    }

    function logoutUser() {
        if (cookie.get("acid")) {
            logoutCookie()
            return
        }

        celesupApi
            .post(
                "/logout/user/tokens",
                { refresh: localStorage.getItem("atr") },
                { headers: { "content-type": "application/json" } },
            )
            .then((res) => {
                if (res.status === 200) {
                    localStorage.removeItem("ata")
                    localStorage.removeItem("atr")
                    context.updateTokens({
                        dispatch: true,
                    })
                }
            })
    }

    async function logoutCookie() {
        cookie.erase("acid")
        await celesupAuthApi
            .post("/verify/email", { "logout-cookie": true })
            .then(
                (res) => {
                    // window.location.reload()
                },
                (err) => {},
            )
            .catch((err) => {})
            .finally(navigate("/login"))
    }

    return (
        <nav ref={navbar} className="fixed left-0">
            <div className="container justify-content-between pos-relative">
                <span className="nav-drawer-toggler">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
                    </svg>
                </span>
                <h1 onClick={() => brand()} className="nav-brand">
                    <span className="brand-icon">
                        {/* Celesup Logo */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                        >
                            <g id="surface154173640">
                                <path
                                    style={{
                                        stroke: "none",
                                        fillRule: "nonzero",
                                        fill: "rgb(36.862746%,89.803922%,76.862746%)",
                                        fillOpacity: "1",
                                    }}
                                    d="M 37 36 L 17 36 C 14.238281 36 12 33.761719 12 31 L 12 11 C 12 8.238281 14.238281 6 17 6 L 37 6 C 39.761719 6 42 8.238281 42 11 L 42 31 C 42 33.761719 39.761719 36 37 36 Z M 21 30 L 35 30 L 35 18.5 C 35 15.460938 32.539062 13 29.5 13 L 18 13 L 18 27 C 18 28.65625 19.34375 30 21 30 Z M 21 30 "
                                />
                                <path
                                    style={{
                                        stroke: "none",
                                        fillRule: "nonzero",
                                        fill: "rgb(10.196079%,73.725492%,61.176473%)",
                                        fillOpacity: "1",
                                    }}
                                    d="M 31 42 L 11 42 C 8.238281 42 6 39.761719 6 37 L 6 17 C 6 14.238281 8.238281 12 11 12 L 31 12 C 33.761719 12 36 14.238281 36 17 L 36 37 C 36 39.761719 33.761719 42 31 42 Z M 17.5 36 L 30 36 L 30 21 C 30 19.34375 28.65625 18 27 18 L 15 18 C 13.34375 18 12 19.34375 12 21 L 12 30.5 C 12 33.539062 14.460938 36 17.5 36 Z M 17.5 36 "
                                />
                                <path
                                    style={{
                                        stroke: "none",
                                        fillRule: "nonzero",
                                        fill: "rgb(36.862746%,89.803922%,76.862746%)",
                                        fillOpacity: "1",
                                    }}
                                    d="M 36 26 L 36 27 C 36 28.65625 34.65625 30 33 30 L 23 30 L 23 36 L 37 36 C 39.75 36 42 33.75 42 31 L 42 26 Z M 36 26 "
                                />
                            </g>
                        </svg>
                    </span>
                    <span className="brand-name">Celesup</span>
                </h1>
                {!!context.user && <SearchBar />}

                {!!context.user && <NavLinks />}
                {/* {!context.user && !context.moods.verification && (
                    <ul className="nav-links">
                        {/* <li className="link" onClick={() => navigate("/login")}>
                            <button className="btn">Log in</button>
                        </li>
                        <li
                            className="link"
                            onClick={() => navigate("/signup")}
                        >
                            Sign up
                        </li>
                    </ul>
                )} */}

                {context.moods.verification && context.dummy && (
                    <ul className="nav-links px-2">
                        <li className="">
                            <b>@{context.dummy.username}</b>
                        </li>
                        <li
                            className="link"
                            // onClick={() => navigate("/signup")}
                        >
                            <button className="red btn" onClick={logoutUser}>
                                Logout
                            </button>
                        </li>
                    </ul>
                )}

                {!!context.user && (
                    <Dropdown
                        button={
                            <div
                                data-dropdown-button
                                className="nav-profile pos-relative"
                                title={`${
                                    context.user.full_name?.toUpperCase() ||
                                    context.user.username.toUpperCase()
                                } \nStatus: ${
                                    onlineStatus ? "Online" : "Offline"
                                }`}
                            >
                                <img
                                    crossOrigin="anonymous"
                                    className=""
                                    src={CELESUP_BASE_URL + context.user.avatar}
                                    alt=""
                                />
                                {onlineStatus && (
                                    <span
                                        className="online__status pos-absolute left-1-rem  bottom-neg-5-px width-1-rem height-2-px lime"
                                        style={{ backgroundColor: "lime" }}
                                    ></span>
                                )}
                            </div>
                        }
                        items={[
                            // { text: 'Profile', icon:<h1>Hello</>},
                            {
                                text: (
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="profile-img">
                                            <img
                                                crossOrigin="anonymous"
                                                src={
                                                    CELESUP_BASE_URL +
                                                    context.user.avatar
                                                }
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                ),
                                icon: (
                                    <div className="typography">
                                        <span className="d-block center font-sm">
                                            {context.user.full_name ||
                                                context.user.username}
                                        </span>
                                        <h3>
                                            <strong>
                                                {context.user.first_name}{" "}
                                                {context.user.last_name}
                                            </strong>
                                        </h3>
                                    </div>
                                ),
                                onClicked: userAccount,
                            },
                            {
                                text: "Status",
                                icon: `${onlineStatus ? "Online" : "Offline"}`,
                                onClicked: () => {
                                    setOnlineStatus((prev) => !prev)
                                },
                            },
                            {
                                text: "Profile",
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z" />
                                    </svg>
                                ),
                                onClicked: userAccount,
                            },
                            {
                                text: "Settings",
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        data-name="Layer 1"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19.9,12.66a1,1,0,0,1,0-1.32L21.18,9.9a1,1,0,0,0,.12-1.17l-2-3.46a1,1,0,0,0-1.07-.48l-1.88.38a1,1,0,0,1-1.15-.66l-.61-1.83A1,1,0,0,0,13.64,2h-4a1,1,0,0,0-1,.68L8.08,4.51a1,1,0,0,1-1.15.66L5,4.79A1,1,0,0,0,4,5.27L2,8.73A1,1,0,0,0,2.1,9.9l1.27,1.44a1,1,0,0,1,0,1.32L2.1,14.1A1,1,0,0,0,2,15.27l2,3.46a1,1,0,0,0,1.07.48l1.88-.38a1,1,0,0,1,1.15.66l.61,1.83a1,1,0,0,0,1,.68h4a1,1,0,0,0,.95-.68l.61-1.83a1,1,0,0,1,1.15-.66l1.88.38a1,1,0,0,0,1.07-.48l2-3.46a1,1,0,0,0-.12-1.17ZM18.41,14l.8.9-1.28,2.22-1.18-.24a3,3,0,0,0-3.45,2L12.92,20H10.36L10,18.86a3,3,0,0,0-3.45-2l-1.18.24L4.07,14.89l.8-.9a3,3,0,0,0,0-4l-.8-.9L5.35,6.89l1.18.24a3,3,0,0,0,3.45-2L10.36,4h2.56l.38,1.14a3,3,0,0,0,3.45,2l1.18-.24,1.28,2.22-.8.9A3,3,0,0,0,18.41,14ZM11.64,8a4,4,0,1,0,4,4A4,4,0,0,0,11.64,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,11.64,14Z" />
                                    </svg>
                                ),
                                onClicked: () => {
                                    navigate("/settings")
                                },
                            },
                            {
                                text: "Logout",
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z" />
                                    </svg>
                                ),
                                onClicked: logoutUser,
                            },
                            {
                                text: "Help",
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M11.29,15.29a1.58,1.58,0,0,0-.12.15.76.76,0,0,0-.09.18.64.64,0,0,0-.06.18,1.36,1.36,0,0,0,0,.2.84.84,0,0,0,.08.38.9.9,0,0,0,.54.54.94.94,0,0,0,.76,0,.9.9,0,0,0,.54-.54A1,1,0,0,0,13,16a1,1,0,0,0-.29-.71A1,1,0,0,0,11.29,15.29ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM12,7A3,3,0,0,0,9.4,8.5a1,1,0,1,0,1.73,1A1,1,0,0,1,12,9a1,1,0,0,1,0,2,1,1,0,0,0-1,1v1a1,1,0,0,0,2,0v-.18A3,3,0,0,0,12,7Z" />
                                    </svg>
                                ),
                                // onClicked: togglePostDropdownMenu,
                            },
                        ]}
                        options={{
                            onDropped: () => {
                                console.log("called")
                                context.setFocusState(null)
                            },
                            identify: "navbarDropdown",
                            right: "0",
                        }}
                    />
                )}
            </div>
            {/* navigation drawer */}
            <NavDrawerWrapper />
        </nav>
    )
}

export default Navbar
