import { useStretchyCirclesStyles } from './StretchyCirclesV2.styles'

interface StretchyCirclesProps {
  /** Size of the container in pixels */
  size?: number
  /** Blur multiplier (default scales with size) */
  blur?: number
  /** Contrast value for gooey effect */
  contrast?: number
  /** Animation duration in milliseconds */
  duration?: number
  /** Background color of container */
  backgroundColor?: string
  /** Color of the circles */
  circleColor?: string
  /** Circle diameter as percentage of container size (0-100) */
  circleDiameter?: number
  /** Distance between circles as percentage (0-50) */
  distance?: number
  /** Height of the bridge rectangle as percentage */
  bridgeHeight?: number
  /** Maximum scale for bridge height during animation (percentage, e.g., 300 = 300%) */
  scaleBridgeHeight?: number
}

export const StretchyCircles = ({
  size = 50,
  blur = 2,
  contrast = 13,
  duration = 1200,
  backgroundColor = '#fff',
  circleColor = '#000',
  circleDiameter = 41,
  distance = 25,
  bridgeHeight = 13,
  scaleBridgeHeight = 300,
}: StretchyCirclesProps = {}) => {
  const styles = useStretchyCirclesStyles()

  // Calculate circle size and positions
  const circleSize = (size * circleDiameter) / 100
  const leftPos = 50 - distance
  const rightPos = 50 + distance
  const bridgeHeightPx = (size * bridgeHeight) / 100

  // Calculate pixel offsets for GPU-accelerated transform animations
  // From center (50%) to target position
  const leftOffsetPx = ((leftPos - 50) / 100) * size
  const rightOffsetPx = ((rightPos - 50) / 100) * size

  return (
    <div
      className={styles.wrapper}
      style={{
        width: size,
        height: size,
        filter: `blur(${blur}px) contrast(${contrast})`,
        backgroundColor,
        // @ts-ignore - CSS custom properties for animation
        '--duration': `${duration}ms`,
      }}
    >
      <div className={styles.container}>
        <div
          className={styles.bridge}
          style={{
            width: (size * 24) / 100, // 24% of size to match SVG viewBox proportions
            height: bridgeHeightPx,
            backgroundColor: circleColor,
            // @ts-ignore - CSS custom properties for animation
            '--scale-bridge-height': scaleBridgeHeight / 100,
          }}
        />
        <div
          className={styles.obj1}
          style={{
            width: circleSize,
            height: circleSize,
            backgroundColor: circleColor,
            // @ts-ignore - CSS custom properties for animation
            '--left-offset': `${leftOffsetPx}px`,
          }}
        />
        <div
          className={styles.obj2}
          style={{
            width: circleSize,
            height: circleSize,
            backgroundColor: circleColor,
            // @ts-ignore - CSS custom properties for animation
            '--right-offset': `${rightOffsetPx}px`,
          }}
        />
      </div>
    </div>
  )
}

export type { StretchyCirclesProps }
