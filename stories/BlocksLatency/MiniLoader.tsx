import * as React from 'react'
import { useMiniLoaderStyles, MINI_LOADER_CELL } from './MiniLoader.styles'

export interface MiniLoaderProps {
  /** Size of each block in pixels. Default: 80 */
  size?: number
  /** Duration of one full animation cycle in ms. Default: 5117 */
  duration?: number
}

export const MiniLoader: React.FC<MiniLoaderProps> = ({ size = 80, duration = 5117 }) => {
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
        } as React.CSSProperties
      }
    >
      <div className={styles.block1Kick}>
        <div className={styles.block1} />
      </div>
      <div className={styles.block2} />
      <div className={styles.block3} />
      <div className={styles.block4Kick}>
        <div className={styles.block4} />
      </div>
    </div>
    </div>
  )
}
