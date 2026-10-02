import type { JSX } from 'react'
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
	const hasVisual = Boolean(data.demo || data.thumbnail)
	const thumbnailStyle: React.CSSProperties = !hasVisual
		? { pointerEvents: 'none' }
		: { alignItems: props.showFull ? 'flex-start' : 'center' }

	const [ref, inView] = useInView({
		/* Optional options */
		threshold: 0.1,
		triggerOnce: true,
	})

	return (
		<Container ref={ref} style={{ ...thumbnailStyle, ...style }} aria-hidden={!hasVisual}>
			<LinkStyle onClick={props.thumbnailClick} style={{ flex: !hasVisual ? 1 : 'inherit' }}>
				<LinkWrapper link={link} isExternal={Boolean(data.file)} tabIndex={!hasVisual ? -1 : undefined}>
					<ImageWrapper $neutralBorder={Boolean(data.neutralBorder)}>
						{data.demoBadge && <DemoBadge>Demo</DemoBadge>}
						{inView && data.demo ? (
							<>
								<BackgroundCard />
								<DemoSlot>{data.demo}</DemoSlot>
							</>
						) : inView && data.thumbnail ? (
							<>
								<BackgroundCard />
								<Image
									srcSet={`
						${data.thumbnail.x1} 1x,
						${data.thumbnail.x15} 1.5x,
						${data.thumbnail.x2} 2x,
					`}
									src={data.thumbnail.x1 as string}
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
	$neutralBorder: boolean // Currently not used, but could be used to set a neutral border color
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

	&:before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;

		margin: -3px;
		border-radius: inherit;
		background-image: linear-gradient(to right, ${({ theme }) => theme.accent} 60%, ${({ theme }) => theme.background} 75%);
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

const DemoSlot = styled.div`
	height: 200px;
	min-height: 200px;
	max-height: 200px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	opacity: 0;
	animation: 1s ease-out 0.5s ${AnimateIn};
	animation-fill-mode: forwards;
	border: 2px solid ${({ theme }) => theme.background};

	/* Unlike Image above, this intentionally does NOT grow to height:
	100% at wider screens. Image's content is a single <img> with
	object-fit: cover, so stretching it to 100% of an auto-height parent
	just crops/fills — it can never make the parent taller. DemoSlot's
	children are arbitrary React demo content with their own intrinsic
	height; if this also went to height: 100% here, then on a parent
	with no fixed height (ImageWrapper is content-sized, not fixed),
	the percentage can't resolve against anything and height effectively
	reverts to auto/content-based per the CSS spec — so the box silently
	grows to fit whatever the demo renders, and overflow: hidden never
	actually clips anything because nothing is overflowing a box that
	just resized to match it. That one demo thumbnail then stretched
	its entire homepage grid row taller (CSS Grid's default
	align-items: stretch), making every other card in that row look
	oversized too. Keeping a hard max-height here, at every screen size,
	is what makes every demo thumbnail reliably no larger than a plain
	image thumbnail — any demo content taller than 200px just gets
	silently clipped (no scrollbar) instead of resizing the card. */
`

const Header = styled.h4`
	font-family: 'Museo_Slab_500_2';
`

/**
 * "Demo" badge overlaid on the top-right corner of a thumbnail (see
 * IThumbnail.demoBadge) — lets visitors know from the homepage grid (or
 * a project's header thumbnail) that there's a live, playable demo
 * behind this card, not just static images. Positioned the same way as
 * DemoThumbnail's StopButton corner chip, and z-indexed above
 * ImageWrapper's hover-gradient pseudo-element so it stays visible/
 * legible on hover.
 */
const DemoBadge = styled.div`
	position: absolute;
	top: 8px;
	right: 8px;
	z-index: 1;
	padding: 4px 10px;
	border-radius: 6px;
	background: ${({ theme }) => theme.accent};
	color: ${({ theme }) => theme.textNegative};
	font-size: 11px;
	font-weight: 600;
	letter-spacing: 0.2px;
	pointer-events: none;
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
				color: ${({ theme }) => theme.accent};
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
