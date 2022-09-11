import { useEffect } from 'react'
import { useState } from 'react'
import { celesupApi } from '../axiosInstances'
import useAxiosRequest from '../hooks/useAxiosRequest'
import './searchBar.css'

function SearchBar() {
	const [search, setSearch] = useState('')
	const [isFocus, setIsFocus] = useState(false)
	const [queryFound, setQueryFound] = useState(false)
	const [queryResults, setQueryResults] = useState([])
	const [response, pending, error, sendAxiosRequest] = useAxiosRequest()

	useEffect(() => {
		document.getElementById('navSearchQuery').addEventListener('focus', () => setIsFocus(true))
		document.getElementById('navSearchQuery').addEventListener('focusout', () => setIsFocus(false))
		document.getElementById('navSearchQuery').addEventListener('input', handleQueryChanged)
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (search) {
		}
		if (!search) {
			setQueryResults([])
		}
	}, [search])

	useEffect(() => {
		if (!response) return
		setQueryFound(true)
		setQueryResults(response.query)
		console.log(response)
	}, [response])

	function handleQueryChanged({ target }) {
		const query = target.value.toLowerCase().trim()
		setSearch(query)

		if (query !== '') {
			sendAxiosRequest({
				axiosInstance: celesupApi,
				method: 'GET',
				url: '/search_query',
			})
		}
	}

	function toggleSearchBar() {
		document.querySelector('nav .nav-brand').classList.toggle('hide')
		document.querySelector('nav .nav-profile').classList.toggle('hide')
		document.getElementById('navSearchQuery').classList.toggle('active')

		if (document.getElementById('navSearchQuery').classList.contains('active')) {
			document.getElementById('navSearchQuery').focus()
		}
	}

	return (
		<div className='nav-search search-wrapper'>
			<input
				type='text'
				name='query'
				autoCorrect='off'
				autoComplete='off'
				spellCheck={false}
				id='navSearchQuery'
				enterKeyHint='search'
				autoCapitalize='sentence'
				aria-label='Search Celesup'
				className='br-md search-bar'
				placeholder='Search Celesup'
				onBlur={toggleSearchBar}
			/>
			<span className='search-bar-toggler' onClick={toggleSearchBar}>
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
					<path d='M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z' />
				</svg>
			</span>

			<div className={isFocus ? `search-modal active` : 'search-modal'}>
				<div className='search-results'>
					{!pending && queryResults?.length < 1 && <span data-hint-text>Try searching for people, topics, or keywords</span>}
					{!pending &&
						queryResults?.map((result, idx) => {
							return (
								<div key={idx}>
									{' '}
									{result.username} {idx}
								</div>
							)
						})}
					{pending && <h4>Loading...</h4>}
				</div>
			</div>

			<template data-result-template>
				<div className='result'>
					<div data-query-match>
						<b>Deluxe</b>
					</div>
					<span className='text-muted'></span>
				</div>
			</template>
		</div>
	)
}

export default SearchBar
