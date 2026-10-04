import * as React from 'react'
import { useMiniLoaderStyles, MINI_LOADER_CELL } from './MiniLoader.styles'

export interface MiniLoaderProps {
  /** Size of each block in pixels. Default: 80 */
  size?: number
  /** Duration of one full animation cycle in ms. Default: 5117 */
  duration?: number
  /** Color shown on the single rolling block — while it's kicking,
   *  actively rolling, or holding at the far end. Falls back to
   *  currentColor if omitted. */
  rollerColor?: string
  /** Colors for the 3 dropped/picked-up boxes left behind at slots
   *  [0, 1, 2] as the roller passes through and picks back up on its
   *  way back. Falls back to currentColor if omitted. */
  trackColors?: [string, string, string]
  /** Pause all CSS animations in their current frame. */
  paused?: boolean
}

export const MiniLoader: React.FC<MiniLoaderProps> = ({ size = 80, duration = 5117, rollerColor, trackColors, paused = false }) => {
  const styles = useMiniLoaderStyles()
  // scale animation (for storybook only).  Remove
  const scale = size / MINI_LOADER_CELL
  const naturalWidth = MINI_LOADER_CELL * 4 + 25 * 3 // 4 cells + 3 gaps
  const naturalHeight = MINI_LOADER_CELL

  return (
    <div style={{ width: naturalWidth * scale, height: naturalHeight * scale }}>
    <div
      className={styles.container}
      style={
        {
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
          // duration animation (for storybook only).  Remove
          '--mini-loader-duration': `${duration}ms`,
          '--roller-color': rollerColor,
          '--track-color-1': trackColors?.[0],
          '--track-color-2': trackColors?.[1],
          '--track-color-3': trackColors?.[2],
        } as React.CSSProperties
      }
    >
      <div className={styles.dropped0} style={paused ? { animationPlayState: 'paused' } : undefined} />
      <div className={styles.dropped1} style={paused ? { animationPlayState: 'paused' } : undefined} />
      <div className={styles.dropped2} style={paused ? { animationPlayState: 'paused' } : undefined} />
      <div className={styles.block} style={paused ? { animationPlayState: 'paused' } : undefined} />
    </div>
    </div>
  )
}
