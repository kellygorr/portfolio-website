import { useId, useMemo } from 'react'
import './LinePathMotionOvershoot.css'

/*
 * ─────────────────────────────────────────────────────────────────
 * NOTE: Storybook-driven runtime CSS keyframe generation
 * ─────────────────────────────────────────────────────────────────
 * A large portion of this file exists so Storybook controls can
 * re-derive the animation live as the user drags sliders for
 * `width`, `height`, `duration`, and `feather`. Specifically:
 *
 *   • the perimeter math (perimeterPoint, buildArcAngleTable,
 *     angleForArc)
 *   • the buildKeyframes() function
 *   • the useMemo + injected <style> tag inside the component
 *
 * In a production usage with a fixed shape, duration, and feather,
 * this can be replaced with a single static @keyframes block in
 * LinePathMotionOvershoot.css. (Note: this file's geometry helpers
 * also depend on width/height, so changing dimensions in production
 * would still require regeneration unless you precompute per-size.)
 * The remaining props (color, strokeWidth) are applied via inline
 * style + CSS variables and do NOT require keyframe regeneration.
 *
 * Look for `[STORYBOOK]` markers below for the specific spots.
 * ─────────────────────────────────────────────────────────────────
 */

interface LinePathMotionOvershootProps {
  /** Width of the container (px). */
  width?: number
  /** Height of the container (px). */
  height?: number
  /**
   * Sweep duration in ms — time the snake takes to emerge from the
   * top-right corner, travel clockwise around the border, overshoot
   * the origin, and disappear into the bottom-right corner.
   */
  duration?: number
  /** Border (stroke) thickness in px. */
  strokeWidth?: number
  /** Line color (any CSS color value). */
  color?: string
  /** Softness of the snake's leading/trailing edges, in px. */
  feather?: number
  /** Optional head easing override as cubic-bezier control points. */
  headTiming?: [number, number, number, number]
  /** Optional tail easing override as cubic-bezier control points. */
  tailTiming?: [number, number, number, number]
  /** Optional timeline override for when tail starts moving (0..1). */
  tailStartFraction?: number
  /** Optional timeline override for when head reaches its end (0..1). */
  headEndFraction?: number
  /** Optional timeline override for when tail reaches its end (0..1). */
  tailEndFraction?: number
}

const DEFAULT_COLOR = '#5940ff'
const PAUSE_MS = 1000
const CORNER_RADIUS_RATIO = 0.2
const AE_OFFSET_DEG = 45

// Perimeter parameterization starts at the MIDPOINT of the top-right
// corner arc (the corner-diagonal direction) and proceeds CLOCKWISE.
// The sweep ends at the MIDPOINT of the bottom-right corner arc after
// one full revolution past the origin (overshoot).

// Timeline shape (linear head + linear tail, with tail slower than head
// so the gap GROWS during the overlap phase, then shrinks when the head
// pins and the tail catches up):
//
//   0 \u2192 TAIL_START : head only moves \u2192 snake grows
//   TAIL_START \u2192 HEAD_END : both move, tail slower than head \u2192 snake
//                            keeps growing (peaks near HEAD_END)
//   HEAD_END \u2192 TAIL_END : head pinned, tail finishes \u2192 snake shrinks
// Timeline shape (linear head + linear tail, with tail slower than head
// so the gap GROWS during the overlap phase, then shrinks when the head
// pins and the tail catches up):
//
//   0 → TAIL_START : head only moves → snake grows
//   TAIL_START → HEAD_END : both move, tail slower than head → snake
//                            keeps growing (peaks near HEAD_END)
//   HEAD_END → TAIL_END : head pinned, tail finishes → snake shrinks
//
// Speeds are chosen so the snake NEVER hits MAX_SNAKE_DEG, otherwise
// the visible head stops tracking its true position and follows the
// tail + MAX, which makes the perimeter speed appear to change.
// Tail starts at 15% in. Combined with the ease below, this keeps
// the head↔tail angular gap under the 180° mask cap at peak (which
// occurs when the head pins at HEAD_END_FRACTION). Crossing the cap
// would cause the snake to visually collapse and the head to appear
// to slow down — same root cause for both artifacts.
const TAIL_START_FRACTION = 0.2
// Head finishes at 70% of sweep; tail finishes at 100%. The snake
// grows during the head's run, peaks when the head pins, then shrinks
// during the tail's catch-up phase.
const HEAD_END_FRACTION = 0.7
const TAIL_END_FRACTION = 1.0

