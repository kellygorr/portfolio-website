import * as React from 'react'
import styled from 'styled-components'
import { ArrowUp20Filled } from '@fluentui/react-icons'
import { InputPositionAnimation } from './InputPositionAnimation'
import { Blocks } from '../BlocksLatency/Blocks'
import { lightenHex } from '../shared/motionTheme'
import { darkestColor, motionPalette } from '../../src/styles/motionPalettes'
import { useDemoMotion } from '../../src/components/Page/DemoMotionContext'
import type { MotionDemoProps } from '../../src/components/Page/MotionDemoProps'

const SAMPLE_MESSAGE = "What's on my calendar today?"

// Fade durations — see the required-behavior spec in BEHAVIOR.md.
// Border fade-IN (centered -> anchored) approximates
// InputPositionAnimation's own default slide duration (baseDurationMs=250)
// so it reads as synced with the position change in the common case,
// without needing a second JS-measured duration threaded through refs.
// Starts immediately, no delay — same instant Send is clicked, same
// instant the position slide starts.
const BORDER_FADE_IN_MS = 250
// Border fade-OUT (anchored -> centered) is deliberately faster than the
// fade-in — the line should visibly clear away quickly on the way back,
// not linger for the same duration as the forward reveal. Also starts
// immediately, no delay, the instant the return slide begins.
const BORDER_FADE_OUT_MS = 120
// Background fades in slowly only once settled...
const BG_FADE_IN_MS = 200
// ...but fades out "very quickly" before the return slide is allowed
// to start at all (see InputPositionDemo's handleNewChat).
const BG_FADE_OUT_MS = 120

// The footer container: this is the exact box InputPositionAnimation
// FLIP-animates (it's the direct child passed as `children`), so
// anything that needs to travel WITH the input for free (no separate
// timing/sync logic) belongs inside it, as a direct child of this
// element — see BorderLine below. Only establishes a stacking context
// (z-index: 0) so BorderLine/the background pseudo-element's own
// z-index: -1 stays scoped to THIS container's children, rather than
// comparing against ancestors outside it (that was a real bug: the
// background had the correct computed opacity but never visibly
// painted, because it ended up behind an ancestor's opaque background
// instead of just behind this container's own content).
const FooterContainer = styled.div`
	position: relative;
	z-index: 0;
	width: 100%;
`

// The top border, implemented as its own thin absolutely-positioned bar
// with an opacity transition — not a literal `border-top` with a
// transitioned `border-color` — so the fade is a pure compositor
// opacity animation (GPU, no repaint) instead of a color interpolation
// (main-thread paint on every frame). `$visible` is driven directly by
// `isAnchored`, in the SAME render that also drives the FLIP position
// change (see InputPositionDemo) — not a separate, later state change —
// so it fades in/out WHILE the box travels, arriving already in sync
// with the slide (starting the instant the slide starts, in BOTH
// directions), exactly like it rides along on the same translateY
// transform as the rest of the footer for free. Fade-in and fade-out
// use different DURATIONS (quicker clear-away on the way back) via two
// separate `transition` declarations, same technique as
// FooterBackground below: the base selector's duration applies when
// `$visible` goes false (fade out), and the `&[data-visible='true']`
// selector's own duration applies when it goes true (fade in), since
// CSS reads the transition from whichever rule matches the element's
// state AFTER the prop change.
const BorderLine = styled.div<{ $accent: string; $visible: boolean }>`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 2px;
	background: ${({ $accent }) => $accent};
	opacity: ${({ $visible }) => ($visible ? 1 : 0)};
	transition: opacity ${BORDER_FADE_OUT_MS}ms ease-out;
	pointer-events: none;

	&[data-visible='true'] {
		transition: opacity ${BORDER_FADE_IN_MS}ms ease-out;
	}
`

