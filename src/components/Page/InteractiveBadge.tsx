import styled, { keyframes } from 'styled-components'
import { ArrowClockwise16Filled } from '@fluentui/react-icons'

/**
 * Merged "Click below to interact" label + restart control, shown as
 * ONE pill (label and icon separated by a vertical divider) instead of
 * two separate boxes — reads as a single unit rather than a label
 * sitting next to an unrelated button. Rendered in DemoHeader's `end`
 * slot for `interactive` demos.
 *
 * Only the icon side is an actual clickable <button> — the label text
 * is a plain, non-interactive span (same look as RecreatedBadge: 11px/
 * weight 600/0.2px letter-spacing), not part of the click target.
 *
 * Restart behavior (previously a separate ReplayButton): clicking
 * restarts the demo's scripted sequence via a full content remount —
 * not a pause/resume-in-place toggle, which proved unreliable for
 * arbitrary CSS animations and JS state machines. While a restart is
 * running the icon spins continuously; when it finishes (a fallback
 * timeout, or demo content reporting completion via
 * onReplayStateChange), the spin eases to a stop.
 */
const spin = keyframes`
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
`

const Pill = styled.div<{ $bg: string; $color: string }>`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 6px 8px 6px 12px;
	border-radius: 6px;
	background: ${({ $bg }) => $bg};
	color: ${({ $color }) => $color};
	white-space: nowrap;
`

const Label = styled.span`
	font-size: 11px;
	font-weight: 600;
	letter-spacing: 0.2px;
	pointer-events: none;
`

const Divider = styled.span<{ $color: string }>`
	width: 1px;
	align-self: stretch;
	background: ${({ $color }) => $color};
	opacity: 0.35;
`

const IconButton = styled.button<{ $color: string; $running: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 28px;
	height: 28px;
	border: none;
	background: transparent;
	color: ${({ $color }) => $color};
	cursor: pointer;
	padding: 0;
	flex-shrink: 0;

	&:hover {
		opacity: 0.85;
	}

	&:disabled {
		cursor: default;
	}

	svg {
		/* Always has the spin animation attached — toggling between
		   "running" and "stopped" only ever changes animation-play-state,
		   never swaps to a different rule/style. An earlier version
		   swapped between an animation declaration (while running) and
		   a transition: transform ... rotate(0deg) declaration (while
		   stopped) — but transitioning transform can only interpolate
		   FROM whatever inline/computed rotation the element already has
		   TO the new target, and an animation shorthand being removed
		   entirely doesn't leave behind a usable rotation value for that
		   transition to start from — so the icon never visibly appeared
		   to be spinning while running. animation-play-state avoids this
		   entirely: the exact same keyframes rule stays attached the
		   whole time, just paused/resumed, so there's always continuous
		   rotation while running and a true freeze-in-place (not a
		   separate ease-to-rotate(0)) once stopped. */
		animation: ${spin} 900ms linear infinite;
		animation-play-state: ${({ $running }) => ($running ? 'running' : 'paused')};
	}
`

interface Props {
	bg: string
	color: string
	running: boolean
	onToggle: () => void
	/** Hides the divider + restart icon, leaving just the "Click below to
	 *  interact" label — for demos that already have their own ongoing/
	 *  restartable interaction (e.g. DAB's Intro/Thinking toggle buttons
	 *  drive its own animation directly) and don't need Demo's separate
	 *  auto-play-once/restart mechanism layered on top. */
	hideRestart?: boolean
}

export const InteractiveBadge = ({ bg, color, running, onToggle, hideRestart }: Props) => (
	<Pill $bg={bg} $color={color}>
		<Label>Click below to interact</Label>
		{!hideRestart && (
			<>
				<Divider $color={color} />
				{/* Disabled while a replay is actively running — clicking
				    restart mid-sequence would re-trigger the demo's own
				    scripted state changes (e.g. setTimeout-driven steps)
				    on top of the ones already in flight, visibly corrupting
				    the animation (skipped/out-of-order steps, state left
				    mid-transition). A fresh restart is only safe to request
				    once the previous one has fully settled. */}
				<IconButton
					$color={color}
					$running={running}
					onClick={onToggle}
					disabled={running}
					aria-label="Restart demo animation"
					type="button"
				>
					<ArrowClockwise16Filled />
				</IconButton>
			</>
		)}
	</Pill>
)
