import { Link } from "react-router-dom"
import { CELESUP_BASE_URL } from "../../../axiosInstances"

const ComposePost = ({ context, reFetchPosts }) => {
    function createPost({ currentTarget }) {
        if (currentTarget.getAttribute("data-file")) {
            if (currentTarget.getAttribute("data-file-picture")) {
                localStorage.setItem("openFileType", "picture")
            } else if (currentTarget.getAttribute("data-file-video")) {
                localStorage.setItem("openFileType", "video")
            }
            localStorage.setItem("openFile", true)
        }
        context.setFocusState({
            ...context.state,
            createPost: true,
            reFetchPosts: reFetchPosts,
        })
    }

    return (
        <section
            className=" d-flex pt-1 px-__ align-items-center"
            id="composePost"
        >
            {context.user && (
                <>
                    <div className="author__profile">
                        <Link to={`/${context.user.username.toLowerCase()}`}>
                            <span className="d-block grey width-5-rem height-5-rem br-full overflow-hidden">
                                <img
                                    crossOrigin="anonymous"
                                    className="width-100 height-100"
                                    src={CELESUP_BASE_URL + context.user.avatar}
                                    alt=""
                                />
                            </span>
                        </Link>
                    </div>
                    <div className="post__items d-flex flex-column gap-5-px width-100">
                        <div
                            id="inputField"
                            className="height-3-rem br-md width-100 bg-color text-muted border d-flex align-items-center px-1 cursor-pointer grey-text"
                            onClick={createPost}
                        >
                            {`What's on your mind? ${
                                context.user.full_name || context.user.username
                            }`}
                        </div>
                        {/* <input
                            onClick={createPost}
                            type="text"
                            disabled
                            placeholder={`What's on your mind? ${
                                context.user.full_name || context.user.username
                            }`}
                        />
                         */}
                        <div className="d-flex align-items-center cursor-pointer width-max-content">
                            <ul className="d-flex align-items-center">
                                <li
                                    data-file
                                    data-file-picture
                                    className="cursor-pointer icon-wrapper width-21-px height-21-px"
                                    onClick={createPost}
                                >
                                    <svg
                                        className="blue-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M447.1 32h-384C28.64 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM111.1 96c26.51 0 48 21.49 48 48S138.5 192 111.1 192s-48-21.49-48-48S85.48 96 111.1 96zM446.1 407.6C443.3 412.8 437.9 416 432 416H82.01c-6.021 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.334-16.68l70-96C142.1 290.4 146.9 288 152 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C293.7 194.7 298.7 192 304 192s10.35 2.672 13.31 7.125l128 192C448.6 396 448.9 402.3 446.1 407.6z" />
                                    </svg>
                                </li>
                                <li
                                    data-file
                                    data-file-video
                                    className="cursor-pointer icon-wrapper width-21-px height-21-px"
                                    onClick={createPost}
                                >
                                    <svg
                                        className="green-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path d="M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z" />
                                    </svg>
                                </li>
                                <li className="cursor-pointer icon-wrapper width-22-px height-20-px">
                                    <svg
                                        className="orange-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path d="M160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32zM0 192H448V464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192zM64 304C64 312.8 71.16 320 80 320H112C120.8 320 128 312.8 128 304V272C128 263.2 120.8 256 112 256H80C71.16 256 64 263.2 64 272V304zM192 304C192 312.8 199.2 320 208 320H240C248.8 320 256 312.8 256 304V272C256 263.2 248.8 256 240 256H208C199.2 256 192 263.2 192 272V304zM336 256C327.2 256 320 263.2 320 272V304C320 312.8 327.2 320 336 320H368C376.8 320 384 312.8 384 304V272C384 263.2 376.8 256 368 256H336zM64 432C64 440.8 71.16 448 80 448H112C120.8 448 128 440.8 128 432V400C128 391.2 120.8 384 112 384H80C71.16 384 64 391.2 64 400V432zM208 384C199.2 384 192 391.2 192 400V432C192 440.8 199.2 448 208 448H240C248.8 448 256 440.8 256 432V400C256 391.2 248.8 384 240 384H208zM320 432C320 440.8 327.2 448 336 448H368C376.8 448 384 440.8 384 432V400C384 391.2 376.8 384 368 384H336C327.2 384 320 391.2 320 400V432z" />
                                    </svg>
                                </li>
                                <li className="cursor-pointer icon-wrapper width-20-px height-18-px">
                                    <svg
                                        className="red-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M0 32C0 14.33 14.33 0 32 0H160C177.7 0 192 14.33 192 32V416C192 469 149 512 96 512C42.98 512 0 469 0 416V32zM128 64H64V128H128V64zM64 256H128V192H64V256zM96 440C109.3 440 120 429.3 120 416C120 402.7 109.3 392 96 392C82.75 392 72 402.7 72 416C72 429.3 82.75 440 96 440zM224 416V154L299.4 78.63C311.9 66.13 332.2 66.13 344.7 78.63L435.2 169.1C447.7 181.6 447.7 201.9 435.2 214.4L223.6 425.9C223.9 422.7 224 419.3 224 416V416zM374.8 320H480C497.7 320 512 334.3 512 352V480C512 497.7 497.7 512 480 512H182.8L374.8 320z" />
                                    </svg>
                                </li>
                                <li className=""></li>
                            </ul>
                            <span className="d-inline-block font-sm">
                                Attach A File
                            </span>
                        </div>
                    </div>
                </>
            )}
        </section>
    )
}

export default ComposePost
