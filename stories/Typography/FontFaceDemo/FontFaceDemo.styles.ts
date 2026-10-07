import { makeStyles } from '@fluentui/react-components'
import { MIN_WIDTH } from '../../../src/styles/GlobalStyles'

// Shared article styles
const articleBaseStyles = {
	position: 'relative' as const,
	maxWidth: '650px',
	padding: '16px',
	paddingTop: '80px',
	display: 'flex' as const,
	flexDirection: 'column' as const,
	gap: '24px',
	alignItems: 'start',
	'@media (max-width: 760px)': {
		maxWidth: '650px',
		gap: '24px',
	},
}

export const useStyles = makeStyles({
	container: {
		position: 'relative',
		display: 'flex',
		width: '100%',
		minWidth: `${MIN_WIDTH}px`,
		minHeight: '100vh',
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
		zIndex: 10000,
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
		minWidth: `${MIN_WIDTH}px`,
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

	// Font family overrides
	segoeFont: {
		fontFamily: 'Segoe UI, sans-serif !important',
	},

	aptosFont: {
		fontFamily: 'Aptos-Dynamic, Aptos, sans-serif !important',
	},

	sectionSwapButton: {
		fontSize: '10px',
		padding: '2px 8px',
		height: '20px',
		minWidth: 'auto',
		whiteSpace: 'nowrap',
	},
	sectionFontSizeReadout: {
		width: '100%',
		textAlign: 'center',
		fontSize: '10px',
		fontWeight: 600,
		lineHeight: '14px',
		pointerEvents: 'none',
	},
	sectionControlsTable: {
		width: '100%',
		borderCollapse: 'separate',
		borderSpacing: 0,
		border: '1px solid #d8c7a8',
		borderRadius: '8px',
		overflow: 'hidden',
		fontFamily: 'Segoe UI, Arial, sans-serif',
		fontSize: '12px',
		backgroundColor: 'rgba(255, 255, 255, 0.22)',
		'& th, & td': {
			padding: '8px 10px',
			borderBottom: '1px solid #d8c7a8',
			textAlign: 'left',
			verticalAlign: 'middle',
		},
		'& th': {
			fontWeight: 600,
			backgroundColor: 'rgba(255, 255, 255, 0.24)',
		},
		'& tr:last-child td': {
			borderBottom: 'none',
		},
	},
	sectionControlsActionCell: {
		width: '96px',
	},
	sectionControlsSizeCell: {
		width: '72px',
		fontWeight: 600,
		whiteSpace: 'nowrap',
	},
	controlsRow: {
		display: 'grid',
		gridTemplateColumns: 'minmax(0, 1fr) auto',
		gap: '16px',
		alignItems: 'start',
		width: '100%',
		'@media (max-width: 860px)': {
			gridTemplateColumns: '1fr',
		},
	},
	controlsPanelSlot: {
		width: 'min(100%, 320px)',
		'@media (max-width: 860px)': {
			width: '100%',
		},
	},
})
