import { useState, type ReactNode } from 'react'
import { darkestColor, motionPalette } from '../../../styles/motionPalettes'
import { StopButton } from '../../Page/StopButton'
import { DemoMotionContext } from '../../Page/DemoMotionContext'
import { useMediaQuery } from '../hooks/useMediaQuery'
import type { MotionDemoProps } from '../../Page/MotionDemoProps'
import { getStoredStopped, setStoredStopped } from './demoThumbnailStoppedStore'

/**
 * Shared container for a motion demo embedded as a homepage grid card
 * thumbnail. Gets the same Stop/Start control as Demo's autoplay demos,
 * positioned absolute in the corner since thumbnails have no header row.
 *
 * `id` (project's unique header, from Thumbnail.tsx) persists the
 * stop/start toggle to localStorage via demoThumbnailStoppedStore.
 */
export const DemoThumbnail = ({
	theme,
	id,
	children,
}: MotionDemoProps & { id?: string; children: ReactNode }) => {
	const palette = motionPalette(theme)
	const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
	const [stopped, setStopped] = useState(() => (id ? (getStoredStopped(id) ?? prefersReducedMotion) : prefersReducedMotion))

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
					// Keep click local — card is wrapped in a link.
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
							if (id) {
								setStoredStopped(id, next)
							}
							return next
						})
					}}
				/>
			</div>
			<DemoMotionContext.Provider value={{ stopped, replayToken: 0 }}>
				<div style={{ display: 'contents' }}>
					{children}
				</div>
			</DemoMotionContext.Provider>
		</div>
	)
}
