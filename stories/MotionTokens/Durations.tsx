import * as React from 'react'
import { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { flushSync } from 'react-dom'
import { ArrowClockwise16Filled } from '@fluentui/react-icons'
import { mergeClasses } from '@fluentui/react-components'
import { useDurationsStyles } from './Durations.styles'
import { fluentMotionDurations } from '../../src/styles/fluentMotionTokens'
import type { MotionPalette } from '../../src/styles/motionPalettes'

export interface DurationsProps {
	/** Resolved motion color theme (one of our interchangeable palettes —
	 *  Warm Sand, Golden Hour, Dusty Rose, etc). Each row's fill line
	 *  cycles through the palette's accent tokens; falls back to a neutral
	 *  orange ramp if no palette is resolved. */
	palette?: MotionPalette
	/** Renders a tighter, smaller version of every row (smaller fonts,
	 *  shorter tracks, less padding, and the "use case" description
	 *  hidden) — for embedding in a fixed-size slideshow slide, where the
	 *  full-size layout doesn't fit. */
	compact?: boolean
}

/** How long a row's fill line holds at 100% before automatically
 *  resetting back to 0% — matches Motion Tokens/Easings' same behavior,
 *  so a row is never left sitting fully filled indefinitely. */
const RESET_HOLD_MS = 500

interface DurationRowProps {
	token: string
	ms: number
	use: string
	accentColor: string
	compact?: boolean
}

/** Imperative handle exposed by each row so the page-level "replay all"
 *  button (see `Durations`) can trigger every row's own replay at once,
 *  without each row needing to know about its siblings or a shared
 *  top-level replay-state — each row still fully owns its own timing. */
export interface DurationRowHandle {
	replay: () => void
}

/**
 * One duration token's row. Owns its own replay state so clicking a row
 * only replays that row — the others are untouched (unless triggered
 * together via the page-level "replay all" button, which calls every
 * row's own `replay()` through this same ref handle). Rests at 0% filled
 * by default and after finishing a replay (holds briefly at 100% first,
 * via `RESET_HOLD_MS`), matching Motion Tokens/Easings' same
 * click-to-replay and auto-reset behavior.
 */
const DurationRow = forwardRef<DurationRowHandle, DurationRowProps>(({ token, ms, use, accentColor, compact }, ref) => {
	const styles = useDurationsStyles()
	const [run, setRun] = useState(0)
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
		flushSync(() => {
			setRun((r) => r + 1)
			setAtEnd(false)
		})
		replayFrameRef.current = requestAnimationFrame(() => {
			replayFrameRef.current = requestAnimationFrame(() => {
				replayFrameRef.current = undefined
				setAtEnd(true)
			})
		})
		resetTimeoutRef.current = window.setTimeout(() => {
			setRun((r) => r + 1)
			setAtEnd(false)
		}, ms + RESET_HOLD_MS)
	}

	useImperativeHandle(ref, () => ({ replay }))

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
		<div className={mergeClasses(styles.row, compact && styles.rowCompact)}>
			<div className={mergeClasses(styles.graphColumn, compact && styles.graphColumnCompact)}>
				<div className={styles.label}>
					<span className={styles.tokenName}>{token}</span>
					<span className={styles.msLabel}>{ms}ms</span>
				</div>
				<button
					className={styles.track}
					onClick={replay}
					aria-label={`Replay ${token} duration`}
					key={run}
				>
					<div className={styles.fillLineTrack}>
						<div
							className={styles.fillLine}
							style={
								{
									width: atEnd ? '100%' : '0%',
									backgroundColor: accentColor,
									'--duration-ms': `${ms}ms`,
								} as React.CSSProperties
							}
						/>
					</div>
				</button>
			</div>
			<span className={mergeClasses(styles.use, compact && styles.useHidden)}>{use}</span>
		</div>
	)
})
DurationRow.displayName = 'DurationRow'

/** Imperative handle exposed by the whole Durations component (not just
 *  each row) so an embedding wrapper — e.g. the Fluent Design System
 *  Motion project page's `DurationsDemo`, which drives this via Demo's
 *  `interactive`/`replayToken` mechanism — can trigger the exact same
 *  "replay every row" action as the internal icon button, without
 *  needing its own separate replay-all implementation. */
