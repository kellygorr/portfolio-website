import styled from 'styled-components'
import { Pause16Filled, Play16Filled } from '@fluentui/react-icons'

/**
 * Stop/start toggle for a non-interactive (autoplay) Demo's motion.
 * Shown instead of ReplayButton — autoplay demos have an ongoing
 * looping/continuous animation that's meaningful to stop and later
 * start again, unlike interactive demos (which only have a one-shot
 * scripted sequence to replay, not an ongoing loop).
 *
 * Uses the Pause icon (not Stop16Filled — a plain filled square read
 * as a blank/broken tile rather than a recognizable "stop" affordance
 * in practice) even though the underlying behavior is a full stop, not
 * a pause/resume-from-current-frame: freezing a CSS animation
 * mid-flight via `animation-play-state: paused` and later resuming it
 * via `running` proved unreliable in practice — not every animation
 * actually picked back up cleanly, and JS-driven state machines could
 * get stuck between states. Instead:
 *   - Clicking while running fully STOPS the demo content — see
 *     DemoMotionContext's `stopped` flag, which the demo's own
 *     component reads to render its static/settled end-state (there is
 *     no mid-animation freeze frame to reason about).
 *   - Clicking while stopped fully RESTARTS it, which plays the
 *     animation cleanly from its first frame — the same "remount =
 *     clean reset" mechanism ReplayButton uses for interactive demos,
 *     just gated by an explicit stopped/running toggle instead of
 *     being one-shot.
 */
const Button = styled.button<{ $bg: string; $color: string }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 28px;
	height: 28px;
	padding: 0;
	border: none;
	border-radius: 6px;
	background: ${({ $bg }) => $bg};
	color: ${({ $color }) => $color};
	cursor: pointer;
	flex-shrink: 0;

	&:hover {
		opacity: 0.85;
	}
`

interface Props {
	bg: string
	color: string
	stopped: boolean
	onToggle: () => void
}

export const StopButton = ({ bg, color, stopped, onToggle }: Props) => (
	<Button
		$bg={bg}
		$color={color}
		onClick={onToggle}
		aria-label={stopped ? 'Start demo animation' : 'Stop demo animation'}
		aria-pressed={stopped}
		type="button"
	>
		{stopped ? <Play16Filled /> : <Pause16Filled />}
	</Button>
)
