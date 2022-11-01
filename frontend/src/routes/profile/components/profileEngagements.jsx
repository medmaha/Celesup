import { useState, useReducer, useContext, useMemo, useEffect } from "react"
import { GlobalContext } from "../../../App"
import { celesupApi } from "../../../axiosInstances"
import Post from "../../feed/posts/post"

function reducer(state, action) {
    switch (action.type) {
        case "Change Tab":
            return {
                ...state,
                activeTab: action.tab,
            }
        default:
            break
    }
}

export default function ProfileEngagements() {
    const [state, dispatch] = useReducer(reducer, { activeTab: 1 })

    function changeTab(ev) {
        const currentTab = ev.currentTarget
            .closest(".tab-item")
            .parentNode.querySelector(".tab-item.active")

        const preActiveTap = ev.currentTarget.closest(".tab-item")

        const tabIndex = ev.currentTarget.getAttribute("data-tab-index")

        currentTab.classList.remove("active")
        preActiveTap.classList.add("active")
        dispatch({
            type: "Change Tab",
            tab: Number(tabIndex),
        })
    }

    return (
        <div className="my-2 profile__activities">
            <div className="tab-wrapper">
                <div className="tabs d-flex justify-content-evenly">
                    <div className="tab-item active d-flex flex-column gap-2">
                        <span
                            onClick={changeTab}
                            data-tab-index="1"
                            tabIndex={1}
                            className="title active"
                        >
                            Posts
                        </span>
                    </div>
                    <div className="tab-item d-flex flex-column gap-2">
                        <span
                            onClick={changeTab}
                            data-tab-index="2"
                            tabIndex={2}
                            className="title"
                        >
                            Followers
                        </span>
                    </div>
                    <div className="tab-item d-flex flex-column gap-2">
                        <span
                            onClick={changeTab}
                            data-tab-index="3"
                            tabIndex={3}
                            className="title"
                        >
                            Following
                        </span>
                    </div>
                    <div className="tab-item d-flex flex-column gap-2">
                        <span
                            onClick={changeTab}
                            data-tab-index="4"
                            tabIndex={4}
                            className="title"
                        >
                            Bookmarks
                        </span>
                    </div>
                </div>

                <span className="divider"></span>

                {/* Tab contents */}
                <div className="mt-2">
                    {state.activeTab === 1 && (
                        <div className="">
                            <PostWrapper />
                        </div>
                    )}
                    {state.activeTab === 2 && (
                        <span className="">
                            FOLLOWERS Lorem, ipsum dolor sit amet consectetur
                            adipisicing elit. Eveniet, molestias.
                        </span>
                    )}
                    {state.activeTab === 3 && (
                        <span className="">
                            FOLLOWING Lorem, ipsum dolor sit amet consectetur
                            adipisicing elit. Eveniet, molestias.
                        </span>
                    )}
                    {state.activeTab === 4 && (
                        <span className="">
                            BOOKMARK Lorem, ipsum dolor sit amet consectetur
                            adipisicing elit. Eveniet, molestias.
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

function PostWrapper() {
    const context = useContext(GlobalContext)
    const [posts, setPostItems] = useState([])

    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = async () => {
        await celesupApi.get(`posts/list?id=${context.user.id}`).then((res) => {
            setPostItems(res.data.data)
        })
    }

    return (
        <div className="maxwidth-650-px">
            {!!posts.length &&
                posts?.map((post) => {
                    return (
                        <span key={post.created_at}>
                            <Post post={post} />
                        </span>
                    )
                })}
        </div>
    )
}

const getPosts = async (setPostItems, context) => {
    let data
    await celesupApi.get(`posts/list?id=${context.user.id}`).then((res) => {
        data = res.data
    })
    setPostItems(data)
    return data
}
