//

export default async function fileUploader(type) {
    if (type.toLowerCase() === "video") return Promise.resolve({})
    //
    const hiddenFileInput = document.createElement("input")

    hiddenFileInput.setAttribute("type", "file")
    hiddenFileInput.setAttribute(
        "accept",
        ACCEPTED_FILE_EXTENSIONS[type.toLowerCase()],
    )

    return new Promise((resolve, reject) => {
        hiddenFileInput.click()
        hiddenFileInput.addEventListener("change", ({ target }) => {
            //
            if (target.files && target.files[0]) {
                const file = target.files[0]
                const file_type = fileType(target.files[0].type)

                if (!!file) {
                    const reader = new FileReader()
                    reader.onload = () => {
                        const encodedFile = reader.result
                        resolve([file_type, encodedFile])
                    }
                    reader.readAsDataURL(file)
                } else {
                    // TODO ---> bad file selected
                }
            } else if (target.files.length > 1) {
                // TODO ----> multiple file selected
            }
        })
    })
}

export const ACCEPTED_FILE_EXTENSIONS = {
    photo: "image/jpeg, image/jpg, image/jpeg, image/gif, image/bmp, image/webp",
    video: "video/mp4, video/webm, video/ogg",
    video: "audio/mpeg, audio/ogg, audio/webm/ audio/wav",
}

function fileType(type = "") {
    const isPhoto = type.match(/image\//g)?.length === 1
    const isVideo = type.match(/video\//g)?.length === 1

    if (isPhoto) return "picture"
    if (isVideo) return "video"
    return ""
}
