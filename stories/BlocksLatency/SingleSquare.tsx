import * as React from 'react'
import {
  useSingleSquareStyles,
  SINGLE_SQUARE_CELL,
  DURATION_MS,
  buildKeyframes,
  totalDuration,
} from './SingleSquare.styles'

export interface SingleSquareProps {
  /** Size of the square in pixels. Default: 8 */
  size?: number
  /** Start-hold delay in ms. Default: 1000 */
  delay?: number
  /** Animation duration in ms. Default: 1166 */
  duration?: number
  /** Optional solid color for the square. Falls back to currentColor if omitted. */
  color?: string
  /** Render the settled resting frame (upright, 0deg — its own 0%
   *  keyframe) with no animation running — used by Demo's Stop control
   *  (see DemoMotionContext) so a "stopped" demo shows a static
   *  snapshot instead of a blank/frozen-mid-cycle box. Skips generating
   *  and injecting the per-instance @keyframes entirely, not just
   *  disabling playback. */
  isStatic?: boolean
}

export const SingleSquare: React.FC<SingleSquareProps> = ({
  size = 8,
  delay = 1000,
  duration = DURATION_MS,
  color,
  isStatic = false,
}) => {
  const styles = useSingleSquareStyles()
  const scale = size / SINGLE_SQUARE_CELL
  const animationName = `singleSquare-${delay}-${duration}`
  const totalMs = totalDuration(delay, duration)
  const keyframesCSS = React.useMemo(() => buildKeyframes(animationName, delay, duration), [animationName, delay, duration])

  return (
    <>
      {!isStatic && <style>{keyframesCSS}</style>}
      <div style={{ width: SINGLE_SQUARE_CELL * scale, height: SINGLE_SQUARE_CELL * scale, color }}>
        <div
          className={styles.container}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
          }}
        >
          <div
            className={styles.square}
            style={
              isStatic
                ? { animation: 'none', transform: 'rotate(0deg)' }
                : {
                    animationName,
                    animationDuration: `${totalMs}ms`,
                  }
            }
          />
        </div>
      </div>
    </>
  )
}
