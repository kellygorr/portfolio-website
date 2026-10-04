import { makeStyles, tokens } from '@fluentui/react-components'
import { convertToRemBase16 } from './shared/styles/bebop'

export const useStyles = makeStyles({
	container: {
		position: 'relative',
		display: 'flex',
		width: '100%',
		minWidth: '320px',
		minHeight: '100vh',
		backgroundColor: '#fbf3dc',
		justifyContent: 'center',
		fontFamily: 'Aptos',
	},
	article: {
		position: 'relative',
		maxWidth: '650px',

		padding: '16px',
		paddingTop: '60px',
		display: 'flex',
		flexDirection: 'column',
		gap: '24px',
	},

	settingsMenu: {
		position: 'absolute',
		top: '16px',
		right: '16px',
		zIndex: 10,
	},

	settingsGear: {
		position: 'fixed',
		top: '16px',
		right: '16px',
		zIndex: 5000,
		color: tokens.colorNeutralForeground2,
		'&:hover': {
			color: tokens.colorNeutralForeground1,
		},
	},
	settingsDropdown: {
		position: 'absolute',
		top: '44px',
		right: '0',
		width: '220px',
		backgroundColor: 'rgba(255, 250, 239, 0.96)',
		border: '1px solid #d8c7a8',
		borderRadius: '10px',
		boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
		padding: '12px',
		display: 'flex',
		flexDirection: 'column',
		gap: '8px',
		alignItems: 'flex-start',
		zIndex: 5001,
	},

	twoColumnGrid: {
		position: 'relative',
		display: 'flex',
		gap: '24px',
		// Switch to column layout when parent container starts to shrink
		'@media (max-width: 650px)': {
			flexDirection: 'column',
		},
	},
	leftColumn: {
		position: 'relative',
		width: '33%',
		flex: '0 0 auto',
		// At small screens, take full width
		'@media (max-width: 650px)': {
			width: '100%',
			flex: 'none',
		},
	},
	rightColumn: {
		position: 'relative',
		flex: '1 1 auto',
		// At small screens, allow text to wrap around floated left column
		'@media (max-width: 450px)': {
			width: '100%',
			flex: 'none',
		},
	},

	// Temp clamp overrides for typography elements
	heading2Override: {
		fontSize: `clamp(${convertToRemBase16(32)}, ${convertToRemBase16(32)} + (${convertToRemBase16(40)} - ${convertToRemBase16(32)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase16(40)}) !important`,
		lineHeight: `clamp(${convertToRemBase16(35)}, ${convertToRemBase16(35)} + (${convertToRemBase16(48)} - ${convertToRemBase16(35)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase16(48)}) !important`,
	},
	heading5Override: {
		fontFamily: 'Aptos Serif, serif',
		fontSize: `clamp(${convertToRemBase16(18)}, ${convertToRemBase16(18)} + (${convertToRemBase16(24)} - ${convertToRemBase16(18)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase16(24)}) !important`,
		lineHeight: `clamp(${convertToRemBase16(21)}, ${convertToRemBase16(21)} + (${convertToRemBase16(32)} - ${convertToRemBase16(21)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase16(32)}) !important`,
	},
	heading6Override: {
		fontSize: `clamp(${convertToRemBase16(16)}, ${convertToRemBase16(16)} + (${convertToRemBase16(20)} - ${convertToRemBase16(16)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase16(20)}) !important`,
		lineHeight: `clamp(${convertToRemBase16(19)}, ${convertToRemBase16(19)} + (${convertToRemBase16(28)} - ${convertToRemBase16(19)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase16(28)}) !important`,
	},
	paragraph1Override: {
		fontSize: `clamp(${convertToRemBase16(14)}, ${convertToRemBase16(14)} + (${convertToRemBase16(16)} - ${convertToRemBase16(14)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase16(16)}) !important`,
		lineHeight: `clamp(${convertToRemBase16(19)}, ${convertToRemBase16(19)} + (${convertToRemBase16(28)} - ${convertToRemBase16(19)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase16(28)}) !important`,
	},

	breakpoint: {
		backgroundColor: tokens.colorNeutralForeground1,
		color: 'white',
		padding: '4px 8px',
		borderRadius: '4px',
		fontSize: '12px',
		fontWeight: 'bold',
		fontFamily: 'monospace',
		display: 'inline-block',
	},
	breakpointInfo: {
		position: 'absolute',
		left: '16px',
		bottom: '16px',
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
		backgroundColor: 'rgba(255, 250, 239, 0.92)',
		border: '1px solid #d8c7a8',
		borderRadius: '8px',
		padding: '8px 10px',
		fontSize: '12px',
		fontFamily: 'monospace',
		zIndex: 20,
	},
})
