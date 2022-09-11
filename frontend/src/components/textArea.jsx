import React, { useRef, useEffect, useState } from 'react'

const TextArea = (props) => {
	const { row, name, onChange, placeholder, spellCheck = false, autoComplete = 'off', autoCorrect = 'off' } = props
	const instance = useRef()

	const normalHeight = 'calc(var(--baseFontSize--) * 2.1'
	const [scrollHeight, setScrollHeight] = useState(null)

	useEffect(() => {
		if (!scrollHeight) return
		const maxHeight = 174
		if (scrollHeight >= maxHeight) {
			instance.current.style.setProperty('overflow-y', 'auto')
		} else {
			instance.current.style.setProperty('overflow-y', 'hidden')
		}
	}, [scrollHeight])

	useEffect(() => {
		if (row && instance?.current) instance.current.style.height = 'auto'
		// eslint-disable-next-line
	}, [])

	useEffect(() => {})

	function handleInputChange(e) {
		if (instance.current.classList.contains('supcel-textarea')) {
			instance.current.style.height = normalHeight
			const scrollHeight = e.target.scrollHeight
			instance.current.style.height = `${scrollHeight}px`
			setScrollHeight(scrollHeight)
			onChange(e)
			return
		}
		onChange(e)
	}

	return (
		<>
			{/* prettierignore  */}
			{row ? (
				<textarea
					ref={instance}
					name={name}
					onKeyUp={handleInputChange}
					placeholder={placeholder}
					rows={row}
					spellCheck={spellCheck}
					autoComplete={autoComplete}
					autoCorrect={autoCorrect}></textarea>
			) : (
				<textarea ref={instance} onKeyUp={handleInputChange} name={name} placeholder={placeholder} spellCheck={spellCheck} autoComplete={autoComplete} autoCorrect={autoCorrect}></textarea>
			)}
		</>
	)
}

export default TextArea
