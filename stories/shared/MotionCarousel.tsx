import { useState, useRef, useEffect, type ReactNode } from 'react'
import styled from 'styled-components'

/**
 * A reusable carousel for showing motion demos on project pages, matching
 * the visual language of the real portfolio's Slideshow component: bordered
 * slides, horizontal scroll-snap, click-to-advance on left/right edges, and
 * a "caption + X of Y" indicator below.
 *
 * Unlike the real Slideshow (which renders <img>/<video>), each slide here
 * is an arbitrary React node — meant for embedding live motion components.
 *
 * Reusable across multiple project pages/spots, not tied to one story.
 */

export interface MotionCarouselSlide {
	content: ReactNode
	caption: string
}

interface MotionCarouselProps {
	slides: MotionCarouselSlide[]
}

export const MotionCarousel = ({ slides }: MotionCarouselProps) => {
	const ref = useRef<HTMLDivElement>(null)
	const [active, setActive] = useState(0)
	const [isScrolling, setIsScrolling] = useState(false)
	const scrollTimer = useRef<number>(undefined)

	useEffect(() => {
		if (!isScrolling) findActiveSlide()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isScrolling])

	const findActiveSlide = () => {
		if (!ref.current) return
		const slideEls = Array.from(ref.current.querySelectorAll('[data-slide]'))
		const center = ref.current.getBoundingClientRect().left + ref.current.clientWidth / 2
		const index = slideEls.findIndex((el) => {
			const rect = el.getBoundingClientRect()
			return rect.left < center && center < rect.right
		})
		if (index >= 0) setActive(index)
	}

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!ref.current) return
		const width = ref.current.clientWidth
		const clickX = e.clientX - ref.current.getBoundingClientRect().left
		let next: number | null = null
		if (clickX < width * 0.25 && active > 0) next = active - 1
		else if (clickX > width * 0.75 && active < slides.length - 1) next = active + 1
		if (next !== null) {
			const el = ref.current.querySelectorAll('[data-slide]')[next]
			el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
		}
	}

	return (
		<>
			<Slides
				ref={ref}
				onClick={handleClick}
				onScroll={() => {
					setIsScrolling(true)
					window.clearTimeout(scrollTimer.current)
					scrollTimer.current = window.setTimeout(() => setIsScrolling(false), 150)
				}}
			>
				{slides.map((slide, i) => (
					<Slide key={i} data-slide $isActive={i === active}>
						{slide.content}
					</Slide>
				))}
			</Slides>
			<Caption>
				{slides[active].caption}
				<Key>
					{active + 1} of {slides.length}
				</Key>
			</Caption>
		</>
	)
}

const Slides = styled.div`
	display: flex;
	align-items: center;
	width: 100%;

	-ms-overflow-style: none;
	&::-webkit-scrollbar {
		width: 0 !important;
	}
	overflow-x: auto;
	overflow-y: hidden;
	scroll-snap-type: x mandatory;
	-webkit-overflow-scrolling: touch;

	&:before,
	&:after {
		content: ' ';
		height: 10px;
		min-width: 15%;
	}
`

const Slide = styled.div<{ $isActive: boolean }>`
	flex: 0 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 260px;
	min-height: 220px;
	margin: 0 5px;
	padding: 20px;
	scroll-snap-align: center;
	cursor: ${({ $isActive }) => ($isActive ? 'default' : 'pointer')};
	border: 3px solid ${({ $isActive }) => ($isActive ? 'rgba(0,0,0,0.15)' : 'transparent')};
	transition: border-color 300ms ease-out;
	border-radius: 8px;
`

const Caption = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 100%;
	max-width: 700px;
	margin: 8px auto 0;
	font-size: 0.85rem;
	opacity: 0.7;
`

const Key = styled.div`
	width: 100%;
`
