import type { JSX } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import styled, { css } from 'styled-components'
import { SIDE_GAP, SIDE_GAP_SMALL_SCREEN } from '../../styles/GlobalStyles'

interface ISidebarProps {
	ariaLabel: string
	isOpen: boolean
	isSmallScreen: boolean
	onClick: () => void
	setIsOpen: (isOpen: boolean) => void
	onAnimationComplete?: (x: string) => void
	asElement?: 'button' | 'div'
	children?: React.ReactNode
}

export const Sidebar = (props: ISidebarProps): JSX.Element => {
	const prefersReducedMotion = useReducedMotion()
	const isCentered = props.isSmallScreen || props.isOpen
	const sidebarStyles: React.CSSProperties = {
		borderRadius: isCentered ? '5px' : '5px 0 0 5px',
		marginLeft: props.isSmallScreen ? SIDE_GAP_SMALL_SCREEN : SIDE_GAP,
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

	const sharedProps = {
		variants: sidebar,
		initial: false,
		animate: props.isOpen || props.isSmallScreen ? 'open' : 'closed',
		onAnimationComplete: (x: string) => props.onAnimationComplete && props.onAnimationComplete(x.toString()),
		style: sidebarStyles,
		children: props.children,
	}

	if (props.asElement === 'div') {
		return (
			<Container>
				<AnimateSidebarContainer role="search" {...sharedProps} />
			</Container>
		)
	}

	return (
		<Container>
			<AnimateSidebar
				type="button"
				onClick={props.onClick}
				aria-label={props.ariaLabel}
				{...sharedProps}
			/>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: flex-end;
`
const sidebarStyles = css`
	display: flex;
	justify-content: space-between;
	height: 40px;
	border-radius: 5px;
	color: ${({ theme }) => theme.sidebarText};

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
`

const AnimateSidebar = styled(motion.button)`
	${sidebarStyles}
`

const AnimateSidebarContainer = styled(motion.div)`
	${sidebarStyles}
`
