import "./profileUpdateForm.css"
import React, { useState } from "react"
import ProfileImages from "./profileImages"

// prettier-ignore
export default function ProfileUpdateForm({profile, editProfileImages ,readOnly,}) {

    const [formData, setFormData] = useState({
        full_name: profile.full_name,
        biography: profile.biography
    })

    function handleFormChange(ev){
        setFormData({
            ...formData,
            [ev.target.name] : ev.target.value
        })
        console.log(formData);
    }

    function handleFormSubmit(ev) {
        console.log('submit');
    }
    return (
        <form onSubmit={handleFormSubmit} className="edit__profile">
            <div
                className="form__header d-flex justify-content-between align-items-center px-__"
            >
                <div className="d-flex gap-2 align-items-center">
                    <span className="font-lg cursor-pointer on-text-hover-red">
                        &times;
                    </span>
                    <span>
                        <b>Edit profile</b>
                    </span>
                </div>
                <div className="d-flex">
                    <button className="btn br-md">Save</button>
                </div>
            </div>
            <div className="pt-3">
                <ProfileImages
                    profile={profile}
                    editProfileImages={editProfileImages}
                    readOnly={readOnly}
                />
            </div>

            {/* form fields */}
            <div className="mt-2 pt-__ form__fields p-1">
                <div className="input-field">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="full_name"
                        id="name"
                        onChange={handleFormChange}
                        value={formData.full_name}
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        id="bio"
                        name="biography"
                        onChange={handleFormChange}
                        value={formData.biography}
                    ></textarea>
                </div>
                <div className="input-field">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                </div>
                <div className="input-field">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                </div>
            </div>
        </form>
    )
}
