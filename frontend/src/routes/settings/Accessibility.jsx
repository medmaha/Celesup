import React, { useContext, useEffect, useRef } from "react"
import { useState } from "react"
import { GlobalContext } from "../../App"
import Textarea from "../../features/TextArea"

export default function Accessibility() {
    const context = useContext(GlobalContext)
    const instance = useRef("public-profile")

    function handleProfileChange() {}

    return (
        <div className="d-flex flex-column width-100" ref={instance}>
            <div className="input-field width-100">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="full_name"
                    id="name"
                    value={context.user.full_name}
                    onChange={handleProfileChange}
                />
                <p className="typography font-sm">
                    Your name may appear around Celesup where you contribute or
                    are mentioned. You can remove it at any time.
                </p>
            </div>
            <div className="input-field">
                <label htmlFor="email">Public email</label>
                <input
                    type="email"
                    name="public_email"
                    placeholder="email address"
                    value={context.user.public_email || ""}
                    onChange={handleProfileChange}
                />
                <p className="typography font-sm">
                    Select a verified email to display You have set your email
                    address to private. To toggle email privacy, go to email
                    settings and uncheck "Keep my email address private.
                </p>
            </div>
            <div className="input-field">
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    name="city"
                    placeholder="city/location"
                    value={context.user.city || ""}
                    onChange={handleProfileChange}
                />
                <p className="typography font-sm">
                    Select a verified email to display You have set your email
                    address to private.
                </p>
            </div>
            <div className="input-field">
                <label htmlFor="biography">Bio</label>
                <Textarea
                    onSubmit={(value) => {}}
                    onChange={handleProfileChange}
                    name="biography"
                    id="biography"
                    placeholder="biography"
                    value={context.user.biography}
                />
                <p className="typography font-sm">
                    You can @mention other users and organizations to link to
                    them.
                </p>
            </div>
            <div className="input-field p-__ border">
                <h3 className="text-color ">Note!</h3>
                <p className="typography font-sm">
                    All of the fields on this page are optional and can be
                    deleted at any time, and by filling them out, you're giving
                    us consent to share this data wherever your user profile
                    appears. Please see our{" "}
                    <span className="blue-text">privacy statement</span> to
                    learn more about how we use this information.
                </p>
            </div>
            <div className="d-flex justify-content-center">
                <div className="btn-large center">Update Profile</div>
            </div>
        </div>
    )
}
