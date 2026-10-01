/**
 * Minimal cubic-bezier evaluator for drawing an easing token's curve as an
 * SVG path — no new dependency needed for this. Given the same 4 control
 * points used in a CSS `cubic-bezier(x1, y1, x2, y2)` easing, this produces
 * the parametric (x, y) curve so it can be drawn directly (x = time,
 * y = position), matching how easing curves are conventionally visualized.
 *
 * Standard cubic bezier with implicit P0=(0,0) and P3=(1,1):
 *   Bx(t) = 3(1-t)²t·x1 + 3(1-t)t²·x2 + t³
 *   By(t) = 3(1-t)²t·y1 + 3(1-t)t²·y2 + t³
 */

export type CubicBezierPoints = [number, number, number, number]

const bezierComponent = (t: number, p1: number, p2: number): number => {
	const oneMinusT = 1 - t
	return 3 * oneMinusT * oneMinusT * t * p1 + 3 * oneMinusT * t * t * p2 + t * t * t
}

/** Samples `steps + 1` points along the curve, evenly spaced in `t`
 *  (0 to 1), returning [x, y] pairs suitable for plotting. */
export const sampleCubicBezier = (points: CubicBezierPoints, steps = 40): [number, number][] => {
	const [x1, y1, x2, y2] = points
	const result: [number, number][] = []
	for (let i = 0; i <= steps; i++) {
		const t = i / steps
		result.push([bezierComponent(t, x1, x2), bezierComponent(t, y1, y2)])
	}
	return result
}

/** Builds an SVG `<path>` `d` attribute string plotting the curve inside a
 *  `width` x `height` box, with y flipped (SVG y grows downward, but we
 *  want the curve's "1" to plot at the top like a conventional position
 *  graph). `padding` keeps the curve clear of the box edges. */
export const cubicBezierSvgPath = (points: CubicBezierPoints, width: number, height: number, padding = 4): string => {
	const innerW = width - padding * 2
	const innerH = height - padding * 2
	const samples = sampleCubicBezier(points, 48)
	return samples
		.map(([x, y], i) => {
			const px = padding + x * innerW
			const py = padding + (1 - y) * innerH
			return `${i === 0 ? 'M' : 'L'} ${px.toFixed(2)} ${py.toFixed(2)}`
		})
		.join(' ')
}
