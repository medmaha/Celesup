import React, { useEffect, useState, useRef } from "react"

const HashtagField = ({
    onChange,
    placeholder,
    name,
    autoComplete = "off",
    autoCorrect = "off",
    classes = "",
    value = "",
}) => {
    const [hashtags, setHashtags] = useState(value)
    const instance = useRef()

    useEffect(() => {
        onChange({
            target: {
                name: name,
                value: hashtags,
            },
        })
        // if (!hashtags) {
        // 	setHashtags('#')
        // }
        // eslint-disable-next-line
    }, [hashtags])

    useEffect(() => {
        instance.current?.scrollIntoView({ behavior: "smooth" })
        instance.current?.focus()
    }, [])

    function handleTagChange(e) {
        const character = e.nativeEvent.data?.toString().trim()
        const values = e.target.value.trim()

        if (character === "#") {
            setHashtags(values)
            return
        }
        if (character === " ") {
            setHashtags(values + " ")
            return
        }
        if (character) {
            computeHashtags(values)
            return
        }
        setHashtags(e.target.value)
    }

    function computeHashtags(values) {
        let data = []

        values.split(",").forEach((tag) => {
            const hashtag = tag.trim()

            if (hashtag === "#") {
                data = [...data]
            } else if (hashtag[0] === "#") {
                data = [...data, hashtag]
            } else {
                data = [...data, "#" + hashtag]
            }
        })

        let nested_data = []
        data.forEach((hashtag) => {
            hashtag.split(" ").forEach((tag) => {
                const __hashtag = tag.trim()
                if (!__hashtag) return

                if (__hashtag[0] === "#") {
                    nested_data = [...nested_data, __hashtag]
                } else {
                    nested_data = [...nested_data, "#" + __hashtag]
                }
            })
        })

        if (nested_data.length > 0) {
            data = nested_data
        }

        setHashtags(data.join(", ").trim())
    }

    return (
        <span className="d-block">
            <input
                ref={instance}
                className={classes}
                autoCorrect={autoCorrect}
                value={hashtags}
                type="text"
                onChange={handleTagChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
            />
        </span>
    )
}

export default HashtagField
