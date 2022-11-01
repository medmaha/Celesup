import "./styles.css"
import { useEffect, useContext, useState } from "react"
import { celesupApi, refreshAuthTokens } from "../../axiosInstances"

import { GlobalContext } from "../../App"

import ProfileImages from "./components/profileImages"
import ProfileInformation from "./components/profileInformation"
import ProfileEngagements from "./components/profileEngagements"
import ProfileActivities from "./components/profileActivities"
import useComplexAxiosRequests from "../../hooks/useComplexRefresh"

const UserProfile = () => {
    const context = useContext(GlobalContext)
    const profileID = localStorage.getItem("pvpk")
    const [readOnly, setReadOnly] = useState(false)
    const [profile, setProfile] = useState(null)

    const [response, pendingData, error, sendAxiosRequest] =
        useComplexAxiosRequests()

    useEffect(() => {
        const form = new FormData()
        form.append("Profile-Id", profileID)

        sendAxiosRequest({
            axiosInstance: celesupApi,
            url: "/profile/view",
            method: "POST",
            form: form,
        })

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!context.user || !response) return
        if (response.first_name && response.last_name) {
            document.title =
                response.first_name.toUpperCase() +
                " " +
                response.last_name.toUpperCase()
            return
        }

        document.title = "CELESUP | " + response.username.toUpperCase()

        // eslint-disable-next-line
    }, [context])

    useEffect(() => {
        if (!response) return

        if (response.id !== context.user.id) {
            setReadOnly(true)
        }
        setProfile(response)

        if (response.tokens) {
            context.setUserTokens({
                ...response.tokens,
            })
        }
        // eslint-disable-next-line
    }, [response])

    async function editProfile(form, config) {
        form.append("Profile-Id", profileID)
        form.append("refreshToken", context.tokens.refresh)

        sendAxiosRequest({
            axiosInstance: celesupApi,
            url: "/profile/edit",
            method: "PUT",
            form: form,
            options: config,
        })
    }

    function editProfileImages({ currentTarget }) {
        const input = document.createElement("input")
        input.setAttribute("type", "file")
        input.click()

        input.addEventListener("change", () => {
            const form = new FormData()
            form.append(
                currentTarget.getAttribute("data-field"),
                input.files[0],
            )

            const config = {
                headers: { "Content-Type": "multipart/form-data" },
            }

            editProfile(form, config)
        })
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="maxwidth-750-px mx-__">
                {!!profile && (
                    <>
                        <ProfileImages
                            readOnly={readOnly}
                            profile={profile}
                            setProfile={setProfile}
                            editProfileImages={editProfileImages}
                        />

                        <ProfileInformation
                            readOnly={readOnly}
                            profile={profile}
                            setProfile={setProfile}
                            editProfileImages={editProfileImages}
                        />

                        <ProfileEngagements
                            readOnly={readOnly}
                            profile={profile}
                            setProfile={setProfile}
                            editProfileImages={editProfileImages}
                        />
                    </>
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
