import { CELESUP_BASE_URL } from "../../../axiosInstances"

const ProfileImages = ({ profile }) => {
    function viewIMage(ev) {}
    return (
        <div className="profile pos-relative">
            <div className="cover__image">
                <img className="" src={profile.cover_img} alt="" />
            </div>
            <div data-field="avatar" className="profile__avatar pos-absolute">
                <img src={profile.avatar} className="responsive" alt="" />
            </div>
        </div>
    )
}

export default ProfileImages
