import { useContext, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { GlobalContext } from "../../../App"
import Dropdown from "../../../features/Dropdown"
import { updateModes } from "../../../redux/app"
import Notification from "../../notification/notification"

const NavLinks = () => {
    const navigate = useNavigate()
    const context = useContext(GlobalContext)
    const [openNotificationPanel, setNotificationPanel] = useState(false)

    const dispatch = useDispatch()

    function homepage() {
        context.setFocusState({})
        window.scrollTo({ top: 0 })
        navigate(`/`)
    }

    function exploreRoute() {
        navigate("/explore")
    }

    function composePost() {
        // context.setFocusState({
        // ...context.state,
        // createPost: !context.state?.createPost,
        // })
        dispatch(updateModes({ createPost: "form" }))
    }

    function toggleNotificationPanel(e) {
        if (
            openNotificationPanel &&
            e.target.closest("section[data-notification]")
        )
            return
        setNotificationPanel((prev) => !prev)
        context.setFocusState({
            ...context.state,
            notificationPanel: !context.state.notificationPanel,
        })
    }

    function gotoChats() {
        navigate("/messager")
    }
    return (
        <ul className="nav-links ">
            <li className="link home d-flex" title="Home">
                <Link to={"/"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 2048 2048"
                    >
                        <path d="M1024 165l941 942-90 90-83-82v805h-640v-640H896v640H256v-805l-83 82-90-90zm640 1627V987l-640-640-640 640v805h384v-640h512v640h384z" />
                    </svg>
                </Link>
            </li>
            <li
                className="link create-post d-flex"
                onClick={() => composePost()}
                title="Create"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M200 344V280H136C122.7 280 112 269.3 112 256C112 242.7 122.7 232 136 232H200V168C200 154.7 210.7 144 224 144C237.3 144 248 154.7 248 168V232H312C325.3 232 336 242.7 336 256C336 269.3 325.3 280 312 280H248V344C248 357.3 237.3 368 224 368C210.7 368 200 357.3 200 344zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z" />
                </svg>
            </li>
            <li className="link explore d-flex" title="Discover">
                <Link to={"/explore"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path d="M306.7 325.1L162.4 380.6C142.1 388.1 123.9 369 131.4 349.6L186.9 205.3C190.1 196.8 196.8 190.1 205.3 186.9L349.6 131.4C369 123.9 388.1 142.1 380.6 162.4L325.1 306.7C321.9 315.2 315.2 321.9 306.7 325.1V325.1zM255.1 224C238.3 224 223.1 238.3 223.1 256C223.1 273.7 238.3 288 255.1 288C273.7 288 288 273.7 288 256C288 238.3 273.7 224 255.1 224V224zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
                    </svg>
                </Link>
            </li>

            <li className="link create-post d-flex" title="Video">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12zm-5-6l-7 4V7z" />
                </svg>
            </li>
            <li
                className="link notifications"
                onClick={toggleNotificationPanel}
            >
                <Dropdown
                    identifier="notificationPanel"
                    btnParentClass=" pos-relative"
                    jsxContent={<Notification context={context} />}
                    button={
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path d="M256 32V49.88C328.5 61.39 384 124.2 384 200V233.4C384 278.8 399.5 322.9 427.8 358.4L442.7 377C448.5 384.2 449.6 394.1 445.6 402.4C441.6 410.7 433.2 416 424 416H24C14.77 416 6.365 410.7 2.369 402.4C-1.628 394.1-.504 384.2 5.26 377L20.17 358.4C48.54 322.9 64 278.8 64 233.4V200C64 124.2 119.5 61.39 192 49.88V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32V32zM216 96C158.6 96 112 142.6 112 200V233.4C112 281.3 98.12 328 72.31 368H375.7C349.9 328 336 281.3 336 233.4V200C336 142.6 289.4 96 232 96H216zM288 448C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288z" />
                            </svg>
                            {!!context.user?.has_alerts && (
                                <span className="notification__notifier pos-absolute top-0 right-3-px badge width-10-px height-10-px br-full red"></span>
                            )}
                        </>
                    }
                    options={{
                        onDropped: () => {
                            console.log("called")
                        },
                    }}
                />
            </li>
            <li className="link chats pos-relative" title="Chats">
                <Link to={"/messenger"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path d="M447.1 0h-384c-35.25 0-64 28.75-64 63.1v287.1c0 35.25 28.75 63.1 64 63.1h96v83.98c0 9.836 11.02 15.55 19.12 9.7l124.9-93.68h144c35.25 0 64-28.75 64-63.1V63.1C511.1 28.75 483.2 0 447.1 0zM464 352c0 8.75-7.25 16-16 16h-160l-80 60v-60H64c-8.75 0-16-7.25-16-16V64c0-8.75 7.25-16 16-16h384c8.75 0 16 7.25 16 16V352z" />
                    </svg>
                    {!!context.user?.has_message && (
                        <span className=" pos-absolute top-0 right-0 badge width-10-px height-10-px br-full blue"></span>
                    )}
                </Link>
            </li>
        </ul>
    )
}

export default NavLinks
