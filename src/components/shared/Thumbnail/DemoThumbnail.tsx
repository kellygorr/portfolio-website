import type { ReactNode } from 'react'
import { motionPalette } from '../../../styles/motionPalettes'
import { DemoMotionContext } from '../../Page/DemoMotionContext'
import type { MotionDemoProps } from '../../Page/MotionDemoProps'

/**
 * Shared container for a motion demo embedded as a homepage grid card
 * thumbnail.
 */
export const DemoThumbnail = ({
	theme,
	stopped,
	padding = '0 8px',
	darkBackground,
	children,
}: MotionDemoProps & { id?: string; stopped?: boolean; padding?: number | string; darkBackground?: boolean; children: ReactNode }) => {
	const palette = motionPalette(theme)

	return (
		<div
			style={{
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100%',
				padding,
				boxSizing: 'border-box',
				background: darkBackground ? palette.backgroundDark : palette.background,
			}}
		>
			<DemoMotionContext.Provider value={{ stopped: Boolean(stopped), replayToken: 0 }}>
				<div style={{ display: 'contents' }}>
					{children}
				</div>
			</DemoMotionContext.Provider>
		</div>
	)
}
