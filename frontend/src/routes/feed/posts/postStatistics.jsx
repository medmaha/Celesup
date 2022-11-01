import { useEffect } from "react"
import { useState, useContext } from "react"
import { GlobalContext } from "../../../App"
import { celesupApi } from "../../../axiosInstances"

export default function PostStatistics({ post }) {
    const [postLikes, setPostLikes] = useState()
    const [postShares, setPostShares] = useState()
    const [postComments, setPostComments] = useState()
    const [controller, setController] = useState(0)
    const context = useContext(GlobalContext)

    useEffect(() => {
        const controller = new AbortController()
        getData()
        return () => controller.abort("Request already send")
    }, [post])

    async function getData() {
        await celesupApi
            .get(`posts/stats?id=${post.key}`, {
                signal: controller.signal,
            })
            .then(
                (res) => {
                    // console.log(res.data)
                    setPostLikes(res.data.likes)
                    setPostComments(res.data.comments)
                    setPostShares(res.data.shares)
                },
                (err) => {},
            )
            .catch((err) => {})
    }

    return (
        <div>
            {!!postLikes && (
                <div className="recent__likes mb-1">
                    <div
                        className="d-flex justify-content-between align-items-center"
                        data-post-stats=""
                    >
                        <div className="d-flex gap-5-px px-__ align-items-center">
                            <a href="#" className="d-flex cursor-pointer">
                                <span
                                    className="border br-full d-flex align-items-center justify-content-center"
                                    style={{
                                        padding: "4px 5px",
                                        backgroundColor: "#3d3dfc",
                                        zIndex: "10",
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 48 48"
                                        style={{
                                            fill: "#fff",
                                            width: "16px",
                                            height: "16px",
                                        }}
                                    >
                                        <path d="M2 42h8V18H2v24zm44-22c0-2.21-1.79-4-4-4H29.37l1.91-9.14c.04-.2.07-.41.07-.63 0-.83-.34-1.58-.88-2.12L28.34 2 15.17 15.17C14.45 15.9 14 16.9 14 18v20c0 2.21 1.79 4 4 4h18c1.66 0 3.08-1.01 3.68-2.44l6.03-14.1c.18-.46.29-.95.29-1.46v-3.83l-.02-.02L46 20z" />
                                    </svg>
                                </span>
                                <span
                                    className="br-full d-flex align-items-center justify-content-center"
                                    style={{
                                        backgroundColor: "#db5e5e",
                                        padding: "4px 6px",
                                        transform: "translateX(-20%)",
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 2048 2048"
                                        style={{
                                            fill: "#fff",
                                            width: "1em",
                                            height: "1em",
                                        }}
                                    >
                                        <path d="M1889 287q53 53 88.5 116t53 131 17.5 138.5-17.5 138-53 130.5-88.5 116l-865 864-865-864q-53-53-88.5-116t-53-130.5T0 672.5 17.5 534t53-131T159 287q78-77 177-118t208-41 208 41 177 118l95 96 95-96q78-77 177-118t208-41 208 41 177 118z" />
                                    </svg>
                                </span>
                            </a>
                            <span>{postLikes}</span>
                        </div>

                        <div className="d-flex gap-5-px ">
                            <a href="#" className="cursor-pointer">
                                <small>{postComments} comment</small>
                            </a>
                            {!!postShares && (
                                <>
                                    <small>.</small>
                                    <a href="#" className="cursor-pointer">
                                        {postShares} reposts
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                    {/* <div className="liked__by__users d-flex pos-relative">
                       {postLikes.slice(0, 5).map((user) => {
                            return (
                                <div
                                    key={user.id}
                                    className="user width-30-px height-30-px br-full pos-absolute"
                                >
                                    <img
                                        className="responsive br-full"
                                        src={user.avatar}
                                        alt="user"
                                    />
                                </div>
                            )
                        })} 
                    </div> 
                    {!postLikes ? (
                        <p className="__text light-text">
                            liked by {postLikes.length}
                        </p>
                    ) : (
                        <p className="__text light-text">
                            you and {postLikes.length} others like this post
                        </p>
                    )}
                    */}
                </div>
            )}
        </div>
    )
}
