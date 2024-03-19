import styled from 'styled-components'
import { IThumbnail } from '../../../data/IProject'
import { AnimateIn, SMALL_SCREEN } from '../../../styles/GlobalStyles'
import { GetPageName, Tags } from '..'
import { useInView } from 'react-intersection-observer'
import { LinkWrapper } from './LinkWrapper'

interface IThumbnailProps {
	data: IThumbnail
	hideTags?: boolean
	style?: React.CSSProperties
	setQuery: (query: string) => void
	thumbnailClick?: () => void
	showFull?: boolean
}

export const Thumbnail = (props: IThumbnailProps): JSX.Element => {
	const { data, style, hideTags } = props
	const link = data.file ? data.file.source : `/page/${GetPageName(data.header)}`
	const thumbnailStyle: React.CSSProperties = !data.thumbnail
		? { pointerEvents: 'none' }
		: { alignItems: props.showFull ? 'flex-start' : 'center' }

	const [ref, inView] = useInView({
		/* Optional options */
		threshold: 0.1,
		triggerOnce: true,
	})

	return (
		<Container ref={ref} style={{ ...thumbnailStyle, ...style }} aria-hidden={!data.thumbnail}>
			<LinkStyle onClick={props.thumbnailClick} style={{ flex: !data.thumbnail ? 1 : 'inherit' }}>
				<LinkWrapper link={link} isExternal={Boolean(data.file)} tabIndex={!data.thumbnail ? -1 : undefined}>
					<ImageWrapper $neutralBorder={Boolean(data.neutralBorder)}>
						{inView && data.thumbnail ? (
							<>
								<BackgroundCard />
								<Image
									srcSet={`
						${import.meta.env.VITE_THUMBNAIL_SRC_1x}${data.thumbnail} 1x,
						${import.meta.env.VITE_THUMBNAIL_SRC_15x}${data.thumbnail} 1.5x,
						${import.meta.env.VITE_THUMBNAIL_SRC_2x}${data.thumbnail} 2x,
					`}
									src={import.meta.env.VITE_THUMBNAIL_SRC_1x + data.thumbnail}
								/>
							</>
						) : (
							<Blank />
						)}
					</ImageWrapper>
					<Header style={{ textAlign: props.showFull ? 'start' : 'center' }}>
						{props.showFull && (
							<>
								Project: <span style={{ paddingRight: '2px' }} />
							</>
						)}
						{data.header}
					</Header>
				</LinkWrapper>
			</LinkStyle>
			{data.tags && !hideTags && (
				<Details>
					<span>{props.showFull && 'Tags: '}</span>
					<Tags tags={data.tags} setQuery={props.setQuery} />
				</Details>
			)}
			{props.showFull &&
				data.highlights &&
				data.highlights.map((highlight, index) => (
					<Details key={index}>
						<span>{highlight.header}: </span>
						{highlight.tags && !hideTags && <Tags tags={highlight.tags} setQuery={props.setQuery} />}
					</Details>
				))}
		</Container>
	)
}

interface IStyle {
	$neutralBorder: boolean
}

const Container = styled.li`
	display: flex;
	flex-direction: column;
	align-items: center;
	line-height: 1.5rem;
`

const ImageWrapper = styled.div<IStyle>`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin-bottom: 5px;

	border: 3px solid transparent;

	&:before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
		margin: -3px;
		border-radius: inherit;
		background-image: linear-gradient(
			to right,
			${({ theme }) => theme.gradient1} 15%,
			${({ theme }) => theme.gradient2} 30%,
			${({ theme }) => theme.gradient1} 50%,
			${({ theme }) => theme.gradient2} 60%,
			${({ theme }) => theme.background} 75%
		);
		background-size: 400% 100%;
		background-position: right center;

		transition: background 400ms ease-in;
	}
`
const Image = styled.img`
	height: 200px;
	min-height: 200px;
	opacity: 0;
	animation: 1s ease-out 0.5s ${AnimateIn};
	animation-fill-mode: forwards;
	width: 100%;
	object-fit: cover;
	border: 2px solid ${({ theme }) => theme.background};

	@media (min-width: ${SMALL_SCREEN}px) {
		height: 100%;
	}
`

const Header = styled.h4`
	font-family: 'Museo_Slab_500_2';
`

const LinkStyle = styled.div`
	width: 100%;
	a {
		display: flex;
		flex-direction: column;
		height: 100%;

		&:hover {
			text-decoration: none;
			${ImageWrapper} {
				&:before {
					background-position: left center;
					transition: background 600ms ease-in;
				}
			}
			${Header} {
				background-image: linear-gradient(to right, ${({ theme }) => theme.gradient1} 30%, ${({ theme }) => theme.gradient2});
				background-position: 300% auto;
				-webkit-text-fill-color: transparent;
				-webkit-background-clip: text;
			}
		}
	}
`
const Details = styled.div`
	display: flex;

	> span {
		padding-right: 5px;
	}
`
const Blank = styled.div`
	width: 600px;
	height: 200px;
	background-color: ${({ theme }) => theme.thumbnail};
`
/* The thumbnail color has opacity, so we need a card under it to stop hover color from showing behind it 
(when images are still loading) */
const BackgroundCard = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: ${({ theme }) => theme.background};

	&:after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border-radius: inherit;
		background-color: ${({ theme }) => theme.thumbnail};
	}
`
