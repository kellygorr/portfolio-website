import { useState, type ReactNode } from 'react'
import { motionPalette } from '../../styles/motionPalettes'
import { DemoHeader } from './DemoHeader'
import { DemoMotionContext } from './DemoMotionContext'
import { useMediaQuery } from '../shared'
import { useReplayControl } from './useReplayControl'
import type { MotionDemoProps } from './MotionDemoProps'

/**
 * Single shared container for a motion demo embedded in a portfolio
 * page section. Owns ALL alignment concerns in one place: background
 * color, a real in-flow header row (DemoHeader) holding the "recreated
 * for portfolio" badge, and — depending on demo type — either a
 * stop/start control or a restart control. Also handles horizontal
 * centering to the page's text column (full variant) or the parent's
 * own half-width slot (half variant), and vertical centering of the
 * demo content below the header.
 *
 * Two distinct control types, based on `interactive`:
 *
 *   - Non-interactive (autoplay) demos get a StopButton — a real
 *     stop/start toggle. `stopped` is exposed via DemoMotionContext
 *     (useDemoMotion()), and the demo's own component decides whether
 *     to pause in place or show another stopped state. Start resumes the
 *     already-mounted content instead of remounting it.
 *     Starts stopped by default when the visitor has prefers-reduced-motion
 *     set (a manual toggle always wins after that — never fight the
 *     visitor's own choice once made).
 *
 *   - `interactive` demos (ones the visitor has to click/type into,
 *     e.g. DAB's Intro/Thinking toggle, Input Position's Send button)
 *     get a ReplayButton instead (rendered as part of the merged
 *     "Click below to interact" InteractiveBadge) — a RESTART, not a
 *     stop/start toggle. These don't have an ongoing loop to stop;
 *     they have a one-shot scripted sequence, so "restart it from the
 *     top" is the only control that makes sense. Also shows the
 *     "Click below to interact" badge, and Demo automatically fires
 *     ONE scripted replay the first time the demo scrolls into view
 *     (skipped under prefers-reduced-motion) so the motion is visible
 *     without anyone having to guess what to click — then hands
 *     control back.
 *
 *     CRITICALLY: unlike the autoplay path, interactive demo content is
 *     NEVER remounted (no `key` bump) — it stays mounted continuously
 *     across every replay. Instead, `replayToken` (exposed via
 *     DemoMotionContext/useDemoMotion()) increments on every replay
 *     request, and the demo's own component watches for it CHANGING
 *     via a useEffect (comparing against a ref capturing the value it
 *     has already run for — not just truthiness, since the exact same
 *     replay can be requested again), then drives its OWN state
 *     setters to play out the scripted sequence (e.g.
 *     InputPositionDemo calling its own handleToggle() twice with a
 *     delay between; GroundingMenuDemo calling setSelectedMenu()
 *     through each tab). A component that instead skipped its "first
 *     run" via a mount-time ref would be defeated by a remount, since
 *     every fresh mount looks like a first run again — this is why the
 *     content must stay mounted, not be remounted, for the interactive
 *     path. Demo content should call `onReplayStateChange(false)` once
 *     its scripted sequence completes, so ReplayButton can stop
 *     spinning and settle before Demo's own fallback timeout.
 *
 * `hideRestartIcon` (interactive only) suppresses the restart icon on
 * the InteractiveBadge, leaving just the label — for demos that already
 * run their own ongoing/restartable interaction (e.g. DAB) and don't
 * need a separate auto-play-once/restart mechanism layered on top.
 *
 * Project data files should call this directly with their actual demo
 * content as `children` — do NOT create a new named wrapper component
 * per demo (e.g. "FooDemo.tsx"). That was tried and reverted; it just
 * re-creates the duplication problem this component exists to solve.
 */
interface DemoProps extends MotionDemoProps {
	/** Minimum height of the content area (below the header). */
	minHeight?: number
	/** 'full' (default) stays unconstrained so demos can render at full
	 *  available width. 'half'
	 *  fills whatever width the parent section slot gives it (used for
	 *  ISection.demoWidth = 'half', which sits the demo inline next to
	 *  body copy at the same column width instead of full-bleed). */
	variant?: 'full' | 'half'
	/** Set true for demos that require the visitor to click/type to see
	 *  the motion (e.g. DAB's Intro/Thinking toggle buttons, Input
	 *  Position's send button) rather than autoplaying on their own.
	 *  Shows a small "Click below to interact" badge next to the
	 *  "recreated for portfolio" one, a ReplayButton (restart) instead
	 *  of StopButton, and auto-runs the demo's scripted sequence once
	 *  automatically on first scroll into view (see the component
	 *  docstring). */
	interactive?: boolean
	/** Only relevant when `interactive` is true: hides the restart icon
	 *  on the "Click below to interact" badge, leaving just the label.
	 *  For demos that already run their own ongoing/restartable
	 *  interaction (e.g. DAB's Intro/Thinking toggle buttons drive its
	 *  own animation directly) and don't need Demo's separate
	 *  auto-play-once/restart mechanism layered on top. */
	hideRestartIcon?: boolean
	/** When true, the header row gets a solid background behind it
	 *  (matching the demo's own palette background) instead of staying
	 *  transparent. Demo's header sits directly on the page's own
	 *  background with nothing behind it, so this defaults to false;
	 *  DemoSlide (which layers its header directly over scrollable demo
	 *  content) sets this true. */
	hasHeader?: boolean
	/** When true, uses the palette's dark background token
	 *  (`palette.backgroundDark`) instead of its normal light
	 *  `palette.background` — for demos like Motion Tokens/Durations and
	 *  /Easings that are designed to sit on a dark backdrop. */
	darkBackground?: boolean
	iframeSrc?: string
	iframeTitle?: string
	simpleBadge?: boolean
	allowRestartWhileRunning?: boolean
	/** When true, removes the content area's bottom padding — for demos
	 *  that already fill their own box edge-to-edge with their own
	 *  background (e.g. the Typography embeds), where that extra gap
	 *  just leaves an awkward strip of page background between the
	 *  demo's own colored box and whatever comes after it. Defaults to
	 *  false so existing demos (which rely on this padding to avoid
	 *  looking cramped against the page background) are unaffected. */
	flushBottom?: boolean
	children: ReactNode
}

