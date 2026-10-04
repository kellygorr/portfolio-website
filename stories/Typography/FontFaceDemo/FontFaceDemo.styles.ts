import { makeStyles, tokens } from '@fluentui/react-components'

// Shared article styles
const articleBaseStyles = {
	position: 'relative' as const,
	maxWidth: '650px',
	padding: '16px',
	paddingTop: '80px',
	display: 'flex' as const,
	flexDirection: 'column' as const,
	gap: '24px',
}

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
		...articleBaseStyles,
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
		zIndex: 1000,
	},

	colorControls: {
		position: 'fixed',
		bottom: '100px', // Position above the control panel (which is at bottom: 0)
		right: '16px',
		zIndex: 1000,
	},

	aptosToggle: {
		position: 'fixed',
		bottom: '16px', // Position at the bottom right corner
		right: '16px',
		zIndex: 1000,
	},

	aptosOverlay: {
		position: 'absolute',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		zIndex: 100, // Lower than control panel (1000)
		pointerEvents: 'none', // Allow clicks to pass through
		display: 'flex',
		justifyContent: 'center', // Center the content like the main article
	},

	aptosOverlayContent: {
		// Extend article base styles and only add what's different
		...articleBaseStyles,
		fontFamily: 'Aptos, sans-serif !important',
		margin: '0 auto', // Center the content horizontally
		width: '100%', // Take full width up to maxWidth
	},

	controlPanel: {
		position: 'fixed',
		bottom: '0',
		left: '0',
		right: '0',
		backgroundColor: 'rgba(255, 250, 239, 0.96)',
		borderTop: `1px solid #d8c7a8`,
		padding: '16px',
		display: 'flex',
		minWidth: '320px',
		flexWrap: 'wrap',
		gap: '16px',
		alignItems: 'center',
		zIndex: 100,
		transform: 'translateY(0)',
		transition: 'transform 0.15s ease-out',
		// On smaller screens, reduce gap and adjust padding
		'@media (max-width: 480px)': {
			gap: '12px',
			padding: '12px',
		},
	},

	controlPanelHidden: {
		transform: 'translateY(100%)',
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

	// Font family overrides
	segoeFont: {
		fontFamily: 'Segoe UI, sans-serif !important',
	},

	aptosFont: {
		fontFamily: 'Aptos-Dynamic, Aptos, sans-serif !important',
	},

	sectionSwapButton: {
		position: 'absolute',
		right: '-60px',
		top: '0',
		fontSize: '10px',
		padding: '2px 8px',
		height: '20px',
		minWidth: 'auto',
	},
})
