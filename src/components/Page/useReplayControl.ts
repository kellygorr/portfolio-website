import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../shared'

// Pure safety net — NOT the normal way `running` turns false. Every
// current interactive demo (GroundingMenuDemo, InputPositionDemo,
// Durations, Easings) calls `onReplayStateChange(false)` itself once its
// OWN scripted sequence actually finishes, and that call is what should
// normally stop the spin / re-enable pointer events (see
// DemoMotionContext.ts's docstring). This timer exists only to recover
// from a demo that has a bug and never calls back at all — it's
// deliberately long (way longer than any real sequence in this
// codebase, the longest of which is Easings' multi-card click-through,
// which can run several seconds depending on the duration ticker) so it
// never fires in the normal case. An earlier version used a short
// 700ms value here as if it were the expected completion signal for
// every demo — but since every real demo's sequence takes LONGER than
// 700ms, that fired first every single time, stopping the spin (and,
// since `running` also now gates pointer-events on the demo content —
// see Demo.tsx/DemoSlide.tsx — re-enabling clicks) well before the
// sequence had actually finished.
const SAFETY_FALLBACK_MS = 30000

/**
 * Shared restart-management logic for `interactive` demos, used by
 * both Demo (page-embedded demos) and DemoSlide (slideshow-embedded
 * demos, e.g. Input Position) — extracted here so the two don't
 * duplicate the same auto-play-once-on-scroll-into-view + manual
 * restart + spin-then-settle bookkeeping.
 *
 * Restart always means a full remount (a React `key` bump), never a
 * pause/resume-in-place toggle — see Demo.tsx's docstring for why.
 *
 * `selfDriven` — set true for demos that drive their own ongoing
 * interaction directly (e.g. DAB's Intro/Thinking toggle buttons,
 * PillMotionDemo's own "See more"/"See less" button) instead of
 * watching `replayToken` to play out a scripted sequence. These demos
 * never call `onReplayStateChange(false)` back (they have no concept
 * of a sequence "finishing"), so if the normal auto-run-once-on-scroll
 * behavior ran for them, `running` would get stuck `true` — and since
 * `running` gates pointer-events on the demo's own content (see
 * Demo.tsx/DemoSlide.tsx) — their buttons would be unclickable for the
 * whole SAFETY_FALLBACK_MS window after scrolling into view. They also
 * never render a restart icon (Demo's `hideRestartIcon`) since there's
 * no scripted replay to manually trigger either. So for these, skip
 * the auto-run entirely and leave `running` permanently false.
 */
export const useReplayControl = (interactive: boolean | undefined, selfDriven?: boolean) => {
	const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
	const [restartKey, setRestartKey] = useState(0)
	const [running, setRunning] = useState(false)
	const hasAutoRunRef = useRef(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const settleTimerRef = useRef<number | undefined>(undefined)

	const clearSettleTimer = () => {
		if (settleTimerRef.current) {
			window.clearTimeout(settleTimerRef.current)
			settleTimerRef.current = undefined
		}
	}

	const runReplay = () => {
		setRestartKey((prev) => prev + 1)
		setRunning(true)
		clearSettleTimer()
		settleTimerRef.current = window.setTimeout(() => setRunning(false), SAFETY_FALLBACK_MS)
	}

	// Exposed as `onReplayStateChange` via DemoMotionContext — this is
	// the REAL completion signal a demo calls once its own scripted
	// sequence actually finishes. Clears the safety-net timer at the
	// same time, since it's no longer needed once the demo has reported
	// in on its own.
	const reportRunningState = (value: boolean) => {
		clearSettleTimer()
		setRunning(value)
	}

	// Auto-play once: the first time an `interactive` demo scrolls into
	// view, run its scripted sequence automatically so a visitor who
	// never thinks to click anything still sees the motion at least
	// once — then hands control back (this never fires again for this
	// demo instance). Skipped entirely under prefers-reduced-motion, and
	// skipped entirely for `selfDriven` demos (see this hook's
	// docstring) — they have no scripted sequence to auto-play and never
	// report completion, so auto-running here would leave `running`
	// (and pointer-events) stuck for SAFETY_FALLBACK_MS with no way to
	// clear early.
	useEffect(() => {
		if (!interactive || prefersReducedMotion || selfDriven) return
		const el = containerRef.current
		if (!el) return
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting && !hasAutoRunRef.current) {
					hasAutoRunRef.current = true
					runReplay()
				}
			},
			{ threshold: 0.4 }
		)
		observer.observe(el)
		return () => observer.disconnect()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [interactive, prefersReducedMotion, selfDriven])

	useEffect(() => {
		return () => clearSettleTimer()
	}, [])

	return { containerRef, restartKey, running, setRunning: reportRunningState, runReplay }
}
