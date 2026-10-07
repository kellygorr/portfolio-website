import * as React from 'react'
import {
  useSingleSquareStyles,
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
  /** Pause the CSS animation in its current frame. */
  paused?: boolean
}

export const SingleSquare: React.FC<SingleSquareProps> = ({
  size = 8,
  delay = 1000,
  duration = DURATION_MS,
  color,
  paused = false,
}) => {
  const styles = useSingleSquareStyles()
  const animationName = `singleSquare-${delay}-${duration}`
  const totalMs = totalDuration(delay, duration)
  const keyframesCSS = React.useMemo(() => buildKeyframes(animationName, delay, duration), [animationName, delay, duration])

  return (
    <>
      <style>{keyframesCSS}</style>
      <div style={{ width: size, height: size, color }}>
        <div
          className={styles.container}
          style={{
            '--single-square-cell-size': `${size}px`,
          } as React.CSSProperties}
        >
          <div
            className={styles.square}
            style={{
              animationName,
              animationDuration: `${totalMs}ms`,
              animationPlayState: paused ? 'paused' : undefined,
            }}
          />
        </div>
      </div>
    </>
  )
}
