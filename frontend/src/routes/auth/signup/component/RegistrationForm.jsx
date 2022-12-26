import React from "react"
import PasswordField from "./passwordField"

export default function RegistrationForm({
    submitForm,
    handleFormChange,
    updateFormData,
}) {
    return (
        <form
            className="px-__ d-flex flex-column align-items-center width-100"
            data-auth-form
            onSubmit={submitForm}
        >
            <div className="py-__ d-flex flex-column gap-5-px">
                <label htmlFor="email">Email</label>
                <input
                    className="br-md"
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                    autoComplete="off"
                    onChange={handleFormChange}
                />
            </div>
            <div className="py-__ d-flex flex-column gap-5-px">
                <label htmlFor="username">Username</label>
                <input
                    className="br-md"
                    required
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    autoComplete="Off"
                    onChange={handleFormChange}
                />
            </div>

            <PasswordField
                id="password1"
                name={"password1"}
                label="Password"
                placeholder="password"
                updateFormData={updateFormData}
            />

            <PasswordField
                id="password2"
                name={"password2"}
                label="Confirm password"
                placeholder="confirm password"
                updateFormData={updateFormData}
            />
            <div className="right pt-__">
                <button className="btn-large">Submit</button>
            </div>
        </form>
    )
}
