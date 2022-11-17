export function toggleGender(state, action) {
    switch (action.type) {
        case "male":
            return {
                male: true,
                female: false,
            }
        case "female":
            return {
                male: false,
                female: true,
            }
        default:
            return state
    }
}

export function prepareFormData(target, updateFormData, file) {
    if (file) {
        const fileSelector = document.createElement("input")
        fileSelector.setAttribute("type", "file")
        fileSelector.click()
        fileSelector.addEventListener("change", () => {
            if (fileSelector.files.length > 0) {
                updateFormData((prev) => {
                    return {
                        ...prev,
                        avatar: fileSelector.files[0],
                    }
                })

                const reader = new FileReader()
                reader.readAsDataURL(fileSelector.files[0])
                reader.onload = () => {
                    file.current.src = reader.result
                }
            } else {
                updateFormData((prev) => {
                    return {
                        ...prev,
                        avatar: null,
                    }
                })
            }
        })
        return
    }
    updateFormData((prev) => {
        return { ...prev, [target.name]: target.value.trim() }
    })

    if (target.name === "full_name") {
        const fullName = target.value.trim().split(" ")
        if (
            fullName.length > 1 &&
            fullName[0].length > 1 &&
            fullName[fullName.length - 1].length > 1
        ) {
            updateFormData((prev) => {
                return { ...prev, isValid: true }
            })
        } else {
            updateFormData((prev) => {
                return { ...prev, isValid: false }
            })
        }
    }
}