export const Demo = ({
	theme,
	minHeight = 220,
	interactive,
	hideRestartIcon,
	hasHeader,
	darkBackground,
	iframeSrc,
	iframeTitle,
	simpleBadge,
	allowRestartWhileRunning,
	flushBottom,
	children,
}: DemoProps) => {
	const palette = motionPalette(theme)
	const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

	// --- Non-interactive (autoplay) path: stop/start toggle ---
	// `stopped` is exposed via DemoMotionContext, not used to unmount
	// children — the demo's own component reads it (via useDemoMotion())
	// and decides how to pause/stop itself. Start resumes the existing
	// mounted content instead of remounting it.
	const [stopped, setStopped] = useState(prefersReducedMotion)

	// --- Interactive path: restart via full remount, not stop/start ---
	// (shared with DemoSlide — see useReplayControl.ts)
	const { containerRef, restartKey, running, setRunning, runReplay } = useReplayControl(interactive, hideRestartIcon)

	return (
		<div
			ref={containerRef}
			style={{
				position: 'relative',
				display: 'flex',
				justifyContent: 'center',
				width: '100%',
				background: darkBackground ? palette.backgroundDark : palette.background,
				boxSizing: 'border-box',
			}}
		>
			<div
				style={{
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					maxWidth: undefined,
				}}
			>
				<DemoHeader
					theme={theme}
					hasHeader={hasHeader}
					showClickToInteract={interactive}
					hideRestartIcon={hideRestartIcon}
					simpleBadge={simpleBadge}
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
						minHeight,
						// Skipped for iframe-embedded demos (Typography's
						// Storybook stories) and any demo explicitly opting
						// out via `flushBottom` (e.g. the Typography
						// EditorialClamp embed, which fills its own box
						// edge-to-edge with its own background) — in both
						// cases this extra gap just adds unwanted space
						// below content that doesn't need it.
						paddingBottom: iframeSrc || flushBottom ? 0 : 24,
						boxSizing: 'border-box',
						// While the scripted replay is actively playing
						// (interactive demos only — autoplay demos have no
						// equivalent "mid-sequence" state to worry about),
						// block all pointer interaction with the demo's own
						// content. A visitor clicking into a button/input
						// mid-sequence could otherwise race the scripted
						// sequence's own state changes in ways the demo
						// was never designed to handle (e.g. clicking Send
						// while InputPositionDemo's own auto-play timers are
						// already mid-flight) — rather than trying to make
						// every demo defensive against that, just disallow
						// it outright while `running` is true. The restart
						// icon itself lives in DemoHeader, a SIBLING of this
						// div, so it's unaffected and stays clickable the
						// whole time (letting a visitor restart again mid-
						// sequence if they want to).
						pointerEvents: interactive && running ? 'none' : undefined,
					}}
				>
					{iframeSrc ? (
						<iframe
							title={iframeTitle ?? 'Embedded demo'}
							src={iframeSrc}
							style={{
								width: '100%',
								height: minHeight,
								border: 0,
								display: 'block',
							}}
						/>
					) : interactive ? (
						// No `key`-based remount here (unlike the autoplay branch
						// below) — interactive demo content stays mounted across
						// every replay. It drives its own scripted sequence by
						// watching `replayToken` CHANGE via a useEffect (see
						// DemoMotionContext's docstring) and calling its own
						// state setters directly (e.g. GroundingMenuDemo calling
						// setSelectedMenu, InputPositionDemo calling
						// handleToggle) — remounting would defeat that entirely,
						// since a component that skips its own "first run" via a
						// mount-time ref would see EVERY remount as a first run
						// and never actually execute the sequence again.
						<DemoMotionContext.Provider value={{ stopped: false, replayToken: restartKey, onReplayStateChange: setRunning }}>
							{children}
						</DemoMotionContext.Provider>
					) : (
						<DemoMotionContext.Provider value={{ stopped, replayToken: 0 }}>
							<div style={{ display: 'contents' }}>
								{children}
							</div>
						</DemoMotionContext.Provider>
					)}
				</div>
			</div>
		</div>
	)
}