// The background wash, implemented as an ::after pseudo-element (kept
// behind the content with z-index: -1) — deliberately NOT tied to
// `isAnchored` directly. Per the required behavior: the background
// must only fade in once the footer has fully SETTLED at the anchored
// position (not while it's still traveling), and must fade out quickly
// BEFORE the return slide starts (not during it) — see
// InputPositionDemo's `backgroundVisible` state and its
// handleAnimationComplete/handleNewChat for exactly when each fade is
// triggered. Fade-in and fade-out intentionally use different
// durations (slower reveal once settled, quick "very quickly goes
// away" on the way out) — achieved via two separate `transition`
// declarations: the base selector's duration applies when the
// `bg-visible` class is being REMOVED (fade out), and the
// `&.bg-visible` selector's own duration applies when it's being ADDED
// (fade in), since CSS reads the transition from whichever rule
// matches the element's state AFTER the class change.
const FooterBackground = styled.div<{ $background: string }>`
	position: absolute;
	inset: 0;
	background: ${({ $background }) => $background};
	opacity: 0;
	transition: opacity ${BG_FADE_OUT_MS}ms ease-out;
	pointer-events: none;
	z-index: -1;

	&.bg-visible {
		opacity: 1;
		transition: opacity ${BG_FADE_IN_MS}ms ease-out;
	}
`

// Plain button, not Fluent's <Button> — Fluent components rely on
// FluentProvider (Storybook's preview decorator supplies one) for their
// CSS custom properties (border-radius, colors, etc.). The actual
// portfolio site never wraps pages in a FluentProvider, so those
// tokens resolve to nothing there — this demo's Send button rendered
// as a plain square on the real page even though it looked correct in
// Storybook. A plain native <button> with the same icon sidesteps that
// dependency entirely.
const SendButton = styled.button<{ $bg: string }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	min-width: 30px;
	border: none;
	border-radius: 50%;
	background-color: ${({ $bg }) => $bg};
	color: #fff;
	cursor: pointer;
	padding: 0;
`

// Plain styled input instead of an inline-styled <input> — the typed
// text color can be set inline just fine, but the placeholder is
// rendered by the browser via the ::placeholder pseudo-element, which
// inline `style` can never target. Without this, the placeholder used
// the browser's default gray instead of the theme's accent color.
const ChatInput = styled.input<{ $color: string }>`
	flex: 1;
	border: none;
	outline: none;
	padding: 12px 0;
	font-size: 18px;
	line-height: 1.8;
	background: transparent;
	color: ${({ $color }) => $color};

	&::placeholder {
		color: ${({ $color }) => $color};
		opacity: 1;
	}
