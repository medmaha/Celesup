import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../App"
import useAxiosRequest from "../../hooks/useAxiosRequest"
import Chat from "./Chat"
import MessageField from "./MessageField"

export default function ChatBox({
    activeThread,
    composeMessage,
    mobileView,
    setActiveThread,
    chatSocket,
}) {
    const context = useContext(GlobalContext)
    const [messages, setMessages] = useState(null)
    const [data, pending, error, sendRequest] = useAxiosRequest()

    useEffect(() => {
        if (!activeThread) return
        // setChatSocket(new WebSocket(webSocketURL + `?id=${activeThread.id}`))
    }, [activeThread])

    useEffect(() => {
        if (!data) return
        setMessages(data)
    }, [data])

    useEffect(() => {
        if (!activeThread) return
        getMessages()
    }, [activeThread])

    function getMessages() {
        sendRequest({
            url: `/messages?id=${activeThread.id}`,
            method: "GET",
        })
    }

    return (
        <>
            {!activeThread ? (
                <div className="d-flex flex-column height-100 width-100 justify-content-center align-items-center gap-1">
                    <h2>Select a message</h2>
                    <p className="typography maxwidth-400-px center">
                        Choose from your existing conversations, send private
                        photos and messages to a friend or group.
                    </p>
                    <button
                        className="btn-large br-md"
                        onClick={composeMessage}
                    >
                        New Message
                    </button>
                </div>
            ) : (
                <>
                    {!!activeThread && (
                        <div className=" d-flex flex-column width-100 height-100">
                            <div className=" p-__ d-flex gap-1 justify-content-between align-items-center">
                                <div className="d-flex gap-2 align-items-center">
                                    {!!mobileView.state && (
                                        <div className="">
                                            <span
                                                className="icon-wrapper"
                                                onClick={() =>
                                                    setActiveThread(null)
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 36 36"
                                                >
                                                    <path d="M30 16.5H11.74l8.38-8.38L18 6 6 18l12 12 2.12-2.12-8.38-8.38H30v-3z" />
                                                </svg>
                                            </span>
                                        </div>
                                    )}
                                    <div className="client br-full border profile-img-lg">
                                        <img
                                            src={activeThread.recipient.avatar}
                                            alt="client"
                                        />
                                    </div>
                                    <div className="">
                                        <h2>
                                            {activeThread.recipient.full_name ||
                                                activeThread.recipient.username}
                                        </h2>
                                    </div>
                                </div>
                                <div className="">
                                    <span className="font-lg cursor-pointer">
                                        ...
                                    </span>
                                </div>
                            </div>

                            {mobileView.state && (
                                <span
                                    className="divider"
                                    style={{ padding: "0", margin: "0" }}
                                ></span>
                            )}

                            <div className="height-100 p-1 overflow-hidden overflow-y-auto">
                                {messages?.map((message) => {
                                    return (
                                        <div
                                            key={message.id}
                                            className="mb-__ width-100"
                                        >
                                            <Chat
                                                message={message}
                                                context={context}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                            <span
                                className="divider"
                                style={{
                                    paddingBottom: "0",
                                    marginBottom: "0",
                                }}
                            ></span>
                            <div className="p-1">
                                <MessageField
                                    activeThread={activeThread}
                                    getMessages={getMessages}
                                    chatSocket={chatSocket}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}
