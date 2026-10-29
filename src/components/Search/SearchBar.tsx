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

	// Close search when clicking anywhere outside it (e.g. the header
	// area above it, or the page content below) -- mousedown (not click)
	// so this fires before any click-through handler on whatever was
	// clicked, matching the usual "dismiss on outside interaction"
	// pattern for dropdowns/popovers.
	const { isSearching, setIsSearching } = props
	useEffect(() => {
		if (!isSearching) {
			return
		}
		const handlePointerDown = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsSearching(false)
			}
		}
		document.addEventListener('mousedown', handlePointerDown)
		return () => document.removeEventListener('mousedown', handlePointerDown)
	}, [isSearching, setIsSearching])

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

	// Clears the input and any active query/results, but leaves search
	// OPEN -- closing it is handled separately now (clicking the search
	// icon again, or clicking outside the search area), so this button's
	// only job is clearing, matching its label.
	// Uses replace (not push) -- Clear doesn't represent a new search a
	// user would want to step back through individually via the browser
	// Back button, just "undo what's in the box right now". Using push
	// here would also silently break closing: every OTHER close
	// affordance (X, icon-click, outside-click) does a single
	// navigate(-1), so each extra pushed entry from Clear/Submit would
	// require its own separate close click/Back press before search
	// actually exits.
	const handleClearClick = () => {
		if (ref.current) {
			ref.current.value = ''
		}
		navigate({ pathname: props.pathname, search: '' }, { replace: true, state: { searching: true } })
		props.setQuery(null)
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
						Search
					</SubmitButton>
				)}

				{props.isSearching && (
					<ClearButton type="button" onClick={handleClearClick} aria-label="Clear search">
						Clear
					</ClearButton>
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

			{props.isSearching && (
				<CloseCircleButton type="button" onClick={handleSearchClick} aria-label="Close search">
					X
				</CloseCircleButton>
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

	/* Sidebar always renders one consistent <motion.div> element across
	   both states now (only its role attribute changes between 'button'
	   and 'search') -- see the comment on hasOwnInteractiveChildren in
	   Sidebar.tsx for why that matters. Match on the role attribute
	   rather than element tag so this styling applies to both states. */
	> div > [role='button'],
	> div > [role='search'] {
		position: relative;
		background-color: ${({ theme }) => theme.sidebarBackground};

		> * {
			position: relative;
		}
	}

	/* Neutral grey wash, fixed in place, that simply fades in/out on hover
	   (the ::before element's own position never changes; only its
	   opacity transitions) — replaces an earlier accent gradient here,
	   which read as too colorful/attention-grabbing for a plain hover
	   state. Matches the neutral grey hover tone used by the footer's
	   own link/settings hover treatment.
	   Scoped to role="button" (the closed state) only -- once search is
	   open (role="search"), the whole bar is no longer a single click
	   target (it now hosts its own input/search/close buttons with
	   their own hover states), so washing the entire bar on hover no
	   longer means anything and just looks like a stray flash. */
	> div > [role='button'] {
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
		width: 23px;
		height: 23px;
	}
`

const ClearButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 16px;
	min-width: 40px;
	height: 100%;
	white-space: nowrap;
	font-size: 13px;
`

const SubmitButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 16px;
	min-width: 40px;
	height: 100%;
	white-space: nowrap;
	font-size: 13px;
`

const CloseCircleButton = styled.button`
	position: fixed;
	top: 24px;
	right: 24px;
	z-index: 1001;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.sidebarBackground};
	color: ${({ theme }) => theme.sidebarText};
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
