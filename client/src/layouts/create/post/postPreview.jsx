import React, { useContext, useEffect, useState } from "react"
import { useReducer } from "react"
import { GlobalContext } from "../../../App"
import { CELESUP_BASE_URL } from "../../../axiosInstances"
import Modal from "../../../features/Modal"
import Textarea from "../../../features/TextArea"
import DateTime from "../../../hooks/getDateTime"
import PostTEXTS from "../../../routes/feed/posts/subComponent/PostTEXTS"
// import { GlobalContext } from "../../App"
import { PostContext } from "./create"
import ImageViewer from "./ImageViewer"

export default function PostPreview() {
    const context = useContext(GlobalContext)
    const {
        updatePostData,
        submitForm,
        postData,
        dispatcher,
        setHeaderOptions,
        exitPostCreation,
    } = useContext(PostContext)

    const [post, setPost] = useState(getInitialPostData(context, postData))

    const DATE = new DateTime(post.created_at)

    function updatePost(field, value) {
        setPost((prev) => {
            return {
                ...prev,
                [field]: value,
            }
        })
    }

    useEffect(() => {
        setHeaderOptions((prev) => {
            return {
                ...prev,
                backBtn: true,
                closeBtn: false,
                textTitle: "Preview post",
                BUTTONS: {
                    ...prev.BUTTONS,
                    actionBtn: (
                        <span
                            onClick={() => {
                                // console.log(formData)
                                // submitForm
                            }}
                            className="btn br-md"
                        >
                            Create
                        </span>
                    ),
                },
                METHODS: {
                    ...prev.METHODS,
                    onActionBtnClicked: () => {
                        console.log("clicked")
                        submitForm()
                    },
                    onBackBtnClicked: () => {
                        dispatcher("FORM")
                    },
                },
            }
        })
    }, [postData])

    useEffect(() => {
        // updatePostData((prev) => {
        //     return {
        //         ...prev,
        //         caption: post.caption,
        //         excerpt: post.excerpt,
        //         hashtags: post.hashtags,
        //     }
        // })
    }, [post])

    return (
        <div
            style={{
                maxHeight: "var(--modal-content-max-height)",
            }}
            className="overflow-hidden overflow-y-auto px-__"
        >
            <header className="d-flex align-items-center justify-content-between width-100">
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
                <input
                    type="text"
                    placeholder="write caption here"
                    className="preview-field"
                    value={post.caption || ""}
                    onChange={(ev) => updatePost("caption", ev.target.value)}
                />

                <input
                    type="text"
                    placeholder="write hashtags here"
                    className="preview-field font-sm"
                    value={post.hashtags || ""}
                    onChange={(ev) => updatePost("hashtags", ev.target.value)}
                />

                <Textarea
                    className="preview-field"
                    onChange={(ev) => updatePost("excerpt", ev.target.value)}
                    placeholder="write excerpt here"
                    value={post.excerpt || ""}
                />

                {/* <PostTEXTS postData={post} /> */}

                {post.picture && (
                    <div className="maxwidth-650-px maxheight-500-px">
                        <img
                            src={post.picture}
                            alt="post image"
                            className="width-100 height-100 br-sm"
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
        picture: formData.picture && URL.createObjectURL(formData.picture),
        thumbnail:
            formData.thumbnail && URL.createObjectURL(formData.thumbnail),
    }
}
