import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../App"
import { celesupApi } from "../../../axiosInstances"
import ProfileUpdateFormWrapper from "./profileUpdateForm"

const ProfileImages = ({ profile, updateProfile, context }) => {
    const [toggleEditProfile, setToggleEditProfile] = useState(false)

    function viewImage(ev) {}
    function editProfileImages() {}

    function followProfile() {
        const form = new FormData()
        form.append("profile_id", profile.id)
        celesupApi
            .post("profile/follow", form, {
                headers: { "Content-type": "application/json" },
            })
            .then((res) => updateProfile(res.data))
    }

    return (
        <div className="profile pos-relative width-100">
            {/* Cover Image */}
            <div className="cover__image ">
                <img
                    crossOrigin="anonymous"
                    onClick={viewImage}
                    className="IMPLEMENTED_IN_STYLES"
                    src={profile.cover_img}
                    alt="cover photo"
                    // style={{
                    //     objectFit: "scale-down",
                    //     objectPosition: "25% 50%",
                    // }}
                />
            </div>
            {/* Profile Image */}
            <div className="pos-relative px-__ profile__avatar">
                <div className="avatar__wrapper">
                    <img
                        crossOrigin="anonymous"
                        onClick={viewImage}
                        src={profile.avatar}
                        className="responsive br-full"
                    />
                </div>

                {/* Buttons */}
                <div className="width-fit-content pos-absolute top-20 right-5-px">
                    <EditAndFollowButton
                        profile={profile}
                        updateProfile={updateProfile}
                        context={context}
                        setEditProfile={setToggleEditProfile}
                    />
                </div>
            </div>

            {/* Edit Modal */}
            {toggleEditProfile && (
                <ProfileUpdateFormWrapper
                    openModal={setToggleEditProfile}
                    profile={profile}
                    updateProfile={updateProfile}
                />
            )}
        </div>
    )
}

function EditAndFollowButton({
    profile,
    context,
    updateProfile,
    setEditProfile,
}) {
    function editProfileImages() {}
    const [btn, setBtn] = useState("")

    useEffect(() => {
        if (profile.id === context.user.id) {
            setBtn("Edit Profile")
        } else {
            if (!!profile.followers?.find((id) => (id = context.user.id))) {
                setBtn("unFollow")
            } else {
                setBtn("Follow")
            }
        }
    }, [profile])

    function followProfile() {
        console.log("ssssss")
        const form = new FormData()
        form.append("profile_id", profile.id)
        celesupApi
            .post("profile/follow", form, {
                headers: { "Content-type": "application/json" },
            })
            .then((res) => updateProfile(res.data))
    }
    return (
        <button
            className="btn br-md edit_profile__btn"
            onClick={() => {
                switch (btn.toLowerCase()) {
                    case "edit profile":
                        setEditProfile((prev) => !prev)
                        break

                    case "follow":
                    case "unfollow":
                        followProfile()
                    default:
                        break
                }
            }}
        >
            {btn}
        </button>
    )
}

export default ProfileImages
