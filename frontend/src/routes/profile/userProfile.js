import "./styles.css"
import { useEffect, useContext, useState } from "react"
import { celesupApi, refreshAuthTokens } from "../../axiosInstances"

import { GlobalContext } from "../../App"

import ProfileImages from "./components/profileImages"
import ProfileInformation from "./components/profileInformation"
import ProfileEngagements from "./components/profileEngagements"
// import useAuthRequest from "../auth/useAuthRequest"
import useAxiosRequest from "../../hooks/useAxiosRequest"
import { useParams } from "react-router-dom"

const UserProfile = () => {
    const context = useContext(GlobalContext)
    const [profile, setProfile] = useState(null)
    const [response, pendingData, error, sendAxiosRequest] = useAxiosRequest()

    const params = useParams()

    useEffect(() => {
        getProfile()
    }, [])

    useEffect(() => {
        if (!profile) return
        document.title =
            "Celesup | " + profile.full_name?.toUpperCase() ||
            profile.username.toUpperCase()
    }, [profile])

    useEffect(() => {
        if (!response) return
        setProfile(response)
    }, [response])

    async function getProfile(refresh) {
        const form = new FormData()
        if (getProfileIdentifier) {
            form.append("username", getProfileIdentifier())
            await sendAxiosRequest({
                url: "/profile/view",
                method: "POST",
                form: form,
            })
            if (refresh && profile.id === context.user.id) {
                setTimeout(context.updateUserTokens, 500)
            }
        }
    }

    function getProfileIdentifier() {
        if (params.username) {
            return params.username.trim()
        }
    }

    return (
        <div className="d-flex justify-content-center user__profile">
            <div className="maxwidth-850-px mx-__ width-100">
                {!!profile && (
                    <>
                        <ProfileImages
                            profile={profile}
                            setProfile={setProfile}
                        />

                        <ProfileInformation
                            profile={profile}
                            setProfile={getProfile}
                        />

                        <ProfileEngagements
                            profile={profile}
                            setProfile={setProfile}
                        />
                    </>
                )}

                {!!error && (
                    <header className="d-flex flex-column align-items-center my-3">
                        <p className="text-center pb-1">Something Went Wrong</p>
                        <p className="text-center pb-1">{error}</p>
                        <span
                            className="btn-blue btn br-lg"
                            onClick={() => getProfile()}
                        >
                            Try again later
                        </span>
                    </header>
                )}
            </div>
        </div>

        // <div className="container row justify-content-center">
        //     {profileData && (
        //         <>
        //             <div className="col-9-lg col-8-md" id="columnOne">
        //                 <ProfileImages
        //                     readOnly={readOnly}
        //                     profile={profileData}
        //                     editProfileImages={editProfileImages}
        //                 />

        //                 <ProfileInformation
        //                     readOnly={readOnly}
        //                     profile={profileData}
        //                     editProfileImages={editProfileImages}
        //                 />

        //                 <ProfileEngagements
        //                     readOnly={readOnly}
        //                     profile={profileData}
        //                     editProfileImages={editProfileImages}
        //                 />
        //             </div>

        //             {/* Second columns */}
        //             {/* <div className='activities col-4-md col-3-lg pl-__ columnTwo'>
        // 				<ProfileActivities readOnly={readOnly} profile={profileData} editProfileImages={editProfileImages} />
        // 			</div> */}
        //         </>
        //     )}
        //     {pendingData && <h1>Loading...</h1>}
        //     {error && <h1>Oops an error occurred</h1>}
        // </div>
    )
}

export default UserProfile
