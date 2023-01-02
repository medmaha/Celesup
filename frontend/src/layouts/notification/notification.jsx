import React, { useEffect, useState } from "react"

import { celesupApi } from "../../axiosInstances"

import useAxiosRequest from "../../hooks/useAxiosRequest"
import NotificationItem from "./NotificationItem"

const Notification = ({ context }) => {
    const [response, pending, error, sendAxiosRequest] = useAxiosRequest()
    const [notifications, setNotifications] = useState({ new: [], old: [] })

    useEffect(() => {
        getNotifications()
        return () => {
            console.log("closed")
            if (context.activeLink === "notification") {
                // context.storeDispatch(
                //     context.updateActiveLink({ data: "home" }),
                // )
            }
        }
    }, [])

    useEffect(() => {
        if (!notifications) return
        sendNotificationView()
    }, [notifications])

    useEffect(() => {
        if (!response) return
        setNotifications({
            new: response.new,
            old: response.old,
        })
        // eslint-disable-next-line
    }, [response])

    function getNotifications() {
        sendAxiosRequest({
            axiosInstance: celesupApi,
            method: "GET",
            url: "/notifications",
        })
    }

    function sendNotificationView() {
        let computed = false
        notifications.new?.map(async (notification) => {
            const form = new FormData()
            if (!notification.is_viewed) {
                form.append("notification-pk", notification.id)
                await viewed(form)
                computed = true
            }
        })
        if (computed) {
            context.updateUserTokens()
        }

        async function viewed(form) {
            //     await celesupApi
            //         .put("/notifications/viewed", form, {
            //             headers: { "Content-type": "application/json" },
            //         })
            //         .then(
            //             () => {},
            //             () => {},
            //         )
            //         .catch(() => {})
            //         .finally()
        }
    }

    return (
        <div className="d-flex flex-column gap-5-px px-__ overflow-hidden overflow-y-auto minwidth-300-px maxheight-500-px">
            {!!notifications && (
                <NotificationsWrapper notifications={notifications} />
            )}
            {!!!notifications.new.length && !!!notifications.old.length && (
                <div
                    className="d-flex width-100 justify-content-center align-items-center"
                    style={{
                        height: "5rem",
                    }}
                >
                    <p className="typography">
                        You don't have notification yet
                    </p>
                </div>
            )}
        </div>
    )
}

function NotificationsWrapper({ notifications }) {
    function item(idx, notification, map) {
        return (
            <span key={notification.id}>
                <NotificationItem
                    map={map}
                    notification={notification}
                    idx={idx}
                />
            </span>
        )
    }

    return (
        <>
            {!!notifications.new.length && (
                <h5 className="typography mb-1">New Notifications</h5>
            )}
            {notifications.new?.map((notification, idx) => {
                return item(idx, notification, notifications.new)
            })}
            {!!notifications.old.length && (
                <h5 className="typography mt-1">Old Notifications</h5>
            )}
            {notifications.old?.map((notification, idx) => {
                return item(idx, notification, notifications.new)
            })}
        </>
    )
}

export default Notification
