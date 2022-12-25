import React from "react"
import Thread from "./Thread"
import { useEffect, useState } from "react"
import { celesupApi } from "../../axiosInstances"

export default function ChatThreads({ activeThread, setActiveThread }) {
    const [threads, setThreads] = useState([])

    useEffect(() => {
        getThreads()
    }, [activeThread])

    function getThreads() {
        celesupApi
            .get("/threads")
            .then((res) => {
                setThreads(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function selectThread(ev, thread) {
        // console.log(ev.currentTarget)
        const threadWrapper = ev.target.closest(".individual__chats_wrapper")
        threadWrapper.querySelector(".chat.active")?.classList.remove("active")
        ev.currentTarget.querySelector(".chat").classList.add("active")
        setActiveThread(thread)
    }

    return (
        <div className="individual__chats_wrapper d-flex flex-column">
            {threads?.map((thread, idx) => {
                return (
                    <div
                        className="width-100 height-fit-content"
                        key={thread.id}
                        onClick={(ev) => selectThread(ev, thread)}
                    >
                        <Thread thread={thread} idx={idx} />
                    </div>
                )
            })}
        </div>
    )
}
