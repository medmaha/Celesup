import './dashboard.css'
// import { useContext, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// #import { GlobalContext } from '../App'

import Activity from './activities/activity'
import PostsContainer from './posts/postsContainer'
import Trending from './trending/trending'

const Dashboard = () => {
	return (
		<main id='feedsContainer' className='p-1 gap-1 d-flex justify-content-center'>
			<Activity />
			<PostsContainer />
			<Trending />
		</main>
	)
}

export default Dashboard