// HARD architectural limit: 180°. The visible snake is the
// intersection of two half-plane masks rotating around center; past
// 180° the intersection inverts and the apparent head decouples from
// its true position (the snake becomes a near-full ring with a small
// gap instead). Do not raise this without changing the mask geometry.
const MAX_SNAKE_DEG = 180
// Dense sampling: linear CSS tweening between samples interpolates the
// rotation angle, which is HIGHLY nonlinear vs. arc length on the long
// straight edges. Coarse samples → visible "sticking" at edge midpoints.
const SAMPLE_COUNT = 256

// [STORYBOOK] The perimeter-walking helpers below (perimeterPoint,
// buildArcAngleTable, angleForArc) feed buildKeyframes() so that
// dimension/duration/feather changes can re-emit keyframes at runtime.
// In production with fixed params they'd only need to run once at
// build time to produce a static CSS string.

/**
 * Walk the rounded-rectangle perimeter clockwise from the midpoint of
 * the TR arc and return the screen point at arc length `s` (origin =
 * div center, +x right, +y down). `s` is wrapped modulo perimeter.
 */
const perimeterPoint = (s: number, w: number, h: number, r: number): [number, number] => {
  const halfArc = (Math.PI * r) / 4
  const quartArc = (Math.PI * r) / 2
  const sideH = w - 2 * r
  const sideV = h - 2 * r
  const P = 2 * sideH + 2 * sideV + 4 * quartArc
  s = ((s % P) + P) % P

  let t = s
  // Seg 0: second half of TR arc (math angle -π/4 → 0, i.e. CW on screen)
  if (t < halfArc) {
    const u = t / halfArc
    const cx = w / 2 - r
    const cy = -h / 2 + r
    const a = -Math.PI / 4 + (u * Math.PI) / 4
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  }
  t -= halfArc
  // Seg 1: right edge (top → bottom)
  if (t < sideV) return [w / 2, -h / 2 + r + t]
  t -= sideV
  // Seg 2: BR arc (math angle 0 → π/2)
  if (t < quartArc) {
    const u = t / quartArc
    const cx = w / 2 - r
    const cy = h / 2 - r
    const a = (u * Math.PI) / 2
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  }
  t -= quartArc
  // Seg 3: bottom edge (right → left)
  if (t < sideH) return [w / 2 - r - t, h / 2]
  t -= sideH
  // Seg 4: BL arc (math angle π/2 → π)
  if (t < quartArc) {
    const u = t / quartArc
    const cx = -w / 2 + r
    const cy = h / 2 - r
    const a = Math.PI / 2 + (u * Math.PI) / 2
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  }
  t -= quartArc
  // Seg 5: left edge (bottom → top)
  if (t < sideV) return [-w / 2, h / 2 - r - t]
  t -= sideV
  // Seg 6: TL arc (math angle π → 3π/2)
  if (t < quartArc) {
    const u = t / quartArc
    const cx = -w / 2 + r
    const cy = -h / 2 + r
    const a = Math.PI + (u * Math.PI) / 2
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  }
  t -= quartArc
  // Seg 7: top edge (left → right)
  if (t < sideH) return [-w / 2 + r + t, -h / 2]
  t -= sideH
  // Seg 8: first half of TR arc (math angle -π/2 → -π/4)
  const u = t / halfArc
  const cx = w / 2 - r
  const cy = -h / 2 + r
  const a = -Math.PI / 2 + (u * Math.PI) / 4
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
}

