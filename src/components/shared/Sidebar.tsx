import * as React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { SIDE_GAP, SIDE_GAP_SMALL_SCREEN } from '../../styles/GlobalStyles'

interface ISidebarProps {
	ariaLabel: string
	isOpen: boolean
	isSmallScreen: boolean
	onClick: () => void
	setIsOpen: (isOpen: boolean) => void
	onAnimationComplete?: (x: string) => void
	children?: React.ReactNode
}

export const Sidebar = (props: ISidebarProps): JSX.Element => {
	const isCentered = props.isSmallScreen || props.isOpen
	const sidebarStyles: React.CSSProperties = {
		borderRadius: isCentered ? '5px' : '5px 0 0 5px',
		marginLeft: props.isSmallScreen ? SIDE_GAP_SMALL_SCREEN : SIDE_GAP,
	}

	const sidebar = {
		open: {
			width: '100%',
			marginRight: props.isSmallScreen ? SIDE_GAP_SMALL_SCREEN : SIDE_GAP,
		},
		closed: {
			marginRight: 0,
			width: 'auto',
			paddingRight: props.isSmallScreen ? '0px' : '40px',
			transition: {
				delay: 0.1,
			},
		},
	}

	return (
		<Container key={props.isSmallScreen.toString()}>
			<AnimateSidebar
				onClick={props.onClick}
				variants={sidebar}
				initial={false}
				animate={props.isOpen || props.isSmallScreen ? 'open' : 'closed'}
				onAnimationComplete={(x) => props.onAnimationComplete && props.onAnimationComplete(x.toString())}
				style={sidebarStyles}
				aria-label={props.ariaLabel}
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
const AnimateSidebar = styled(motion.button)`
	display: flex;
	justify-content: center;
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
`
