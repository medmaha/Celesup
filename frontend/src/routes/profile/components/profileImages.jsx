import { CELESUP_BASE_URL } from "../../../axiosInstances"

const ProfileImages = ({ profile }) => {
    function viewImage(ev) {}

    return (
        <div className="profile pos-relative width-100">
            <div className="cover__image">
                <img
                    onClick={viewImage}
                    className=""
                    src={profile.cover_img}
                    alt=""
                />
            </div>
            <div data-field="avatar" className="profile__avatar pos-absolute">
                <img
                    onClick={viewImage}
                    src={profile.avatar}
                    className="responsive"
                    alt=""
                />
            </div>
        </div>
    )
}

export default ProfileImages