`

interface InputPositionDemoProps extends MotionDemoProps {
	baseDistance?: number
	baseDurationMs?: number
	msPer100px?: number
}

// Delay between each step of the scripted auto-play sequence (anchor,
// then un-anchor) — long enough to actually see the FLIP animation
// complete and read the anchored state (sent bubble + "Thinking...")
// before it reverts.
const SEQUENCE_STEP_MS = 1400

/**
 * Portfolio-embeddable version of the Input Position Animation story:
 * same click-driven FLIP behavior, but sized to fill its parent
 * (position: relative, 100%/100%) instead of the story's full-viewport
 * (position: fixed, inset: 0) — so it can drop into a DemoSlide slot
 * without breaking out of the page layout.
 */
export const InputPositionDemo = ({ theme, baseDistance = 400, baseDurationMs = 250, msPer100px = 20 }: InputPositionDemoProps) => {
	const [isAnchored, setIsAnchored] = React.useState(false)
	const [inputValue, setInputValue] = React.useState(SAMPLE_MESSAGE)
	const [sentMessage, setSentMessage] = React.useState(SAMPLE_MESSAGE)
	// Whether the footer background wash is visible. Deliberately
	// SEPARATE from `isAnchored` (which drives both the FLIP position
	// change AND the border — see BorderLine/FooterContainer above):
	// the background has its own independent timing relationship to the
	// slide (see BEHAVIOR.md) —
	//   - Forward (centered -> anchored): background only starts fading
	//     in once the slide has fully SETTLED (set in
	//     handleAnimationComplete below), never while still traveling.
	//   - Reverse (anchored -> centered): background fades out FIRST,
	//     and the slide back to center must not even START until that
	//     fade-out has finished (set directly in handleNewChat below,
	//     with the actual `setIsAnchored(false)` that starts the slide
	//     delayed by BG_FADE_OUT_MS).
	// This is safe as plain React state in both cases: forward, the
	// state change happens in onAnimationComplete, by which point the
	// WAAPI slide has already fully finished (transform back to
	// 'none') — InputPositionAnimation's position-tracking layout
	// effect re-measuring at that point reads the correct, already-
	// settled position. Reverse, the state change happens the instant
	// the user clicks, before any slide has started at all — nothing is
	// animating yet, so there's nothing to corrupt. The one thing this
	// must never do is change while the slide is ACTIVELY running
	// (e.g. synced to the slide starting) — that's what previously
	// corrupted the FLIP distance calculation for the next transition.
	const [backgroundVisible, setBackgroundVisible] = React.useState(false)
	const palette = motionPalette(theme)
	const accent = palette.colors[2]
	const accentDark = darkestColor(palette)
	const background = palette.background
	// Greatly lightened colors[2] — just for this footer background, so
	// it reads as a subtle surface distinction rather than a bold flat
	// block of the same accent used elsewhere.
	const footerBackground = lightenHex(palette.colors[2], 0.75)

	// Pending reverse-direction timer (background fade-out -> delayed
	// slide-back) — tracked so a replay or rapid re-click can cancel a
	// previously scheduled one instead of leaving two in flight.
	const revertSlideTimerRef = React.useRef<number | null>(null)

	const clearPendingRevert = () => {
		if (revertSlideTimerRef.current !== null) {
			window.clearTimeout(revertSlideTimerRef.current)
			revertSlideTimerRef.current = null
		}
	}

	// Forward: centered -> anchored. Starts the FLIP slide (+ border
	// fade-in, riding along via the same `isAnchored` render) IMMEDIATELY
	// — nothing to wait for on this direction. The background fade-in is
	// NOT started here; it only happens once the slide has fully
	// settled, via handleAnimationComplete below.
	const handleSend = () => {
		clearPendingRevert()
		setSentMessage(inputValue)
		setInputValue('')
		setIsAnchored(true)
	}

	// Reverse: anchored -> centered. Per the required behavior, this is
	// SEQUENTIAL, not simultaneous: the background must fade out and
	// fully disappear BEFORE the position even starts moving. So this
	// starts the (quick) background fade-out immediately, and only
	// calls `setIsAnchored(false)` — which starts the FLIP slide back +
	// border fade-out together — after BG_FADE_OUT_MS has elapsed.
	const handleNewChat = () => {
		clearPendingRevert()
		setBackgroundVisible(false)
		revertSlideTimerRef.current = window.setTimeout(() => {
			revertSlideTimerRef.current = null
			setInputValue(SAMPLE_MESSAGE)
			setIsAnchored(false)
		}, BG_FADE_OUT_MS)
	}

	const handleToggle = () => {
		if (isAnchored) {
			handleNewChat()
		} else {
			handleSend()
		}
	}

	// Scripted auto-play sequence: fires once when this demo first
	// scrolls into view, and again on every manual restart-icon click
	// (see Demo.tsx's docstring for why this component stays mounted
	// continuously across replays instead of being remounted — a
	// mount-time "skip first run" ref, like the one below, only works
	// correctly when the component is never remounted). Mirrors
	// handleSend/handleNewChat's own sequencing (background fade-out
	// must finish before the slide back starts) rather than calling
	// setIsAnchored directly, so autoplay exercises the exact same
	// timing as a real click.
	const { replayToken, onReplayStateChange } = useDemoMotion()
	const isFirstRun = React.useRef(true)

	React.useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false
			return
		}

		let cancelled = false
		const timers: number[] = []
		clearPendingRevert()
		setBackgroundVisible(false)
		setSentMessage(SAMPLE_MESSAGE)
		setInputValue('')

		const startForward = () => {
			if (cancelled) return
			setIsAnchored(true)
			// Background fade-in on settle is handled automatically by
			// handleAnimationComplete below — nothing to do here.
		}

		// Normal case: demo is centered when replay is requested (true
		// the vast majority of the time — scroll-into-view auto-run, or
		// any click after a previous cycle has fully reverted). Kick off
		// the forward motion IMMEDIATELY, no delay — an earlier version
		// waited a full SEQUENCE_STEP_MS before starting anything here,
		// which made clicking the restart icon feel broken (nothing
		// visibly happens for 1.4s after the click). Only the time
		// spent VIEWING the anchored state before reverting should be
		// delayed, never the initial motion.
		if (!isAnchored) {
			startForward()
		} else {
			// Edge case: replay requested while already anchored
			// mid-cycle. Reset to centered first — otherwise
			// setIsAnchored(true) here would be a same-value no-op
			// (already true), so InputPositionAnimation's position
			// effect would never fire and no reset slide would play.
			// Deferred one tick (not SEQUENCE_STEP_MS) purely so the
			// centered state actually commits as its own render before
			// flipping back to anchored — imperceptible, not a
			// meaningful wait.
			setIsAnchored(false)
			timers.push(window.setTimeout(startForward, 0))
		}

		timers.push(
			window.setTimeout(() => {
				if (cancelled) return
				// Same two-step sequencing as handleNewChat: fade the
				// background out first, THEN (once that's finished) start
				// the slide back to center.
				setBackgroundVisible(false)
				timers.push(
					window.setTimeout(() => {
						if (cancelled) return
						setInputValue(SAMPLE_MESSAGE)
						setIsAnchored(false)
						onReplayStateChange?.(false)
					}, BG_FADE_OUT_MS),
				)
			}, SEQUENCE_STEP_MS),
		)

		return () => {
			cancelled = true
			timers.forEach((t) => window.clearTimeout(t))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [replayToken])

	// Background fade-in is the ONLY thing driven by
	// InputPositionAnimation's onAnimationComplete — and only when the
	// slide that just finished was the FORWARD one (isAnchored is true
	// by the time it completes). This is safe as a state change here:
	// by the time onAnimationComplete fires, the WAAPI slide has
	// already fully finished (transform back to 'none'), so
	// InputPositionAnimation's position-tracking layout effect
	// re-measuring on the resulting re-render reads the correct,
	// already-settled position — it does NOT corrupt the next
	// transition's distance calculation the way a state change DURING
	// an active slide would. When the slide that just finished was the
	// REVERSE one (isAnchored false), there's nothing to do here — the
	// background was already faded out and hidden before that slide
	// even started (see handleNewChat/the replay effect above).
	const handleAnimationComplete = () => {
		if (isAnchored) {
			setBackgroundVisible(true)
		}
	}

	return (
		<div
			style={{
				position: 'relative',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: isAnchored ? 'flex-end' : 'center',
				alignItems: 'center',
				background,
				overflow: 'hidden',
			}}
		>
			{isAnchored && (
				<div
					style={{
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						maxWidth: 720,
						padding: 32,
						overflowY: 'auto',
						boxSizing: 'border-box',
					}}
				>
					<div
						style={{
							marginBottom: 8,
							alignSelf: 'flex-end',
							padding: '10px 16px',
							background: accent,
							color: '#fff',
							borderRadius: 12,
							fontSize: 14,
						}}
					>
						{sentMessage}
					</div>
					<div style={{ display: 'flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start' }}>
						<Blocks size={6} duration={3567} colors={palette.colors as [string, string, string, string, string]} />
						<span style={{ fontSize: 14, color: accentDark }}>Thinking...</span>
					</div>
				</div>
			)}
			<div style={{ width: '100%' }}>
				<InputPositionAnimation
					isAnchored={isAnchored}
					baseDistance={baseDistance}
					baseDurationMs={baseDurationMs}
					msPer100px={msPer100px}
					onAnimationComplete={handleAnimationComplete}
				>
					<FooterContainer>
						<BorderLine $accent={accent} $visible={isAnchored} data-visible={isAnchored} />
						<FooterBackground $background={footerBackground} className={backgroundVisible ? 'bg-visible' : undefined} />
						<div style={{ maxWidth: 720, width: '100%', margin: '0 auto', padding: 32, boxSizing: 'border-box' }}>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 8,
									borderBottom: `2px solid ${accent}`,
								}}
							>
								<ChatInput
									$color={accentDark}
									placeholder={isAnchored ? 'Message Copilot' : 'Ask Copilot'}
									aria-label="Copilot Chat"
									value={isAnchored ? '' : inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === 'Enter' && !isAnchored) {
											handleToggle()
										}
									}}
									readOnly={isAnchored}
								/>
								<SendButton
									$bg={accentDark}
									aria-label={isAnchored ? 'New chat' : 'Send message'}
									onClick={handleToggle}
									style={{
										transform: isAnchored ? 'rotate(180deg)' : 'none',
										transition: 'transform 250ms ease-out',
									}}
								>
									<ArrowUp20Filled />
								</SendButton>
							</div>
						</div>
					</FooterContainer>
				</InputPositionAnimation>
			</div>
		</div>
	)
}
