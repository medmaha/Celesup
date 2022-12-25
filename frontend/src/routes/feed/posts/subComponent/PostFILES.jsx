import React from "react"

export default function PostFILES({ postData }) {
    return (
        <>
            {postData.picture && (
                <div className="picture d-flex py-__ width-100 height-100">
                    <span
                        className="post-image post-file"
                        data-picture-src={postData.picture}
                    >
                        <img
                            crossOrigin="anonymous"
                            src=""
                            alt="file not supported"
                            className="responsive br-md border"
                            data-post-file
                        />
                    </span>
                </div>
            )}
            {postData.video && (
                <div className="picture d-flex py-__ width-100 height-100">
                    <span
                        className="post-image post-file"
                        data-picture-src={postData.thumbnail}
                    >
                        {/* <video
                            className="br-sm"
                            width="100%"
                            height="100%"
                            controls
                            data-post-file
                            src=""
                        ></video> */}
                        <img
                            crossOrigin="anonymous"
                            alt="file not supported"
                            className="responsive br-md border"
                            data-post-file
                        />
                    </span>
                </div>
            )}
        </>
    )
}
