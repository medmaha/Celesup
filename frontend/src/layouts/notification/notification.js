import React, { useEffect, useState } from "react"
import { celesupApi, CELESUP_BASE_URL } from "../../axiosInstances"

import useAxiosRequest from "../../hooks/useAxiosRequest"

const Notification = ({ context }) => {
    const [response, pending, error, sendAxiosRequest] = useAxiosRequest()

    const [notifications, setNotifications] = useState({ new: [], old: [] })
    const hook = useAxiosRequest()

    useEffect(() => {
        sendAxiosRequest({
            axiosInstance: celesupApi,
            method: "GET",
            url: "/notifications",
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!response) return

        setNotifications({
            new: response.new,
            old: response.old,
        })
        // eslint-disable-next-line
    }, [response])

    useEffect(() => {
        if (!notifications) return

        notifications.new?.map(async (notification) => {
            const form = new FormData()
            form.append("notification-pk", notification.pk)
            return await viewed(form)
        })

        async function viewed(form) {
            hook[3]({
                axiosInstance: celesupApi,
                method: "PUT",
                url: "/notifications/viewed",
                form: form,
                options: {
                    headers: { "Content-type": "application/json" },
                },
            })
        }
        // eslint-disable-next-line
    }, [notifications])

    return (
        <div className="pos-absolute top-100 right-neg-1-rem">
            <div
                style={{ cursor: "auto" }}
                className="notifications__wrapper p-0 flat-card minwidth-350-px minheight-100-px border border-3"
            >
                {/* <p>Note that the development build is not optimized. To create a production build, use npm run build.</p> */}
                <section data-notification className="py-1 px-__ ">
                    <ul className="d-flex flex-column">
                        {!!notifications.new.length && (
                            <h4 className="theme-secondary-text">
                                <b>New Notifications</b>
                                <span className="divider"></span>
                            </h4>
                        )}
                        {notifications.new?.map((notification, idx) => {
                            return (
                                <span key={idx}>
                                    {!notifications.new.is_viewed && (
                                        <>
                                            <li className="notification d-flex align-items-center height-100 minheight-50-px">
                                                <img
                                                    width={50}
                                                    height={50}
                                                    src={
                                                        CELESUP_BASE_URL +
                                                        `${notification.sender.avatar}`
                                                    }
                                                    alt=""
                                                    className="br-full border cursor-pointer"
                                                />
                                                <div className="d-flex flex-column gap-1 cursor-pointer ml-__">
                                                    <span className="notification__hint">
                                                        {
                                                            notification.sender
                                                                .username
                                                        }
                                                    </span>
                                                    <span
                                                        className="notification__hint"
                                                        style={{
                                                            fontSize: ".9rem",
                                                        }}
                                                    >
                                                        {notification.hint}
                                                    </span>
                                                    <small className="notification__content text-muted height-25-px overflow-hidden">
                                                        {notification.content}
                                                    </small>
                                                </div>
                                            </li>
                                            {!idx !==
                                                notifications.new.length -
                                                    1 && (
                                                <span className="divider"></span>
                                            )}
                                        </>
                                    )}
                                </span>
                            )
                        })}

                        {notifications.new.length > 5 && (
                            <span className="d-flex justify-content-right theme-secondary-text">
                                <small style={{ textDecoration: "underline" }}>
                                    View More
                                </small>
                            </span>
                        )}

                        {pending && <h5>Loading</h5>}

                        {!pending && !notifications.new.length && !error && (
                            <span className="center mt-1">
                                You Don't have no new notification
                            </span>
                        )}

                        {/* OLD NOTIFICATIONS */}

                        {!!notifications.old.length && (
                            <h4
                                className={`theme-secondary-text ${
                                    notifications.new.length ? "mt-1" : "mt-2 "
                                }`}
                            >
                                <b>Old Notifications</b>
                                <span className="divider"></span>
                            </h4>
                        )}
                        {notifications.old?.map((notification, idx) => {
                            return (
                                <span key={idx}>
                                    <li className="notification d-flex align-items-center height-100 minheight-50-px">
                                        <img
                                            width={50}
                                            height={50}
                                            src={
                                                CELESUP_BASE_URL +
                                                `${notification.sender.avatar}`
                                            }
                                            alt=""
                                            className="br-full border cursor-pointer"
                                        />
                                        <div className="d-flex flex-column gap-1 cursor-pointer ml-__">
                                            <span className="notification__hint">
                                                {notification.sender.username}
                                            </span>
                                            <span
                                                className="notification__hint"
                                                style={{
                                                    fontSize: ".9rem",
                                                }}
                                            >
                                                {notification.hint}
                                            </span>
                                            <small className="notification__content text-muted height-25-px overflow-hidden">
                                                {notification.content}
                                            </small>
                                        </div>
                                    </li>
                                    {!idx !== notifications.old.length - 1 && (
                                        <span className="divider"></span>
                                    )}
                                </span>
                            )
                        })}

                        {!!notifications.old.length && (
                            <span className="d-flex justify-content-right theme-secondary-text">
                                <small style={{ textDecoration: "underline" }}>
                                    View More
                                </small>
                            </span>
                        )}
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default Notification
