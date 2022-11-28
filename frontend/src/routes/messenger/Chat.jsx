import React, { useState } from "react"
import DateTime from "../../hooks/getDateTime"

export default function Chat({ message, context }) {
    const Date = new DateTime(message.created_at)
    return (
        <>
            {message.sender.id === context.user?.id ? (
                <div className="host d-flex width-100 align-items-center justify-content-right">
                    <div className="time py-__">
                        <span>
                            <small className="text-muted font-sm">
                                {Date.format()}
                            </small>
                        </span>
                    </div>
                    <div className="ml-1">
                        <p
                            className="typography theme-primary center maxwidth-350-px font-md br-md right"
                            style={{
                                padding: "2px 7px 3px 7px",
                            }}
                        >
                            {message.body}
                        </p>
                    </div>
                    <div className=" ml-__ width-fit-content">
                        <div className="profile-img border br-full">
                            <img
                                crossOrigin="anonymous"
                                src={message.sender.avatar}
                                alt="author"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="client d-flex width-100 align-items-center justify-content-left">
                    <div className="client pr-__ width-fit-content">
                        <div className="profile-img border br-full">
                            <img
                                crossOrigin="anonymous"
                                src={message.recipient.avatar}
                                alt="author"
                            />
                        </div>
                    </div>

                    <div className="mr-1">
                        <p
                            className="typography maxwidth-350-px font-md grey br-md left"
                            style={{
                                padding: "2px 7px 3px 7px",
                            }}
                        >
                            {message.body}
                        </p>
                    </div>
                    <div className="time py-__">
                        <span>
                            <small className="text-muted font-sm">
                                {Date.format()}
                            </small>
                        </span>
                    </div>
                </div>
            )}
        </>
    )
}
