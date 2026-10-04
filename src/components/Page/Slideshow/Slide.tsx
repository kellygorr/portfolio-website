import { useRef, useEffect, type JSX } from 'react'
import styled from 'styled-components'
import { FileType, ISlide } from '../../../data/IProject'
import { NeutralColors } from '../../../styles/theme'
import { MIN_WIDTH } from '../../../styles/GlobalStyles'

interface IPageProps {
	isActive: boolean
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
	const { data, isActive, isScrolling, neutralBorder, defaultwidth, gap } = props
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const handleSlideClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isActive) {
			e.stopPropagation()
			e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
		}
	}

	return (
		<Container
			ref={ref}
			style={{
				cursor: isActive ? 'default' : 'pointer',
				borderColor: isActive ? (isScrolling ? 'transparent' : neutralBorder ? NeutralColors.gray11 : '') : 'transparent',
				transitionDuration: isScrolling ? '0s' : '300ms',
			}}
			$defaultwidth={defaultwidth}
			$gap={gap}
			onClick={handleSlideClick}
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
				<img src={data.img} srcSet={data.img2x ? `${data.img} 1x, ${data.img2x} 2x` : undefined} alt={data.img} />
			)}
		</Container>
	)
}

interface IStyle {
	isActive?: boolean
	isScrolling?: boolean
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

	border-color: ${({ theme }) => theme.accent};
	background-clip: padding-box;

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
		.demo-slide-content {
			/* Same MIN_WIDTH floor reasoning as the default max-width
			   above — 100vw should never resolve smaller than MIN_WIDTH
			   itself, since nothing else on the page shrinks past it. */
			max-width: max(100vw, ${MIN_WIDTH}px);
		}
	}
`

const DemoSlideContent = styled.div.attrs({ className: 'demo-slide-content' })``