/**
 * Build a monotonic arc-length → mask-rotation-angle lookup for one
 * full clockwise revolution starting at the midpoint of the TR arc.
 * The angle returned is the CSS rotation needed to put the mask
 * boundary at the perimeter point with the given arc length.
 *
 * Angles are unwrapped so they monotonically increase by 360° per
 * full revolution — this lets us extend trivially to any number of
 * revolutions for the overshoot phase.
 */
const buildArcAngleTable = (w: number, h: number, r: number) => {
  const quartArc = (Math.PI * r) / 2
  const sideH = w - 2 * r
  const sideV = h - 2 * r
  const perimeter = 2 * sideH + 2 * sideV + 4 * quartArc

  const N = 720
  const arcs: number[] = new Array(N + 1)
  const angles: number[] = new Array(N + 1)
  let offset = 0
  let prev = -Infinity
  for (let i = 0; i <= N; i++) {
    const s = (i / N) * perimeter
    const [x, y] = perimeterPoint(s, w, h, r)
    // CSS conic angle: 0° = up, increases CW. atan2(x, -y) returns
    // radians in (-π, π]; convert to 0..360 then unwrap.
    let a = (Math.atan2(x, -y) * 180) / Math.PI
    if (a < 0) a += 360
    if (i === 0) prev = a
    while (a + offset < prev - 1) offset += 360
    arcs[i] = s
    angles[i] = a + offset
    prev = a + offset
  }
  // Force last sample to exactly +360 over the first for clean wrap.
  angles[N] = angles[0] + 360
  return { arcs, angles, perimeter }
}

/**
 * Given arc length s (can exceed one perimeter for overshoot), return
 * the unwrapped mask-rotation angle by linearly interpolating the
 * table. Wraps cleanly by adding 360° per perimeter past the first.
 */
const angleForArc = (
  s: number,
  table: { arcs: number[]; angles: number[]; perimeter: number }
): number => {
  const { arcs, angles, perimeter } = table
  let revs = 0
  let ss = s
  while (ss >= perimeter) {
    ss -= perimeter
    revs++
  }
  // Binary search for first arc > ss
  let lo = 0
  let hi = arcs.length - 1
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (arcs[mid] < ss) lo = mid + 1
    else hi = mid
  }
  if (lo === 0) return angles[0] + revs * 360
  const a0 = arcs[lo - 1]
  const a1 = arcs[lo]
  const t = (ss - a0) / (a1 - a0)
  return angles[lo - 1] + t * (angles[lo] - angles[lo - 1]) + revs * 360
}

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

