import { useState } from 'react'
import { motionPalette } from '../../../styles/motionPalettes'
import { DemoHeader } from '../DemoHeader'
import { DemoMotionContext } from '../DemoMotionContext'
import { useReplayControl } from '../useReplayControl'
import { useMediaQuery } from '../../shared'
import { ScaleToFit } from './ScaleToFit'
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
 * for the full reasoning).
 *
 * Non-interactive slides get the same autoplay stop/start toggle as
 * `Demo` instead (a StopButton rendered via DemoHeader's
 * `showPausePlay`) — content remounts on Start (a mount-key bump) so
 * restarting always replays from frame one. Useful for an ongoing/
 * looping CSS or JS animation (e.g. the Copilot logo prototype) that
 * has no natural "replay" concept of its own and would otherwise run
 * forever with no way to pause it inside a slideshow.
 */
export const DemoSlide = ({
	theme,
	interactive,
	hasHeader,
	darkBackground,
	scaleToFit,
	allowRestartWhileRunning,
	hideRestartIcon,
	children,
}: MotionDemoProps & {
	interactive?: boolean
	hasHeader?: boolean
	darkBackground?: boolean
	/** When true, wraps `children` in `ScaleToFit` so content that has
	 *  its own fixed/natural size (e.g. Motion Tokens/Easings' compact
	 *  grid) is uniformly scaled down to always fit this slide's box,
	 *  instead of overflowing or being clipped on narrow/short
	 *  viewports. Opt-in (defaults to off) since most existing
	 *  DemoSlide content (Input Position, DAB) is already built to be
	 *  fluid/responsive on its own and doesn't need it. */
	scaleToFit?: boolean
	allowRestartWhileRunning?: boolean
	hideRestartIcon?: boolean
	children: ReactNode
}) => {
	const palette = motionPalette(theme)
	const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

	// --- Non-interactive (autoplay) path: stop/start toggle ---
	// Same pattern as Demo.tsx — `stopped` is exposed via
	// DemoMotionContext (not used to unmount children); the demo's own
	// component reads it and decides how to pause/stop itself. Start
	// resumes the existing mounted content instead of remounting it.
	const [stopped, setStopped] = useState(prefersReducedMotion)

	// --- Interactive path: restart via full remount, not stop/start ---
	const { containerRef, restartKey, running, setRunning, runReplay } = useReplayControl(interactive, hideRestartIcon)
	return (
		<div
			ref={containerRef}
			style={{
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				height: '100%',
				background: darkBackground ? palette.backgroundDark : palette.background,
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
				hideRestartIcon={hideRestartIcon}
				running={running}
				onRestart={runReplay}
				allowRestartWhileRunning={allowRestartWhileRunning}
				showPausePlay={!interactive}
				stopped={stopped}
				onToggleStop={() => {
					setStopped((prev) => !prev)
				}}
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
					// Same reasoning as Demo.tsx: block pointer interaction
					// with the demo's own content while its scripted replay
					// is actively playing, so a visitor can't click into a
					// button/input and race the sequence's own state
					// changes. DemoHeader's restart icon is a sibling of
					// this div, so it stays clickable throughout.
					pointerEvents: interactive && running ? 'none' : undefined,
				}}
			>
				{interactive ? (
					<DemoMotionContext.Provider value={{ stopped: false, replayToken: restartKey, onReplayStateChange: setRunning }}>
						{scaleToFit ? <ScaleToFit>{children}</ScaleToFit> : children}
					</DemoMotionContext.Provider>
				) : (
					<DemoMotionContext.Provider value={{ stopped, replayToken: 0 }}>
						<div style={{ display: 'contents' }}>
							{scaleToFit ? <ScaleToFit>{children}</ScaleToFit> : children}
						</div>
					</DemoMotionContext.Provider>
				)}
			</div>
		</div>
	)
}
