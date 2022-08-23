import './styles.css'
import { useEffect, useContext, useState } from 'react'
import { celesupApi, refreshAuthTokens } from '../../axiosInstances'

import { GlobalContext } from '../../App'

import ProfileImages from './components/profileImages'
import ProfileInformation from './components/profileInformation'
import ProfileEngagements from './components/profileEngagements'
import ProfileActivities from './components/profileActivities'
import useComplexAxiosRequests from '../../hooks/useComplexRefresh'

const UserProfile = () => {
	const context = useContext(GlobalContext)
	const profileID = localStorage.getItem('pvpk')
	const [readOnly, setReadOnly] = useState(false)
	const [profileData, pendingData, error, sendAxiosRequest] = useComplexAxiosRequests()

	useEffect(() => {
		const form = new FormData()
		form.append('Profile-Id', profileID)

		sendAxiosRequest({
			axiosInstance: celesupApi,
			url: '/profile/view',
			method: 'POST',
			form: form,
		})

		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (!context.user || !profileData) return

		if (context.user.id !== profileID) setReadOnly(true)

		if (profileData.first_name && profileData.last_name) {
			document.title =
				profileData.first_name.toUpperCase() + ' ' + profileData.last_name.toUpperCase()
			return
		}

		document.title = 'CELESUP | ' + profileData.username.toUpperCase()

		// eslint-disable-next-line
	}, [context])

	useEffect(() => {
		if (!profileData) return

		if (profileData && !readOnly) {
			// const newTokens = refreshUserTokens()
			// console.log(newTokens);
			// context.updateTokens({access: newTokens.access, refresh: newTokens.refresh})
		}

		// eslint-disable-next-line
	}, [profileData])

	async function editProfile(form, config) {
		form.append('Profile-Id', profileID)

		sendAxiosRequest({
			axiosInstance: celesupApi,
			url: '/profile/edit',
			method: 'PUT',
			form: form,
			options: config,
			subsequentRequests: { func: refreshAuthTokens, arguments: [context.updateTokens] },
		})
	}

	function editProfileImages({ currentTarget }) {
		const input = document.createElement('input')
		input.setAttribute('type', 'file')
		input.click()

		input.addEventListener('change', () => {
			const form = new FormData()
			form.append(currentTarget.getAttribute('data-field'), input.files[0])

			const config = {
				headers: { 'Content-Type': 'multipart/form-data' },
			}

			editProfile(form, config)
		})
	}

	return (
		<div className='container row justify-content-center gap-1 mt-2'>
			{profileData && (
				<>
					<div className='col-9-lg col-8-md' id='columnOne'>
						<ProfileImages
							readOnly={readOnly}
							profile={profileData}
							editProfileImages={editProfileImages}
						/>

						<ProfileInformation
							readOnly={readOnly}
							profile={profileData}
							editProfileImages={editProfileImages}
						/>

						<ProfileEngagements
							readOnly={readOnly}
							profile={profileData}
							editProfileImages={editProfileImages}
						/>
					</div>

					{/* Second columns */}
					<div className='activities col-4-md col-3-lg columnTwo'>
						<ProfileActivities
							readOnly={readOnly}
							profile={profileData}
							editProfileImages={editProfileImages}
						/>
					</div>
				</>
			)}
			{pendingData && <h1>Loading...</h1>}
			{error && <h1>Oops an error occurred</h1>}
		</div>
	)
}

export default UserProfile
