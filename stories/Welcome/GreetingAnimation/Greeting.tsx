import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components'
import { useMemo } from 'react'

export const CHARACTER_ANIMATION_DURATION_MS = 150
const CHARACTER_ANIMATION_TOTAL_DURATION_MS = 500
const CHARACTER_STAGGER_MS = 30

/**
 * Inverse of cubic-bezier: given a y (progress), returns x (time).
 * The curve (0.33, 0, 0.1, 1) maps time→progress (fast start, evens out).
 * The inverse maps character progress→time (delay).
 */
function cubicBezierInverse(x1: number, y1: number, x2: number, y2: number, progress: number): number {
  if (progress <= 0) return 0
  if (progress >= 1) return 1

  // Find bezier parameter s where bezierY(s) = progress
  let lo = 0
  let hi = 1
  for (let i = 0; i < 20; i++) {
    const s = (lo + hi) / 2
    const by = 3 * (1 - s) * (1 - s) * s * y1 + 3 * (1 - s) * s * s * y2 + s * s * s
    if (by < progress) lo = s
    else hi = s
  }
  const s = (lo + hi) / 2
  // Return the x value at that parameter
  return 3 * (1 - s) * (1 - s) * s * x1 + 3 * (1 - s) * s * s * x2 + s * s * s
}

const DEFAULT_STAGGER_CURVE = '0.33, 0, 0.1, 1'
const DEFAULT_CHARACTER_EASING = '0, 0, 0, 1'

function parseStaggerCurve(curve: string): [number, number, number, number] | null {
  const parts = curve.split(',').map((s) => parseFloat(s.trim()))
  if (parts.length === 4 && parts.every((n) => !isNaN(n))) {
    return parts as [number, number, number, number]
  }
  return null
}

export interface GreetingProps {
  /** The text to animate character by character */
  text?: string
  /** Duration of the scale animation per character (ms) */
  duration?: number
  /** Cubic-bezier easing for each character's animation, e.g. "0, 0, 0, 1" */
  characterEasing?: string
  /** Total duration across all characters for stagger distribution (ms) */
  totalDuration?: number
  /** Stagger delay between each character (ms) */
  stagger?: number
  /** Enable curved stagger timing */
  useStaggerCurve?: boolean
  /** Cubic-bezier curve for stagger timing, e.g. "0.33, 0, 0.1, 1" */
  staggerCurve?: string
}

const useStyles = makeStyles({
  container: {
    display: 'inline',
    fontFamily: '"Segoe UI", "Segoe UI Variable", sans-serif',
    fontSize: tokens.fontSizeHero700,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightHero800,
    color: tokens.colorNeutralForeground4,
    whiteSpace: 'normal',
  },
  characterAnimation: {
    animationName: [
      {
        '0%': { transform: 'scale(0.75)' },
        '100%': { transform: 'scale(1)' },
      },
      {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    ],
    animationDuration: `${CHARACTER_ANIMATION_DURATION_MS}ms, 30ms`,
    animationTimingFunction: `cubic-bezier(${DEFAULT_CHARACTER_EASING}), linear`,
    animationFillMode: 'both, both',
    '@media (prefers-reduced-motion: reduce)': {
      animationName: 'none',
      opacity: 1,
      transform: 'scale(1)',
    },
  },
  characterSpan: {
    display: 'inline-block',
    transformOrigin: 'left',
    ':global([dir="rtl"]) &': {
      transformOrigin: 'right',
    },
  },
})

export const Greeting = ({
  text = 'Welcome back!',
  duration = CHARACTER_ANIMATION_DURATION_MS,
  characterEasing = DEFAULT_CHARACTER_EASING,
  totalDuration = CHARACTER_ANIMATION_TOTAL_DURATION_MS,
  stagger = CHARACTER_STAGGER_MS,
  useStaggerCurve = true,
  staggerCurve = DEFAULT_STAGGER_CURVE,
}: GreetingProps) => {
  const styles = useStyles()

  const characters = useMemo(() => {
    const chars: { char: string; delay: number }[] = []
    const nonSpaceCount = [...text].filter((c) => c !== ' ').length

    let charIndex = 0
    for (const char of text) {
      if (char === ' ') {
        chars.push({ char: ' ', delay: 0 })
      } else {
        let delay: number
        const curveValues = useStaggerCurve && staggerCurve ? parseStaggerCurve(staggerCurve) : null
        if (nonSpaceCount > 1 && curveValues) {
          const t = charIndex / (nonSpaceCount - 1)
          delay = cubicBezierInverse(...curveValues, t) * totalDuration
        } else if (nonSpaceCount > 1) {
          delay = charIndex * (totalDuration / (nonSpaceCount - 1))
        } else {
          delay = charIndex * stagger
        }
        chars.push({ char, delay })
        charIndex++
      }
    }
    return chars
  }, [text, totalDuration, stagger, staggerCurve])

  return (
    <span className={styles.container} aria-label={text} role="text">
      {characters.map((c, i) =>
        c.char === ' ' ? (
          <span key={i}>{'\u00A0'}</span>
        ) : (
          <span
            key={i}
            className={mergeClasses(styles.characterSpan, styles.characterAnimation)}
            aria-hidden="true"
            style={{
              animationDelay: `${c.delay}ms, ${c.delay}ms`,
              animationDuration: `${duration}ms, 30ms`,
              animationTimingFunction: `cubic-bezier(${characterEasing}), linear`,
            }}
          >
            {c.char}
          </span>
        )
      )}
    </span>
  )
}
