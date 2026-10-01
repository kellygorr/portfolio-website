import { useState, type ReactNode } from 'react'
import { darkestColor, motionPalette } from '../../../styles/motionPalettes'
import { StopButton } from '../../Page/StopButton'
import { DemoMotionContext } from '../../Page/DemoMotionContext'
import { useMediaQuery } from '../hooks/useMediaQuery'
import type { MotionDemoProps } from '../../Page/MotionDemoProps'

/**
 * Shared container for a motion demo embedded as a homepage grid card
 * thumbnail (via IThumbnail.demo — see Thumbnail.tsx's DemoSlot). No
 * "recreated for portfolio" badge here — the badge is for full
 * case-study content, not a small homepage preview card. Just fills its
 * slot at 100% width / 100% height, background matched to the theme.
 *
 * Gets the same Stop/Start control as Demo's autoplay demos (same
 * StopButton, same DemoMotionContext `stopped`/mount-key remount
 * mechanism — see Demo.tsx's docstring for why remount instead of
 * pause/resume-in-place) — just positioned absolute in the corner
 * instead of living in an in-flow DemoHeader, since these small
 * thumbnail cards don't have a header row at all. The whole card is
 * wrapped in a link (Thumbnail.tsx navigates to the project page on
 * click), so the button stops propagation/prevents default — otherwise
 * clicking Stop would also navigate away.
 *
 * StopButton's bg/color use `darkestColor(palette)` + `palette.text`,
 * the same theming DemoHeader.tsx uses for its own StopButton — so each
 * thumbnail's pause chip is colored with that card's own randomly
 * assigned motion palette (Warm Sand, Golden Hour, Dusty Rose, etc.)
 * instead of one generic translucent black/white shared by every card
 * regardless of theme.
 */
export const DemoThumbnail = ({ theme, children }: MotionDemoProps & { children: ReactNode }) => {
	const palette = motionPalette(theme)
	const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
	const [stopped, setStopped] = useState(prefersReducedMotion)
	const [mountKey, setMountKey] = useState(0)

	return (
		<div
			style={{
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100%',
				background: palette.background,
			}}
		>
			<div
				style={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
				onClick={(e) => {
					// Keep the click local to the button — this card is wrapped
					// in a link (Thumbnail.tsx), and without this, toggling
					// Stop/Start would also navigate to the project page.
					e.stopPropagation()
					e.preventDefault()
				}}
			>
				<StopButton
					bg={darkestColor(palette)}
					color={palette.text}
					stopped={stopped}
					onToggle={() => {
						setStopped((prev) => {
							const next = !prev
							if (prev && !next) setMountKey((k) => k + 1)
							return next
						})
					}}
				/>
			</div>
			<DemoMotionContext.Provider value={{ stopped, replayToken: 0 }}>
				<div key={mountKey} style={{ display: 'contents' }}>
					{children}
				</div>
			</DemoMotionContext.Provider>
		</div>
	)
}
