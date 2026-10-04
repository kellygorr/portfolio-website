import { makeStyles } from '@fluentui/react-components'
import { LINE_COLOR } from './Easings.styles'

export const useDurationsStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
		width: '100%',
		maxWidth: '760px',
		padding: '32px',
		fontFamily: 'sans-serif',
		color: 'var(--motion-text, inherit)',
	},
	// Tighter spacing/sizing used by the slideshow-slide version of this
	// demo (see Durations' `compact` prop) — the slide box is much
	// smaller than the full page-width demo, so every dimension below
	// shrinks to fit comfortably without overflowing the slide.
	rootCompact: {
		gap: '8px',
		padding: '16px',
		maxWidth: '100%',
	},
	title: {
		fontSize: '20px',
		fontWeight: 700,
		margin: 0,
	},
	heading: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '16px',
		marginBottom: '4px',
	},
	// "Replay all" icon button next to the title — same outlined pill as
	// Easings' ticker +/- buttons (LINE_COLOR border, transparent fill,
	// translucent-white hover), reused here for visual consistency between
	// the two Motion Tokens stories' title-row controls.
	replayAllButton: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '30px',
		height: '30px',
		borderRadius: '6px',
		border: `1px solid ${LINE_COLOR}`,
		backgroundColor: 'transparent',
		color: 'inherit',
		cursor: 'pointer',
		':hover': {
			backgroundColor: 'rgba(255,255,255,0.1)',
		},
	},
	// Rows flow in a plain vertical stack in the full-size version
	// (`root`'s flexDirection: column, one row per flex child). The
	// compact/slide version instead wraps all rows in a 2-column CSS
	// grid (see `rowsGridCompact`) so all 6 duration tokens fit in a
	// slide's limited height — each individual row's own internal layout
	// (label above track, as below) is unchanged either way.
	rowsGridCompact: {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		columnGap: '40px',
		rowGap: '12px',
	},
	row: {
		display: 'flex',
		alignItems: 'flex-start',
		gap: '16px',
	},
	rowCompact: {
		gap: '8px',
	},
	// Label + track are stacked in one column now (label ABOVE the box,
	// matching Easings' card layout — tokenName/tone sit above graphBox
	// there too) instead of sitting beside the box as a separate left
	// column.
	graphColumn: {
		display: 'flex',
		flexDirection: 'column',
		gap: '8px',
		flex: 1,
	},
	graphColumnCompact: {
		gap: '2px',
		// Without an explicit minimum, this column's rendered width falls
		// back to its own min-content size (just wide enough for the
		// "Xms" axis label) — since it sits inside ScaleToFit's
		// max-content measuring box (see ScaleToFit.tsx), there's no
		// surrounding width to stretch into otherwise. This keeps the
		// 2-column compact grid a comparable overall width to Easings'
		// 3-column compact grid, instead of rendering much narrower.
		minWidth: '300px',
	},
	label: {
		display: 'flex',
		alignItems: 'baseline',
		justifyContent: 'space-between',
		gap: '8px',
	},
	tokenName: {
		fontFamily: 'monospace',
		fontSize: '13px',
		fontWeight: 700,
	},
	// The "Xms" value — now sits to the right of the token name in the
	// label row (matching Easings' tokenName/tone layout) instead of
	// overlaid in the track's bottom-right corner, which read as
	// cramped/too close to the fill line underneath it.
	msLabel: {
		fontSize: '12px',
		opacity: 0.7,
	},
	// Outlined like Motion Tokens/Easings' graph box (transparent fill,
	// 1px LINE_COLOR border, same hover tint) rather than a filled
	// pill-shaped track — a thin line is the only thing drawn inside it
	// (see `fillLine`/`fillLineTrack`), instead of a round swatch/ball
	// sliding across a solid capsule. Rendered as a <button> (clicking it
	// replays this row's animation), so browser button chrome is reset
	// back to a plain block first.
	track: {
		position: 'relative',
		boxSizing: 'border-box',
		width: '100%',
		height: '52px',
		borderRadius: '8px',
		backgroundColor: 'transparent',
		border: `1px solid ${LINE_COLOR}`,
		display: 'flex',
		alignItems: 'center',
		padding: '0 20px',
		margin: 0,
		font: 'inherit',
		color: 'inherit',
		textAlign: 'left',
		cursor: 'pointer',
		':hover': {
			backgroundColor: 'rgba(255,255,255,0.06)',
		},
	},
	// The thin line itself: background line color when empty (unfilled
	// remainder), fillLine grows over it left-to-right using this row's
	// own duration token and this row's own rotating accent color — same
	// "background line + colored fill" language as Easings' progress bar.
	fillLineTrack: {
		position: 'relative',
		width: '100%',
		height: '3px',
		borderRadius: '1.5px',
		backgroundColor: LINE_COLOR,
		overflow: 'hidden',
	},
	fillLine: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		width: '0%',
		borderRadius: '1.5px',
		// Duration is set per-instance via the --duration-ms CSS var;
		// easing is fixed (functional-transition) so duration is the only
		// variable being demonstrated in this component.
		transitionProperty: 'width',
		transitionDuration: 'var(--duration-ms, 200ms)',
		transitionTimingFunction: 'cubic-bezier(0.33, 0, 0, 1)',
	},
	use: {
		fontSize: '12px',
		opacity: 0.7,
		maxWidth: '220px',
		alignSelf: 'center',
	},
	useHidden: {
		display: 'none',
	},
})
