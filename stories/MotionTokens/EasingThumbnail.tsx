import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { fluentMotionEasings } from '../../src/styles/fluentMotionTokens'
import { motionPalette } from '../../src/styles/motionPalettes'
import type { MotionPaletteName } from '../../src/styles/motionPalettes'
import { useDemoMotion } from '../../src/components/Page/DemoMotionContext'
import { cubicBezierSvgPath } from '../shared/cubicBezier'
import { SMALL_SCREEN } from '../../src/styles/GlobalStyles'

const GRAPH_W = 280
const GRAPH_H = 192
const GRAPH_PADDING = 18
const ANIMATION_MS = 800
const REST_MS = 1000

/**
 * Capped graph box (see GraphBox below) keeps this label's full content
 * comfortably inside DemoSlot's fixed 200px/`overflow: hidden` height
 * cap (see Thumbnail.tsx) at every breakpoint, so no responsive
 * hide-at-small-screens behavior is needed here anymore.
 */
const Label = styled.div``

/**
 * Each graph panel grows taller at/below SMALL_SCREEN (the card itself
 * gets wider there, and `aspect-ratio` scales height to match), which is
 * what was pushing total content height past DemoSlot's 200px cap in
 * the first place (see Label's docstring above). Capping height at that
 * breakpoint keeps the graphs comfortably inside the 200px box so the
 * container's own vertical padding (below) stays visible instead of
 * being squeezed out by overflow clipping.
 */
const GraphBox = styled.div`
	position: relative;
	height: 96px;
	border-radius: 8px;
	overflow: hidden;

	@media (max-width: ${SMALL_SCREEN}px) {
		height: 96px;
	}
`

export const EasingThumbnail = ({ theme }: { theme: MotionPaletteName }) => {
	const palette = motionPalette(theme)
	const { stopped } = useDemoMotion()
	const [activeIndex, setActiveIndex] = useState(0)
	const [atEnd, setAtEnd] = useState(false)
	const [resetting, setResetting] = useState(false)
	const dotRefs = useRef<(HTMLDivElement | null)[]>([])
	const lineRefs = useRef<(HTMLDivElement | null)[]>([])
	const hasStartedRef = useRef(false)
	const [frozen, setFrozen] = useState<Record<number, { left: string; top: string; width: string }> | null>(null)

	const easings = useMemo(
		() => [
			fluentMotionEasings.find((easing) => easing.label === 'functional-enter') ?? fluentMotionEasings[0],
			fluentMotionEasings.find((easing) => easing.label === 'expressive-transition') ?? fluentMotionEasings[1],
		],
		[]
	)

	useEffect(() => {
		if (stopped) {
			return
		}

		let cancelled = false
		const timeouts: number[] = []
		const setTrackedTimeout = (callback: () => void, delay: number) => {
			const timeout = window.setTimeout(callback, delay)
			timeouts.push(timeout)
			return timeout
		}
		const run = () => {
			setResetting(true)
			setAtEnd(false)
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					if (!cancelled) {
						setResetting(false)
						setAtEnd(true)
					}
				})
			})
		}

		if (!hasStartedRef.current) {
			run()
			hasStartedRef.current = true
		}
		const scheduleNext = () => {
			setTrackedTimeout(() => {
				if (cancelled) return
				setActiveIndex((current) => (current + 1) % easings.length)
				run()
				scheduleNext()
			}, ANIMATION_MS + REST_MS)
		}
		scheduleNext()

		return () => {
			cancelled = true
			timeouts.forEach((timeout) => window.clearTimeout(timeout))
		}
	}, [easings.length, stopped])

	useLayoutEffect(() => {
		if (!stopped) {
			setFrozen(null)
			return
		}

		const nextFrozen: Record<number, { left: string; top: string; width: string }> = {}
		easings.forEach((_, index) => {
			const dot = dotRefs.current[index]
			const line = lineRefs.current[index]
			if (!dot || !line) return
			const dotStyle = window.getComputedStyle(dot)
			const lineStyle = window.getComputedStyle(line)
			nextFrozen[index] = {
				left: dotStyle.left,
				top: dotStyle.top,
				width: lineStyle.width,
			}
		})
		setFrozen(nextFrozen)
	}, [easings, stopped])

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 16,
				boxSizing: 'border-box',
				background: palette.backgroundDark,
				color: palette.text,
				padding: 10,
			}}
		>
			{easings.map((easing, index) => {
				const isActive = index === activeIndex
				const accentColor = index === 0 ? palette.colors[1] : palette.colors[2]
				const dotAtEnd = isActive && atEnd
				const frozenFrame = stopped ? frozen?.[index] : undefined
				return (
					<div key={easing.token} style={{ flex: '0 1 200px', maxWidth: 200, minWidth: 0 }}>
						<Label
							style={{
								fontFamily: 'monospace',
								fontSize: 10,
								fontWeight: 700,
								opacity: isActive ? 1 : 0.5,
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								marginBottom: 6,
							}}
						>
							{easing.label}
						</Label>
						<GraphBox
							style={{
								border: '1px solid rgba(255,255,255,0.3)',
								background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
							}}
						>
							<svg width="100%" height="100%" viewBox={`0 0 ${GRAPH_W} ${GRAPH_H}`} preserveAspectRatio="none">
								<path
									d={cubicBezierSvgPath(easing.points, GRAPH_W, GRAPH_H, GRAPH_PADDING)}
									fill="none"
									stroke={palette.colors[0]}
									strokeWidth={2}
									opacity={0.75}
								/>
							</svg>
							<div
								ref={(element) => {
									dotRefs.current[index] = element
								}}
								style={{
									position: 'absolute',
									width: 10,
									height: 10,
									borderRadius: '50%',
									background: accentColor,
									left: frozenFrame?.left ?? (dotAtEnd ? `${100 - (GRAPH_PADDING / GRAPH_W) * 100}%` : `${(GRAPH_PADDING / GRAPH_W) * 100}%`),
									top: frozenFrame?.top ?? (dotAtEnd ? `${(GRAPH_PADDING / GRAPH_H) * 100}%` : `${100 - (GRAPH_PADDING / GRAPH_H) * 100}%`),
									transform: 'translate(-50%, -50%)',
									transitionProperty: 'left, top',
									transitionDuration: stopped || resetting ? '0ms, 0ms' : `${ANIMATION_MS}ms, ${ANIMATION_MS}ms`,
									transitionTimingFunction: `linear, ${easing.curve}`,
								}}
							/>
						</GraphBox>
						<div style={{ height: 4, marginTop: 8, borderRadius: 2, background: 'rgba(255,255,255,0.3)', overflow: 'hidden' }}>
							<div
								ref={(element) => {
									lineRefs.current[index] = element
								}}
								style={{
									width: frozenFrame?.width ?? (dotAtEnd ? '100%' : '0%'),
									height: '100%',
									background: accentColor,
									transition: stopped ? 'none' : `width ${ANIMATION_MS}ms ${easing.curve}`,
								}}
							/>
						</div>
					</div>
				)
			})}
		</div>
	)
}
