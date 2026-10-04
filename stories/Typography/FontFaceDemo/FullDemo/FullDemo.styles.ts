import { makeStyles, tokens } from '@fluentui/react-components'
import { convertToRemBase10, roundToNearest4 } from '../shared/styles/bebop'

export const useFullDemoStyles = makeStyles({
	container: {
		width: '100%',
		height: '100%',
		minWidth: '320px', // Minimum width for the entire FullDemo component
		display: 'flex',
		backgroundColor: tokens.colorNeutralBackground1,
		fontFamily: 'Aptos',

		'& ul': {
			// remove indent
			paddingLeft: '5px',
			marginLeft: '0',
			listStylePosition: 'inside',
		},
	},
	contentArea: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		minWidth: 0, // Important for flex children to shrink
		position: 'relative', // For absolute positioning of floating button
	},

	floatingNavButton: {
		position: 'absolute',
		top: '10px',
		left: '10px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '40px',
		height: '40px',
		backgroundColor: 'transparent',
		cursor: 'pointer',
		zIndex: 1000,
		color: tokens.colorNeutralForeground2,
		border: 'none',
		opacity: 0,
		transition: 'opacity 0.15s ease-in-out', // No delay when hiding

		'&:hover': {
			backgroundColor: 'transparent',
			color: tokens.colorNeutralForeground1,
		},

		// Auto-show at 700px breakpoint
		'@media (max-width: 700px)': {
			opacity: 1,
			pointerEvents: 'auto',
		},
	},

	floatingNavButtonVisible: {
		opacity: 1,
		transition: 'opacity 0.15s ease-in-out 0.15s',
	},
	inner: {
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
		minHeight: 0, // Important for flex children to shrink
		width: '100%',
	},

	chatHistory: {
		flex: 1,
		overflowY: 'auto',
		padding: '20px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: '32px',
		paddingTop: '40px',
		paddingBottom: '20px',
	},

	userContainer: {
		width: '100%',
		display: 'flex',
		maxWidth: '708px',
		flexDirection: 'column',
		alignItems: 'flex-end',
		gap: '16px',
		paddingLeft: '15%',
	},
	user: {
		backgroundColor: '#F5F5F5',
		maxWidth: '580px',
		padding: '8px 16px',
		borderRadius: '12px',

		'@media (prefers-color-scheme: dark)': {
			backgroundColor: '#2E2E2E',
		},
	},
	references: {
		display: 'flex',
		gap: '12px',
		overflow: 'hidden',
		flexWrap: 'nowrap', // Prevent wrapping
		minWidth: 0, // Allow container to shrink
		width: '100%',
		justifyContent: 'flex-end',
	},
	reference: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '6px',
		borderRadius: '12px',
		backgroundColor: '#F5F5F5',
		height: '40px',
		padding: '0 10px',
		width: 'auto',
		maxWidth: '100%', // Smaller max width
		minWidth: 0, // Allow flex child to shrink below content size
		flexShrink: 1, // Allow shrinking
		overflow: 'hidden',

		'@media (prefers-color-scheme: dark)': {
			backgroundColor: '#2E2E2E',
		},

		'& svg path': {
			fill: tokens.colorNeutralForeground1,
		},
	},
	referenceText: {
		flex: 1,
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		minWidth: 0, // Allow text to shrink
	},
	referenceHiddenSmall: {
		'@media (max-width: 450px)': {
			display: 'none',
		},
	},
	referenceCount: {
		'&::before': {
			content: '"+2"',
		},
		'@media (max-width: 450px)': {
			'&::before': {
				content: '"+3"',
			},
		},
	},
	system: {
		maxWidth: '708px',
	},
	accordion: {},
	accordionTitle: { color: tokens.colorNeutralForeground3, display: 'flex', alignItems: 'center', gap: '4px' },
	section: {
		display: 'flex',
		gap: '16px',
		'& svg': {
			minWidth: '20px',
		},
	},
	sectionContent: {
		display: 'flex',
		flexDirection: 'column',
	},
	sectionPreview: {
		'& img': {
			width: '100%',
			minWidth: '237px',
			borderRadius: '8px',
			border: `1px solid #E0E0E0`,
		},
	},
	buttons: {
		display: 'flex',
		gap: '8px',
		'& button': {
			backgroundColor: 'transparent',
			borderRadius: '8px',
			border: `1px solid #E6E6E6`,
			padding: '6px 12px',
			color: tokens.colorNeutralForeground1,

			'& svg path': {
				fill: tokens.colorNeutralForeground1,
			},
		},
	},
	quote: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		textAlign: 'center',
		gap: '12px',

		'& p': {
			fontWeight: '400',
			fontStyle: 'italic',
		},

		'& svg path': {
			fill: tokens.colorNeutralForeground1,
		},
	},

	chatInputSection: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
		paddingTop: '10px',
		paddingBottom: '190px',
	},
	chatInputContainer: {
		display: 'flex',
		width: '100%',
		maxWidth: '708px',
		'& button': {
			backgroundColor: 'transparent',
			border: 'none',
			width: '40px',
			height: '40px',

			'& svg path': {
				fill: tokens.colorNeutralForeground1,
			},

			':hover': {
				cursor: 'pointer',
			},
		},
		paddingRight: '28px',
	},
	toolbar: {
		display: 'flex',
		gap: '4px',
	},
	chatWrapper: {
		flex: 1,
		display: 'flex',
		borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
		marginRight: '16px',
		position: 'relative',
		minHeight: '40px', // Set a minimum height to prevent layout shift
	},

	chatInputWrapper: {
		position: 'absolute',
		bottom: '-5px',
		left: 0,
		right: 0,
		display: 'flex',
		alignItems: 'flex-end',
	},

	suggestionsList: {
		position: 'absolute',
		top: '50px',
		width: 'inherit',
		listStyle: 'none',
		padding: 0,
		margin: 0,
		display: 'flex',
		flexDirection: 'column',
		gap: '4px',

		'& li': {
			padding: '8px 0',
			cursor: 'pointer',
			fontSize: '14px',
			color: tokens.colorNeutralForeground1,
		},
	},
	chatInput: {
		border: 'none',
		flex: 1,
		padding: '8px 0 8px 12px',
		fontSize: '24px',
		fontFamily: 'Segoe UI',
		backgroundColor: 'transparent',
		color: tokens.colorNeutralForeground1,

		'&:focus': {
			outline: 'none',
		},
	},
	deviceButton: {
		width: '40px',
		height: '40px',
		borderRadius: '50%',
		backgroundColor: tokens.colorNeutralBackground1 + ' !important',
		border: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
		padding: 0,

		'& svg path': {
			fill: tokens.colorNeutralForeground1,
		},
	},

	settingsGear: {
		position: 'fixed',
		top: '16px',
		right: '16px',
		zIndex: 1000,
		color: tokens.colorNeutralForeground2,
		'&:hover': {
			color: tokens.colorNeutralForeground1,
		},
	},

	controlPanel: {
		position: 'fixed',
		bottom: '0',
		left: '16px',
		width: 'max-content',
		maxWidth: 'calc(100vw - 32px)',
		backgroundColor: tokens.colorNeutralBackground1,
		border: `1px solid ${tokens.colorNeutralStroke1}`,
		borderRadius: tokens.borderRadiusMedium,
		padding: '16px',
		display: 'flex',
		flexDirection: 'column',
		gap: '16px',
		alignItems: 'flex-start',
		zIndex: 100,
		transform: 'translateY(0)',
		transition: 'transform 0.15s ease-out',
		boxShadow: tokens.shadow16,
		// On smaller screens, reduce gap and adjust padding
		'@media (max-width: 480px)': {
			gap: '12px',
			padding: '12px',
			left: '8px',
			maxWidth: 'calc(100vw - 16px)',
		},
	},

	controlPanelHidden: {
		transform: 'translateY(100%)',
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

	// Responsive typography overrides with clamp functions for typographyStyleContent
	Display1OverrideContent: {
		fontSize: `clamp(${convertToRemBase10(44)}, ${convertToRemBase10(44)} + (${convertToRemBase10(56)} - ${convertToRemBase10(44)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(56)}) !important`,
		lineHeight: `clamp(${convertToRemBase10(roundToNearest4(44 * 1.6))}, ${convertToRemBase10(roundToNearest4(44 * 1.6))} + (${convertToRemBase10(roundToNearest4(56 * 1.6))} - ${convertToRemBase10(roundToNearest4(44 * 1.6))}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(roundToNearest4(56 * 1.6))}) !important`,
	},
	Display2OverrideContent: {
		fontSize: `clamp(${convertToRemBase10(36)}, ${convertToRemBase10(36)} + (${convertToRemBase10(40)} - ${convertToRemBase10(36)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(40)}) !important`,
		lineHeight: `clamp(${convertToRemBase10(roundToNearest4(36 * 1.6))}, ${convertToRemBase10(roundToNearest4(36 * 1.6))} + (${convertToRemBase10(roundToNearest4(40 * 1.6))} - ${convertToRemBase10(roundToNearest4(36 * 1.6))}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(roundToNearest4(40 * 1.6))}) !important`,
	},
	Heading1OverrideContent: {
		fontSize: `clamp(${convertToRemBase10(28)}, ${convertToRemBase10(28)} + (${convertToRemBase10(32)} - ${convertToRemBase10(28)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(32)}) !important`,
		lineHeight: `clamp(${convertToRemBase10(roundToNearest4(28 * 1.6))}, ${convertToRemBase10(roundToNearest4(28 * 1.6))} + (${convertToRemBase10(roundToNearest4(32 * 1.6))} - ${convertToRemBase10(roundToNearest4(28 * 1.6))}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(roundToNearest4(32 * 1.6))}) !important`,
	},
	Heading2OverrideContent: {
		fontSize: `clamp(${convertToRemBase10(24)}, ${convertToRemBase10(24)} + (${convertToRemBase10(28)} - ${convertToRemBase10(24)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(28)}) !important`,
		lineHeight: `clamp(${convertToRemBase10(roundToNearest4(24 * 1.6))}, ${convertToRemBase10(roundToNearest4(24 * 1.6))} + (${convertToRemBase10(roundToNearest4(28 * 1.6))} - ${convertToRemBase10(roundToNearest4(24 * 1.6))}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(roundToNearest4(28 * 1.6))}) !important`,
	},
	Heading3OverrideContent: {
		fontSize: `clamp(${convertToRemBase10(20)}, ${convertToRemBase10(20)} + (${convertToRemBase10(24)} - ${convertToRemBase10(20)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(24)}) !important`,
		lineHeight: `clamp(${convertToRemBase10(roundToNearest4(20 * 1.6))}, ${convertToRemBase10(roundToNearest4(20 * 1.6))} + (${convertToRemBase10(roundToNearest4(24 * 1.6))} - ${convertToRemBase10(roundToNearest4(20 * 1.6))}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(roundToNearest4(24 * 1.6))}) !important`,
	},
	Heading4OverrideContent: {
		fontSize: `clamp(${convertToRemBase10(16)}, ${convertToRemBase10(16)} + (${convertToRemBase10(20)} - ${convertToRemBase10(16)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(20)}) !important`,
		lineHeight: `clamp(${convertToRemBase10(roundToNearest4(16 * 1.6))}, ${convertToRemBase10(roundToNearest4(16 * 1.6))} + (${convertToRemBase10(roundToNearest4(20 * 1.6))} - ${convertToRemBase10(roundToNearest4(16 * 1.6))}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(roundToNearest4(20 * 1.6))}) !important`,
	},
	BaseOverrideContent: {
		fontSize: `clamp(${convertToRemBase10(14)}, ${convertToRemBase10(14)} + (${convertToRemBase10(16)} - ${convertToRemBase10(14)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(16)}) !important`,
		lineHeight: `clamp(${convertToRemBase10(roundToNearest4(14 * 1.6))}, ${convertToRemBase10(roundToNearest4(14 * 1.6))} + (${convertToRemBase10(roundToNearest4(16 * 1.6))} - ${convertToRemBase10(roundToNearest4(14 * 1.6))}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(roundToNearest4(16 * 1.6))}) !important`,
	},

	// Responsive typography overrides with clamp functions for typographyStyleFunctional
	Display1OverrideFunctional: {
		fontSize: `clamp(${convertToRemBase10(44)}, ${convertToRemBase10(44)} + (${convertToRemBase10(56)} - ${convertToRemBase10(44)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(56)}) !important`,
		lineHeight: `clamp(${convertToRemBase10(roundToNearest4(44 * 1.6))}, ${convertToRemBase10(roundToNearest4(44 * 1.6))} + (${convertToRemBase10(roundToNearest4(56 * 1.6))} - ${convertToRemBase10(roundToNearest4(44 * 1.6))}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(roundToNearest4(56 * 1.6))}) !important`,
	},
	Display2OverrideFunctional: {
		fontSize: `clamp(${convertToRemBase10(36)}, ${convertToRemBase10(36)} + (${convertToRemBase10(40)} - ${convertToRemBase10(36)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(40)}) !important`,
		lineHeight: `clamp(${convertToRemBase10(roundToNearest4(36 * 1.6))}, ${convertToRemBase10(roundToNearest4(36 * 1.6))} + (${convertToRemBase10(roundToNearest4(40 * 1.6))} - ${convertToRemBase10(roundToNearest4(36 * 1.6))}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(roundToNearest4(40 * 1.6))}) !important`,
	},
	Title1OverrideFunctional: {
		fontSize: `clamp(${convertToRemBase10(28)}, ${convertToRemBase10(28)} + (${convertToRemBase10(32)} - ${convertToRemBase10(28)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(32)}) !important`,
		lineHeight: `clamp(${convertToRemBase10(roundToNearest4(28 * 1.6))}, ${convertToRemBase10(roundToNearest4(28 * 1.6))} + (${convertToRemBase10(roundToNearest4(32 * 1.6))} - ${convertToRemBase10(roundToNearest4(28 * 1.6))}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(roundToNearest4(32 * 1.6))}) !important`,
	},
	Title2OverrideFunctional: {
		fontSize: `clamp(${convertToRemBase10(24)}, ${convertToRemBase10(24)} + (${convertToRemBase10(28)} - ${convertToRemBase10(24)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(28)}) !important`,
		lineHeight: `clamp(${convertToRemBase10(roundToNearest4(24 * 1.6))}, ${convertToRemBase10(roundToNearest4(24 * 1.6))} + (${convertToRemBase10(roundToNearest4(28 * 1.6))} - ${convertToRemBase10(roundToNearest4(24 * 1.6))}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(roundToNearest4(28 * 1.6))}) !important`,
	},
	Title3OverrideFunctional: {
		fontSize: `clamp(${convertToRemBase10(20)}, ${convertToRemBase10(20)} + (${convertToRemBase10(24)} - ${convertToRemBase10(20)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(24)}) !important`,
		lineHeight: `clamp(${convertToRemBase10(roundToNearest4(20 * 1.6))}, ${convertToRemBase10(roundToNearest4(20 * 1.6))} + (${convertToRemBase10(roundToNearest4(24 * 1.6))} - ${convertToRemBase10(roundToNearest4(20 * 1.6))}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(roundToNearest4(24 * 1.6))}) !important`,
	},
	Title4OverrideFunctional: {
		fontSize: `clamp(${convertToRemBase10(20)}, ${convertToRemBase10(20)} + (${convertToRemBase10(24)} - ${convertToRemBase10(20)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(24)}) !important`,
		lineHeight: `clamp(${convertToRemBase10(roundToNearest4(20 * 1.6))}, ${convertToRemBase10(roundToNearest4(20 * 1.6))} + (${convertToRemBase10(roundToNearest4(24 * 1.6))} - ${convertToRemBase10(roundToNearest4(20 * 1.6))}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(roundToNearest4(24 * 1.6))}) !important`,
	},
	BaseOverrideFunctional: {
		fontSize: `clamp(${convertToRemBase10(14)}, ${convertToRemBase10(14)} + (${convertToRemBase10(16)} - ${convertToRemBase10(14)}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(16)}) !important`,
		lineHeight: `clamp(${convertToRemBase10(roundToNearest4(14 * 1.6))}, ${convertToRemBase10(roundToNearest4(14 * 1.6))} + (${convertToRemBase10(roundToNearest4(16 * 1.6))} - ${convertToRemBase10(roundToNearest4(14 * 1.6))}) * (100vw - 320px) / (1440px - 320px), ${convertToRemBase10(roundToNearest4(16 * 1.6))}) !important`,
	},
	Body2OverrideFunctional: {
		// fontSize stays constant
	},
	Caption1OverrideFunctional: {
		// fontSize stays constant
	},
	Caption2OverrideFunctional: {
		// fontSize stays constant
	},

	fontReadout: {
		color: tokens.colorNeutralForeground3,
		fontStyle: 'italic',
		display: 'inline',
		paddingLeft: '5px',
	},

	// Type system background indicators
	typeSystemFunctional: {
		backgroundColor: 'rgba(0, 120, 212, 0.1) !important', // Light blue for functional
		transition: 'background-color 0.2s ease',
	},
	typeSystemContent: {
		backgroundColor: 'rgba(16, 124, 16, 0.1) !important', // Light green for content
		transition: 'background-color 0.2s ease',
	},

	paddingContainer: {
		position: 'relative',
	},

	// Spacing configuration table styles (borrowed from ClampBreakpoint)
	spacingTableWrapper: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		gap: '0.5rem',
	},

	spacingTable: {
		width: '100%',
		borderCollapse: 'separate',
		borderSpacing: 0,
		borderRadius: tokens.borderRadiusLarge,
		border: `1px solid ${tokens.colorNeutralStroke2}`,
		overflow: 'hidden',
	},

	tableHeader: {
		backgroundColor: tokens.colorNeutralBackground3,
	},

	tableCell: {
		padding: '8px',
		borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
		borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,

		'&:last-child': {
			borderRight: 'none',
		},
	},

	tableHeaderCell: {
		borderTop: 'none',
	},

	tableLastRowCell: {
		borderBottom: 'none',
	},

	tableCellLeft: {
		textAlign: 'left',
	},

	tableCellCenter: {
		textAlign: 'center',
	},

	tableRowAlt: {
		backgroundColor: tokens.colorNeutralBackground1Hover,
	},

	spacingConfigHeader: {
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
	},

	spacingConfigTitle: {
		fontSize: '14px',
		fontWeight: '600',
		margin: 0,
	},

	// Control panel row styles
	breakpointsRow: {
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
		width: '100%',
	},

	breakpointsLabel: {
		fontSize: '14px',
		fontWeight: '500',
		whiteSpace: 'nowrap',
	},

	controlsRow: {
		display: 'flex',
		alignItems: 'center',
		gap: '16px',
		flexWrap: 'wrap',
	},

	resetButtonContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
		marginTop: '16px',
	},

	explanationText: {
		fontSize: '14px',
		color: tokens.colorNeutralForeground2,
		lineHeight: '1.4',
		paddingTop: '8px',
	},

	// Input styles for table cells
	tableInput: {
		width: '100%',
		padding: '4px 6px',
		fontSize: '12px',
		border: 'none',
		backgroundColor: 'transparent',
		outline: 'none',
	},

	// Navigation styles
	navigation: {
		width: '256px',
		height: '100vh',
		position: 'fixed',
		left: 0,
		top: 0,
		backgroundColor: tokens.colorNeutralBackground2,
		borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
		padding: '16px',
		display: 'flex',
		flexDirection: 'column',
		gap: '8px',
		overflowY: 'auto',
	},

	navButton: {
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
		padding: '8px 12px',
		borderRadius: tokens.borderRadiusMedium,
		cursor: 'pointer',
		border: `1px solid ${tokens.colorNeutralStroke2}`,
		backgroundColor: tokens.colorNeutralBackground1,
		fontSize: '14px',
		fontWeight: '500',

		'&:hover': {
			backgroundColor: tokens.colorNeutralBackground1Hover,
		},
	},

	navSection: {
		display: 'flex',
		flexDirection: 'column',
		gap: '4px',
		marginTop: '16px',
	},

	navSectionTitle: {
		fontSize: '12px',
		fontWeight: '600',
		color: tokens.colorNeutralForeground2,
		textTransform: 'uppercase',
		marginBottom: '8px',
		margin: 0,
	},

	navItem: {
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
		padding: '6px 12px',
		borderRadius: tokens.borderRadiusMedium,
		cursor: 'pointer',
		fontSize: '14px',
		color: tokens.colorNeutralForeground1,

		'&:hover': {
			backgroundColor: tokens.colorNeutralBackground1Hover,
		},
	},

	navItemMore: {
		fontStyle: 'italic',
		color: tokens.colorNeutralForeground2,
	},

	navItemDisabled: {
		opacity: 0.5,
		cursor: 'not-allowed',
		color: tokens.colorNeutralForeground3,

		'&:hover': {
			backgroundColor: 'transparent',
		},
	},

	navIcon: {
		width: '16px',
		height: '16px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '12px',
		color: tokens.colorNeutralForeground2,
	},

	navLabel: {
		flex: 1,
		fontSize: '14px',
	},

	navHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '8px 0',
		marginBottom: '16px',
	},

	navHeaderIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '32px',
		height: '32px',
		borderRadius: tokens.borderRadiusMedium,
		cursor: 'pointer',
		color: tokens.colorNeutralForeground2,

		'&:hover': {
			backgroundColor: tokens.colorNeutralBackground1Hover,
			color: tokens.colorNeutralForeground1,
		},
	},

	// Spacing system - static pixel values for consistent spacing
	spacingXsmall: {
		paddingTop: '8px', // ~0.5em
	},
	spacingSmall: {
		paddingTop: '16px', // ~0.75em
	},
	spacingMedium: {
		paddingTop: '32px', // 2em
	},
	spacingXlarge: {
		paddingTop: '48px', // 3em
	},
	spacingXlargeBoth: {
		paddingTop: '48px', // 3em
		paddingBottom: '48px', // 3em
	},

	// Font family classes for different typography modes
	segoeUIFontFamily: {
		fontFamily: "'Segoe UI'",
	},
	aptosFontFamily: {
		fontFamily: "'Aptos'",
	},
	aptosSerifFontFamily: {
		fontFamily: "'Aptos Serif'",
	},
	boldFontWeight: {
		'& p': {
			// fontWeight: '600',
			fontStyle: 'normal',
		},
	},
})
