import { CELESUP_BASE_URL } from '../../../axiosInstances'

const ProfileImages = ({ profile, readOnly, editProfileImages }) => {
	return (
		<div className='profile pos-relative'>
			<div className='cover__image'>
				<img className='responsive' src={CELESUP_BASE_URL + profile.cover_img} alt='' />
			</div>
			{!readOnly ? (
				<>
					<div onClick={editProfileImages} data-field='avatar' className='profile__avatar pos-absolute'>
						<img src={CELESUP_BASE_URL + profile.avatar} className='responsive' alt='' />
					</div>
					<div onClick={editProfileImages} data-field='cover_img' className='edit__cover_image__btn br-full pos-absolute top-5 p-__ grey-lighten-2' style={{ right: '2%' }}>
						<span className='icon-wrapper d-flex align-items-center'>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
								<path d='M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z' />
							</svg>
						</span>
					</div>
				</>
			) : (
				<>
					<div data-field='avatar' className='profile__avatar pos-absolute'>
						<img src={CELESUP_BASE_URL + profile.avatar} className='responsive' alt='' />
					</div>
				</>
			)}
		</div>
	)
}

export default ProfileImages
