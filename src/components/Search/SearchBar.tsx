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
	const containerRef = useRef<HTMLDivElement>(null)
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
		navigate({ pathname: props.pathname, search: '?q=' + query }, { state: { searching: true } })
		props.setQuery(query)
		if (!ref.current) {
			return
		}
		ref.current.value = query
	}

	// `state: { searching: true }` on every one of these is required, not
	// decorative: isSearching (in App.tsx) is `Boolean(query) ||
	// Boolean(location.state.searching)` -- so as soon as query becomes
	// empty (Clear, or Search submitted with an empty field), losing that
	// state flag would make isSearching collapse to false and silently
	// close the whole search bar as a side effect, even though neither
	// button's job is to close anything. Closing is handled separately
	// now (search icon, dedicated X, or clicking outside).
	const handleSearchSubmit = (query: string) => {
		navigate({ pathname: props.pathname, search: query ? '?q=' + query : '' }, { state: { searching: true } })
		props.setQuery(query || null)
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSearchSubmit((e.target as HTMLInputElement).value)
		}
	}

	return (
		<Container ref={containerRef}>
			<Sidebar
				isOpen={props.isSearching || props.isSmallScreen}
				setIsOpen={props.setIsSearching}
				isSmallScreen={props.isSmallScreen}
				onClick={handleSearchClick}
				onAnimationComplete={(x) => setTriggerContent(x)}
				ariaLabel={props.isSearching ? 'Close search' : 'Open search'}
				hasOwnInteractiveChildren={props.isSearching}
			>
				{/* pointer-events is none by default so clicks pass through to
				    the parent button when closed (it handles the open
				    click). When open, the parent is role="search" with no
				    click handler of its own (its real input/button
				    children handle their own clicks) -- so the icon needs
				    its own onClick here to let users close search by
				    clicking the magnifying glass again, not just the
				    dedicated close button in the corner. */}
				<SearchButton
					style={{ marginRight: !(props.isSearching || props.isSmallScreen) ? '40px' : 0 }}
					onClick={props.isSearching ? handleSearchClick : undefined}
					$clickable={props.isSearching}
				>
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
					<SubmitButton type="button" onClick={() => ref.current && handleSearchSubmit(ref.current.value)}>
						<span>Search</span>
					</SubmitButton>
				)}

				{props.isSearching && (
					<CloseButton type="button" onClick={handleSearchClick} aria-label="Close search">
						<span>X</span>
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

	/* The plain-button (closed) state's background + hover wash now live
	   directly in Sidebar.tsx (so the Footer's settings toggle, which
	   also uses Sidebar, gets the same resting background/hover
	   treatment this search bar always had). Only the open/
	   role="search" state's background is set here, since that state
	   hosts its own input/Search/Clear buttons with their own hover
	   treatments rather than acting as one clickable surface. */
	> div > [role='search'] {
		position: relative;
		background-color: ${({ theme }) => theme.sidebarBackground};
		transition: background-color 0.5s ease-in;

		> * {
			position: relative;
		}
	}
`

const SearchButton = styled.div<{ $clickable?: boolean }>`
	cursor: pointer;
	pointer-events: ${({ $clickable }) => ($clickable ? 'auto' : 'none')};
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 40px;
	min-width: 40px;

	svg {
		width: 20px;
		height: 20px;
	}
`

const CloseButton = styled.button`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 16px;
	min-width: 40px;
	height: 100%;
	white-space: nowrap;
	font-size: 11px;
	font-weight: 700;

	/* Same neutral grey wash hover as the suggestion pills / old sidebar
	   bar (see AnimateIdea above) -- consistent hover language across
	   every tab/button-like control in the search bar. */
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
`

const SubmitButton = styled.button`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 16px;
	min-width: 40px;
	height: 100%;
	white-space: nowrap;
	font-size: 13px;

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
	transition:
		color 0.5s ease-in,
		background-color 0.5s ease-in;

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
