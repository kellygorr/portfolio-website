import * as React from 'react'
import { useBlocksStyles } from './Blocks.styles'

export interface BlocksProps {
  /** Size of one grid cell in pixels. The component is 3×3 cells. Default: 4
   * Storybook only - remove
   */
  size?: number
  /** Duration of one full animation cycle in ms. Default: 3567 */
  duration?: number
  /** Optional per-block colors (5 values, one per block). Falls back to currentColor if omitted. */
  colors?: [string, string, string, string, string]
}

export const Blocks: React.FC<BlocksProps> = ({ size = 4, duration = 3567, colors }) => {
  const styles = useBlocksStyles()
  // scale animation (for storybook only).  Remove
  const scale = size / 4

  const naturalSize = 4 * 3 // 3×3 grid

  return (
    <div style={{ width: naturalSize * scale, height: naturalSize * scale }}>
      <div
        className={styles.container}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
          '--blocks-duration': `${duration}ms`,
        } as React.CSSProperties}
      >
        <div className={styles.block1} style={colors ? { color: colors[0] } : undefined} />
        <div className={styles.block2} style={colors ? { color: colors[1] } : undefined} />
        <div className={styles.block3} style={colors ? { color: colors[2] } : undefined} />
        <div className={styles.block4} style={colors ? { color: colors[3] } : undefined} />
        <div className={styles.block5} style={colors ? { color: colors[4] } : undefined} />
      </div>
    </div>
  )
}
