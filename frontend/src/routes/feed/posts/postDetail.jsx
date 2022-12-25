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
                    // console.log(res.data)
                    setPostData(res.data)
                },
                (error) => console.log(error),
            )
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="container mx-auto justify-content-center d-flex">
            <div className="d-flex flex-wrap width-100 card py-__ px-0 maxwidth-900-px">
                <div
                    className="d-flex justify-content-center"
                    style={{
                        flex: "1 1 30ch",
                        minHeight: "400px",
                    }}
                >
                    <div className="maxwidth-500-px d-inline-block br-sm">
                        <img
                            src={postData.picture}
                            alt="photo"
                            className="br-sm"
                            crossOrigin="anonymous"
                            style={{ objectFit: "scale-down" }}
                            width={"100%"}
                            // height={"max-content"}
                            // className="responsive"
                        />
                    </div>
                </div>
                <div
                    className="d-flex justify-content-center overflow-hidden overflow-y-auto"
                    style={{
                        flex: "1 1 300px",
                        maxHeight: "calc(100vh - 100px)",
                    }}
                >
                    <div className="maxwidth-500-px width-100 d-inline-block py-1 px-__">
                        <div className="d-flex align-items-center gap-1-rem flex-wrap">
                            <div className="profile-img-lg">
                                <img
                                    crossOrigin="anonymous"
                                    src={postData.author.avatar}
                                    alt=""
                                />
                            </div>
                            <div className="">
                                <p className="typography">
                                    {postData.author.full_name ||
                                        "@" + postData.author.username}
                                </p>
                            </div>
                        </div>
                        <div className="d-flex flex-column gap-10-px">
                            <p className="typography">{postData.caption}</p>
                            <p className="typography">
                                <small>{postData.hashtags}</small>
                            </p>
                            <p className="typography font-sm">
                                {postData.excerpt}
                            </p>
                        </div>
                        <div className="">
                            <PostINTERACTIONS
                                context={context}
                                postData={postData}
                                likePost={likePost}
                            />
                        </div>
                        <div className="pt-2 width-100">
                            <h4 className="typography">#Comments</h4>
                            <PostComments post={postData} toggle={true} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div
                className="d-flex justify-content-center gap-1-rem flex-wrap"
                id="postDetail"
            >
                <div
                    className="flex-1 mb-1 d-flex blue"
                    style={{
                        alignSelf: "flex-start",
                    }}
                >
                    <>
                        {postData.picture && (
                            <div className="d-flex pb-__ red">
                                <img
                                    crossOrigin="anonymous"
                                    src={postData.picture}
                                    alt="post photo"
                                    className="br-md border"
                                    style={{
                                        width: "100%",
                                        maxWidth: "fit-content",
                                    }}
                                />
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
            </div> */}
        </div>
    )
}
