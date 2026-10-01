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
  /** Render the settled resting frame with no animation running — used
   *  by Demo's Stop control (see DemoMotionContext) so a "stopped" demo
   *  shows a static snapshot instead of a blank/frozen-mid-cycle box.
   *  Every block's own 0% keyframe is already `translate(0, 0)` (its
   *  plain CSS position), so this only needs to disable the animation
   *  itself, not compute or override any transform. */
  isStatic?: boolean
}

export const Blocks: React.FC<BlocksProps> = ({ size = 4, duration = 3567, colors, isStatic = false }) => {
  const styles = useBlocksStyles()
  // scale animation (for storybook only).  Remove
  const scale = size / 4

  const naturalSize = 4 * 3 // 3×3 grid
  const staticStyle: React.CSSProperties | undefined = isStatic ? { animation: 'none' } : undefined

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
        <div className={styles.block1} style={{ ...(colors ? { color: colors[0] } : undefined), ...staticStyle }} />
        <div className={styles.block2} style={{ ...(colors ? { color: colors[2] } : undefined), ...staticStyle }} />
        {/* Blocks 3 and 5 use colors[3] and block 4 uses colors[1] — swapped
            from the palette's own light-to-dark token order so this
            animation keeps its original color arrangement (block3/block5
            get the palette's 4th/darker token, block4 gets the 3rd). */}
        <div className={styles.block3} style={{ ...(colors ? { color: colors[3] } : undefined), ...staticStyle }} />
        <div className={styles.block4} style={{ ...(colors ? { color: colors[1] } : undefined), ...staticStyle }} />
        <div className={styles.block5} style={{ ...(colors ? { color: colors[3] } : undefined), ...staticStyle }} />
      </div>
    </div>
  )
}
