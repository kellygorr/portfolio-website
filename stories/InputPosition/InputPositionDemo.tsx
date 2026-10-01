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

// The footer container: this is the exact box InputPositionAnimation
// FLIP-animates (it's the direct child passed as `children`), so its
// top border and background move as one unit with the input for free —
// no separate line element, no manual timing/sync logic needed. The
// border is present but invisible (transparent) while centered, and
// switches to visible the instant `isAnchored` flips — since it's
// riding along on the same translateY transform as the rest of the
// box, it arrives already synced.
//
// The background fill is an ::after pseudo element (kept behind the
// content with z-index: -1), transitioning opacity only (compositor-
// only, GPU-accelerated) instead of animating `background-color`
// directly (main-thread paint work on every frame — not performant).
// Appearing fades in; disappearing is instant (no transition) — see
// the isAnchored class toggle below.
const FooterContainer = styled.div<{ $accent: string; $background: string }>`
	position: relative;
	// Establishes its own stacking context (position: relative + z-index
	// alone don't do this — z-index only takes effect on a positioned
	// element, which this already is, but without an explicit z-index
	// here the ::after's z-index: -1 below escapes to compare against
	// ancestors OUTSIDE this component instead of staying scoped to
	// FooterContainer's own children. That was a real bug: the ::after
	// had the correct color/opacity in computed styles but never
	// visibly painted, because it ended up behind an ancestor's opaque
	// background instead of just behind this container's own content.
	z-index: 0;
	width: 100%;
	border-top: 2px solid transparent;

	&.anchored {
		border-top-color: ${({ $accent }) => $accent};
	}

	&::after {
		content: '';
		position: absolute;
		inset: 0;
		background: ${({ $background }) => $background};
		opacity: 0;
		transition: opacity 250ms ease-out;
		pointer-events: none;
		z-index: -1;
	}

	&.anchored::after {
		opacity: 1;
	}

	&:not(.anchored)::after {
		transition: none;
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
	const palette = motionPalette(theme)
	const accent = palette.colors[2]
	const accentDark = darkestColor(palette)
	const background = palette.background
	// Greatly lightened colors[2] — just for this footer background, so
	// it reads as a subtle surface distinction rather than a bold flat
	// block of the same accent used elsewhere.
	const footerBackground = lightenHex(palette.colors[2], 0.75)

	const handleToggle = () => {
		if (!isAnchored) {
			setSentMessage(inputValue)
			setInputValue('')
		} else {
			setInputValue(SAMPLE_MESSAGE)
		}
		setIsAnchored((prev) => !prev)
	}

	// Scripted auto-play sequence: fires once when this demo first
	// scrolls into view, and again on every manual restart-icon click
	// (see Demo.tsx's docstring for why this component stays mounted
	// continuously across replays instead of being remounted — a
	// mount-time "skip first run" ref, like the one below, only works
	// correctly when the component is never remounted). Drives its own
	// state setters directly (send -> wait -> revert) rather than
	// calling handleToggle() twice, since handleToggle's closure would
	// otherwise capture stale `isAnchored`/`inputValue` values from
	// whichever render scheduled the timers.
	const { replayToken, onReplayStateChange } = useDemoMotion()
	const isFirstRun = React.useRef(true)

	React.useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false
			return
		}

		let cancelled = false
		// Reset to a known idle state immediately, regardless of
		// whatever the visitor had already done before requesting this
		// replay — a restart should always play the same sequence from
		// the same starting point.
		setInputValue(SAMPLE_MESSAGE)
		setSentMessage(SAMPLE_MESSAGE)
		setIsAnchored(false)

		const sendTimer = window.setTimeout(() => {
			if (cancelled) return
			setSentMessage(SAMPLE_MESSAGE)
			setInputValue('')
			setIsAnchored(true)
		}, SEQUENCE_STEP_MS)

		const revertTimer = window.setTimeout(() => {
			if (cancelled) return
			setInputValue(SAMPLE_MESSAGE)
			setIsAnchored(false)
			onReplayStateChange?.(false)
		}, SEQUENCE_STEP_MS * 2)

		return () => {
			cancelled = true
			window.clearTimeout(sendTimer)
			window.clearTimeout(revertTimer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [replayToken])

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
				>
					<FooterContainer
						$accent={accent}
						$background={footerBackground}
						className={isAnchored ? 'anchored' : undefined}
					>
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
