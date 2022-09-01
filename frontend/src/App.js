import Supcel from './cssStyles/supcel-CSS/supcel'
import { useEffect, useState, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import Navbar from './layouts/navbar/navbar'
import MobileNavbarLinks from './layouts/navbar/mobileNavbarLinks'

// route elements
import Login from './routes/auth/signin/login'
import Register from './routes/auth/register/register'

// VIEWS
import Index from './routes'
import Dashboard from './routes/dashboard'
import UserProfile from './routes/profile/userProfile'
import ExplorePosts from './routes/explorePosts'
import PageNotFound from './routes/pageNotFound'
import CreateNewPost from './components/dashboard/posts/create/createPost'
import { celesupApi } from './axiosInstances'

export const GlobalContext = createContext({})

function App() {
	const [user, setUser] = useState(null)
	const [focusStates, setFocusState] = useState(null)
	const [tokens, updateTokens] = useState({
		access: localStorage.getItem('access'),
		refresh: localStorage.getItem('refresh'),
	})

	useEffect(() => {
		if (!localStorage.getItem('access') || !localStorage.getItem('refresh')) {
			setUser(null)
			updateTokens(null)
		}
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (!tokens?.access || !tokens?.refresh) {
			localStorage.removeItem('refresh')
			localStorage.removeItem('access')

			setUser(null)
			return
		}
		if (tokens.access && tokens.refresh) {
			localStorage.setItem('access', tokens.access)
			localStorage.setItem('refresh', tokens.refresh)

			const client = jwtDecode(localStorage.getItem('access'))
			getUserData(client.id)
		}
		// eslint-disable-next-line
	}, [tokens])

	function getUserData(user_id) {
		const form = new FormData()
		form.append('Profile-Id', user_id)

		celesupApi.post('/profile/view', form).then((res) => {
			setUser(res.data)
		})
	}

	const contextValues = {
		user,
		tokens,
		state: focusStates,
		setUser,
		updateTokens,
		setFocusState,
		supcelLibrary: Supcel,
	}

	return (
		<div id='App'>
			<GlobalContext.Provider value={contextValues}>
				{/* <Navbar /> */}
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route exact path='/' element={<Index />} />
						<Route path={`/:username`} element={<Dashboard />} />
						<Route path={`/:username/explore`} element={<ExplorePosts />} />

						<Route path={`/profile/:username`} element={<UserProfile />} />

						<Route path='/login' element={<Login setUser={setUser} />} />
						<Route path='/signup' element={<Register />} />
						<Route path='*' element={<PageNotFound />} />
					</Routes>
					{focusStates?.createPost && <CreateNewPost />}
					<MobileNavbarLinks />
				</BrowserRouter>
			</GlobalContext.Provider>
		</div>
	)
}

export default App
