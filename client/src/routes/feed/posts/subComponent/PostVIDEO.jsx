import React from "react"

export default function PostVIDEO({ post }) {
    return (
        <div>
            <div className="video">
                <video controls>
                    <source src={post.video} />
                </video>
            </div>
        </div>
    )
}
