import { useContext } from "react"
import { GlobalContext } from "../../../App"

const ProfileInformation = ({ updateProfile, profile }) => {
    const context = useContext(GlobalContext)

    return (
        <div className="profile__information card_ br-none p-1 pos-relative">
            {/* Button for editing or following */}
            <div className="d-flex flex-wrap">
                <div className="" style={{ flex: "1 1 50%" }}>
                    <div className="d-flex flex-column pt-__ typography">
                        <h2>{profile.full_name || profile.username}</h2>

                        <span
                            className="text-muted"
                            style={{ paddingTop: "1px" }}
                        >
                            @{profile.username.toLowerCase()}
                        </span>
                        {profile.public_email && (
                            <span className="py-__">
                                {profile.public_email}
                            </span>
                        )}
                    </div>
                </div>
                <div
                    className="d-flex align-items-center"
                    style={{ flex: "1 1 50%" }}
                >
                    <div className="d-flex justify-content-center gap-2-em width-100">
                        <div className="">
                            <span className="">
                                {profile.post_count || profile.posts}
                            </span>
                            <span className="text-muted"> Friends</span>
                        </div>
                        <div className="">
                            <span className="">
                                {profile.followers_count ||
                                    profile.followers.length}
                            </span>
                            <span className="text-muted"> Followers</span>
                        </div>
                        <div className="">
                            <span className="">
                                {profile.following_count ||
                                    profile.following.length}
                            </span>
                            <span className="text-muted"> Following</span>
                        </div>
                    </div>
                </div>
            </div>
            <p className="typography profile__bio py-1">
                <small>{profile.biography}</small>
            </p>
        </div>
    )
}

export default ProfileInformation
