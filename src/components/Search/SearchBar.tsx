import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { SearchIcon } from '../../assets/svg/SearchIcon'
import { SkillType, TagType } from '../../data/IProject'
import { useNavigate } from 'react-router-dom'
import { Sanitize, Sidebar } from '../shared'

interface ISearchProps {
	query: string | null
	setQuery: (query: string | null) => void
	isSearching: boolean
	isSmallScreen: boolean
	setIsSearching: (isOpen: boolean) => void
	pathname: string
}

const ideas = {
	open: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
	closed: {
		opacity: 0,
	},
}

const idea = {
	closed: { y: -50 },
	open: { y: 20 },
}

const ideasList = [SkillType.React, TagType.Tooling, SkillType.Design]

export const SearchBar = (props: ISearchProps): JSX.Element => {
	const ref = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()
	const [triggerContent, setTriggerContent] = useState('closed')

	useEffect(() => {
		if (props.isSearching && ref.current) {
			// ref.current?.value = props.query
			ref.current.focus()
		} else {
			setTriggerContent('closed')
			props.setQuery(null)
		}
	}, [props])

	const handleSearchClick = () => {
		props.setIsSearching(!props.isSearching)
	}

	const handleIdeaClick = (item: string) => {
		const query = Sanitize(item)
		navigate({ pathname: props.pathname, search: '?q=' + query })
		props.setQuery(query)
		if (!ref.current) {
			return
		}
		ref.current.value = query
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			const query = (e.target as HTMLInputElement).value
			navigate({ pathname: props.pathname, search: '?q=' + query })
			props.setQuery(query)
		}
	}

	return (
		<Container isOpen={props.isSearching}>
			<Sidebar
				isOpen={props.isSearching || props.isSmallScreen}
				setIsOpen={props.setIsSearching}
				isSmallScreen={props.isSmallScreen}
				onClick={handleSearchClick}
				onAnimationComplete={(x) => setTriggerContent(x)}
				ariaLabel={props.isSearching ? 'Close search' : 'Open search'}
			>
				<SearchButton style={{ marginRight: !(props.isSearching || props.isSmallScreen) ? '40px' : 0 }}>
					<SearchIcon />
				</SearchButton>

				{props.isSearching && (
					<Input
						onClick={(e) => e.stopPropagation()}
						ref={ref}
						onKeyDown={handleKeyDown}
						aria-label={'Search field'}
						defaultValue={props.query || undefined}
					/>
				)}

				{props.isSearching && <SearchButton>X</SearchButton>}
			</Sidebar>
			{props.isSearching && !props.isSmallScreen && (
				<AnimateIdeas variants={ideas} animate={triggerContent}>
					{ideasList.map((item) => (
						<AnimateIdea key={item} variants={idea} onClick={() => handleIdeaClick(item)}>
							{item}
						</AnimateIdea>
					))}
				</AnimateIdeas>
			)}
		</Container>
	)
}

interface IStyle {
	isOpen: boolean
}

const Container = styled.div<IStyle>`
	position: absolute;
	top: 135px;
	display: flex;
	flex-direction: column;
	width: 100%;
	z-index: 1000;

	> div > button {
		background-color: ${({ theme }) => theme.sidebarBackground};

		background-image: linear-gradient(
			to right,
			${({ theme }) => theme.gradient1} 5%,
			${({ theme }) => theme.gradient2} 30%,
			${({ theme }) => theme.sidebarBackground} 75%
		);
		background-position: right center;
		background-size: 400% 100%;

		&:hover {
			background-position: ${({ isOpen }) => (isOpen ? 'right center' : 'left center')};

			transition: background-position 500ms ease-in-out;
		}
	}
`

const SearchButton = styled.div`
	cursor: pointer;
	pointer-events: none;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 40px;
	min-width: 40px;

	svg {
		width: 23px;
		height: 23px;
	}
`

const Input = styled.input`
	height: 100%;
	width: 100%;
	background-color: transparent;
	border: 0;
	text-align: center;
`

const AnimateIdeas = styled(motion.div)`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
	height: 70px;
	min-height: 70px;
	opacity: 0;
	overflow: hidden;
`
const AnimateIdea = styled(motion.div)`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 10px;
	height: 40px;
	padding: 10px;
	width: 150px;
	border-radius: 5px;

	color: ${({ theme }) => theme.sidebarText};
	background-color: ${({ theme }) => theme.sidebarBackground};
`
