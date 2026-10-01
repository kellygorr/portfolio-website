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
	const prevTopRef = React.useRef<number>(0)
	const curTopRef = React.useRef<number>(0)
	// Tracks which `isAnchored` value the FLIP-trigger effect has already
	// handled, so it only fires once per actual toggle (not on every
	// render), regardless of which direction that toggle went.
	const lastHandledRef = React.useRef<boolean>(isAnchored)

	// Record position on every render, BEFORE the browser paints the new
	// layout — so by the time the layout actually changes (isAnchored
	// flips), prevTopRef still holds the position from just before that
	// change, and curTopRef holds the new, already-repainted position.
	useIsomorphicLayoutEffect(() => {
		if (!ref.current) return
		prevTopRef.current = curTopRef.current
		curTopRef.current = ref.current.getBoundingClientRect().top
	})

	React.useEffect(() => {
		if (lastHandledRef.current === isAnchored) return
		lastHandledRef.current = isAnchored

		const el = ref.current
		if (!el) return

		if (animationRef.current) {
			animationRef.current.cancel()
		}

		const fromTranslateY = prevTopRef.current - curTopRef.current
		const distance = Math.abs(fromTranslateY)

		const duration = baseDurationMs + ((distance - baseDistance) / 100) * msPer100px

		if (distance === 0 || duration <= 0) {
			onAnimationComplete?.()
			return
		}

		onAnimationStart?.(distance, duration)
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
	}, [isAnchored, baseDistance, baseDurationMs, msPer100px, onAnimationStart, onAnimationComplete])

	return <div ref={ref}>{children}</div>
}
