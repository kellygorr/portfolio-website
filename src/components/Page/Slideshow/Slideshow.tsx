import { useState, useEffect, type JSX } from 'react'
import styled from 'styled-components'
import { ChevronLeft16Filled, ChevronRight16Filled } from '@fluentui/react-icons'
import { ISlide } from '../../../data/IProject'
import { Slide } from './Slide'
import { MIN_WIDTH, MAX_WIDTH, SIDE_GAP, SMALL_SCREEN } from '../../../styles/GlobalStyles'
import { NeutralColors } from '../../../styles/theme'

interface IPageProps {
	data: ISlide[]
	neutralBorder?: boolean
	defaultwidth: number
	/** Horizontal spacing between slides, in px. Passed through to each
	 *  Slide's margin. See ISlideshow.gap for details. */
	gap?: number
	slideshowRef: React.RefObject<HTMLDivElement | null>
}

let ScrollTimer: number

export const Slideshow = (props: IPageProps): JSX.Element => {
	const { slideshowRef } = props
	const [active, setActive] = useState(0)
	const [isScrolling, setIsScrolling] = useState(false)

	useEffect(() => {
		if (!isScrolling) {
			findActiveSlide(setActive, slideshowRef)
		}
	}, [isScrolling])

	/** Scrolls a specific slide into view — shared by clicking the
	 *  left/right 25%/75% zones of the slideshow itself (see
	 *  `handleSlideShowClick`) and the explicit prev/next buttons next to
	 *  the "X of Y" counter below. */
	const goToSlide = (index: number) => {
		if (!slideshowRef || !slideshowRef.current) return
		const nextSlide = slideshowRef.current.children[index] as HTMLElement | undefined
		nextSlide?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
	}

	const handleSlideShowClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (slideshowRef && slideshowRef.current) {
			const slideWidth = slideshowRef.current.clientWidth
			const clickPosition = e.clientX - slideshowRef.current.getBoundingClientRect().left
			let nextIndex = null
			if (clickPosition < slideWidth * 0.25 && active > 0) {
				/** Left side click */
				nextIndex = active - 1
			} else if (clickPosition > slideWidth * 0.75 && active < props.data.length - 1) {
				/** Right side click */
				nextIndex = active + 1
			}

			if (!(nextIndex === null)) {
				e.preventDefault()
				goToSlide(nextIndex)
			}
		}
	}

	return (
		<>
			<Slides
				ref={slideshowRef}
				onScroll={() => {
					if (props.data.length > 1) {
						setIsScrolling(true)
						clearTimeout(ScrollTimer)

						ScrollTimer = window.setTimeout(() => {
							setIsScrolling(false)
						}, 150)
					}
				}}
				onClick={handleSlideShowClick}
			>
				{props.data.map((slide: ISlide, index) => (
					<Slide
						key={slide.img ?? `demo-${index}`}
						isActive={index === active && props.data.length > 1}
						isScrolling={isScrolling}
						neutralBorder={props.neutralBorder}
						defaultwidth={props.defaultwidth}
						gap={props.gap}
						data={slide}
						canNavigate={props.data.length > 1}
					/>
				))}
			</Slides>
			<Caption>
				{props.data[active].caption}
				{props.data.length > 1 && (
					<Counter>
						<NavButton onClick={() => goToSlide(active - 1)} disabled={active === 0} aria-label="Previous slide">
							<ChevronLeft16Filled />
						</NavButton>
						<Key>{`${active + 1} of ${props.data.length}`}</Key>
						<NavButton onClick={() => goToSlide(active + 1)} disabled={active === props.data.length - 1} aria-label="Next slide">
							<ChevronRight16Filled />
						</NavButton>
					</Counter>
				)}
			</Caption>
		</>
	)
}

