import { makeStyles, tokens } from '@fluentui/react-components'

export const useBreakpointIndicatorStyles = makeStyles({
	widthIndicator: {
		position: 'fixed',
		left: 0,
		right: 0,
		height: '20px', // Larger hit area
		zIndex: 2000,
		cursor: 'grab',
		backgroundColor: 'transparent',
		'&:active': {
			cursor: 'grabbing',
		},
	},
	widthBox: {
		position: 'absolute',
		top: '50%',
		right: 0,
		transform: 'translate(0%, -50%)',
		backgroundColor: tokens.colorNeutralForeground1,
		color: 'white',
		padding: '4px 8px',
		borderRadius: '4px',
		fontSize: '12px',
		fontWeight: 'bold',
		fontFamily: 'monospace',
	},
	widthIndicatorLine: {
		position: 'absolute',
		top: '50%',
		left: 0,
		right: 0,
		height: '2px',
		transform: 'translateY(-50%)',
	},
	viewportBorder: {
		position: 'fixed',
		top: '0px',
		left: '0px',
		right: '0px',
		bottom: '0px',
		pointerEvents: 'none',
		zIndex: 9999,
		transition: 'box-shadow 0.3s ease',
	},
})
