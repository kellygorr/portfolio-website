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
  /** Render the settled resting frame (the bar's own 0% keyframe — a
   *  small sliver at the far left, `translateX(0%) scaleX(0.0235)`)
   *  with no animation running and no fade — used by Demo's Stop
   *  control (see DemoMotionContext) so a "stopped" demo shows a static
   *  snapshot instead of nothing. Distinct from `running={false}`,
   *  which fades the whole bar out to invisible rather than showing a
   *  settled frame. */
  isStatic?: boolean
}

const FADE_DURATION = durationsMs.ultraFast

export const ProgressBar: React.FC<ProgressBarProps> = ({
  height = 2,
  duration = BASE_DURATION_MS,
  speedFactor = MS_PER_100PX,
  running = true,
  isStatic = false,
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
        opacity: isStatic || running ? 1 : 0,
        transition: `opacity ${FADE_DURATION}ms linear`,
      }}
    >
      <div ref={containerRef} className={styles.container} style={{ height }}>
        {(isStatic || running) && (
          <div
            className={styles.bar}
            style={
              isStatic
                ? { animation: 'none', transform: 'translateX(0%) scaleX(0.0235)' }
                : ({ '--progress-bar-duration': `${effectiveDuration}ms` } as React.CSSProperties)
            }
          />
        )}
      </div>
    </div>
  )
}
