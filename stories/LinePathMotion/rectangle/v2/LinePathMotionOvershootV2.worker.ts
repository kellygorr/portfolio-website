/*
 * LinePathMotionOvershootV2 worker.
 *
 * Runs entirely on a Worker thread with an OffscreenCanvas — main
 * thread can be fully stalled and this animation keeps playing at
 * native rAF cadence. Compositing the canvas surface to the screen
 * still requires the compositor thread, but no per-frame main-thread
 * work is involved.
 *
 * Why Canvas2D + dashed stroke instead of CSS mask intersection:
 *   The mask-based approach (used by v1 / square v2) can't produce
 *   a perpendicular endpoint on a long rectangle without geometric
 *   failure modes. Canvas2D draws the actual stroke geometry — the
 *   endpoint is a true butt cap perpendicular to the path tangent
 *   by definition, no tricks.
 *
 * Trim-path semantics (matches Lottie):
 *   - The path is the rounded-rectangle perimeter with pathLength = 1.
 *   - dashGap = (1 - visible) of path length, dashLen = visible × len.
 *   - dashOffset shifts the dash pattern around the path.
 *   - Animating dashLen + dashOffset draws/erases a single contiguous
 *     visible stroke segment that travels along the path.
 */
export {}

type InitMsg = {
  type: 'init'
  canvas: OffscreenCanvas
  dpr: number
  width: number
  height: number
  cornerRadius: number
  strokeWidth: number
  color: string
  feather: number
  durationMs: number
  pauseMs: number
  headTiming?: [number, number, number, number]
  tailTiming?: [number, number, number, number]
  tailStartFraction?: number
  headEndFraction?: number
  tailEndFraction?: number
}

type UpdateMsg = {
  type: 'update'
  dpr: number
  width: number
  height: number
  cornerRadius: number
  strokeWidth: number
  color: string
  feather: number
  durationMs: number
  pauseMs: number
  headTiming?: [number, number, number, number]
  tailTiming?: [number, number, number, number]
  tailStartFraction?: number
  headEndFraction?: number
  tailEndFraction?: number
}

type Msg = InitMsg | UpdateMsg

const TAIL_START_FRACTION = 0.2
const HEAD_END_FRACTION = 0.7
const TAIL_END_FRACTION = 1.0
const AE_OFFSET_DEG = 45

// Sweep length is geometry-dependent so V2 matches V1's start/end
// behavior exactly: snake enters at the top of the right edge (just
// past the TR corner), travels CW around the rectangle, overshoots
// by exactly one short-side length, and exits at the bottom of the
// right edge (start of the BR arc). This is computed in buildPath
// and stored as sweepLenFraction = (perimeter + sideV) / perimeter.
let sweepLenFraction = 1

let ctx: OffscreenCanvasRenderingContext2D | null = null
let canvasW = 0
let canvasH = 0
let dpr = 1
let strokeWidth = 2
let color = '#5940ff'
let feather = 3
let durationMs = 1750
let pauseMs = 1000
let totalMs = durationMs + pauseMs
let perimeter = 0
let startTime = 0
let rafId = 0
let headTiming: [number, number, number, number] | null = null
let tailTiming: [number, number, number, number] | null = null
let tailStartFraction = TAIL_START_FRACTION
let headEndFraction = HEAD_END_FRACTION
let tailEndFraction = TAIL_END_FRACTION
let canvas: OffscreenCanvas | null = null

// Pre-built Path2D for the rounded rectangle perimeter, centered at
// canvas center, starting at the TOP of the right edge (just past
// the TR corner) going clockwise — matching v1's startOffset of
// half the TR arc (the start-of-right-edge entry point).
let path: Path2D | null = null

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

