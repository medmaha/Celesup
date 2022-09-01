import './dropdown.css'
import { useRef, useEffect, useState } from 'react'

function Dropdown({ button, btnParentClass = '', items = [], options = { left: null, top: null, boxShadow: true } }) {
	const [isActive, setActive] = useState(false)
	const content = useRef()

	function setStyles() {
		if (options.left) {
			content.current.style.setProperty('--content-start-left', options.left)
		}
		if (options.top) {
			content.current.style.setProperty('--content-start-top', options.top)
		}
		// if (options.boxShadow === false) {
		// 	content.current.style.setProperty('box-shadow', 'none')
		// }
	}

	useEffect(() => {
		setStyles()
		if (!isActive) return
		document.addEventListener('click', awaitExitEvent)

		return () => document.removeEventListener('click', awaitExitEvent)

		// eslint-disable-next-line
	}, [isActive])

	function awaitExitEvent({ target }) {
		const currentDropdown = target.closest('[data-dropdown]')
		if (!currentDropdown) {
			setActive(false)
			return
		}
		document.querySelectorAll('[data-dropdown].active').forEach((dropdown) => {
			if (dropdown === currentDropdown) return
			dropdown.classList.remove('active')
		})
	}

	function toggleDropDown() {
		setActive((prev) => !prev)
	}

	return (
		<div data-dropdown className={isActive ? ' dropdown active' : 'dropdown'}>
			<span className={btnParentClass} onClick={toggleDropDown}>
				{button}
			</span>
			<div ref={content} className='dropdown-menu'>
				{items.map((item, idx) => {
					return (
						<div key={idx} className='dropdown-item' onClick={() => item.onClicked(setActive, item.text)}>
							<span>{item.text}</span>
							<span>{item.icon}</span>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Dropdown
