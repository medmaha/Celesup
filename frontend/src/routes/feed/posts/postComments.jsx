import { useEffect, useState, useContext, useRef } from "react"
import { celesupApi, CELESUP_BASE_URL } from "../../../axiosInstances"
import { GlobalContext } from "../../../App"
import Textarea from "../../../features/TextArea"

export default function PostComments({ post, toggle }) {
    const [controller, setController] = useState(new AbortController())
    const [comments, setComments] = useState([])
    const context = useContext(GlobalContext)
    const commentFormRef = useRef()

    useEffect(() => {
        if (!comments.length) return
        return () => controller.abort()
    }, [comments])

    useEffect(() => {
        if (!toggle) return
        toggleCommentForm()

        return () => {}
    }, [toggle])

    function toggleCommentForm() {
        commentFormRef.current.classList.remove("d-none")
        commentFormRef.current.querySelector(`[data-id="${post.key}"]`).focus()
        getComments()
    }

    async function getComments() {
        await celesupApi
            .get(`comments?id=${post.key}`, {
                headers: { "Content-type": "application/json" },
                signal: controller?.signal,
            })
            .then(
                (res) => {
                    setComments(res.data.data)
                },
                (error) => {},
            )
            .catch(() => {})
    }

    async function createComment(comment, id, callback) {
        if (comment.length >= 2) {
            console.log(comment)
            const form = new FormData()
            form.append("post", post.key)
            form.append("content", comment)
            form.append("author", context.user.id)

            await celesupApi
                .post("comments/create", form, {
                    headers: {
                        "Content-type": "application/json",
                    },
                    signal: controller?.signal,
                })
                .then(
                    (res) => {
                        getComments()
                        callback()
                    },
                    (error) => {},
                )
                .catch(() => {})
        }
    }

    function toggleCommentReply(id) {
        commentFormRef.current
            .querySelector(`[data-id="${id}"]`)
            .classList.remove("d-none")
        commentFormRef.current
            .querySelector(`[data-id="${post.key}--${id}"]`)
            .focus()
    }
    async function replyComment(comment, commentId, callback) {
        if (comment.length >= 2) {
            const form = new FormData()
            form.append("post", post.key)
            form.append("content", comment)
            form.append("author", context.user.id)
            form.append("parent", String(commentId).split("--")[1])

            await celesupApi
                .post("comments/reply", form, {
                    headers: {
                        "Content-type": "application/json",
                    },
                    signal: controller?.signal,
                })
                .then(
                    (res) => {
                        getComments()
                        callback()
                    },
                    (error) => {},
                )
                .catch(() => {})
        }
    }

    return (
        <div className="mt-1 pr-1 d-none" ref={commentFormRef}>
            <div className="d-flex">
                <div className="d-flex" style={{ minWidth: "3rem" }}>
                    <img
                        src={CELESUP_BASE_URL + context.user.avatar}
                        alt="avatar"
                        className="width-35-px height-35-px br-full border"
                    />
                </div>
                <div className="d-flex width-100">
                    <Textarea
                        id={post.key}
                        placeholder={"Add a comment..."}
                        submitOnEnter={createComment}
                    />
                </div>
            </div>

            <div className="mt-1 pt-__">
                {!!comments.length && (
                    <div
                        className="d-flex gap-5-px align-items-center"
                        style={{ fontSize: ".9rem" }}
                    >
                        <span>Most relevant</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                        >
                            <path d="M5 8l4 4 4-4z" />
                        </svg>
                    </div>
                )}
                {comments?.slice(0, 2)?.map((comment, idx) => {
                    return (
                        <span key={idx} className="comment__group">
                            <div className="mt-__ d-flex parent__comment">
                                <div className="d-flex comment__author">
                                    <img
                                        src={comment.author.avatar}
                                        alt="avatar"
                                        className="width-35-px height-35-px br-full border"
                                    />
                                </div>
                                <div className="card typography pb-0">
                                    <div className="d-flex justify-content-between mb-__ time__data">
                                        <span>
                                            <b>@{comment.author.username}</b>
                                        </span>
                                        <small>
                                            <b>
                                                {
                                                    comment.created_at.split(
                                                        "T",
                                                    )[0]
                                                }
                                            </b>
                                        </small>
                                    </div>
                                    <p className="">{comment.content}</p>

                                    <span
                                        className="divider"
                                        style={{
                                            paddingBottom: "0",
                                            marginBottom: "0",
                                        }}
                                    ></span>
                                    <div className="d-flex gap-1 align-items-center">
                                        <div className="d-flex align-items-center gap-3-px width-fit-content cursor-pointer">
                                            <span className="icon-wrapper">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 48 48"
                                                >
                                                    <path d="M2 42h8V18H2v24zm44-22c0-2.21-1.79-4-4-4H29.37l1.91-9.14c.04-.2.07-.41.07-.63 0-.83-.34-1.58-.88-2.12L28.34 2 15.17 15.17C14.45 15.9 14 16.9 14 18v20c0 2.21 1.79 4 4 4h18c1.66 0 3.08-1.01 3.68-2.44l6.03-14.1c.18-.46.29-.95.29-1.46v-3.83l-.02-.02L46 20z" />
                                                </svg>
                                            </span>
                                        </div>
                                        <div>|</div>
                                        <div className="d-flex align-items-center gap-3-px width-fit-content cursor-pointer">
                                            <span
                                                className="icon-wrapper"
                                                onClick={() =>
                                                    toggleCommentReply(
                                                        comment.id,
                                                    )
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <span
                                        className="d-flex mt-1 pb-__ d-none"
                                        data-id={comment.id}
                                    >
                                        <div
                                            className="d-flex"
                                            style={{ minWidth: "3rem" }}
                                        >
                                            <img
                                                src={
                                                    CELESUP_BASE_URL +
                                                    context.user.avatar
                                                }
                                                alt="avatar"
                                                className="width-35-px height-35-px br-full border"
                                            />
                                        </div>
                                        <div className="d-flex width-100">
                                            <Textarea
                                                id={`${post.key}--${comment.id}`}
                                                placeholder={"make a reply..."}
                                                submitOnEnter={replyComment}
                                            />
                                        </div>
                                    </span>
                                </div>
                            </div>

                            {!!comment.children && (
                                <div className="ml-5 child__comment">
                                    {comment.children
                                        ?.slice(0, 2)
                                        .map((reply) => (
                                            <div
                                                className="mt-__ d-flex"
                                                key={reply.id}
                                            >
                                                <div className="d-flex comment__author">
                                                    <img
                                                        src={
                                                            reply.author.avatar
                                                        }
                                                        alt="avatar"
                                                        className="width-35-px height-35-px br-full border"
                                                    />
                                                </div>
                                                <div className="card pb-0 typography">
                                                    <div className="d-flex justify-content-between mb-__ time__data">
                                                        <span>
                                                            <b>
                                                                @
                                                                {
                                                                    reply.author
                                                                        .username
                                                                }
                                                            </b>
                                                        </span>
                                                        <small>
                                                            <b>
                                                                {
                                                                    reply.created_at.split(
                                                                        "T",
                                                                    )[0]
                                                                }
                                                            </b>
                                                        </small>
                                                    </div>
                                                    <p className="">
                                                        {reply.content}
                                                    </p>
                                                    <span
                                                        className="divider"
                                                        style={{
                                                            marginBottom: "0",
                                                            paddingBottom: "0",
                                                        }}
                                                    ></span>
                                                    <div className="d-flex gap-1">
                                                        <div className="d-flex align-items-center gap-3-px width-fit-content cursor-pointer">
                                                            <span className="icon-wrapper">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 48 48"
                                                                >
                                                                    <path d="M2 42h8V18H2v24zm44-22c0-2.21-1.79-4-4-4H29.37l1.91-9.14c.04-.2.07-.41.07-.63 0-.83-.34-1.58-.88-2.12L28.34 2 15.17 15.17C14.45 15.9 14 16.9 14 18v20c0 2.21 1.79 4 4 4h18c1.66 0 3.08-1.01 3.68-2.44l6.03-14.1c.18-.46.29-.95.29-1.46v-3.83l-.02-.02L46 20z" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </span>
                    )
                })}

                {comments.length > 2 && (
                    <div className="pt-__">
                        <span
                            style={{ fontSize: ".9rem" }}
                            className="cursor-pointer"
                        >
                            load more comments
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
