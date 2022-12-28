import React from "react"
import { Link } from "react-router-dom"
import { celesupApi } from "../../../../axiosInstances"
import Dropdown from "../../../../features/Dropdown"
import DateTime from "../../../../hooks/getDateTime"

export default function PostHEADER({
    context,
    postData,
    likePost,
    setPostData,
}) {
    const POST_DATE = new DateTime(postData.created_at)

    async function followProfile() {
        if (postData.author.id === context.user.id) return
        const form = new FormData()
        form.append("profile_id", postData.author.id)
        await celesupApi
            .post("profile/follow", form, {
                headers: { "Content-type": "application/json" },
            })
            .then(async () => {
                await celesupApi
                    .get("/posts/retrieve?=" + postData.key)
                    .then((res) => {
                        setPostData(res.data)
                    })
            })
    }

    function removePostFromList() {
        if (postData.author.id === context.user.id) return
        celesupApi
            .post("feeds/remove", {
                post_author_id: postData.author.id,
            })
            .then((res) => {
                if (res.status === 200) {
                    document
                        .getElementById("postsWrapper")
                        .querySelectorAll(
                            `.post[data-remove="${postData.author.username}"]`,
                        )
                        .forEach((post, idx) => {
                            post.classList.add("fade_out")
                            post.addEventListener("animationend", () => {
                                setTimeout(() => post.remove(), 50 * idx)
                            })
                        })
                }
            })
            .catch((err) => {})
    }

    function notInterestedInPost(ev) {
        const post = ev.target.closest(
            `.post[data-interest='${postData.key + "__not-interested"}']`,
        )

        celesupApi
            .post("feeds/not/interested", {
                post_key: postData.key,
            })
            .then((res) => {
                if (res.status === 200) {
                    // prettier-ignore
                    post.classList.add("fade_out")
                    post.addEventListener("animationend", ({ target }) => {
                        setTimeout(() => target.remove(), 50)
                    })
                }
            })
            .catch((err) => {})
    }

    function togglePostMenuDropdown(toggler, option) {
        console.log(option)
        if (option.toString().toLowerCase() === "follow") {
            likePost()
        }
        if (option.toString().toLowerCase() === "unfollow") {
            likePost()
        }
        toggler((prev) => !prev)
    }

    return (
        <>
            <header className="d-flex align-items-center justify-content-between width-100">
                <div className="d-flex align-items-center">
                    <Link to={`/${postData.author.username.toLowerCase()}`}>
                        <div className="profile-img width-50-px height-50-px">
                            {!!postData && (
                                <img
                                    crossOrigin="anonymous"
                                    src={postData.author.avatar}
                                    alt=""
                                    className="cursor-pointer"
                                />
                            )}
                        </div>
                    </Link>
                    <section className="username px-1 cursor-pointer">
                        {postData.author.id === context.user.id ? (
                            <span className="d-flex flex-column gap-5-px">
                                <b>Me</b>
                                <span className="text-muted">
                                    @{postData.author.username.toLowerCase()}
                                </span>
                            </span>
                        ) : (
                            <>
                                {postData.author.full_name ? (
                                    <span className="d-flex flex-column gap-5-px">
                                        <b>{postData.author.full_name}</b>
                                        <span className="text-muted">
                                            @
                                            {postData.author.username.toLowerCase()}
                                        </span>
                                    </span>
                                ) : (
                                    <span>
                                        <b>@{postData.author.username}</b>
                                    </span>
                                )}
                            </>
                        )}
                    </section>
                </div>
            </header>

            <div className="pos-absolute right-0 top-5-px d-flex flex-column align-items-right">
                {postData.author.id !== context.user.id ? (
                    <>
                        <div className="" style={{ alignSelf: "flex-end" }}>
                            <Dropdown
                                identifier={"dropdown___" + postData.key}
                                button={
                                    <span
                                        data-dropdown-button
                                        className="cursor-pointer br-full width-2-rem height-2-rem"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12,10a2,2,0,1,0,2,2A2,2,0,0,0,12,10ZM5,10a2,2,0,1,0,2,2A2,2,0,0,0,5,10Zm14,0a2,2,0,1,0,2,2A2,2,0,0,0,19,10Z" />
                                        </svg>
                                    </span>
                                }
                                // btnParentClass="pos-absolute top-neg-2-rem right-0"
                                items={[
                                    {
                                        text: postData.author.followers?.find(
                                            (id) => id === context.user.id,
                                        )
                                            ? "Unfollow"
                                            : "Follow",
                                        icon: (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 640 512"
                                            >
                                                <path d="M274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM577.9 223.1l47.03-47.03c9.375-9.375 9.375-24.56 0-33.94s-24.56-9.375-33.94 0L544 190.1l-47.03-47.03c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l47.03 47.03l-47.03 47.03c-9.375 9.375-9.375 24.56 0 33.94c9.373 9.373 24.56 9.381 33.94 0L544 257.9l47.03 47.03c9.373 9.373 24.56 9.381 33.94 0c9.375-9.375 9.375-24.56 0-33.94L577.9 223.1z" />
                                            </svg>
                                        ),
                                        onClicked: followProfile,
                                    },
                                    {
                                        text: "Report post",
                                        icon: (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path d="M476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87c-34.63 0-77.87 8.003-137.2 32.05V24C48 10.75 37.25 0 24 0S0 10.75 0 24v464C0 501.3 10.75 512 24 512s24-10.75 24-24v-104c53.59-23.86 96.02-31.81 132.8-31.81c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0zM464 319.8c-30.31 10.82-58.08 16.1-84.6 16.1c-30.8 0-58.31-7-87.44-14.41c-32.01-8.141-68.29-17.37-111.1-17.37c-42.35 0-85.99 9.09-132.8 27.73V84.14l18.03-7.301c47.39-19.2 86.38-28.54 119.2-28.54c28.24 .0039 49.12 6.711 73.31 14.48c25.38 8.148 54.13 17.39 90.58 17.39c35.43 0 72.24-8.496 114.9-26.61V319.8z" />
                                            </svg>
                                        ),
                                        onClicked: togglePostMenuDropdown,
                                    },
                                    {
                                        text: `Remove "${
                                            postData.author.full_name ||
                                            postData.author.username
                                        }" from feed`,
                                        icon: (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                            >
                                                <path d="M448 336v-288C448 21.49 426.5 0 400 0H96C42.98 0 0 42.98 0 96v320c0 53.02 42.98 96 96 96h320c17.67 0 32-14.33 32-31.1c0-11.72-6.607-21.52-16-27.1v-81.36C441.8 362.8 448 350.2 448 336zM143.1 128h192C344.8 128 352 135.2 352 144C352 152.8 344.8 160 336 160H143.1C135.2 160 128 152.8 128 144C128 135.2 135.2 128 143.1 128zM143.1 192h192C344.8 192 352 199.2 352 208C352 216.8 344.8 224 336 224H143.1C135.2 224 128 216.8 128 208C128 199.2 135.2 192 143.1 192zM384 448H96c-17.67 0-32-14.33-32-32c0-17.67 14.33-32 32-32h288V448z" />
                                            </svg>
                                        ),
                                        onClicked: removePostFromList,
                                    },
                                    {
                                        text: "Not Interested",
                                        icon: (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                data-name="Layer 1"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M10.94,6.08A6.93,6.93,0,0,1,12,6c3.18,0,6.17,2.29,7.91,6a15.23,15.23,0,0,1-.9,1.64,1,1,0,0,0-.16.55,1,1,0,0,0,1.86.5,15.77,15.77,0,0,0,1.21-2.3,1,1,0,0,0,0-.79C19.9,6.91,16.1,4,12,4a7.77,7.77,0,0,0-1.4.12,1,1,0,1,0,.34,2ZM3.71,2.29A1,1,0,0,0,2.29,3.71L5.39,6.8a14.62,14.62,0,0,0-3.31,4.8,1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20a9.26,9.26,0,0,0,5.05-1.54l3.24,3.25a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Zm6.36,9.19,2.45,2.45A1.81,1.81,0,0,1,12,14a2,2,0,0,1-2-2A1.81,1.81,0,0,1,10.07,11.48ZM12,18c-3.18,0-6.17-2.29-7.9-6A12.09,12.09,0,0,1,6.8,8.21L8.57,10A4,4,0,0,0,14,15.43L15.59,17A7.24,7.24,0,0,1,12,18Z" />
                                            </svg>
                                        ),
                                        onClicked: notInterestedInPost,
                                    },
                                ]}
                                options={{
                                    right: "0",
                                }}
                            />
                        </div>
                        <p className="" style={{ alignSelf: "flex-end" }}>
                            <small className="text-muted">
                                {POST_DATE.format()}
                            </small>
                        </p>
                    </>
                ) : (
                    <p className="mt-1" style={{ alignSelf: "flex-end" }}>
                        <small className="text-muted">
                            {POST_DATE.format()}
                        </small>
                    </p>
                )}
            </div>
        </>
    )
}
