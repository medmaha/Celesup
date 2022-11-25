import React, { useContext } from "react"
import Modal from "../../../../features/Modal"
import Post from "../post"
import { PostContext } from "./createPost"

export default function PostPreview({ post }) {
    const postContext = useContext(PostContext)
    return (
        <Modal
            title={"Preview post"}
            action="Create"
            children={
                <Post
                    post={post}
                    options={{
                        interactions: false,
                    }}
                />
            }
            callBack={(exit, action) => {
                if (exit) {
                    postContext.handleModalActions(true, null)
                } else if (action) {
                    postContext.submitForm()
                }
            }}
        />
    )
}
