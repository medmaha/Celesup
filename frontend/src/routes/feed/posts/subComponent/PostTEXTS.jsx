import React from "react"

export default function PostTEXTS({ postData }) {
    return (
        <>
            {/* caption */}
            {postData.caption && (
                <header className="post__caption pb-__">
                    <h3>{postData.caption}</h3>
                </header>
            )}

            {postData.hashtags && (
                <div className="post__caption pb-__ text-secondary">
                    <span>{postData.hashtags}</span>
                </div>
            )}
            {/* excerpt */}
            {postData.excerpt && (
                <div className="post__excerpt pb-__">
                    <p className="typography" style={{ fontSize: "12px" }}>
                        {postData.excerpt}
                    </p>
                </div>
            )}
        </>
    )
}
