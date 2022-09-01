import './style.css'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { celesupApi } from '../../../axiosInstances'
import Dropdown from '../../custom/dropdown'

export default function Post({ post }) {
	const [postData, setPosts] = useState(post)
	const [likedByUsers, setLikedByUsers] = useState(post.liked_by_users)
	const [myLikes, setMylikes] = useState(post.me)

	const navigate = useNavigate()

	function gotoAuthorProfile() {
		console.log(post.author, post.post_author)
		localStorage.setItem('pvpk', post.author.id)
		navigate(`/profile/${postData.post_author}`)
	}

	function togglePostDropdownMenu(toggler, option) {
		console.log(option)
		if (option.toString().toLowerCase() === 'follow') {
			likePost()
		}
		if (option.toString().toLowerCase() === 'unfollow') {
			likePost()
		}
		toggler((prev) => !prev)
	}

	async function likePost() {
		const form = new FormData()
		form.append('post_key', postData.key)

		celesupApi.post('/posts/like', form).then((res) => {
			setPosts(res.data.post)
			setLikedByUsers(res.data.liked_by_users)
			setMylikes(res.data.me)
		})
	}

	return (
		<div className='post'>
			{/* author */}
			<div className='d-flex align-items-center justify-content-between pb-__'>
				<div onClick={gotoAuthorProfile} className='d-flex align-items-center justify-content-between'>
					<div className='profile-img'>
						<img src={postData.author.avatar} alt='' className='cursor-pointer' />
					</div>
					<span className='username px-1 cursor-pointer'>
						@<b>{postData.post_author}</b>
					</span>
				</div>
				<Dropdown
					button={
						<span data-dropdown-button className='icon-wrapper br-full width-2-rem height-2-rem'>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
								<path d='M12,10a2,2,0,1,0,2,2A2,2,0,0,0,12,10ZM5,10a2,2,0,1,0,2,2A2,2,0,0,0,5,10Zm14,0a2,2,0,1,0,2,2A2,2,0,0,0,19,10Z' />
							</svg>
						</span>
					}
					btnParentClass='pos-absolute top-neg-2-rem right-0'
					items={[
						// {
						// 	text: 'Follow',
						// 	icon: (
						// 		<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>
						// 			<path d='M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z' />
						// 		</svg>
						// 	),
						// 	onClicked: togglePostDropdownMenu,
						// },
						{
							text: 'unFollow',
							icon: (
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>
									<path d='M274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM577.9 223.1l47.03-47.03c9.375-9.375 9.375-24.56 0-33.94s-24.56-9.375-33.94 0L544 190.1l-47.03-47.03c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l47.03 47.03l-47.03 47.03c-9.375 9.375-9.375 24.56 0 33.94c9.373 9.373 24.56 9.381 33.94 0L544 257.9l47.03 47.03c9.373 9.373 24.56 9.381 33.94 0c9.375-9.375 9.375-24.56 0-33.94L577.9 223.1z' />
								</svg>
							),
							onClicked: togglePostDropdownMenu,
						},
						{
							text: 'Report Post',
							icon: (
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
									<path d='M476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87c-34.63 0-77.87 8.003-137.2 32.05V24C48 10.75 37.25 0 24 0S0 10.75 0 24v464C0 501.3 10.75 512 24 512s24-10.75 24-24v-104c53.59-23.86 96.02-31.81 132.8-31.81c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0zM464 319.8c-30.31 10.82-58.08 16.1-84.6 16.1c-30.8 0-58.31-7-87.44-14.41c-32.01-8.141-68.29-17.37-111.1-17.37c-42.35 0-85.99 9.09-132.8 27.73V84.14l18.03-7.301c47.39-19.2 86.38-28.54 119.2-28.54c28.24 .0039 49.12 6.711 73.31 14.48c25.38 8.148 54.13 17.39 90.58 17.39c35.43 0 72.24-8.496 114.9-26.61V319.8z' />
								</svg>
							),
							onClicked: togglePostDropdownMenu,
						},
						{
							text: `Add/remove ${post.author.username} from list`,
							icon: (
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
									<path d='M448 336v-288C448 21.49 426.5 0 400 0H96C42.98 0 0 42.98 0 96v320c0 53.02 42.98 96 96 96h320c17.67 0 32-14.33 32-31.1c0-11.72-6.607-21.52-16-27.1v-81.36C441.8 362.8 448 350.2 448 336zM143.1 128h192C344.8 128 352 135.2 352 144C352 152.8 344.8 160 336 160H143.1C135.2 160 128 152.8 128 144C128 135.2 135.2 128 143.1 128zM143.1 192h192C344.8 192 352 199.2 352 208C352 216.8 344.8 224 336 224H143.1C135.2 224 128 216.8 128 208C128 199.2 135.2 192 143.1 192zM384 448H96c-17.67 0-32-14.33-32-32c0-17.67 14.33-32 32-32h288V448z' />
								</svg>
							),
							onClicked: togglePostDropdownMenu,
						},
						{
							text: 'Not Interested',
							icon: (
								<svg xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 24 24'>
									<path d='M10.94,6.08A6.93,6.93,0,0,1,12,6c3.18,0,6.17,2.29,7.91,6a15.23,15.23,0,0,1-.9,1.64,1,1,0,0,0-.16.55,1,1,0,0,0,1.86.5,15.77,15.77,0,0,0,1.21-2.3,1,1,0,0,0,0-.79C19.9,6.91,16.1,4,12,4a7.77,7.77,0,0,0-1.4.12,1,1,0,1,0,.34,2ZM3.71,2.29A1,1,0,0,0,2.29,3.71L5.39,6.8a14.62,14.62,0,0,0-3.31,4.8,1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20a9.26,9.26,0,0,0,5.05-1.54l3.24,3.25a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Zm6.36,9.19,2.45,2.45A1.81,1.81,0,0,1,12,14a2,2,0,0,1-2-2A1.81,1.81,0,0,1,10.07,11.48ZM12,18c-3.18,0-6.17-2.29-7.9-6A12.09,12.09,0,0,1,6.8,8.21L8.57,10A4,4,0,0,0,14,15.43L15.59,17A7.24,7.24,0,0,1,12,18Z' />
								</svg>
							),
							onClicked: togglePostDropdownMenu,
						},
					]}
					options={{
						left: '-295px',
					}}
				/>
			</div>

			<div className='pl-1' style={{ marginLeft: '40px' }}>
				{/* caption */}
				<div className='post__caption pb-__'>
					{/* <h3>{postData.title}</h3> */}
					<span className='' style={{ fontSize: '23px' }}>
						Lorem ipsum dolor sit.
					</span>
				</div>
				{/* excerpt */}
				<div className='post__excerpt pb-__'>
					<p className='typography' style={{ fontSize: '12px' }}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, ullam cumque nam architecto culpa atque accusantium pariatur dolorum laborum aut!
						{postData.caption}
					</p>
				</div>

				{/* picture / video */}
				<div className='picture d-flex justify-content-center pb-__'>
					<span className='post-image'>{postData.picture && <img src={`${postData.picture}`} alt='' className='responsive br-md' />}</span>
				</div>

				{/* Post Interaction/activities */}
				<div className='post__interactions mt-1 '>
					{likedByUsers.length >= 5 && (
						<div className='recent__likes ml-3'>
							{likedByUsers.map((user) => {
								return (
									<div className='liked__by__users d-flex pos-relative'>
										<div key={user.id} className='user width-30-px height-30-px br-full pos-absolute'>
											<img className='responsive br-full' src={user.avatar} alt='' />
										</div>
									</div>
								)
							})}

							{!myLikes ? <p className='__text light-text'>liked by 25 others</p> : <p className='__text light-text'>you and 123 others like this post</p>}
						</div>
					)}
					<div className='interact d-flex justify-content-evenly align-items-center'>
						<div className='d-flex flex-column align-items-center likes'>
							<span className='icon-wrapper'>
								{myLikes ? (
									<svg onClick={likePost} className='red-icon cursor-pointer' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
										<path d='M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z' />
									</svg>
								) : (
									<svg onClick={likePost} className='grey-icon cursor-pointer' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
										<path d='M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z' />
									</svg>
								)}
							</span>
							<span className='font-sm'>{postData.post_likes}</span>
						</div>
						<div className='d-flex flex-column align-items-center share'>
							<span className='icon-wrapper'>
								<svg className='grey-icon cursor-pointer' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
									<path d='M18,14a4,4,0,0,0-3.08,1.48l-5.1-2.35a3.64,3.64,0,0,0,0-2.26l5.1-2.35A4,4,0,1,0,14,6a4.17,4.17,0,0,0,.07.71L8.79,9.14a4,4,0,1,0,0,5.72l5.28,2.43A4.17,4.17,0,0,0,14,18a4,4,0,1,0,4-4ZM18,4a2,2,0,1,1-2,2A2,2,0,0,1,18,4ZM6,14a2,2,0,1,1,2-2A2,2,0,0,1,6,14Zm12,6a2,2,0,1,1,2-2A2,2,0,0,1,18,20Z' />
								</svg>
							</span>
							<span className='font-sm'>10+</span>
						</div>
						<div className='d-flex flex-column align-items-center comment'>
							<span className='icon-wrapper'>
								<svg className='grey-icon cursor-pointer' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
									<path d='M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z' />
								</svg>
							</span>
							<span className='font-sm'>20+</span>
						</div>
						<div className='d-flex flex-column align-items-center bookmark'>
							<span className='icon-wrapper'>
								<svg className='grey-icon cursor-pointer' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'>
									<path d='M336 0h-288C21.49 0 0 21.49 0 48v431.9c0 24.7 26.79 40.08 48.12 27.64L192 423.6l143.9 83.93C357.2 519.1 384 504.6 384 479.9V48C384 21.49 362.5 0 336 0zM336 452L192 368l-144 84V54C48 50.63 50.63 48 53.1 48h276C333.4 48 336 50.63 336 54V452z' />
								</svg>
							</span>
							<span className='font-sm'>5</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
