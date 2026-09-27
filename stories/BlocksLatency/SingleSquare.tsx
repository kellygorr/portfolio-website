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
}

export const SingleSquare: React.FC<SingleSquareProps> = ({ size = 8, delay = 1000, duration = DURATION_MS }) => {
  const styles = useSingleSquareStyles()
  const scale = size / SINGLE_SQUARE_CELL
  const animationName = `singleSquare-${delay}-${duration}`
  const totalMs = totalDuration(delay, duration)
  const keyframesCSS = React.useMemo(() => buildKeyframes(animationName, delay, duration), [animationName, delay, duration])

  return (
    <>
      <style>{keyframesCSS}</style>
      <div style={{ width: SINGLE_SQUARE_CELL * scale, height: SINGLE_SQUARE_CELL * scale }}>
        <div
          className={styles.container}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
          }}
        >
          <div
            className={styles.square}
            style={{
              animationName,
              animationDuration: `${totalMs}ms`,
            }}
          />
        </div>
      </div>
    </>
  )
}
