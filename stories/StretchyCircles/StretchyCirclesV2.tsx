import { useStretchyCirclesStyles } from './StretchyCirclesV2.styles'

/**
 * Pre-warps a `#rrggbb` color through the INVERSE of the CSS
 * `contrast()` filter math, so that after the real `contrast()` filter
 * (applied to this component's whole wrapper — see the `filter` style
 * below) runs on it, the color that's actually VISIBLE to the viewer
 * matches the color the caller asked for.
 *
 * Why this is needed: `contrast(c)` maps each RGB channel as
 * `(channel - 128) * c + 128`, clamped to 0-255. This component's goo
 * effect needs a large contrast value (13 by default) to push the
 * blurred edges to fully-opaque-or-fully-transparent (that's what
 * makes the merge look "snapped" rather than a soft blob) — but at
 * that magnitude, contrast() also clips almost any non-gray channel
 * straight to 0 or 255. E.g. a theme color like `#e8a668` (warm
 * orange-tan) rendered as pure `#ffff00` (yellow) once filtered — not
 * a subtly-off tint, but an entirely different, essentially random
 * hue, because every channel not already near 128 gets blown out to
 * an extreme. This visibly broke theme-color support (see the
 * "something going on with stretchy circles" bug).
 *
 * The fix: solve the formula backwards — `preWarped = (desired - 128)
 * / c + 128` — and use THAT as the actual CSS background-color. Fed
 * back through the real contrast(c) filter, it reproduces the
 * originally-desired color almost exactly (confirmed empirically
 * against this codebase's actual palette colors — error is only ~1-5
 * per channel from rounding). This only works well for the solid
 * INTERIOR of each shape, where blur has no effect (blurring a
 * constant-color region returns the same constant color) — exactly
 * where it matters, since the blurred EDGES are supposed to look soft/
 * feathered anyway as part of the goo effect, not an exact color match.
 */
const preWarpColorForContrast = (hex: string, contrastValue: number): string => {
  const clean = hex.replace('#', '')
  if (clean.length !== 6) return hex // not a plain #rrggbb color (e.g. already rgba()/named) — leave as-is
  const bigint = parseInt(clean, 16)
  const channels = [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255]
  const preWarp = (channel: number) => Math.max(0, Math.min(255, Math.round((channel - 128) / contrastValue + 128)))
  const [r, g, b] = channels.map(preWarp)
  return `rgb(${r}, ${g}, ${b})`
}

interface StretchyCirclesProps {
  /** Size of the container in pixels */
  size?: number
  /** Blur multiplier (default scales with size) */
  blur?: number
  /** Contrast value for gooey effect */
  contrast?: number
  /** Animation duration in milliseconds */
  duration?: number
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
  /** Pause the CSS animations in their current frame. */
  paused?: boolean
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
  paused = false,
}: StretchyCirclesProps = {}) => {
  const styles = useStretchyCirclesStyles()
  const pausedStyle = paused ? { animationPlayState: 'paused' } : undefined

  // Calculate circle size and positions
  const circleSize = (size * circleDiameter) / 100
  const leftPos = 50 - distance
  const rightPos = 50 + distance
  const bridgeHeightPx = (size * bridgeHeight) / 100

  // Calculate pixel offsets for GPU-accelerated transform animations
  // From center (50%) to target position
  const leftOffsetPx = ((leftPos - 50) / 100) * size
  const rightOffsetPx = ((rightPos - 50) / 100) * size

  const fillColor = preWarpColorForContrast(circleColor, contrast)
  const canvasColor = preWarpColorForContrast(backgroundColor, contrast)

  return (
    <div
      className={styles.wrapper}
      style={{
        width: size,
        height: size,
        filter: `blur(${blur}px) contrast(${contrast})`,
        backgroundColor: canvasColor,
        // @ts-ignore - CSS custom properties for animation
        '--duration': `${duration}ms`,
      }}
    >
      <div className={styles.container} style={pausedStyle}>
        <div
          className={styles.bridge}
          style={{
            width: (size * 24) / 100, // 24% of size to match SVG viewBox proportions
            height: bridgeHeightPx,
            backgroundColor: fillColor,
            // @ts-ignore - CSS custom properties for animation
            '--scale-bridge-height': scaleBridgeHeight / 100,
            ...pausedStyle,
          }}
        />
        <div
          className={styles.obj1}
          style={{
            width: circleSize,
            height: circleSize,
            backgroundColor: fillColor,
            // @ts-ignore - CSS custom properties for animation
            '--left-offset': `${leftOffsetPx}px`,
            ...pausedStyle,
          }}
        />
        <div
          className={styles.obj2}
          style={{
            width: circleSize,
            height: circleSize,
            backgroundColor: fillColor,
            // @ts-ignore - CSS custom properties for animation
            '--right-offset': `${rightOffsetPx}px`,
            ...pausedStyle,
          }}
        />
      </div>
    </div>
  )
}

export type { StretchyCirclesProps }
