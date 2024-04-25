import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { FileType, ISlide } from '../../../data/IProject'
import { NeutralColors } from '../../../styles/theme'

interface IPageProps {
	isActive: boolean
	isScrolling: boolean
	neutralBorder?: boolean
	defaultwidth: number
	data: ISlide
}

export const Slide = (props: IPageProps): JSX.Element => {
	const ref = useRef<HTMLDivElement>(null)
	const { data, isActive, isScrolling, neutralBorder, defaultwidth } = props
	useEffect(() => window.scrollTo(0, 0), [])

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
			onClick={handleSlideClick}
		>
			{data.file && data.file.type === FileType.Video ? (
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
				<img src={data.img} alt={data.img} />
			)}
		</Container>
	)
}

interface IStyle {
	isActive?: boolean
	isScrolling?: boolean
	$defaultwidth?: number
}

const BorderSize = 3

const Container = styled.div<IStyle>`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 5px;
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
	video {
		border: ${BorderSize}px solid transparent;
		border-color: inherit;
		max-height: 60vh;
		max-width: 75vw;
	}

	@media (max-width: ${({ $defaultwidth }) => $defaultwidth}px) {
		img,
		video {
			max-width: 100vw;
		}
	}
`