const findActiveSlide = (setActive: (index: number) => void, slideshowRef: React.RefObject<HTMLDivElement | null>): void => {
	if (slideshowRef && slideshowRef.current) {
		// Only the direct children of the scroll container are slides (each
		// Slide renders exactly one top-level Container div) — querying all
		// descendant divs would also match divs nested inside a slide's own
		// content (e.g. a `demo`'s internal markup), throwing off the index.
		const slideArray = [].slice.call(slideshowRef.current.children)
		const activeSlideIndex = slideArray.findIndex((el) => isElementCentered(el))
		if (activeSlideIndex >= 0) {
			setActive(activeSlideIndex)
		}
	}
}

const isElementCentered = (el: HTMLDivElement) => {
	const rect = el.getBoundingClientRect()
	const center = document.documentElement.clientWidth / 2
	return rect.left < center && center < rect.right
}

const Slides = styled.div`
	display: flex;
	align-items: center;
	width: 100vw;
	min-width: ${MIN_WIDTH}px;

	/* Hide scrollbars  */
	overflow: -moz-scrollbars-none;
	-ms-overflow-style: none;
	&::-webkit-scrollbar {
		width: 0 !important;
		/* This container scrolls HORIZONTALLY (overflow-x: auto below),
		   so the scrollbar that actually renders is the horizontal one,
		   governed by this height property, not width above (width only
		   affects a VERTICAL scrollbar, which this container never
		   shows). Without this, Chromium/WebKit still reserves ~16px of
		   space for the (invisible but still laid-out) horizontal
		   scrollbar track at the bottom of this row — which pushes
		   every slide's cross-axis centering off by that same 16px,
		   making each slide look top-aligned instead of vertically
		   centered in the row. */
		height: 0 !important;
	}
	/* Horizontal scrolling only */
	overflow-x: auto;
	overflow-y: hidden;
	/* snap mandatory on horizontal axis  */
	scroll-snap-type: x mandatory;
	-webkit-overflow-scrolling: touch;

	/* Space before first slide and after last slide  */
	/* height % does not work */
	&:before,
	&:after {
		content: ' ';
		height: 10px;
		/* Same MIN_WIDTH floor reasoning as Slide.tsx's image/demo
		   max-width — raw vw has no knowledge of this app's own
		   MIN_WIDTH floor, so below that floor this would keep
		   shrinking past it instead of stopping like everything else on
		   the page. */
		min-width: max(50vw, ${MIN_WIDTH / 2}px);
	}

	/* Slides can differ in rendered height (e.g. a tall interactive demo
	   next to a shorter/wider screenshot) — since this row's own height
	   always matches its TALLEST slide, a shorter active slide ends up
	   vertically centered with visible empty space above/below it. At
	   small screens, that empty space can look like a layout bug rather
	   than a deliberate letterboxed slide — so a light neutral
	   background gives that empty space a visible "container" the slide
	   sits inside, instead of looking like stray whitespace. Full-size
	   screens have enough visual context (padding, surrounding content)
	   that this clarification isn't needed. */
	@media (max-width: ${SMALL_SCREEN}px) {
		background: ${NeutralColors.neutral10};
	}
`

const Caption = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 100%;
	max-width: ${MAX_WIDTH};
	padding: 0 ${SIDE_GAP};
	box-sizing: border-box;
	opacity: 1;
	transition: opacity linear;
	margin: 0 auto;
`

const Key = styled.div`
	white-space: nowrap;
`

/** Row holding the prev/next nav buttons flanking the "X of Y" counter. */
const Counter = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12px;
	margin-top: 4px;
`

/** Previous/next slide buttons — bordered even at rest (not just on
 *  hover/focus) so they read as real clickable buttons rather than plain
 *  decorative icons, matching the user's ask to make the counter
 *  controls "look more like buttons" in their natural state. */
const NavButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 24px;
	height: 24px;
	border-radius: 6px;
	border: 1px solid ${({ theme }) => theme.accent};
	background: transparent;
	color: ${({ theme }) => theme.text};
	cursor: pointer;
	padding: 0;
	transition: background-color 150ms ease-in-out;

	&:hover:not(:disabled) {
		background-color: ${({ theme }) => theme.accent}22;
	}

	&:disabled {
		opacity: 0.35;
		cursor: default;
	}

	svg {
		width: 16px;
		height: 16px;
	}
`
