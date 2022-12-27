import "./styles.css"
import { useEffect, useState } from "react"
import Modal from "../../features/Modal"
import ProgressBar from "../../features/ProgressBar"
import ChatThreads from "./ChatThreads"
import MessengingHeader from "./MessengingHeader"
import ChatBox from "./ChatBox"
import ComposeMessage from "./ComposeMessage"
import useWebSocketHook from "../../hooks/useWebSocketHook"
import { useContext } from "react"
import { GlobalContext } from "../../App"

export default function Messenger() {
    const context = useContext(GlobalContext)
    const [compose, setCompose] = useState(false)
    const [activeThread, setActiveThread] = useState(null)
    const [mobileView, setMobileView] = useState({ state: false })
    const { initWebSocket, socket: chatSocket } = useWebSocketHook()

    // useEffect(() => {
    //     if (!context.user) return

    //     initWebSocket({
    //         url: `/ws/chat/threads?id=${context.user.id}`,
    //         onMessage: (ev) => {
    //             console.log(ev)
    //         },
    //         onError: (ev) => {},
    //         onConnect: (ev) => {},
    //         onDisconnect: (ev) => {},
    //     })
    // }, [context])

    useEffect(() => {
        if (window.outerWidth <= 670) {
            setMobileView({
                ...mobileView,
                state: true,
            })
        } else {
            setMobileView({
                ...mobileView,
                state: false,
            })
        }
    }, [])

    useEffect(() => {
        // todo
    }, [activeThread])

    function newMessage() {
        setCompose(true)
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center mx-__"
            id="Messenger"
        >
            {!!compose && (
                <Modal
                    title={"New message"}
                    action={"Next"}
                    children={
                        <ComposeMessage
                            setCompose={setCompose}
                            setActiveThread={setActiveThread}
                        />
                    }
                    callBack={(exit, data) => {
                        if (exit) {
                            setCompose(false)
                        }
                    }}
                    options={{ maxHeight: true }}
                />
            )}

            <div className="container mt-1 card p-0 d-flex justify-content-center">
                <div className="row width-100 __messenger justify-content-center">
                    {!mobileView.state && (
                        <div className="col-4-sm chats__box">
                            <MessengingHeader
                                composeMessage={newMessage}
                                mobileView={mobileView}
                            />
                            <span className="divider"></span>
                            <ChatThreads
                                activeThread={activeThread}
                                setActiveThread={setActiveThread}
                            />
                        </div>
                    )}
                    {mobileView.state && !activeThread && (
                        <div className="col-4-sm chats__box">
                            <MessengingHeader
                                composeMessage={newMessage}
                                mobileView={mobileView}
                            />
                            <span className="divider"></span>
                            <ChatThreads
                                activeThread={activeThread}
                                setActiveThread={setActiveThread}
                            />
                        </div>
                    )}

                    {!mobileView.state && (
                        <div className="col-8-sm messages__box height-100">
                            <ChatBox
                                activeThread={activeThread}
                                composeMessage={newMessage}
                                mobileView={mobileView}
                                setActiveThread={setActiveThread}
                                chatSocket={chatSocket}
                            />
                        </div>
                    )}
                    {mobileView.state && activeThread && (
                        <div className="col-8-sm messages__box height-100">
                            <ChatBox
                                activeThread={activeThread}
                                composeMessage={newMessage}
                                mobileView={mobileView}
                                setActiveThread={setActiveThread}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
