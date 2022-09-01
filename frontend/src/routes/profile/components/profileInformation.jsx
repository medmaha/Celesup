const ProfileInformation = ({ profile }) => {
	return (
		<div className='profile__information card br-none pt-2 pos-relative pb-1'>
			<div className='row'>
				<div className='col-7-md'>
					<span className='font-lg full_name'>{profile.full_name}</span>
					<p className='biography test-muted'>{profile.biography}</p>
					<div className='d-flex align-items-center justify-content-between font-sm mt-1 mb-1 text-center'>
						<div>
							<span>{profile.city} The Gambia </span>
							<span className='mx-1 teal-text-lighten-3 cursor-pointer text-hover-blue-lighten-3'>Contact Info</span>
						</div>
						<div className='friends'>
							<button className='btn-outline-teal btn-small teal-text-lighten-3 text-hover-white'>{profile.friends} Friends</button>
						</div>
					</div>

					<div className='social d-flex justify-content-evenly font-sm'>
						<span className='btn-outline-blue blue-text font-md br-md'>Followers {profile.followers}</span>
						<span className='btn-outline-blue blue-text font-md br-md'>Following {profile.following}</span>
					</div>
				</div>

				<div className='col-12-sm col-5-md user__experience'>
					<div className='d-flex flex-column'>
						<div className=''>
							<h3 className='user__type text-center light-text'>{profile.user_type.toUpperCase()}</h3>
						</div>
						<div className='d-flex justify-content-right'>
							<p className='py-1'>
								Zoluptatem perspiciatis voluptas, recusandae possimus velit dolores. Officia alias voluptatem ut dolore hic sint asperiores soluta facere. Excepturi, asperiores?
								Adipisci, natus.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className='edit__profile__btn pos-absolute top-5 cursor-pointer d-flex align-items-center' style={{ right: '1.50%' }}>
				<span className='icon-wrapper d-flex align-items-center'>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
						<path d='M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z' />
					</svg>
				</span>
				<small style={{ paddingLeft: '.2rem' }}>EDIT</small>
			</div>
		</div>
	)
}

export default ProfileInformation
