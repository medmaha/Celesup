import { useState, useContext, useEffect } from "react"
import ImageViewer from "./ImageViewer"
import VideoFileViewer from "./VideoFileViewer"

// for useCreate hook

export function createFileFromDataUrl(dataURL) {
    const MIME_TYPE = dataURL.split(";")[0].split(":")[1]

    const ascii_Char = atob(dataURL.split(",")[1])
    const ascii_CodeArray = new Uint8Array(ascii_Char.length)

    let i = ascii_Char.length
    while (i--) {
        ascii_CodeArray[i] = ascii_Char.charCodeAt(i)
    }

    const file = new File(
        [ascii_CodeArray],
        `photo-${ascii_CodeArray.byteLength}_eDT.${MIME_TYPE.split("/")[1]}`,
        {
            type: MIME_TYPE,
        },
    )

    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {}
        reader.readAsDataURL(file)
        return resolve({ file, ulr: reader.result })
    })
}
