class NavigationAndDrawer {
	constructor() {
		this.nav = document.querySelector('nav')
		this.drawerToggler = document.querySelector('nav .nav-drawer-toggler')
		this.drawerContainer = document.querySelector('.nav-drawer-container')
		if (!this.drawerToggler || !this.drawerContainer) return

		this.drawer = this.drawerContainer.querySelector('.nav-drawer')
		this.drawerExitButton = document.createElement('span')
		this.drawerExitButton.classList.add('nav-drawer-exit')
		this.drawerExitButton.innerHTML = '&times;'
		this.drawer.appendChild(this.drawerExitButton)
		this.init()
		this.drawerToggler.addEventListener('click', () => this.openDrawer())
	}

	init(options = {}) {}

	openDrawer() {
		this.toggleNavDrawer(true)
		this.awaitExitEvent()
	}

	closeDrawer() {
		this.toggleNavDrawer()
	}

	toggleNavDrawer(add) {
		if (add) {
			this.drawerContainer.classList.add('active')
			this.drawer.classList.add('opened')
			return
		}
		this.drawerContainer.classList.remove('active')
		this.drawer.classList.remove('opened')
	}

	awaitExitEvent() {
		this.drawerContainer.addEventListener('click', ({ target, currentTarget }) => {
			if (target === currentTarget) {
				this.closeDrawer()
			}
		})
		this.drawerExitButton.addEventListener('click', () => {
			this.closeDrawer()
		})
	}
}
class NavSearchBarToggling {
	constructor() {
		this.navSearch = document.querySelector('nav .nav-search')
		this.searchBar = document.querySelector('nav .nav-search input')
		this.searchIcon = document.querySelector('nav .nav-search .search-bar-toggler')
	}

	init(icon) {
		if (!this.searchIcon) return
		this.searchIcon.addEventListener('click', this.toggleSearchBar)
	}

	toggleSearchBar() {
		const navBrand = document.querySelector('nav .nav-brand')
		const searchBar = document.querySelector('nav .nav-search input')

		navBrand.classList.toggle('hide')
		searchBar.classList.toggle('active')
	}
}

class BaseDropdown {
	init(
		instance,
		{
			onHover = false,
			onClick = true,
			alignment = 'space-between',
			constrainWidth = true,
			container = null,
			coverTrigger = false,
			closeOnClick = true,
			transition = 100,
			onOpenStart = null,
			onOpenEnd = null,
			onCloseStart = null,
			onCloseEnd = null,
		},
	) {
		this.reConstruct(instance, onHover, onClick, alignment, constrainWidth, container, coverTrigger, closeOnClick, transition, onOpenStart, onOpenEnd, onCloseStart, onCloseEnd)
		this.appendContent()
		if (this.onHover) {
			this.createEvent(this.instance, 'mouseover', this.deactivateDropdown)
			this.createEvent(this.instance, 'mouseout', this.deactivateDropdown)
		}

		if (this.onClick && !this.onHover) {
			if (!this.closeOnClick) {
			}
			this.createEvent(this.instance, 'click', this.activateDropdown)
		}
		return this
	}

	reConstruct(instance, onHover, onClick, alignment, constrainWidth, container, coverTrigger, closeOnClick, transition, onOpenStart, onOpenEnd, onCloseStart, onCloseEnd) {
		this.instance = instance
		this.onHover = onHover
		this.onClick = onClick
		this.alignment = alignment
		this.container = container
		this.onOpenEnd = onOpenEnd
		this.transition = String(transition)
		this.onCloseEnd = onCloseEnd
		this.onOpenStart = onOpenStart
		this.coverTrigger = coverTrigger
		this.closeOnClick = closeOnClick
		this.onCloseStart = onCloseStart
		this.constrainWidth = constrainWidth
		this.dropdownContent = document.querySelector(`#${instance.getAttribute('data-target')}`)
	}

	createEvent(handler, event, listener, extraCallback = [], options = {}) {
		handler.addEventListener(event, handleListener)
		function handleListener() {
			extraCallback.forEach((callback) => callback())
			listener(handler)
		}
	}

	activateDropdown(instance) {
		const dropdownContent = document.querySelector(`#${instance.getAttribute('data-target')}`)
		dropdownContent.classList.toggle('active')
	}

	deactivateDropdown(instance) {
		const dropdownContent = document.querySelector(`#${instance.getAttribute('data-target')}`)
		dropdownContent.classList.toggle('active')
	}

	appendContent() {
		const dropdownContent = document.querySelector(`#${this.instance.getAttribute('data-target')}`)
		dropdownContent.remove()
		this.instance.appendChild(dropdownContent)
		this.appendContentStyles()
	}

	appendContentStyles() {
		const transition = `.${this.transition}s`
		const coverTrigger = this.coverTrigger ? '0' : 'calc(100% + 1px)'
		const constrainWidth = this.constrainWidth ? '100%' : 'fit-content !important'

		// this.dropdownContent.style.setProperty('top', coverTrigger)
		// this.dropdownContent.style.setProperty('transition', transition)
		this.dropdownContent.style.setProperty('--max-width', '500px')
		console.log(this.instance.classList)
	}
}

class BaseDialog {
	'Dialog Initializer'

	init(element = Node, options = {}) {
		this.dialog = element
		this.open()
		return this
	}

	open() {
		this.dialog.style.display = 'flex'
		this.awaitExitEvent()
		return this
	}

	close() {
		this.dialog.style.display = 'none'
		this.isOpen = false
		return this
	}

	awaitExitEvent() {
		this.dialog.addEventListener('click', ({ target, currentTarget }) => {
			if (target === currentTarget) return this.close()
		})
	}
}

class BasePopup {
	init(element = Node, options = {}) {
		this.popup = element
		this.open()
		return this
	}

	open() {
		this.popup.classList.add('active')
		this.awaitExitEvent()
		return this
	}

	close() {
		this.popup.classList.remove('active')
		return this
	}

	awaitExitEvent() {
		const exitBtn = this.popup.querySelector('[data-exit]')

		if (exitBtn) {
			exitBtn.addEventListener('click', () => this.close())
		} else {
			throw new Error('Creating popup window without a element/button with data-exit attribute is prohibited! \n\nSee docs for more info http://supcelcss.io ...')
		}
		return this
	}
}

class SP {
	constructor() {
		this.Dropdown = this.newDropdown
		this.Dialog = this.newDialog
		this.Popup = this.newPopop
		this.SearchBarToggler = this.newNavSearchBarToggler
	}

	newDialog() {
		return new BaseDialog()
	}
	newDropdown() {
		return new BaseDropdown()
	}
	newPopop() {
		return new BasePopup()
	}

	newNavSearchBarToggler() {
		return new NavSearchBarToggling()
	}
}

const Supcel = new SP()
export default Supcel
