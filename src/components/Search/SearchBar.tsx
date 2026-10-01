import { useRef, useState, useEffect, type JSX } from 'react'
import { motion } from 'motion/react'
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
		<Container>
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

const Container = styled.div`
	position: absolute;
	top: 135px;
	display: flex;
	flex-direction: column;
	width: 100%;
	z-index: 1000;

	> div > button {
		position: relative;
		overflow: hidden;
		background-color: ${({ theme }) => theme.sidebarBackground};

		/* Gradient sits on its own layer, fixed in place, and simply fades
		   in/out on hover — it no longer sweeps left-to-right via an
		   animated background-position (the ::before element's own
		   position never changes; only its opacity transitions). Spans
		   edge-to-edge (gradient1 -> gradient2, no trailing fade back to
		   the plain background color) so the highlight visibly covers
		   the whole tab instead of blending back into the background
		   partway across — that trailing fade-to-background stop only
		   made sense for the old sweep animation, which relied on it to
		   look like the highlight was wiping in from one side. */
		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background-image: linear-gradient(to right, ${({ theme }) => theme.gradient1}, ${({ theme }) => theme.gradient2});
			opacity: 0;
			transition: opacity 300ms ease-in-out;
			pointer-events: none;
		}

		&:hover::before {
			opacity: 1;
		}

		> * {
			position: relative;
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
