import React, { useState } from "react"
import { celesupApi, CELESUP_BASE_URL } from "../../../axiosInstances"
import Modal from "../../../features/Modal"

import "./profileUpdateForm.css"

export default function ProfileUpdateFormWrapper({
    profile,
    updateProfile,
    openModal,
}) {
    const [formData, setFormData] = useState({
        full_name: profile.full_name,
        biography: profile.biography,
        avatar: profile.avatar,
        cover: profile.cover_img,
        city: profile.city,
        gender: profile.gender,
    })

    async function handleFormSubmit(ev) {
        // ev.preventDefault()

        if (formData.full_name?.split(" ").length < 2) return

        const form = new FormData()
        form.append("profileId", profile.id)
        form.append("refreshToken", localStorage.getItem("refresh"))

        if (profile.avatar === formData.avatar) {
            delete formData["avatar"]
        }
        if (profile.cover_img === formData.cover) {
            delete formData["cover"]
        }

        for (const field in formData) {
            if (formData[field] && formData[field] !== profile[field]) {
                form.append(field, formData[field])
            }
        }

        await celesupApi
            .put("profile/edit", form, {
                headers: { "content-type": "multipart/form-data" },
            })
            .then((res) => {
                updateProfile(res.data)
            })
            .catch((err) => console.log(err))
    }
    return (
        <Modal
            action="Save"
            title="Edit profile"
            options={{ maxHeight: true }}
            children={
                <div className="edit__profile">
                    <form
                        style={{ maxHeight: "var(--modal-content-max-height)" }}
                        onSubmit={handleFormSubmit}
                        className=""
                        onKeyDown={(ev) => {
                            if (
                                ev.code === "Enter" &&
                                ev.target !==
                                    ev.target
                                        .closest("form")
                                        .querySelector("textarea#biography")
                            ) {
                                ev.preventDefault()
                            }
                        }}
                    >
                        <ProfileUpdateFormFields
                            formData={formData}
                            setFormData={setFormData}
                            ImageField={ProfileUpdateImagesFields}
                            GenderField={ProfileUpdateGenderField}
                        />
                    </form>
                </div>
            }
            callBack={async (exit, action) => {
                if (exit) {
                    openModal(false)
                } else if (action) {
                    await handleFormSubmit()
                    openModal(false)
                }
            }}

            // header={<FormHeader />}
        />
    )
}

