import styled from 'styled-components'
import { darkestColor, motionPalette } from '../../styles/motionPalettes'
import { RecreatedBadge } from './RecreatedBadge'
import { InteractiveBadge } from './InteractiveBadge'
import { StopButton } from './StopButton'
import type { MotionDemoProps } from './MotionDemoProps'

/**
 * Shared in-flow header row for Demo and DemoSlide — the single place
 * that owns building the RecreatedBadge / InteractiveBadge / StopButton
 * row as real layout (a flex row that pushes content below it, instead
 * of each badge/button being individually `position: absolute` and
 * content having to reserve manual clearance to avoid overlapping
 * them). Demo and DemoSlide just turn pieces on/off via props — they no
 * longer build their own custom `start`/`end` JSX trees; DemoHeader
 * does that internally from `theme` + the flags below.
 *
 * `hasHeader` controls whether the row is a real solid header bar:
 *   - true (e.g. DemoSlide) — solid background behind the row, and the
 *     row's own vertical padding collapses to 0 so the bar's height is
 *     exactly the badges'/buttons' own height (their internal padding
 *     already provides the spacing). The background matches the
 *     badges' own background color on purpose — badges become
 *     invisible/seamless against the bar, reading as plain text sitting
 *     directly on the header instead of separate pill shapes.
 *   - false (e.g. Demo, whose row sits on the demo's own page
 *     background with nothing behind it that needs separating) — stays
 *     transparent, keeps its normal vertical padding so the badges read
 *     as floating pills with breathing room around them.
 *
 * `hideBadge` — hides RecreatedBadge (the "recreated for portfolio"
 * label). Rarely used; exists for demos that already show that
 * disclosure some other way.
 *
 * `showPausePlay` — shows StopButton (stop/start toggle for autoplay
 * demos). Requires `stopped` + `onToggleStop`.
 *
 * `showClickToInteract` — shows InteractiveBadge (the merged "Click
 * below to interact" label + restart icon). Requires `running` +
 * `onRestart`. Mutually exclusive with showPausePlay in practice (a
 * demo is either autoplay-with-pause or interactive-with-restart, never
 * both), but DemoHeader doesn't enforce that — the caller decides.
 *
 * `hideRestartIcon` — only relevant with showClickToInteract: hides the
 * restart icon, leaving just the label. For demos that already run
 * their own ongoing/restartable interaction (e.g. DAB's Intro/Thinking
 * toggle buttons) and don't need Demo's separate auto-play-once/restart
 * mechanism layered on top.
 */
interface DemoHeaderProps extends MotionDemoProps {
	hasHeader?: boolean
	hideBadge?: boolean
	showPausePlay?: boolean
	stopped?: boolean
	onToggleStop?: () => void
	showClickToInteract?: boolean
	hideRestartIcon?: boolean
	running?: boolean
	onRestart?: () => void
}

const Header = styled.div<{ $hasHeader?: boolean; $bg?: string }>`
	position: relative;
	z-index: 1;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 8px;
	padding: ${({ $hasHeader }) => ($hasHeader ? '0 16px' : '16px')};
	${({ $hasHeader, $bg }) => $hasHeader && `background: ${$bg};`}
`

const HeaderStart = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	min-width: 0;
`

const HeaderEnd = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	flex-shrink: 0;
`

export const DemoHeader = ({
	theme,
	hasHeader,
	hideBadge,
	showPausePlay,
	stopped = false,
	onToggleStop,
	showClickToInteract,
	hideRestartIcon,
	running = false,
	onRestart,
}: DemoHeaderProps) => {
	const palette = motionPalette(theme)
	const bg = darkestColor(palette)
	const color = palette.text

	return (
		<Header $hasHeader={hasHeader} $bg={bg}>
			<HeaderStart>{!hideBadge && <RecreatedBadge bg={bg} color={color} />}</HeaderStart>
			<HeaderEnd>
				{showClickToInteract && onRestart && (
					<InteractiveBadge bg={bg} color={color} running={running} onToggle={onRestart} hideRestart={hideRestartIcon} />
				)}
				{showPausePlay && onToggleStop && (
					<StopButton bg={bg} color={color} stopped={stopped} onToggle={onToggleStop} />
				)}
			</HeaderEnd>
		</Header>
	)
}
