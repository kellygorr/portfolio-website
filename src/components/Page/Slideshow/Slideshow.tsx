import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ISlide } from '../../../data/IProject'
import { Slide } from './Slide'
import { MIN_WIDTH } from '../../../styles/GlobalStyles'

interface IPageProps {
	data: ISlide[]
	neutralBorder?: boolean
	defaultwidth: number
	slideshowRef: React.RefObject<HTMLDivElement>
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
				const nextSlide = slideshowRef.current.querySelectorAll('div')[nextIndex]
				nextSlide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
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
						key={slide.img}
						isActive={index === active && props.data.length > 1}
						isScrolling={isScrolling}
						neutralBorder={props.neutralBorder}
						defaultwidth={props.defaultwidth}
						data={slide}
					/>
				))}
			</Slides>
			<Caption>
				{props.data[active].caption}
				<Key>{`${active + 1} of ${props.data.length}`}</Key>
			</Caption>
		</>
	)
}

const findActiveSlide = (setActive: (index: number) => void, slideshowRef: React.RefObject<HTMLDivElement>): void => {
	if (slideshowRef && slideshowRef.current) {
		const slideArray = [].slice.call(slideshowRef.current.querySelectorAll('div'))
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
		min-width: 50vw;
	}
`

const Caption = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 100%;
	max-width: 700px;
	opacity: 1;
	transition: opacity linear;
	margin: 0 auto;
`

const Key = styled.div`
	width: 100%;
`
