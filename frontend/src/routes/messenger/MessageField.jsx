import { useState, useEffect, useRef } from "react"
import { celesupApi } from "../../axiosInstances"
import Textarea from "../../features/TextArea"

export default function MessageField({
    activeThread,
    getMessages,
    chatSocket,
}) {
    const wrapperRef = useRef()

    function sendMessage(value, callback) {
        if (!value.length) return

        const form = new FormData()

        form.append("thread", activeThread.id)
        form.append("recipient", activeThread.recipient.id)
        form.append("body", value.trim())

        celesupApi
            .post("/messages/create", form, {
                headers: { "content-type": "application/json" },
            })
            .then((res) => {
                // chatSocket.send(
                //     JSON.stringify({ type: "chat", message: value.trim() }),
                // )
                getMessages()
                callback()
                // if (wrapperRef.current)
                //     wrapperRef.current.querySelector("textarea").value = ""
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div ref={wrapperRef} className="width-100">
            <Textarea
                placeholder={"Write your message!"}
                onSubmit={(value, callback) => sendMessage(value, callback)}
            />
        </div>
    )
}
