import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Wraps `children` so they're rendered at their own natural/fixed size,
 * then uniformly scaled DOWN (never up — see the `Math.min(..., 1)`
 * below) via CSS `transform: scale()` so they always fit inside
 * whatever box this wrapper itself is given — used by DemoSlide so a
 * demo's content (e.g. Motion Tokens/Easings' compact grid) never
 * overflows or gets clipped by a slide, regardless of how small the
 * slide's own box becomes at a given viewport size.
 *
 * Only for DemoSlide (slideshow-embedded demos) — `Demo` (the
 * page-embedded version) has its own natural-width column and doesn't
 * need this; forcing a scale there would fight its existing responsive
 * layout instead of solving a real overflow problem.
 *
 * How it works: `inner` is a `width: max-content` box so it always
 * renders children at their true natural size, unconstrained by the
 * outer wrapper. Two ResizeObservers — one on `inner` (the content's
 * natural, pre-scale size) and one on the OUTER wrapper (the available
 * space) — recompute `scale = min(outerWidth / contentWidth,
 * outerHeight / contentHeight, 1)` whenever either changes, and apply
 * that as a CSS transform to `inner`. `transform` never changes an
 * element's own layout box size, only how it paints — so `inner` keeps
 * occupying its full natural footprint for layout purposes. That's
 * harmless here because the OUTER wrapper centers `inner` via flexbox
 * and clips anything beyond its own bounds (`overflow: hidden`):
 * flexbox centers `inner`'s pre-scale box, and since `scale` shrinks
 * around that same center point (`transformOrigin: center`), the
 * visually-scaled result stays centered and fully contained — never
 * clipped — as long as the computed scale is actually <= 1.
 */
export const ScaleToFit = ({ children }: { children: ReactNode }) => {
	const outerRef = useRef<HTMLDivElement>(null)
	const innerRef = useRef<HTMLDivElement>(null)
	const [scale, setScale] = useState(1)

	useEffect(() => {
		const outer = outerRef.current
		const inner = innerRef.current
		if (!outer || !inner) return

		let outerSize = { width: outer.clientWidth, height: outer.clientHeight }
		let contentSize = { width: inner.scrollWidth, height: inner.scrollHeight }

		const recompute = () => {
			if (!contentSize.width || !contentSize.height) return
			const nextScale = Math.min(outerSize.width / contentSize.width, outerSize.height / contentSize.height, 1)
			setScale(Number.isFinite(nextScale) && nextScale > 0 ? nextScale : 1)
		}

		const outerObserver = new ResizeObserver((entries) => {
			const entry = entries[0]
			if (!entry) return
			outerSize = { width: entry.contentRect.width, height: entry.contentRect.height }
			recompute()
		})
		const innerObserver = new ResizeObserver((entries) => {
			const entry = entries[0]
			if (!entry) return
			contentSize = { width: entry.contentRect.width, height: entry.contentRect.height }
			recompute()
		})

		outerObserver.observe(outer)
		innerObserver.observe(inner)
		recompute()

		return () => {
			outerObserver.disconnect()
			innerObserver.disconnect()
		}
	}, [])

	return (
		<div
			ref={outerRef}
			style={{
				position: 'relative',
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				overflow: 'hidden',
			}}
		>
			<div
				ref={innerRef}
				style={{
					width: 'max-content',
					transform: `scale(${scale})`,
					transformOrigin: 'center',
				}}
			>
				{children}
			</div>
		</div>
	)
}
