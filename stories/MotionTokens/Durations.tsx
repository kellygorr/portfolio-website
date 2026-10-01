import * as React from 'react'
import { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { ArrowClockwise16Filled } from '@fluentui/react-icons'
import { useDurationsStyles } from './Durations.styles'
import { fluentMotionDurations } from '../../src/styles/fluentMotionTokens'
import type { MotionPalette } from '../../src/styles/motionPalettes'

export interface DurationsProps {
	/** Resolved motion color theme (one of our interchangeable palettes —
	 *  Warm Sand, Golden Hour, Dusty Rose, etc). Each row's fill line
	 *  cycles through the palette's accent tokens; falls back to a neutral
	 *  orange ramp if no palette is resolved. */
	palette?: MotionPalette
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
const DurationRow = forwardRef<DurationRowHandle, DurationRowProps>(({ token, ms, use, accentColor }, ref) => {
	const styles = useDurationsStyles()
	const [run, setRun] = useState(0)
	const [atEnd, setAtEnd] = useState(false)
	const resetTimeoutRef = useRef<number | undefined>(undefined)

	const replay = () => {
		if (resetTimeoutRef.current !== undefined) {
			window.clearTimeout(resetTimeoutRef.current)
		}
		setRun((r) => r + 1)
		setAtEnd(false)
		requestAnimationFrame(() => requestAnimationFrame(() => setAtEnd(true)))
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
		}
	}, [])

	return (
		<div className={styles.row}>
			<div className={styles.graphColumn}>
				<div className={styles.label}>
					<span className={styles.tokenName}>{token}</span>
				</div>
				<button className={styles.track} onClick={replay} aria-label={`Replay ${token} duration`} key={run}>
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
					<span className={styles.msAxisLabel}>{ms}ms</span>
				</button>
			</div>
			<span className={styles.use}>{use}</span>
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
export const Durations = forwardRef<DurationsHandle, DurationsProps>(({ palette }, ref) => {
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

	const replayAll = () => {
		rowRefs.current.forEach((row) => row?.replay())
	}

	useImperativeHandle(ref, () => ({ replayAll }))

	return (
		<div className={styles.root} style={{ '--motion-text': textColor } as React.CSSProperties}>
			<div className={styles.heading}>
				<h2 className={styles.title}>Fluent Flex Motion — Durations</h2>
				<button className={styles.replayAllButton} onClick={replayAll} aria-label="Replay all durations">
					<ArrowClockwise16Filled />
				</button>
			</div>
			{fluentMotionDurations.map((d, i) => (
				<DurationRow
					key={d.token}
					ref={(el) => {
						rowRefs.current[i] = el
					}}
					token={d.label}
					ms={d.ms}
					use={d.use}
					accentColor={accentColors[i % accentColors.length]}
				/>
			))}
		</div>
	)
})
Durations.displayName = 'Durations'