export interface DurationsHandle {
	replayAll: () => void
}

/**
 * Reference demo for the real Fluent Flex Motion duration scale
 * (`--gnrc-motion-duration-base-50` through `-1000`), sourced directly from
 * `skills/motion-foundations/reference/durations.md` in the `flex-motion`
 * plugin. Each row fills an identical outlined line-track using its own
 * duration token (easing held constant at `functional-transition` so
 * duration is the only variable), making the relative pacing of the scale
 * directly comparable.
 *
 * Each row is independently clickable (the outlined box itself is the
 * trigger, with the same hover tint as Motion Tokens/Easings' graph
 * boxes), clicking fills that row's line, holds briefly at 100%, then
 * automatically resets back to 0%. The replay icon next to the title
 * triggers every row's own replay at once (via each row's imperative
 * `replay()` handle), for an at-a-glance comparison of the whole scale's
 * relative pacing — without changing the fact that each row still owns
 * and can independently replay its own animation. That same replay-all
 * action is also exposed on `ref` (see `DurationsHandle`) so a page
 * embedding this component (not just the Storybook story) can trigger it
 * from its own "interact" control instead of needing a second, separate
 * implementation of the same logic.
 */
export const Durations = forwardRef<DurationsHandle, DurationsProps>(({ palette, compact }, ref) => {
	const styles = useDurationsStyles()
	const rowRefs = useRef<(DurationRowHandle | null)[]>([])

	// Dark-mode look: the page/canvas itself is the background (owned by
	// the .stories.tsx wrapper, not this component), set to the palette's
	// own darkest accent token — same `darkestColor()` used elsewhere in
	// this codebase to pair a dark chip with white text (e.g. the
	// "recreated for portfolio" badge). Fill lines deliberately use only
	// the first 3 (lighter) accent tokens — colors[3] is excluded because
	// it's the same value as the page background (darkestColor ===
	// colors[3]); including it in the rotation would make that row's fill
	// invisible against its own backdrop. Text uses the palette's own
	// `text` token (always a legible white, by the palette type's own
	// contract).
	const accentColors = palette ? [palette.colors[0], palette.colors[1], palette.colors[2]] : ['#e9d7b8', '#e0a695', '#e8a668']
	const textColor = palette?.text ?? '#fff'

	// The compact/slide version now shows all 6 tokens, laid out in a
	// 2-column grid (see `rowsGridCompact`) — previously limited to a
	// 4-item subset when rows were a single vertical column, but a
	// 2-column grid gives enough room to show the complete scale.
	const durations = fluentMotionDurations

	const replayAll = () => {
		rowRefs.current.forEach((row) => row?.replay())
	}

	useImperativeHandle(ref, () => ({ replayAll }))

	const accentOrder = compact ? [0, 1, 2, 1, 2, 0] : [0, 1, 2]
	const rows = durations.map((d, i) => (
		<DurationRow
			key={d.token}
			ref={(el) => {
				rowRefs.current[i] = el
			}}
			token={d.label}
			ms={d.ms}
			use={d.use}
			accentColor={accentColors[accentOrder[i % accentOrder.length]]}
			compact={compact}
		/>
	))

	return (
		<div className={mergeClasses(styles.root, compact && styles.rootCompact)} style={{ '--motion-text': textColor } as React.CSSProperties}>
			<div className={styles.heading}>
				<h2 className={styles.title}>Fluent Motion: Durations</h2>
				<button className={styles.replayAllButton} onClick={replayAll} aria-label="Replay all durations">
					<ArrowClockwise16Filled />
				</button>
			</div>
			{/* Full-size: rows are direct flex children of `root` (so
			    `root`'s own 20px gap applies between each row, same as
			    before). Compact: rows are wrapped in a 2-column CSS grid
			    instead, since `root`'s flex column layout can't arrange
			    children into columns on its own. */}
			{compact ? <div className={styles.rowsGridCompact}>{rows}</div> : rows}
		</div>
	)
})
Durations.displayName = 'Durations'
