import { CELESUP_BASE_URL } from '../../../axiosInstances'

const NewPostCard = ({ context }) => {
	function createPost({ currentTarget }) {
		if (currentTarget.getAttribute('data-file')) {
			localStorage.setItem('openFile', true)
		}
		context.setFocusState({
			...context.state,
			createPost: true,
		})
	}

	return (
		<div className='flat-card br-md mb-2 new__post'>
			<div className='d-flex align-items-center'>
				<div className='profile-img-lg mr-1'>
					<img className='' src={CELESUP_BASE_URL + context.user?.avatar} alt='' />
				</div>
				<div className='d-inline-block' style={{ width: '85%' }}>
					<input
						onClick={createPost}
						type='text'
						className='br-lg px-1 cursor-pointer'
						placeholder='Start a post...'
					/>
				</div>
			</div>
			<div className='post__features d-flex justify-content-between align-items-center px-1 mt-1 py-1 light-text'>
				<div onClick={createPost} data-file className='d-flex cursor-pointer'>
					<span className='icon-wrapper'>
						<svg
							className='blue-icon'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 512 512'>
							<path d='M447.1 32h-384C28.64 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM111.1 96c26.51 0 48 21.49 48 48S138.5 192 111.1 192s-48-21.49-48-48S85.48 96 111.1 96zM446.1 407.6C443.3 412.8 437.9 416 432 416H82.01c-6.021 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.334-16.68l70-96C142.1 290.4 146.9 288 152 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C293.7 194.7 298.7 192 304 192s10.35 2.672 13.31 7.125l128 192C448.6 396 448.9 402.3 446.1 407.6z' />
						</svg>
					</span>
					<span className='ml-__'>Image</span>
				</div>
				<div onClick={createPost} data-file className='d-flex cursor-pointer'>
					<span className='icon-wrapper'>
						<svg
							className='green-icon'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 448 512'>
							<path d='M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z' />
						</svg>
					</span>
					<span className='ml-__'>Video</span>
				</div>
				<div onClick={createPost} className='d-flex cursor-pointer'>
					<span className='icon-wrapper'>
						<svg
							className='orange-icon'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 448 512'>
							<path d='M160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32zM0 192H448V464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192zM64 304C64 312.8 71.16 320 80 320H112C120.8 320 128 312.8 128 304V272C128 263.2 120.8 256 112 256H80C71.16 256 64 263.2 64 272V304zM192 304C192 312.8 199.2 320 208 320H240C248.8 320 256 312.8 256 304V272C256 263.2 248.8 256 240 256H208C199.2 256 192 263.2 192 272V304zM336 256C327.2 256 320 263.2 320 272V304C320 312.8 327.2 320 336 320H368C376.8 320 384 312.8 384 304V272C384 263.2 376.8 256 368 256H336zM64 432C64 440.8 71.16 448 80 448H112C120.8 448 128 440.8 128 432V400C128 391.2 120.8 384 112 384H80C71.16 384 64 391.2 64 400V432zM208 384C199.2 384 192 391.2 192 400V432C192 440.8 199.2 448 208 448H240C248.8 448 256 440.8 256 432V400C256 391.2 248.8 384 240 384H208zM320 432C320 440.8 327.2 448 336 448H368C376.8 448 384 440.8 384 432V400C384 391.2 376.8 384 368 384H336C327.2 384 320 391.2 320 400V432z' />
						</svg>
					</span>
					<span className='ml-__'>Event</span>
				</div>
				<div onClick={createPost} className='d-flex cursor-pointer'>
					<span className='icon-wrapper'>
						<svg
							className='red-icon'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 512 512'>
							<path d='M0 32C0 14.33 14.33 0 32 0H160C177.7 0 192 14.33 192 32V416C192 469 149 512 96 512C42.98 512 0 469 0 416V32zM128 64H64V128H128V64zM64 256H128V192H64V256zM96 440C109.3 440 120 429.3 120 416C120 402.7 109.3 392 96 392C82.75 392 72 402.7 72 416C72 429.3 82.75 440 96 440zM224 416V154L299.4 78.63C311.9 66.13 332.2 66.13 344.7 78.63L435.2 169.1C447.7 181.6 447.7 201.9 435.2 214.4L223.6 425.9C223.9 422.7 224 419.3 224 416V416zM374.8 320H480C497.7 320 512 334.3 512 352V480C512 497.7 497.7 512 480 512H182.8L374.8 320z' />
						</svg>
					</span>
					<span className='ml-__'>Article</span>
				</div>
			</div>
		</div>
	)
}

export default NewPostCard
