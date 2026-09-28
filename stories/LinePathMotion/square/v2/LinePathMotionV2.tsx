import { useId, useMemo } from 'react'
import './LinePathMotionV2.css'

/*
 * ─────────────────────────────────────────────────────────────────
 * NOTE: Storybook-driven runtime CSS keyframe generation
 * ─────────────────────────────────────────────────────────────────
 * A large portion of this file exists so Storybook controls can
 * re-derive the animation live as the user drags sliders for
 * `duration` and `feather`. Specifically:
 *
 *   • the bezier helpers (makeBezier, headCurve, tailCurve,
 *     headAngleAt, tailAngleAt)
 *   • the buildKeyframes() function
 *   • the useMemo + injected <style> tag inside the component
 *
 * In a production usage where `duration` and `feather` are fixed,
 * this entire pipeline can be replaced with a single static
 * @keyframes block precomputed and pasted into LinePathMotionV2.css.
 * The remaining props (size, color, strokeWidth) are applied via
 * inline style + CSS variables and do NOT require keyframe
 * regeneration.
 *
 * Look for `[STORYBOOK]` markers below for the specific spots.
 * ─────────────────────────────────────────────────────────────────
 */

interface LinePathMotionV2Props {
  /** Size of the container (px). The shape is square. */
  size?: number
  /**
   * Sweep duration in ms — time from snake start to tail finish.
   * A fixed `PAUSE_MS` is added after each sweep before the next
   * cycle begins.
   */
  duration?: number
  /** Border (stroke) thickness in px. */
  strokeWidth?: number
  /** Line color (any CSS color value). */
  color?: string
  /** Softness of the snake's trailing edge, in px. */
  feather?: number
}

// Defaults derived from the designer's Lottie spec
// (Icon Marker isolated_001):
//   - 70 px square, 4 px stroke, #707070
//   - sweep ~1500ms (frames 47 → 137 at 60fps)
//   - long pause (~4.8s) between sweeps in source; we use 1s here
// Corner radius ratio matches the Rectangle (V3) component's own ratio
// (0.2 × min(width, height)) instead of the Lottie source's 4/70 ratio,
// so the Square and Rectangle demos read as consistently rounded.
const DEFAULT_COLOR = '#707070'
const PAUSE_MS = 1000
const CORNER_RADIUS_RATIO = 0.2

// CSS-conic angles (12 o'clock = 0°, clockwise). The Lottie
// rounded-rect path starts at the top of the right edge, just
// past the top-right corner curve, going clockwise. For a 70×70
// rect with r=4 that point is (35, -31), giving an angle of
// atan2(35, 31) ≈ 48.45° from 12 o'clock. The head then travels
// 360° and ends 45° further (the trim "offset" property in the
// source animates 0° → 45° = 0 → 12.5% of perimeter).
const START_ANGLE_DEG = 48.45
const HEAD_DRIFT_DEG = 45
const END_ANGLE_DEG = START_ANGLE_DEG + HEAD_DRIFT_DEG
const HEAD_MAX_DEG = END_ANGLE_DEG + 360

// Sweep timeline (fractions of `duration`). Mapped from the Lottie
// keyframes normalized to the activity window [frame 47, frame 137]:
//   head:   t = 0.00 → 0.90    (frames 47 → 128)
//   tail:   t = 0.10 → 1.00    (frames 56 → 137)
const TAIL_START_FRACTION = 0.1
const HEAD_END_FRACTION = 0.9
const TAIL_END_FRACTION = 1.0

// Cubic-bezier easings copied verbatim from the Lottie keyframes.
//   head e (end-of-trim):  in (0.4, 0)   out (0.206, 1)
//   tail s (start-of-trim): in (0.51, 0) out (0.318, 1)
const HEAD_TIMING: [number, number, number, number] = [0.4, 0, 0.206, 1]
const TAIL_TIMING: [number, number, number, number] = [0.51, 0, 0.318, 1]

