import './dropdown.css'
import { useRef, useEffect, useState } from 'react'

function Dropdown({ button, onDropped, identifier = '', btnParentClass = '', items = [], options = { left: null, top: null, boxShadow: true } }) {
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
		if (!onDropped === undefined) {
			console.log(onDropped)
			// onDropped()
		}
		setActive((prev) => !prev)
	}

	function handleItemClicked(item) {
		item.onClicked()
		setActive(false)
	}

	return (
		<span id={identifier} data-dropdown className={isActive ? ' dropdown active' : 'dropdown'}>
			<span className={btnParentClass} onClick={toggleDropDown}>
				{button}
			</span>
			<div ref={content} className='dropdown-menu'>
				{items.map((item, idx) => {
					return (
						<div key={idx} className='dropdown-item' onClick={() => handleItemClicked(item)}>
							<span>{item.text}</span>
							<span>{item.icon}</span>
						</div>
					)
				})}
			</div>
		</span>
	)
}

export default Dropdown
