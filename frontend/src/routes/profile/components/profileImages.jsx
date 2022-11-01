import { CELESUP_BASE_URL } from "../../../axiosInstances"

const ProfileImages = ({ profile, readOnly, editProfileImages }) => {
    return (
        <div className="profile pos-relative">
            <div className="cover__image">
                <img
                    className="responsive"
                    src={CELESUP_BASE_URL + profile.cover_img}
                    alt=""
                />
            </div>
            {!readOnly ? (
                <>
                    <div
                        onClick={editProfileImages}
                        data-field="avatar"
                        className="profile__avatar pos-absolute"
                    >
                        <img
                            src={CELESUP_BASE_URL + profile.avatar}
                            className="responsive"
                            alt=""
                        />
                    </div>
                </>
            ) : (
                <>
                    <div
                        data-field="avatar"
                        className="profile__avatar pos-absolute"
                    >
                        <img
                            src={CELESUP_BASE_URL + profile.avatar}
                            className="responsive"
                            alt=""
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default ProfileImages
