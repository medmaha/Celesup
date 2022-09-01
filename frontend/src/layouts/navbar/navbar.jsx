import './styles.css'
import { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { GlobalContext } from '../../App'
import NavbarDropdown from './navbarDropdown'
import { CELESUP_BASE_URL } from '../../axiosInstances'
import Dropdown from '../../components/custom/dropdown'

const Navbar = () => {
	const navbar = useRef()
	const [navbarDropdown, setNavDropDown] = useState(false)
	const [isDropDown, setDropDown] = useState(false)
	const [createPost, seCreatePost] = useState(false)

	const navigate = useNavigate()
	const context = useContext(GlobalContext)

	function toggleNavDropdown() {}

	// useEffect(() => {
	// 	context.supcelLibrary.SearchBarToggler().init()
	// }, [])

	useEffect(() => {
		if (!context.state?.createPost) {
			seCreatePost(false)
		}
	}, [context.state])

	function brand() {
		if (context.tokens?.access) {
			window.location.href = `/${context.user.username}`
			return
		}

		return (window.location.href = `/`)
	}

	function homepage() {
		if (context.tokens?.access) {
			// if (!context.user) return
			// context.setFocusState(null)
			// navigate(`/${context.user.username}`)
			window.location.href = `/${context.user.username}`
		}
		window.scrollTo({ top: 0 })
	}

	function explore(user) {
		navigate('/' + user.username + '/explore', { state: { user } })
	}

	function post(create) {
		seCreatePost((prev) => !prev)
		context.setFocusState({
			...context.state,
			createPost: !create,
		})
	}

	function dropdown(drop) {
		// setDropDown((prev) => !prev)
		// context.setFocusState({
		// 	...context.state,
		// 	dropDown: !drop,
		// })
		toggleNavDropdown()
	}

	return (
		<nav ref={navbar} className='fixed'>
			<div className='container pos-relative'>
				<h1 onClick={() => brand()} className='nav-brand'>
					<span className='brand-icon'>
						{/* Celesup Logo */}
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'>
							<g id='surface154173640'>
								<path
									style={{ stroke: 'none', fillRule: 'nonzero', fill: 'rgb(36.862746%,89.803922%,76.862746%)', fillOpacity: '1' }}
									d='M 37 36 L 17 36 C 14.238281 36 12 33.761719 12 31 L 12 11 C 12 8.238281 14.238281 6 17 6 L 37 6 C 39.761719 6 42 8.238281 42 11 L 42 31 C 42 33.761719 39.761719 36 37 36 Z M 21 30 L 35 30 L 35 18.5 C 35 15.460938 32.539062 13 29.5 13 L 18 13 L 18 27 C 18 28.65625 19.34375 30 21 30 Z M 21 30 '
								/>
								<path
									style={{ stroke: 'none', fillRule: 'nonzero', fill: 'rgb(10.196079%,73.725492%,61.176473%)', fillOpacity: '1' }}
									d='M 31 42 L 11 42 C 8.238281 42 6 39.761719 6 37 L 6 17 C 6 14.238281 8.238281 12 11 12 L 31 12 C 33.761719 12 36 14.238281 36 17 L 36 37 C 36 39.761719 33.761719 42 31 42 Z M 17.5 36 L 30 36 L 30 21 C 30 19.34375 28.65625 18 27 18 L 15 18 C 13.34375 18 12 19.34375 12 21 L 12 30.5 C 12 33.539062 14.460938 36 17.5 36 Z M 17.5 36 '
								/>
								<path
									style={{ stroke: 'none', fillRule: 'nonzero', fill: 'rgb(36.862746%,89.803922%,76.862746%)', fillOpacity: '1' }}
									d='M 36 26 L 36 27 C 36 28.65625 34.65625 30 33 30 L 23 30 L 23 36 L 37 36 C 39.75 36 42 33.75 42 31 L 42 26 Z M 36 26 '
								/>
							</g>
						</svg>
					</span>
					<span className='brand-name'>Celesup</span>
				</h1>
				<form className='nav-search'>
					<input
						type='text'
						placeholder='Search Celesup'
						className='br-md search-bar'
						autoComplete='off'
						autoCorrect='off'
						spellCheck={false}
						enterKeyHint='search'
						autoCapitalize='sentence'
						aria-activedescendant='typeaheadFocus-0.3445394408222455'
						aria-label='Search Celesup'
						name='query'
					/>
					<span className='search-bar-toggler'>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
							<path d='M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z' />
						</svg>
					</span>
				</form>
				<ul className='nav-links'>
					{context.tokens?.access ? (
						<>
							<li className='link home active' onClick={() => homepage()}>
								<span className='icon-wrapper' style={{ width: '45px', height: '45px' }}>
									<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
										<path d='M21.66,10.25l-9-8a1,1,0,0,0-1.32,0l-9,8a1,1,0,0,0-.27,1.11A1,1,0,0,0,3,12H4v9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V12h1a1,1,0,0,0,.93-.64A1,1,0,0,0,21.66,10.25ZM13,20H11V17a1,1,0,0,1,2,0Zm5,0H15V17a3,3,0,0,0-6,0v3H6V12H18ZM5.63,10,12,4.34,18.37,10Z' />
									</svg>
								</span>
							</li>
							<li className='link explore' onClick={() => explore()}>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
									<path d='M306.7 325.1L162.4 380.6C142.1 388.1 123.9 369 131.4 349.6L186.9 205.3C190.1 196.8 196.8 190.1 205.3 186.9L349.6 131.4C369 123.9 388.1 142.1 380.6 162.4L325.1 306.7C321.9 315.2 315.2 321.9 306.7 325.1V325.1zM255.1 224C238.3 224 223.1 238.3 223.1 256C223.1 273.7 238.3 288 255.1 288C273.7 288 288 273.7 288 256C288 238.3 273.7 224 255.1 224V224zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z' />
								</svg>
							</li>
							<li className='link create-post' onClick={() => post()}>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
									<path d='M200 344V280H136C122.7 280 112 269.3 112 256C112 242.7 122.7 232 136 232H200V168C200 154.7 210.7 144 224 144C237.3 144 248 154.7 248 168V232H312C325.3 232 336 242.7 336 256C336 269.3 325.3 280 312 280H248V344C248 357.3 237.3 368 224 368C210.7 368 200 357.3 200 344zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z' />
								</svg>
							</li>
							<li className='link notifications'>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
									<path d='M256 32V49.88C328.5 61.39 384 124.2 384 200V233.4C384 278.8 399.5 322.9 427.8 358.4L442.7 377C448.5 384.2 449.6 394.1 445.6 402.4C441.6 410.7 433.2 416 424 416H24C14.77 416 6.365 410.7 2.369 402.4C-1.628 394.1-.504 384.2 5.26 377L20.17 358.4C48.54 322.9 64 278.8 64 233.4V200C64 124.2 119.5 61.39 192 49.88V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32V32zM216 96C158.6 96 112 142.6 112 200V233.4C112 281.3 98.12 328 72.31 368H375.7C349.9 328 336 281.3 336 233.4V200C336 142.6 289.4 96 232 96H216zM288 448C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288z' />
								</svg>
							</li>
							<li className='link chats'>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
									<path d='M447.1 0h-384c-35.25 0-64 28.75-64 63.1v287.1c0 35.25 28.75 63.1 64 63.1h96v83.98c0 9.836 11.02 15.55 19.12 9.7l124.9-93.68h144c35.25 0 64-28.75 64-63.1V63.1C511.1 28.75 483.2 0 447.1 0zM464 352c0 8.75-7.25 16-16 16h-160l-80 60v-60H64c-8.75 0-16-7.25-16-16V64c0-8.75 7.25-16 16-16h384c8.75 0 16 7.25 16 16V352z' />
								</svg>
							</li>
						</>
					) : (
						<>
							<li className='link' onClick={() => navigate('/login')}>
								Signin
							</li>
							<li className='link' onClick={() => navigate('/signup')}>
								Signup
							</li>
						</>
					)}
				</ul>

				{context.user && (
					<Dropdown
						button={
							<div data-dropdown-button className='nav-profile'>
								<img className='' src={CELESUP_BASE_URL + context.user.avatar} alt='' />
							</div>
						}
						items={[
							// { text: 'Profile', icon:<h1>Hello</>},
							{
								text: (
									<div className='d-flex justify-content-between align-items-center'>
										<div className='profile-img'>
											<img src={CELESUP_BASE_URL + context.user.avatar} alt='' />
										</div>
									</div>
								),
								icon: (
									<div className='typography'>
										<span className='d-block center font-sm'>You're logged in as</span>
										<h3>
											<strong>
												{context.user.first_name} {context.user.last_name}
											</strong>
										</h3>
									</div>
								),
								// onClicked: togglePostDropdownMenu,
							},
							{
								text: 'Profile',
								icon: (
									<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
										<path d='M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z' />
									</svg>
								),
								// onClicked: togglePostDropdownMenu,
							},
							{
								text: 'Settings',
								icon: (
									<svg xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 24 24'>
										<path d='M19.9,12.66a1,1,0,0,1,0-1.32L21.18,9.9a1,1,0,0,0,.12-1.17l-2-3.46a1,1,0,0,0-1.07-.48l-1.88.38a1,1,0,0,1-1.15-.66l-.61-1.83A1,1,0,0,0,13.64,2h-4a1,1,0,0,0-1,.68L8.08,4.51a1,1,0,0,1-1.15.66L5,4.79A1,1,0,0,0,4,5.27L2,8.73A1,1,0,0,0,2.1,9.9l1.27,1.44a1,1,0,0,1,0,1.32L2.1,14.1A1,1,0,0,0,2,15.27l2,3.46a1,1,0,0,0,1.07.48l1.88-.38a1,1,0,0,1,1.15.66l.61,1.83a1,1,0,0,0,1,.68h4a1,1,0,0,0,.95-.68l.61-1.83a1,1,0,0,1,1.15-.66l1.88.38a1,1,0,0,0,1.07-.48l2-3.46a1,1,0,0,0-.12-1.17ZM18.41,14l.8.9-1.28,2.22-1.18-.24a3,3,0,0,0-3.45,2L12.92,20H10.36L10,18.86a3,3,0,0,0-3.45-2l-1.18.24L4.07,14.89l.8-.9a3,3,0,0,0,0-4l-.8-.9L5.35,6.89l1.18.24a3,3,0,0,0,3.45-2L10.36,4h2.56l.38,1.14a3,3,0,0,0,3.45,2l1.18-.24,1.28,2.22-.8.9A3,3,0,0,0,18.41,14ZM11.64,8a4,4,0,1,0,4,4A4,4,0,0,0,11.64,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,11.64,14Z' />
									</svg>
								),
								// onClicked: togglePostDropdownMenu,
							},
							{
								text: 'Logout',
								icon: (
									<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
										<path d='M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z' />
									</svg>
								),
								// onClicked: togglePostDropdownMenu,
							},
							{
								text: 'Help',
								icon: (
									<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
										<path d='M11.29,15.29a1.58,1.58,0,0,0-.12.15.76.76,0,0,0-.09.18.64.64,0,0,0-.06.18,1.36,1.36,0,0,0,0,.2.84.84,0,0,0,.08.38.9.9,0,0,0,.54.54.94.94,0,0,0,.76,0,.9.9,0,0,0,.54-.54A1,1,0,0,0,13,16a1,1,0,0,0-.29-.71A1,1,0,0,0,11.29,15.29ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM12,7A3,3,0,0,0,9.4,8.5a1,1,0,1,0,1.73,1A1,1,0,0,1,12,9a1,1,0,0,1,0,2,1,1,0,0,0-1,1v1a1,1,0,0,0,2,0v-.18A3,3,0,0,0,12,7Z' />
									</svg>
								),
								// onClicked: togglePostDropdownMenu,
							},
						]}
						options={{
							left: '-245px',
							top: 'calc(100% + 1rem)',
						}}
					/>
				)}

				<span className='nav-drawer-toggler'>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
						<path d='M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z' />
					</svg>
				</span>
			</div>
		</nav>
	)
}

export default Navbar
