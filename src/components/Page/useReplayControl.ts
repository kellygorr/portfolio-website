import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../shared'

// Fallback duration the restart icon spins for demos that never call
// onReplayStateChange themselves.
const DEFAULT_SPIN_MS = 700

/**
 * Shared restart-management logic for `interactive` demos, used by
 * both Demo (page-embedded demos) and DemoSlide (slideshow-embedded
 * demos, e.g. Input Position) — extracted here so the two don't
 * duplicate the same auto-play-once-on-scroll-into-view + manual
 * restart + spin-then-settle bookkeeping.
 *
 * Restart always means a full remount (a React `key` bump), never a
 * pause/resume-in-place toggle — see Demo.tsx's docstring for why.
 */
export const useReplayControl = (interactive: boolean | undefined) => {
	const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
	const [restartKey, setRestartKey] = useState(0)
	const [running, setRunning] = useState(false)
	const hasAutoRunRef = useRef(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const settleTimerRef = useRef<number | undefined>(undefined)

	const runReplay = () => {
		setRestartKey((prev) => prev + 1)
		setRunning(true)
		if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current)
		settleTimerRef.current = window.setTimeout(() => setRunning(false), DEFAULT_SPIN_MS)
	}

	// Auto-play once: the first time an `interactive` demo scrolls into
	// view, run its scripted sequence automatically so a visitor who
	// never thinks to click anything still sees the motion at least
	// once — then hands control back (this never fires again for this
	// demo instance). Skipped entirely under prefers-reduced-motion.
	useEffect(() => {
		if (!interactive || prefersReducedMotion) return
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
	}, [interactive, prefersReducedMotion])

	useEffect(() => {
		return () => {
			if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current)
		}
	}, [])

	return { containerRef, restartKey, running, setRunning, runReplay }
}
