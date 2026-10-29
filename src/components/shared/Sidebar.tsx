import type { JSX, KeyboardEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import styled, { css } from 'styled-components'
import { SIDE_GAP, SIDE_GAP_SMALL_SCREEN } from '../../styles/GlobalStyles'
import { NeutralColors } from '../../styles/theme'

interface ISidebarProps {
	ariaLabel: string
	isOpen: boolean
	isSmallScreen: boolean
	onClick: () => void
	setIsOpen: (isOpen: boolean) => void
	onAnimationComplete?: (x: string) => void
	// When true, the sidebar is hosting interactive children of its own
	// (an <input> + close button, for SearchBar's open state) instead of
	// acting as a single button itself. A <button> can't legally contain
	// another <button> or an <input>, so this state is rendered with
	// role="search" and no click/keyboard handling on the container --
	// the real <button>/<input> children handle their own interaction.
	//
	// This is done by changing ONLY the ARIA role on one consistent
	// <motion.div>, never the underlying element tag. An earlier version
	// of this component switched between a real <motion.button> and
	// <motion.div> for these two states; React/Motion treat a changed
	// element tag as an entirely new component instance, which silently
	// abandoned the in-flight expand animation on every open and meant
	// onAnimationComplete never fired -- leaving anything keyed off it
	// (SearchBar's idea-pills reveal) permanently stuck invisible. Keeping
	// one element across both states preserves Motion's animation state
	// (and onAnimationComplete) across the whole open/close cycle.
	hasOwnInteractiveChildren?: boolean
	children?: React.ReactNode
}

export const Sidebar = (props: ISidebarProps): JSX.Element => {
	const prefersReducedMotion = useReducedMotion()
	const isCentered = props.isSmallScreen || props.isOpen
	const sidebarStyles: React.CSSProperties = {
		borderRadius: isCentered ? '5px' : '5px 0 0 5px',
		marginLeft: props.isSmallScreen ? SIDE_GAP_SMALL_SCREEN : SIDE_GAP,
		cursor: props.hasOwnInteractiveChildren ? 'auto' : 'pointer',
	}

	const sidebar = {
		open: {
			width: '100%',
			marginRight: props.isSmallScreen ? SIDE_GAP_SMALL_SCREEN : SIDE_GAP,
			transition: prefersReducedMotion ? { duration: 0 } : undefined,
		},
		closed: {
			marginRight: 0,
			width: 'auto',
			transition: prefersReducedMotion
				? { duration: 0 }
				: {
						delay: 0.1,
					},
		},
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault()
			props.onClick()
		}
	}

	return (
		<Container>
			<AnimateSidebar
				role={props.hasOwnInteractiveChildren ? 'search' : 'button'}
				tabIndex={props.hasOwnInteractiveChildren ? undefined : 0}
				onClick={props.hasOwnInteractiveChildren ? undefined : props.onClick}
				onKeyDown={props.hasOwnInteractiveChildren ? undefined : handleKeyDown}
				aria-label={props.hasOwnInteractiveChildren ? undefined : props.ariaLabel}
				$showBackground={!props.hasOwnInteractiveChildren}
				variants={sidebar}
				initial={false}
				animate={props.isOpen || props.isSmallScreen ? 'open' : 'closed'}
				onAnimationComplete={(x) => props.onAnimationComplete && props.onAnimationComplete(x.toString())}
				style={sidebarStyles}
			>
				{props.children}
			</AnimateSidebar>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: flex-end;
`
const AnimateSidebar = styled(motion.div)<{ $showBackground?: boolean }>`
	position: relative;
	display: flex;
	justify-content: space-between;
	height: 40px;
	border-radius: 5px;
	color: ${({ theme }) => theme.sidebarText};
	/* A visible resting background (not just on hover) so this reads as
	   an actual button at rest -- every usage (Footer's settings toggle,
	   SearchBar's closed search button) is meant to look clickable
	   without requiring a hover first. Only applied for the plain-button
	   state: SearchBar's open/role="search" state supplies its own
	   background on the same element (see SearchBar.tsx's Container
	   CSS), since that state hosts several of its own child buttons with
	   their own hover treatments rather than acting as one button. */
	background-color: ${({ theme, $showBackground }) => ($showBackground ? theme.sidebarBackground : 'transparent')};

	svg {
		path {
			fill: ${({ theme }) => theme.sidebarText};
		}
	}

	input {
		color: ${({ theme }) => theme.sidebarText};
	}
	transition: border-radius 200ms ease-out;

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}

	/* Neutral grey wash, fixed in place, that simply fades in/out on hover
	   (the ::before element's own position never changes; only its
	   opacity transitions) — matches the neutral grey hover tone used by
	   the suggestion pills / search Submit+Clear buttons elsewhere in
	   SearchBar.tsx. Only for the plain-button state, same reasoning as
	   $showBackground above. */
	${({ $showBackground }) =>
		$showBackground &&
		css`
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
		`}
`
