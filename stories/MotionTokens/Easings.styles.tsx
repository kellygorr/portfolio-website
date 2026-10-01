import { makeStyles } from '@fluentui/react-components'

/** Shared translucent-white "outline/background line" tone used both for
 *  the graph box's own border and for the progress-bar track's unfilled
 *  background — so the bordered graph and the line beneath it read as the
 *  same visual language rather than two different affordances. */
export const LINE_COLOR = 'rgba(255,255,255,0.3)'

export const useEasingsStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		gap: '28px',
		width: '100%',
		maxWidth: '980px',
		padding: '32px',
		fontFamily: 'sans-serif',
		color: 'var(--motion-text, inherit)',
	},
	title: {
		fontSize: '20px',
		fontWeight: 700,
		margin: '0 0 4px',
	},
	heading: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '16px',
		marginBottom: '4px',
	},
	durationTicker: {
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
	},
	durationLabel: {
		fontSize: '12px',
		opacity: 0.75,
		minWidth: '58px',
		textAlign: 'center',
	},
	tickerButton: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '26px',
		height: '26px',
		borderRadius: '6px',
		border: `1px solid ${LINE_COLOR}`,
		backgroundColor: 'transparent',
		color: 'inherit',
		font: 'inherit',
		fontSize: '15px',
		lineHeight: 1,
		cursor: 'pointer',
		':hover': {
			backgroundColor: 'rgba(255,255,255,0.1)',
		},
		':disabled': {
			opacity: 0.3,
			cursor: 'default',
		},
	},
	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
		gap: '20px',
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		gap: '8px',
	},
	label: {
		display: 'flex',
		alignItems: 'baseline',
		justifyContent: 'space-between',
		gap: '8px',
		// Reserves space for 2 lines of the token name (some labels, like
		// "functional-transition", wrap) so every card's graph box lines up
		// in the same row regardless of whether its own label wrapped.
		minHeight: '36px',
	},
	tokenName: {
		fontFamily: 'monospace',
		fontSize: '13px',
		fontWeight: 700,
	},
	tone: {
		fontSize: '10px',
		textTransform: 'uppercase',
		letterSpacing: '0.04em',
		opacity: 0.6,
	},
	// The graph box: axes + static curve line + animated dot are all
	// clipped to this box (overflow: hidden) so nothing can ever spill
	// outside its bounds, however a curve is shaped. Rendered as a
	// <button> (clicking it replays this card's motion), so browser
	// button chrome is reset back to a plain block first. No fill —
	// just a 1px border in the same tone the box used to be filled with,
	// so the graph reads as an outlined plot area against the dark
	// background rather than a solid card.
	graphBox: {
		position: 'relative',
		display: 'block',
		boxSizing: 'border-box',
		width: '100%',
		aspectRatio: '16 / 11',
		borderRadius: '8px',
		backgroundColor: 'transparent',
		overflow: 'hidden',
		border: `1px solid ${LINE_COLOR}`,
		padding: 0,
		margin: 0,
		font: 'inherit',
		color: 'inherit',
		textAlign: 'left',
		cursor: 'pointer',
		':hover': {
			backgroundColor: 'rgba(255,255,255,0.06)',
		},
	},
	axisLabel: {
		position: 'absolute',
		fontSize: '9px',
		textTransform: 'uppercase',
		letterSpacing: '0.04em',
		opacity: 0.45,
	},
	timeLabel: {
		right: '6px',
		bottom: '4px',
	},
	positionLabel: {
		left: '6px',
		top: '4px',
	},
	// Dot that traces the curve: horizontal motion is always linear
	// (constant-rate time), vertical motion uses the token's own
	// cubic-bezier as its transition-timing-function — so the path the
	// dot actually travels exactly matches the static curve line drawn
	// behind it, fully contained within graphBox's bounds (every token
	// here stays within the 0-1 range on both axes, no overshoot).
	// Duration is set per-instance via the --easing-duration CSS var (the
	// title-bar ticker), defaulting to 300ms if unset.
	dot: {
		position: 'absolute',
		width: '10px',
		height: '10px',
		borderRadius: '50%',
		transform: 'translate(-50%, -50%)',
		transitionProperty: 'left, top',
		transitionDuration: 'var(--easing-duration, 300ms), var(--easing-duration, 300ms)',
		transitionTimingFunction: 'linear, var(--easing-curve, ease)',
	},
	// Straight-line progress track under the graph: fills left-to-right
	// using the SAME cubic-bezier easing and duration as the curve/dot
	// above it (not linear) — so this bar visibly speeds up/slows down
	// exactly where the curve does, instead of ticking at a flat,
	// constant rate. Background is the same translucent-white LINE_COLOR
	// used for the graph box's own border, so the unfilled portion reads
	// as the same "outline" language as the graph above it. The fill
	// color is passed in per-card (see EasingCard's `accentColor` prop)
	// so each card gets a distinct, rotating color — matching its own
	// dot — rather than every card sharing one color.
	timeTrack: {
		position: 'relative',
		height: '4px',
		borderRadius: '2px',
		backgroundColor: LINE_COLOR,
		overflow: 'hidden',
	},
	timeTrackFill: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		width: '0%',
		borderRadius: '2px',
		transitionProperty: 'width',
		transitionDuration: 'var(--easing-duration, 300ms)',
		transitionTimingFunction: 'var(--easing-curve, ease)',
	},
	intent: {
		fontSize: '12px',
		opacity: 0.7,
	},
})
