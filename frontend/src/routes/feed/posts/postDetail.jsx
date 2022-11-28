import React, { useContext, useState } from "react"
import { GlobalContext } from "../../../App"
import { useLocation } from "react-router-dom"
import VideoPlayer from "../../../components/VideoPlayer"
import DateTime from "../../../hooks/getDateTime"
import PostTEXTS from "./subComponent/PostTEXTS"
import PostINTERACTIONS from "./subComponent/PostINTERACTIONS"
import { celesupApi } from "../../../axiosInstances"
import PostComments from "./postComments"

export default function PostDetail() {
    const { state } = useLocation()
    const [toggleComments, setToggleComments] = useState(false)
    const [postData, setPostData] = useState(state.post)
    const context = useContext(GlobalContext)

    const FORMATTED_DATE = new DateTime(postData.created_at)

    async function likePost() {
        const form = new FormData()
        form.append("post_key", postData.key)

        await celesupApi
            .post("/posts/like", form)
            .then(
                (res) => {
                    setPostData(res.data)
                },
                (error) => console.log(error),
            )
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div
            className="container p-__ mx-auto"
            style={{ maxWidth: "max-content" }}
        >
            <div
                className="d-flex justify-content-center flex-wrap"
                id="postDetail"
            >
                <div
                    className="flex-1 mb-1"
                    style={{
                        alignSelf: "flex-start",
                    }}
                >
                    <>
                        {postData.picture && (
                            <div className="picture d-flex pb-__ width-100 height-100">
                                <span className="">
                                    <img
                                        crossOrigin="anonymous"
                                        src={postData.picture}
                                        alt="file not supported"
                                        className="responsive br-md border"
                                    />
                                </span>
                            </div>
                        )}
                        {postData.video && (
                            <div className="width-100 height-100 d-flex justify-content-center">
                                <VideoPlayer
                                    file={postData.video}
                                    thumbnail={postData.thumbnail}
                                />
                            </div>
                        )}
                    </>
                </div>
                <div className="minwidth-250-px width-100 maxwidth-350-px flex-1">
                    <div className="d-flex justify-content-center_ align-items-center gap-10-px width-100">
                        <div className="profile-img-lg border br-full">
                            <img
                                crossOrigin="anonymous"
                                src={postData.author.avatar}
                                alt=""
                            />
                        </div>
                        <div className="d-flex flex-column typography">
                            <div className="">
                                {postData.author.full_name ||
                                    postData.author.username}
                            </div>
                            {postData.author.full_name && (
                                <div className="text-muted">
                                    @{postData.author.username}
                                </div>
                            )}
                            <div className="font-sm">
                                {FORMATTED_DATE.format()}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <PostTEXTS postData={postData} />
                    </div>
                    <div className="">
                        <PostINTERACTIONS
                            postData={postData}
                            context={context}
                            likePost={likePost}
                            setPostComment={() => {}}
                        />
                    </div>
                    <PostComments
                        post={postData}
                        toggle={true}
                        // cardView={false}
                    />
                    <div className="divider"></div>
                </div>
            </div>
        </div>
    )
}
