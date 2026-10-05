import { useIsomorphicLayoutEffect } from '@fluentui/react-components'
import * as React from 'react'

export type InputPositionAnimationProps = {
	children: React.ReactNode
	/** Whether the input is currently anchored to the footer (true) or
	 *  sitting in its centered/resting position (false). Unlike the
	 *  original POR component, toggling this in EITHER direction
	 *  triggers an animated FLIP transition — there is no "instant reset"
	 *  case. */
	isAnchored: boolean
	onAnimationStart?: (distance: number, duration: number) => void
	onAnimationComplete?: () => void
	baseDistance?: number
	baseDurationMs?: number
	msPer100px?: number
}

const DEFAULT_BASE_DISTANCE = 400
const DEFAULT_BASE_DURATION_MS = 250
const DEFAULT_MS_PER_100PX = 20
// Fluent curveDecelerateMin as string
const EASING = 'cubic-bezier(0.33, 0, 0.1, 1)'

/**
 * Animate Input between its centered/resting position and an anchored
 * position at the bottom of the screen, using a FLIP technique (measure
 * position before the layout change, then animate a translateY from
 * that delta back to 0 after the browser has already repainted at the
 * new position).
 *
 * Recreated for the portfolio from the original one-directional version
 * in copilot-motion-POR (src/components/Input/PositionAnimation.tsx),
 * which only animates the FORWARD transition (center -> footer, on
 * `isSent` becoming true) and resets INSTANTLY with no animation on the
 * way back (`isSent` becoming false again just flips `isAnchored` back
 * with no transition at all). This version is symmetric: both
 * directions animate identically, driven off a single `isAnchored`
 * boolean instead of a one-way `isSent` flag.
 */
export const InputPositionAnimation: React.FC<InputPositionAnimationProps> = ({
	children,
	isAnchored,
	onAnimationStart,
	onAnimationComplete,
	baseDistance = DEFAULT_BASE_DISTANCE,
	baseDurationMs = DEFAULT_BASE_DURATION_MS,
	msPer100px = DEFAULT_MS_PER_100PX,
}) => {
	const ref = React.useRef<HTMLDivElement>(null)
	const animationRef = React.useRef<Animation | null>(null)
	const rafRef = React.useRef<number | null>(null)
	// The element's position the last time it was known to be at rest —
	// i.e. the last time we measured it with no transform actively
	// applied. Deliberately NOT "whatever getBoundingClientRect()
	// happened to return on the previous render": a previous render
	// could coincide with an in-flight animation (or an already-applied
	// invert whose Play step hasn't fired yet), in which case that
	// reading would reflect a transient, mid-animation position rather
	// than the element's true, settled layout position — which is
	// exactly the value FLIP needs as its "First" reference point for
	// the NEXT toggle. See the main effect below for why this matters.
	const settledTopRef = React.useRef<number | null>(null)
	// Tracks which `isAnchored` value has already been handled, so a
	// toggle is only processed once (not on every incidental re-render
	// of this component for unrelated reasons), regardless of which
	// direction it went.
	const lastHandledRef = React.useRef<boolean>(isAnchored)
	const isMountedRef = React.useRef(false)

	// Single layout effect doing both measuring AND animating — unlike
	// an earlier version of this component, which split those into two
	// separate effects (one running unconditionally on every render to
	// track position, another only reacting to `isAnchored` changes).
	// That split had a real bug: clicking "replay" while already
	// anchored (InputPositionDemo resets to centered, then immediately
	// re-triggers forward again before the reset animation has actually
	// finished) could fire this component's SECOND toggle while the
	// FIRST toggle's reset animation was still actively transforming the
	// element. `getBoundingClientRect()` reports an element's CURRENT
	// VISUAL position, including the effect of any transform currently
	// applied to it — so measuring without first canceling/clearing that
	// still-in-flight transform captured a stale, mid-animation position
	// instead of the element's true settled position, corrupting the
	// delta computed for that second toggle (observed as the footer
	// jumping to the very top of the screen). Combining everything into
	// one effect, and explicitly canceling+clearing any in-flight
	// animation BEFORE measuring for a new toggle, guarantees every
	// measurement reflects pure, untransformed layout — regardless of
	// whether a previous cycle's animation ever actually finished.
	useIsomorphicLayoutEffect(() => {
		const el = ref.current
		if (!el) return

		// First run (mount): nothing to animate yet, just record the
		// initial resting position as the baseline for the first real
		// toggle.
		if (!isMountedRef.current) {
			isMountedRef.current = true
			settledTopRef.current = el.getBoundingClientRect().top
			return
		}

		if (lastHandledRef.current === isAnchored) return
		lastHandledRef.current = isAnchored

		// Cancel/clear anything still in flight from a PREVIOUS cycle
		// BEFORE measuring this one — see the docstring above for why.
		if (rafRef.current !== null) {
			cancelAnimationFrame(rafRef.current)
			rafRef.current = null
		}
		if (animationRef.current) {
			animationRef.current.cancel()
			animationRef.current = null
		}
		el.style.transform = ''

		const prevTop = settledTopRef.current ?? el.getBoundingClientRect().top
		// React has already committed this render's DOM/layout change by
		// the time this layout effect runs, so — now that any previous
		// transform has been cleared above — this measurement reflects
		// the NEW state's true, natural resting position.
		const curTop = el.getBoundingClientRect().top
		settledTopRef.current = curTop

		const fromTranslateY = prevTop - curTop
		const distance = Math.abs(fromTranslateY)

		const duration = baseDurationMs + ((distance - baseDistance) / 100) * msPer100px

		if (distance === 0 || duration <= 0) {
			onAnimationComplete?.()
			return
		}

		// INVERT: synchronously jump to the starting offset, no
		// animation — this is what the browser's very next paint shows.
		el.style.transform = `translateY(${fromTranslateY}px)`

		onAnimationStart?.(distance, duration)

		// PLAY: wait for that inverted frame to actually be painted
		// before starting the real animated transition to rest. Calling
		// `el.animate()` synchronously in the same tick as the INVERT
		// write above proved unreliable on its own (observed as the
		// footer briefly jumping to a wildly wrong effective start
		// value) — letting one frame actually paint the inverted state
		// first removes that ambiguity.
		rafRef.current = requestAnimationFrame(() => {
			rafRef.current = null
			el.style.transform = ''
			const animation = el.animate(
				[{ transform: `translateY(${fromTranslateY}px)` }, { transform: 'translateY(0)' }],
				{
					duration,
					easing: EASING,
				},
			)

			animation.onfinish = () => {
				onAnimationComplete?.()
			}

			animationRef.current = animation
		})
	}, [isAnchored, baseDistance, baseDurationMs, msPer100px, onAnimationStart, onAnimationComplete])

	// Cleanup on unmount — cancel anything still pending so no stale
	// callback fires (or style write happens) against an unmounted ref.
	React.useEffect(() => {
		return () => {
			if (rafRef.current !== null) {
				cancelAnimationFrame(rafRef.current)
			}
			if (animationRef.current) {
				animationRef.current.cancel()
			}
		}
	}, [])

	return <div ref={ref}>{children}</div>
}
