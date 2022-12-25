import { useEffect, useState, useContext, useRef, createContext } from "react"
import { celesupApi, CELESUP_BASE_URL } from "../../../axiosInstances"
import { GlobalContext } from "../../../App"
import Textarea from "../../../features/TextArea"

const CommentContext = createContext()

export default function PostComments({ post, toggle, cardView = true }) {
    const [controller, setController] = useState(new AbortController())
    const [comments, setComments] = useState({ data: [] })
    const [slices, setSlices] = useState({ start: 0, stop: 2, next: 10 })
    const context = useContext(GlobalContext)
    const commentFormRef = useRef()

    useEffect(() => {
        if (!comments.length) return
        return () => controller.abort()
    }, [comments])

    useEffect(() => {
        console.log(slices)
    }, [slices])

    useEffect(() => {
        return () => getComments()
    }, [])

    async function getComments(uri = `comments/${post.key}`) {
        await celesupApi
            .get(uri, {
                headers: { "Content-type": "application/json" },
                signal: controller?.signal,
            })
            .then(
                (res) => {
                    setComments({
                        ...res.data,
                        data: [...comments.data, ...res.data.data],
                    })
                },
                (error) => {},
            )
            .catch(() => {})
    }

    function loadMoreComments() {
        if (comments.links?.next) {
            setSlices({
                start: 0,
                stop: slices.next,
                next: slices.next * 2,
            })
            getComments(comments.links.next)
        } else {
            setSlices({
                start: 0,
                stop: slices.next,
                next: slices.next * 2,
            })
        }
        // else{
        //     setSlices({
        //         start: slices.stop,
        //         stop: slices.next,
        //         next: slices.next * 2,
        //     })
        // }
    }

    async function sendComment(url, form, callback) {
        await celesupApi
            .post("comments" + url, form, {
                headers: {
                    "Content-type": "application/json",
                },
                signal: controller?.signal,
            })
            .then(
                (res) => {
                    if (res.status === 201) {
                        let comment = res.data
                        let newComments = [comment, ...comments]
                        setComments(newComments)
                        // getComments()
                        callback()
                    }
                },
                (error) => {
                    console.log(error)
                },
            )
            .catch((err) => {
                console.log(err)
            })
    }

    async function createComment(comment, callback) {
        if (comment.length >= 2) {
            const form = new FormData()
            form.append("post", post.key)
            form.append("content", comment)

            await sendComment("/create", form, callback)
        }
    }

    function toggleCommentForm() {
        if (commentFormRef.current) {
            commentFormRef.current.classList.remove("d-none")
            commentFormRef.current
                .querySelector(`[data-id="${post.key}"]`)
                .focus()
        }
    }

    const ctxValues = {
        post,
        context,
        comments,
        cardView,
        slices,
    }

    return (
        <CommentContext.Provider value={ctxValues}>
            <div className="mt-1 width-100" ref={commentFormRef}>
                <div className="d-flex">
                    {/* Create new comment input field */}
                    <div className="d-flex" style={{ minWidth: "3rem" }}>
                        <img
                            crossOrigin="anonymous"
                            src={CELESUP_BASE_URL + context.user.avatar}
                            alt="avatar"
                            className="width-35-px height-35-px br-full border"
                        />
                    </div>
                    <div className="d-flex flex-1">
                        <Textarea
                            id={post.key}
                            placeholder={"Add a comment..."}
                            onSubmit={createComment}
                            onChange={(ev) => {}}
                        />
                    </div>
                </div>

                <div className="mt-1 pt-__ width-100">
                    {!!comments.data.length && (
                        <div
                            className="d-flex gap-5-px align-items-center"
                            style={{ fontSize: ".9rem" }}
                        >
                            <select name="" id="">
                                <option value="">Most relevant</option>
                                <option value="">Ascending</option>
                                <option value="">Descending</option>
                            </select>
                        </div>
                    )}

                    {comments.data
                        ?.slice(slices.start, slices.stop)
                        ?.map((comment, idx) => {
                            return (
                                <div
                                    key={comment.id}
                                    className="comment__group pos-relative"
                                >
                                    <ParentComment
                                        idx={idx}
                                        comment={comment}
                                        sendComment={sendComment}
                                        commentFormRef={commentFormRef}
                                    />

                                    {!!comment.children && (
                                        <ChildComment comment={comment} />
                                    )}
                                </div>
                            )
                        })}

                    {comments.data.length > slices.stop && (
                        <div className="pt-__ pl-2">
                            <span
                                style={{ fontSize: ".9rem" }}
                                className="cursor-pointer ml-__ text-secondary"
                                onClick={loadMoreComments}
                            >
                                Load more
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </CommentContext.Provider>
    )
}

function ParentComment({ idx, comment, sendComment, commentFormRef }) {
    const { comments, post } = useContext(CommentContext)

    function toggleCommentReply(id) {
        commentFormRef.current
            .querySelector(`[data-id="${id}"]`)
            .classList.remove("d-none")
        commentFormRef.current
            .querySelector(`[data-id="${post.key}--${id}"]`)
            .focus()
    }

    async function replyComment(comment, callback, commentId) {
        if (comment.length >= 2) {
            const form = new FormData()
            form.append("post", post.key)
            form.append("content", comment)
            form.append("parent", String(commentId).split("--")[1])

            await sendComment("/reply", form, callback)
        }
    }

    return (
        <>
            <div className="mt-__ d-flex parent__comment">
                <Comment
                    comment={comment}
                    hasNext={!!comments[++idx]}
                    replyComment={replyComment}
                    toggleCommentReply={toggleCommentReply}
                />
            </div>
        </>
    )
}

function ChildComment({ comment }) {
    const { slices } = useContext(CommentContext)
    return (
        <div className="ml-5 child__comment">
            {comment.children
                ?.slice(slices.start, slices.stop)
                .map((reply, idx) => (
                    <div className="mt-__ d-flex pos-relative" key={reply.id}>
                        <Comment
                            comment={reply}
                            hasNext={!!comment.children[++idx]}
                            isParent={false}
                        />
                    </div>
                ))}
        </div>
    )
}

function Comment({
    comment,
    hasNext,
    isParent = true,
    replyComment,
    toggleCommentReply,
}) {
    const { post, context, cardView } = useContext(CommentContext)

    return (
        <>
            <div className="d-flex comment__author">
                <img
                    crossOrigin="anonymous"
                    src={comment.author.avatar}
                    alt="avatar"
                    className="width-35-px height-35-px br-full border"
                />
            </div>
            {hasNext && (
                <div className="pos-absolute left-0 top-2-rem height-100 width-35-px d-flex justify-content-center">
                    <div
                        className="width-1-px mt-__"
                        style={{
                            height: "calc(100% - 38px)",
                            borderLeft: "1px solid",
                            opacity: ".85",
                        }}
                    ></div>
                </div>
            )}
            <div className={`${cardView ? "card" : ""} typography pb-0`}>
                <div className="d-flex justify-content-between mb-__ time__data">
                    <span>
                        <b>@{comment.author.username}</b>
                    </span>
                    <small>
                        <b>{comment.created_at.split("T")[0]}</b>
                    </small>
                </div>
                <p className="">{comment.content}</p>
                <span
                    className="divider"
                    style={{
                        marginBottom: "0",
                        paddingBottom: "0",
                    }}
                ></span>
                <div className="d-flex flex-column ">
                    <div className="d-flex align-items-center gap-3-px width-fit-content cursor-pointer">
                        <span className="icon-wrapper">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                            >
                                <path d="M2 42h8V18H2v24zm44-22c0-2.21-1.79-4-4-4H29.37l1.91-9.14c.04-.2.07-.41.07-.63 0-.83-.34-1.58-.88-2.12L28.34 2 15.17 15.17C14.45 15.9 14 16.9 14 18v20c0 2.21 1.79 4 4 4h18c1.66 0 3.08-1.01 3.68-2.44l6.03-14.1c.18-.46.29-.95.29-1.46v-3.83l-.02-.02L46 20z" />
                            </svg>
                        </span>

                        {isParent && (
                            <>
                                <div>|</div>
                                <span
                                    className="icon-wrapper"
                                    onClick={() =>
                                        toggleCommentReply(comment.id)
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                                    </svg>
                                </span>
                            </>
                        )}
                    </div>

                    {/* Comment reply input field */}
                    <div
                        className="d-flex mt-1 pb-__ d-none"
                        data-id={comment.id}
                    >
                        <div className="d-flex" style={{ minWidth: "3rem" }}>
                            <img
                                crossOrigin="anonymous"
                                src={CELESUP_BASE_URL + context.user.avatar}
                                alt="avatar"
                                className="width-35-px height-35-px br-full border"
                            />
                        </div>
                        <div className="d-flex width-100">
                            <Textarea
                                id={`${post.key}--${comment.id}`}
                                placeholder={"make a reply..."}
                                onSubmit={replyComment}
                                onChange={(ev) => {}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
