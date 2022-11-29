import { useState, useContext, useEffect } from "react"
import ImageViewer from "./ImageViewer"
import VideoFileViewer from "./VideoFileViewer"

// for useCreate hook
export function getCurrentJsx(Element) {
    return <Element />
}

const HEADER_BUTTONS = {
    closeBtn: <span className="font-lg">&times;</span>,
    backBtn: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z" />
        </svg>
    ),
    editBtn: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21.73682,3.751,19.31689,1.33105a.99964.99964,0,0,0-1.41406,0L13.32275,5.91113a1.00013,1.00013,0,0,0-.293.707V9.03809a1.00005,1.00005,0,0,0,1,1H16.4502a1.00014,1.00014,0,0,0,.707-.293L21.73682,5.165A.99964.99964,0,0,0,21.73682,3.751ZM16.03613,8.03809H15.02979V7.03223l3.58007-3.58008L19.61572,4.458ZM19,11a1,1,0,0,0-1,1v2.3916l-1.48047-1.48047a2.78039,2.78039,0,0,0-3.92822,0l-.698.698L9.40723,11.123a2.777,2.777,0,0,0-3.92432,0L4,12.606V7A1.0013,1.0013,0,0,1,5,6h6a1,1,0,0,0,0-2H5A3.00328,3.00328,0,0,0,2,7V19a3.00328,3.00328,0,0,0,3,3H17a3.00328,3.00328,0,0,0,3-3V12A1,1,0,0,0,19,11ZM5,20a1.0013,1.0013,0,0,1-1-1V15.43408l2.897-2.897a.79926.79926,0,0,1,1.09619,0l3.168,3.16711c.00849.00916.0116.02179.02045.03064L15.44714,20Zm13-1a.97137.97137,0,0,1-.17877.53705l-4.51386-4.51386.698-.698a.77979.77979,0,0,1,1.1001,0L18,17.21973Z" />
        </svg>
    ),

    defaultBtn: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" />
        </svg>
    ),
    actionBtn: <span className="btn br-md">NEXT</span>,
}

export function PostModalHeader({ options = {} }) {
    const OPTIONS = {
        backBtn: undefined,
        closeBtn: true,
        editBtn: true,
        defaultBtn: true,
        actionBtn: true,

        ...options,
        BUTTONS: {
            ...HEADER_BUTTONS,
            ...options.BUTTONS,
        },
        METHODS: {
            onBackBtnClicked: () => {},
            onCloseBtnClicked: () => {},
            onEditBtnClicked: () => {},
            onDefaultBtnClicked: () => {},
            onActionBtnClicked: () => {},
            ...options.METHODS,
        },
    }

    return (
        <>
            <ul className=" d-flex py-1 px-1 justify-content-between align-items-center pos-relative">
                {OPTIONS.backBtn && (
                    <li
                        title="Go Back"
                        className="icon-wrapper cursor-pointer"
                        onClick={OPTIONS["METHODS"].onBackBtnClicked}
                    >
                        {OPTIONS["BUTTONS"].backBtn}
                    </li>
                )}
                {OPTIONS.closeBtn && (
                    <li
                        title="Go Back"
                        className="icon-wrapper cursor-pointer"
                        onClick={OPTIONS["METHODS"].onCloseBtnClicked}
                    >
                        {OPTIONS["BUTTONS"].closeBtn}
                    </li>
                )}
                {OPTIONS.textTitle && (
                    <div className="pos-absolute top-0 left-6-rem height-100 width-fit-content d-flex align-items-center">
                        <span className="" style={{ letterSpacing: "1px" }}>
                            <b>{OPTIONS.textTitle}</b>
                        </span>
                    </div>
                )}
                {OPTIONS.editBtn && (
                    <li
                        title="Edit Image"
                        className={`cursor-pointer icon-wrapper`}
                        onClick={OPTIONS["METHODS"].onEditBtnClicked}
                    >
                        {OPTIONS["BUTTONS"].editBtn}
                    </li>
                )}
                {OPTIONS.defaultBtn && (
                    <li
                        title="Restore Default"
                        className="cursor-pointer icon-wrapper"
                        onClick={OPTIONS["METHODS"].onDefaultBtnClicked}
                    >
                        {OPTIONS["BUTTONS"].defaultBtn}
                    </li>
                )}
                {OPTIONS.actionBtn && (
                    <li
                        title="Create Post"
                        className="cursor-pointer"
                        onClick={OPTIONS["METHODS"].onActionBtnClicked}
                    >
                        {OPTIONS["BUTTONS"].actionBtn}
                    </li>
                )}
            </ul>
        </>
    )
}

export const ACCEPTED_FILE_EXTENSIONS = {
    photo: "image/*",
    video: "video/*",
}

export async function fileUploader(updateFormData, dispatcher, type) {
    if (type === "video") return
    //
    const hiddenFileInput = document.createElement("input")

    hiddenFileInput.setAttribute("type", "file")
    hiddenFileInput.setAttribute(
        "accept",
        ACCEPTED_FILE_EXTENSIONS[type.toLowerCase()],
    )

    hiddenFileInput.click()

    hiddenFileInput.addEventListener("change", ({ target }) => {
        //
        if (target.files && target.files[0]) {
            const file = target.files[0]
            const file_type = fileType(target.files[0].type)

            if (!!file) {
                updateFormData((prev) => {
                    return {
                        ...prev,
                        [file_type]: file,
                    }
                })
                dispatcher(type)
            } else {
                // TODO ---> bad file selected
            }
        } else if (target.files.length > 1) {
            // TODO ----> multiple file selected
        }
    })

    function fileType(type = "") {
        const isPhoto = type.match(/image\//g)?.length === 1
        const isVideo = type.match(/video\//g)?.length === 1

        if (isPhoto) return "picture"
        if (isVideo) return "video"
        return ""
    }
}

export function checkValid(field, lookup = "L") {
    switch (lookup) {
        case "L":
            if (field?.length > 4) return true
            return false
        case "F":
            if (!!field) return true
            return false
        case "T":
            if (!!field) return true
            return false
        default:
            return false
    }
}