// [STORYBOOK] Dynamic keyframe generator. Emits CSS keyframe strings
// parameterized by shape (w, h, r), sweepFraction (from `duration`),
// and `featherPx`. In a production deployment with fixed values, run
// this once and paste the output into LinePathMotionOvershoot.css —
// then delete this function and the useMemo/style-tag pair below.
const buildKeyframes = (
  outerName: string,
  innerName: string,
  fillName: string,
  featherName: string,
  sweepFraction: number,
  featherPx: number,
  w: number,
  h: number,
  r: number,
  headTiming?: [number, number, number, number],
  tailTiming?: [number, number, number, number],
  tailStartFraction: number = TAIL_START_FRACTION,
  headEndFraction: number = HEAD_END_FRACTION,
  tailEndFraction: number = TAIL_END_FRACTION
): string => {
  const headBezier = headTiming ? makeBezier(...headTiming) : null
  const tailBezier = tailTiming ? makeBezier(...tailTiming) : null
  const table = buildArcAngleTable(w, h, r)
  // Offsets along the arc path. s=0 in the table is the TR-arc
  // midpoint; positive shifts move CW along the perimeter.
  //   startOffset: how far past the TR corner the snake starts.
  const startOffset = (Math.PI * r) / 4 // bottom of TR arc (start of right edge)
  // AE Trim Paths offset animates to +45° (12.5% of perimeter) by the
  // end, so the collapsed endpoint should land one full loop + 45° from
  // the start point.
  const offsetDriftArc = table.perimeter * (AE_OFFSET_DEG / 360)
  const totalSweepArc = table.perimeter + offsetDriftArc

  const startAngle = angleForArc(startOffset, table)
  const endAngle = angleForArc(startOffset + totalSweepArc, table)

  const outerStops: string[] = []
  const innerStops: string[] = []

  for (let i = 0; i <= SAMPLE_COUNT; i++) {
    const sweepT = i / SAMPLE_COUNT
    const totalT = sweepT * sweepFraction
    // Head: gentle ease-out so it slows into the endpoint without
    // sprinting at the start (which would push the head↔tail gap
    // over the 180° cap and visually stall the head mid-path).
    // Blend: 70% linear + 30% quadratic ease-out.
    let hP: number
    if (sweepT <= 0) hP = 0
    else if (sweepT >= headEndFraction) hP = 1
    else {
      const u = sweepT / headEndFraction
      if (headBezier) {
        hP = Math.max(0, Math.min(1, headBezier(u)))
      } else {
        const eo = 1 - (1 - u) * (1 - u)
        hP = 0.7 * u + 0.3 * eo
      }
    }
    const headArc = hP * totalSweepArc
    const headAng = angleForArc(startOffset + headArc, table)
    // Tail: delayed start, then constant speed (faster than head so the
    // snake shrinks). Together: snake grows for [0, TAIL_START], travels
    // at full length for a bit, then shrinks during the tail's phase.
    let tailAng: number
    if (sweepT <= tailStartFraction) {
      tailAng = startAngle
    } else if (sweepT >= tailEndFraction) {
      tailAng = endAngle
    } else {
      const p = (sweepT - tailStartFraction) / (tailEndFraction - tailStartFraction)
      if (tailBezier) {
        const eased = Math.max(0, Math.min(1, tailBezier(p)))
        tailAng = angleForArc(startOffset + eased * totalSweepArc, table)
      } else {
        // Smoothstep ease (3p² - 2p³): slow at the start (snake grows
        // long), fast through the middle (closes the gap quickly so the
        // snake doesn't stay long at the end), then slow at the end
        // (gentle close, no snap). Peak head↔tail gap stays ~150°,
        // safely under the 180° mask cap.
        const eased = 3 * p * p - 2 * p * p * p
        const easedClamped = Math.min(1, eased)
        tailAng = angleForArc(startOffset + easedClamped * totalSweepArc, table)
      }
    }
    const innerDeg = Math.max(0, Math.min(MAX_SNAKE_DEG, headAng - tailAng))
    const pct = (totalT * 100).toFixed(4)
    outerStops.push(
      `${pct}% { transform: translate(-50%, -50%) rotate(${tailAng.toFixed(4)}deg); }`
    )
    innerStops.push(`${pct}% { transform: rotate(${innerDeg.toFixed(4)}deg); }`)
  }

  outerStops.push(`100% { transform: translate(-50%, -50%) rotate(${endAngle.toFixed(4)}deg); }`)
  innerStops.push(`100% { transform: rotate(0deg); }`)

  const sweepEndPct = (sweepFraction * 100).toFixed(4)
  // Fill opacity — fades out BEFORE the snake fully collapses so
  // there's never a frame where the snake is at zero length but
  // still partially opaque (which would flash feather residue
  // across the antipodal diameter). Same recipe as v1.
  const fadeStartT = headEndFraction + (tailEndFraction - headEndFraction) * 0.6
  const fadeEndT = headEndFraction + (tailEndFraction - headEndFraction) * 0.95
  const fadeStartPct = (sweepFraction * fadeStartT * 100).toFixed(4)
  const fadeEndPct = (sweepFraction * fadeEndT * 100).toFixed(4)
  const fill = `
    @keyframes ${fillName} {
      0%, ${fadeStartPct}% { opacity: 1; }
      ${fadeEndPct}%, ${sweepEndPct}%, 100% { opacity: 0; }
    }
  `

  // Feather only "on" while the snake is long. Turn feather OFF
  // before the opacity fade begins, so the fade operates on a
  // hard-edged snake (no diffuse diagonal residue across the
  // ring). Uses step-end timing (set on the container animation)
  // so values jump discretely — no interpolation.
  const featherOnStartPct = (sweepFraction * 0.04 * 100).toFixed(4)
  const featherOffPct = fadeStartPct
  const featherKf = `
    @keyframes ${featherName} {
      0% { --lpmo-feather-head: 0px; --lpmo-feather-tail: 0px; }
      ${featherOnStartPct}% { --lpmo-feather-head: ${featherPx}px; --lpmo-feather-tail: ${featherPx}px; }
      ${featherOffPct}% { --lpmo-feather-head: 0px; --lpmo-feather-tail: 0px; }
      100% { --lpmo-feather-head: 0px; --lpmo-feather-tail: 0px; }
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

export const LinePathMotionOvershoot = ({
  width = 240,
  height = 60,
  duration = 1750,
  strokeWidth = 2,
  color = DEFAULT_COLOR,
  feather = 3,
  headTiming,
  tailTiming,
  tailStartFraction = TAIL_START_FRACTION,
  headEndFraction = HEAD_END_FRACTION,
  tailEndFraction = TAIL_END_FRACTION,
}: LinePathMotionOvershootProps = {}) => {
  const rawId = useId()
  const idSuffix = rawId.replace(/[^a-zA-Z0-9_-]/g, '')
  const outerKfName = `lpmo-outer-${idSuffix}`
  const innerKfName = `lpmo-inner-${idSuffix}`
  const fillKfName = `lpmo-fill-${idSuffix}`
  const featherKfName = `lpmo-feather-${idSuffix}`

  const totalMs = duration + PAUSE_MS
  const sweepFraction = duration / totalMs
  // Outer rotator must cover the container at every rotation angle. The
  // tightest cover for a rotating square inside a rectangle is the
  // diagonal of the bounding box, doubled for safety margin.
  const diag = Math.ceil(Math.sqrt(width * width + height * height))
  const rotSize = diag * 2
  const cornerRadius = Math.min(width, height) * CORNER_RADIUS_RATIO
  // [STORYBOOK] Recompute keyframes when controls change. With fixed
  // visual params, drop this useMemo and the <style>{keyframes}</style>
  // tag below — the keyframes would live statically in the .css file.
  const keyframes = useMemo(
    () =>
      buildKeyframes(
        outerKfName,
        innerKfName,
        fillKfName,
        featherKfName,
        sweepFraction,
        feather,
        width,
        height,
        cornerRadius,
        headTiming,
        tailTiming,
        tailStartFraction,
        headEndFraction,
        tailEndFraction
      ),
    [
      outerKfName,
      innerKfName,
      fillKfName,
      featherKfName,
      sweepFraction,
      feather,
      width,
      height,
      cornerRadius,
      headTiming,
      tailTiming,
      tailStartFraction,
      headEndFraction,
      tailEndFraction,
    ]
  )

  return (
    <div
      className="lpmo-container"
      style={
        {
          width,
          height,
          borderRadius: cornerRadius,
          '--lpmo-color': color,
          animation: `${featherKfName} ${totalMs}ms step-end infinite`,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {/* [STORYBOOK] Per-instance keyframes injected here so each
          Storybook control change yields a fresh animation. In
          production these would be in LinePathMotionOvershoot.css. */}
      <style>{keyframes}</style>
      <div className="lpmo-ring" style={{ padding: strokeWidth, borderRadius: cornerRadius }}>
        <div
          className="lpmo-rot-outer"
          style={{
            width: rotSize,
            height: rotSize,
            animation: `${outerKfName} ${totalMs}ms linear infinite`,
          }}
        >
          <div
            className="lpmo-rot-inner"
            style={{ animation: `${innerKfName} ${totalMs}ms linear infinite` }}
          >
            <div
              className="lpmo-fill"
              style={{ animation: `${fillKfName} ${totalMs}ms linear infinite` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export type { LinePathMotionOvershootProps }
