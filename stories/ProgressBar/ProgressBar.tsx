import * as React from 'react'
import { useProgressBarStyles } from './ProgressBar.styles'
import { durationsMs } from '../../src/styles/motionTokens'

/** Base width where duration equals BASE_DURATION_MS */
const BASE_WIDTH_PX = 2600
/** Duration at the base width */
const BASE_DURATION_MS = 4000
/** Ms added/subtracted per 100px difference from base width */
const MS_PER_100PX = 25

/**
 * Compute animation duration scaled linearly by container width.
 * baseDuration at 2600px, +/- speedFactor ms per 100px difference.
 */
export function computeDuration(width: number, baseDuration: number = BASE_DURATION_MS, speedFactor: number = MS_PER_100PX): number {
  return baseDuration + ((width - BASE_WIDTH_PX) / 100) * speedFactor
}

export interface ProgressBarProps {
  /** Height of the progress bar in pixels. Default: 2
   * **Storybook only**
   */
  height?: number
  /** Base duration in ms at 2600px width. Scales linearly with container width. Default: 4000
   * **Storybook only**
   */
  duration?: number
  /** Ms added/subtracted per 100px of width difference. Default: 25
   * **Storybook only**
   */
  speedFactor?: number
  /** Whether the progress bar is animating. When false, fades out in place. Default: true */
  running?: boolean
  /** Pause the CSS animation in its current frame instead of swapping to the resting frame. */
  paused?: boolean
}

const FADE_DURATION = durationsMs.ultraFast

export const ProgressBar: React.FC<ProgressBarProps> = ({
  height = 2,
  duration = BASE_DURATION_MS,
  speedFactor = MS_PER_100PX,
  running = true,
  paused = false,
}) => {
  const styles = useProgressBarStyles()
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [effectiveDuration, setEffectiveDuration] = React.useState(duration)

  React.useEffect(() => {
    if (!containerRef.current) return

    const el = containerRef.current
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) {
        setEffectiveDuration(computeDuration(width, duration, speedFactor))
      }
    })
    observer.observe(el)

    return () => observer.disconnect()
  }, [duration, speedFactor])

  return (
    <div
      style={{
        opacity: running ? 1 : 0,
        transition: `opacity ${FADE_DURATION}ms linear`,
      }}
    >
      <div ref={containerRef} className={styles.container} style={{ height }}>
        {running && (
          <div
            className={styles.bar}
            style={{
              '--progress-bar-duration': `${effectiveDuration}ms`,
              animationPlayState: paused ? 'paused' : undefined,
            } as React.CSSProperties}
          />
        )}
      </div>
    </div>
  )
}
