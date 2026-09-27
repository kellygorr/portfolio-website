import { mergeClasses } from '@fluentui/react-components'
import { useId } from 'react'
import { useStretchyCirclesStyles } from './StretchyCirclesV1.styles'

interface StretchyCirclesProps {
  /** Size of the SVG container in pixels */
  size?: number
  /** Animation duration in milliseconds */
  duration?: number
  /** Diameter of the circles */
  circleDiameter?: number
  /** Distance the circles travel apart (% of viewBox) */
  distance?: number
  /** Height of the bridge rectangle */
  bridgeHeight?: number
  /** Maximum scale for bridge height during animation (percentage, e.g., 225 = 225%) */
  scaleBridgeHeight?: number
  /** Solid color (used when no gradient is specified) */
  color?: string
  /** Optional gradient in CSS syntax (e.g., 'linear-gradient(90deg, #ff4081 0%, #5940ff 100%)') */
  gradient?: string
  /** Blur amount for the stretchy effect */
  blur?: number
  /** Intensity/strength of the stretchy effect */
  intensity?: number
  /** Crispness of the stretchy effect (higher = crisper edges) */
  crispness?: number
}

export const StretchyCircles = ({
  size = 300,
  duration = 1200,
  circleDiameter = 48,
  distance = 30,
  bridgeHeight = 14,
  scaleBridgeHeight = 300,
  color = '#ff4081',
  gradient,
  blur = 6,
  intensity = 24,
  crispness = 15,
}: StretchyCirclesProps = {}) => {
  const styles = useStretchyCirclesStyles()
  const id = useId()
  const circleRadius = circleDiameter / 2
  const bridgeY = 50 - bridgeHeight / 2

  // Parse gradient if provided
  let fillColor = color
  let gradientDef = null

  if (gradient) {
    // Parse CSS gradient syntax: linear-gradient(angle, color1 offset, color2 offset)
    const match = gradient.match(
      /linear-gradient\(([^,]+),\s*([^\s]+)\s+([^,]+),\s*([^\s]+)\s+([^)]+)\)/
    )
    if (match) {
      const [, angleStr, color1, offset1, color2, offset2] = match
      const angle = parseFloat(angleStr)
      const radians = (angle * Math.PI) / 180
      const x2 = Math.cos(radians)
      const y2 = Math.sin(radians)

      gradientDef = (
        <linearGradient id={`stretchyGradient-${id}`} x1="0" y1="0" x2={x2} y2={y2}>
          <stop offset={offset1} stopColor={color1} />
          <stop offset={offset2} stopColor={color2} />
        </linearGradient>
      )
      fillColor = `url(#stretchyGradient-${id})`
    }
  }

  return (
    <svg
      className={styles.svg}
      style={
        {
          width: size,
          height: size,
          '--duration': `${duration}ms`,
          '--distance': `${distance}px`,
          '--scale-bridge-height': scaleBridgeHeight / 100,
        } as React.CSSProperties
      }
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {gradientDef}
        <filter id={`stretchy-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${intensity} -${crispness}`}
            result="stretchy"
          />
          <feComposite in="SourceGraphic" in2="stretchy" operator="atop" />
        </filter>
        <mask id={`stretchyMask-${id}`}>
          <g filter={`url(#stretchy-${id})`}>
            <g className={styles.container}>
              <rect
                className={styles.bridge}
                x="38"
                y={bridgeY}
                width="24"
                height={bridgeHeight}
                rx="9"
                fill="white"
              />
              <circle
                className={mergeClasses(styles.ball, styles.left)}
                cx="50"
                cy="50"
                r={circleRadius}
                fill="white"
              />
              <circle
                className={mergeClasses(styles.ball, styles.right)}
                cx="50"
                cy="50"
                r={circleRadius}
                fill="white"
              />
            </g>
          </g>
        </mask>
      </defs>

      <rect
        x="-50"
        y="-50"
        width="200"
        height="200"
        fill={fillColor}
        mask={`url(#stretchyMask-${id})`}
      />
    </svg>
  )
}

export type { StretchyCirclesProps }
