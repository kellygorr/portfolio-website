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
  /** Background color of the goo "canvas". Defaults to (and should
   *  normally stay) `transparent` — `contrast()` only affects RGB
   *  channels, not alpha, so the blurred circles' own alpha falloff at
   *  their edges is what drives the snap-together goo look; no opaque
   *  backdrop is needed for it to work. An opaque color CAN be passed
   *  (e.g. to preview the effect against a different page background
   *  outside Storybook), but be aware `contrast()` crunches almost any
   *  near-white/near-black color to a literal solid white/black
   *  extreme (e.g. a cream `#f7f2e3` still renders as pure `#ffffff`
   *  at this component's default contrast value) — so a subtly-tinted
   *  "theme match" color will usually have no visible effect and will
   *  likely show as a plain, surrounding-mismatched box instead. */
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
  /** Render the settled resting frame (two separate circles, no bridge
   *  connection) with no animation running — used by Demo's Stop
   *  control (see DemoMotionContext). Unlike the SVG (V1) version,
   *  obj1/obj2 here have NO base transform outside their animation (only
   *  `top: 50%, left: 50%`, with the centering `translate3d(-50%, -50%,
   *  0)` supplied entirely by the 0%/100% keyframes) — so simply
   *  removing the animation would leave them visibly offset by half
   *  their own size (shifted down-right), not actually at the resting
   *  position. isStatic therefore also supplies that same transform
   *  explicitly inline. The bridge's own base CSS already includes its
   *  resting `translate(-50%, -50%)` as a literal (non-animated)
   *  property, so it only needs the animation disabled, same as the
   *  container (whose resting `rotate(0deg)` is the CSS default with no
   *  transform at all). */
  isStatic?: boolean
}

export const StretchyCircles = ({
  size = 50,
  blur = 2,
  contrast = 13,
  duration = 1200,
  backgroundColor = 'transparent',
  circleColor = '#000',
  circleDiameter = 41,
  distance = 25,
  bridgeHeight = 13,
  scaleBridgeHeight = 300,
  isStatic = false,
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
      <div className={styles.container} style={isStatic ? { animation: 'none' } : undefined}>
        <div
          className={styles.bridge}
          style={{
            width: (size * 24) / 100, // 24% of size to match SVG viewBox proportions
            height: bridgeHeightPx,
            backgroundColor: circleColor,
            // @ts-ignore - CSS custom properties for animation
            '--scale-bridge-height': scaleBridgeHeight / 100,
            ...(isStatic ? { animation: 'none' } : undefined),
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
            ...(isStatic ? { animation: 'none', transform: 'translate3d(-50%, -50%, 0)' } : undefined),
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
            ...(isStatic ? { animation: 'none', transform: 'translate3d(-50%, -50%, 0)' } : undefined),
          }}
        />
      </div>
    </div>
  )
}

export type { StretchyCirclesProps }
