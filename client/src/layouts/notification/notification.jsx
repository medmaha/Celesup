import React, { useEffect, useState } from "react"
import { celesupApi, CELESUP_BASE_URL } from "../../axiosInstances"

import useAxiosRequest from "../../hooks/useAxiosRequest"
import NotificationItem from "./NotificationItem"

const Notification = ({ context }) => {
    const [response, pending, error, sendAxiosRequest] = useAxiosRequest()
    const [notifications, setNotifications] = useState({ new: [], old: [] })

    useEffect(() => {
        getNotifications()
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
            await celesupApi
                .put("/notifications/viewed", form, {
                    headers: { "Content-type": "application/json" },
                })
                .then(
                    () => {},
                    () => {},
                )
                .catch(() => {})
                .finally()
        }
    }

    return (
        <div className="">
            {!!notifications && (
                <NotificationsWrapper notifications={notifications} />
            )}
        </div>
    )
}

function NotificationsWrapper({ notifications }) {
    function item(notification) {
        return (
            <span key={notification.id}>
                <NotificationItem notification={notification} />
            </span>
        )
    }

    return (
        <>
            {!!notifications.new.length && (
                <h5 className="typography mb-1">New Notifications</h5>
            )}
            {notifications.new?.map((notification) => {
                return item(notification)
            })}
            {!!notifications.old.length && (
                <h5 className="typography mt-1">Old Notifications</h5>
            )}
            {notifications.old?.map((notification) => {
                return item(notification)
            })}
        </>
    )
}

export default Notification