const buildPath = (
  w: number,
  h: number,
  r: number,
  sw: number
): { path: Path2D; perimeter: number; sweepLenFraction: number } => {
  const p = new Path2D()
  // INSET the perimeter by sw/2 so the entire stroke fits inside the
  // canvas. Without this, the outer half of the stroke is clipped at
  // the canvas edge — and the clip behavior differs between straight
  // edges (uniform half-clip) and corner arcs, making corners visually
  // appear thicker / "pool" color.
  const inset = sw / 2
  const iw = w - sw // inset width
  const ih = h - sw // inset height
  const ir = Math.max(0, r - inset) // inset corner radius
  const quartArc = (Math.PI * ir) / 2
  const sideH = iw - 2 * ir
  const sideV = ih - 2 * ir
  const peri = 2 * sideH + 2 * sideV + 4 * quartArc

  // V1 entry/exit convention: enters at TOP of right edge, exits at
  // BOTTOM of right edge (start of BR arc) after one full revolution.
  // The path therefore STARTS at the top of the right edge and ends
  // at the top of the right edge (closed). Overshoot = sideV.
  //
  // Build in absolute coords centered at origin; we'll translate the
  // canvas to (cx, cy) before drawing so the path is rendered at the
  // canvas center.
  //
  // Seg 0: right edge (top → bottom)
  p.moveTo(iw / 2, -ih / 2 + ir)
  p.lineTo(iw / 2, ih / 2 - ir)
  // Seg 1: BR arc
  p.arc(iw / 2 - ir, ih / 2 - ir, ir, 0, Math.PI / 2, false)
  // Seg 2: bottom edge (right → left)
  p.lineTo(-iw / 2 + ir, ih / 2)
  // Seg 3: BL arc
  p.arc(-iw / 2 + ir, ih / 2 - ir, ir, Math.PI / 2, Math.PI, false)
  // Seg 4: left edge (bottom → top)
  p.lineTo(-iw / 2, -ih / 2 + ir)
  // Seg 5: TL arc
  p.arc(-iw / 2 + ir, -ih / 2 + ir, ir, Math.PI, (3 * Math.PI) / 2, false)
  // Seg 6: top edge (left → right)
  p.lineTo(iw / 2 - ir, -ih / 2)
  // Seg 7: full TR arc — closes back to start point.
  p.arc(iw / 2 - ir, -ih / 2 + ir, ir, -Math.PI / 2, 0, false)

  // AE Trim Paths offset ends at +45° (12.5% of a full perimeter), so
  // the collapsed endpoint should be one full loop + 45° from start.
  const sweepLen = peri + peri * (AE_OFFSET_DEG / 360)
  return { path: p, perimeter: peri, sweepLenFraction: sweepLen / peri }
}

const applyConfig = (msg: {
  dpr: number
  width: number
  height: number
  cornerRadius: number
  strokeWidth: number
  color: string
  feather: number
  durationMs: number
  pauseMs: number
  headTiming?: [number, number, number, number]
  tailTiming?: [number, number, number, number]
  tailStartFraction?: number
  headEndFraction?: number
  tailEndFraction?: number
}) => {
  if (!ctx || !canvas) return

  dpr = msg.dpr
  canvasW = msg.width
  canvasH = msg.height
  strokeWidth = msg.strokeWidth
  color = msg.color
  feather = Math.max(0, msg.feather)
  durationMs = msg.durationMs
  pauseMs = msg.pauseMs
  headTiming = msg.headTiming ?? null
  tailTiming = msg.tailTiming ?? null
  tailStartFraction = msg.tailStartFraction ?? TAIL_START_FRACTION
  headEndFraction = msg.headEndFraction ?? HEAD_END_FRACTION
  tailEndFraction = msg.tailEndFraction ?? TAIL_END_FRACTION
  totalMs = durationMs + pauseMs

  canvas.width = Math.round(msg.width * dpr)
  canvas.height = Math.round(msg.height * dpr)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const built = buildPath(msg.width, msg.height, msg.cornerRadius, msg.strokeWidth)
  path = built.path
  perimeter = built.perimeter
  sweepLenFraction = built.sweepLenFraction
}

