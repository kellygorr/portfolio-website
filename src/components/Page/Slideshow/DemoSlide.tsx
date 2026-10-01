import { motionPalette } from '../../../styles/motionPalettes'
import { DemoHeader } from '../DemoHeader'
import { DemoMotionContext } from '../DemoMotionContext'
import { useReplayControl } from '../useReplayControl'
import type { MotionDemoProps } from '../MotionDemoProps'
import type { ReactNode } from 'react'

/**
 * Shared container for a motion demo embedded as a slideshow slide (via
 * ISlide.demo — see Slide.tsx's DemoSlideContent). Includes the same
 * DemoHeader (badges + optional solid background) as `Demo`, but fills
 * 100%/100% of the slide's own box instead of capping at the page-text
 * 700px column — slides already have their own width control
 * (ISlideshow.width).
 *
 * `interactive` slides get the same restart mechanism as Demo (see
 * useReplayControl.ts) — a merged InteractiveBadge with an auto-run-
 * once-on-scroll-into-view scripted replay, exposed to the slide's own
 * content via DemoMotionContext (replayToken/onReplayStateChange).
 * Content is NEVER remounted across replays (no `key` bump) — it stays
 * mounted continuously and watches `replayToken` changing via its own
 * useEffect to drive its own state setters (see Demo.tsx's docstring
 * for the full reasoning). Non-interactive slides never render a
 * restart control (DemoSlide has no autoplay stop/start toggle — every
 * slide in this codebase using DemoSlide is currently `interactive`).
 */
export const DemoSlide = ({
	theme,
	interactive,
	hasHeader,
	children,
}: MotionDemoProps & { interactive?: boolean; hasHeader?: boolean; children: ReactNode }) => {
	const palette = motionPalette(theme)
	const { containerRef, restartKey, running, setRunning, runReplay } = useReplayControl(interactive)
	return (
		<div
			ref={containerRef}
			style={{
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				height: '100%',
				background: palette.background,
			}}
			// Slideshow's own click-to-navigate (Slideshow.tsx's
			// handleSlideShowClick, bound on the scroll container this
			// slide sits inside) advances/retreats a slide on any click
			// near either edge — meant for plain image slides, where a
			// click anywhere just means "go to the next slide". For an
			// interactive demo, clicks that land on an actual control
			// (button, input, etc. — including the restart button in the
			// header above, not just the content area below) must stay
			// local instead of also being read as "advance the
			// slideshow" — but we only intercept clicks that actually
			// hit a real control, not the whole slide area, otherwise a
			// demo that fills the slide would leave no empty space left
			// to click-navigate at all. Non-interactive demo slides
			// never intercept. This listener is on the OUTER container
			// (not just the content div below) so it also covers
			// DemoHeader's restart button, which is a sibling of the
			// content div, not nested inside it.
			onClick={
				interactive
					? (e) => {
							const target = e.target as HTMLElement
							if (target.closest('button, input, textarea, select, a[href], [role="button"]')) {
								e.stopPropagation()
							}
						}
					: undefined
			}
		>
			<DemoHeader
				theme={theme}
				hasHeader={hasHeader}
				showClickToInteract={interactive}
				running={running}
				onRestart={runReplay}
			/>
			<div
				style={{
					flex: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					minHeight: 0,
					boxSizing: 'border-box',
					overflow: 'hidden',
				}}
			>
				{interactive ? (
					<DemoMotionContext.Provider value={{ stopped: false, replayToken: restartKey, onReplayStateChange: setRunning }}>
						{children}
					</DemoMotionContext.Provider>
				) : (
					children
				)}
			</div>
		</div>
	)
}
