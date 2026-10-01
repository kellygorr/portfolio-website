import styled from 'styled-components'
import { createRef } from 'react'
import type { ReactNode } from 'react'
import { ISlideshow, SectionType, IHighlight, IThumbnail, TagType, SkillType, ToolType } from '../../data/IProject'
import { Body } from './Body'
import { Slideshow } from './Slideshow/Slideshow'
import { Tags, Thumbnail } from '../shared'
import { Heading, Title } from '.'
import { SMALL_SCREEN } from '../../styles/GlobalStyles'
import { sortHighlights } from '../../utils/sortHighlights'

interface ISectionProps {
	type: SectionType
	data: string | ISlideshow | IThumbnail[] | IHighlight[] | (TagType | SkillType | ToolType | string)[] | ReactNode
	setQuery: (query: string) => void
	isHalfWidthDemo?: boolean
}

export const Section: React.FC<ISectionProps> = (props: ISectionProps) => (
	<>
		{props.type === SectionType.Title && <Title>{props.data as string}</Title>}
		{props.type === SectionType.Header && <Heading>{props.data as string}</Heading>}
		{props.type === SectionType.Slideshow && (
			<Slideshow
				data={(props.data as ISlideshow).slides}
				neutralBorder={(props.data as ISlideshow).neutralBorder}
				defaultwidth={(props.data as ISlideshow).width}
				gap={(props.data as ISlideshow).gap}
				slideshowRef={createRef<HTMLDivElement>()}
			/>
		)}
		{props.type === SectionType.Body && <Body data={props.data as string} />}
		{props.type === SectionType.Demo && (
			<DemoWrapper $rounded={props.isHalfWidthDemo}>{props.data as ReactNode}</DemoWrapper>
		)}
		{props.type === SectionType.Attachments && (
			<Gallery>
				{(props.data as IThumbnail[]).map((data, index) => (
					<Thumbnail key={index} data={{ ...data, neutralBorder: true }} setQuery={props.setQuery} />
				))}
			</Gallery>
		)}
		{props.type === SectionType.Link && <Link>{props.data as string}</Link>}
		{props.type === SectionType.Tags && (
			<Tags tags={props.data as (TagType | SkillType | ToolType | string)[]} setQuery={props.setQuery} />
		)}
		{props.type === SectionType.Highlight &&
			sortHighlights(props.data as IHighlight[]).map((data, index) => {
				const items = Object.entries(data)
				const type = items[1][0]
				return (
					<Highlight key={index}>
						<HighlightHeader>{data.header}</HighlightHeader>
						{type && <Section type={type as SectionType} data={(data as any)[type]} setQuery={props.setQuery} />}
					</Highlight>
				)
			})}
	</>
)

const Gallery = styled.div`
	display: grid;
	grid-template-columns: 100%;
	justify-content: center;
	grid-gap: 15px;
	@media (min-width: 500px) {
		grid-template-columns: repeat(auto-fit, minmax(auto, 400px));
	}

	@media (min-width: ${SMALL_SCREEN}px) {
		grid-template-columns: repeat(2, 50%);
	}
`

const DemoWrapper = styled.div<{ $rounded?: boolean }>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	${({ $rounded }) =>
		$rounded &&
		`
		border-radius: 12px;
		overflow: hidden;

		@media (max-width: ${SMALL_SCREEN}px) {
			border-radius: 0;
			overflow: visible;
		}
	`}
`

export const Link = styled.a``
const Highlight = styled.div`
	display: flex;
	flex-wrap: wrap;
`
const HighlightHeader = styled.h4`
	padding-right: 10px;
	white-space: nowrap;
	&::after {
		content: ': ';
	}
`
