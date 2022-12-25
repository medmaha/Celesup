import React, { useContext, useEffect, useState } from "react"
import { useReducer } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GlobalContext } from "../../../App"
import { CELESUP_BASE_URL } from "../../../axiosInstances"
import Modal from "../../../features/Modal"
import Textarea from "../../../features/TextArea"
import DateTime from "../../../hooks/getDateTime"
import PostTEXTS from "../../../routes/feed/posts/subComponent/PostTEXTS"

import { updatePages } from "../../../redux/createPost"

export default function PostPreview() {
    const context = useContext(GlobalContext)
    const { form, pages } = useSelector((state) => state.createPost)
    const [post, setPost] = useState(getInitialPostData(context, form))

    const DATE = new DateTime(post.created_at)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            updatePages({
                current: { ...pages.next, value: "PREVIEW" },
            }),
        )
    }, [])

    function updatePost(field, value) {
        setPost((prev) => {
            return {
                ...prev,
                [field]: value,
            }
        })
    }

    return (
        <div
            style={{
                maxHeight: "var(--modal-content-max-height)",
            }}
            className="overflow-hidden overflow-y-auto px-__ minheight-450-px"
        >
            <header className="d-flex align-items-center justify-content-between width-100 p-__">
                <div className="d-flex align-items-center">
                    <div className="profile-img width-50-px height-50-px">
                        <img
                            crossOrigin="anonymous"
                            src={post.author.avatar}
                            alt=""
                            className="cursor-pointer"
                        />
                    </div>
                    <section className="username px-1 cursor-pointer">
                        {post.author.id === context.user.id ? (
                            <span className="d-flex flex-column gap-5-px">
                                <b>Me</b>
                                <span className="text-muted">
                                    @{post.author.username.toLowerCase()}
                                </span>
                            </span>
                        ) : (
                            <>
                                {post.author.full_name ? (
                                    <span className="d-flex flex-column gap-5-px">
                                        <b>{post.author.full_name}</b>
                                        <span className="text-muted">
                                            @
                                            {post.author.username.toLowerCase()}
                                        </span>
                                    </span>
                                ) : (
                                    <span>
                                        <b>@{post.author.username}</b>
                                    </span>
                                )}
                            </>
                        )}
                    </section>
                </div>
                <div className="">
                    <span className="font-sm text-muted">{DATE.format()}</span>
                </div>
            </header>
            <div className="pl-4 pb-1">
                <div className="font-md">{post.caption || ""}</div>
                <div className="">
                    <small>{post.hashtags || ""}</small>
                </div>
                <p className="typography font-sm">{post.excerpt || ""}</p>

                {/* <PostTEXTS postData={post} /> */}

                {post.picture && (
                    <div
                        className="maxwidth-600-px post__form__body__image"
                        style={{ justifyContent: "flex-start" }}
                    >
                        <img
                            src={post.picture}
                            style={{
                                width: "fit-content",
                                height: "fit-content",
                                maxHeight: "100%",
                                maxWeight: "100%",
                            }}
                            alt="post image"
                            className=" br-sm"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

function getInitialPostData(context, formData) {
    // console.log(formData)
    return {
        id: "fake-post-id",
        author: {
            ...context.user,
            avatar: CELESUP_BASE_URL + context.user.avatar,
        },
        caption: formData.caption,
        excerpt: formData.excerpt,
        hashtags: formData.hashtags,
        created_at: new Date().toUTCString(),
        video: formData.video && URL.createObjectURL(formData.video),
        picture: formData.picture,
        thumbnail:
            formData.thumbnail && URL.createObjectURL(formData.thumbnail),
    }
}