/** Visible snake length cap. Geometry maxes at 180°; kept smaller so
 * the snake reads as a short segment, not a long arc. */
const MAX_SNAKE_DEG = 90

/**
 * Number of sampled keyframes per sweep. Both rotators share the
 * sampling so the visible head/tail trace the intended curves at
 * sample points and tween linearly between them.
 */
const SAMPLE_COUNT = 32

// [STORYBOOK] The bezier helpers below feed buildKeyframes() so that
// `duration`/`feather` changes can re-emit keyframes at runtime.
// In production with fixed params they'd only need to run once at
// build time to produce a static CSS string.

/** CSS cubic-bezier evaluator. Returns y at the given x in [0, 1]. */
const makeBezier = (x1: number, y1: number, x2: number, y2: number) => {
  const ax = 3 * x1 - 3 * x2 + 1
  const bx = -6 * x1 + 3 * x2
  const cx = 3 * x1
  const ay = 3 * y1 - 3 * y2 + 1
  const by = -6 * y1 + 3 * y2
  const cy = 3 * y1
  return (t: number): number => {
    if (t <= 0) return 0
    if (t >= 1) return 1
    let s = t
    for (let i = 0; i < 8; i++) {
      const x = ((ax * s + bx) * s + cx) * s - t
      if (Math.abs(x) < 1e-6) break
      const dx = (3 * ax * s + 2 * bx) * s + cx
      if (Math.abs(dx) < 1e-6) break
      s -= x / dx
    }
    return ((ay * s + by) * s + cy) * s
  }
}

const headCurve = makeBezier(...HEAD_TIMING)
const tailCurve = makeBezier(...TAIL_TIMING)

const headAngleAt = (sweepT: number): number => {
  if (sweepT <= 0) return START_ANGLE_DEG
  if (sweepT >= HEAD_END_FRACTION) return HEAD_MAX_DEG
  const p = sweepT / HEAD_END_FRACTION
  return START_ANGLE_DEG + (HEAD_MAX_DEG - START_ANGLE_DEG) * headCurve(p)
}

const tailAngleAt = (sweepT: number): number => {
  if (sweepT <= TAIL_START_FRACTION) return START_ANGLE_DEG
  if (sweepT >= TAIL_END_FRACTION) return HEAD_MAX_DEG
  const p = (sweepT - TAIL_START_FRACTION) / (TAIL_END_FRACTION - TAIL_START_FRACTION)
  return START_ANGLE_DEG + (HEAD_MAX_DEG - START_ANGLE_DEG) * tailCurve(p)
}

