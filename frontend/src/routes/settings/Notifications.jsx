import React, { useContext, useEffect, useRef } from "react"
import { useState } from "react"
import { GlobalContext } from "../../App"
import Textarea from "../../features/TextArea"

export default function Notifications() {
    const context = useContext(GlobalContext)
    const instance = useRef("public-profile")

    function handleProfileChange() {}

    return (
        <div className="d-flex flex-column width-100" ref={instance}>
            <div className="input-field border p-1">
                <span>Default notifications email</span>
                <p className="typography font-sm">
                    Choose where you'd like emails to be sent. You can add more
                    email addresses. Use custom routes to specify different
                    email addresses to be used for individual organizations.
                </p>
                <div className="mt-__ d-flex gap-1-rem">
                    <select name="" id="" className="">
                        <option value="default">admin@admin.com</option>
                    </select>
                    <div className="flat-card border" data-field>
                        Custom routing
                    </div>
                </div>
            </div>
        </div>
    )
}
