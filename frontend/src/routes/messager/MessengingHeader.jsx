import React from "react"

export default function MessengingHeader({ composeMessage, mobileView }) {
    return (
        <div className="d-flex justify-content-between align-items-center p-__">
            <h3 className="">Messaging</h3>
            <div className="d-flex gap-1 align-items-center">
                <span className="icon-wrapper cursor-pointer" title="Settings">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
                    </svg>
                </span>

                <span
                    className="icon-wrapper cursor-pointer"
                    title="New Message"
                    onClick={composeMessage}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92">
                        <path
                            id="XMLID_2170_"
                            d="M89.1,6.1l-3.2-3.2C84,1,81.6,0,78.9,0c0,0,0,0,0,0c-2.7,0-5.1,1-7,2.9L8.7,66.2c-0.4,0.4-0.7,0.8-0.9,1.4
                                                L0.3,86.5C-0.3,88,0,89.7,1.2,90.8C1.9,91.6,3,92,4,92c0.5,0,1-0.1,1.5-0.3l19-7.4c0.5-0.2,1-0.5,1.4-0.9l63.3-63.3
                                                C93,16.3,93,10,89.1,6.1z M14.8,71.7l5.6,5.6l-9.3,3.6L14.8,71.7z M83.4,14.5L28.2,69.7l-5.8-5.8L77.5,8.6C78,8.1,78.6,8,78.9,8
                                                s0.9,0.1,1.4,0.6l3.2,3.2C84.2,12.5,84.2,13.7,83.4,14.5z"
                        />
                    </svg>
                </span>
            </div>
        </div>
    )
}