// [STORYBOOK] Dynamic keyframe generator. Emits CSS keyframe strings
// parameterized by `sweepFraction` (derived from `duration`) and
// `featherPx`. In a production deployment with fixed values, you can
// run this once and paste the output into LinePathMotionV2.css —
// then delete this function and the useMemo/style-tag pair below.
const buildKeyframes = (
  outerName: string,
  innerName: string,
  fillName: string,
  featherName: string,
  sweepFraction: number,
  featherPx: number
): string => {
  const outerStops: string[] = []
  const innerStops: string[] = []

  for (let i = 0; i <= SAMPLE_COUNT; i++) {
    const sweepT = i / SAMPLE_COUNT
    const totalT = sweepT * sweepFraction
    const h = headAngleAt(sweepT)
    const t = tailAngleAt(sweepT)
    const innerDeg = Math.max(0, Math.min(MAX_SNAKE_DEG, h - t))
    const pct = (totalT * 100).toFixed(4)
    outerStops.push(`${pct}% { transform: rotate(${t.toFixed(4)}deg); }`)
    innerStops.push(`${pct}% { transform: rotate(${innerDeg.toFixed(4)}deg); }`)
  }

  outerStops.push(`100% { transform: rotate(${HEAD_MAX_DEG}deg); }`)
  innerStops.push(`100% { transform: rotate(0deg); }`)

  // Opacity fades out during the tail-catch-up phase so the snake
  // disappears before fully collapsing (no antipodal flash residue).
  const sweepEndPct = (sweepFraction * 100).toFixed(4)
  const fadeStartT = HEAD_END_FRACTION + (TAIL_END_FRACTION - HEAD_END_FRACTION) * 0.3
  const fadeEndT = HEAD_END_FRACTION + (TAIL_END_FRACTION - HEAD_END_FRACTION) * 0.85
  const fadeStartPct = (sweepFraction * fadeStartT * 100).toFixed(4)
  const fadeEndPct = (sweepFraction * fadeEndT * 100).toFixed(4)
  const fill = `
    @keyframes ${fillName} {
      0%, ${fadeStartPct}% { opacity: 1; }
      ${fadeEndPct}%, ${sweepEndPct}%, 100% { opacity: 0; }
    }
  `

  // Tail feather only on during the snake's active life; snaps off
  // before the opacity fade so the fade operates on a hard-edged
  // snake (step-end timing on the container animation).
  const featherOnStartPct = (sweepFraction * 0.04 * 100).toFixed(4)
  const featherOffPct = fadeStartPct
  const featherKf = `
    @keyframes ${featherName} {
      0% { --lpm2-feather: 0px; }
      ${featherOnStartPct}% { --lpm2-feather: ${featherPx}px; }
      ${featherOffPct}% { --lpm2-feather: 0px; }
      100% { --lpm2-feather: 0px; }
    }
  `

  return `
    @keyframes ${outerName} {
      ${outerStops.join('\n      ')}
    }
    @keyframes ${innerName} {
      ${innerStops.join('\n      ')}
    }
    ${fill}
    ${featherKf}
  `
}

export const LinePathMotionV2 = ({
  size = 70,
  duration = 1500,
  strokeWidth = 2,
  color = DEFAULT_COLOR,
  feather = 2,
}: LinePathMotionV2Props = {}) => {
  const rawId = useId()
  const idSuffix = rawId.replace(/[^a-zA-Z0-9_-]/g, '')
  const outerKfName = `lpm2-outer-${idSuffix}`
  const innerKfName = `lpm2-inner-${idSuffix}`
  const fillKfName = `lpm2-fill-${idSuffix}`
  const featherKfName = `lpm2-feather-${idSuffix}`

  const totalMs = duration + PAUSE_MS
  const sweepFraction = duration / totalMs
  // [STORYBOOK] Recompute keyframes when controls change. With fixed
  // visual params, drop this useMemo and the <style>{keyframes}</style>
  // tag below — the keyframes would live statically in the .css file.
  const keyframes = useMemo(
    () =>
      buildKeyframes(outerKfName, innerKfName, fillKfName, featherKfName, sweepFraction, feather),
    [outerKfName, innerKfName, fillKfName, featherKfName, sweepFraction, feather]
  )
  const cornerRadius = size * CORNER_RADIUS_RATIO

  return (
    <div
      className="lpm2-container"
      style={
        {
          width: size,
          height: size,
          borderRadius: cornerRadius,
          '--lpm2-color': color,
          animation: `${featherKfName} ${totalMs}ms step-end infinite`,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {/* [STORYBOOK] Per-instance keyframes injected here so each
          Storybook control change yields a fresh animation. In
          production these would be in LinePathMotionV2.css. */}
      <style>{keyframes}</style>
      <div className="lpm2-ring" style={{ padding: strokeWidth, borderRadius: cornerRadius }}>
        <div
          className="lpm2-rot-outer"
          style={{ animation: `${outerKfName} ${totalMs}ms linear infinite` }}
        >
          <div
            className="lpm2-rot-inner"
            style={{ animation: `${innerKfName} ${totalMs}ms linear infinite` }}
          >
            <div
              className="lpm2-fill"
              style={{ animation: `${fillKfName} ${totalMs}ms linear infinite` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export type { LinePathMotionV2Props }
