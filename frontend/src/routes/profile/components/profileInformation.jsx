import { useContext, useState } from "react"
import { GlobalContext } from "../../../App"
import { celesupApi } from "../../../axiosInstances"
import Modal from "../../../features/modal"
import ProfileUpdateForm from "./profileUpdateForm"

const ProfileInformation = ({ setProfile, profile, readOnly }) => {
    const context = useContext(GlobalContext)
    function followProfile() {
        const form = new FormData()
        form.append("profile_id", profile.id)
        celesupApi
            .post("profile/follow", form, {
                headers: { "Content-type": "application/json" },
            })
            .then((res) => setProfile(res.data))
    }

    function editProfileImages() {}

    return (
        <div className="profile__information card_ br-none p-0 px-__ pos-relative">
            {!!profile && (
                <>
                    <div className=" pos-absolute top-0 right-0">
                        {readOnly ? (
                            <>
                                {!!profile.followers?.find(
                                    (id) => (id = context.user.id),
                                ) ? (
                                    <button
                                        className="btn br-md m-1 mb-0 on-text-hover-white edit_profile__btn red"
                                        onClick={followProfile}
                                    >
                                        Unfollow
                                    </button>
                                ) : (
                                    <button
                                        className="btn br-md m-1 mb-0 on-text-hover-white edit_profile__btn"
                                        onClick={followProfile}
                                    >
                                        Follow
                                    </button>
                                )}
                            </>
                        ) : (
                            <button className="btn br-md m-1 mb-0 bg-none on-text-hover-white edit_profile__btn">
                                Edit profile
                            </button>
                        )}
                    </div>

                    <div className="d-flex flex-wrap justify-content-center gap-2 width-fit-content mx-1 pt-3 pb-2">
                        <div className="flex-1 flex-50 justify-content-center d-flex flex-column gap-2 mt-__">
                            <div className="d-flex flex-column pt-__ typography">
                                <h2>{profile.full_name || profile.username}</h2>
                                <span className="text-muted">
                                    @{profile.username.toLowerCase()}
                                </span>
                            </div>
                            <p className="typography profile__bio">
                                <small>
                                    {!!profile.biograp || (
                                        <>
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit. Facere
                                            tempora quis autem quae accusamus
                                            blanditiis!
                                        </>
                                    )}
                                </small>
                            </p>
                            <div className="d-flex gap-1 typography">
                                <div className="d-flex align-items-center gap-3-px text-muted">
                                    <span className="icon_wrapper">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 92 92"
                                        >
                                            <path
                                                id="XMLID_1054_"
                                                d="M68.4,7.9C62.7,2.8,54.7,0,46,0S29.3,2.8,23.6,7.9C16.6,14.1,13,23.4,13,35c0,25.1,28.9,54.6,30.2,55.8
                                                c0.8,0.8,1.8,1.2,2.8,1.2s2.1-0.4,2.8-1.2C50.1,89.6,79,60.1,79,35C79,23.4,75.4,14.1,68.4,7.9z M46,82.1c-2.7-3-7-8-11.2-14
                                                C25.8,55.3,21,43.9,21,35c0-25,19.1-27,25-27c23.2,0,25,20.7,25,27C71,52.6,53.1,74.3,46,82.1z M46,17.3c-8.8,0-15.9,7.3-15.9,16.2
                                                S37.2,49.6,46,49.6c8.8,0,15.9-7.3,15.9-16.2S54.8,17.3,46,17.3z M46,42.6c-4.9,0-8.9-4.1-8.9-9.2s4-9.2,8.9-9.2
                                                c4.9,0,8.9,4.1,8.9,9.2S50.9,42.6,46,42.6z"
                                            />
                                        </svg>
                                    </span>
                                    <span>
                                        <small>{profile.city}</small>
                                    </span>
                                </div>
                                <div className="d-flex align-items-center gap-5-px text-muted">
                                    <span className="icon-wrapper">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 2048 2048"
                                        >
                                            <path d="M768 768h128v128H768V768zm384 768h128v128h-128v-128zm384-768h128v128h-128V768zm-384 0h128v128h-128V768zm-384 256h128v128H768v-128zm-384 0h128v128H384v-128zm1152 0h128v128h-128v-128zm-384 0h128v128h-128v-128zm-384 256h128v128H768v-128zm-384 0h128v128H384v-128zm1152 0h128v128h-128v-128zm-384 0h128v128h-128v-128zm-384 256h128v128H768v-128zm-384 0h128v128H384v-128zM2048 128v1792H0V128h384V0h128v128h1024V0h128v128h384zM128 256v256h1792V256h-256v128h-128V256H512v128H384V256H128zm1792 1536V640H128v1152h1792z" />
                                        </svg>
                                    </span>
                                    <span>
                                        <small>
                                            Joined{" "}
                                            {profile.date_joined.split("T")[0]}
                                        </small>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="profile__interaction mt-1 gap-2 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center justify-content-center gap-5-px">
                                <small>
                                    <b>{profile.posts}</b>
                                </small>
                                <span>
                                    <small className="text-muted">Posts</small>
                                </span>
                            </div>
                            <div className="d-flex align-items-center justify-content-center gap-5-px">
                                <small>
                                    <b>{profile.following?.length}</b>
                                </small>
                                <span>
                                    <small className="text-muted">
                                        Following
                                    </small>
                                </span>
                            </div>
                            <div className="d-flex align-items-center justify-content-center gap-5-px">
                                <small>
                                    <b>{profile.followers?.length}</b>
                                </small>
                                <span>
                                    <small className="text-muted">
                                        Followers
                                    </small>
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Edit Profile */}
            <Modal
                children={
                    <ProfileUpdateForm
                        profile={profile}
                        editProfileImages={editProfileImages}
                        readOnly={readOnly}
                    />
                }
            />
        </div>
    )
}

export default ProfileInformation
