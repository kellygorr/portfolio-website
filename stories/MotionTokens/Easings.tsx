import * as React from 'react'
import { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { flushSync } from 'react-dom'
import { mergeClasses } from '@fluentui/react-components'
import { useEasingsStyles } from './Easings.styles'
import { fluentMotionEasings, type FluentMotionEasing } from '../../src/styles/fluentMotionTokens'
import { cubicBezierSvgPath } from '../shared/cubicBezier'
import type { MotionPalette } from '../../src/styles/motionPalettes'

export interface EasingsProps {
	/** Resolved motion color theme (one of our interchangeable palettes —
	 *  Warm Sand, Golden Hour, Dusty Rose, etc). The static curve line
	 *  draws from the palette's lightest accent token (shared across every
	 *  card); each card's dot + progress-bar fill draws from a rotating
	 *  accent color (see `accentColors` below) so every card gets its own
	 *  distinct color, matching Motion Tokens/Durations' row-color
	 *  rotation. Falls back to a neutral orange ramp if no palette is
	 *  resolved. */
	palette?: MotionPalette
	/** Renders a tighter, smaller version of the grid (smaller fonts,
	 *  shorter gaps, axis labels and tone text hidden, the intent copy
	 *  hidden) and shows only 6 of the 7 easing tokens (drops
	 *  `functional-linear`, the least visually distinctive curve — a
	 *  straight line) — for embedding in a fixed-size slideshow slide,
	 *  where the full-size 7-card layout doesn't fit. */
	compact?: boolean
}

const GRAPH_W = 280
const GRAPH_H = 192 // 16:11 at this width, matches graphBox's aspect-ratio
const GRAPH_PADDING = 16 // viewBox units, passed into cubicBezierSvgPath below

// The dot's resting position (start/end of its travel) must land exactly
// on the curve's own drawn start/end point. The SVG curve is built in
// viewBox units (GRAPH_W x GRAPH_H) and then stretched via
// preserveAspectRatio="none" to fill the box's actual rendered pixel
// size — so a FIXED PIXEL inset on the dot (independent of the box's
// real size) would only coincidentally match the curve's viewBox-unit
// inset at one specific rendered size, and drift off it at any other
// (the box is responsive via CSS grid, so its real size varies). Using
// the same padding fraction for both keeps the dot correctly centered on
// the curve regardless of how large the box actually renders.
const GRAPH_PAD_X_PCT = (GRAPH_PADDING / GRAPH_W) * 100
const GRAPH_PAD_Y_PCT = (GRAPH_PADDING / GRAPH_H) * 100

/** How long an easing's dot/fill hold at the end position before
 *  automatically animating back to the start — so a card never sits
 *  parked mid- or post-animation indefinitely; it always settles back to
 *  its idle "ready to replay" pose shortly after finishing. */
const RESET_HOLD_MS = 500

interface EasingCardProps {
	easing: FluentMotionEasing
	curveColor: string
	/** This card's own dot + progress-bar fill color (rotates per card —
	 *  see `accentColors` in the parent `Easings` component) — always the
	 *  same color for both, but different from its sibling cards'. */
	accentColor: string
	durationMs: number
	compact?: boolean
}

export interface EasingCardHandle {
	replay: () => void
}

/**
 * One easing token's graph card. Owns its own replay state so clicking a
 * card only replays that card — the other 6 are untouched, instead of
 * everything firing in lockstep from a single shared control.
 */
const EasingCard = forwardRef<EasingCardHandle, EasingCardProps>(({ easing, curveColor, accentColor, durationMs, compact }, ref) => {
	const styles = useEasingsStyles()
	const [run, setRun] = useState(0)
	const [dotRun, setDotRun] = useState(0)
	// Cards rest at the START position by default (not the end) — clicking
	// is what runs the motion, and after it finishes the card automatically
	// resets back here (see `resetTimeoutRef` below) rather than staying
	// parked at the end indefinitely.
	const [atEnd, setAtEnd] = useState(false)
	const resetTimeoutRef = useRef<number | undefined>(undefined)
	const replayFrameRef = useRef<number | undefined>(undefined)

	const replay = () => {
		if (resetTimeoutRef.current !== undefined) {
			window.clearTimeout(resetTimeoutRef.current)
		}
		if (replayFrameRef.current !== undefined) {
			window.cancelAnimationFrame(replayFrameRef.current)
		}
		// Bump key + reset to start FIRST (synchronously, same render) so
		// the fresh DOM node's very first paint already shows the start
		// position with no transition — then the two rAFs flip it to the
		// end, which (being a change on an already-mounted node) is what
		// actually triggers the CSS transition. Skipping the key bump here
		// would make setAtEnd(false) on the EXISTING node itself animate a
		// reverse transition first, instead of an instant reset.
		flushSync(() => {
			setRun((r) => r + 1)
			setDotRun((r) => r + 1)
			setAtEnd(false)
		})
		replayFrameRef.current = requestAnimationFrame(() => {
			replayFrameRef.current = requestAnimationFrame(() => {
				replayFrameRef.current = undefined
				setAtEnd(true)
			})
		})
		// After the travel finishes, hold at the end for RESET_HOLD_MS,
		// then animate back to the start on the existing DOM node.
		resetTimeoutRef.current = window.setTimeout(() => {
			setDotRun((r) => r + 1)
			setAtEnd(false)
		}, durationMs + RESET_HOLD_MS)
	}

	useImperativeHandle(ref, () => ({ replay }))

	// Clear any pending reset if this card unmounts mid-hold.
	React.useEffect(() => {
		return () => {
			if (resetTimeoutRef.current !== undefined) {
				window.clearTimeout(resetTimeoutRef.current)
			}
			if (replayFrameRef.current !== undefined) {
				window.cancelAnimationFrame(replayFrameRef.current)
			}
		}
	}, [])

	return (
		<div className={mergeClasses(styles.card, compact && styles.cardCompact)}>
			<div className={mergeClasses(styles.label, compact && styles.labelCompact)}>
				<span className={mergeClasses(styles.tokenName, compact && styles.tokenNameCompact)}>{easing.label}</span>
				<span className={mergeClasses(styles.tone, compact && styles.toneCompact)}>{easing.tone}</span>
			</div>
			<button
				className={mergeClasses(styles.graphBox, compact && styles.graphBoxCompact)}
				onClick={replay}
				aria-label={`Replay ${easing.label} easing`}
				key={dotRun}
			>
				<svg width="100%" height="100%" viewBox={`0 0 ${GRAPH_W} ${GRAPH_H}`} preserveAspectRatio="none">
					<path
						d={cubicBezierSvgPath(easing.points, GRAPH_W, GRAPH_H, GRAPH_PADDING)}
						fill="none"
						stroke={curveColor}
						strokeWidth={2}
						opacity={0.75}
					/>
				</svg>
				<span className={mergeClasses(styles.axisLabel, styles.positionLabel)}>Position</span>
				<span className={mergeClasses(styles.axisLabel, styles.timeLabel)}>Time</span>
				<div
					className={styles.dot}
					style={
						{
							backgroundColor: accentColor,
							left: atEnd ? `${100 - GRAPH_PAD_X_PCT}%` : `${GRAPH_PAD_X_PCT}%`,
							top: atEnd ? `${GRAPH_PAD_Y_PCT}%` : `${100 - GRAPH_PAD_Y_PCT}%`,
							'--easing-curve': easing.curve,
							'--easing-duration': `${durationMs}ms`,
						} as React.CSSProperties
					}
				/>
			</button>
			{/* Progress reference: fills using the exact same cubic-bezier
			    easing and duration as the curve/dot above it, so this bar
			    visibly speeds up/slows down in lockstep with the curve
			    rather than ticking at a flat, constant rate. Uses this
			    card's own `accentColor` — the same color as its dot —
			    while sibling cards use a different color from the same
			    rotation (see `accentColors` in the parent component).
			    `key={run}` forces a fresh remount before every forward
			    replay so it can start from 0% instantly; the post-replay
			    return intentionally keeps the same DOM node so it animates
			    back down to 0%. */}
			<div className={styles.timeTrack} aria-hidden="true">
				<div
					className={styles.timeTrackFill}
					key={run}
					style={
						{
							width: atEnd ? '100%' : '0%',
							backgroundColor: accentColor,
							'--easing-curve': easing.curve,
							'--easing-duration': `${durationMs}ms`,
						} as React.CSSProperties
					}
				/>
			</div>
			<span className={mergeClasses(styles.intent, compact && styles.intentCompact)}>{easing.intent}</span>
		</div>
	)
})
EasingCard.displayName = 'EasingCard'

/**
 * Reference demo for the real Fluent Flex Motion easing tokens
 * (`functional-enter/exit/transition/linear` and their `expressive`
 * counterparts), sourced directly from
 * `skills/motion-foundations/reference/easings.md` in the `flex-motion`
 * plugin.
 *
 * Easing curves are conventionally shown as a position-over-time graph
 * with a dot traveling the curve, not a dot sliding along a straight
 * track — so each card here draws the curve's actual shape, then animates
 * a dot along it: its horizontal motion is always linear (constant-rate
 * time), while its vertical motion uses the token's own cubic-bezier as
 * the CSS transition-timing-function. Because the dot's y-position at
 * each moment is exactly what a real CSS transition would compute for
 * that easing at that elapsed time, the dot's traveled path exactly
 * retraces the static curve line drawn behind it — both are clipped to
 * the graph box (`overflow: hidden`), so the dot can never travel outside
 * the box regardless of curve shape.
 *
 * Below each graph, a straight progress bar fills left-to-right using
 * that exact same cubic-bezier easing and duration — a linear
 * (straight-line) presentation of the identical eased motion, so it
 * visibly speeds up/slows down in lockstep with the curve above it
 * instead of ticking at a flat, constant rate. Its unfilled background is
 * the same translucent-white line color as the graph box's own border;
 * its fill color is this card's own rotating `accentColor`, matching the
 * dot above it.
 *
 * Each card rests at its START position by default and after finishing a
 * replay — clicking a card's graph plays it through to the end, holds
 * there briefly (`RESET_HOLD_MS`), then automatically animates back to
 * the start, so a card is never left sitting at the end pose indefinitely.
 *
 * Each card is also independently clickable (the graph itself is the
 * trigger) for comparing one easing at a time, in addition to the
 * "replay all" sequence below that runs every card together.
 */
const DEFAULT_DURATION_MS = 300
const DURATION_STEP_MS = 100
const MIN_DURATION_MS = 100
const MAX_DURATION_MS = 2000

/** Imperative handle exposed by the whole Easings component so an
 *  embedding wrapper — e.g. the Fluent Design System Motion project
 *  page's `EasingsDemo`, which drives this via Demo's
 *  `interactive`/`replayToken` mechanism — can trigger a "replay all"
 *  sequence that runs every card's easing at the same time, matching
 *  Durations' side-by-side "run every row at once" replay. */
export interface EasingsHandle {
	/** Plays every card's replay simultaneously. Calls `onComplete` once
	 *  the longest-running card's full travel + hold (`durationMs +
	 *  RESET_HOLD_MS`) has finished. Returns that total duration in ms so
	 *  a caller that doesn't use `onComplete` can still schedule its own
	 *  follow-up. */
	playSequence: (onComplete?: () => void) => number
}

export const Easings = forwardRef<EasingsHandle, EasingsProps>(({ palette, compact }, ref) => {
	const styles = useEasingsStyles()
	const [durationMs, setDurationMs] = useState(DEFAULT_DURATION_MS)
	const cardRefs = useRef<(EasingCardHandle | null)[]>([])
	const sequenceTimeoutsRef = useRef<number[]>([])

	// Dark-mode look: the page/canvas itself is the background (owned by
	// the .stories.tsx wrapper, not this component), set to the palette's
	// own darkest accent token — same `darkestColor()` used elsewhere in
	// this codebase to pair a dark chip with white text. Text uses the
	// palette's own `text` token (always a legible white, by the palette
	// type's own contract).
	const curveColor = palette?.colors?.[0] ?? '#e9d7b8'
	const textColor = palette?.text ?? '#fff'

	// Per-card accent color rotation — deliberately only the first 3
	// (lighter) accent tokens, same reasoning as Motion Tokens/Durations:
	// colors[3] is excluded because it's the same value as this page's own
	// dark background (darkestColor === colors[3]); including it would
	// make that card's dot/fill invisible against its own backdrop.
	const accentColors = palette ? [palette.colors[0], palette.colors[1], palette.colors[2]] : ['#e9d7b8', '#e0a695', '#e8a668']
	const accentOrder = compact ? [0, 1, 2, 1, 2, 0] : [0, 1, 2]

	// The compact/slide version shows only 6 of the 7 tokens — a
	// slideshow slide's fixed box isn't tall enough for a legible 7-card
	// grid, so `functional-linear` (the least visually distinctive
	// curve — a straight line, easiest to infer from the others) is
	// dropped.
	const easings = compact ? fluentMotionEasings.filter((e) => e.label !== 'functional-linear') : fluentMotionEasings

	const playSequence = (onComplete?: () => void): number => {
		sequenceTimeoutsRef.current.forEach((t) => window.clearTimeout(t))
		sequenceTimeoutsRef.current = []

		easings.forEach((_, i) => {
			cardRefs.current[i]?.replay()
		})

		const totalMs = durationMs + RESET_HOLD_MS + durationMs
		if (onComplete) {
			const completeTimer = window.setTimeout(onComplete, totalMs)
			sequenceTimeoutsRef.current.push(completeTimer)
		}
		return totalMs
	}

	useImperativeHandle(ref, () => ({ playSequence }))

	React.useEffect(() => {
		return () => {
			sequenceTimeoutsRef.current.forEach((t) => window.clearTimeout(t))
		}
	}, [])

	return (
		<div className={mergeClasses(styles.root, compact && styles.rootCompact)} style={{ '--motion-text': textColor } as React.CSSProperties}>
			<div className={mergeClasses(styles.heading, compact && styles.headingCompact)}>
				<h2 className={mergeClasses(styles.title, compact && styles.titleCompact)}>Fluent Motion: Easings</h2>
				{/* Duration ticker: adjusts the shared duration used by every
				    card's dot + progress bar (independent of each card's own
				    replay state), in +/-100ms steps — lets a viewer see how
				    the SAME easing curve reads at a slower or faster pace,
				    without changing which easing is shown. */}
				<div className={styles.durationTicker}>
					<button
						className={styles.tickerButton}
						onClick={() => setDurationMs((d) => Math.max(MIN_DURATION_MS, d - DURATION_STEP_MS))}
						disabled={durationMs <= MIN_DURATION_MS}
						aria-label="Decrease duration by 100ms"
					>
						−
					</button>
					<span className={styles.durationLabel}>{durationMs}ms</span>
					<button
						className={styles.tickerButton}
						onClick={() => setDurationMs((d) => Math.min(MAX_DURATION_MS, d + DURATION_STEP_MS))}
						disabled={durationMs >= MAX_DURATION_MS}
						aria-label="Increase duration by 100ms"
					>
						+
					</button>
				</div>
			</div>
			<div className={mergeClasses(styles.grid, compact && styles.gridCompact)}>
				{easings.map((e, i) => (
					<EasingCard
						key={e.token}
						ref={(el) => {
							cardRefs.current[i] = el
						}}
						easing={e}
						curveColor={curveColor}
						accentColor={accentColors[accentOrder[i % accentOrder.length]]}
						durationMs={durationMs}
						compact={compact}
					/>
				))}
			</div>
		</div>
	)
})
Easings.displayName = 'Easings'
