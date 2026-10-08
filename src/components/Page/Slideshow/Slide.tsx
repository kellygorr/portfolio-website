import { useRef, useEffect, type JSX } from 'react'
import styled from 'styled-components'
import { FileType, ISlide } from '../../../data/IProject'
import { NeutralColors } from '../../../styles/theme'
import { MIN_WIDTH } from '../../../styles/GlobalStyles'

interface IPageProps {
	isActive: boolean
	showActiveBorder: boolean
	isScrolling: boolean
	neutralBorder?: boolean
	defaultwidth: number
	/** Horizontal spacing between slides, in px. Defaults to 5 (10px
	 *  total gap between two adjacent slides) if not provided. */
	gap?: number
	data: ISlide
}

export const Slide = (props: IPageProps): JSX.Element => {
	const ref = useRef<HTMLDivElement>(null)
	const { data, isActive, showActiveBorder, isScrolling, neutralBorder, defaultwidth, gap } = props
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	useEffect(() => {
		const element = ref.current
		if (!element) return

		if (isActive) {
			element.removeAttribute('inert')
			element.removeAttribute('aria-hidden')
		} else {
			element.setAttribute('inert', '')
			element.setAttribute('aria-hidden', 'true')
		}
	}, [isActive])

	const openImage = () => {
		if (!data.img || data.demo || data.file) return
		window.open(data.img, '_blank', 'noopener,noreferrer')
	}

	return (
		<Container
			ref={ref}
			style={{
				cursor: 'default',
			}}
			$showActiveBorder={showActiveBorder}
			$isScrolling={isScrolling}
			$neutralBorder={Boolean(neutralBorder)}
			$defaultwidth={defaultwidth}
			$gap={gap}
		>
			{data.demo ? (
				<DemoSlideContent>{data.demo}</DemoSlideContent>
			) : data.file && data.file.type === FileType.Video ? (
				<video
					controls
					poster={data.img}
					onLoadStart={(e) => {
						/** Set volume to 0.5 */
						e.currentTarget.volume = 0.5
					}}
				>
					<source src={data.file.source} type="video/mp4" />
				</video>
			) : (
				<ImageButton onClick={openImage} $defaultwidth={defaultwidth}>
					<img src={data.img} srcSet={data.img2x ? `${data.img} 1x, ${data.img2x} 2x` : undefined} alt={data.alt ?? data.caption ?? ''} />
				</ImageButton>
			)}
		</Container>
	)
}

interface IStyle {
	$showActiveBorder?: boolean
	$isScrolling?: boolean
	$neutralBorder?: boolean
	$defaultwidth?: number
	$gap?: number
}

const BorderSize = 3
const DEFAULT_GAP = 5

const Container = styled.div<IStyle>`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 ${({ $gap }) => $gap ?? DEFAULT_GAP}px;
	height: 100%;

	border-color: ${({ $showActiveBorder, $neutralBorder, theme }) =>
		!$showActiveBorder ? 'transparent' : $neutralBorder ? NeutralColors.gray11 : theme.accent};
	background-clip: padding-box;
	transition-duration: ${({ $isScrolling }) => ($isScrolling ? '0s' : '300ms')};

	/* snap align center  */
	scroll-snap-align: center;

	&:before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: ${BorderSize}px;
		background-color: ${({ theme }) => theme.neutral};
	}

	img,
	video,
	.image-slide-content,
	.demo-slide-content {
		border: ${BorderSize}px solid transparent;
		border-color: inherit;
		max-height: 60vh;
		/* vw tracks the REAL viewport width, which has no knowledge of
		   this app's own MIN_WIDTH floor (enforced on AppContainer) — so
		   on a real device narrower than MIN_WIDTH, this would keep
		   shrinking past that floor instead of stopping at it like every
		   other element on the page. CSS max() picks whichever value is
		   larger at render time, so it falls back to 75% of MIN_WIDTH
		   (matching what 75vw would resolve to AT the floor) once the
		   real viewport drops below it. */
		max-width: max(75vw, ${MIN_WIDTH * 0.75}px);
	}

	.demo-slide-content {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		position: relative;
		/* Unlike img/video, a demo has no intrinsic size of its own, so it
		 *  collapses to fit its content instead of filling this box.
		 *  Giving it an explicit height + aspect-ratio (matching the other
		 *  screenshot slides in this same slideshow) makes it occupy the
		 *  same footprint so it doesn't look tiny next to them. */
		height: 60vh;
		aspect-ratio: 8 / 5;
	}

	@media (max-width: ${({ $defaultwidth }) => $defaultwidth}px) {
		img,
		video,
		.image-slide-content,
		.demo-slide-content {
			/* Same MIN_WIDTH floor reasoning as the default max-width
			   above — 100vw should never resolve smaller than MIN_WIDTH
			   itself, since nothing else on the page shrinks past it. */
			max-width: max(100vw, ${MIN_WIDTH}px);
		}
	}
`

const DemoSlideContent = styled.div.attrs({ className: 'demo-slide-content' })``

const ImageButton = styled.div.attrs({ className: 'image-slide-content' })<{ $defaultwidth: number }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: max-content;
	height: max-content;
	padding: 0;
	cursor: zoom-in;
	background: transparent;

	img {
		display: block;
		border: 0;
		max-height: calc(60vh - ${BorderSize * 2}px);
		max-width: max(75vw - ${BorderSize * 2}px, ${MIN_WIDTH * 0.75 - BorderSize * 2}px);
	}

	@media (max-width: ${({ $defaultwidth }) => $defaultwidth}px) {
		img {
			max-width: max(100vw - ${BorderSize * 2}px, ${MIN_WIDTH - BorderSize * 2}px);
		}
	}
`
