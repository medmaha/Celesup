import React from "react"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../App"
import { CELESUP_BASE_URL } from "../../axiosInstances"

export default function Thread({ thread }) {
    const context = useContext(GlobalContext)
    const [client, setClient] = useState(
        thread.author.id === context.user.id ? thread.recipient : thread.sender,
    )
    return (
        <div
            className={`chat d-flex gap-1 align-items-center width-100 justify-content-between`}
        >
            <div className="d-flex gap-1 align-items-center">
                <div className="width-fit-content">
                    <div className="client profile-img ml-__ width-50-px height-50-px br-full border">
                        <img
                            src={client.avatar}
                            className="border"
                            alt="chat author"
                        />
                    </div>
                </div>
                <div className="py-__  width-250-px flex-column d-flex gap-3-px">
                    <span className="username">
                        {client?.full_name || client.username}
                    </span>
                    <span className="last__chat">
                        <p className="">
                            <small>{thread.last_msg}</small>
                        </p>
                    </span>
                </div>
            </div>

            <div className="font-sm">
                <span>{thread.last_msg_date?.split("T")[0]}</span>
            </div>
        </div>
    )
}