const onInit = (msg: InitMsg) => {
  canvas = msg.canvas
  const got = canvas.getContext('2d')
  if (!got) return
  ctx = got
  applyConfig(msg)
  startTime = 0
  rafId = (
    self as unknown as { requestAnimationFrame: (cb: FrameRequestCallback) => number }
  ).requestAnimationFrame(frame)
}

const onUpdate = (msg: UpdateMsg) => {
  applyConfig(msg)
}

// Head curve: blended ease-out (same shape as v1's mask-based v1).
const headCurve = (sweepT: number): number => {
  if (sweepT <= 0) return 0
  if (sweepT >= headEndFraction) return 1
  const u = sweepT / headEndFraction
  if (headTiming) {
    const v = makeBezier(...headTiming)(u)
    return Math.max(0, Math.min(1, v))
  }
  const eo = 1 - (1 - u) * (1 - u)
  return 0.7 * u + 0.3 * eo
}

// Tail curve: smoothstep over [TAIL_START, TAIL_END].
const tailCurve = (sweepT: number): number => {
  if (sweepT <= tailStartFraction) return 0
  if (sweepT >= tailEndFraction) return 1
  const p = (sweepT - tailStartFraction) / (tailEndFraction - tailStartFraction)
  if (tailTiming) {
    const v = makeBezier(...tailTiming)(p)
    return Math.max(0, Math.min(1, v))
  }
  return Math.min(1, 3 * p * p - 2 * p * p * p)
}

const strokePathSegment = (
  drawingContext: OffscreenCanvasRenderingContext2D,
  drawingPath: Path2D,
  startPx: number,
  lengthPx: number,
  alpha: number
) => {
  if (lengthPx <= 0) return

  if (lengthPx >= perimeter) {
    drawingContext.setLineDash([])
    drawingContext.lineDashOffset = 0
  } else {
    drawingContext.setLineDash([lengthPx, perimeter - lengthPx])
    drawingContext.lineDashOffset = -startPx
  }
  drawingContext.globalAlpha = alpha
  drawingContext.stroke(drawingPath)
}

const frame = (now: number) => {
  if (!ctx || !path) return
  if (!startTime) startTime = now
  const elapsed = (now - startTime) % totalMs
  const sweepT = Math.min(1, elapsed / durationMs)

  ctx.clearRect(0, 0, canvasW, canvasH)

  // After the sweep finishes, nothing to draw during the pause.
  if (sweepT < 1) {
    const headFrac = headCurve(sweepT)
    const tailFrac = tailCurve(sweepT)
    // Head's path-length position (in [0, sweepLenFraction]).
    const headPos = headFrac * sweepLenFraction
    const tailPos = tailFrac * sweepLenFraction
    const visibleLen = Math.max(0, headPos - tailPos)

    if (visibleLen > 0) {
      const lenPx = visibleLen * perimeter
      const tailPx = tailPos * perimeter
      const featherPx = Math.min(feather, lenPx)
      const opaqueStartPx = tailPx + featherPx
      const opaqueLenPx = lenPx - featherPx
      ctx.lineWidth = strokeWidth
      ctx.lineCap = 'butt'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = color
      ctx.save()
      ctx.translate(canvasW / 2, canvasH / 2)

      if (featherPx > 0) {
        const steps = Math.min(24, Math.max(4, Math.ceil(featherPx * 2)))
        const stepLenPx = featherPx / steps
        for (let step = 0; step < steps; step++) {
          strokePathSegment(ctx, path, tailPx + step * stepLenPx, stepLenPx, (step + 1) / steps)
        }
      }

      strokePathSegment(ctx, path, opaqueStartPx, opaqueLenPx, 1)
      ctx.restore()
    }
  }

  rafId = (
    self as unknown as { requestAnimationFrame: (cb: FrameRequestCallback) => number }
  ).requestAnimationFrame(frame)
}

self.onmessage = (e: MessageEvent<Msg>) => {
  if (e.data.type === 'init') onInit(e.data)
  else if (e.data.type === 'update') onUpdate(e.data)
}

// Cleanup on terminate isn't strictly needed (the worker is killed),
// but reference rafId so the lint check doesn't flag unused.
void rafId
