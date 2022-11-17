import React, { useState } from "react"

export default function Chat({ message, context }) {
    return (
        <div>
            {message.sender.id === context.user?.id ? (
                <div className="host d-flex width-100 align-items-center justify-content-right">
                    <div className="time py-__">
                        <span>
                            <small>{message.created_at?.split("T"[0])}</small>
                        </span>
                    </div>
                    <div className="time ml-1">
                        <p className="typography maxwidth-350-px font-md theme-primary p-__ br-md minwidth-100-px right">
                            {message.body}
                        </p>
                    </div>
                    <div className=" ml-__ width-fit-content">
                        <div className="profile-img border br-full">
                            <img src={message.sender.avatar} alt="author" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="client d-flex width-100 align-items-center justify-content-left">
                    <div className="client mr-__ width-fit-content">
                        <div className="profile-img border br-full">
                            <img src={message.recipient.avatar} alt="author" />
                        </div>
                    </div>

                    <div className="time mr-1">
                        <p className="typography maxwidth-350-px font-md grey p-__ br-md minwidth-100-px left">
                            {message.body}
                        </p>
                    </div>
                    <div className="time py-__">
                        <span>
                            <small>{message.created_at?.split("T"[0])}</small>
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
