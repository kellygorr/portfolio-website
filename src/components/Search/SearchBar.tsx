import { useRef, useState, useEffect, type JSX } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import styled from 'styled-components'
import { SearchIcon } from '../../assets/svg/SearchIcon'
import { SkillType, TagType } from '../../data/IProject'
import { useNavigate } from 'react-router-dom'
import { Sanitize, Sidebar } from '../shared'
import { NeutralColors } from '../../styles/theme'

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

const ideasList = [TagType.Microsoft, SkillType.UIUX, TagType.Copilot]

export const SearchBar = (props: ISearchProps): JSX.Element => {
	const ref = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()
	const prefersReducedMotion = useReducedMotion()
	// Lazy-initialized from the CURRENT isSearching value (not always
	// 'closed') — Sidebar's own sidebar-expand animation has
	// `initial={false}`, so if search is already open on first mount
	// (e.g. loading a URL with ?q= already set), no actual animation
	// runs and its onAnimationComplete callback (the only other place
	// that sets this to 'open' — see the Sidebar usage below) never
	// fires. Without this lazy init, triggerContent would stay stuck at
	// 'closed' forever in that case, leaving the idea pills invisible
	// (opacity: 0 per the `closed` variant) for the entire time search
	// stays open.
	const [triggerContent, setTriggerContent] = useState(props.isSearching ? 'open' : 'closed')

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
		// Sanitize the DISPLAYED label ("UI/UX"), not the raw stored tag
		// value ("UI-UX") — so the resulting query/URL/heading preserves
		// the slash the user actually sees on the pill, instead of
		// silently becoming "ui-ux". SearchResults.tsx treats '/' and '-'
		// as equivalent when matching, so this doesn't break matching.
		const label = item === SkillType.UIUX ? 'UI/UX' : item
		const query = Sanitize(label)
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
				onClick={props.isSearching ? () => {} : handleSearchClick}
				onAnimationComplete={(x) => setTriggerContent(x)}
				ariaLabel={props.isSearching ? 'Close search' : 'Open search'}
				asElement={props.isSearching ? 'div' : 'button'}
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

				{props.isSearching && (
					<CloseButton type="button" onClick={handleSearchClick} aria-label="Close search">
						X
					</CloseButton>
				)}
			</Sidebar>
			<AnimatePresence>
				{props.isSearching && !props.isSmallScreen && (
					<AnimateIdeas
						variants={prefersReducedMotion ? undefined : ideas}
						initial={prefersReducedMotion ? false : 'closed'}
						animate={prefersReducedMotion ? undefined : triggerContent}
						exit={prefersReducedMotion ? undefined : 'closed'}
					>
						{ideasList.map((item) => (
							<AnimateIdea
								key={item}
								type="button"
								variants={prefersReducedMotion ? undefined : idea}
								onClick={() => handleIdeaClick(item)}
							>
								{/* Search on the ORIGINAL tag value ("UI-UX"), only the
								    displayed label is renamed to "UI/UX" — see the
								    matching comment in Tag.tsx. */}
								<span>{item === SkillType.UIUX ? 'UI/UX' : item}</span>
							</AnimateIdea>
						))}
					</AnimateIdeas>
				)}
			</AnimatePresence>
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
		background-color: ${({ theme }) => theme.sidebarBackground};

		/* Neutral grey wash, fixed in place, that simply fades in/out on
		   hover (the ::before element's own position never changes;
		   only its opacity transitions) — replaces an earlier accent
		   gradient here, which read as too colorful/attention-grabbing
		   for a plain hover state. Matches the neutral grey hover tone
		   used by the footer's own link/settings hover treatment. */
		&::before {
			content: '';
			position: absolute;
			inset: 0;
			border-radius: inherit;
			background-color: ${NeutralColors.neutral40};
			opacity: 0;
			transition: opacity 150ms ease-in-out;
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

const CloseButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	min-width: 40px;
	height: 100%;
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
const AnimateIdea = styled(motion.button)`
	position: relative;
	overflow: hidden;
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

	/* Same neutral grey wash hover as the search/settings tabs (see
	   Container's own ::before above and Footer.tsx's settings button)
	   — a fixed-position overlay that only fades its opacity on hover,
	   instead of animating position/size, for a consistent hover
	   language across all three of these tab-like controls. */
	&::before {
		content: '';
		position: absolute;
		inset: 0;
		background-color: ${NeutralColors.neutral40};
		opacity: 0;
		transition: opacity 150ms ease-in-out;
		pointer-events: none;
	}

	&:hover::before {
		opacity: 1;
	}

	> * {
		position: relative;
	}
`