function ProfileUpdateImagesFields({ formData }) {
    //
    function previewImage(element, fileInput, action) {
        const image = element
            .closest(".profile__images")
            ?.querySelector(`img.${action}`)

        if (fileInput.files[0] && image) {
            image.src = URL.createObjectURL(fileInput.files[0])
            formData[action] = fileInput.files[0]
        }
    }

    function changeProfileImage(ev) {
        if (
            ev.target.closest(".img__btn") ||
            ev.target.classList.contains("img__btn")
        ) {
            const target =
                ev.target.closest(".img__btn") ||
                ev.target.classList.contains("img__btn")
            if (!target) return

            const fileInput = document.createElement("input")
            fileInput.setAttribute("type", "file")

            switch (target.getAttribute("data-select-image")) {
                case "avatar":
                    fileInput.click()
                    fileInput.addEventListener("change", ({ target: file }) =>
                        previewImage(target, file, "avatar"),
                    )
                    break
                case "cover_img":
                    fileInput.click()
                    fileInput.addEventListener("change", ({ target: file }) =>
                        previewImage(target, file, "cover_img"),
                    )
                    break
                case "remove":
                    // fileInput.click()
                    // fileInput.addEventListener("change", ({ target }) =>
                    //     changeImage(target, "remove"),
                    // )
                    console.log("remove cover")
                    break

                default:
                    break
            }
        }
    }

    return (
        <>
            {!!formData && (
                <div className="profile__images pos-relative">
                    <div className="edit__cover">
                        <img
                            crossOrigin="anonymous"
                            className="cover_img"
                            src={formData.cover}
                            alt="cover"
                        />

                        {/* buttons */}
                        <div className="pos-absolute top-0 left-0 width-100 height-100 d-flex justify-content-center align-items-center">
                            <span
                                className="d-flex gap-2 height-100 width-100 align-items-center justify-content-center font-lg"
                                style={{
                                    backgroundColor: "rgba(0,0,0, 0.6)",
                                }}
                                onClick={changeProfileImage}
                            >
                                <span
                                    className="img__btn cursor-pointer br-full"
                                    title="remove photo"
                                    // onClick={changeProfileImage}
                                    data-select-image="remove"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                    </svg>
                                </span>
                                <span
                                    className="img__btn cursor-pointer br-full"
                                    title="add photo"
                                    // onClick={changeProfileImage}
                                    data-select-image="cover_img"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 92 92"
                                        style={{
                                            width: "23px",
                                            height: "23px",
                                        }}
                                    >
                                        <path
                                            id="XMLID_1160_"
                                            d="M46,27c-12.6,0-22.9,10.4-22.9,23.2c0,12.8,10.3,23.2,22.9,23.2s22.9-10.4,22.9-23.2
                                                C68.9,37.4,58.6,27,46,27z M46,65.5c-8.2,0-14.9-6.8-14.9-15.2S37.8,35,46,35s14.9,6.8,14.9,15.2S54.2,65.5,46,65.5z M57.1,51.2
                                                c-0.2,1.8-1.7,3-3.5,3c-0.2,0-0.3,0-0.5,0c-1.9-0.3-3.3-2-3-3.9c0.4-2.9-3-4.5-3.2-4.6c-1.7-0.8-2.5-2.9-1.7-4.6
                                                c0.8-1.7,2.8-2.5,4.6-1.8C53,40.7,58,44.7,57.1,51.2z M49.4,55.6c0.7,0.7,1.2,1.8,1.2,2.8c0,1-0.4,2.1-1.2,2.8
                                                c-0.8,0.7-1.8,1.2-2.8,1.2s-2.1-0.4-2.8-1.2c-0.7-0.8-1.2-1.8-1.2-2.8c0-1.1,0.4-2.1,1.2-2.8c0.8-0.8,1.8-1.2,2.8-1.2
                                                S48.7,54.8,49.4,55.6z M88,26H72.6l-4.3-16c-0.5-1.7-2.1-3-3.9-3H27.5c-1.8,0-3.4,1.3-3.9,3l-4.3,16H4c-2.2,0-4,1.7-4,3.9V81
                                                c0,2.2,1.8,4,4,4h84c2.2,0,4-1.8,4-4V29.9C92,27.7,90.2,26,88,26z M84,77H8V34h14.4c1.8,0,3.4-1.3,3.9-3l4.3-16h30.8l4.3,16
                                                c0.5,1.7,2.1,3,3.9,3H84V77z"
                                        />
                                    </svg>
                                </span>
                            </span>
                        </div>
                    </div>

                    {/* profile Image */}
                    <div data-field="avatar" className="edit__avatar br-full">
                        <div className="pos-relative height-100">
                            <img
                                src={formData.avatar}
                                className="avatar"
                                alt="avatar"
                                crossOrigin="anonymous"
                            />

                            <div
                                className="pos-absolute top-0 left-0 width-100 height-100 d-flex justify-content-center align-items-center"
                                style={{
                                    backgroundColor: "rgba(0,0,0, 0.6)",
                                }}
                            >
                                <span
                                    className="img__btn cursor-pointer br-full"
                                    title="add photo"
                                    data-select-image="avatar"
                                    onClick={changeProfileImage}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 92 92"
                                        style={{
                                            width: "23px",
                                            height: "23px",
                                        }}
                                    >
                                        <path
                                            id="XMLID_1160_"
                                            d="M46,27c-12.6,0-22.9,10.4-22.9,23.2c0,12.8,10.3,23.2,22.9,23.2s22.9-10.4,22.9-23.2
                                                C68.9,37.4,58.6,27,46,27z M46,65.5c-8.2,0-14.9-6.8-14.9-15.2S37.8,35,46,35s14.9,6.8,14.9,15.2S54.2,65.5,46,65.5z M57.1,51.2
                                                c-0.2,1.8-1.7,3-3.5,3c-0.2,0-0.3,0-0.5,0c-1.9-0.3-3.3-2-3-3.9c0.4-2.9-3-4.5-3.2-4.6c-1.7-0.8-2.5-2.9-1.7-4.6
                                                c0.8-1.7,2.8-2.5,4.6-1.8C53,40.7,58,44.7,57.1,51.2z M49.4,55.6c0.7,0.7,1.2,1.8,1.2,2.8c0,1-0.4,2.1-1.2,2.8
                                                c-0.8,0.7-1.8,1.2-2.8,1.2s-2.1-0.4-2.8-1.2c-0.7-0.8-1.2-1.8-1.2-2.8c0-1.1,0.4-2.1,1.2-2.8c0.8-0.8,1.8-1.2,2.8-1.2
                                                S48.7,54.8,49.4,55.6z M88,26H72.6l-4.3-16c-0.5-1.7-2.1-3-3.9-3H27.5c-1.8,0-3.4,1.3-3.9,3l-4.3,16H4c-2.2,0-4,1.7-4,3.9V81
                                                c0,2.2,1.8,4,4,4h84c2.2,0,4-1.8,4-4V29.9C92,27.7,90.2,26,88,26z M84,77H8V34h14.4c1.8,0,3.4-1.3,3.9-3l4.3-16h30.8l4.3,16
                                                c0.5,1.7,2.1,3,3.9,3H84V77z"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

function ProfileUpdateGenderField({ formData, setFormData }) {
    const [gender, setGender] = useState(
        formData.gender?.toLowerCase() || "order",
    )

    function changeGender(ev) {
        ev.stopPropagation()
        switch (ev.target.value) {
            case "male":
                // formData["gender"] = "female"
                setFormData({ ...formData, gender: "male" })
                setGender("male")
                break
            case "female":
                // formData["gender"] = "male"
                setFormData({ ...formData, gender: "female" })
                setGender("female")
                break
            case "other":
                // formData["gender"] = "male"
                setFormData({ ...formData, gender: "other" })
                setGender("other")
                break

            default:
                break
        }
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="input-field width-100">
                <label>Gender</label>
                <span
                    className="d-flex gap-2 align-items-center"
                    style={{ marginTop: "3px" }}
                >
                    <span className="d-flex gap-5-px align-items-center">
                        <label htmlFor="male">
                            <small>Male</small>
                        </label>
                        <input
                            type="radio"
                            name="gender"
                            id="male"
                            value={"male"}
                            onChange={changeGender}
                            checked={gender === "male"}
                        />
                    </span>

                    <span>.</span>

                    <span className="d-flex gap-5-px align-items-center">
                        <label htmlFor="female">
                            <small>Female</small>
                        </label>
                        <input
                            type="radio"
                            name="gender"
                            id="female"
                            onChange={changeGender}
                            value={"female"}
                            checked={gender === "female"}
                        />
                    </span>

                    <span>.</span>

                    <span className="d-flex gap-5-px align-items-center">
                        <label htmlFor="other">
                            <small>Other</small>
                        </label>
                        <input
                            type="radio"
                            name="other"
                            id="other"
                            onChange={changeGender}
                            value={"other"}
                            checked={gender !== "male" && gender !== "female"}
                        />
                    </span>
                </span>
            </div>
        </div>
    )
}

function ProfileUpdateFormFields({
    ImageField,
    GenderField,
    formData,
    setFormData,
}) {
    function handleFormChange(ev) {
        setFormData({
            ...formData,
            [ev.target.name]: ev.target.value,
        })
    }

    return (
        <div className="form__fields">
            {/* profile */}
            <ImageField formData={formData} />
            {/* form fields */}
            <div className="mt-3 pt-__ d-flex align-items-center flex-column">
                <div className="input-field width-100">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="full_name"
                        id="name"
                        onChange={handleFormChange}
                        value={formData.full_name || ""}
                    />
                </div>
                <div className="input-field width-100">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        id="bio"
                        name="biography"
                        rows={3}
                        onChange={handleFormChange}
                        value={formData.biography || ""}
                    ></textarea>
                </div>
                <div className="input-field width-100">
                    <label htmlFor="City">City</label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city || ""}
                        onChange={handleFormChange}
                    />
                </div>
            </div>
            {/* gender */}
            <GenderField formData={formData} setFormData={setFormData} />
        </div>
    )
}
