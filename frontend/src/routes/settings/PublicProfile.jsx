import React, { useContext, useEffect, useRef } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GlobalContext } from "../../App"
import Textarea from "../../features/TextArea"
import useAxiosRequest from "../../hooks/useAxiosRequest"

export default function PublicProfile() {
    const context = useContext(GlobalContext)
    const instance = useRef("public-profile")
    const navigate = useNavigate()
    const [profile, setProfile] = useState({})

    const [data, pending, error, sendRequest] = useAxiosRequest()

    useEffect(() => {
        return () => getAccountData()
    }, [])

    useEffect(() => {
        if (!data) return
        setProfile({
            ...profile,
            ...data,
        })
    }, [data])

    function handleProfileChange(ev) {}

    function handlePublicEmail(ev) {
        const value = ev.target.value

        if (value === "null") return

        const form = new FormData()
        form.append("public_email", value)

        getAccountData({ method: "PUT", form: form })
    }

    async function getAccountData(o = {}) {
        const options = {
            url: "profile/account",
            method: "GET",
            form: {},
            ...o,
        }
        await sendRequest({
            url: options.url,
            method: options.method,
            form: options.form,
        })
    }

    return (
        <>
            {!!profile.email && (
                <div className="d-flex flex-column width-100" ref={instance}>
                    <div className="input-field width-100">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="full_name"
                            id="name"
                            value={
                                profile.first_name + " " + profile.last_name ||
                                ""
                            }
                            onChange={handleProfileChange}
                        />
                        <p className="typography font-sm">
                            Your name may appear around Celesup where you
                            contribute or are mentioned. You can remove it at
                            any time.
                        </p>
                    </div>
                    <div className="input-field">
                        <label htmlFor="public_email">Public email</label>
                        <select
                            id="public_email"
                            disabled={profile.email_privacy}
                            onChange={handlePublicEmail}
                        >
                            {profile.public_email && !profile.email_privacy ? (
                                <option value={profile.public_email}>
                                    {profile.public_email}
                                </option>
                            ) : (
                                <option value={"null"}>
                                    Select a verified email to display
                                </option>
                            )}
                            {profile.emails?.map((email) => (
                                <option key={email.email} value={email.email}>
                                    {email.email}
                                </option>
                            ))}
                        </select>
                        <p className="typography font-sm">
                            Set up a public email address.
                            {profile.email_privacy && (
                                <>
                                    You have to turn off email private, To
                                    toggle email privacy, go to email settings
                                    and uncheck "Keep my email address private.
                                </>
                            )}
                        </p>
                    </div>
                    <div className="input-field">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="city/location"
                            value={profile.city || ""}
                            onChange={handleProfileChange}
                        />
                        <p className="typography font-sm">
                            Select a verified email to display You have set your
                            email address to private.
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
                            value={profile.biography}
                        />
                        <p className="typography font-sm">
                            You can @mention other users and organizations to
                            link to them.
                        </p>
                    </div>
                    <div className="input-field">
                        <span htmlFor="edit">
                            <b>Update profile images</b>
                        </span>
                        <Link
                            to={"/" + context.user.username.toLowerCase()}
                            state="Edit Profile"
                        >
                            <div className="flat-card border mt-__" data-field>
                                Change Avatar/Cover
                            </div>
                        </Link>
                    </div>
                    <div className="input-field p-__ border">
                        <h3 className="text-color ">Note!</h3>
                        <p className="typography font-sm">
                            All of the fields on this page are optional and can
                            be deleted at any time, and by filling them out,
                            you're giving us consent to share this data wherever
                            your user profile appears. Please see our{" "}
                            <span className="blue-text">privacy statement</span>{" "}
                            to learn more about how we use this information.
                        </p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="btn-large center">Update Profile</div>
                    </div>
                </div>
            )}
        </>
    )
}
