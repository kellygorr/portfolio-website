import styled from 'styled-components'
import { motion, useReducedMotion } from 'motion/react'
import { CogFilledIcon } from '../../assets/svg/CogFilledIcon'
import { CogIcon } from '../../assets/svg/CogIcon'

interface ISettingsButtonProps {
	isDarkMode: boolean
}

const cog1 = {
	darkMode: { rotate: -150 },
	lightMode: { rotate: 0 },
}

const cog2 = {
	darkMode: { rotate: 0, y: -10 },
	lightMode: { rotate: -270, y: -10 },
}

export const SettingsButton = (props: ISettingsButtonProps) => {
	const prefersReducedMotion = useReducedMotion()
	const transition = prefersReducedMotion ? { duration: 0 } : { duration: 1 }

	return (
		<Container aria-hidden="true">
			<AnimateCog
				variants={cog1}
				initial={false}
				animate={props.isDarkMode ? 'darkMode' : 'lightMode'}
				transition={transition}
				style={{ scale: 0.7, top: '1px' }}
			>
				<CogIcon />
			</AnimateCog>

			<AnimateCog
				variants={cog2}
				initial={false}
				animate={props.isDarkMode ? 'darkMode' : 'lightMode'}
				transition={transition}
				style={{ scale: 0.35, left: '-15px', top: '4px' }}
			>
				<CogFilledIcon />
			</AnimateCog>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 55px;
	min-width: 55px;
	padding-left: 15px;
	margin-right: 40px;
`
const AnimateCog = styled(motion.div)`
	width: 30px;
	height: 30px;
`
