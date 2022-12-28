import React, { useEffect } from "react"
import { CELESUP_BASE_URL } from "../../axiosInstances"
import DateTime from "../../hooks/getDateTime"

export default function NotificationItem({ idx, notification, map }) {
    const DATETIME = new DateTime(notification.created_at)

    useEffect(() => {
        console.log(notification)
    }, [])
    return (
        <>
            <div className="d-flex align-items-center height-100 py-__">
                <div className="width-fit-content br-full">
                    <img
                        src={`${notification.sender.avatar}`}
                        alt="notification sender"
                        crossOrigin="anonymous"
                        className="br-full border cursor-pointer width-50-px height-50-px"
                    />
                </div>
                <div className="d-flex gap-1-rem ml-__ width-100">
                    <div className="d-flex flex-column gap-5-px justify-content-evenly width-100">
                        <div className="d-flex justify-content-between align-items-center width-90">
                            <span className="cursor-pointer font-md">
                                {notification.sender.username}
                            </span>
                            <span className="text-muted font-sm">
                                {DATETIME.format()}
                            </span>
                        </div>

                        <span
                            className="d-inline-block"
                            style={{
                                fontSize: ".9rem",
                            }}
                        >
                            {notification.action}
                        </span>
                        {notification.hint && (
                            <div
                                className="d-flex gap-3-px"
                                style={{ paddingTop: "5px" }}
                            >
                                <span className="">"</span>
                                <span
                                    className="d-inline-block typography font-sm center"
                                    style={{ color: "var(--secondary)" }}
                                >
                                    {notification.hint}
                                </span>
                                <span className="text-secondary_">"</span>
                            </div>
                        )}
                    </div>
                    {notification.hint_img && (
                        <div
                            className="d-flex cursor-pointer align-items-center"
                            style={{ alignSelf: "flex-end" }}
                        >
                            <div
                                className="overflow-hidden d-block"
                                style={{
                                    borderRadius: "2px",
                                    boxShadow:
                                        "0 0 3px 0 var(--textMutedColor--)",
                                }}
                            >
                                <img
                                    src={
                                        CELESUP_BASE_URL + notification.hint_img
                                    }
                                    crossOrigin="anonymous"
                                    // width="60px"
                                    height="60px"
                                    alt="notification hint"
                                    style={{
                                        objectFit: "contain",
                                        transform: "scale(1.1)",
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {map[idx + 1] && <span className="divider"></span>}
        </>
    )
}
