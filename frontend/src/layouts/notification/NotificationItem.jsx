import React from "react"

export default function NotificationItem({ notification }) {
    return (
        <div
            className="d-flex align-items-center width-100 height-100"
            style={{ maxWidth: "600px" }}
        >
            <div className="width-fit-content br-full">
                <img
                    src={`${notification.sender.avatar}`}
                    alt="notification sender"
                    className="br-full border cursor-pointer width-50-px height-50-px"
                />
            </div>
            <div className="d-flex flex-column gap-1 ml-__ width-100">
                <div className="d-flex justify-content-between align-items-center">
                    <span className="cursor-pointer ">
                        {notification.sender.username}
                    </span>
                    <span className="text-muted">
                        <small>
                            {
                                notification.created_at?.split("T")[0]
                                // .split(".")[0]
                            }
                        </small>
                    </span>
                </div>
                <div className=" d-flex gap-5-px flex-wrap cursor-pointer ">
                    <span
                        className=""
                        style={{
                            fontSize: ".9rem",
                        }}
                    >
                        {notification.action}
                    </span>
                    <span
                        className=""
                        style={{
                            fontSize: ".9rem",
                        }}
                    >
                        "{notification.hint}"
                    </span>
                </div>
            </div>
        </div>
    )
}
