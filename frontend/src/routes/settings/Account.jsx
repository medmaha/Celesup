import React, { useContext, useEffect, useRef } from "react"
import { useState } from "react"
import { GlobalContext } from "../../App"
import { celesupApi } from "../../axiosInstances"
import Textarea from "../../features/TextArea"
import useAxiosRequest from "../../hooks/useAxiosRequest"

export default function Account() {
    const context = useContext(GlobalContext)
    const instance = useRef("public-profile")

    const [data, pending, error, sendRequest] = useAxiosRequest()

    const [account, setAccount] = useState({})

    useEffect(() => {
        return () => getOrUpdateAccount()
    }, [])

    useEffect(() => {
        if (!data) return

        setAccount({
            ...account,
            ...data,
        })
    }, [data])

    async function handleEmailPrivacy() {
        const form = new FormData()
        form.append("email_privacy", !account.email_privacy)

        await getOrUpdateAccount({ method: "PUT", form: form })
    }

    async function handleAddingEmail(ev) {
        ev.preventDefault()
        const form = new FormData()
        const email = ev.currentTarget.querySelector("#new_email")

        let computed = false

        if (!account.email_3) {
            if (!account.email_2) {
                form.append("email_2", email.value)
                computed = true
            } else {
                if (email.value === (account.email || account.email_2)) {
                    // ! TODO an error occurred
                    alert("email already exist")
                } else {
                    form.append("email_3", email.value)
                    computed = true
                }
            }
        } else {
            // ! TODO an error occurred
            alert("You've reached the max email length")
        }

        if (computed) {
            await getOrUpdateAccount({
                url: "profile/account",
                method: "PUT",
                form: form,
            })
        }

        email.value = ""
    }

    async function getOrUpdateAccount(o = {}) {
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
            {!!account.email && (
                <div
                    className="d-flex flex-column width-100"
                    ref={instance}
                    id="Account"
                >
                    <div className="input-field width-100">
                        <div style={{ padding: "2px .250rem" }}>
                            <b>Username</b>
                        </div>
                        <button className="btn_ card m-0" data-field>
                            Change username
                        </button>

                        <p
                            className="typography font-sm"
                            style={{ padding: "2px .250rem" }}
                        >
                            Changing your username can have unintended side
                            effects.
                        </p>
                    </div>
                    <div className="mb-0 input-field width-100 pt-3">
                        <h3>
                            {"* "}
                            Emails
                        </h3>
                        <span className="divider"></span>

                        <div className="border mt-__ br-sm minheight-100-px p-__ d-flex flex-column">
                            {/* Emails */}
                            <span>
                                {account.emails?.map((email) => {
                                    return (
                                        <span key={email.email}>
                                            <div className="d-flex align-items-center justify-content-between gap-10-px">
                                                <div className="d-flex align-items-center gap-10-px">
                                                    <div className="d-flex align-items-center gap-10-px">
                                                        <span>
                                                            {email.email}
                                                        </span>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-5-px">
                                                        {email.is_primary && (
                                                            <>
                                                                <span>-</span>
                                                                <span className="green-text font-md">
                                                                    {email.is_primary && (
                                                                        <>
                                                                            Primary
                                                                        </>
                                                                    )}
                                                                </span>
                                                                <span className="height-fit-content text-muted">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        style={{
                                                                            width: "19px",
                                                                            height: "19px",
                                                                        }}
                                                                    >
                                                                        <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                                                                    </svg>
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <span className="icon-wrapper">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 92 92"
                                                            style={{
                                                                width: "14px",
                                                                height: "14px",
                                                            }}
                                                        >
                                                            <path
                                                                d="M78.4,30.4l-3.1,57.8c-0.1,2.1-1.9,3.8-4,3.8H20.7c-2.1,0-3.9-1.7-4-3.8l-3.1-57.8
                                            c-0.1-2.2,1.6-4.1,3.8-4.2c2.2-0.1,4.1,1.6,4.2,3.8l2.9,54h43.1l2.9-54c0.1-2.2,2-3.9,4.2-3.8C76.8,26.3,78.5,28.2,78.4,30.4z
                                            M89,17c0,2.2-1.8,4-4,4H7c-2.2,0-4-1.8-4-4s1.8-4,4-4h22V4c0-1.9,1.3-3,3.2-3h27.6C61.7,1,63,2.1,63,4v9h22C87.2,13,89,14.8,89,17z
                                            M36,13h20V8H36V13z M37.7,78C37.7,78,37.7,78,37.7,78c2,0,3.5-1.9,3.5-3.8l-1-43.2c0-1.9-1.6-3.5-3.6-3.5c-1.9,0-3.5,1.6-3.4,3.6
                                            l1,43.3C34.2,76.3,35.8,78,37.7,78z M54.2,78c1.9,0,3.5-1.6,3.5-3.5l1-43.2c0-1.9-1.5-3.6-3.4-3.6c-2,0-3.5,1.5-3.6,3.4l-1,43.2
                                            C50.6,76.3,52.2,78,54.2,78C54.1,78,54.1,78,54.2,78z"
                                                            />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>

                                            <ul
                                                className="text-muted pl-1"
                                                style={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {email.email ===
                                                    account.public_email &&
                                                    !account.email_privacy && (
                                                        <li
                                                            style={{
                                                                listStyle:
                                                                    "disc",
                                                            }}
                                                        >
                                                            <span className="d-flex align-items-center gap-5-px">
                                                                <span>
                                                                    Visible in
                                                                    public
                                                                </span>
                                                                <span>
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        style={{
                                                                            width: "16px",
                                                                            height: "16px",
                                                                        }}
                                                                    >
                                                                        <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                                                                    </svg>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    )}
                                                {email.email ===
                                                    (account.primary_email ||
                                                        account.email) && (
                                                    <li
                                                        style={{
                                                            listStyle: "disc",
                                                        }}
                                                    >
                                                        <span className="d-flex align-items-center gap-5-px">
                                                            <span>
                                                                Receives
                                                                notifications
                                                            </span>
                                                            <span>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    style={{
                                                                        width: "16px",
                                                                        height: "16px",
                                                                    }}
                                                                >
                                                                    <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                                                                </svg>
                                                            </span>
                                                        </span>
                                                    </li>
                                                )}
                                            </ul>
                                        </span>
                                    )
                                })}
                            </span>
                        </div>
                        <div className="input-field width-fit-content flex-row gap-1">
                            <label htmlFor="email_privacy">
                                <b>Keep my email address private</b>
                            </label>
                            <input
                                type="checkbox"
                                checked={account.email_privacy}
                                id="email_privacy"
                                onChange={handleEmailPrivacy}
                            />
                        </div>
                        <div className="input-field maxwidth-400-px">
                            <label htmlFor="new_email">Add email address</label>
                            {!account.email_3 && (
                                <form
                                    className="d-flex align-items-center gap-10-px"
                                    onSubmit={handleAddingEmail}
                                >
                                    <input
                                        type="email"
                                        id="new_email"
                                        placeholder="Email address"
                                    />
                                    <button
                                        className="card py-__"
                                        data-field
                                        style={{
                                            padding: "13px 1rem",
                                        }}
                                    >
                                        Add
                                    </button>
                                </form>
                            )}
                        </div>
                        <div className="input-field p-__ border">
                            <h3 className="text-color ">Note!</h3>
                            <p className="typography font-sm">
                                {account.email_privacy &&
                                    "Because you have email privacy enabled"}
                                <span className="text-secondary">
                                    {account.email || account.primary_email}
                                </span>{" "}
                                will be used for account-related notifications
                                as well as password resets
                            </p>
                        </div>
                    </div>

                    <div className="input-field mb-0 pt-3">
                        <h3 className="">{"* "}Change password</h3>
                        <span className="divider"></span>

                        <div className="">
                            <div className="input-field maxwidth-400-px">
                                <label htmlFor="old_password">
                                    <b>Old password</b>
                                </label>
                                <input type="password" id="old_password" />
                            </div>
                            <div className="input-field maxwidth-400-px">
                                <label htmlFor="new_password">
                                    <b>New password</b>
                                </label>
                                <input type="password" id="new_password" />
                            </div>
                            <div className="input-field maxwidth-400-px">
                                <label htmlFor="confirm_new_password">
                                    <b>Confirm new password</b>
                                </label>
                                <input
                                    type="password"
                                    id="confirm_new_password"
                                />
                            </div>
                            <div className="input-field mt-0">
                                <p className="typography font-sm">
                                    Make sure it's at least 15 characters OR at
                                    least 8 characters including a number and a
                                    lowercase letter.{" "}
                                    <span className="primary-color">
                                        Learn more
                                    </span>
                                </p>
                                <div className="d-flex align-items-center mt-__ gap-1">
                                    <div className="btn py-1" data-field>
                                        Update password
                                    </div>
                                    <div className="font-sm">
                                        <span className="cursor-pointer">
                                            Forgot your password?
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="inpit-field pt-3">
                        <h3>Danger Zone</h3>
                        <span className="divider"></span>
                        <div className="d-flex white-text pt-__">
                            <div className="invalid-bg center width-100 py-1 br-md">
                                Delete Account
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
